import { TimeInput } from '@pabau/ui'
import { Col, Row, Select, Typography } from 'antd'
import moment from 'moment'
import React, { FC } from 'react'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import styles from './Calendar.module.less'
import ConfigurationSkeleton from './ConfigurationSkeleton'

const { Title } = Typography

interface P {
  slot_interval?: number
  start_time?: string
  end_time?: string
  lock_timer?: number
  onChange?: (data) => void
  isLoading?: boolean
}

export const Configuration: FC<P> = ({
  slot_interval,
  start_time,
  end_time,
  lock_timer,
  onChange,
  isLoading = true,
}) => {
  const { t } = useTranslationI18()
  const timeSlots = [
    { value: `5 ${t('settings.calendar.configuration.input.minutes')}` },
    { value: `10 ${t('settings.calendar.configuration.input.minutes')}` },
    { value: `15 ${t('settings.calendar.configuration.input.minutes')}` },
    { value: `20 ${t('settings.calendar.configuration.input.minutes')}` },
    { value: `30 ${t('settings.calendar.configuration.input.minutes')}` },
  ]

  const autoLocks = [
    { value: `1 ${t('settings.calendar.configuration.input.minutes')}` },
    { value: `2 ${t('settings.calendar.configuration.input.minutes')}` },
    { value: `5 ${t('settings.calendar.configuration.input.minutes')}` },
    { value: `10 ${t('settings.calendar.configuration.input.minutes')}` },
    { value: `2 ${t('settings.calendar.configuration.input.hours')}` },
  ]

  return isLoading ? (
    <ConfigurationSkeleton />
  ) : (
    <div className={styles.calendarSettingsConfiguration}>
      <div className={styles.settingContent}>
        <Title className={styles.headerText}>
          {t('settings.calendar.configuration.title')}
        </Title>
        <span className={styles.description}>
          {t('settings.calendar.configuration.subtitle')}
        </span>
      </div>
      <div className={styles.configurationControls}>
        <Row>
          <Col xs={24}>
            <Title level={4} className={styles.titleTextStyle}>
              {t('settings.calendar.configuration.input.slotsize')}
            </Title>
            <Select
              className={styles.timeSlotSelect}
              placeholder={t(
                'settings.calendar.configuration.input.placeholder'
              )}
              defaultValue={timeSlots[0].value}
              value={
                slot_interval
                  ? slot_interval +
                    ` ${t('settings.calendar.configuration.input.minutes')}`
                  : null
              }
              options={timeSlots}
              onChange={(val) => {
                const value = {
                  slot_interval: Number(val.match(/\d+/g)?.[0]),
                }
                onChange?.(value)
              }}
            />
            <Row className={styles.timeInputSpace}>
              <Col xs={24} md={12} className={styles.colRightSpace}>
                <TimeInput
                  label={t('settings.calendar.configuration.input.starttime')}
                  defaultValue={moment(`13:45:00`, 'HH:mm:ss')}
                  value={
                    start_time ? moment(`${start_time}`, 'HH:mm:ss') : null
                  }
                  onChange={(val) => {
                    if (val) {
                      onChange?.({
                        start_time: moment(val).format('HH:mm:ss'),
                      })
                    } else {
                      onChange?.({
                        start_time: '',
                      })
                    }
                  }}
                />
              </Col>
              <Col xs={24} md={12} className={styles.colLeftSpace}>
                <TimeInput
                  label={t('settings.calendar.configuration.input.endtime')}
                  defaultValue={moment('13:45:00', 'HH:mm:ss')}
                  value={end_time ? moment(`${end_time}`, 'HH:mm:ss') : null}
                  onChange={(val) => {
                    if (val) {
                      onChange?.({
                        end_time: moment(val).format('HH:mm:ss'),
                      })
                    } else {
                      onChange?.({
                        end_time: '',
                      })
                    }
                  }}
                />
              </Col>
            </Row>
            <Row className={styles.timeInputSpace}>
              <Col xs={24}>
                <Title level={4} className={styles.titleTextStyle}>
                  {t('settings.calendar.configuration.input.autolock')}
                </Title>
                <Select
                  className={styles.timeSlotSelect}
                  style={{ width: '100%' }}
                  placeholder={t(
                    'settings.calendar.configuration.input.placeholder'
                  )}
                  defaultValue={autoLocks[0].value}
                  value={
                    lock_timer
                      ? Number(lock_timer) > 60
                        ? Number(lock_timer) / 60 +
                          ` ${t('settings.calendar.configuration.input.hours')}`
                        : lock_timer +
                          ` ${t(
                            'settings.calendar.configuration.input.minutes'
                          )}`
                      : null
                  }
                  options={autoLocks}
                  onChange={(val) => {
                    if (val === '2 hours') val = '120'
                    const value = {
                      lock_timer: Number(val.match(/\d+/g)?.[0]),
                    }
                    onChange?.(value)
                  }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Configuration
