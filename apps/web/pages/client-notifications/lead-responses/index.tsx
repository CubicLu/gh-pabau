import React, { FC, useRef, useState } from 'react'
import { Notification, NotificationType } from '@pabau/ui'
import Layout from '../../../components/Layout/Layout'
import ClientNotification from '../../../components/ClientNotification/index'
import CommonNotificationHeader from '../../../components/ClientNotification/CommonNotificationHeader'
import { sendEmailService } from '../../../components/ClientNotificationEmailPreview/sendEmailService'
import LeadResponsesEmailPreview from '../../../components/ClientNotificationEmailPreview/LeadResponsesEmailPreview'
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
          <LeadResponsesEmailPreview
            backGroundColor={backGroundColor}
            activeSocialIcons={activeSocialIcons}
            selectLanguage={selectLanguage}
            buttonColor={buttonColor}
            informationMessage={informationMessage}
            type={type}
            isFooterText={false}
            greeting={t('notifications.leadResponses.greeting')}
            companyPhone={'+44 000 987 507'}
            companyEmail={'info@theclinic.com'}
            message={t('notifications.leadResponses.message')}
            description={t('notifications.leadResponses.description')}
            messageLine={t('notifications.leadResponses.messageLine')}
            text={`${t('notifications.leadResponses.closingText')}<br/>${t(
              'notifications.leadResponses.signatureBlock'
            )}`}
          />
        )
      }
      sendEmailService({
        email,
        subject: t('notifications.email.leadResponses.subject'),
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
            path: 'client-notifications/lead-responses',
            breadcrumbName: t('notifications.leadResponses.title'),
          },
        ]}
        title={t('notifications.leadResponses.title')}
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
        showServiceSpecific={true}
        standardMessage={t('notifications.leadResponses.standardMessage')}
        type={'leadResponses'}
        name={t('notifications.leadResponses.title')}
        langKey={'leadResponses'}
        handleNotificationSubmit={showNotification}
      />
    </Layout>
  )
}

export default Index
