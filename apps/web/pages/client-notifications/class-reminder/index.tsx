import React, { FC, useState } from 'react'
import { Notification, NotificationType } from '@pabau/ui'
import Layout from '../../../components/Layout/Layout'
import ClientNotification from '../../../components/ClientNotification/index'
import CommonNotificationHeader from '../../../components/ClientNotification/CommonNotificationHeader'

const Index: FC = () => {
  const [setIndexTab, setSelectedTab] = useState(1)

  const showNotification = (email) => {
    if (setIndexTab === 1) {
      Notification(NotificationType.success, 'Test Email sent')
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
            path: 'client-notifications/class-reminder',
            breadcrumbName: 'Reminder for class',
          },
        ]}
        title={'Reminder for class'}
        setIndexTab={setIndexTab}
        handleNotificationSubmit={showNotification}
      />
      <ClientNotification
        onSeletedTab={(value) => setSelectedTab(value)}
        standardMessage={
          'This notification automatically sends a reminder to a client who has registered to a class'
        }
      />
    </Layout>
  )
}

export default Index
