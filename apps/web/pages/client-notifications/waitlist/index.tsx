import { Notification, NotificationType } from '@pabau/ui'
import React, { FC, useRef, useState } from 'react'
import CommonNotificationHeader from '../../../components/ClientNotification/CommonNotificationHeader'
import ClientNotification from '../../../components/ClientNotification/Index'
import { sendEmailService } from '../../../components/ClientNotificationEmailPreview/sendEmailService'
import WaitListEmailPreview from '../../../components/ClientNotificationEmailPreview/WaitListEmailPreview'
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
        activeSocialIcons,
        type,
        localTranslation,
      } = propsData

      const bodyContent = () => {
        const t = localTranslation
        return (
          <WaitListEmailPreview
            backGroundColor={backGroundColor}
            activeSocialIcons={activeSocialIcons}
            selectLanguage={selectLanguage}
            buttonColor={buttonColor}
            type={type}
            greeting={t('notifications.waitList.greeting')}
            message={t('notifications.waitList.message')}
            footerText={`${t('notifications.waitList.closingText')}<br/>${t(
              'notifications.waitList.signatureBlock'
            )}`}
            buttonTitleMessage={t('notifications.waitList.buttonTitleMessage')}
            buttonName={t('notifications.waitList.buttonName')}
            contactMessage={t(
              'notifications.emailPreview.footer.contactMessage'
            )}
          />
        )
      }
      sendEmailService({
        email,
        subject: t('notifications.email.waitList.subject'),
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
            path: 'client-notifications/waitlist',
            breadcrumbName: t('notifications.waitList.title'),
          },
        ]}
        title={t('notifications.waitList.title')}
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
        standardMessage={t('notifications.waitList.standardMessage')}
        type={'waitList'}
        name={t('notifications.waitList.title')}
        langKey={'waitList'}
        handleNotificationSubmit={showNotification}
      />
    </Layout>
  )
}

export default Index
