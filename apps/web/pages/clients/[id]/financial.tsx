import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { TabMenu } from '@pabau/ui'
import dayjs from 'dayjs'
import { ClientCardLayout } from '../../../components/Clients/ClientCardLayout'
import {
  Invoices,
  ISalesItemProps,
  InitialFilterValue,
} from '../../../components/ClientCard/client-financial-layout/invoices/Invoices'
import { Payments } from '../../../components/ClientCard/client-financial-layout/payments/Payments'
import { Items } from '../../../components/ClientCard/client-financial-layout/items/Items'
import { Voided } from '../../../components/ClientCard/client-financial-layout/voided/Voided'
import { Statements } from '../../../components/ClientCard/client-financial-layout/statements/Statements'
import { useQuery } from '@apollo/client'
import {
  GetFinanceInvoicesDocument,
  TotalFinanceInvoiceCountDocument,
  GetInvoiceDocument,
  GetFullInvoicesDocument,
} from '@pabau/graphql'
import {
  financialInvoices,
  financialPayments,
  financialItems,
  financialVoidedPayments,
  financialStatements,
  invoiceEmployeeOptions,
  locationOptions,
} from '../../../mocks/ClientCardMock'

const Appointments = () => {
  const router = useRouter()
  const props = {
    ...financialInvoices,
    payments: financialPayments,
    items: financialItems,
    voidedPayments: financialVoidedPayments,
    statements: financialStatements,
  }
  const [data, setData] = useState(props)
  const [pagination, setPagination] = useState({
    take: 10,
    skip: 0,
  })
  const [saleId, setSaleId] = useState(0)
  const [saleItems, setSaleItem] = useState<ISalesItemProps[]>()
  const [totalVat, setTotalVat] = useState(0)
  const [invoiceFilter, setInvoiceFilter] = useState<InitialFilterValue>({
    type: 'all',
    employee: 'all',
    location: 'all',
    dateStart: '',
    dateEnd: '',
  })

  const getQueryVariables = useMemo(() => {
    const queryOptions = {
      skip: !router.query.id,
      variables: {
        take: pagination.take,
        skip: pagination.skip,
        where: {
          customer_id: { equals: Number.parseInt(`${router.query.id}`) },
          billers:
            invoiceFilter.employee === 'all'
              ? { contains: '%%' }
              : { equals: invoiceFilter.employee },
          location_name:
            invoiceFilter.location === 'all'
              ? { contains: '%%' }
              : { equals: invoiceFilter.location },
          date:
            invoiceFilter.dateStart && invoiceFilter.dateEnd
              ? { gte: invoiceFilter.dateStart, lte: invoiceFilter.dateEnd }
              : {},
          amount:
            invoiceFilter.type === 'outstanding_invoices' ? { gt: 0 } : {},
          status:
            invoiceFilter.type === 'paid_invoice'
              ? { equals: 'paid' }
              : { contains: '%%' },
        },
      },
    }
    return queryOptions
  }, [pagination.take, pagination.skip, router.query.id, invoiceFilter])

  const getsalesDetailsQueryVariables = useMemo(() => {
    const queryOptions = {
      skip: saleId === 0,
      variables: {
        id: Number.parseInt(`${saleId}`),
      },
    }
    return queryOptions
  }, [saleId])

  const { data: totalInvoices } = useQuery(TotalFinanceInvoiceCountDocument, {
    skip: !router.query.id,
    variables: {
      where: {
        customer_id: { equals: Number.parseInt(`${router.query.id}`) },
        billers:
          invoiceFilter.employee === 'all'
            ? { contains: '%%' }
            : { equals: invoiceFilter.employee },
        location_name:
          invoiceFilter.location === 'all'
            ? { contains: '%%' }
            : { equals: invoiceFilter.location },
        date:
          invoiceFilter.dateStart && invoiceFilter.dateEnd
            ? { gte: invoiceFilter.dateStart, lte: invoiceFilter.dateEnd }
            : {},
        amount: invoiceFilter.type === 'outstanding_invoices' ? { gt: 0 } : {},
        status:
          invoiceFilter.type === 'paid_invoice'
            ? { equals: 'paid' }
            : { contains: '%%' },
      },
    },
  })
  const { data: allInvoice } = useQuery(GetFullInvoicesDocument, {
    skip: !router.query.id,
    variables: {
      id: Number.parseInt(`${router.query.id}`),
    },
  })
  const { data: invoice } = useQuery(
    GetFinanceInvoicesDocument,
    getQueryVariables
  )

  const { data: salesDetails } = useQuery(
    GetInvoiceDocument,
    getsalesDetailsQueryVariables
  )

  useEffect(() => {
    const items: ISalesItemProps[] = []
    let total_vat = 0
    salesDetails?.invoice?.SaleItem?.map((item, index) => {
      items.push({
        employee: '',
        id: index,
        name: item.product_name,
        quantity: item.quantity,
        price: item.unit_price + item.val_tax,
        tax: item.tax_total,
        discount: item.UnitDiscount,
        totalPrice:
          item.quantity *
          (item.unit_price - item.UnitDiscount + item.tax_total),
      })
      const unit_price = item.quantity * item.unit_price - item.val_tax
      const vat_multiplier = item.Tax?.rate / 100 + 1
      const vat_value =
        item.quantity > 1
          ? unit_price - unit_price / vat_multiplier
          : item.tax_total
      total_vat += vat_value
      return items
    })
    setTotalVat(total_vat)
    setSaleItem(items)
  }, [salesDetails])

  useEffect(() => {
    const invoices = []
    if (invoice) {
      invoice.findManyInvDetail.map((item) => {
        const discount = salesDetails?.invoice?.discount_amount
        const inv_total = salesDetails?.invoice?.inv_total
        invoices.push({
          id: `${item.id}`,
          type: 'package',
          date: dayjs(`${item.date}`).format('DD/MM/YYYY'),
          location: item.location_name,
          employee: item.billers,
          issuedTo: item.issue_to,
          paid: item.status === 'paid' ? true : false,
          items: saleItems,
          totalVat: totalVat,
          amountPaid: salesDetails?.invoice?.paid_amount,
          subtotal: discount !== 0 ? inv_total + discount : inv_total,
          tips: salesDetails?.invoice?.tip,
          grandTotal: item.amount,
          paymentStatus: 2,
          paymentStatusTooltip:
            'Full payment received on Sunday, 16 May 2021 at CHISSY BEAUTY STUDIO by Chissy Stylist',
          tip: {
            amount: '10',
            type: '%',
            staff: 'John Doe',
          },
          history: [
            {
              title: 'Issued to: Vedran Taneski',
              date: 'Last Friday at 3:00 PM',
              notif_by: 'Ben Gough',
              type: 'issue',
            },
            {
              title: 'Invoice issue',
              date: '12 Mar at 3:00 PM',
              description:
                'Dear John, I have gone ahead and looked to book an appointment in with Dr Smith Brandham for next Thursday if that time works ok with you?',
              notif_by: 'Martin Wade',
              views: 2,
              type: 'email',
            },
            {
              title: 'Refund #38128',
              date: '12 Mar at 3:00 PM',
              notif_by: 'Martin Wade',
              amount: 32,
              type: 'refund',
            },
            {
              title: 'Payment deleted #38128',
              date: '12 Mar at 3:00 PM',
              notif_by: 'Martin Wade',
              amount: 41,
              type: 'delete',
            },
            {
              title: 'Payment added #38128',
              date: '12 Mar at 3:00 PM',
              notif_by: 'Martin Wade',
              amount: 41,
              type: 'add',
            },
          ],
          payments: [
            {
              id: 1,
              employee: 'Anika Kadir',
              method: 'Electronic Transfer',
              amount: 28,
              date: '18/12/2020',
              note: '',
              showNote: false,
              noteSaved: false,
            },
            {
              id: 2,
              employee: 'John Doe',
              method: 'Electronic Transfer',
              amount: 400,
              date: '02/12/2020',
              note: 'edited prices',
              showNote: true,
              noteSaved: true,
            },
          ],
        })
        return invoices
      })
      data.invoices = invoices
      setData({
        ...data,
        totalOutstanding: salesDetails
          ? salesDetails?.invoice?.paid_amount
          : invoice?.findManyInvDetail[0]?.amount ?? 0,
        totalInvoiced: salesDetails
          ? salesDetails?.invoice?.inv_total
          : invoice?.findManyInvDetail[0]?.amount ?? 0,
        payments: financialPayments,
        items: financialItems,
        voidedPayments: financialVoidedPayments,
        statements: financialStatements,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoice, saleItems, totalVat])
  const handlePagination = (take, skip) => {
    setPagination({
      take: take,
      skip: skip,
    })
  }
  const handleExpandsionClick = (key) => {
    setSaleId(key)
  }
  const handleFilter = (type, employee, location, dateStart, dateEnd) => {
    setInvoiceFilter({
      type: type,
      employee: employee,
      location: location,
      dateEnd: dateEnd,
      dateStart: dateStart,
    })
  }

  return (
    <ClientCardLayout
      clientId={Number(router.query['id'])}
      activeTab="financial"
    >
      <TabMenu
        minHeight={'0vh'}
        tabPosition="top"
        menuItems={[
          `Invoices (${totalInvoices?.aggregateInvDetail?.count?.id ?? 0})`,
          `Payments`,
          `Items`,
          `Voided`,
          `Statements`,
        ]}
      >
        <Invoices
          dataProps={data}
          invoiceEmployeeOptions={
            ([
              ...new Set(
                allInvoice?.findManyInvDetail?.map((item) => item.billers)
              ),
            ].filter((item) => !!item) as string[]) ?? []
          }
          locationOptions={
            ([
              ...new Set(
                allInvoice?.findManyInvDetail?.map((item) => item.location_name)
              ),
            ].filter((item) => !!item) as string[]) ?? []
          }
          onChangePagination={handlePagination}
          totalInoviceCount={totalInvoices?.aggregateInvDetail?.count?.id}
          onExpand={handleExpandsionClick}
          onFilterSubmit={handleFilter}
        />
        <Payments {...data} />
        <Items
          dataProps={data}
          invoiceEmployeeOptions={invoiceEmployeeOptions}
        />
        <Voided {...data} />
        <Statements dataProps={data} locationOptions={locationOptions} />
      </TabMenu>
    </ClientCardLayout>
  )
}

export default Appointments
