import React from 'react'
import { useRouter } from 'next/router'
import { ClientCardLayout } from '../../../components/Clients/ClientCardLayout'
import { ClientAppointments } from '@pabau/ui'
import { gql, useQuery } from '@apollo/client'

const Appointments = () => {
  const router = useRouter()

  // DONT DO THIS! Move to libs/graphql
  const { data } = useQuery(
    gql`
      query($id: Int!) {
        findFirstCmContact(where: { ID: { equals: $id } }) {
          Booking {
            id
            start_date
            #@@@ TODO: add more fields here
          }
        }
      }
    `,
    { skip: !!router.query.id, variables: { id: Number(router.query['id']) } }
  )

  return (
    <ClientCardLayout
      clientId={Number(router.query['id'])}
      activeTab="appointments"
    >
      <ClientAppointments appointments={data?.findFirstCmContact.Booking} />
    </ClientCardLayout>
  )
}

export default Appointments
