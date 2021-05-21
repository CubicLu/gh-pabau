import { LeftOutlined } from '@ant-design/icons'
import { gql, useMutation } from '@apollo/client'
import {
  Breadcrumb,
  Button,
  Notification,
  NotificationType,
  SettingsMenu,
  useLiveQuery,
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

const LIST_QUERY = gql`
  query {
    company {
      BookingSetting {
        id
        slot_interval
        start_time
        end_time
        lock_timer

        allow_overlapping_appts
        send_reminder
        send_email
        send_sms
        send_feedback

        initials
        disable_surname
        font_size
        disable_time
        appt_body
        tooltip_body

        disable_service_filter
        disable_book_by_package
      }
      CompanyMeta {
        id
        meta_name
        meta_value
      }
    }
  }
`

const ADD_MUTATION = gql`
  mutation createOneBookingSetting(
    $slot_interval: Int
    $start_time: String = ""
    $end_time: String = ""
    $lock_timer: Int
    $allow_overlapping_appts: Int
    $send_reminder: Int = 0
    $send_email: Int = 0
    $send_sms: Int = 0
    $send_feedback: Int = 0
    $initials: Int
    $disable_surname: Int = 0
    $font_size: Int
    $disable_time: Int = 0
    $appt_body: String
    $tooltip_body: String
    $disable_service_filter: Int
    $disable_book_by_package: Int
    $default_date_time: DateTime!
  ) {
    createOneBookingSetting(
      data: {
        Company: {}
        attach_invoice: 0
        booking_emails: ""
        cancel_email_from: ""
        cancel_email_tmpl: 0
        cancel_sms_from: ""
        cancel_sms_notify: 0
        cancel_sms_tmpl: 0
        class_noshow_email_notify: 0
        class_noshow_email_tmpl: 0
        class_noshow_sms_notify: 0
        class_noshow_sms_tmpl: 0
        class_reminder_email_notify: 0
        class_reminder_email_tmpl: 0
        class_reminder_sms_notify: 0
        class_reminder_sms_tmpl: 0
        class_reschedule_email_notify: 0
        class_reschedule_email_tmpl: 0
        class_reschedule_sms_notify: 0
        class_reschedule_sms_tmpl: 0
        class_sms_days_before: 0
        column_total: 0
        confirm_fromemail: ""
        disable_second_cal: 0
        email_confirm_id: 0
        email_mode: 0
        email_reminder_id: 0
        feedback_days_after: 0
        feedback_fromemail: ""
        feedback_id: 0
        feedback_mode: 0
        feedback_send_time: $default_date_time
        class_sms_send_time: $default_date_time
        modified_date: $default_date_time
        send_time: $default_date_time
        sms_send_time: $default_date_time
        font_color: ""
        group_booking_cancel_email_enable: false
        group_booking_cancel_template_id: 0
        modified_by: 0
        noshow_email_from: ""
        noshow_email_notify: 0
        noshow_email_tmpl: 0
        noshow_sms_from: ""
        noshow_sms_notify: 0
        noshow_sms_tmpl: 0
        package_used_email_enable: 0
        package_used_template_id: 0
        reminder_fromemail: ""
        reminder_mode: 0
        reschedule_email_from: ""
        reschedule_email_tmpl: 0
        reschedule_sms_from: ""
        reschedule_sms_notify: 0
        reschedule_sms_tmpl: 0
        sms_confirm_id: 0
        sms_days_before: 0
        sms_id: 0
        sms_mode: 0
        sms_name: ""
        slot_interval: $slot_interval
        start_time: $start_time
        end_time: $end_time
        lock_timer: $lock_timer
        allow_overlapping_appts: $allow_overlapping_appts
        send_reminder: $send_reminder
        send_email: $send_email
        send_sms: $send_sms
        send_feedback: $send_feedback
        initials: $initials
        disable_surname: $disable_surname
        font_size: $font_size
        disable_time: $disable_time
        appt_body: $appt_body
        tooltip_body: $tooltip_body
        disable_service_filter: $disable_service_filter
        disable_book_by_package: $disable_book_by_package
      }
    ) {
      __typename
      id
    }
  }
`

const UPDATE_MUTATION = gql`
  mutation updateOneBookingSetting(
    $id: Int
    $slot_interval: Int
    $lock_timer: Int
    $start_time: String
    $end_time: String
    $allow_overlapping_appts: Int
    $send_reminder: Int
    $send_email: Int
    $send_sms: Int
    $send_feedback: Int
    $initials: Int
    $disable_surname: Int
    $font_size: Int
    $disable_time: Int
    $appt_body: String
    $tooltip_body: String
    $disable_service_filter: Int
    $disable_book_by_package: Int
  ) {
    updateOneBookingSetting(
      where: { id: $id }
      data: {
        slot_interval: { set: $slot_interval }
        lock_timer: { set: $lock_timer }
        start_time: { set: $start_time }
        end_time: { set: $end_time }
        allow_overlapping_appts: { set: $allow_overlapping_appts }
        send_reminder: { set: $send_reminder }
        send_email: { set: $send_email }
        send_sms: { set: $send_sms }
        send_feedback: { set: $send_feedback }
        initials: { set: $initials }
        disable_surname: { set: $disable_surname }
        font_size: { set: $font_size }
        disable_time: { set: $disable_time }
        appt_body: { set: $appt_body }
        tooltip_body: { set: $tooltip_body }
        disable_service_filter: { set: $disable_service_filter }
        disable_book_by_package: { set: $disable_book_by_package }
      }
    ) {
      id
    }
  }
`

const CREATE_COMPANY_META_MUTATION = gql`
  mutation createOneCompanyMeta($name: String!, $value: String!) {
    createOneCompanyMeta(
      data: { meta_name: $name, meta_value: $value, Company: {} }
    ) {
      id
    }
  }
`

const UPDATE_COMPANY_META_MUTATION = gql`
  mutation updateOneCompanyMeta($id: Int, $value: String) {
    updateOneCompanyMeta(
      data: { meta_value: { set: $value } }
      where: { id: $id }
    ) {
      id
    }
  }
`

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
          initials={settingsData?.initials}
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
          disable_service_filter={settingsData?.disable_service_filter}
          disable_book_by_package={settingsData?.disable_book_by_package}
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

  const [createMutation] = useMutation(ADD_MUTATION, {
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

  const [updateMutation] = useMutation(UPDATE_MUTATION, {
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

  const [createCompanyMetaMutation] = useMutation(CREATE_COMPANY_META_MUTATION)
  const [updateCompanyMetaMutation] = useMutation(UPDATE_COMPANY_META_MUTATION)

  const { data, loading } = useLiveQuery(LIST_QUERY)
  useEffect(() => {
    setIsLoading(loading)
    if (data) {
      setSettingsData({
        ...data?.BookingSetting?.[0],
      })
      setCompanyMetas(data?.CompanyMeta)
    }
  }, [data, loading])

  const onSaveChange = () => {
    const settings = { ...settingsData }
    setIsLoading(true)
    saveCompanyMetas()
    if (settingsData?.id) {
      updateMutation({
        variables: {
          ...settings,
        },
        optimisticResponse: {},
        refetchQueries: [
          {
            query: LIST_QUERY,
          },
        ],
      })
    } else {
      settings.default_date_time = new Date()
      createMutation({
        variables: {
          ...settings,
        },
        optimisticResponse: {},
        refetchQueries: [
          {
            query: LIST_QUERY,
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
            optimisticResponse: {},
            refetchQueries: [
              {
                query: LIST_QUERY,
              },
            ],
          })
        } else {
          createCompanyMetaMutation({
            variables: {
              name: updatedMeta?.meta_name,
              value: updatedMeta?.meta_value,
            },
            optimisticResponse: {},
            refetchQueries: [
              {
                query: LIST_QUERY,
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
