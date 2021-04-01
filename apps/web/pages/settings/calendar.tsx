import React from 'react'
import {
  SettingsMenu,
  Button,
  Notification,
  NotificationType,
  Breadcrumb,
} from '@pabau/ui'
import { Card, Typography } from 'antd'
import Layout from '../../components/Layout/Layout'
import Configuration from '../../components/Settings/Calendar/Configuration'
import AppointmentSettings from '../../components/Settings/Calendar/AppointmentSettings'
import Appearance from '../../components/Settings/Calendar/Appearance'
import Advanced from '../../components/Settings/Calendar/Advanced'
import { LeftOutlined } from '@ant-design/icons'
import styles from './calendar.module.less'

const { Title } = Typography
/* eslint-disable-next-line */
export interface CalendarProps { }

export function Calendar(props: CalendarProps) {
  const generalSettingsMenu1 = [
    {
      key: 0,
      menuName: 'Configuration',
      component: <Configuration />,
    },
    {
      key: 1,
      menuName: 'Appointment settings',
      component: <AppointmentSettings />,
    },
    {
      key: 2,
      menuName: 'Appearance',
      component: <Appearance />,
    },
    {
      key: 3,
      menuName: 'Advanced',
      component: <Advanced />,
    },
  ]

  const onSaveChange = () => {
    Notification(
      NotificationType['success'],
      'Success! - We have saved your calendar settings changes'
    )
  }

  return (
    <div className={styles.calendarWrapper}>
      <Layout>
        <Card className={styles.calendarCard}>
          <div className={styles.mainTabWrapper}>
            <div className={styles.titleWrapper}>
              <span className={styles.hideSection}>
                <Breadcrumb
                  breadcrumbItems={[
                    { breadcrumbName: 'Setup', path: 'setup' },
                    { breadcrumbName: 'Calendar Settings', path: '' },
                  ]}
                />
              </span>
              <Title>
                <span className={`${styles.backArrow}`}>
                  <LeftOutlined className={styles.leftIcon} />
                </span>
                Calendar settings
              </Title>
            </div>
            <div className={styles.saveBtn}>
              <Button type="primary" onClick={onSaveChange}>
                Save Changes
              </Button>
            </div>
          </div>
          <SettingsMenu items={generalSettingsMenu1} />
          <div className={styles.calendarMobileSave}>
            <div className={styles.saveBtn}>
              <Button type="primary" onClick={onSaveChange}>
                Save Changes
              </Button>
            </div>
          </div>
        </Card>
      </Layout>
    </div>
  )
}

export default Calendar
