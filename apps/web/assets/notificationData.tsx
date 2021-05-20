import {
  ScheduleOutlined,
  BellOutlined,
  SyncOutlined,
  StarOutlined,
  CloseCircleOutlined,
  UserDeleteOutlined,
  FileSyncOutlined,
  UsergroupAddOutlined,
  FileDoneOutlined,
  GoldOutlined,
  MoneyCollectOutlined,
  RiseOutlined,
  GiftOutlined,
  BarChartOutlined,
  SafetyOutlined,
  InteractionOutlined,
  ReconciliationOutlined,
  ExportOutlined,
  CalendarOutlined,
  CrownOutlined,
  FileTextOutlined,
  ContainerOutlined,
} from '@ant-design/icons'

const notificationData = ({ t }) => {
  return {
    Appointments: [
      {
        header: t('notifications.newAppointment.title'),
        description: t('notifications.appointments.newAppointment.description'),
        icon: <ScheduleOutlined />,
        smartDelivery: true,
        link: '/client-notifications/new-appointment',
        disabled: true,
      },
      {
        header: t('notifications.upcomingAppointmentReminder.title'),
        description: t(
          'notifications.appointments.upcomingAppointmentReminder.description'
        ),
        icon: <BellOutlined />,
        smartDelivery: true,
        link: '/client-notifications/appointment-reminder',
        disabled: true,
      },
      {
        header: t('notifications.rescheduleAppointment.title'),
        description: t(
          'notifications.appointments.rescheduleAppointment.description'
        ),
        icon: <SyncOutlined />,
        smartDelivery: false,
        link: '/client-notifications/rescheduled-appointment',
        disabled: true,
      },
      {
        header: t('notifications.requestFeedback.title'),
        description: t(
          'notifications.appointments.requestFeedback.description'
        ),
        icon: <StarOutlined />,
        smartDelivery: true,
        link: '/client-notifications/request-feedback',
        disabled: true,
      },
      {
        header: t('notifications.cancelAppointment.title'),
        description: t(
          'notifications.appointments.cancelAppointment.description'
        ),
        icon: <CloseCircleOutlined />,
        smartDelivery: false,
        link: '/client-notifications/cancelled-appointment',
        disabled: true,
      },
      {
        header: t('notifications.noShowAppointment.title'),
        description: t(
          'notifications.appointments.noShowAppointment.description'
        ),
        icon: <UserDeleteOutlined />,
        smartDelivery: false,
        link: '/client-notifications/noshow-appointment',
        disabled: true,
      },
      {
        header: t('notifications.waitList.title'),
        description: t('notifications.appointments.waitList.description'),
        icon: <FileSyncOutlined />,
        smartDelivery: false,
        link: '/client-notifications/waitlist',
        disabled: true,
      },
    ],
    Classes: [
      {
        header: t('notifications.classBooked.title'),
        description: t('notifications.classes.classBooked.description'),
        icon: <ScheduleOutlined />,
        smartDelivery: false,
        link: '/client-notifications/class-booked',
        disabled: true,
      },
      {
        header: t('notifications.classBookedGroup.title'),
        description: t('notifications.classes.classBookedGroup.description'),
        icon: <UsergroupAddOutlined />,
        smartDelivery: false,
        link: null,
        disabled: true,
      },
      {
        header: t('notifications.cancelledClassBooking.title'),
        description: t(
          'notifications.classes.cancelledClassBooking.description'
        ),
        icon: <CloseCircleOutlined />,
        smartDelivery: false,
        link: '/client-notifications/cancelled-class-booking',
        disabled: true,
      },
      {
        header: t('notifications.classNoShowAppointment.title'),
        description: t(
          'notifications.classes.classNoShowAppointment.description'
        ),
        icon: <UserDeleteOutlined />,
        smartDelivery: false,
        link: '/client-notifications/class-noshow',
        disabled: true,
      },
      {
        header: t('notifications.classRescheduled.title'),
        description: t('notifications.classes.classRescheduled.description'),
        icon: <SyncOutlined />,
        smartDelivery: false,
        link: '/client-notifications/class-rescheduled',
        disabled: true,
      },
      {
        header: t('notifications.classReminder.title'),
        description: t('notifications.classes.classReminder.description'),
        icon: <BellOutlined />,
        smartDelivery: false,
        link: '/client-notifications/class-reminder',
        disabled: true,
      },
      {
        header: t('notifications.classSpotAvailable.title'),
        description: t('notifications.classes.classSpotAvailable.description'),
        icon: <FileDoneOutlined />,
        smartDelivery: false,
        link: '/client-notifications/class-spot-available',
        disabled: true,
      },
    ],
    Engagement: [
      {
        header: t('notifications.referrals.title'),
        description: t('notifications.engagement.referrals.description'),
        icon: <GoldOutlined />,
        smartDelivery: false,
        link: '/client-notifications/referral',
        disabled: true,
      },
      {
        header: t('notifications.invoice.title'),
        description: t('notifications.engagement.invoice.description'),
        icon: <MoneyCollectOutlined />,
        smartDelivery: false,
        link: '/client-notifications/invoice',
        disabled: true,
      },
      {
        header: t('notifications.leadResponses.title'),
        description: t('notifications.engagement.leadResponses.description'),
        icon: <RiseOutlined />,
        smartDelivery: false,
        link: '/client-notifications/lead-responses',
        disabled: true,
      },
      {
        header: t('notifications.giftVoucher.title'),
        description: t('notifications.engagement.giftVoucher.description'),
        icon: <GiftOutlined />,
        smartDelivery: false,
        link: '/client-notifications/gift-vouchers',
        disabled: true,
      },
      {
        header: t('notifications.invoice.outstanding.title'),
        description: t(
          'notifications.engagement.outstandingInvoice.description'
        ),
        icon: <MoneyCollectOutlined />,
        smartDelivery: false,
        link: '/client-notifications/outstanding-invoice',
        disabled: true,
      },
    ],
    Other: [
      {
        header: t('notifications.packageSession.title'),
        description: t('notifications.other.packageSession.description'),
        icon: <ScheduleOutlined />,
        smartDelivery: false,
        link: '/client-notifications/package-session-used',
        disabled: true,
      },
      {
        header: t('notifications.clinicEmailingTimeline.title'),
        description: t(
          'notifications.other.clinicEmailingTimeline.description'
        ),
        icon: <BarChartOutlined />,
        smartDelivery: false,
        link: '/client-notifications/clinic-emailing-timeline',
        disabled: true,
      },
      {
        header: t('notifications.connectRegistration.title'),
        description: t('notifications.other.connectRegistration.description'),
        icon: <InteractionOutlined />,
        smartDelivery: false,
        link: '/client-notifications/connect-registration',
        disabled: true,
      },
      {
        header: t('notifications.emailAppointment.title'),
        description: t('notifications.other.emailAppointment.description'),
        icon: <CalendarOutlined />,
        smartDelivery: false,
        link: '/client-notifications/email-appointments',
        disabled: true,
      },
      {
        header: t('notifications.birthday.title'),
        description: t('notifications.other.birthday.description'),
        icon: <CrownOutlined />,
        smartDelivery: false,
        link: '/client-notifications/birthday',
        disabled: true,
      },
    ],
    Sharing: [
      {
        header: t('notifications.prescription.title'),
        description: t('notifications.Sharing.prescription.description'),
        icon: <ContainerOutlined />,
        smartDelivery: false,
        link: '/client-notifications/prescription',
        disabled: true,
      },
      {
        header: t('notifications.note.title'),
        description: t('notifications.Sharing.note.description'),
        icon: <FileTextOutlined />,
        smartDelivery: false,
        link: '/client-notifications/note',
        disabled: true,
      },
      {
        header: t('notifications.medicalForms.title'),
        description: t('notifications.Sharing.medicalForms.description'),
        icon: <ReconciliationOutlined />,
        smartDelivery: false,
        link: '/client-notifications/medical-forms',
        disabled: true,
      },
      {
        header: t('notifications.letters.title'),
        description: t('notifications.Sharing.letters.description'),
        icon: <FileTextOutlined />,
        smartDelivery: false,
        link: '/client-notifications/letters',
        disabled: true,
      },
      {
        header: t('notifications.documentShared.title'),
        description: t('notifications.Sharing.documentShared.description'),
        icon: <ExportOutlined />,
        smartDelivery: false,
        link: '/client-notifications/document-shared',
        disabled: true,
      },
      {
        header: t('notifications.labResults.title'),
        description: t('notifications.Sharing.labResults.description'),
        icon: <FileDoneOutlined />,
        smartDelivery: false,
        link: '/client-notifications/lab-results',
        disabled: true,
      },
      {
        header: t('notifications.secureEmailTemplate.title'),
        description: t('notifications.Sharing.secureEmailTemplate.description'),
        icon: <SafetyOutlined />,
        smartDelivery: false,
        link: '/client-notifications/secure-email-template',
        disabled: true,
      },
    ],
  }
}

export default notificationData
