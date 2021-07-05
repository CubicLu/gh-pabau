import { Prisma } from '@prisma/client'
import { Context } from '../../context'
import {
  InvoiceResponse,
  FinanceInput,
  ActionResponse,
  InvoiceQueryResult,
  FinanceCountQueryResult,
  PaymentQueryResult,
  DebtQueryResult,
  CreditNoteQueryResult,
} from './types'

export const findManyFinanceInvoice = async (
  ctx: Context,
  input: FinanceInput,
  skip: number,
  take: number
) => {
  const locationId = input?.locationId
  const issuingCompanyId = input?.issuingCompanyId
  const data = await retrieveInvoices(
    ctx,
    locationId,
    issuingCompanyId,
    input,
    skip,
    take
  )

  const id = data.map((item) => item.id)
  const saleItemData = await calculateNetAndGst(ctx, id)

  return data.map((item) => {
    const { totalNet, totalVat } = saleItemData[item.id]

    return {
      id: item.id,
      invoiceNo: item.invoiceNo,
      location: item.location,
      invDate: item.invDate,
      customer:
        item.contractId > 0 && item.customerId === 0 ? 'N/A' : item.debtor,
      debtor: item.contractId !== 0 ? item.insurerName : item.debtor,
      payment: calculateStatus(
        item.paidAmount,
        item.total,
        item.discountAmount
      ),
      net: totalNet.toFixed(2),
      gst: totalVat.toFixed(2),
      gross: item.total.toFixed(2),
      paid: item.paidAmount.toFixed(2),
      balance: item.outstanding.toFixed(2),
      status: item.xero_status,
      tooltip: calculateTooltipMessage(
        item.xero_status,
        item.xero_response,
        item.xero_modifiedAt
      ),
    }
  })
}

const retrieveInvoices = async (
  ctx: Context,
  locationId: number,
  issuingCompanyId: number,
  input: FinanceInput,
  skip: number,
  take: number
): Promise<InvoiceQueryResult[]> => {
  const locationFilterArray = await getAllowedLocation(ctx)
  return await ctx.prisma.$queryRaw<InvoiceQueryResult[]>`SELECT sales.id,
    sales.custom_id AS invoiceNo,
    sales.customer_name AS debtor,
    sales.insurer_contract_id AS contractId,
    insurance.insurer_name as insurerName,
    sales.customer_id AS customerId,
    SUM(sales.total) AS total,
    SUM(sales.credit_amount) AS creditAmount,
    SUM(sales.paid_amount)-SUM(sales.credit_amount) AS paidAmount,
    if(SUM(sales.total)-SUM(sales.paid_amount)-SUM(sales.credit_amount)<0,0, round(SUM(sales.total)-SUM(sales.paid_amount)-SUM(sales.credit_amount),2)) AS outstanding,
    SUM(discount_amount) AS discountAmount,
    loc.name AS location,
    sales.date AS invDate,
    xjobs.status AS xero_status,
    xjobs.response AS xero_response,
    xjobs.modified_at AS xero_modifiedAt
    FROM inv_sales AS sales
    LEFT JOIN company_branches AS loc ON loc.id = sales.location_id
    LEFT JOIN insurance_details AS insurance ON insurance.id = sales.insurer_contract_id
    LEFT JOIN xero_integration_jobs AS xjobs ON xjobs.company_id = sales.occupier AND xjobs.invoice_guid = sales.guid
    WHERE sales.occupier = ${ctx.authenticated.company}
    ${
      input.startDate && input.endDate
        ? Prisma.sql`AND DATE(sales.date) BETWEEN ${input.startDate} 
      AND ${input.endDate}`
        : Prisma.empty
    }
    ${
      locationId
        ? Prisma.sql`AND sales.location_id = ${locationId}`
        : Prisma.sql`AND sales.location_id IN (${Prisma.join(
            locationFilterArray
          )})`
    }
    ${
      issuingCompanyId
        ? Prisma.sql`AND sales.issuer_id = ${issuingCompanyId}`
        : Prisma.empty
    }
    ${
      input.searchTerm
        ? Prisma.sql`AND (sales.customer_name LIKE ${input.searchTerm} OR sales.custom_id LIKE ${input.searchTerm})`
        : Prisma.empty
    }
    AND sales.guid!='' AND sales.guid IS NOT NULL
    AND sales.reference_no!='**CREDIT NOTE**' AND sales.reference_no!='**REFUND**'
    GROUP BY IFNULL(sales.guid, sales.id)
    ORDER BY sales.date DESC
    LIMIT ${skip ?? 0}, ${take ?? 50}`
}

