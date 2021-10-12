import { Notification, NotificationType } from '@pabau/ui'
import React, { FC, useRef, useState } from 'react'
import CommonNotificationHeader from '../../../components/ClientNotification/CommonNotificationHeader'
import ClientNotification from '../../../components/ClientNotification/Index'
import NoShowAppointmentEmailPreview from '../../../components/ClientNotificationEmailPreview/NoShowAppointmentEmailPreview'
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
          <NoShowAppointmentEmailPreview
            backGroundColor={backGroundColor}
            activeSocialIcons={activeSocialIcons}
            selectLanguage={selectLanguage}
            buttonColor={buttonColor}
            informationMessage={informationMessage}
            type={type}
            footerContact={false}
            contactNumber={'+44 000 987 507'}
            greeting={t('notifications.noShowAppointment.greeting')}
            subtitle={t('notifications.noShowAppointment.subTitle')}
            message={t('notifications.noShowAppointment.message')}
            isFooterText={true}
            closingText={t('notifications.noShowAppointment.closingText')}
            signatureBlock={t('notifications.noShowAppointment.signatureBlock')}
            bookButtonName={t('notifications.noShowAppointment.bookButtonName')}
            buttonTitleMessage={t(
              'notifications.noShowAppointment.buttonTitleMessage'
            )}
            contactFirstHalfMsg={t(
              'notifications.noShowAppointment.contactFirstHalfMsg'
            )}
            contactSecondHalfMsg={t(
              'notifications.noShowAppointment.contactSecondHalfMsg'
            )}
          />
        )
      }

      sendEmailService({
        email,
        subject: t('notifications.email.missedAClass.subject'),
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
            path: 'client-notifications/class-noshow',
            breadcrumbName: t('notitications.classNoShowAppointment.title'),
          },
        ]}
        title={t('notifications.classNoShowAppointment.title')}
        selectedTab={selectedTab}
        handleNotificationSubmit={showNotification}
      />
      <ClientNotification
        ref={ref}
        onSelectedTab={(value) => setSelectedTab(value)}
        hideRequestConfirmationOption={true}
        hideAllowReschedulingOption={true}
        hideAllowCancellationOption={true}
        hideDisplayPolicyOption={true}
        hideMedicalHistoryOption={true}
        hideReminderTimeFrameTabPane={true}
        hideServiceOption={true}
        hideEmployeeNameOption={true}
        standardMessage={t(
          'notifications.classNoShowAppointment.standardMessage'
        )}
        type={'missedAClass'}
        name={t('notifications.classNoShowAppointment.title')}
        langKey={'classNoShowAppointment'}
        handleNotificationSubmit={showNotification}
      />
    </Layout>
  )
}

export default Index
