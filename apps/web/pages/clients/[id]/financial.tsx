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
    take: 10,
    skip: 0,
  })
  const [saleId, setSaleId] = useState(0)
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
          invoiceFilter.type === 'paid'
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
  const { data: invoice, loading } = useQuery(
    GetFinanceInvoicesDocument,
    getQueryVariables
  )

  const { data: salesDetails, loading: salesDetaillLoading } = useQuery(
    GetInvoiceDocument,
    getsalesDetailsQueryVariables
  )
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
          `Payments`,
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
          totalInoviceCount={totalInvoices?.aggregateInvoice?.count?.id}
          onExpand={handleExpandsionClick}
          onFilterSubmit={handleFilter}
        />
        <Payments {...props} />
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
