import { HelpTooltip } from '@pabau/ui'
import { Checkbox, Typography } from 'antd'
import React, { FC } from 'react'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import AppointmentSettingsSkeleton from './AppointmentSettingsSkeleton'
import styles from './Calendar.module.less'

const { Title } = Typography

interface AppointmentControlItems {
  type: string
  value: boolean
  label: string
  key: number
  name: string
}

interface P {
  allow_overlapping_appts?: boolean
  send_reminder?: boolean
  send_email?: boolean
  send_sms?: boolean
  send_feedback?: boolean
  onChange?: (data) => void
  isLoading?: boolean
}

const AppointmentSettings: FC<P> = ({
  allow_overlapping_appts = false,
  send_reminder = false,
  send_email = false,
  send_sms = false,
  send_feedback = false,
  onChange,
  isLoading = true,
}) => {
  const { t } = useTranslationI18()
  const appointmentsControls: AppointmentControlItems[] = [
    {
      name: 'allow_overlapping_appts',
      type: t('settings.calendar.appointment.input.overlap.label'),
      value: allow_overlapping_appts,
      label: t('settings.calendar.appointment.input.overlap.tooltip'),
      key: 1,
    },
    {
      name: 'send_reminder',
      type: t('settings.calendar.appointment.input.reminder.label'),
      value: send_reminder,
      label: t('settings.calendar.appointment.input.reminder.tooltip'),
      key: 2,
    },
    {
      name: 'send_email',
      type: t('settings.calendar.appointment.input.email.label'),
      value: send_email,
      label: t('settings.calendar.appointment.input.email.tooltip'),
      key: 3,
    },
    {
      name: 'send_sms',
      type: t('settings.calendar.appointment.input.sms.label'),
      value: send_sms,
      label: t('settings.calendar.appointment.input.sms.tooltip'),
      key: 4,
    },
    {
      name: 'send_feedback',
      type: t('settings.calendar.appointment.input.feedback.label'),
      value: send_feedback,
      label: t('settings.calendar.appointment.input.feedback.tooltip'),
      key: 5,
    },
  ]
  return isLoading ? (
    <AppointmentSettingsSkeleton />
  ) : (
    <div className={styles.calendarSettingsAppointment}>
      <div className={styles.settingContent}>
        <Title className={styles.headerText}>
          {t('settings.calendar.appointment.title')}
        </Title>
        <span className={styles.description}>
          {t('settings.calendar.appointment.subtitle')}
        </span>
      </div>
      <div className={styles.appointmentsControls}>
        {appointmentsControls.map((appointment) => {
          return (
            <div key={appointment.key} className={styles.advancedCheckList}>
              <Checkbox
                key={appointment.key}
                checked={appointment.value || false}
                defaultChecked={appointment.value}
                className={styles.advancedCheck}
                onChange={(val) => {
                  if (appointment?.name) {
                    onChange?.({
                      [`${appointment.name}`]: val.target.checked ? 1 : 0,
                    })
                  }
                }}
              >
                <span className={styles.appointmentText}>
                  {appointment.type}
                </span>
              </Checkbox>
              <HelpTooltip helpText={appointment.label} />
              <br />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AppointmentSettings
