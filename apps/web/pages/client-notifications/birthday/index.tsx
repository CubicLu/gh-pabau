import { Notification, NotificationType } from '@pabau/ui'
import useWindowSize from '../../../hooks/useWindowSize'
import React, { FC, useRef, useState, useContext } from 'react'
import { UserContext } from '../../../context/UserContext'
import CommonNotificationHeader from '../../../components/ClientNotification/CommonNotificationHeader'
import ClientNotification from '../../../components/ClientNotification/Index'
import BirthdayEmailPreview from '../../../components/ClientNotificationEmailPreview/BirthdayEmailPreview'
import { sendEmailService } from '../../../components/ClientNotificationEmailPreview/sendEmailService'
import MobileHeader from '../../../components/MobileHeader'
import Layout from '../../../components/Layout/Layout'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'

const Index: FC = () => {
  const [selectedTab, setSelectedTab] = useState<'emailPreview' | 'smsPreview'>(
    'emailPreview'
  )
  const ref = useRef(null)
  const { t } = useTranslationI18()
  const size = useWindowSize()
  const user = useContext(UserContext)

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
          <BirthdayEmailPreview
            backGroundColor={backGroundColor}
            activeSocialIcons={activeSocialIcons}
            selectLanguage={selectLanguage}
            buttonColor={buttonColor}
            informationMessage={informationMessage}
            type={type}
            wishingMessage={t('notifications.birthday.wishingMessage')}
            messages={t('notifications.birthday.messages', {
              returnObjects: true,
            })}
            closingText={t('notifications.birthday.closingText')}
            signatureBlock={t('notifications.birthday.signatureBlock')}
          />
        )
      }
      sendEmailService({
        email,
        subject: t('notifications.email.birthday.subject'),
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
    <Layout {...user}>
      <MobileHeader
        title={t('notifications.birthday.title')}
        parent="/client-notifications"
      />
      {size.width > 767 && (
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
              path: 'client-notifications/birthday',
              breadcrumbName: t('notifications.birthday.title'),
            },
          ]}
          title={t('notifications.birthday.title')}
          selectedTab={selectedTab}
          handleNotificationSubmit={showNotification}
        />
      )}
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
        standardMessage={t('notifications.birthday.standardMessage')}
        type={'birthday'}
        name={t('notifications.birthday.title')}
        langKey={'birthday'}
        handleNotificationSubmit={showNotification}
      />
    </Layout>
  )
}

export default Index
