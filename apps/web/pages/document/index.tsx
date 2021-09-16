import dynamic from 'next/dynamic'
import React from 'react'

const Document = () => {
  const params = new URLSearchParams(window.location.search)
  const id = params.get('id')
  const apiKey = process.env.api_key
  const clientId = process.env.client_id
  const Index = dynamic(
    () => import('../../components/document/indexDynamic'),
    {
      ssr: false,
    }
  )
  return <Index docId={id} apiKey={apiKey} clientId={clientId} />
}
export default Document
