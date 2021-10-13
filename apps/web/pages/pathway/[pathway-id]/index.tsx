import React from 'react'
import { useRouter } from 'next/router'
import { ClientCardLayout } from '../../../components/Clients/ClientCardLayout'
import NextAppointments from '../../../components/ClientCard/dashboard/NextAppointments'
import CreatePathwayShortcuts from '../../../components/ClientCard/dashboard/CreatePathwayShortcuts'

const Appointments = () => {
  const router = useRouter()
  return (
    <ClientCardLayout clientId={Number(router.query['id'])}>
      <NextAppointments />
      <CreatePathwayShortcuts />
    </ClientCardLayout>
  )
}

export default Appointments
