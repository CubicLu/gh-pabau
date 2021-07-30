import { LeftOutlined } from '@ant-design/icons'
import {
  CalendarSettingsDataDocument,
  useCalendarSettingsDataQuery,
  useCreateOneCalendarSettingMutation,
  useSetCompanyMetaMutation,
  useUpdateCompanyMetaMutation,
  useUpdateOneCalendarSettingMutation,
} from '@pabau/graphql'
import {
  Breadcrumb,
  Button,
  Notification,
  NotificationType,
  SettingsMenu,
} from '@pabau/ui'
import { Card, Typography } from 'antd'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../../components/Layout/Layout'
import Advanced from '../../../components/Settings/Calendar/Advanced'
import Appearance from '../../../components/Settings/Calendar/Appearance'
import AppointmentSettings from '../../../components/Settings/Calendar/AppointmentSettings'
import Configuration from '../../../components/Settings/Calendar/Configuration'
import { UserContext } from '../../../context/UserContext'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import styles from './index.module.less'

const { Title } = Typography

export function Calendar({ ...props }) {
  const { t } = useTranslationI18()
  const user = useContext(UserContext)

  const [isLoading, setIsLoading] = useState(false)
  const [settingsData, setSettingsData] = useState(null)
  const [companyMetas, setCompanyMetas] = useState(null)
  const [updatedCompanyMetas, setUpdatedCompanyMetas] = useState(null)

  const generalSettingsMenu1 = [
    {
      key: 0,
      menuName: t('settings.calendar.configuration.title'),
      component: (
        <Configuration
          onChange={(data) => {
            setSettingsData({ ...settingsData, ...data })
          }}
          slot_interval={settingsData?.slot_interval}
          start_time={settingsData?.start_time}
          end_time={settingsData?.end_time}
          lock_timer={settingsData?.lock_timer}
          isLoading={isLoading}
        />
      ),
    },
    {
      key: 1,
      menuName: t('settings.calendar.appointment.title'),
      component: (
        <AppointmentSettings
          onChange={(data) => setSettingsData({ ...settingsData, ...data })}
          allow_overlapping_appts={settingsData?.allow_overlapping_appts}
          send_reminder={settingsData?.send_reminder}
          send_email={settingsData?.send_email}
          send_sms={settingsData?.send_sms}
          send_feedback={settingsData?.send_feedback}
          isLoading={isLoading}
        />
      ),
    },
    {
      key: 2,
      menuName: t('settings.calendar.appearance.title'),
      component: (
        <Appearance
          onChange={(data) => setSettingsData({ ...settingsData, ...data })}
          disable_surname={settingsData?.disable_surname}
          disable_time={settingsData?.disable_time}
          font_size={settingsData?.font_size}
          appt_body={settingsData?.appt_body}
          tooltip_body={settingsData?.tooltip_body}
          isLoading={isLoading}
        />
      ),
    },
    {
      key: 3,
      menuName: t('settings.calendar.advanced.title'),
      component: (
        <Advanced
          initials={settingsData?.initials}
          noshow_count={settingsData?.noshow_count}
          column_total={settingsData?.column_total}
          companyMetas={companyMetas}
          onChange={(data) => setSettingsData({ ...settingsData, ...data })}
          onMetaChange={(data, updatedMeta) => {
            setCompanyMetas([...data])
            const copyMetas = updatedCompanyMetas
              ? [...updatedCompanyMetas]
              : []
            const existedIndex = copyMetas?.findIndex(
              (el) => el?.id === updatedMeta?.id
            )
            if (existedIndex !== -1) {
              copyMetas?.splice(existedIndex, 1, updatedMeta)
            } else {
              copyMetas.push(updatedMeta)
            }
            setUpdatedCompanyMetas(copyMetas)
          }}
          isLoading={isLoading}
        />
      ),
    },
  ]

  const [createMutation] = useCreateOneCalendarSettingMutation({
    onCompleted(data) {
      Notification(
        NotificationType['success'],
        t('settings.calendar.success.notification')
      )
      setIsLoading(false)
    },
    onError(err) {
      Notification(
        NotificationType.error,
        t('settings.calendar.error.notification')
      )
      setIsLoading(false)
    },
  })

  const [updateMutation] = useUpdateOneCalendarSettingMutation({
    onCompleted(data) {
      Notification(
        NotificationType['success'],
        t('settings.calendar.success.notification')
      )
      setIsLoading(false)
    },
    onError(err) {
      Notification(
        NotificationType.error,
        t('settings.calendar.error.notification')
      )
      setIsLoading(false)
    },
  })

  const [createCompanyMetaMutation] = useSetCompanyMetaMutation()
  const [updateCompanyMetaMutation] = useUpdateCompanyMetaMutation()

  const { data, loading } = useCalendarSettingsDataQuery({
    fetchPolicy: 'network-only',
  })
  useEffect(() => {
    setIsLoading(loading)
    if (data) {
      setSettingsData({
        ...data?.company?.BookingSetting?.[0],
      })
      setCompanyMetas(data?.company?.CompanyMeta)
    }
  }, [data, loading])

  const onSaveChange = () => {
    const settings = { ...settingsData }
    if (settings?.noshow_count < 0) {
      return
    }
    setIsLoading(true)
    saveCompanyMetas()
    if (settingsData?.id) {
      updateMutation({
        variables: {
          ...settings,
        },
        refetchQueries: [
          {
            query: CalendarSettingsDataDocument,
          },
        ],
      })
    } else {
      settings.default_date_time = new Date()
      createMutation({
        variables: {
          ...settings,
        },
        refetchQueries: [
          {
            query: CalendarSettingsDataDocument,
          },
        ],
      })
    }
  }

  const saveCompanyMetas = () => {
    if (updatedCompanyMetas?.length > 0) {
      for (const item in updatedCompanyMetas) {
        const updatedMeta = updatedCompanyMetas[item]
        if (updatedMeta?.id) {
          updateCompanyMetaMutation({
            variables: {
              id: updatedMeta?.id,
              value: updatedMeta?.meta_value,
            },
            refetchQueries: [
              {
                query: CalendarSettingsDataDocument,
              },
            ],
          })
        } else {
          createCompanyMetaMutation({
            variables: {
              name: updatedMeta?.meta_name,
              value: updatedMeta?.meta_value,
            },
            refetchQueries: [
              {
                query: CalendarSettingsDataDocument,
              },
            ],
          })
        }
      }
      setUpdatedCompanyMetas(null)
    }
  }

  return (
    <div className={styles.calendarWrapper}>
      <Layout
        {...user}
        requireAdminAccess={
          user?.me?.admin === 0 || user?.me?.admin === undefined ? false : true
        }
      >
        <Card className={styles.calendarCard}>
          <div className={styles.mainTabWrapper}>
            <div className={styles.titleWrapper}>
              <span className={styles.hideSection}>
                <Breadcrumb
                  breadcrumbItems={[
                    {
                      breadcrumbName: t('navigation-breadcrumb-setup'),
                      path: 'setup',
                    },
                    {
                      breadcrumbName: t('settings.calendar.breadcrumb.title'),
                      path: '',
                    },
                  ]}
                />
              </span>
              <Title>
                <span className={`${styles.backArrow}`}>
                  <Link href={'/setup'}>
                    <LeftOutlined className={styles.leftIcon} />
                  </Link>
                </span>
                {t('settings.calendar.title')}
              </Title>
            </div>
            <div className={styles.saveBtn}>
              <Button
                type="primary"
                onClick={!isLoading && onSaveChange}
                loading={isLoading}
                disabled={isLoading}
                backgroundColor="#54b2d3"
                className="saveBtn"
              >
                {t('settings.calendar.save.button')}
              </Button>
            </div>
          </div>
          <SettingsMenu items={generalSettingsMenu1} />
          <div className={styles.calendarMobileSave}>
            <div className={styles.saveBtn}>
              <Button
                type="primary"
                onClick={!isLoading && onSaveChange}
                loading={isLoading}
                disabled={isLoading}
                backgroundColor="#54b2d3"
                className="saveBtn"
              >
                {t('settings.calendar.save.button')}
              </Button>
            </div>
          </div>
        </Card>
      </Layout>
    </div>
  )
}

export default Calendar
