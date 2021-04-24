import React, { FC, useRef, useState } from 'react'
import { Notification, NotificationType } from '@pabau/ui'
import Layout from '../../../components/Layout/Layout'
import ClientNotification from '../../../components/ClientNotification/index'
import CommonNotificationHeader from '../../../components/ClientNotification/CommonNotificationHeader'
import { sendEmailService } from '../../../components/ClientNotificationEmailPreview/sendEmailService'
import RequestFeedBackEmailPreview from '../../../components/ClientNotificationEmailPreview/RequestFeedBackEmailPreview'
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
          <RequestFeedBackEmailPreview
            backGroundColor={backGroundColor}
            activeSocialIcons={activeSocialIcons}
            selectLanguage={selectLanguage}
            buttonColor={buttonColor}
            informationMessage={informationMessage}
            type={type}
            greeting={t('notifications.requestFeedback.greeting')}
            message={t('notifications.requestFeedback.message')}
            message1={t('notifications.requestFeedback.message1')}
            closingText={t('notifications.requestFeedback.closingText')}
            signatureBlock={t('notifications.requestFeedback.signatureBlock')}
            buttonName={t('notifications.requestFeedback.buttonName')}
          />
        )
      }
      sendEmailService({
        email,
        subject: t('notifications.email.requestFeedback.subject'),
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
            path: 'client-notifications/request-feedback',
            breadcrumbName: t('notifications.requestFeedback.title'),
          },
        ]}
        title={t('notifications.requestFeedback.title')}
        selectedTab={selectedTab}
        handleNotificationSubmit={showNotification}
      />
      <ClientNotification
        ref={ref}
        onSelectedTab={(value) => setSelectedTab(value)}
        type={'requestFeedback'}
        hideReminderTimeFrameTabPane={true}
        hideRequestConfirmationOption={true}
        hideMedicalHistoryOption={true}
        hideAllowReschedulingOption={true}
        hideAllowCancellationOption={true}
        hideDisplayPolicyOption={true}
        hideServiceOption={true}
        hideEmployeeNameOption={true}
        hideReminderSettingTabPane={false}
        standardMessage={t('notifications.requestFeedback.standardMessage')}
        name={t('notifications.requestFeedback.title')}
        langKey={'requestFeedback'}
        handleNotificationSubmit={showNotification}
      />
    </Layout>
  )
}

export default Index
