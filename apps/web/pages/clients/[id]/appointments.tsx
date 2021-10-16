import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ClientCardLayout } from '../../../components/Clients/ClientCardLayout'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import {
  ClientAppointments,
  ClientAppointmentItem,
  AppointmentStatus,
  Notification,
  NotificationType,
} from '@pabau/ui'
import {
  GetClientAppointmentsDocument,
  useGetClientAppointmentsQuery,
  SortOrder,
  useUpdateApptNoteMutation,
  useAdjustApptNotificationsMutation,
  useUpdateAppointmentStatusMutation,
} from '@pabau/graphql'
import dayjs from 'dayjs'

const Appointments = () => {
  const router = useRouter()
  const { t } = useTranslationI18()
  const [clientAppointments, setClientAppointments] = useState<
    ClientAppointmentItem[]
  >([])

  const {
    data: clientAppointmentData,
    loading,
  } = useGetClientAppointmentsQuery({
    skip: !router.query.id,
    variables: {
      orderBy: SortOrder.Asc,
      contactId: Number(router.query['id']),
    },
  })

  const [updateAppointmentStatusMutation] = useUpdateAppointmentStatusMutation({
    onCompleted() {
      Notification(
        NotificationType.success,
        t('client.appointment.card.reinstate.success.msg')
      )
    },
    refetchQueries: [
      {
        query: GetClientAppointmentsDocument,
        variables: {
          orderBy: SortOrder.Asc,
          contactId: Number(router.query['id']),
        },
      },
    ],
  })

  const [adjustApptNotificationsMutation] = useAdjustApptNotificationsMutation({
    onCompleted() {
      Notification(
        NotificationType.success,
        t('client.appointment.card.update.notification.success.msg')
      )
    },
    refetchQueries: [
      {
        query: GetClientAppointmentsDocument,
        variables: {
          orderBy: SortOrder.Asc,
          contactId: Number(router.query['id']),
        },
      },
    ],
  })

  const [updateApptNoteMutation] = useUpdateApptNoteMutation({
    onCompleted() {
      Notification(
        NotificationType.success,
        t('client.appointment.card.update.note.success.msg')
      )
    },
    onError() {
      Notification(
        NotificationType.error,
        t('client.appointment.card.update.note.error.msg')
      )
    },
    refetchQueries: [
      {
        query: GetClientAppointmentsDocument,
        variables: {
          orderBy: SortOrder.Asc,
          contactId: Number(router.query['id']),
        },
      },
    ],
  })

  const getAppointmentStatus = (status: string) => {
    if (status === 'no-show') {
      return AppointmentStatus.noShow
    } else if (status === 'cancelled') {
      return AppointmentStatus.cancelled
    } else if (AppointmentStatus[status]) {
      return AppointmentStatus[status]
    } else {
      return status
    }
  }

  useEffect(() => {
    if (clientAppointmentData?.findManyBooking?.length > 0) {
      const appointments = clientAppointmentData?.findManyBooking?.map(
        (appt) => {
          const employee = {
            avatar: appt?.CmStaffGeneral?.Avatar,
            name: `${appt?.CmStaffGeneral?.Fname} ${appt?.CmStaffGeneral?.Lname}`,
          }
          return {
            id: appt?.id,
            serviceName: appt.service,
            employee,
            status:
              appt.status &&
              getAppointmentStatus(appt?.status?.toLocaleLowerCase()),
            locationName: appt?.CompanyBranch?.name,
            createdDate: '2021-06-25T20:15:01Z',
            apptDate: dayjs(appt?.start_date?.toString()).format(),
            isVirtual: true,
            feedbackSurvey: appt?.feedback_survey_scheduled,
            smsReminder: appt?.sms_reminder_scheduled === 0 ? false : true,
            emailReminder: appt?.email_reminder_scheduled,
            remindersSent: appt?.email_confirmation_sent === 1 ? true : false,
            notes: appt?.note,
            isVideoCall: 1,
            bookedBy: 'William Brandham',
            isCourse: appt?.where === 'course',
          }
        }
      )
      setClientAppointments(appointments)
    }
    console.log('clientAppointmentData', clientAppointmentData)
  }, [clientAppointmentData])

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
        appointments={clientAppointments}
        loading={loading}
        updateApptNoteMutation={updateApptNoteMutation}
        adjustApptNotificationsMutation={adjustApptNotificationsMutation}
        updateAppointmentStatusMutation={updateAppointmentStatusMutation}
      />
    </ClientCardLayout>
  )
}

export default Appointments
