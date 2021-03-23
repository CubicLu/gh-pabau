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
            path: 'client-notifications/request-feedback',
            breadcrumbName: 'Request feedback',
          },
        ]}
        title={'Request feedback'}
        setIndexTab={setIndexTab}
        handleNotificationSubmit={showNotification}
      />
      <ClientNotification
        onSeletedTab={(value) => setSelectedTab(value)}
        type={'requestFeedback'}
        hideReminderTimeFrameTabPane={true}
        hideRequestConfirmationOption={true}
        hideMedicalHistoryOption={true}
        hideAllowReschedulingOption={true}
        hideAllowCancellationOption={true}
        hideDisplayPolicyOption={true}
        hideServiceOption={true}
        hideEmployeeNameOption={true}
        hideReminderSettingTabPane={false}
        standardMessage={
          'This notification automatically sends to clients when an appointment is checked out'
        }
      />
    </Layout>
  )
}

export default Index