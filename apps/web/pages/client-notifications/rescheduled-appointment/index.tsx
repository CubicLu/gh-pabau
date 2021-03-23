import React, { FC, useState } from 'react'
import { Notification, NotificationType } from '@pabau/ui'
import Layout from '../../../components/Layout/Layout'
import ClientNotification from '../../../components/ClientNotification/index'
import CommonNotificationHeader from '../../../components/ClientNotification/CommonNotificationHeader'

const Index: FC = () => {
  const [setIndexTab, setSelectedTab] = useState(1)

  const showNotification = (email) => {
    if (setIndexTab === 1) {
      Notification(NotificationType.success, 'Test message sent')
    }
    if (setIndexTab === 2) {
      Notification(NotificationType.success, 'Test SMS sent')
    }
  }

  return (
    <Layout>
      <CommonNotificationHeader
        breadcrumbItems={[
          {
            path: 'setup',
            breadcrumbName: 'Setup',
          },
          {
            path: 'client-notifications',
            breadcrumbName: 'Notification Messages',
          },
          {
            path: 'client-notifications/rescheduled-appointment',
            breadcrumbName: 'Reschedule appointment reminder',
          },
        ]}
        title={'Reschedule appointment reminder'}
        setIndexTab={setIndexTab}
        handleNotificationSubmit={showNotification}
      />
      <ClientNotification
        onSeletedTab={(value) => setSelectedTab(value)}
        type={'reschedule'}
        hideReminderTimeFrameTabPane={true}
        hideMedicalHistoryOption={false}
        standardMessage={
          'This notification automatically sends to clients when their appointment start time is changed'
        }
      />
    </Layout>
  )
}

export default Index
