import React, { FC, useEffect, useState } from 'react'
import styles from './SetupChip.module.less'
import { Button, elapsedTime } from '@pabau/ui'
import {
  PlayCircleOutlined,
  PlusOutlined,
  CheckOutlined,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import Countdown, {
  zeroPad,
  calcTimeDelta,
  formatTimeDelta,
} from 'react-countdown'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import classNames from 'classnames'
import { boolean } from 'yup/lib/locale'
dayjs.extend(relativeTime)
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  relativeTime: {
    future: '%s',
    past: '%s ago',
    s: 'a few seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: '%d hours',
    dd: '%d',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years',
  },
})

export interface WebinarProps {
  id: number
  course_id: number
  webinar_id: number
  title?: string
  name?: string
  time?: string
  backgroundImage?: string
  category?: string
  length?: number
  difficulty?: string
  onClick: (type: string, id: number) => void
  isJoin?: boolean
  isYourSchedule?: boolean
  duration: number
  isFinished?: boolean
}

export const Webinar: FC<WebinarProps> = ({
  id,
  title,
  name,
  time,
  backgroundImage,
  onClick,
  duration,
  isJoin,
  isYourSchedule,
  isFinished = false,
}) => {
  const { t } = useTranslation('common')
  const [finished, setFinished] = useState<boolean>(isFinished)
  const [isRegistered, setIsRegistered] = useState(false)
  const [isWebinarDate, setIsWebinarDate] = useState(false)
  const [registeredHover, setRegisteredHover] = useState(false)
  const [hours, sethours] = useState(false)
  const [lastHour, setLastHour] = useState(false)
  const [elapsed, setElapsed] = useState(false)
  const countdownTime = dayjs(time).format('H')
  const webinarDate = dayjs(time).fromNow().toString()
  useEffect(() => {
    if (Number(webinarDate) >= 1) {
      setIsWebinarDate(true)
    }
    if (webinarDate.includes('ago')) {
      setElapsed(true)
    } else {
      setElapsed(false)
    }
    if (
      (webinarDate.includes('hour') && !webinarDate.includes('hours')) ||
      webinarDate.includes('minute') ||
      webinarDate.includes('minutes')
    ) {
      setLastHour(true)
    } else {
      setLastHour(false)
    }
    // if (webinarDate.includes('minute') || webinarDate.includes('minutes')) {
    //   setLastHour(true)
    // } else {
    //   setLastHour(false)
    // }
    if (webinarDate.includes('hours')) {
      sethours(true)
    } else {
      sethours(false)
    }
  }, [setIsWebinarDate, webinarDate])

  const ElapsedTimer = () => {
    const timer = elapsedTime(Number(duration), time as string)
    if (timer?.isCompleted) setFinished(true)
    return <span>{timer?.elapsedTime}</span>
  }

  const RenderWebinarContent = () => {
    const webinarTime = dayjs(time)
    const endTime = webinarTime
      .add(duration, 'minute')
      .format('MMM DD, YYYY HH:mm:ss')
    if (isJoin) {
      if (finished) {
        return (
          <div>
            <h6>{t('setup.page.live.upcoming.webinar.closed-at.label')}</h6>
            <h4 className={styles.time}> {endTime}</h4>
            <div className={styles.joinBtnTopSpace}>
              <Button
                className={styles.joinBtn}
                onClick={() => onClick?.('closed', id)}
              >
                {t('setup.page.live.upcoming.webinar.closed.label')}
              </Button>
            </div>
          </div>
        )
      }
      if (isYourSchedule) {
        return (
          <div>
            <h4 className={styles.time}>
              {' '}
              <ElapsedTimer /> {t('setup.page.live.upcoming.elapsed.label')}
            </h4>
            <div className={styles.joinBtnTopSpace}>
              <Button
                className={styles.joinBtn}
                type="primary"
                icon={<PlayCircleOutlined />}
                onClick={() => onClick?.('join', id)}
              >
                {t('setup.page.live.upcoming.webinar.join.class.label')}
              </Button>
            </div>
          </div>
        )
      }
      return (
        <div>
          {/* {console.log('hours', hours, lastHour, isWebinarDate)} */}
          {/* <h4 className={styles.countTime}>
            <Countdown date={time} />{' '}
            {t('setup.page.live.upcoming.start.label')}
          </h4> */}
          {lastHour && (
            <div>
              <div>
                <p>
                  <Countdown date={time} />
                </p>
                {/* {webinarDate} */}
              </div>
              {!elapsed && <div>{'Till Start'}</div>}
            </div>
          )}
          {!isWebinarDate && hours && (
            // <div>
            //   {/* <Countdown date={time} /> {webinarDate} */}
            //   {webinarDate}
            // </div>
            <div>
              <div>
                {/* <Countdown date={time} /> */}
                <p>{webinarDate}</p>
              </div>
              {!elapsed && <div>{'Till Start'}</div>}
            </div>
          )}
          {/*{lastHour && isWebinarDate && hours === false && (
            <div>
              <div>
                <p>{webinarDate}</p>
              </div>
              {!elapsed && <div>{'Till Start'}</div>}
            </div>
          )} */}
          <div
            className={styles.joinBtnTopSpace}
            style={{ width: 'fit-content' }}
          >
            <Button
              className={styles.joinBtn}
              onClick={() => {
                onClick?.('cancel', id)
              }}
              icon={<CheckOutlined />}
            >
              {'Registered'}
            </Button>
          </div>
        </div>
      )
    }
    return (
      <div className={styles.countMe}>
        <h4 className={styles.countTime}>
          <span style={{ color: '#54B2D3' }}>
            {/* {t('setup.page.live.upcoming.start.label')} */}
            {!isWebinarDate && hours && (
              <div>
                <div>
                  {/* <Countdown date={time} /> */}
                  <p>{webinarDate}</p>
                </div>
                {!elapsed && <div>{'Till Start'}</div>}
              </div>
            )}
            {lastHour && (
              <div>
                <div>
                  <p>
                    <Countdown date={time} />
                  </p>
                  {/* <p>{webinarDate}</p> */}
                </div>
                {!elapsed && <div>{'Till Start'}</div>}
              </div>
            )}
          </span>
        </h4>
        <div className={styles.joinBtnTopSpace}>
          <Button
            className={styles.countBtn}
            icon={<PlusOutlined />}
            onClick={() => onClick?.('register', id)}
          >
            {t('setup.page.live.upcoming.webinar.count.me.label')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.webinarBannerEnd}>
      <div className={styles.webinarBox} style={{ marginTop: '12px' }}>
        <div
          className={classNames(styles.webinarText, styles.webinarBanner)}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <p>{title}</p>
          <h6>
            {name} <br />{' '}
            <span>{t('setup.page.live.upcoming.getting-started.label')}</span>
          </h6>
          {hours === false && lastHour === false && (
            <h5>{dayjs(time)?.format('dddd, MMMM, DD H:mm')}</h5>
          )}
          <RenderWebinarContent />
        </div>
      </div>
    </div>
  )
}

export default Webinar
