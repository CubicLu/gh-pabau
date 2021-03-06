import { Button, elapsedTime } from '@pabau/ui'
import { Modal } from 'antd'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './WebinarModal.module.less'
import Countdown from 'react-countdown'
import dayjs from 'dayjs'

export interface WebinarModalProps {
  id: number
  description: string
  course_id: number
  webinar_id: number
  name: string
  title: string
  duration: number
  time: string
  backgroundImage?: string
  buttonType: string
  registered_id?: number
  visible?: boolean
  awaitingResponse?: boolean
  onCancel?: () => void
  onRegister?: (
    course_id: number,
    webinar_id: number,
    course_date?: string
  ) => Promise<boolean>
  onJoin?: (
    course_id: number,
    webinar_id: number,
    course_date?: string
  ) => Promise<boolean>
  isJoin?: boolean
  isYourSchedule?: boolean
  isFinished?: boolean
}

export const WebinarModal: FC<WebinarModalProps> = ({
  id,
  visible,
  title,
  name,
  time,
  duration,
  description,
  backgroundImage,
  buttonType,
  course_id,
  webinar_id,
  registered_id,
  awaitingResponse = false,
  onCancel,
  onRegister,
  onJoin,
  isYourSchedule,
  isFinished = false,
}) => {
  const { t } = useTranslation('common')
  const [loading, changeLoadingState] = useState(awaitingResponse)
  const [registered, changeRegisteredState] = useState<boolean>(
    buttonType === 'join' ? true : false
  )
  const [finished, setFinished] = useState<boolean>(isFinished)
  const [cancel, setCancel] = useState<boolean>(false)

  const renderButtonState = () => {
    if (finished) return t('setup.page.live.upcoming.webinar.closed.label')
    if (
      (cancel && registered && !isYourSchedule) ||
      (cancel && registered_id && !isYourSchedule)
    )
      return t('setup.page.live.upcoming.webinar.cancel-registration.label')
    if (registered || registered_id) {
      if (isYourSchedule) {
        return t('setup.page.live.upcoming.webinar.join.class.label')
      }
      return t('setup.page.webinar.modal.registered.label')
    }
    return t('setup.page.webinar.modal.register.label')
  }

  const ElapsedTimer = () => {
    const timer = elapsedTime(Number(duration), time as string)
    if (timer?.isCompleted) setFinished(true)
    return <span>{timer?.elapsedTime}</span>
  }

  return (
    <Modal
      visible={visible}
      footer={null}
      centered={true}
      className={styles.webinarModal}
      onCancel={() => onCancel?.()}
    >
      <div className={styles.webinarTopWrapper}>
        <div className={styles.webinarImg}>
          <img src={backgroundImage} alt={backgroundImage} />
        </div>
        <div className={styles.webinarHeader}>
          <h2>{title}</h2>
          <p className={styles.name}>{name}</p>
          <p className={styles.start}>{t('footer.webinar.getting.started')}</p>
          <p className={styles.name}>
            {dayjs(time)?.format('MMMM DD, YYYY, HH:mm:ss')}
          </p>
          {finished && (
            <p style={{ display: 'inline' }}>
              {t('setup.page.live.upcoming.closedAt.label')}
            </p>
          )}
          {finished && (
            <>
              {' '}
              <h4 style={finished ? { display: 'inline' } : {}}>
                {dayjs(time)
                  .add(duration, 'minute')
                  .format('MMM DD, YYYY HH:mm:ss')}
              </h4>
            </>
          )}
          {!finished && !isYourSchedule && (
            <h4 style={finished ? { display: 'inline' } : {}}>
              <Countdown date={time} />
            </h4>
          )}
          {!finished && isYourSchedule && (
            <>
              <h4 style={{ display: 'inline' }}>
                <ElapsedTimer />
              </h4>{' '}
              <p style={{ display: 'inline' }}>
                {t('setup.page.live.upcoming.elapsed.uppercase.label')}
              </p>
            </>
          )}
        </div>
      </div>
      <div className={styles.desc}>{description}</div>
      {console.log('cancel', cancel, registered)}
      <Button
        className={styles.btnRegister}
        loading={loading}
        onMouseOver={() => {
          setCancel(true)
        }}
        onMouseLeave={() => {
          setCancel(false)
        }}
        onClick={async () => {
          if (buttonType === 'join' || buttonType === 'register') {
            changeLoadingState(true)
            buttonType === 'join'
              ? await onJoin?.(course_id, webinar_id, time).then(() => {
                  changeLoadingState(false)
                  changeRegisteredState(true)
                })
              : await onRegister?.(course_id, webinar_id, time).then(() => {
                  changeLoadingState(false)
                  changeRegisteredState(true)
                })
          }
        }}
      >
        {renderButtonState()}
      </Button>
      <p style={{ display: 'inline', color: '#9292A3', marginTop: '8px' }}>
        {
          '*You will be able to join the session here 5 minutes before the start time'
        }
      </p>
    </Modal>
  )
}

export default WebinarModal
