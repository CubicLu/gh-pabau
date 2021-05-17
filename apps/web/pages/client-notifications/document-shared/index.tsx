import React, { FC, useRef, useState } from 'react'
import { Notification, NotificationType } from '@pabau/ui'
import Layout from '../../../components/Layout/Layout'
import ClientNotification from '../../../components/ClientNotification/index'
import CommonNotificationHeader from '../../../components/ClientNotification/CommonNotificationHeader'
import { sendEmailService } from '../../../components/ClientNotificationEmailPreview/sendEmailService'
import DocumentSharedEmailPreview from '../../../components/ClientNotificationEmailPreview/DocumentSharedEmailPreview'
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
            greeting={t('notifications.documentShared.greeting')}
            messageLine1={t('notifications.documentShared.messageLine1')}
            messageLine2={t('notifications.documentShared.messageLine2')}
            userEmail={'info@theclinic.com'}
            userName={'Sophia'}
            buttonName={t('notifications.documentShared.buttonName')}
            clinicName={'Clinic'}
            closingText={t('notifications.documentShared.closingText')}
            signatureBlock={t('notifications.documentShared.signatureBlock')}
            infoText={t('notifications.documentShared.infoText')}
            fromMessage={t('notifications.documentShared.fromMessage')}
            userMessage={t('notifications.documentShared.userMessage')}
          />
        )
      }

      sendEmailService({
        email,
        subject: t('notifications.email.documentShared.subject'),
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
            path: 'client-notifications/document-shared',
            breadcrumbName: t('notifications.documentShared.title'),
          },
        ]}
        title={t('notifications.documentShared.title')}
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
        standardMessage={t('notifications.documentShared.standardMessage')}
        type={'documentShared'}
        name={t('notifications.documentShared.title')}
        langKey={'documentShared'}
        handleNotificationSubmit={showNotification}
      />
    </Layout>
  )
}

export default Index
