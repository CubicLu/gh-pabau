import { StatementTemplates } from '../../../../components/StatementTemplate'
import React from 'react'
import Layout from '../../../../components/Layout/Layout'
import { useRouter } from 'next/router'

export function Statement() {
  const router = useRouter()
  const findID = +router.query.id
  return (
    <div>
      <Layout active={'clients'}>
        <StatementTemplates customerId={findID} />
      </Layout>
    </div>
  )
}

export default Statement
