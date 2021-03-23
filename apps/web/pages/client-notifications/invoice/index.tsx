import React, { FC, useState } from 'react'
import { Notification, NotificationType } from '@pabau/ui'
import Layout from '../../../components/Layout/Layout'
import ClientNotification from '../../../components/ClientNotification'
import CommonNotificationHeader from '../../../components/ClientNotification/CommonNotificationHeader'

const Index: FC = () => {
  const [selectedTab, setSelectedTab] = useState(1)

  const showNotification = (email) => {
    if (selectedTab === 1) {
      Notification(NotificationType.success, 'Test message sent')
    }
    if (selectedTab === 2) {
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
            path: 'client-notifications/invoice',
            breadcrumbName: 'Invoice',
          },
        ]}
        title={'Invoice'}
        setIndexTab={selectedTab}
        handleNotificationSubmit={showNotification}
      />
      <ClientNotification
        onSeletedTab={(value) => setSelectedTab(value)}
        hideReminderTimeFrameTabPane={true}
        hideRequestConfirmationOption={true}
        hideMedicalHistoryOption={true}
        hideAllowReschedulingOption={true}
        hideAllowCancellationOption={true}
        hideDisplayPolicyOption={true}
        hideServiceOption={true}
        hideEmployeeNameOption={true}
        standardMessage={
          'The default email template you will send with a clients invoice attached'
        }
        type={'invoice'}
      />
    </Layout>
  )
}

export default Index
