import React, { FC, useRef, useState } from 'react'
import { Notification, NotificationType } from '@pabau/ui'
import Layout from '../../../components/Layout/Layout'
import ClientNotification from '../../../components/ClientNotification/index'
import { renderToString } from 'react-dom/server'
import AppointmentEmailPreview from '../../../components/ClientNotificationEmailPreview/appointmentReminderEmailPreview'
import { apiURL } from '../../../baseUrl'
import CommonNotificationHeader from '../../../components/ClientNotification/CommonNotificationHeader'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'

const Index: FC = () => {
  const [selectedTab, setSelectedTab] = useState<'emailPreview' | 'smsPreview'>(
    'emailPreview'
  )
  const ref = useRef(null)
  const { t } = useTranslationI18()

  const showNotification = (val) => {
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
      } = propsData

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': apiURL,
        },
        body: JSON.stringify({
          bodyContent: `${renderToString(
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
            />
          )}`,
          email: val,
          subject: 'TEST',
        }),
      }
      fetch(`${apiURL}/notification-email`, requestOptions).then((res) => {
        if (res.status === 201) {
          Notification(NotificationType.success, 'Test Email sent')
        } else {
          Notification(NotificationType.error, 'Test Email failed')
        }
      })
    } else if (selectedTab === 'smsPreview') {
      Notification(NotificationType.success, 'Test SMS sent')
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
