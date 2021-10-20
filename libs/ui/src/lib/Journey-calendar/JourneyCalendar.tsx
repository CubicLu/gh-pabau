import React, { FC, useState, useEffect, useRef } from 'react'
import { Carousel, Row, Col } from 'antd'
// import { useTranslation } from 'react-i18next'
import styles from './JourneyCalendar.module.less'
import arrow from '../journey-calendar/arrow.svg'
import moment from 'moment'
import { Button } from '@pabau/ui'
import { CarouselRef } from 'antd/lib/carousel'

interface CalendarState {
  activeDate: string
  array: string[]
}

const dateFormat = 'MMM D'

export const JourneyCalendar: FC = () => {
  // const { t } = useTranslation('common')
  const carousel: React.MutableRefObject<CarouselRef | null> = React.createRef()
  const width = window.innerWidth
  const [date, setDate] = useState(2)
  const slidesOnLeftRight = 4

  const [dateArray, setDataArray] = useState<CalendarState>({
    activeDate: moment().format(dateFormat),
    array: [],
  })

  const getDaysArray = (start: Date, end: Date) => {
    const arr: Array<string> = []
    const dt = new Date(start)
    for (arr; dt <= end; dt.setDate(dt.getDate() + 1)) {
      arr.push(moment(dt).format(dateFormat))
    }
    return arr
  }

  const setInitialDates = () => {
    const start = moment().subtract(slidesOnLeftRight, 'days').toDate()
    const end = moment().add(slidesOnLeftRight, 'days').toDate()
    const newArray = getDaysArray(start, end)

    setDataArray({
      ...dateArray,
      array: newArray,
    })
  }

  const appendNewDates = (direction: 'next' | 'prev') => {
    // const previousDate1 = moment(currentDate)
    //   .subtract(1, 'days')
    //   .format(dateFormat)
    // const previousDate2 = moment(currentDate)
    //   .subtract(2, 'days')
    //   .format(dateFormat)
    // const previousDate3 = moment(currentDate)
    //   .subtract(3, 'days')
    //   .format(dateFormat)
    // const previousDate4 = moment(currentDate)
    //   .subtract(4, 'days')
    //   .format(dateFormat)
    // const nextDate1 = moment(currentDate).add(1, 'days').format(dateFormat)
    // const nextDate2 = moment(currentDate).add(2, 'days').format(dateFormat)
    // const nextDate3 = moment(currentDate).add(3, 'days').format(dateFormat)
    // const nextDate4 = moment(currentDate).add(4, 'days').format(dateFormat)
    // const newArray: any = [
    //   previousDate4,
    //   previousDate3,
    //   previousDate2,
    //   previousDate1,
    //   currentDate,
    //   nextDate1,
    //   nextDate2,
    //   nextDate3,
    //   nextDate4,
    // ]
    // if direction is of next add next 13 days from last date of array
    // else add previous 13 days from first date of array
    // in order to keep building new dates
    const start =
      direction === 'prev'
        ? moment(dateArray.array[0], dateFormat).subtract(9, 'days').toDate()
        : moment(dateArray.array[dateArray.array.length - 1], dateFormat)
            .add(1, 'day')
            .toDate()
    const end =
      direction === 'prev'
        ? moment(dateArray.array[0], dateFormat).subtract(1, 'day').toDate()
        : moment(dateArray.array[dateArray.array.length - 1], dateFormat)
            .add(9, 'days')
            .toDate()
    const newArray = getDaysArray(start, end)
    const finalArray =
      direction === 'prev'
        ? [...newArray, ...dateArray.array]
        : [...dateArray.array, ...newArray]
    setDataArray({
      ...dateArray,
      array: newArray,
    })
  }

  useEffect(() => {
    setInitialDates()
  }, [])

  const selectDateHandler = (date) => {
    setDataArray({
      ...dateArray,
      activeDate: date,
    })
  }

  const handleNext = () => {
    appendNewDates('next')
  }

  const handlePrev = () => {
    appendNewDates('prev')
  }

  const handleSwipe = (swipeDirection: 'left' | 'right') => {
    console.log('swipeDirection', swipeDirection)
    if (swipeDirection === 'left') {
      handleNext()
    } else {
      handlePrev()
    }
  }

  const slidesToShow = 9

  return (
    <>
      {width < 992 ? (
        <div className={styles.monthYear}>
          <div className={styles.monthYearWrap}>
            <div className={styles.todayText}></div>
            <div className={styles.monthYearWrapText}>October 2021</div>
            <div className={styles.todayText}>Today</div>
          </div>
        </div>
      ) : null}

      <div className={styles.JourneyCalendar}>
        <div className={styles.jc_container}>
          <div className={styles.JourneyCalendarWrapper}>
            <Row justify="space-between" gutter={16}>
              <Col className={styles.jcLeftCol}>
                <div className={styles.journyCalenderColWrap}>
                  {width > 991 ? (
                    <div className={styles.prevArrow} onClick={handlePrev}>
                      <img src={arrow} alt="arrow" />
                    </div>
                  ) : null}
                  <div className={styles.JourneyCalendarSlider}>
                    {/* <Carousel
                      ref={carousel}
                      dots={false}
                      arrows={true}
                      infinite={false}
                      speed={500}
                      // initialSlide={13}
                      slidesToShow={slidesToShow}
                      // slidesToScroll={slidesToShow}
                      swipeToSlide={false}
                      // centerMode={true}
                      onSwipe={handleSwipe}
                      responsive={[
                        {
                          breakpoint: 769,
                          settings: {
                            slidesToShow: 7,
                            // slidesToScroll: 7,
                          },
                        },
                        {
                          breakpoint: 650,
                          settings: {
                            slidesToShow: 3,
                            // slidesToScroll: 3,
                          },
                        },
                        {
                          breakpoint: 480,
                          settings: {
                            slidesToShow: 2,
                            // slidesToScroll: 2,
                          },
                        },
                      ]}
                    > */}

                    {dateArray?.array?.map((item, index) => (
                      <div
                        key={item}
                        className={`${styles.journyCalenderDate} ${
                          styles.animation
                        } ${
                          dateArray.activeDate === item
                            ? styles.activeDate
                            : null
                        }`}
                      >
                        <span
                          className={styles.journyCalenderDateWrap}
                          onClick={() => selectDateHandler(item)}
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                    {/* </Carousel> */}
                  </div>
                  {width > 991 ? (
                    <div className={styles.nextArrow} onClick={handleNext}>
                      <img src={arrow} alt="arrow" />
                    </div>
                  ) : null}
                </div>
              </Col>
              {width > 991 ? (
                <Col className={styles.jcRightCol}>
                  <Button className={styles.todayButton}>Today</Button>
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
