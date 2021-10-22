import { InvoiceTemplates } from '../../../../components/InvoiceTemplate'
import React from 'react'
import CommonHeader from '../../../../components/CommonHeader'
import Layout from '../../../../components/Layout/Layout'
import { useRouter } from 'next/router'

export function Invoice() {
  const router = useRouter()
  const findID = +router.query.id
  return (
    <div>
      <Layout active={'clients'}>
        <CommonHeader title="Clients" />
        <InvoiceTemplates saleId={findID} />
      </Layout>
    </div>
  )
}

export default Invoice
