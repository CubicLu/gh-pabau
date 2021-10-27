import React, { FC, useEffect, useState } from 'react'
import {
  FullScreenReportModal,
  FullScreenReportModalProps,
  Webinar,
  WebinarModal,
  WebinarModalProps,
  BasicModal,
} from '@pabau/ui'
import { Filter, IFilter } from './Filter'
import { useTranslation } from 'react-i18next'
import styles from './ViewSchedule.module.less'
import Alex from '../../assets/images/users/alex.png'
import Iva from '../../assets/images/users/rsz_iva.jpg'
import Joy from '../../assets/images/users/rsz_joy.jpg'
import { groupBy } from 'lodash'
import dayjs from 'dayjs'
import { Button } from 'antd'

const TRAINERS = [
  { name: 'alex', image: Alex },
  { name: 'iva', image: Iva },
  { name: 'joy', image: Joy },
]

export interface IWebinar {
  id: number
  course_id: number
  course_date: string
  name: string
  description: string
  title: string
  webinar_id: number
  registered_id: number
  duration: number
  category: string
  difficulty: string
}

interface Dictionary<T> {
  [Key: string]: T
}

export interface ViewScheduleProps extends FullScreenReportModalProps {
  schedule: Partial<IWebinar>[]
  discoverAndLearn: Partial<IWebinar>[]
  trainers: { name: string; image: string }[]
  join: (
    course_id: number,
    webinar_id: number,
    course_date?: string
  ) => Promise<boolean>
  register: (
    course_id: number,
    webinar_id: number,
    course_date?: string
  ) => Promise<boolean>
}

