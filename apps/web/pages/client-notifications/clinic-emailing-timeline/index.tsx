import { Notification, NotificationType } from '@pabau/ui'
import React, { FC, useRef, useState } from 'react'
import CommonNotificationHeader from '../../../components/ClientNotification/CommonNotificationHeader'
import ClientNotification from '../../../components/ClientNotification/Index'
import MedicalFormsEmailPreview from '../../../components/ClientNotificationEmailPreview/MedicalFormsEmailPreview'
import { sendEmailService } from '../../../components/ClientNotificationEmailPreview/sendEmailService'
import Layout from '../../../components/Layout/Layout'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'

const Index: FC = () => {
  const [selectedTab, setSelectedTab] = useState<'emailPreview' | 'smsPreview'>(
    'emailPreview'
  )
  const ref = useRef(null)
  const { t } = useTranslationI18()

  const showNotification = (email) => {
    if (selectedTab === 'emailPreview') {
      const propsData = ref?.current?.propsData() || {}
      const {
        backGroundColor,
        buttonColor,
        activeSocialIcons,
        type,
        localTranslation,
      } = propsData
      const bodyContent = () => {
        const t = localTranslation

        return (
          <MedicalFormsEmailPreview
            backGroundColor={backGroundColor}
            activeSocialIcons={activeSocialIcons}
            buttonColor={buttonColor}
            type={type}
            greeting={t('notifications.medicalForm.greeting')}
            footerText={
              t('notifications.medicalForm.closingText') +
              ' <br> ' +
              t('notifications.medicalForm.signatureBlock')
            }
            message={
              type === 'clinic-emailing-timeline'
                ? t('notifications.medicalForm.clinicEmailingMessage')
                : type === 'emailAppointment'
                ? t('notifications.medicalForm.emailAppointmentMessage')
                : t('notifications.medicalForm.message')
            }
          />
        )
      }
      sendEmailService({
        email,
        subject: t('notifications.email.clinicEmailingTimeline.subject'),
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
    <Layout>
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
            path: 'client-notifications/clinic-emailing-timeline',
            breadcrumbName: t('notifications.clinicEmailingTimeline.title'),
          },
        ]}
        title={t('notifications.clinicEmailingTimeline.title')}
        selectedTab={selectedTab}
        handleNotificationSubmit={showNotification}
      />
      <ClientNotification
        ref={ref}
        onSelectedTab={(value) => setSelectedTab(value)}
        hideReminderTimeFrameTabPane={true}
        hideRequestConfirmationOption={true}
        hideMedicalHistoryOption={true}
        hideAllowReschedulingOption={true}
        hideAllowCancellationOption={true}
        hideDisplayPolicyOption={true}
        hideServiceOption={true}
        hideEmployeeNameOption={true}
        standardMessage={t(
          'notifications.clinicEmailingTimeline.standardMessage'
        )}
        type={'clinic-emailing-timeline'}
        name={t('notifications.clinicEmailingTimeline.title')}
        langKey={'clinicEmailingTimeline'}
        handleNotificationSubmit={showNotification}
      />
    </Layout>
  )
}

export default Index
