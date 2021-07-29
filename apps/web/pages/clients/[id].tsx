import React from 'react'
import { Layout } from '@pabau/ui'
import './clients.module.less'
import LegacyPage from '../../components/LegacyPage'
import { useRouter } from 'next/router'

export function Client() {
  const router = useRouter()
  const contact_id =
    typeof router.query.id === 'object' ? router.query.id[0] : router.query.id

  return (
    <div>
      <Layout legacyContent={true}>
        <LegacyPage urlPath={'pages/contacts/3/?id=' + contact_id} />
      </Layout>
    </div>
  )
}

export default Client
