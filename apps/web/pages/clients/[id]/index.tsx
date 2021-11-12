import React from 'react'
import { useRouter } from 'next/router'
import { ClientCardLayout } from '../../../components/Clients/ClientCardLayout'
import NextAppointments from '../../../components/ClientCard/dashboard/NextAppointments'

const Appointments = () => {
  const router = useRouter()
  return (
    <ClientCardLayout
      clientId={Number(router.query['id'])}
      activeTab="dashboard"
    >
      <NextAppointments />
    </ClientCardLayout>
  )
}

export default Appointments
