import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ClientCardLayout } from '../../../components/Clients/ClientCardLayout'
import { ClientAppointments, CancelReason } from '@pabau/ui'
import { useGetCancelReasonQuery } from '@pabau/graphql'

const Appointments = () => {
  const router = useRouter()
  const [cancelReasons, setCancelReasons] = useState<CancelReason[]>([])
  const { data: cancelReasonData } = useGetCancelReasonQuery()

  const appointments = [
    {
      id: 78165595,
      serviceName: 'service to test',
      employee: {
        avatar: '',
        name: 'James Bond',
      },
      status: 'cancelled',
      locationName: 'Sky Clinic MKSky Clinic MKSky Clinic MKSky Clinic',
      createdDate: '2021-06-25T20:15:01Z',
      apptDate: '2021-10-12T12:10:00+05:30',
      isVirtual: true,
      smsReminder: false,
      emailReminder: false,
      remindersSent: false,
      notes: 'Appoinement test notes',
      isVideoCall: 1,
      cancellationReason: 6871,
      reasonComment: 'It was Monday and now where to go',
    },
    {
      id: 78161419,
      serviceName: 'service to test',
      employee: {
        avatar: '',
        name: 'James Bond',
      },
      status: 'cancelled',
      locationName: 'Sky Clinic MKSky Clinic MKSky Clinic MKSky Clinic',
      createdDate: '2021-06-25T20:15:01Z',
      apptDate: '2021-10-11T16:00:00+05:30',
      isVirtual: true,
      smsReminder: false,
      emailReminder: false,
      remindersSent: false,
      notes: '',
      isVideoCall: 1,
      cancellationReason: 6874,
      reasonComment: 'It was Monday',
    },
    {
      id: 78161406,
      serviceName: 'service to test',
      employee: {
        avatar: '',
        name: 'James Bond',
      },
      status: 'waiting',
      locationName: 'Sky Clinic MKSky Clinic MKSky Clinic MKSky Clinic',
      createdDate: '2021-06-25T20:15:01Z',
      apptDate: '2021-10-11T14:40:00+05:30',
      isVirtual: true,
      smsReminder: false,
      emailReminder: false,
      remindersSent: false,
      notes: '',
      isVideoCall: 1,
    },
    {
      id: 77959141,
      serviceName: 'Cadogan SERVICE',
      employee: {
        avatar: '',
        name: 'James Bond',
      },
      status: 'waiting',
      locationName: 'Sky Clinic MKSky Clinic MKSky Clinic MKSky Clinic',
      createdDate: '2021-06-25T20:15:01Z',
      apptDate: '2021-09-18T11:20:00+05:30',
      isVirtual: true,
      smsReminder: false,
      emailReminder: false,
      remindersSent: false,
      notes: '',
      isVideoCall: 1,
    },
    {
      id: 77701563,
      serviceName: 'Hell of a category',
      employee: {
        avatar: '',
        name: 'Branko Tasevski',
      },
      status: 'waiting',
      locationName: 'Sky Clinic MKSky Clinic MKSky Clinic MKSky Clinic',
      createdDate: '2021-06-25T20:15:01Z',
      apptDate: '2021-09-14T10:40:00+05:30',
      isVirtual: true,
      smsReminder: false,
      emailReminder: false,
      remindersSent: false,
      notes: '',
      isVideoCall: 1,
    },
  ]

  useEffect(() => {
    if (cancelReasonData?.findManyCancelReason?.length > 0) {
      const reasons = cancelReasonData?.findManyCancelReason?.map((reason) => ({
        value: reason?.id,
        text: reason?.reason_name,
      }))
      setCancelReasons(reasons)
      console.log('reasons', reasons)
    }
  }, [cancelReasonData])

  // DONT DO THIS! Move to libs/graphql
  // const { data } = useQuery(
  //   gql`
  //     query($id: Int!) {
  //       findFirstCmContact(where: { ID: { equals: $id } }) {
  //         Booking {
  //           id
  //           start_date
  //           #@@@ TODO: add more fields here
  //         }
  //       }
  //     }
  //   `,
  //   { skip: !router.query.id, variables: { id: Number(router.query['id']) } }
  // )

  return (
    <ClientCardLayout
      clientId={Number(router.query['id'])}
      activeTab="appointments"
    >
      <ClientAppointments
        appointments={appointments}
        cancelReasons={cancelReasons}
      />
    </ClientCardLayout>
  )
}

export default Appointments