export const ViewScheduleModal: FC<ViewScheduleProps> = ({
  trainers,
  visible,
  schedule,
  discoverAndLearn,
  onBackClick,
  register,
  join,
}) => {
  const { t } = useTranslation('common')
  const [filteredWebinars, setFilteredWebinars] = useState<
    Partial<IWebinar>[]
  >()
  const [modalState, setModalState] = useState(false)
  const [modalData, setModalData] = useState<Partial<WebinarModalProps>>()

  const groupByDayWebinars = (
    webinars: Partial<IWebinar>[]
  ): Dictionary<Partial<IWebinar>[]> =>
    groupBy(webinars, (webinar) =>
      dayjs(webinar?.course_date).startOf('day').format()
    )

  useEffect(() => {
    setFilteredWebinars(discoverAndLearn)
  }, [discoverAndLearn])

  const handleClear = (): void => {
    setFilteredWebinars(discoverAndLearn)
  }

  const trainer = (name: string, images: { [Key: string]: string }[]) =>
    images?.find(
      (trainer) => trainer?.name?.toLowerCase() === name?.toLowerCase()
    )?.image

  const handleOpenModal = (buttonType: string, id: number) => {
    const filterData = discoverAndLearn?.find((webinar) => webinar?.id === id)
    const selectedData: Partial<WebinarModalProps> = {
      id: filterData?.id,
      registered_id: filterData?.registered_id,
      title: filterData?.title,
      description: filterData?.description,
      course_id: filterData?.course_id,
      webinar_id: filterData?.webinar_id,
      time: filterData?.course_date,
      buttonType: buttonType,
      name: filterData?.name,
      duration: filterData?.duration,
      backgroundImage: trainer(filterData?.name || 'alex', TRAINERS),
    }
    setModalData(selectedData)
    setModalState(true)
  }

  const onFilter = (filters: IFilter) => {
    let preFilter = discoverAndLearn
    if (filters?.trainer) {
      preFilter = preFilter?.filter(
        (webinar) => webinar?.name === filters?.trainer
      )
    }
    if (filters?.category) {
      preFilter = preFilter?.filter(
        (webinar) => webinar?.category === filters?.category
      )
    }
    if (filters?.difficulty) {
      preFilter = preFilter?.filter(
        (webinar) => webinar?.difficulty === filters?.difficulty
      )
    }
    if (
      filters?.length &&
      (filters?.length?.min || filters?.length?.min === 0) &&
      filters?.length?.max
    ) {
      preFilter = preFilter?.filter((webinar) => {
        if (webinar?.duration && filters?.length) {
          return (
            webinar?.duration >= filters?.length?.min &&
            webinar?.duration <= filters?.length?.max
          )
        }
        return false
      })
    }
    setFilteredWebinars(preFilter)
  }

  const checkIsInProgress = (webinarData) => {
    const currentDate = dayjs()
    const webinarDate = dayjs(webinarData?.course_date)
    if (webinarData?.registered_id) {
      const post = webinarDate.add(webinarData?.duration, 'minute')
      if (currentDate > webinarDate && currentDate < post) {
        return true
      }
    }
    return false
  }

  const checkIsFinished = (webinarData) => {
    const currentDate = dayjs()
    const webinarDate = dayjs(webinarData?.course_date)
    if (webinarData?.registered_id) {
      const post = webinarDate.add(webinarData?.duration, 'minute')
      if (currentDate > post) {
        return true
      }
    }
    return false
  }

  const formatDate = (webinar_date: string, date_format: string) =>
    dayjs(webinar_date).format(date_format)

  const discoverAndLearnRender = (webinars: Partial<WebinarModalProps>[]) => {
    return (
      <div>
        {Object.entries(groupByDayWebinars(webinars)).map((orderByDay, key) => {
          return (
            <div className={styles.discoverWrap} key={key}>
              <h4>
                {formatDate(orderByDay?.[0], 'DD/MM/YYYY') ===
                dayjs().format('DD/MM/YYYY')
                  ? t('account.finance.date.range.option.today')
                  : formatDate(orderByDay?.[0], 'dddd, MMMM, D, YYYY')}
              </h4>
              <div className={styles.webinarWrapperModal}>
                {orderByDay?.[1]?.map((webinar) => {
                  return (
                    <div
                      className={
                        orderByDay?.[1]?.length > 1 ? styles.webBox : undefined
                      }
                      key={webinar?.id}
                    >
                      <Webinar
                        key={webinar?.id}
                        title={webinar?.title}
                        course_id={webinar?.course_id as number}
                        duration={webinar?.duration || 0}
                        webinar_id={webinar?.webinar_id as number}
                        time={webinar?.course_date}
                        id={webinar?.id as number}
                        backgroundImage={trainer(
                          webinar?.name as string,
                          trainers
                        )}
                        isJoin={!!webinar?.registered_id}
                        isYourSchedule={checkIsInProgress(webinar)}
                        isFinished={checkIsFinished(webinar)}
                        onClick={handleOpenModal}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <FullScreenReportModal
      visible={visible}
      title={t('setup.page.live.upcoming.webinar.title')}
      onBackClick={onBackClick}
    >
      <div className={styles.viewScheduleWrapper}>
        <div className={styles.scheduleContent}>
          <h2>{t('modals.webinar.tab.schedule')}</h2>
          {schedule?.length === 0 ? (
            <div className={styles.upcomingWrap}>
              {t('modals.webinar.tab.schedule.empty')}
            </div>
          ) : (
            discoverAndLearnRender(schedule)
          )}
        </div>
        <div className={styles.scheduleContent}>
          <div className={styles.filterWrap}>
            <h2>{t('modals.webinar.tab.discover')}</h2>
            <Filter
              webinarList={discoverAndLearn}
              handleShowResult={onFilter}
              onClear={handleClear}
            />
          </div>
          {discoverAndLearnRender(filteredWebinars as Partial<IWebinar>[])}
        </div>
        <WebinarModal
          visible={modalState}
          name={modalData?.name as string}
          id={modalData?.id as number}
          description={modalData?.description as string}
          time={modalData?.time as string}
          registered_id={modalData?.registered_id}
          buttonType={modalData?.registered_id ? 'join' : 'register'}
          course_id={modalData?.course_id as number}
          webinar_id={modalData?.webinar_id as number}
          title={modalData?.title as string}
          backgroundImage={modalData?.backgroundImage}
          onCancel={() => setModalState(false)}
          isYourSchedule={checkIsInProgress(modalData)}
          isFinished={checkIsFinished(modalData)}
          duration={modalData?.duration || 0}
          onJoin={async (course_id, webinar_id, course_date) => {
            await join(course_id, webinar_id, course_date)
            return true
          }}
          onRegister={async (course_id, webinar_id, course_date) => {
            await register(course_id, webinar_id, course_date)
            return true
          }}
        />
      </div>
    </FullScreenReportModal>
  )
}

export default ViewScheduleModal
