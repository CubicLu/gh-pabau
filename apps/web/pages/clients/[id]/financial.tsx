import React from 'react'
import { useRouter } from 'next/router'
import { ClientCardLayout } from '../../../components/Clients/ClientCardLayout'

const Appointments = () => {
  const router = useRouter()
  return (
    <ClientCardLayout
      clientId={Number(router.query['id'])}
      activeTab="financial"
    >
      todo
    </ClientCardLayout>
  )
}

export default Appointments
