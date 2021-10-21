import React, { FC, useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'
import styles from './JourneyCalendar.module.less'
import arrow from '../journey-calendar/arrow.svg'
import moment from 'moment'
import { Button } from '@pabau/ui'
import { useSwipeable } from 'react-swipeable'
import { useWindowSize } from 'react-use'

interface CalendarState {
  array: string[]
  previousArray: string[]
  nextArray: string[]
}

export interface Props {
  activeDate: string
  setActiveDate: (date: string | undefined) => void
}

const dateFormat = 'MMM D YYYY'

export const JourneyCalendar: FC<Props> = ({ activeDate, setActiveDate }) => {
  const { t } = useTranslation('common')
  const carouselContainerRef1 = React.useRef<HTMLDivElement>(null)
  const carouselContainerRef2 = React.useRef<HTMLDivElement>(null)
  const carouselContainerRef3 = React.useRef<HTMLDivElement>(null)
  const resizeEvent = useWindowSize()
  const [currentMonth, setCurrentMonth] = useState(
    moment(new Date()).format('MMMM YYYY')
  )
  const [dateArray, setDataArray] = useState<CalendarState>({
    array: [],
    previousArray: [],
    nextArray: [],
  })

  const [daysToAppend, setDaysToAppend] = useState(9)

  const getDaysArray = (start: Date, end: Date) => {
    const arr: Array<string> = []
    const dt = new Date(start)
    for (arr; dt <= end; dt.setDate(dt.getDate() + 1)) {
      arr.push(moment(dt).format(dateFormat))
    }
    return arr
  }

  const setInitialDates = (startDate = null, endDate = null) => {
    const slidesOnLeftRight = Math.floor(daysToAppend / 2)
    const start =
      startDate || moment().subtract(slidesOnLeftRight, 'days').toDate()
    const end = endDate || moment().add(slidesOnLeftRight, 'days').toDate()
    const newArray = getDaysArray(start, end)
    const nextAndPreviousArray = setNextAndPreviousArray(start, end)
    setActiveDate(moment(new Date()).format('MMM D YYYY'))
    setCurrentMonth(moment(new Date()).format('MMMM YYYY'))
    setDataArray({
      ...dateArray,
      array: [...newArray],
      previousArray: nextAndPreviousArray.previousArray,
      nextArray: nextAndPreviousArray.nextArray,
    })
  }

  const setNextAndPreviousArray = (start, end) => {
    const previousArrayStartDate = moment(start, dateFormat)
      .subtract(daysToAppend, 'days')
      .toDate()
    const previousArrayEndDate = moment(start, dateFormat)
      .subtract(1, 'days')
      .toDate()
    const previousArray = getDaysArray(
      previousArrayStartDate,
      previousArrayEndDate
    )
    const nextArrayStartDate = moment(end, dateFormat).add(1, 'days').toDate()
    const nextArrayEndDate = moment(end, dateFormat)
      .add(daysToAppend, 'days')
      .toDate()
    const nextArray = getDaysArray(nextArrayStartDate, nextArrayEndDate)
    return { previousArray, nextArray }
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  const handleTodays = () => {
    setInitialDates()
  }

  const appendNewDates = (direction: 'next' | 'prev') => {
    const start =
      direction === 'prev'
        ? moment(dateArray.array[0], dateFormat)
            .subtract(daysToAppend, 'days')
            .toDate()
        : moment(dateArray.array[dateArray.array.length - 1], dateFormat)
            .add(1, 'day')
            .toDate()
    const end =
      direction === 'prev'
        ? moment(dateArray.array[0], dateFormat).subtract(1, 'day').toDate()
        : moment(dateArray.array[dateArray.array.length - 1], dateFormat)
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
    setActiveDate(date)
    setDataArray({ ...dateArray })
    setCurrentMonth(moment(date).format('MMMM YYYY'))
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
  }, [])

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
            <Row justify="space-between" gutter={16}>
              <Col className={styles.jcLeftCol}>
                <div className={styles.journyCalenderColWrap}>
                  {resizeEvent.width > 991 ? (
                    <div className={styles.prevArrow} onClick={handlePrev}>
                      <img src={arrow} alt="arrow" />
                    </div>
                  ) : null}
                  <div
                    className={`${styles.JourneyCalendarSlider}`}
                    {...handlers}
                  >
                    <div
                      className={`${styles.JourneyCalendarSliderWrapper}`}
                      ref={carouselContainerRef1}
                    >
                      {dateArray?.previousArray?.map((item, index) => (
                        <div
                          key={item}
                          className={`${styles.journyCalenderDate} ${
                            styles.animation
                          } ${activeDate === item ? styles.activeDate : null}`}
                        >
                          <span
                            className={styles.journyCalenderDateWrap}
                            onClick={() => selectDateHandler(item)}
                          >
                            {moment(item).format('ddd D')}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div
                      className={`${styles.JourneyCalendarSliderWrapper}`}
                      ref={carouselContainerRef2}
                    >
                      {dateArray?.array?.map((item, index) => (
                        <div
                          key={index}
                          className={`${styles.journyCalenderDate} ${
                            styles.animation
                          } ${activeDate === item ? styles.activeDate : null}`}
                        >
                          <span
                            className={styles.journyCalenderDateWrap}
                            onClick={() => selectDateHandler(item)}
                          >
                            {moment(item).format('ddd D')}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div
                      className={`${styles.JourneyCalendarSliderWrapper}`}
                      ref={carouselContainerRef3}
                    >
                      {dateArray?.nextArray?.map((item, index) => (
                        <div
                          key={item}
                          className={`${styles.journyCalenderDate}  ${
                            activeDate === item ? styles.activeDate : null
                          }`}
                        >
                          <span
                            className={styles.journyCalenderDateWrap}
                            onClick={() => selectDateHandler(item)}
                          >
                            {moment(item).format('ddd D')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {resizeEvent.width > 991 ? (
                    <div className={styles.nextArrow} onClick={handleNext}>
                      <img src={arrow} alt="arrow" />
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