const getAllowedLocation = async (ctx: Context): Promise<number[]> => {
  const data = await ctx.prisma.cmStaffGeneral.findFirst({
    where: {
      pabau_id: { equals: ctx.authenticated.user },
    },
    select: {
      Location: true,
    },
  })
  let filter = [0]

  if (data?.['Location'] !== '') {
    const location = data?.['Location'].trim()
    if (location) {
      const locationArray = location.split(',').map((item) => Number(item))
      filter = [...filter, ...locationArray]
    }
  }
  return filter
}

const calculateStatus = (
  paidAmount: number,
  total: number,
  discount = 0
): string => {
  if (paidAmount >= total || total <= discount) {
    return 'Paid'
  } else if (paidAmount === 0 && discount === 0) {
    return 'Unpaid'
  } else if (paidAmount > 0 && paidAmount < total) {
    return 'Part Paid'
  }
}

const calculateTooltipMessage = (status, xero_response, xero_modifiedAt) => {
  switch (status) {
    case null:
    case '':
      return 'This invoice is not queued for update... Click to add to queue for sync.'
      break
    case 0:
      return 'This invoice is scheduled for update...'
      break
    case 1:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
      return `An error occurred while trying to sync - ${
        JSON.parse(xero_response)?.error_code
      }`
      break
    case 2:
      return `Synced with xero on ${xero_modifiedAt?.split('T')[0]}`
      break
  }
}

const calculateNetAndGst = async (
  ctx: Context,
  ids: number[]
): Promise<InvoiceResponse> => {
  const invSaleItemRecords = await ctx.prisma.invSaleItem.findMany({
    where: {
      sale_id: { in: ids },
    },
    select: {
      VAT_id: true,
      Tax: {
        select: {
          value: true,
        },
      },
      gross_total: true,
      val_tax: true,
      tax_total: true,
      sale_id: true,
    },
  })
  const saleNet = {}
  let tax = 0
  for (const id of ids) {
    let totalNet = 0
    let totalVat = 0
    const invSaleItems = invSaleItemRecords.filter(
      (item) => item.sale_id === id
    )
    for (const list of invSaleItems) {
      let vatValue = 0
      if (list['tax_total'] === 0) {
        const vatId = list['VAT_id']
        if (vatId !== 0) {
          const rowTax = list.Tax?.value
          tax = Number.parseFloat(rowTax?.split('%')[0])
        }
        const vatMultiplier = tax / 100 + 1
        const realGrossTotal = list['gross_total'] - Math.abs(list['val_tax'])
        vatValue = realGrossTotal - realGrossTotal / vatMultiplier
      } else {
        vatValue = list['tax_total']
      }
      const netValue =
        list['gross_total'] - Math.abs(list['val_tax']) - vatValue

      totalNet += netValue
      totalVat += vatValue
    }
    saleNet[id] = { totalNet, totalVat }
  }
  return saleNet
}

export const invoiceCount = async (
  ctx: Context,
  input: FinanceInput
): Promise<FinanceCountQueryResult[]> => {
  const locationFilterArray = await getAllowedLocation(ctx)
  return await ctx.prisma.$queryRaw<FinanceCountQueryResult[]>`SELECT sales.id
    FROM inv_sales AS sales
    LEFT JOIN company_branches AS loc ON loc.id = sales.location_id 
    LEFT JOIN xero_integration_jobs AS xjobs ON xjobs.company_id = sales.occupier AND xjobs.invoice_guid = sales.guid
    WHERE sales.occupier = ${ctx.authenticated.company}
    ${
      input.startDate && input.endDate
        ? Prisma.sql`AND DATE(sales.date) BETWEEN ${input.startDate} 
        AND ${input.endDate}`
        : Prisma.empty
    }
    ${
      input.locationId
        ? Prisma.sql`AND sales.location_id = ${input.locationId}`
        : Prisma.sql`AND sales.location_id IN (${Prisma.join(
            locationFilterArray
          )})`
    }
    ${
      input.issuingCompanyId
        ? Prisma.sql`AND sales.issuer_id = ${input.issuingCompanyId}`
        : Prisma.empty
    }
    ${
      input.searchTerm
        ? Prisma.sql`AND (sales.customer_name LIKE ${input.searchTerm} OR sales.custom_id LIKE ${input.searchTerm})`
        : Prisma.empty
    }
    AND sales.guid!='' AND sales.guid IS NOT NULL
    AND sales.reference_no!='**CREDIT NOTE**' AND sales.reference_no!='**REFUND**'
    GROUP BY IFNULL(sales.guid, sales.id)`
}

