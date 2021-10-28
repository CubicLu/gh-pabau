import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { TabMenu } from '@pabau/ui'
import { ClientCardLayout } from '../../../components/Clients/ClientCardLayout'
import {
  Invoices,
  InitialFilterValue,
} from '../../../components/ClientCard/client-financial-layout/invoices/Invoices'
import { Payments } from '../../../components/ClientCard/client-financial-layout/payments/Payments'
import { Items } from '../../../components/ClientCard/client-financial-layout/items/Items'
import { Voided } from '../../../components/ClientCard/client-financial-layout/voided/Voided'
import { Statements } from '../../../components/ClientCard/client-financial-layout/statements/Statements'
import { useQuery } from '@apollo/client'
import {
  GetFinancialInvoicesDocument,
  TotalInvoiceCountDocument,
  SaleItemsDocument,
  GetContactInvoicesDocument,
  TotalPaymentsCountDocument,
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

const Financial = () => {
  const router = useRouter()
  const props = {
    ...financialInvoices,
    payments: financialPayments,
    items: financialItems,
    voidedPayments: financialVoidedPayments,
    statements: financialStatements,
  }
  const [pagination, setPagination] = useState({
    take: 50,
    skip: 0,
  })
  const [saleId, setSaleId] = useState('')
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
            invoiceFilter.type === 'paid'
              ? { equals: 'paid' }
              : { contains: '%%' },
        },
      },
    }
    return queryOptions
  }, [pagination.take, pagination.skip, router.query.id, invoiceFilter])

  const getsalesDetailsQueryVariables = useMemo(() => {
    const queryOptions = {
      skip: !saleId,
      variables: {
        guid: saleId,
      },
    }
    return queryOptions
  }, [saleId])

  const { data: totalInvoices } = useQuery(TotalInvoiceCountDocument, {
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
          invoiceFilter.type === 'paid'
            ? { equals: 'paid' }
            : { contains: '%%' },
      },
    },
  })
  const { data: allInvoice } = useQuery(GetContactInvoicesDocument, {
    skip: !router.query.id,
    variables: {
      contactID: Number.parseInt(`${router.query.id}`),
    },
  })
  const { data: invoice, loading } = useQuery(
    GetFinancialInvoicesDocument,
    getQueryVariables
  )

  const { data: salesDetails, loading: salesDetaillLoading } = useQuery(
    SaleItemsDocument,
    getsalesDetailsQueryVariables
  )

  const { data: totalPaymentCounts } = useQuery(TotalPaymentsCountDocument, {
    skip: !router.query.id,
    variables: {
      ContactID: Number.parseInt(`${router.query.id}`),
    },
  })
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
          `Invoices (${totalInvoices?.aggregateInvoice?.count?.id ?? 0})`,
          `Payments (${
            totalPaymentCounts?.aggregateInvPayment?.count?.id ?? 0
          })`,
          `Items`,
          `Voided`,
          `Statements`,
        ]}
      >
        <Invoices
          invoice={invoice}
          salesDetails={salesDetails}
          loading={loading}
          salesDetaillLoading={salesDetaillLoading}
          invoiceEmployeeOptions={
            ([
              ...new Set(
                allInvoice?.findManyInvoice?.map((item) => item.billers)
              ),
            ].filter((item) => !!item) as string[]) ?? []
          }
          locationOptions={
            ([
              ...new Set(
                allInvoice?.findManyInvoice?.map((item) => item.location_name)
              ),
            ].filter((item) => !!item) as string[]) ?? []
          }
          onChangePagination={handlePagination}
          totalInvoiceCount={totalInvoices?.aggregateInvoice?.count?.id}
          onExpand={handleExpandsionClick}
          onFilterSubmit={handleFilter}
        />
        <Payments
          {...props}
          totalPaymentCounts={totalPaymentCounts}
          clientId={Number.parseInt(`${router.query.id}`)}
        />
        <Items
          dataProps={props}
          invoiceEmployeeOptions={invoiceEmployeeOptions}
        />
        <Voided {...props} />
        <Statements dataProps={props} locationOptions={locationOptions} />
      </TabMenu>
    </ClientCardLayout>
  )
}

export default Financial
