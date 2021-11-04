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
  InvoiceOutput,
  InvoiceArgs,
  StatementArgs,
  StatementOutput,
  DateRangeInput,
} from './types'
import dayjs from 'dayjs'
import { statusDataByDayMonth } from '../booking/statuses.service'
import { getPreviousDateRange } from './dateRange.service'

export const findManyFinanceInvoice = async (
  ctx: Context,
  input: FinanceInput,
  skip: number,
  take: number
) => {
  const locationId = input?.locationId
  const issuingCompanyId = input?.issuingCompanyId

  const isHealthcode = await getHealthcodeStatus(ctx)
  const data = await retrieveInvoices(
    ctx,
    locationId,
    issuingCompanyId,
    input,
    skip,
    take,
    isHealthcode
  )

  const id = data.map((item) => item.id)
  const saleItemData = await calculateNetAndGst(ctx, id)

  return data.map((item) => {
    const { totalNet, totalVat } = saleItemData[item.id]

    let healthcodeStatus = item.healthcode_status
    if (!healthcodeStatus && item.contractId > 0) {
      healthcodeStatus = 'Unprocessed'
    }

    return {
      id: item.id,
      invoiceNo: item.invoiceNo,
      location: item.location,
      invDate: item.invDate,
      customer:
        item.contractId > 0 && item.customerId === 0
          ? 'N/A'
          : item.customerName
          ? item.customerName
          : item.debtor,
      debtor:
        item.contractId !== 0
          ? item.insurerName
          : item.customerName
          ? item.customerName
          : item.debtor,
      payment: calculateStatus(
        item.paidAmount,
        item.total,
        item.discountAmount
      ),
      net: totalNet?.toFixed(2),
      gst: totalVat?.toFixed(2),
      gross: item.total?.toFixed(2),
      paid: item.paidAmount?.toFixed(2),
      balance: item.outstanding?.toFixed(2),
      tooltip: calculateTooltipMessage(
        item.xero_status,
        item.xero_response,
        item.xero_modifiedAt
      ),
      isHealthcodeEnabled: isHealthcode,
      healthcodeStatus: healthcodeStatus,
    }
  })
}

const getHealthcodeStatus = async (ctx: Context) => {
  const data = await ctx.prisma.companyVariable.findUnique({
    where: {
      company: {
        company_id: ctx.authenticated.company,
        key: 'healthcode_login',
      },
    },
    select: {
      value: true,
    },
  })
  return !!data?.value
}