export const findManyFinancePayment = async (
  ctx: Context,
  input: FinanceInput,
  skip: number,
  take: number
) => {
  const locationId = input?.locationId
  const issuingCompanyId = input?.issuingCompanyId
  const data = await retrievePayments(
    ctx,
    locationId,
    issuingCompanyId,
    input,
    skip,
    take
  )

  return data.map((item) => ({
    ...item,
    amount: item.amount.toFixed(2),
  }))
}

const retrievePayments = async (
  ctx: Context,
  locationId: number,
  issuingCompanyId: number,
  input: FinanceInput,
  skip: number,
  take: number
): Promise<PaymentQueryResult[]> => {
  const locationFilterArray = await getAllowedLocation(ctx)
  return await ctx.prisma.$queryRaw<PaymentQueryResult[]>`SELECT p.id,
    sales.custom_id AS invoiceNo,
    loc.name AS location,
    sales.date AS invDate,
    sales.customer_name AS customer,
    p.amount AS amount,
    p.pmethod AS payment,
    u.full_name AS user
    FROM inv_sales AS sales
    LEFT JOIN company_branches AS loc ON loc.id = sales.location_id
    INNER JOIN inv_payments p ON p.invoice=sales.id
    INNER JOIN users u ON u.id = p.uid
    WHERE sales.occupier = ${ctx.authenticated.company}
    ${
      input.startDate && input.endDate
        ? Prisma.sql`AND DATE(sales.date) BETWEEN ${input.startDate} 
        AND ${input.endDate}`
        : Prisma.empty
    }
    ${
      locationId
        ? Prisma.sql`AND sales.location_id = ${locationId}`
        : Prisma.sql`AND sales.location_id IN (${Prisma.join(
            locationFilterArray
          )})`
    }
    ${
      issuingCompanyId
        ? Prisma.sql`AND sales.issuer_id = ${issuingCompanyId}`
        : Prisma.empty
    }
    ${
      input.searchTerm
        ? Prisma.sql`AND (sales.customer_name LIKE ${input.searchTerm} OR sales.custom_id LIKE ${input.searchTerm} OR p.id LIKE ${input.searchTerm})`
        : Prisma.empty
    }
    GROUP BY IFNULL(sales.guid, sales.id)
    ORDER BY sales.date DESC
    LIMIT ${skip ?? 0}, ${take ?? 50}`
}

export const paymentCount = async (
  ctx: Context,
  input: FinanceInput
): Promise<FinanceCountQueryResult[]> => {
  const locationFilterArray = await getAllowedLocation(ctx)
  return await ctx.prisma.$queryRaw<FinanceCountQueryResult[]>`SELECT p.id
    FROM inv_sales AS sales
    LEFT JOIN company_branches AS loc ON loc.id = sales.location_id
    INNER JOIN inv_payments p ON p.invoice=sales.id
    INNER JOIN users u ON u.id = p.uid
    WHERE sales.occupier = ${ctx.authenticated.company}
    ${
      input.startDate && input.endDate
        ? Prisma.sql`AND DATE(sales.date) BETWEEN ${input.startDate} 
      AND ${input.endDate}`
        : Prisma.empty
    }
    ${
      input.locationId
        ? Prisma.sql`AND sales.location_id = ${input.locationId}`
        : Prisma.sql`AND sales.location_id IN (${Prisma.join(
            locationFilterArray
          )})`
    }
    ${
      input.issuingCompanyId
        ? Prisma.sql`AND sales.issuer_id = ${input.issuingCompanyId}`
        : Prisma.empty
    }
    ${
      input.searchTerm
        ? Prisma.sql`AND (sales.customer_name LIKE ${input.searchTerm} OR sales.custom_id LIKE ${input.searchTerm} OR p.id LIKE ${input.searchTerm})`
        : Prisma.empty
    }
    GROUP BY IFNULL(sales.guid, sales.id)`
}

