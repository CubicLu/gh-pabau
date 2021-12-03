import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import {
  ClientCardLayout,
  ClientContext,
} from '../../../components/Clients/ClientCardLayout'
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
  GetClientAppointmentsQuery,
} from '@pabau/graphql'
import dayjs from 'dayjs'
import { getImage } from '../../../components/Uploaders/UploadHelpers/UploadHelpers'

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
    update(cashe, { data }) {
      const response = data?.updateOneBooking
      const existing = cashe.readQuery<GetClientAppointmentsQuery>({
        query: GetClientAppointmentsDocument,
        variables: {
          orderBy: SortOrder.Asc,
          contactId: Number(router.query['id']),
        },
      })
      if (existing && response) {
        const findUpdatedAppt = existing?.findManyBooking.find(
          (appt) => appt.id === response.id
        )
        cashe.writeQuery({
          query: GetClientAppointmentsDocument,
          data: {
            findManyBooking: [...existing.findManyBooking, findUpdatedAppt],
            totalCount: [...existing.totalCount],
          },
        })
      }
    },
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
            avatar:
              appt?.CmStaffGeneral?.Avatar &&
              getImage(appt?.CmStaffGeneral?.Avatar),
            name: `${appt?.CmStaffGeneral?.Fname} ${appt?.CmStaffGeneral?.Lname}`,
          }
          const otherEmployees = appt?.Participants?.map((assistant) => {
            return {
              avatar: assistant?.image && getImage(assistant?.image),
              name: assistant?.full_name,
              relationship: t('clients.appointments.tooltip.assistant'),
            }
          })
          return {
            id: appt?.id,
            serviceName: appt.service,
            employee,
            otherEmployees,
            status:
              appt.status &&
              getAppointmentStatus(appt?.status?.toLocaleLowerCase()),
            locationName: appt?.CompanyBranch?.name,
            createdDate: dayjs(appt?.create_date?.toString()).format(),
            apptDate: dayjs(appt?.start_date?.toString()).format(),
            isVirtual: false,
            feedbackSurvey: appt?.feedback_survey_scheduled,
            smsReminder: appt?.sms_reminder_scheduled === 0 ? false : true,
            emailReminder: appt?.email_reminder_scheduled,
            remindersSent: appt?.email_confirmation_sent === 1 ? true : false,
            notes: appt?.note,
            isVideoCall: 1,
            isOnline: appt?.is_online,
            bookedBy: appt?.BookedBy?.full_name,
            isCourse: appt?.where === 'course',
          }
        }
      )
      setClientAppointments(appointments)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientAppointmentData])

  const ClientAppointmentTab = () => {
    const clientData = useContext(ClientContext)

    return (
      <ClientAppointments
        appointments={clientAppointments}
        clientInfo={{
          fullName: `${clientData?.firstName} ${clientData?.lastName}`,
        }}
        loading={loading}
        updateApptNoteMutation={updateApptNoteMutation}
        adjustApptNotificationsMutation={adjustApptNotificationsMutation}
        updateAppointmentStatusMutation={updateAppointmentStatusMutation}
      />
    )
  }

  return (
    <ClientCardLayout
      clientId={Number(router.query['id'])}
      activeTab="appointments"
    >
      <ClientAppointmentTab />
    </ClientCardLayout>
  )
}

export default Appointments
