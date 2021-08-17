import { InvoiceTemplates } from '../../../../components/InvoiceTemplate'
import React from 'react'
import Layout from '../../../../components/Layout/Layout'
import { useRouter } from 'next/router'

export function Invoice() {
  const router = useRouter()
  const findID = +router.query.id
  return (
    <div>
      <Layout active={'clients'}>
        <InvoiceTemplates saleId={findID} />
      </Layout>
    </div>
  )
}

export default Invoice
