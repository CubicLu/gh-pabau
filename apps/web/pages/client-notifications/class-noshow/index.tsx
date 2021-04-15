import React, { FC, useState } from 'react'
import { Notification, NotificationType } from '@pabau/ui'
import Layout from '../../../components/Layout/Layout'
import ClientNotification from '../../../components/ClientNotification/index'
import CommonNotificationHeader from '../../../components/ClientNotification/CommonNotificationHeader'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'

const Index: FC = () => {
  const [selectedTab, setSelectedTab] = useState<'emailPreview' | 'smsPreview'>(
    'emailPreview'
  )
  const { t } = useTranslationI18()

  const showNotification = (email) => {
    if (selectedTab === 'emailPreview') {
      Notification(NotificationType.success, 'Test message sent')
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
            path: 'client-notifications/class-noshow',
            breadcrumbName: t('notitications.classNoShowAppointment.title'),
          },
        ]}
        title={t('notifications.classNoShowAppointment.title')}
        selectedTab={selectedTab}
        handleNotificationSubmit={showNotification}
      />
      <ClientNotification
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