export const findManyFinanceDebt = async (
  ctx: Context,
  input: FinanceInput,
  skip: number,
  take: number
) => {
  const locationId = input?.locationId
  const issuingCompanyId = input?.issuingCompanyId
  const data = await retrieveDebts(
    ctx,
    locationId,
    issuingCompanyId,
    input,
    skip,
    take
  )

  const id = data.map((item) => item.id)
  const lastActionData = await calculateLastAction(ctx, id)

  return data.map((item) => ({
    id: item.id,
    invoiceNo: item.invoiceNo,
    location: item.location,
    invDate: item.invDate,
    customer:
      item.contractId > 0 && item.customerId === 0 ? 'N/A' : item.debtor,
    debtor: item.contractId !== 0 ? item.insurerName : item.debtor,
    payment: calculateStatus(item.paidAmount, item.total, item.discountAmount),
    balance: item.outstanding.toFixed(2),
    status: item.xero_status,
    tooltip: calculateTooltipMessage(
      item.xero_status,
      item.xero_response,
      item.xero_modifiedAt
    ),
    lastAction: lastActionData[item.id],
  }))
}

const retrieveDebts = async (
  ctx: Context,
  locationId: number,
  issuingCompanyId: number,
  input: FinanceInput,
  skip: number,
  take: number
): Promise<DebtQueryResult[]> => {
  const locationFilterArray = await getAllowedLocation(ctx)
  return await ctx.prisma.$queryRaw<DebtQueryResult[]>`SELECT sales.id,
    sales.custom_id AS invoiceNo,
    loc.name AS location,
    sales.date AS invDate,
    sales.insurer_contract_id AS contractId,
    sales.customer_id AS customerId,
    sales.customer_name AS debtor,
    insurance.insurer_name as insurerName,
    SUM(sales.total) AS total,
    SUM(sales.credit_amount) AS creditAmount,
    SUM(sales.paid_amount)-SUM(sales.credit_amount) AS paidAmount,
    if(SUM(sales.total)-SUM(sales.paid_amount)-SUM(sales.credit_amount)<0,0, round(SUM(sales.total)-SUM(sales.paid_amount)-SUM(sales.credit_amount),2)) AS outstanding,
    SUM(discount_amount) AS discountAmount,
    xjobs.status AS xero_status,
    xjobs.response AS xero_response,
    xjobs.modified_at AS xero_modifiedAt 
    FROM inv_sales AS sales
    LEFT JOIN company_branches AS loc ON loc.id = sales.location_id
    LEFT JOIN insurance_details AS insurance ON insurance.id = sales.insurer_contract_id
    LEFT JOIN xero_integration_jobs AS xjobs ON xjobs.company_id = sales.occupier AND xjobs.invoice_guid = sales.guid
    WHERE sales.occupier = ${ctx.authenticated.company}
    ${
      input.startDate && input.endDate
        ? Prisma.sql`AND DATE(sales.date) BETWEEN ${input.startDate} 
      AND ${input.endDate}`
        : Prisma.empty
    }
    ${
      locationId
        ? Prisma.sql`AND sales.location_id = ${locationId}`
        : Prisma.sql`AND sales.location_id IN (${Prisma.join(
            locationFilterArray
          )})`
    }
    ${
      issuingCompanyId
        ? Prisma.sql`AND sales.issuer_id = ${issuingCompanyId}`
        : Prisma.empty
    }
    ${
      input.searchTerm
        ? Prisma.sql`AND (sales.customer_name LIKE ${input.searchTerm} OR sales.custom_id LIKE ${input.searchTerm})`
        : Prisma.empty
    }
    AND sales.guid!='' AND sales.guid IS NOT NULL
    AND (sales.paid_amount < (sales.total - sales.discount_amount) AND sales.total > 0)
    GROUP BY IFNULL(sales.guid, sales.id)
    ORDER BY sales.date DESC
    LIMIT ${skip ?? 0}, ${take ?? 50}`
}

