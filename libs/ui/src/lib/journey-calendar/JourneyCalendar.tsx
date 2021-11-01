import React, { FC, useState, useEffect, useRef } from 'react'
import { Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'
import styles from './JourneyCalendar.module.less'
import dayjs from 'dayjs'
import { Button } from '@pabau/ui'
import { useWindowSize } from 'react-use'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import useGestures from './Gestures'

interface CalendarState {
  array: string[]
  previousArray: string[]
  nextArray: string[]
}

export interface Props {
  activeDate: Date
  setActiveDate: (date: Date | undefined) => void
}

const dateFormat = 'MMM D YYYY'

export const JourneyCalendar: FC<Props> = ({ activeDate, setActiveDate }) => {
  const { t } = useTranslation('common')
  const carouselContainerRef1 = React.useRef<HTMLDivElement>(null)
  const carouselContainerRef2 = React.useRef<HTMLDivElement>(null)
  const carouselContainerRef3 = React.useRef<HTMLDivElement>(null)
  const resizeEvent = useWindowSize()
  const [currentMonth, setCurrentMonth] = useState(
    dayjs(new Date()).format('MMMM YYYY')
  )
  const [dateArray, setDataArray] = useState<CalendarState>({
    array: [],
    previousArray: [],
    nextArray: [],
  })

  const [daysToAppend, setDaysToAppend] = useState(9)

  const swiperRef = useRef(null)

  const getDaysArray = (start: Date, end: Date) => {
    const arr: Array<string> = []
    const dt = new Date(start)
    for (arr; dt <= end; dt.setDate(dt.getDate() + 1)) {
      arr.push(dayjs(dt).format(dateFormat))
    }
    return arr
  }

  const setInitialDates = (startDate = null, endDate = null) => {
    const slidesOnLeftRight = Math.floor(daysToAppend / 2)
    const start =
      startDate || dayjs().subtract(slidesOnLeftRight, 'days').toDate()
    const end = endDate || dayjs().add(slidesOnLeftRight, 'days').toDate()
    const newArray = getDaysArray(start, end)
    const nextAndPreviousArray = setNextAndPreviousArray(start, end)
    setActiveDate(new Date())
    setCurrentMonth(dayjs(new Date()).format('MMMM YYYY'))
    setDataArray({
      ...dateArray,
      array: [...newArray],
      previousArray: nextAndPreviousArray.previousArray,
      nextArray: nextAndPreviousArray.nextArray,
    })
  }

  const setNextAndPreviousArray = (start, end) => {
    const previousArrayStartDate = dayjs(start)
      .subtract(daysToAppend, 'days')
      .toDate()
    const previousArrayEndDate = dayjs(start).subtract(1, 'days').toDate()
    const previousArray = getDaysArray(
      previousArrayStartDate,
      previousArrayEndDate
    )
    const nextArrayStartDate = dayjs(end).add(1, 'days').toDate()
    const nextArrayEndDate = dayjs(end).add(daysToAppend, 'days').toDate()
    const nextArray = getDaysArray(nextArrayStartDate, nextArrayEndDate)
    return { previousArray, nextArray }
  }

  const handleTodays = () => {
    setInitialDates()
  }

  const appendNewDates = (direction: 'next' | 'prev') => {
    const start =
      direction === 'prev'
        ? dayjs(dateArray.array[0], dateFormat)
            .subtract(daysToAppend, 'days')
            .toDate()
        : dayjs(dateArray.array[dateArray.array.length - 1], dateFormat)
            .add(1, 'day')
            .toDate()
    const end =
      direction === 'prev'
        ? dayjs(dateArray.array[0], dateFormat).subtract(1, 'day').toDate()
        : dayjs(dateArray.array[dateArray.array.length - 1], dateFormat)
            .add(daysToAppend, 'days')
            .toDate()
    const newArray = getDaysArray(start, end)
    const nextAndPreviousArray = setNextAndPreviousArray(start, end)
    const finalArray =
      direction === 'prev'
        ? [...newArray, ...dateArray.array]
        : [...dateArray.array, ...newArray]
    setDataArray({
      ...dateArray,
      array: newArray,
      previousArray: nextAndPreviousArray.previousArray,
      nextArray: nextAndPreviousArray.nextArray,
    })
  }

  const selectDateHandler = (date) => {
    setActiveDate(new Date(date))
    setDataArray({ ...dateArray })
    setCurrentMonth(dayjs(date).format('MMMM YYYY'))
  }

  const handleNext = () => {
    carouselContainerRef1.current?.classList.remove(styles.rightAnimation)
    carouselContainerRef2.current?.classList.remove(styles.rightAnimation)
    carouselContainerRef3.current?.classList.remove(styles.rightAnimation)
    carouselContainerRef1.current?.classList.remove(styles.leftAnimation)
    carouselContainerRef2.current?.classList.remove(styles.leftAnimation)
    carouselContainerRef3.current?.classList.remove(styles.leftAnimation)
    setTimeout(() => {
      carouselContainerRef1.current?.classList.add(styles.rightAnimation)
      carouselContainerRef2.current?.classList.add(styles.rightAnimation)
      carouselContainerRef3.current?.classList.add(styles.rightAnimation)
      appendNewDates('next')
    })
  }

  const handlePrev = () => {
    carouselContainerRef1.current?.classList.remove(styles.leftAnimation)
    carouselContainerRef2.current?.classList.remove(styles.leftAnimation)
    carouselContainerRef3.current?.classList.remove(styles.leftAnimation)
    carouselContainerRef1.current?.classList.remove(styles.rightAnimation)
    carouselContainerRef2.current?.classList.remove(styles.rightAnimation)
    carouselContainerRef3.current?.classList.remove(styles.rightAnimation)
    setTimeout(() => {
      carouselContainerRef1.current?.classList.add(styles.leftAnimation)
      carouselContainerRef2.current?.classList.add(styles.leftAnimation)
      carouselContainerRef3.current?.classList.add(styles.leftAnimation)
      appendNewDates('prev')
    })
  }

  useEffect(() => {
    setInitialDates()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daysToAppend])

  useEffect(() => {
    const { width } = resizeEvent
    let result = 3
    if (width > 991) {
      result = 9
    } else if (width < 992 && width > 767) {
      result = 7
    } else if (width < 768 && width > 479) {
      result = 5
    }
    setDaysToAppend(result)
  }, [resizeEvent])

  useGestures(swiperRef, {
    onSwipeLeft: handleNext,
    onSwipeRight: handlePrev,
  })

  return (
    <>
      {resizeEvent.width < 992 ? (
        <div className={styles.monthYear}>
          <div className={styles.monthYearWrap}>
            <div className={styles.todayText}></div>
            <div className={styles.monthYearWrapText}>{currentMonth}</div>
            <div className={styles.todayText} onClick={handleTodays}>
              {t('account.finance.date.range.option.today')}
            </div>
          </div>
        </div>
      ) : null}

      <div className={styles.JourneyCalendar}>
        <div className={styles.jc_container}>
          <div className={styles.JourneyCalendarWrapper}>
            <Row justify="space-between">
              <Col className={styles.jcLeftCol}>
                <div className={styles.journyCalenderColWrap}>
                  {resizeEvent.width > 991 ? (
                    <div className={styles.prevArrow} onClick={handlePrev}>
                      <LeftOutlined />
                    </div>
                  ) : null}
                  <div
                    className={`${styles.JourneyCalendarSlider}`}
                    ref={swiperRef}
                  >
                    <div
                      className={`${styles.JourneyCalendarSliderWrapper}`}
                      ref={carouselContainerRef1}
                    >
                      {dateArray?.previousArray?.map((item) => (
                        <div
                          key={item}
                          className={`${styles.journyCalenderDate} ${
                            styles.animation
                          } ${
                            dayjs(activeDate).format(dateFormat) === item
                              ? styles.activeDate
                              : null
                          }`}
                        >
                          <span
                            className={styles.journyCalenderDateWrap}
                            onClick={() => selectDateHandler(item)}
                          >
                            {dayjs(item).format('ddd D')}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div
                      className={`${styles.JourneyCalendarSliderWrapper}`}
                      ref={carouselContainerRef2}
                    >
                      {dateArray?.array?.map((item) => (
                        <div
                          key={item}
                          className={`${styles.journyCalenderDate} ${
                            styles.animation
                          } ${
                            dayjs(activeDate).format(dateFormat) === item
                              ? styles.activeDate
                              : null
                          }`}
                        >
                          <span
                            className={styles.journyCalenderDateWrap}
                            onClick={() => selectDateHandler(item)}
                          >
                            {dayjs(item).format('ddd D')}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div
                      className={`${styles.JourneyCalendarSliderWrapper}`}
                      ref={carouselContainerRef3}
                    >
                      {dateArray?.nextArray?.map((item) => (
                        <div
                          key={item}
                          className={`${styles.journyCalenderDate}  ${
                            dayjs(activeDate).format(dateFormat) === item
                              ? styles.activeDate
                              : null
                          }`}
                        >
                          <span
                            className={styles.journyCalenderDateWrap}
                            onClick={() => selectDateHandler(item)}
                          >
                            {dayjs(item).format('ddd D')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {resizeEvent.width > 991 ? (
                    <div className={styles.nextArrow} onClick={handleNext}>
                      <RightOutlined />
                    </div>
                  ) : null}
                </div>
              </Col>
              {resizeEvent.width > 991 ? (
                <Col className={styles.jcRightCol}>
                  <Button className={styles.todayButton} onClick={handleTodays}>
                    {t('account.finance.date.range.option.today')}
                  </Button>
                </Col>
              ) : null}
            </Row>
          </div>
        </div>
      </div>
    </>
  )
}

export default JourneyCalendar
