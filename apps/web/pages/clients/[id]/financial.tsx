import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { TabMenu } from '@pabau/ui'
import { ClientCardLayout } from '../../../components/Clients/ClientCardLayout'
import { Invoices } from '../../../components/ClientCard/client-financial-layout/invoices/Invoices'
import { Payments } from '../../../components/ClientCard/client-financial-layout/payments/Payments'
import { Items } from '../../../components/ClientCard/client-financial-layout/items/Items'
import { useQuery } from '@apollo/client'
import {
  GetFinancialInvoicesDocument,
  TotalInvoiceCountDocument,
  SaleItemsDocument,
  TotalPaymentsCountDocument,
  CountContactSaleItemDocument,
} from '@pabau/graphql'

const Financial = () => {
  const router = useRouter()
  const [pagination, setPagination] = useState({
    take: 50,
    skip: 0,
  })
  const [saleId, setSaleId] = useState('')

  const getQueryVariables = useMemo(() => {
    const queryOptions = {
      skip: !router.query.id,
      variables: {
        take: pagination.take,
        skip: pagination.skip,
        contactID: Number.parseInt(`${router.query.id}`),
      },
    }
    return queryOptions
  }, [pagination.take, pagination.skip, router.query.id])

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
  const { data: totalItemsCounts } = useQuery(CountContactSaleItemDocument, {
    skip: !router.query.id,
    variables: {
      contact_id: Number.parseInt(`${router.query.id}`),
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

  return (
    <ClientCardLayout
      clientId={Number(router.query['id'])}
      activeTab="financial"
    >
      <TabMenu
        minHeight={'0vh'}
        tabPosition="top"
        menuItems={[
          `Invoices (${totalInvoices?.total ?? 0})`,
          `Payments (${totalPaymentCounts?.countPayments[0]?.count ?? 0})`,
          `Items (${totalItemsCounts?.countSoldItems ?? 0})`,
          `Voided`,
          `Statements`,
        ]}
      >
        <Invoices
          clientId={Number.parseInt(`${router.query.id}`)}
          invoice={invoice}
          salesDetails={salesDetails}
          loading={loading}
          salesDetaillLoading={salesDetaillLoading}
          invoiceEmployeeOptions={[]}
          locationOptions={[]}
          onChangePagination={handlePagination}
          totalInvoiceCount={totalInvoices?.total ?? 0}
          onExpand={handleExpandsionClick}
        />
        <Payments
          totalPaymentCounts={totalPaymentCounts}
          clientId={Number.parseInt(`${router.query.id}`)}
        />
        <Items
          totalItemsCounts={totalItemsCounts?.countSoldItems ?? 0}
          invoiceEmployeeOptions={[]}
        />
        <span>Voided component</span>
        <span>Statements component</span>
      </TabMenu>
    </ClientCardLayout>
  )
}

export default Financial