export const debtCount = async (
  ctx: Context,
  input: FinanceInput
): Promise<FinanceCountQueryResult[]> => {
  const locationFilterArray = await getAllowedLocation(ctx)
  return await ctx.prisma.$queryRaw<FinanceCountQueryResult[]>`SELECT sales.id
    FROM inv_sales AS sales
    LEFT JOIN company_branches AS loc ON loc.id = sales.location_id 
    LEFT JOIN xero_integration_jobs AS xjobs ON xjobs.company_id = sales.occupier AND xjobs.invoice_guid = sales.guid
    WHERE sales.occupier = ${ctx.authenticated.company}
    ${
      input.startDate && input.endDate
        ? Prisma.sql`AND DATE(sales.date) BETWEEN ${input.startDate} 
      AND ${input.endDate}`
        : Prisma.empty
    }
    ${
      input.locationId
        ? Prisma.sql`AND sales.location_id = ${input.locationId}`
        : Prisma.sql`AND sales.location_id IN (${Prisma.join(
            locationFilterArray
          )})`
    }
    ${
      input.issuingCompanyId
        ? Prisma.sql`AND sales.issuer_id = ${input.issuingCompanyId}`
        : Prisma.empty
    }
    ${
      input.searchTerm
        ? Prisma.sql`AND (sales.customer_name LIKE ${input.searchTerm} OR sales.custom_id LIKE ${input.searchTerm})`
        : Prisma.empty
    }
    AND sales.guid!='' AND sales.guid IS NOT NULL
    AND (sales.paid_amount < (sales.total - sales.discount_amount) AND sales.total > 0)
    GROUP BY IFNULL(sales.guid, sales.id)`
}

const calculateLastAction = async (
  ctx: Context,
  ids: number[]
): Promise<ActionResponse> => {
  const debtManageCommunication = await ctx.prisma.debtManageCommunication.findMany(
    {
      where: {
        invoice_id: { in: ids },
      },
      select: {
        letter_no: true,
        communication_id: true,
        creation_date: true,
        invoice_id: true,
      },
    }
  )
  const data = {}
  for (const id of ids) {
    const debtManageRecords = debtManageCommunication.filter(
      (item) => item.invoice_id === id
    )
    const lastAction = []
    for (const item of debtManageRecords) {
      lastAction.push({
        communication_id: item.communication_id,
        time: item.creation_date,
      })
    }
    data[id] = lastAction
  }
  return data
}

export const findManyFinanceCreditNote = async (
  ctx: Context,
  input: FinanceInput,
  skip: number,
  take: number
) => {
  const locationId = input?.locationId
  const issuingCompanyId = input?.issuingCompanyId
  const creditNoteType = input?.creditNoteType
  const data = await retrieveCreditNotes(
    ctx,
    locationId,
    issuingCompanyId,
    creditNoteType,
    input,
    skip,
    take
  )

  return data.map((item) => ({
    id: item.id,
    creditNo: item.creditNo,
    location: item.location,
    creditDate: item.invDate,
    customer:
      item.contractId > 0 && item.customerId === 0 ? 'N/A' : item.debtor,
    debtor: item.contractId !== 0 ? item.insurerName : item.debtor,
    invoiceNo: item.invoiceNo,
    total: item.total.toFixed(2),
    type: item.creditNoteType,
    status: item.xero_status,
    tooltip: calculateTooltipMessage(
      item.xero_status,
      item.xero_response,
      item.xero_modifiedAt
    ),
  }))
}

