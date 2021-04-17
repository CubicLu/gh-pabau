import React, { FC, useRef, useState } from 'react'
import { Notification, NotificationType } from '@pabau/ui'
import Layout from '../../../components/Layout/Layout'
import ClientNotification from '../../../components/ClientNotification/index'
import CommonNotificationHeader from '../../../components/ClientNotification/CommonNotificationHeader'
import { sendEmailService } from '../../../components/ClientNotificationEmailPreview/sendEmailService'
import ConnectRegistrationEmailPreview from '../../../components/ClientNotificationEmailPreview/ConnectRegistrationEmailPreview'
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
        informationMessage,
        activeSocialIcons,
        type,
        localTranslation,
      } = propsData

      const bodyContent = () => {
        const t = localTranslation
        return (
          <ConnectRegistrationEmailPreview
            backGroundColor={backGroundColor}
            activeSocialIcons={activeSocialIcons}
            buttonColor={buttonColor}
            informationMessage={informationMessage}
            type={type}
            footerContact={true}
            greeting={t('notifications.connectRegistration.greeting')}
            message={t('notifications.connectRegistration.message')}
            text={`${t(
              'notifications.connectRegistration.closingText'
            )}<br/>${t('notifications.connectRegistration.signatureBlock')}`}
            credentialMessage={t(
              'notifications.connectRegistration.credentialMessage'
            )}
            contactMessage={t(
              'notifications.emailPreview.footer.contactMessage'
            )}
            userNameMessage={t(
              'notifications.connectRegistration.userNameMessage'
            )}
            passwordMessage={t(
              'notifications.connectRegistration.passwordMessage'
            )}
            connectURL={'URL://CONNECTURL'}
            username={'Sophia17'}
            password={'Sophia0193091'}
          />
        )
      }
      sendEmailService({
        email,
        subject: t('notifications.email.connectRegistration.subject'),
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
            path: 'client-notifications/connect-registration',
            breadcrumbName: t('notifications.connectRegistration.title'),
          },
        ]}
        title={t('notifications.connectRegistration.title')}
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
        standardMessage={t('notifications.connectRegistration.standardMessage')}
        type={'connectRegistration'}
        name={t('notifications.connectRegistration.title')}
        langKey={'connectRegistration'}
        handleNotificationSubmit={showNotification}
      />
    </Layout>
  )
}

export default Index
