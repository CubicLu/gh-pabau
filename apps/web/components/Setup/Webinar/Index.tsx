import {
  Button,
  Webinar,
  WebinarModal,
  WebinarModalProps,
  ViewScheduleModal,
  WebinarSkeleton,
} from '@pabau/ui'
import React, { FC, useState } from 'react'
import dayjs from 'dayjs'
import Alex from '../../../assets/images/users/alex.png'
import Iva from '../../../assets/images/trainers/rsz_iva.jpg'
import Joy from '../../../assets/images/trainers/rsz_joy.jpg'
import styles from '../../../pages/setup/setup.module.less'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import {
  UpcomingWebinarsDocument,
  useUpcomingWebinarsQuery,
  useWebinarEnrollMutation,
} from '@pabau/graphql'
import { useRouter } from 'next/router'

const WEBINARS_PER_PAGE = 6

const TRAINERS = [
  { name: 'alex', image: Alex },
  { name: 'iva', image: Iva },
  { name: 'joy', image: Joy },
]

const WebinarCard: FC = () => {
  const [isOpenModal, setIsOpen] = useState<boolean>(false)
  const { data, loading } = useUpcomingWebinarsQuery()
  const [isOpenViewSchedule, setIsOpenViewSchedule] = useState(false)
  const [modalData, setModalData] = useState<Partial<WebinarModalProps>>()
  const router = useRouter()
  const [enroll] = useWebinarEnrollMutation({
    refetchQueries: [
      {
        query: UpcomingWebinarsDocument,
      },
    ],
  })
  const { t } = useTranslationI18()

  const trainer = (name: string, images: { name: string; image: string }[]) =>
    images?.find(
      (trainer) => trainer?.name.toLowerCase() === name?.toLowerCase()
    ).image

  const handleOpenModal = (buttonType: string, id: number) => {
    const filterData = data?.upcomingWebinars?.find(
      (webinar) => webinar?.id === id
    )
    const selectedData: WebinarModalProps = {
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
      backgroundImage: trainer(filterData?.name, TRAINERS),
    }
    setModalData(selectedData)
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleCloseViewSchedule = () => {
    setIsOpenViewSchedule(false)
  }
  const handleOpenViewSchedule = () => {
    setIsOpenViewSchedule(true)
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

  return (
    <>
      <div className={styles.rightSide}>
        <div className={styles.textTitle}>
          {t('setup.page.live.upcoming.webinar.title')}
        </div>
        <div className={styles.webinarWrapper}>
          {loading
            ? [1, 2, 3, 4, 5, 6].map((el) => <WebinarSkeleton key={el} />)
            : data?.upcomingWebinars
                ?.slice(0, WEBINARS_PER_PAGE)
                ?.map((value) => (
                  <Webinar
                    key={value?.id}
                    title={value?.title}
                    course_id={value?.course_id}
                    webinar_id={value?.webinar_id}
                    time={value?.course_date}
                    backgroundImage={trainer(value?.name, TRAINERS)}
                    duration={value?.duration}
                    id={value?.id}
                    isJoin={!!value?.registered_id}
                    isYourSchedule={checkIsInProgress(value)}
                    isFinished={checkIsFinished(value)}
                    onClick={handleOpenModal}
                  />
                ))}
        </div>
        <Button className={styles.btnView} onClick={handleOpenViewSchedule}>
          {t('setup.page.live.upcoming.webinar.view.schedule')}
        </Button>
      </div>
      {isOpenModal && (
        <WebinarModal
          visible={isOpenModal}
          name={modalData?.name}
          id={modalData?.id}
          description={modalData?.description}
          time={modalData?.time}
          registered_id={modalData?.registered_id}
          buttonType={
            modalData?.buttonType ||
            (modalData?.registered_id ? 'join' : 'register')
          }
          course_id={modalData?.course_id}
          webinar_id={modalData?.webinar_id}
          title={modalData?.title}
          backgroundImage={modalData?.backgroundImage}
          onCancel={handleCloseModal}
          isYourSchedule={checkIsInProgress({
            ...modalData,
            course_date: modalData.time,
          })}
          isFinished={checkIsFinished({
            ...modalData,
            course_date: modalData.time,
          })}
          duration={modalData?.duration}
          onRegister={async (course_id, webinar_id, course_date) => {
            return !!(await enroll({
              variables: {
                course_date: course_date,
                course_id: course_id,
                webinar_id: webinar_id,
              },
            }))
          }}
          onJoin={async (course_id, webinar_id, course_date) => {
            const result = await enroll({
              variables: {
                course_date: course_date,
                course_id: course_id,
                webinar_id: webinar_id,
              },
            })
            router.push(result?.data?.enroll?.user?.live_room_url)
            return true
          }}
        />
      )}
      <ViewScheduleModal
        title={'Webinars'}
        schedule={data?.upcomingWebinars?.filter(
          (webinar) => !!webinar?.registered_id
        )}
        discoverAndLearn={data?.upcomingWebinars}
        visible={isOpenViewSchedule}
        trainers={TRAINERS}
        onBackClick={handleCloseViewSchedule}
        join={async (course_id, webinar_id, course_date) => {
          const result = await enroll({
            variables: {
              course_date: course_date,
              course_id: course_id,
              webinar_id: webinar_id,
            },
          })
          router.push(result?.data?.enroll?.user?.live_room_url)
          return true
        }}
        register={async (course_id, webinar_id, course_date) => {
          return !(await enroll({
            variables: {
              course_date: course_date,
              course_id: course_id,
              webinar_id: webinar_id,
            },
          }))
        }}
      />
    </>
  )
}

export default WebinarCard
