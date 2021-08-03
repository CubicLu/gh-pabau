import { ReceiptTemplates } from '../../../../components/ReceiptTemplate'
import React from 'react'
import Layout from '../../../../components/Layout/Layout'
import { useRouter } from 'next/router'

export function Receipt() {
  const router = useRouter()
  const findID = +router.query.id
  return (
    <div>
      <Layout active={'clients'}>
        <ReceiptTemplates saleId={findID} />
      </Layout>
    </div>
  )
}

export default Receipt
