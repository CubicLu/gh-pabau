import React, { FC, useRef, useState } from 'react'
import { Notification, NotificationType } from '@pabau/ui'
import Layout from '../../../components/Layout/Layout'
import ClientNotification from '../../../components/ClientNotification'
import CommonNotificationHeader from '../../../components/ClientNotification/CommonNotificationHeader'
import { sendEmailService } from '../../../components/ClientNotificationEmailPreview/sendEmailService'
import InvoiceEmailPreview from '../../../components/ClientNotificationEmailPreview/InvoiceEmailPreview'
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
          <InvoiceEmailPreview
            backGroundColor={backGroundColor}
            activeSocialIcons={activeSocialIcons}
            selectLanguage={selectLanguage}
            buttonColor={buttonColor}
            informationMessage={informationMessage}
            type={type}
            greeting={t('notifications.invoice.greeting')}
            message={t('notifications.invoice.message', {
              returnObjects: true,
            })}
            footerText={
              t('notifications.invoice.closingText') +
              ' <br> ' +
              t('notifications.invoice.signatureBlock')
            }
            showInvoiceButton={true}
            viewButtonName={t('notifications.invoice.viewButtonName')}
          />
        )
      }
      sendEmailService({
        email,
        subject: t('notifications.email.invoice.subject'),
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
            path: 'client-notifications/invoice',
            breadcrumbName: t('notifications.invoice.title'),
          },
        ]}
        title={t('notifications.invoice.title')}
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
        standardMessage={t('notifications.invoice.standardMessage')}
        type={'invoice'}
        name={t('notifications.invoice.title')}
        langKey={'invoice'}
        handleNotificationSubmit={showNotification}
      />
    </Layout>
  )
}

export default Index
