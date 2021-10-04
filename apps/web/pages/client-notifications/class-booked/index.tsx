import { Notification, NotificationType } from '@pabau/ui'
import React, { FC, useRef, useState } from 'react'
import CommonNotificationHeader from '../../../components/ClientNotification/CommonNotificationHeader'
import { useUser } from '../../../context/UserContext'
import ClientNotification from '../../../components/ClientNotification/Index'
import BookedOntoClassEmailPreview from '../../../components/ClientNotificationEmailPreview/BookedOntoClassEmailPreview'
import { sendEmailService } from '../../../components/ClientNotificationEmailPreview/sendEmailService'
import Layout from '../../../components/Layout/Layout'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'

const Index: FC = () => {
  const [selectedTab, setSelectedTab] = useState<'emailPreview' | 'smsPreview'>(
    'emailPreview'
  )
  const ref = useRef(null)
  const { t } = useTranslationI18()
  const user = useUser()

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
          <BookedOntoClassEmailPreview
            backGroundColor={backGroundColor}
            activeSocialIcons={activeSocialIcons}
            buttonColor={buttonColor}
            informationMessage={informationMessage}
            type={type}
            greeting={t('notifications.bookedOntoClass.greeting')}
            dateTime={t('notifications.bookedOntoClass.dateTime')}
            consultancyName={t('notifications.bookedOntoClass.title')}
            consultationDetail={
              showService
                ? showEmployeeName
                  ? `${t(
                      'notifications.bookedOntoClass.consultationDetail'
                    )}${t('notifications.bookedOntoClass.employee')}`
                  : `${t('notifications.bookedOntoClass.consultationDetail')}`
                : ''
            }
            address={t('notifications.bookedOntoClass.address')}
            message={t('notifications.bookedOntoClass.message')}
            appointmentDetailMessage={t(
              'notifications.bookedOntoClass.appointmentDetailMessage'
            )}
            regards={t('notifications.bookedOntoClass.regards')}
            regardsName={t('notifications.bookedOntoClass.regardsName')}
          />
        )
      }

      sendEmailService({
        email,
        subject: t('notifications.email.bookedOntoClass.subject'),
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
            path: 'client-notifications/class-booked',
            breadcrumbName: t('notifications.classBooked.title'),
          },
        ]}
        title={t('notifications.classBooked.title')}
        selectedTab={selectedTab}
        handleNotificationSubmit={showNotification}
      />

      <ClientNotification
        ref={ref}
        onSelectedTab={(value) => setSelectedTab(value)}
        hideRequestConfirmationOption={true}
        hideAllowReschedulingOption={true}
        hideAllowCancellationOption={true}
        hideDisplayPolicyOption={true}
        hideMedicalHistoryOption={true}
        hideReminderTimeFrameTabPane={true}
        standardMessage={t('notifications.classBooked.standardMessage')}
        type={'bookedOntoClass'}
        name={t('notifications.classBooked.title')}
        langKey={'classBooked'}
        handleNotificationSubmit={showNotification}
      />
    </Layout>
  )
}

export default Index
