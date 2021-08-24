import { Notification, NotificationType } from '@pabau/ui'
import React, { FC, useRef, useState } from 'react'
import CommonNotificationHeader from '../../../components/ClientNotification/CommonNotificationHeader'
import ClientNotification from '../../../components/ClientNotification/Index'
import DocumentSharedEmailPreview from '../../../components/ClientNotificationEmailPreview/DocumentSharedEmailPreview'
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
        selectLanguage,
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
          <DocumentSharedEmailPreview
            backGroundColor={backGroundColor}
            activeSocialIcons={activeSocialIcons}
            selectLanguage={selectLanguage}
            buttonColor={buttonColor}
            informationMessage={informationMessage}
            type={type}
            greeting={t('notifications.secureEmailTemplate.greeting')}
            messageLine1={t('notifications.secureEmailTemplate.messageLine1')}
            messageLine2={t('notifications.secureEmailTemplate.messageLine2')}
            userEmail={'info@theclinic.com'}
            userName={'Sophia'}
            buttonName={t('notifications.secureEmailTemplate.buttonName')}
            clinicName={'Clinic'}
            closingText={t('notifications.secureEmailTemplate.closingText')}
            signatureBlock={t(
              'notifications.secureEmailTemplate.signatureBlock'
            )}
            infoText={t('notifications.secureEmailTemplate.infoText')}
            userMessage={t('notifications.secureEmailTemplate.userMessage')}
            fromMessage={t('notifications.secureEmailTemplate.fromMessage')}
          />
        )
      }
      sendEmailService({
        email,
        subject: t('notifications.email.secureEmailTemplate.subject'),
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
        breadcrumbItems={[
          {
            path: 'setup',
            breadcrumbName: t('notifications.breadcrumb.setup'),
          },
          {
            path: 'client-notifications',
            breadcrumbName: t('notifications.breadcrumb.notificationMessage'),
          },
          {
            path: 'client-notifications/secure-email-template',
            breadcrumbName: t('notifications.secureEmailTemplate.title'),
          },
        ]}
        title={t('notifications.secureEmailTemplate.title')}
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
        standardMessage={t('notifications.secureEmailTemplate.standardMessage')}
        type={'secureEmailTemplate'}
        name={t('notifications.secureEmailTemplate.title')}
        langKey={'secureEmailTemplate'}
        handleNotificationSubmit={showNotification}
      />
    </Layout>
  )
}

export default Index
