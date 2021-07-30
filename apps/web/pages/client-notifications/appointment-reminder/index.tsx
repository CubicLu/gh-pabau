import { Notification, NotificationType } from '@pabau/ui'
import React, { FC, useRef, useState, useContext } from 'react'
import { UserContext } from '../../../context/UserContext'
import CommonNotificationHeader from '../../../components/ClientNotification/CommonNotificationHeader'
import ClientNotification from '../../../components/ClientNotification/Index'
import AppointmentEmailPreview from '../../../components/ClientNotificationEmailPreview/AppointmentReminderEmailPreview'
import { sendEmailService } from '../../../components/ClientNotificationEmailPreview/sendEmailService'
import MobileHeader from '../../../components/MobileHeader'
import Layout from '../../../components/Layout/Layout'
import useWindowSize from '../../../hooks/useWindowSize'
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
        type,
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
          type={type}
          t={localTranslation}
        />
      )
      sendEmailService({
        email,
        subject: t('notifications.email.appointmentReminder.subject'),
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
    <Layout {...user}>
      <MobileHeader
        title={t('notifications.upcomingAppointmentReminder.title')}
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
              path: 'client-notifications/appointment-reminder',
              breadcrumbName: t(
                'notifications.upcomingAppointmentReminder.title'
              ),
            },
          ]}
          title={t('notifications.upcomingAppointmentReminder.title')}
          selectedTab={selectedTab}
          handleNotificationSubmit={showNotification}
        />
      )}
      <ClientNotification
        ref={ref}
        onSelectedTab={(value) => setSelectedTab(value)}
        standardMessage={t(
          'notifications.upcomingAppointmentReminder.standardMessage'
        )}
        showServiceSpecific={true}
        type={'appointmentReminder'}
        name={t('notifications.upcomingAppointmentReminder.title')}
        langKey={'appointmentReminder'}
        handleNotificationSubmit={showNotification}
      />
    </Layout>
  )
}

export default Index
