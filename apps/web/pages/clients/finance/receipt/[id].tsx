import { ReceiptTemplates } from '../../../../components/ReceiptTemplate'
import React from 'react'
import CommonHeader from '../../../../components/CommonHeader'
import Layout from '../../../../components/Layout/Layout'
import { useRouter } from 'next/router'

export function Receipt() {
  const router = useRouter()
  const findID = +router.query.id
  return (
    <div>
      <Layout active={'clients'}>
        <CommonHeader title="Clients" />
        <ReceiptTemplates saleId={findID} />
      </Layout>
    </div>
  )
}

export default Receipt