const retrieveInvoices = async (
  ctx: Context,
  locationId: number,
  issuingCompanyId: number,
  input: FinanceInput,
  skip: number,
  take: number,
  healthcodeStatus: boolean
): Promise<InvoiceQueryResult[]> => {
  const locationFilterArray = await getAllowedLocation(ctx)
  return await ctx.prisma.$queryRaw<InvoiceQueryResult[]>`SELECT sales.id,
    sales.custom_id AS invoiceNo,
    sales.customer_name AS debtor,
    concat_ws(' ', cmContact.Fname, cmContact.Lname) AS customerName,
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
    ${
      healthcodeStatus
        ? Prisma.sql`, IF(healthcode_submittals.status = 'Error', 'Failed', healthcode_submittals.status) as healthcode_status`
        : Prisma.empty
    }
    FROM inv_sales AS sales
    LEFT JOIN company_branches AS loc ON loc.id = sales.location_id
    LEFT JOIN cm_contacts AS cmContact ON cmContact.id = sales.customer_id
    LEFT JOIN insurance_details AS insurance ON insurance.id = sales.insurer_contract_id
    LEFT JOIN xero_integration_jobs AS xjobs ON xjobs.company_id = sales.occupier AND xjobs.invoice_guid = sales.guid
    ${
      healthcodeStatus
        ? Prisma.sql`LEFT JOIN healthcode_submittals ON healthcode_submittals.invoice_id = sales.id`
        : Prisma.empty
    }
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
        ? Prisma.sql`AND (IF(sales.insurer_contract_id = 0 && sales.customer_id = 0, sales.customer_name, concat_ws(' ', cmContact.Fname, cmContact.Lname)) LIKE ${input.searchTerm} OR sales.custom_id LIKE ${input.searchTerm})`
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
  const invSaleItemRecords = await ctx.prisma.saleItem.findMany({
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
          tax = rowTax ? Number.parseFloat(rowTax?.split('%')[0]) : 0
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
    LEFT JOIN cm_contacts AS cmContact ON cmContact.id = sales.customer_id
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
        ? Prisma.sql`AND (IF(sales.insurer_contract_id = 0 && sales.customer_id = 0, sales.customer_name, concat_ws(' ', cmContact.Fname, cmContact.Lname)) LIKE ${input.searchTerm} OR sales.custom_id LIKE ${input.searchTerm})`
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
    customer: item.customerName ? item.customerName : item.customer,
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
    concat_ws(' ', cmContact.Fname, cmContact.Lname) AS customerName,
    p.amount AS amount,
    p.pmethod AS payment,
    u.full_name AS user
    FROM inv_sales AS sales
    LEFT JOIN company_branches AS loc ON loc.id = sales.location_id
    LEFT JOIN cm_contacts AS cmContact ON cmContact.id = sales.customer_id
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
        ? Prisma.sql`AND (IF(sales.insurer_contract_id = 0 && sales.customer_id = 0, sales.customer_name, concat_ws(' ', cmContact.Fname, cmContact.Lname)) LIKE ${input.searchTerm} OR sales.custom_id LIKE ${input.searchTerm} OR p.id LIKE ${input.searchTerm})`
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
    LEFT JOIN cm_contacts AS cmContact ON cmContact.id = sales.customer_id
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
        ? Prisma.sql`AND (IF(sales.insurer_contract_id = 0 && sales.customer_id = 0, sales.customer_name, concat_ws(' ', cmContact.Fname, cmContact.Lname)) LIKE ${input.searchTerm} OR sales.custom_id LIKE ${input.searchTerm} OR p.id LIKE ${input.searchTerm})`
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

  const isHealthcode = await getHealthcodeStatus(ctx)
  const data = await retrieveDebts(
    ctx,
    locationId,
    issuingCompanyId,
    input,
    skip,
    take,
    isHealthcode
  )

  const id = data.map((item) => item.id)
  const lastActionData = await calculateLastAction(ctx, id)

  return data.map((item) => {
    let healthcodeStatus = item.healthcode_status
    if (!healthcodeStatus && item.contractId > 0) {
      healthcodeStatus = 'Unprocessed'
    }

    return {
      id: item.id,
      invoiceNo: item.invoiceNo,
      location: item.location,
      invDate: item.invDate,
      customer:
        item.contractId > 0 && item.customerId === 0
          ? 'N/A'
          : item.customerName
          ? item.customerName
          : item.debtor,
      debtor:
        item.contractId !== 0
          ? item.insurerName
          : item.customerName
          ? item.customerName
          : item.debtor,
      payment: calculateStatus(
        item.paidAmount,
        item.total,
        item.discountAmount
      ),
      balance: item.total.toFixed(2),
      status: item.xero_status,
      tooltip: calculateTooltipMessage(
        item.xero_status,
        item.xero_response,
        item.xero_modifiedAt
      ),
      lastAction: lastActionData[item.id],
      isHealthcodeEnabled: isHealthcode,
      healthcodeStatus: healthcodeStatus,
    }
  })
}

const retrieveDebts = async (
  ctx: Context,
  locationId: number,
  issuingCompanyId: number,
  input: FinanceInput,
  skip: number,
  take: number,
  healthcodeStatus: boolean
): Promise<DebtQueryResult[]> => {
  const locationFilterArray = await getAllowedLocation(ctx)
  return await ctx.prisma.$queryRaw<DebtQueryResult[]>`SELECT sales.id,
    sales.custom_id AS invoiceNo,
    loc.name AS location,
    sales.date AS invDate,
    sales.insurer_contract_id AS contractId,
    sales.customer_id AS customerId,
    sales.customer_name AS debtor,
    concat_ws(' ', cmContact.Fname, cmContact.Lname) AS customerName,
    insurance.insurer_name as insurerName,
    SUM(sales.total) AS total,
    SUM(sales.credit_amount) AS creditAmount,
    SUM(sales.paid_amount)-SUM(sales.credit_amount) AS paidAmount,
    if(SUM(sales.total)-SUM(sales.paid_amount)-SUM(sales.credit_amount)<0,0, round(SUM(sales.total)-SUM(sales.paid_amount)-SUM(sales.credit_amount),2)) AS outstanding,
    SUM(discount_amount) AS discountAmount,
    xjobs.status AS xero_status,
    xjobs.response AS xero_response,
    xjobs.modified_at AS xero_modifiedAt
    ${
      healthcodeStatus
        ? Prisma.sql`, IF(healthcode_submittals.status = 'Error', 'Failed', healthcode_submittals.status) as healthcode_status`
        : Prisma.empty
    }
    FROM inv_sales AS sales
    LEFT JOIN company_branches AS loc ON loc.id = sales.location_id
    LEFT JOIN cm_contacts AS cmContact ON cmContact.id = sales.customer_id
    LEFT JOIN insurance_details AS insurance ON insurance.id = sales.insurer_contract_id
    LEFT JOIN xero_integration_jobs AS xjobs ON xjobs.company_id = sales.occupier AND xjobs.invoice_guid = sales.guid
    ${
      healthcodeStatus
        ? Prisma.sql`LEFT JOIN healthcode_submittals ON healthcode_submittals.invoice_id = sales.id`
        : Prisma.empty
    }
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
        ? Prisma.sql`AND (IF(sales.insurer_contract_id = 0 && sales.customer_id = 0, sales.customer_name, concat_ws(' ', cmContact.Fname, cmContact.Lname)) LIKE ${input.searchTerm} OR sales.custom_id LIKE ${input.searchTerm})`
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
    LEFT JOIN cm_contacts AS cmContact ON cmContact.id = sales.customer_id
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
        ? Prisma.sql`AND (IF(sales.insurer_contract_id = 0 && sales.customer_id = 0, sales.customer_name, concat_ws(' ', cmContact.Fname, cmContact.Lname)) LIKE ${input.searchTerm} OR sales.custom_id LIKE ${input.searchTerm})`
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
      item.contractId > 0 && item.customerId === 0
        ? 'N/A'
        : item.customerName
        ? item.customerName
        : item.debtor,
    debtor:
      item.contractId !== 0
        ? item.insurerName
        : item.customerName
        ? item.customerName
        : item.debtor,
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
    concat_ws(' ', cmContact.Fname, cmContact.Lname) AS customerName,
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
    LEFT JOIN cm_contacts AS cmContact ON cmContact.id = sales.customer_id
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
        ? Prisma.sql`AND (IF(sales.insurer_contract_id = 0 && sales.customer_id = 0, sales.customer_name, concat_ws(' ', cmContact.Fname, cmContact.Lname)) LIKE ${input.searchTerm} OR sales.custom_id LIKE ${input.searchTerm})`
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
    LEFT JOIN cm_contacts AS cmContact ON cmContact.id = sales.customer_id
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
        ? Prisma.sql`AND (IF(sales.insurer_contract_id = 0 && sales.customer_id = 0, sales.customer_name, concat_ws(' ', cmContact.Fname, cmContact.Lname)) LIKE ${input.searchTerm} OR sales.custom_id LIKE ${input.searchTerm})`
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

export const getInvoiceData = async (
  ctx: Context,
  input: InvoiceArgs
): Promise<InvoiceOutput> => {
  const sales = await ctx.prisma.invSale.findMany({
    where: {
      OR: [{ id: { equals: input?.saleId } }],
    },
    select: {
      id: true,
      paid_amount: true,
      discount_amount: true,
      inv_total: true,
      total: true,
      custom_id: true,
      date: true,
      Company: {
        select: {
          details: {
            select: {
              default_inv_template_id: true,
            },
          },
        },
      },
      User: {
        select: {
          full_name: true,
        },
      },
      InsuranceDetail: {
        select: {
          insurer_name: true,
        },
      },
      Booking: {
        select: {
          service: true,
          User: {
            select: {
              full_name: true,
            },
          },
        },
      },
      InvPayment: {
        select: {
          id: true,
          datetime: true,
          pmethod: true,
          amount: true,
        },
      },
      SaleItem: {
        select: {
          VAT_id: true,
          tax_total: true,
          gross_total: true,
          quantity: true,
          unit_price: true,
          val_tax: true,
          discount_reason: true,
          created_date: true,
          product_category_name: true,
          Tax: {
            select: {
              rate: true,
              value: true,
            },
          },
          Product: {
            select: {
              sku: true,
              name: true,
              InvCategory: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  })
  if (!sales) {
    throw new Error(`Error occure while loading, invoice can't be generated`)
  }
  const refund = await ctx.prisma.invSale.findMany({
    where: { refund_to: { in: sales.map((sale) => sale.id) } },
    select: {
      total: true,
    },
  })
  const data = []
  const payment = []
  let total_discount_amount = 0
  let inv_total = 0
  let paid_amount = 0
  let total
  sales.map((sale) => {
    if (sales.length > 1) {
      total_discount_amount += sale.discount_amount
      inv_total += sale.inv_total
      paid_amount += sale.paid_amount
      total += sale.total
    }
    if (sales.length === 1) {
      total_discount_amount = sale.discount_amount
      inv_total = sale.inv_total
      paid_amount = sale.paid_amount
      total = sale.total
    }
    if (sale?.SaleItem) {
      sale?.SaleItem.map((saleItem, index) => {
        const unit_price =
          saleItem.quantity * saleItem.unit_price - saleItem.val_tax
        const vat_multiplier = saleItem.Tax?.rate / 100 + 1
        const vat_value =
          saleItem.quantity > 1
            ? unit_price - unit_price / vat_multiplier
            : saleItem.tax_total
        const net_value = saleItem.gross_total - saleItem.val_tax - vat_value
        data.push({
          key: index,
          quantity: `${saleItem.quantity ?? 1}`,
          unitprice: (saleItem.unit_price ?? 0).toFixed(2),
          total: (vat_value + net_value ? vat_value + net_value : 0).toFixed(2),
          vat_per: saleItem?.Tax?.value ?? '0%',
          vat: (vat_value ? vat_value : 0).toFixed(2),
          net: (net_value ? net_value : 0).toFixed(2),
          after_disc: (saleItem.unit_price - saleItem.val_tax
            ? saleItem.unit_price - saleItem.val_tax
            : 0
          ).toFixed(2),
          disc_amount: (saleItem.val_tax ? saleItem.val_tax : 0).toFixed(2),
          disc_per: `${
            (saleItem.val_tax / saleItem.unit_price) * 100
              ? (saleItem.val_tax / saleItem.unit_price) * 100
              : 0
          }%`,
          description: saleItem.discount_reason ?? '',
          date: sale?.Booking[0]?.service ? sale.date : 0,
          category: saleItem.Product?.InvCategory?.name ?? '',
          practitioner: sale?.Booking[0]?.User?.full_name ?? '',
          product: saleItem.Product?.name ?? '',
          sku: saleItem.Product?.sku ?? '',
        })
        return saleItem
      })
    }
    if (sale?.InvPayment) {
      sale?.InvPayment?.map((paymentItem, index) => {
        payment.push({
          key: index,
          insurer: sales[0]?.InsuranceDetail?.insurer_name ?? '',
          payment_date: paymentItem.datetime ?? 0,
          payment_method: paymentItem.pmethod ?? '',
          payment_amount: (paymentItem.amount ?? 0).toFixed(2),
        })
        return paymentItem
      })
    }
    return sale
  })
  const sub_total = (total_discount_amount !== 0
    ? inv_total + total_discount_amount
    : inv_total
  ).toFixed(2)
  const payment_method_data = sales?.map((i) => i.InvPayment)
  const pmethod = payment_method_data[0]?.map((i) => i.pmethod)
  const details = {
    key: input?.saleId,
    total_vat: Number.parseFloat(
      data?.reduce((prev, cur) => {
        return prev + Number(cur.vat) ?? 0
      }, 0)
    ).toFixed(2),
    amount_paid: (paid_amount ? paid_amount : 0).toFixed(2),
    sub_total_amount: sub_total ? sub_total : '0.00',
    outstanding: (paid_amount ? paid_amount : 0).toFixed(2),
    grand_total: Number.parseFloat(
      sub_total + total_discount_amount
        ? sub_total + total_discount_amount
        : '0.00'
    ).toFixed(2),
    refund_amount: refund
      ?.reduce((prev, cur) => {
        return prev + cur.total ?? 0
      }, 0)
      .toFixed(2),
    paid: payment
      ?.reduce((prev, cur) => {
        return prev + Number.parseFloat(cur.payment_amount)
      }, 0)
      .toFixed(2),
    total_net: Number.parseFloat(
      data?.reduce((prev, cur) => {
        return prev + Number(cur.net) ?? 0
      }, 0)
    ).toFixed(2),
    payment_time: sales[0]?.InvPayment[0]?.datetime,
    total: (total ? total : 0).toFixed(2),
    card: pmethod?.filter((i) => i === 'card').length ?? 0,
    cash: pmethod?.filter((i) => i === 'cash').length ?? 0,
  }

  return {
    details: {
      issue_to: sales[0]?.InsuranceDetail?.insurer_name ?? '',
      issue_by: sales[0]?.User?.full_name,
      invoice_id: sales[0]?.custom_id,
      date: sales[0]?.date,
    },
    items: data,
    payments: payment,
    payment_details: details,
  }
}

export const getStatementData = async (
  ctx: Context,
  input: StatementArgs
): Promise<StatementOutput> => {
  const sales = await ctx.prisma.invSale.findMany({
    where: {
      AND: [
        { company_id: { equals: ctx.authenticated.company } },
        { location_id: { equals: input?.locationId } },
        { customer_id: { equals: input?.customerId } },
        {
          date: {
            gte: input?.statementPeriodFrom,
            lte: input?.statementPeriodTo,
          },
        },
      ],
    },
    select: {
      id: true,
      paid_amount: true,
      discount_amount: true,
      inv_total: true,
      total: true,
      custom_id: true,
      date: true,
      User: {
        select: {
          full_name: true,
        },
      },
      InsuranceDetail: {
        select: {
          insurer_name: true,
        },
      },
      Booking: {
        select: {
          User: {
            select: {
              full_name: true,
            },
          },
        },
      },
      InvPayment: {
        select: {
          datetime: true,
          pmethod: true,
          amount: true,
        },
      },
      SaleItem: {
        select: {
          VAT_id: true,
          tax_total: true,
          gross_total: true,
          quantity: true,
          unit_price: true,
          val_tax: true,
          discount_reason: true,
          created_date: true,
          product_category_name: true,
          Tax: {
            select: {
              rate: true,
              value: true,
            },
          },
          Product: {
            select: {
              sku: true,
              name: true,
              InvCategory: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  })
  if (!sales) {
    throw new Error(`Error occure while loading, satement can't be generated`)
  }
  const refund = await ctx.prisma.invSale.findMany({
    where: { refund_to: { in: sales.map((sale) => sale.id) } },
    select: {
      total: true,
    },
  })
  const data = []
  const payment = []
  let total_discount_amount = 0
  let inv_total = 0
  let paid_amount = 0
  sales.map((sale) => {
    if (sales.length > 1) {
      total_discount_amount += sale.discount_amount
      inv_total += sale.inv_total
      paid_amount += sale.paid_amount
    }
    if (sales.length === 1) {
      total_discount_amount = sale.discount_amount
      inv_total = sale.inv_total
      paid_amount = sale.paid_amount
    }
    if (sale?.SaleItem) {
      sale?.SaleItem.map((saleItem, index) => {
        const unit_price =
          saleItem.quantity * saleItem.unit_price - saleItem.val_tax
        const vat_multiplier = saleItem.Tax?.rate / 100 + 1
        const vat_value =
          saleItem.quantity > 1
            ? unit_price - unit_price / vat_multiplier
            : saleItem.tax_total
        const net_value = saleItem.gross_total - saleItem.val_tax - vat_value
        data.push({
          key: index,
          quantity: `${saleItem.quantity ?? 1}`,
          unitprice: (saleItem.unit_price ?? 0).toFixed(2),
          total: (vat_value + net_value ? vat_value + net_value : 0).toFixed(2),
          vat_per: saleItem?.Tax?.value ?? '0%',
          vat: (vat_value ? vat_value : 0).toFixed(2),
          net: (net_value ? net_value : 0).toFixed(2),
          after_disc: (saleItem.unit_price - saleItem.val_tax
            ? saleItem.unit_price - saleItem.val_tax
            : 0
          ).toFixed(2),
          disc_amount: (saleItem.val_tax ? saleItem.val_tax : 0).toFixed(2),
          disc_per: `${
            (saleItem.val_tax / saleItem.unit_price) * 100
              ? (saleItem.val_tax / saleItem.unit_price) * 100
              : 0
          }%`,
          description: saleItem.discount_reason ?? '',
          date: sale.date ?? 0,
          category: saleItem.Product?.InvCategory?.name ?? '',
          practitioner: sale?.Booking[0]?.User?.full_name ?? '',
          product: saleItem.Product?.name ?? '',
          sku: saleItem.Product?.sku ?? '',
        })
        return saleItem
      })
    }
    if (sale?.InvPayment) {
      sale?.InvPayment?.map((paymentItem, index) => {
        payment.push({
          key: index,
          insurer: sales[0]?.InsuranceDetail?.insurer_name ?? '',
          payment_date: paymentItem.datetime ?? 0,
          payment_method: paymentItem.pmethod ?? '',
          payment_amount: (paymentItem.amount ?? 0).toFixed(2),
        })
        return paymentItem
      })
    }
    return sale
  })
  const sub_total = (total_discount_amount !== 0
    ? inv_total + total_discount_amount
    : inv_total
  ).toFixed(2)
  const details = {
    key: input?.customerId,
    total_vat: Number.parseFloat(
      data?.reduce((prev, cur) => {
        return prev + Number(cur.vat) ?? 0
      }, 0)
    ).toFixed(2),
    amount_paid: (paid_amount ? paid_amount : 0).toFixed(2),
    sub_total_amount: sub_total ? sub_total : '0.00',
    outstanding: (paid_amount ? paid_amount : 0).toFixed(2),
    grand_total: Number.parseFloat(
      sub_total + total_discount_amount
        ? sub_total + total_discount_amount
        : '0.00'
    ).toFixed(2),
    refund_amount: refund
      ?.reduce((prev, cur) => {
        return prev + cur.total ?? 0
      }, 0)
      .toFixed(2),
    paid: Number.parseFloat(
      payment?.reduce((prev, cur) => {
        return prev + Number(cur.payment_amount) ?? 0
      }, 0)
    ).toFixed(2),
    total_net: Number.parseFloat(
      data?.reduce((prev, cur) => {
        return prev + Number(cur.net) ?? 0
      }, 0)
    ).toFixed(2),
  }

  return {
    details: {
      issue_to: sales[0]?.InsuranceDetail?.insurer_name ?? '',
      issue_by: sales[0]?.User?.full_name ?? '',
      invoice_id: sales[0]?.custom_id,
    },
    items: data,
    payments: details,
  }
}

export const retrieveSalesCount = async (
  ctx: Context,
  data: DateRangeInput
) => {
  const start_date = dayjs(`${data.start_date}` as 'YYYYMMDDHHmmss').format(
    'YYYY-MM-DDTHH:mm:ssZ'
  )
  const end_date = dayjs(`${data.end_date}` as 'YYYYMMDDHHmmss').format(
    'YYYY-MM-DDTHH:mm:ssZ'
  )
  const prev_data = getPreviousDateRange(data.start_date, data.end_date)
  let prevSales = []
  prevSales = await ctx.prisma
    .$queryRaw`select SUM(b.total) from inv_sale_items a
  inner join inv_sales b on b.id=a.sale_id
  WHERE ${
    prev_data.prevStartDate && prev_data.prevEndDate
      ? Prisma.sql`b.date BETWEEN ${prev_data.prevStartDate} and ${prev_data.prevEndDate} and`
      : Prisma.empty
  } sale_id>0 and product_category_type not in ('') and b.occupier = ${
    ctx.authenticated.company
  } ${
    data.location_id
      ? Prisma.sql`and b.location_id=${data.location_id}`
      : Prisma.empty
  }${data.user_id ? Prisma.sql`and b.User_id=${data.user_id}` : Prisma.empty}`

  const SalesList = []
  let sale = []
  sale = await ctx.prisma
    .$queryRaw`select product_category_type, count(sale_id), SUM(b.total) from inv_sale_items a
    inner join inv_sales b on b.id=a.sale_id
    WHERE ${
      data.start_date && data.end_date
        ? Prisma.sql`b.date BETWEEN ${start_date} and ${end_date} and`
        : Prisma.empty
    } sale_id>0 and product_category_type not in ('') and b.occupier = ${
    ctx.authenticated.company
  } ${
    data.location_id
      ? Prisma.sql`and b.location_id=${data.location_id}`
      : Prisma.empty
  }${data.user_id ? Prisma.sql`and b.User_id=${data.user_id}` : Prisma.empty}
    group by product_category_type`
  sale?.map((item) => {
    if (item.product_category_type !== '') {
      SalesList.push({
        label: item.product_category_type,
        count: item['count(sale_id)'],
        per:
          (
            ((item['count(sale_id)'] ?? 0) * 100) /
            sale?.reduce((prev, cur) => {
              return prev + cur['count(sale_id)'] ?? 0
            }, 0)
          ).toFixed(2) + '%',
      })
    }
    return item
  })
  const totalAvailableCategoryTypePer = (sale?.length > 0 &&
  prev_data.prevStartDate &&
  prev_data.prevEndDate
    ? (sale?.reduce((prev, cur) => {
        return prev + cur['SUM(b.total)'] ?? 0
      }, 0) *
        100) /
        prevSales[0]['SUM(b.total)'] ?? 0
    : 0
  ).toFixed(2)

  return {
    totalAvailableCategoryTypeCount: sale?.reduce((prev, cur) => {
      return prev + cur['count(sale_id)'] ?? 0
    }, 0),
    totalAvailableCategoryTypeAmount: sale
      ?.reduce((prev, cur) => {
        return prev + cur['SUM(b.total)'] ?? 0
      }, 0)
      .toFixed(2),
    totalAvailableCategoryTypePer:
      (Number.isFinite(+totalAvailableCategoryTypePer)
        ? totalAvailableCategoryTypePer
        : '0.00') + '%',
    salesList: SalesList.length > 0 ? SalesList : null,
  }
}

export const retrieveSalesChartData = async (
  ctx: Context,
  data: DateRangeInput
) => {
  let final = []
  let sale
  let saleDataSet = []
  const start_date = dayjs(`${data.start_date}` as 'YYYYMMDDHHmmss').format(
    'YYYY-MM-DDTHH:mm:ssZ'
  )
  const end_date = dayjs(`${data.end_date}` as 'YYYYMMDDHHmmss').format(
    'YYYY-MM-DDTHH:mm:ssZ'
  )
  const endDate = dayjs(`${data.end_date}` as 'YYYYMMDDHHmmss').format(
    'YYYY-MM-DD'
  )
  const startDate = dayjs(`${data.start_date}` as 'YYYYMMDDHHmmss').format(
    'YYYY-MM-DD'
  )
  const month = dayjs(endDate).diff(startDate, 'month')
  const year = dayjs(endDate).diff(startDate, 'year')
  const week = dayjs(endDate).diff(startDate, 'week')
  const day = dayjs(endDate).diff(startDate, 'day')

  const getSalesDataSet = (saleSet) => {
    const dataset = []
    saleSet.map((record) => {
      const index = dataset.findIndex(
        (item) => item.product_category_type === record.product_category_type
      )
      if (index === -1) {
        const filter = saleSet.filter(
          (item) => item.product_category_type === record.product_category_type
        )
        const result = []
        dataset.push({
          status: record.product_category_type,
          dateRange: filter.map((i) => {
            result.push({
              label: i.grouping,
              value: i['count(sale_id)'],
            })
            return result
          }),
        })
      }
      return dataset
    })
    return dataset
  }

  switch (true) {
    case year > 0:
      sale = await ctx.prisma.$queryRaw`select product_category_type,
        YEAR(DATE_FORMAT(SUBSTRING(b.date,1,10),'%Y-%m-%d %T')) as grouping, count(sale_id) from inv_sale_items a
        inner join inv_sales b on b.id=a.sale_id
        WHERE b.date BETWEEN ${start_date} and ${end_date} and sale_id>0 and product_category_type not in ('') and b.occupier = ${
        ctx.authenticated.company
      } ${
        data.location_id
          ? Prisma.sql`and b.location_id=${data.location_id}`
          : Prisma.empty
      }${
        data.user_id ? Prisma.sql`and b.User_id=${data.user_id}` : Prisma.empty
      }
        group by product_category_type, GROUPING
        ORDER by product_category_type`
      saleDataSet = await getSalesDataSet(sale)
      final = statusDataByDayMonth('All records', saleDataSet, startDate)
      break
    case month > 0:
      sale = await ctx.prisma.$queryRaw`select product_category_type,
        MONTHNAME(DATE_FORMAT(SUBSTRING(b.date,1,10),'%Y-%m-%d %T')) as grouping, count(sale_id) from inv_sale_items a
        inner join inv_sales b on b.id=a.sale_id
        WHERE b.date BETWEEN ${start_date} and ${end_date} and sale_id>0 and product_category_type not in ('') and b.occupier = ${
        ctx.authenticated.company
      } ${
        data.location_id
          ? Prisma.sql`and b.location_id=${data.location_id}`
          : Prisma.empty
      }${
        data.user_id ? Prisma.sql`and b.User_id=${data.user_id}` : Prisma.empty
      }
        group by product_category_type, GROUPING
        ORDER by product_category_type`
      saleDataSet = await getSalesDataSet(sale)
      final = statusDataByDayMonth('This Year', saleDataSet, startDate)
      break
    case week > 0:
      sale = await ctx.prisma.$queryRaw`select product_category_type,
        DATE(DATE_FORMAT(SUBSTRING(b.date,1,10),'%Y-%m-%d %T')) as grouping, count(sale_id) from inv_sale_items a
        inner join inv_sales b on b.id=a.sale_id
        WHERE b.date BETWEEN ${start_date} and ${end_date} and sale_id>0 and product_category_type not in ('') and b.occupier = ${
        ctx.authenticated.company
      } ${
        data.location_id
          ? Prisma.sql`and b.location_id=${data.location_id}`
          : Prisma.empty
      }${
        data.user_id ? Prisma.sql`and b.User_id=${data.user_id}` : Prisma.empty
      }
        group by product_category_type, GROUPING
        ORDER by product_category_type`
      saleDataSet = await getSalesDataSet(sale)
      final = statusDataByDayMonth('This Month', saleDataSet, startDate)
      break
    case day >= 0:
      sale = await ctx.prisma.$queryRaw`select product_category_type,
        DAYNAME(DATE_FORMAT(SUBSTRING(b.date,1,10),'%Y-%m-%d %T')) as grouping, count(sale_id) from inv_sale_items a
        inner join inv_sales b on b.id=a.sale_id
        WHERE b.date BETWEEN ${start_date} and ${end_date} and sale_id>0 and product_category_type not in ('') and b.occupier = ${
        ctx.authenticated.company
      } ${
        data.location_id
          ? Prisma.sql`and b.location_id=${data.location_id}`
          : Prisma.empty
      }${
        data.user_id ? Prisma.sql`and b.User_id=${data.user_id}` : Prisma.empty
      }
        group by product_category_type, GROUPING
        ORDER by product_category_type`
      saleDataSet = await getSalesDataSet(sale)
      final = statusDataByDayMonth('This Week', saleDataSet, startDate)
      break
    default:
      sale = await ctx.prisma.$queryRaw`select product_category_type,
        YEAR(DATE_FORMAT(SUBSTRING(b.date,1,10),'%Y-%m-%d %T')) as grouping, count(sale_id) from inv_sale_items a
        inner join inv_sales b on b.id=a.sale_id
        WHERE product_category_type not in ('') and b.occupier = ${
          ctx.authenticated.company
        } ${
        data.location_id
          ? Prisma.sql`and b.location_id=${data.location_id}`
          : Prisma.empty
      }${
        data.user_id ? Prisma.sql`and b.User_id=${data.user_id}` : Prisma.empty
      }
        group by product_category_type, GROUPING
        ORDER by product_category_type`
      saleDataSet = await getSalesDataSet(sale)
      final = statusDataByDayMonth('All records', saleDataSet, startDate)
      break
  }
  return {
    salesByProductCategoryType: final ?? null,
  }
}

export const retrieveRetailSalesData = async (
  ctx: Context,
  data: DateRangeInput
) => {
  const ratailData = await ctx.prisma
    .$queryRaw`SELECT a.product_category_name , SUM(a.quantity) , SUM(b.total) FROM inv_sale_items a
    INNER JOIN inv_sales b on a.sale_id=b.id
    where ${
      data.start_date && data.end_date
        ? Prisma.sql`b.date BETWEEN ${data.start_date} and ${data.end_date} and`
        : Prisma.empty
    } a.product_category_type="retail" and product_category_type not in ('') and a.product_id>0 and b.occupier = ${
    ctx.authenticated.company
  } ${
    data.location_id
      ? Prisma.sql`and b.location_id=${data.location_id}`
      : Prisma.empty
  }${data.user_id ? Prisma.sql`and b.User_id=${data.user_id}` : Prisma.empty}
    GROUP BY a.product_category_name`

  const total = ratailData?.reduce((prev, cur) => {
    return prev + cur['SUM(b.total)'] ?? 0
  }, 0)
  const Details = []
  if (ratailData) {
    ratailData.map((item) => {
      if (item.product_category_name) {
        Details.push({
          name: item.product_category_name,
          units: item['SUM(a.quantity)'],
          value: item['SUM(b.total)'].toFixed(2),
          per: `${((item['SUM(b.total)'] * 100) / total).toFixed(2)}%`,
        })
      }
      return Details
    })
    if (ratailData.length > 0) {
      Details.push({
        name: 'Total',
        units: ratailData?.reduce((prev, cur) => {
          return prev + cur['SUM(a.quantity)'] ?? 0
        }, 0),
        value: total.toFixed(2),
        per: `${((total * 100) / total).toFixed(2)}%`,
      })
    }
  }
  return {
    retailSalesDetails: Details ?? [],
  }
}

export const retrieveServiceSalesData = async (
  ctx: Context,
  data: DateRangeInput
) => {
  const serviceData = await ctx.prisma
    .$queryRaw`SELECT a.product_category_name , SUM(a.quantity) , SUM(b.total) FROM inv_sale_items a
    INNER JOIN inv_sales b on a.sale_id=b.id
    where ${
      data.start_date && data.end_date
        ? Prisma.sql`b.date BETWEEN ${data.start_date} and ${data.end_date} and`
        : Prisma.empty
    } a.product_category_type="service" and product_category_type not in ('') and a.product_id>0 and b.occupier = ${
    ctx.authenticated.company
  } ${
    data.location_id
      ? Prisma.sql`and b.location_id=${data.location_id}`
      : Prisma.empty
  }${data.user_id ? Prisma.sql`and b.User_id=${data.user_id}` : Prisma.empty}
    GROUP BY a.product_category_name`
  const total = serviceData?.reduce((prev, cur) => {
    return prev + cur['SUM(b.total)'] ?? 0
  }, 0)
  const Details = []
  if (serviceData) {
    serviceData.map((item) => {
      if (item.product_category_name) {
        Details.push({
          name: item.product_category_name,
          units: item['SUM(a.quantity)'],
          value: item['SUM(b.total)'].toFixed(2),
          per: `${((item['SUM(b.total)'] * 100) / total).toFixed(2)}%`,
        })
      }
      return Details
    })
    if (serviceData.length > 0) {
      Details.push({
        name: 'Total',
        units: serviceData?.reduce((prev, cur) => {
          return prev + cur['SUM(a.quantity)'] ?? 0
        }, 0),
        value: total.toFixed(2),
        per: `${((total * 100) / total).toFixed(2)}%`,
      })
    }
  }
  return {
    serviceSalesDetails: Details ?? [],
  }
}
export const retriveOtherDetails = async (
  ctx: Context,
  data: DateRangeInput
) => {
  let year = 0
  let month = 0
  let week = 0
  let day = 0
  if (data.start_date && data.end_date) {
    const endDate = dayjs(`${data.end_date}` as 'YYYYMMDDHHmmss').format(
      'YYYY-MM-DD'
    )
    const startDate = dayjs(`${data.start_date}` as 'YYYYMMDDHHmmss').format(
      'YYYY-MM-DD'
    )
    month = dayjs(endDate).diff(startDate, 'month')
    year = dayjs(endDate).diff(startDate, 'year')
    week = dayjs(endDate).diff(startDate, 'week')
    day = dayjs(endDate).diff(startDate, 'day')
  } else {
    const allRecordDates = await ctx.prisma
      .$queryRaw`SELECT MIN(b.created_date),MAX(b.created_date) FROM inv_sale_items a INNER JOIN inv_sales b on a.sale_id=b.id where b.occupier = ${ctx.authenticated.company}`
    const startDate = dayjs(
      `${allRecordDates[0]['MIN(b.created_date)']}` as 'YYYY-MM-DDTHH:mm:ssZ'
    ).format('YYYY-MM-DD')
    const endDate = dayjs(
      `${allRecordDates[0]['MAX(b.created_date)']}` as 'YYYY-MM-DDTHH:mm:ssZ'
    ).format('YYYY-MM-DD')
    month = dayjs(endDate).diff(startDate, 'month')
    year = dayjs(endDate).diff(startDate, 'year')
    week = dayjs(endDate).diff(startDate, 'week')
    day = dayjs(endDate).diff(startDate, 'day')
  }

  const newClientCount = await ctx.prisma
    .$queryRaw`SELECT count(CreatedDate) from cm_contacts where Occupier = ${
    ctx.authenticated.company
  } ${
    (data.start_date && data.end_date) || data.location_id || data.user_id
      ? Prisma.sql`and`
      : Prisma.empty
  } ${
    data.start_date && data.end_date
      ? Prisma.sql`CreatedDate BETWEEN ${data.start_date} and ${data.end_date}`
      : Prisma.empty
  } ${
    data.location_id && data.start_date && data.end_date
      ? Prisma.sql`and location_id=${data.location_id}`
      : data.location_id && !data.start_date && !data.end_date
      ? Prisma.sql`location_id=${data.location_id}`
      : Prisma.empty
  }${
    data.user_id && data.start_date && data.end_date
      ? Prisma.sql`and OwnerID=${data.user_id}`
      : data.user_id && !data.start_date && !data.end_date
      ? Prisma.sql`OwnerID=${data.user_id}`
      : Prisma.empty
  }`

  const avgBiller = await ctx.prisma
    .$queryRaw`SELECT AVG(b.total) FROM inv_sale_items a INNER JOIN inv_sales b on a.sale_id=b.id where b.occupier = ${
    ctx.authenticated.company
  } ${
    (data.start_date && data.end_date) || data.location_id || data.user_id
      ? Prisma.sql`and`
      : Prisma.empty
  } ${
    data.start_date && data.end_date
      ? Prisma.sql`b.date BETWEEN ${data.start_date} and ${data.end_date}`
      : Prisma.empty
  } ${
    data.location_id && data.start_date && data.end_date
      ? Prisma.sql`and b.location_id=${data.location_id}`
      : data.location_id && !data.start_date && !data.end_date
      ? Prisma.sql`b.location_id=${data.location_id}`
      : Prisma.empty
  }${
    data.user_id && data.start_date && data.end_date
      ? Prisma.sql`and b.User_id=${data.user_id}`
      : data.user_id && !data.start_date && !data.end_date
      ? Prisma.sql`b.User_id=${data.user_id}`
      : Prisma.empty
  }`

  const total = await ctx.prisma
    .$queryRaw`SELECT SUM(b.total) FROM inv_sale_items a INNER JOIN inv_sales b on a.sale_id=b.id where b.occupier = ${
    ctx.authenticated.company
  } ${
    (data.start_date && data.end_date) || data.location_id || data.user_id
      ? Prisma.sql`and`
      : Prisma.empty
  } ${
    data.start_date && data.end_date
      ? Prisma.sql`b.date BETWEEN ${data.start_date} and ${data.end_date}`
      : Prisma.empty
  } ${
    data.location_id && data.start_date && data.end_date
      ? Prisma.sql`and b.location_id=${data.location_id}`
      : data.location_id && !data.start_date && !data.end_date
      ? Prisma.sql`b.location_id=${data.location_id}`
      : Prisma.empty
  }${
    data.user_id && data.start_date && data.end_date
      ? Prisma.sql`and b.User_id=${data.user_id}`
      : data.user_id && !data.start_date && !data.end_date
      ? Prisma.sql`b.User_id=${data.user_id}`
      : Prisma.empty
  }`
  let RevPerhour = 0
  switch (true) {
    case year > 0:
      RevPerhour = total[0]['SUM(b.total)'] / (year * month * week * day * 24)
      break
    case month > 0:
      RevPerhour = total[0]['SUM(b.total)'] / (month * week * day * 24)
      break
    case week > 0:
      RevPerhour = total[0]['SUM(b.total)'] / (week * day * 24)
      break
    case day >= 0:
      RevPerhour = total[0]['SUM(b.total)'] / (day * 24)
      break
  }
  return {
    newClientCount: newClientCount[0]['count(CreatedDate)'] ?? 0,
    avgBiller: (avgBiller[0]['AVG(b.total)'] ?? 0).toFixed(2),
    RevPerhour: (Number.isFinite(RevPerhour) ? RevPerhour : 0).toFixed(2),
  }
}
