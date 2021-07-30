import { Notification, NotificationType } from '@pabau/ui'
import React, { FC, useRef, useState, useContext } from 'react'
import { UserContext } from '../../../context/UserContext'
import CommonNotificationHeader from '../../../components/ClientNotification/CommonNotificationHeader'
import ClientNotification from '../../../components/ClientNotification/Index'
import CancelAppointmentEmailPreview from '../../../components/ClientNotificationEmailPreview/CancelAppointmentEmailPreview'
import { sendEmailService } from '../../../components/ClientNotificationEmailPreview/sendEmailService'
import MobileHeader from '../../../components/MobileHeader'
import Layout from '../../../components/Layout/Layout'
import useWindowSize from '../../../hooks/useWindowSize'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'

const Index: FC = () => {
  const [selectedTab, setSelectedTab] = useState<'emailPreview' | 'smsPreview'>(
    'emailPreview'
  )
  const ref = useRef(null)
  const { t } = useTranslationI18()
  const size = useWindowSize()
  const user = useContext(UserContext)

  const showNotification = (email) => {
    if (selectedTab === 'emailPreview') {
      const propsData = ref?.current?.propsData() || {}
      const {
        showService,
        showEmployeeName,
        backGroundColor,
        buttonColor,
        informationMessage,
        activeSocialIcons,
        type,
        localTranslation,
      } = propsData

      const bodyContent = () => {
        const t = localTranslation
        return (
          <CancelAppointmentEmailPreview
            backGroundColor={backGroundColor}
            activeSocialIcons={activeSocialIcons}
            buttonColor={buttonColor}
            informationMessage={informationMessage}
            type={type}
            greeting={t('notifications.cancelledAppointment.greeting')}
            dateTime={t('notifications.cancelledAppointment.dateTime')}
            text={
              type === 'cancelClassBooking'
                ? t('notifications.cancelledAppointment.classText')
                : t('notifications.cancelledAppointment.text')
            }
            consultancyName={t('notifications.cancelledAppointment.title')}
            consultationDetail={
              showService
                ? showEmployeeName
                  ? `${t(
                      'notifications.cancelledAppointment.consultationDetail'
                    )}${t('notifications.cancelledAppointment.employee')}`
                  : `${t(
                      'notifications.cancelledAppointment.consultationDetail'
                    )}`
                : ''
            }
            address={t('notifications.cancelledAppointment.address')}
            message={t('notifications.cancelledAppointment.message')}
            cancelButtonName={t(
              'notifications.cancelledAppointment.cancelButtonName'
            )}
            rebookButtonName={t(
              'notifications.cancelledAppointment.rebookButtonName'
            )}
          />
        )
      }
      sendEmailService({
        email,
        subject: t('notifications.email.cancelClassBooking.subject'),
        bodyContent: bodyContent(),
        successMessage: t('notifications.email.send.successMessage'),
        failedMessage: t('notifications.email.send.failedMessage'),
      })
    } else if (selectedTab === 'smsPreview') {
      Notification(
        NotificationType.success,
        t('notifications.sms.send.successMessage')
      )
    }
  }

  return (
    <Layout {...user}>
      <MobileHeader
        title={t('notifications.cancelledClassBooking.title')}
        parent="client-notifications"
      />
      {size.width > 767 && (
        <CommonNotificationHeader
          items={[
            {
              path: 'setup',
              breadcrumbName: t('notifications.breadcrumb.setup'),
            },
            {
              path: 'client-notifications',
              breadcrumbName: t('notifications.breadcrumb.notificationMessage'),
            },
            {
              path: 'client-notifications/cancelled-class-booking',
              breadcrumbName: t('notifications.cancelledClassBooking.title'),
            },
          ]}
          title={t('notifications.cancelledClassBooking.title')}
          selectedTab={selectedTab}
          handleNotificationSubmit={showNotification}
        />
      )}
      <ClientNotification
        ref={ref}
        onSelectedTab={(value) => setSelectedTab(value)}
        hideRequestConfirmationOption={true}
        hideAllowReschedulingOption={true}
        hideAllowCancellationOption={true}
        hideDisplayPolicyOption={true}
        hideMedicalHistoryOption={true}
        hideReminderTimeFrameTabPane={true}
        standardMessage={t(
          'notifications.cancelledClassBooking.standardMessage'
        )}
        type={'cancelClassBooking'}
        langKey={'cancelledClassBooking'}
        name={t('notifications.cancelledClassBooking.title')}
        handleNotificationSubmit={showNotification}
      />
    </Layout>
  )
}

export default Index
