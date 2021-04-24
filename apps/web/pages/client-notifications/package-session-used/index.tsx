import React, { FC, useRef, useState } from 'react'
import { Notification, NotificationType } from '@pabau/ui'
import Layout from '../../../components/Layout/Layout'
import ClientNotification from '../../../components/ClientNotification/index'
import CommonNotificationHeader from '../../../components/ClientNotification/CommonNotificationHeader'
import { sendEmailService } from '../../../components/ClientNotificationEmailPreview/sendEmailService'
import PackageSessionUsedEmailPreview from '../../../components/ClientNotificationEmailPreview/PackageSessionUsedEmailPreview'
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
        activeSocialIcons,
        type,
        localTranslation,
      } = propsData
      const bodyContent = () => {
        const t = localTranslation
        return (
          <PackageSessionUsedEmailPreview
            backGroundColor={backGroundColor}
            activeSocialIcons={activeSocialIcons}
            selectLanguage={selectLanguage}
            buttonColor={buttonColor}
            type={type}
            message={t('notifications.packageSession.message')}
            buttonName={t('notifications.packageSession.buttonName')}
            greeting={t('notifications.packageSession.greeting')}
            footerText={`${t(
              'notifications.packageSession.closingText'
            )}<br/>${t('notifications.packageSession.signatureBlock')}`}
          />
        )
      }
      sendEmailService({
        email,
        subject: t('notifications.email.packageSessionUsed.subject'),
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
            path: 'client-notifications/package-session-used',
            breadcrumbName: t('notifications.packageSession.title'),
          },
        ]}
        title={t('notifications.packageSession.title')}
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
        standardMessage={t('notifications.packageSession.standardMessage')}
        type={'package-session-used'}
        langKey={'packageSessionUsed'}
        name={t('notifications.packageSession.title')}
        handleNotificationSubmit={showNotification}
      />
    </Layout>
  )
}

export default Index