const retrieveCreditNotes = async (
  ctx: Context,
  locationId: number,
  issuingCompanyId: number,
  creditNoteType: string,
  input: FinanceInput,
  skip: number,
  take: number
): Promise<CreditNoteQueryResult[]> => {
  const locationFilterArray = await getAllowedLocation(ctx)
  return await ctx.prisma.$queryRaw<CreditNoteQueryResult[]>`SELECT sales.id,
    sales.custom_id AS creditNo,
    sales.customer_name AS debtor,
    sales.insurer_contract_id AS contractId,
    sales.customer_id AS customerId,
    cnt.name AS creditNoteType,
    insurance.insurer_name as insurerName,
    sales.credit_ref_id AS invoiceNo,
    SUM(sales.total) AS total,
    loc.name AS location,
    sales.date AS invDate,
    xjobs.status AS xero_status,
    xjobs.response AS xero_response,
    xjobs.modified_at AS xero_modifiedAt 
    FROM inv_sales AS sales 
    LEFT JOIN credit_note_type AS cnt ON cnt.id = sales.credit_type
    LEFT JOIN insurance_details AS insurance ON insurance.id = sales.insurer_contract_id
    LEFT JOIN company_branches AS loc ON loc.id = sales.location_id 
    LEFT JOIN xero_integration_jobs AS xjobs ON xjobs.company_id = sales.occupier AND xjobs.invoice_guid = sales.guid
    WHERE sales.occupier = ${ctx.authenticated.company}
    ${
      input.startDate && input.endDate
        ? Prisma.sql`AND DATE(sales.date) BETWEEN ${input.startDate} 
      AND ${input.endDate}`
        : Prisma.empty
    }
    ${
      locationId
        ? Prisma.sql`AND sales.location_id = ${locationId}`
        : Prisma.sql`AND sales.location_id IN (${Prisma.join(
            locationFilterArray
          )})`
    }
    ${
      issuingCompanyId
        ? Prisma.sql`AND sales.issuer_id = ${issuingCompanyId}`
        : Prisma.empty
    }
    ${
      input.searchTerm
        ? Prisma.sql`AND (sales.customer_name LIKE ${input.searchTerm} OR sales.custom_id LIKE ${input.searchTerm})`
        : Prisma.empty
    }
    ${
      creditNoteType
        ? Prisma.sql`AND cnt.name = ${creditNoteType}`
        : Prisma.empty
    }
    AND sales.guid!='' AND sales.guid IS NOT NULL
    AND sales.reference_no = '**CREDIT NOTE**'
    GROUP BY IFNULL(sales.guid, sales.id)
    ORDER BY sales.date DESC
    LIMIT ${skip ?? 0}, ${take ?? 50}`
}

export const creditNoteCount = async (
  ctx: Context,
  input: FinanceInput
): Promise<FinanceCountQueryResult[]> => {
  const locationFilterArray = await getAllowedLocation(ctx)
  return await ctx.prisma.$queryRaw<FinanceCountQueryResult[]>`SELECT sales.id
    FROM inv_sales AS sales 
    LEFT JOIN credit_note_type AS cnt ON cnt.id = sales.credit_type
    LEFT JOIN company_branches AS loc ON loc.id = sales.location_id 
    LEFT JOIN xero_integration_jobs AS xjobs ON xjobs.company_id = sales.occupier AND xjobs.invoice_guid = sales.guid
    WHERE sales.occupier = ${ctx.authenticated.company}
    ${
      input.startDate && input.endDate
        ? Prisma.sql`AND DATE(sales.date) BETWEEN ${input.startDate} 
      AND ${input.endDate}`
        : Prisma.empty
    }
    ${
      input.locationId
        ? Prisma.sql`AND sales.location_id = ${input.locationId}`
        : Prisma.sql`AND sales.location_id IN (${Prisma.join(
            locationFilterArray
          )})`
    }
    ${
      input.issuingCompanyId
        ? Prisma.sql`AND sales.issuer_id = ${input.issuingCompanyId}`
        : Prisma.empty
    }
    ${
      input.searchTerm
        ? Prisma.sql`AND (sales.customer_name LIKE ${input.searchTerm} OR sales.custom_id LIKE ${input.searchTerm})`
        : Prisma.empty
    }
    ${
      input.creditNoteType
        ? Prisma.sql`AND cnt.name = ${input.creditNoteType}`
        : Prisma.empty
    }
    AND sales.guid!='' AND sales.guid IS NOT NULL
    AND sales.reference_no = '**CREDIT NOTE**'
    GROUP BY IFNULL(sales.guid, sales.id)
    ORDER BY sales.date DESC`
}
