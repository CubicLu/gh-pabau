import { Notification, NotificationType } from '@pabau/ui'
import React, { FC, useRef, useState } from 'react'
import CommonNotificationHeader from '../../../components/ClientNotification/CommonNotificationHeader'
import ClientNotification from '../../../components/ClientNotification/Index'
import ClassSpotAvailableEmailPreview from '../../../components/ClientNotificationEmailPreview/ClassSpotAvailableEmailPreview'
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
          <ClassSpotAvailableEmailPreview
            backGroundColor={backGroundColor}
            activeSocialIcons={activeSocialIcons}
            buttonColor={buttonColor}
            type={type}
            greeting={t('notifications.classSpotAvailable.greeting')}
            footerText={`${t(
              'notifications.classSpotAvailable.closingText'
            )}<br/>${t('notifications.classSpotAvailable.signatureBlock')}`}
            message={t('notifications.classSpotAvailable.message')}
            buttonTitleMessage={t(
              'notifications.classSpotAvailable.buttonTitleMessage'
            )}
            bookButtonName={t(
              'notifications.classSpotAvailable.bookButtonName'
            )}
            contactMessage={t(
              'notifications.emailPreview.footer.contactMessage'
            )}
          />
        )
      }
      sendEmailService({
        email,
        subject: t('notifications.email.classSpotAvailable.subject'),
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
            path: 'client-notifications/class-spot-available',
            breadcrumbName: t('notifications.classSpotAvailable.title'),
          },
        ]}
        title={t('notifications.classSpotAvailable.title')}
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
        standardMessage={t('notifications.classSpotAvailable.standardMessage')}
        type={'classSpotAvailable'}
        name={t('notifications.classSpotAvailable.title')}
        langKey={'classSpotAvailable'}
        handleNotificationSubmit={showNotification}
      />
    </Layout>
  )
}

export default Index
