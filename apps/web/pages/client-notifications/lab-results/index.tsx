import React, { FC, useRef, useState } from 'react'
import { Notification, NotificationType } from '@pabau/ui'
import Layout from '../../../components/Layout/Layout'
import ClientNotification from '../../../components/ClientNotification/Index'
import CommonNotificationHeader from '../../../components/ClientNotification/CommonNotificationHeader'
import DocumentSharedEmailPreview from '../../../components/ClientNotificationEmailPreview/DocumentSharedEmailPreview'
import { sendEmailService } from '../../../components/ClientNotificationEmailPreview/sendEmailService'
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
            greeting={t('notifications.labResults.greeting')}
            messageLine1={t('notifications.labResults.messageLine1')}
            messageLine2={t('notifications.labResults.messageLine2')}
            userEmail={'info@theclinic.com'}
            userName={'Anna'}
            buttonName={t('notifications.labResults.buttonName')}
            clinicName={'Clinic'}
            closingText={t('notifications.labResults.closingText')}
            signatureBlock={t('notifications.labResults.signatureBlock')}
            infoText={t('notifications.labResults.infoText')}
            userMessage={t('notifications.labResults.userMessage')}
            fromMessage={t('notifications.labResults.fromMessage')}
          />
        )
      }
      sendEmailService({
        email,
        subject: t('notifications.email.labResults.subject'),
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
            path: 'client-notifications/letters',
            breadcrumbName: t('notifications.labResults.title'),
          },
        ]}
        title={t('notifications.labResults.title')}
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
        standardMessage={t('notifications.labResults.standardMessage')}
        type={'labResults'}
        name={t('notifications.labResults.title')}
        langKey={'labResults'}
        handleNotificationSubmit={showNotification}
      />
    </Layout>
  )
}

export default Index
