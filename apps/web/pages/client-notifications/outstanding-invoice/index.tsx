import React, { FC, useRef, useState } from 'react'
import { Notification, NotificationType } from '@pabau/ui'
import Layout from '../../../components/Layout/Layout'
import ClientNotification from '../../../components/ClientNotification/index'
import CommonNotificationHeader from '../../../components/ClientNotification/CommonNotificationHeader'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import InvoiceEmailPreview from '../../../components/ClientNotificationEmailPreview/InvoiceEmailPreview'
import { sendEmailService } from '../../../components/ClientNotificationEmailPreview/sendEmailService'

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
        showEnablePay,
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
            showEnablePay={showEnablePay}
            greeting={t('notifications.invoice.outstanding.greeting')}
            message={t('notifications.invoice.outstanding.message', {
              returnObjects: true,
            })}
            bestRegards={t('notifications.invoice.outstanding.bestRegards')}
            footerText={
              t('notifications.invoice.outstanding.footerText') +
              ' <br> ' +
              t('notifications.invoice.outstanding.footerText2')
            }
            senderFirstName={t(
              'notifications.invoice.outstanding.senderFirstName'
            )}
            showInvoiceButton={false}
            payButtonName={t('notifications.invoice.outstanding.payButtonName')}
          />
        )
      }

      sendEmailService({
        email,
        subject: t('notifications.email.outstandingInvoice.subject'),
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
            breadcrumbName: t('notifications.invoice.outstanding.title'),
          },
        ]}
        title={t('notifications.invoice.outstanding.title')}
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
        standardMessage={t('notifications.invoice.outstanding.standardMessage')}
        type={'outstandingInvoice'}
        name={t('notifications.invoice.outstanding.title')}
        langKey={'outstandingInvoice'}
        hideEnablePay={false}
        handleNotificationSubmit={showNotification}
      />
    </Layout>
  )
}

export default Index
