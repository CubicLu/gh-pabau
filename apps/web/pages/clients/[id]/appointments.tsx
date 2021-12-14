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
  CancelReason,
} from '@pabau/ui'
import {
  useGetClientAppointmentsQuery,
  SortOrder,
  useUpdateApptNoteMutation,
  useAdjustApptNotificationsMutation,
  useUpdateAppointmentStatusMutation,
  useGetCancelReasonQuery,
  useCancelBookingMutation,
  useUpdateCancelReasonMutation,
  GetClientAppointmentsDocument,
  GetClientAppointmentsQuery,
} from '@pabau/graphql'
import dayjs from 'dayjs'
import { getImage } from '../../../components/Uploaders/UploadHelpers/UploadHelpers'
import { useUser } from '../../../context/UserContext'

const Appointments = () => {
  const router = useRouter()
  const { t } = useTranslationI18()
  const [cancelReasons, setCancelReasons] = useState<CancelReason[]>([])
  const [clientAppointments, setClientAppointments] = useState<
    ClientAppointmentItem[]
  >([])

  const { me } = useUser()
  const { data: cancelReasonData } = useGetCancelReasonQuery()

  const getQueryVariables = () => {
    return {
      orderBy: SortOrder.Asc,
      contactId: Number(router.query['id']),
    }
  }

  const {
    data: clientAppointmentData,
    loading,
  } = useGetClientAppointmentsQuery({
    skip: !router.query.id,
    variables: getQueryVariables(),
  })

  const [cancelBookingMutation] = useCancelBookingMutation({
    onCompleted() {
      Notification(
        NotificationType.success,
        t('client.appointment.card.cancelled.success.msg')
      )
    },
    refetchQueries: [
      {
        query: GetClientAppointmentsDocument,
        variables: getQueryVariables(),
      },
    ],
  })

  const [updateCancelReasonMutation] = useUpdateCancelReasonMutation({
    onCompleted() {
      Notification(
        NotificationType.success,
        t('client.appointment.card.update.cancel.reason.msg')
      )
    },
    update(cache, { data }) {
      const response = data?.updateCancelReason
      const existing = cache.readQuery<GetClientAppointmentsQuery>({
        query: GetClientAppointmentsDocument,
        variables: getQueryVariables(),
      })
      if (existing && response) {
        const newApptData = [...existing.findManyBooking].map((appt) => {
          if (appt.id === response?.appointment_id) {
            const newBookingCancel = {
              cancel_by: me.user,
              cancel_reason_id: response.cancel_reason_id,
              reason: response.reason,
            }
            return { ...appt, BookingCancel: newBookingCancel }
          } else {
            return appt
          }
        })
        cache.writeQuery<GetClientAppointmentsQuery>({
          query: GetClientAppointmentsDocument,
          variables: getQueryVariables(),
          data: {
            findManyBooking: [...newApptData],
            totalCount: [...existing.totalCount],
          },
        })
      }
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
    if (cancelReasonData?.findManyCancelReason?.length > 0) {
      const reasons = cancelReasonData?.findManyCancelReason?.map((reason) => ({
        value: reason?.id,
        text: reason?.reason_name,
      }))
      setCancelReasons(reasons)
    }
  }, [cancelReasonData])

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
            cancelBy:
              (appt.status === 'Cancelled' && appt?.BookingCancel?.cancel_by) ||
              null,
            cancellationReason:
              (appt.status === 'Cancelled' &&
                appt?.BookingCancel?.cancel_reason_id) ||
              null,
            reasonComment:
              (appt.status === 'Cancelled' && appt?.BookingCancel?.reason) ||
              null,
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
        cancelReasons={cancelReasons}
        clientInfo={clientData}
        loading={loading}
        updateApptNoteMutation={updateApptNoteMutation}
        adjustApptNotificationsMutation={adjustApptNotificationsMutation}
        updateAppointmentStatusMutation={updateAppointmentStatusMutation}
        cancelBookingMutation={cancelBookingMutation}
        updateCancelReasonMutation={updateCancelReasonMutation}
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
