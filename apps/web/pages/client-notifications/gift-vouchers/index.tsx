import { Notification, NotificationType } from '@pabau/ui'
import React, { FC, useRef, useState } from 'react'
import CommonNotificationHeader from '../../../components/ClientNotification/CommonNotificationHeader'
import ClientNotification from '../../../components/ClientNotification/Index'
import GiftVouchersEmailPreview from '../../../components/ClientNotificationEmailPreview/GiftVouchersEmailPreview'
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
          <GiftVouchersEmailPreview
            backGroundColor={backGroundColor}
            activeSocialIcons={activeSocialIcons}
            selectLanguage={selectLanguage}
            buttonColor={buttonColor}
            informationMessage={informationMessage}
            type={type}
            displayViewButton={true}
            greeting={t('notifications.giftVoucher.greeting')}
            buttonName={t('notifications.giftVoucher.buttonName')}
            valueMessage={t('notifications.giftVoucher.valueMessage')}
            voucherCodeMessage={t(
              'notifications.giftVoucher.voucherCodeMessage'
            )}
            expiryMessage={t('notifications.giftVoucher.expiryMessage')}
          />
        )
      }
      sendEmailService({
        email,
        subject: t('notifications.email.giftVouchers.subject'),
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
            path: 'client-notifications/gift-vouchers',
            breadcrumbName: t('notifications.giftVoucher.title'),
          },
        ]}
        title={t('notifications.giftVoucher.title')}
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
        hideReminderSettingTabPane={false}
        standardMessage={t('notifications.giftVoucher.standardMessage')}
        type={'giftVoucher'}
        name={t('notifications.giftVoucher.title')}
        langKey={'giftVoucher'}
        handleNotificationSubmit={showNotification}
      />
    </Layout>
  )
}

export default Index
