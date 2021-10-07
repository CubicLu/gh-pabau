import { Notification, NotificationType } from '@pabau/ui'
import React, { FC, useRef, useState } from 'react'
import CommonNotificationHeader from '../../../components/ClientNotification/CommonNotificationHeader'
import ClientNotification from '../../../components/ClientNotification/Index'
import AppointmentEmailPreview from '../../../components/ClientNotificationEmailPreview/AppointmentReminderEmailPreview'
import { sendEmailService } from '../../../components/ClientNotificationEmailPreview/sendEmailService'
import Layout from '../../../components/Layout/Layout'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'

const Index: FC = () => {
  const [selectedTab, setSelectedTab] = useState<'emailPreview' | 'smsPreview'>(
    'emailPreview'
  )
  const { t } = useTranslationI18()
  const ref = useRef(null)

  const showNotification = (email) => {
    if (selectedTab === 'emailPreview') {
      const propsData = ref?.current?.propsData() || {}
      const {
        requestConfirm,
        allowRescheduling,
        allowCancellation,
        displayPolicy,
        showService,
        showEmployeeName,
        addMedicalHisButton,
        selectLanguage,
        backGroundColor,
        buttonColor,
        informationMessage,
        medicalMessage,
        standardTapIndex,
        activeSocialIcons,
        localTranslation,
      } = propsData

      const bodyContent = (
        <AppointmentEmailPreview
          requestConfirm={requestConfirm}
          allowRescheduling={allowRescheduling}
          allowCancellation={allowCancellation}
          displayPolicy={displayPolicy}
          showService={showService}
          showEmployeeName={showEmployeeName}
          addMedicalHisButton={addMedicalHisButton}
          selectLanguage={selectLanguage}
          backGroundColor={backGroundColor}
          buttonColor={buttonColor}
          informationMessage={informationMessage}
          medicalMessage={medicalMessage}
          standardTapIndex={standardTapIndex}
          activeSocialIcons={activeSocialIcons}
          type={'new'}
          t={localTranslation}
        />
      )

      sendEmailService({
        email,
        subject: t('notifications.email.newAppointment.subject'),
        bodyContent,
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
            path: 'client-notifications/new-appointment',
            breadcrumbName: t('notifications.newAppointment.title'),
          },
        ]}
        title={t('notifications.newAppointment.title')}
        selectedTab={selectedTab}
        handleNotificationSubmit={showNotification}
      />
      <ClientNotification
        ref={ref}
        onSelectedTab={(value) => setSelectedTab(value)}
        hideReminderTimeFrameTabPane={true}
        standardMessage={t('notifications.newAppointment.standardMessage')}
        type={'newAppointment'}
        showServiceSpecific={true}
        name={t('notifications.newAppointment.title')}
        langKey={'newAppointment'}
        handleNotificationSubmit={showNotification}
      />
    </Layout>
  )
}

export default Index
