import React, { FC, useState } from 'react'
import { Carousel, Row, Col } from 'antd'
// import { useTranslation } from 'react-i18next'
import styles from './JourneyCalendar.module.less'
import arrow from '../journey-calendar/arrow.svg'
// import Button from '../../../../libs/ui/src/lib/button/Button'
import { Button } from '@pabau/ui'

export const JourneyCalendar: FC = () => {
  // const { t } = useTranslation('common')
  const carousel: any = React.createRef()
  const width = window.innerWidth
  const [date, setDate] = useState(2)
  console.log(date)
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
                    <div
                      className={styles.prevArrow}
                      onClick={() => carousel.current?.prev()}
                    >
                      <img src={arrow} alt="arrow" />
                    </div>
                  ) : null}
                  <div className={styles.JourneyCalendarSlider}>
                    <Carousel
                      ref={carousel}
                      dots={false}
                      arrows={true}
                      infinite={true}
                      speed={500}
                      slidesToShow={
                        width > 991 ? 9 : width > 767 ? 7 : width > 650 ? 3 : 2
                      }
                      slidesToScroll={1}
                      swipeToSlide={true}
                      // focusOnSelect={true}
                      // draggable={true}
                    >
                      <div
                        className={`${styles.journyCalenderDate} ${
                          date === 29 ? styles.activeDate : null
                        }`}
                      >
                        <span
                          className={styles.journyCalenderDateWrap}
                          onClick={() => setDate(29)}
                        >
                          Sun 29
                        </span>
                      </div>
                      <div
                        className={`${styles.journyCalenderDate} ${
                          date === 30 ? styles.activeDate : null
                        }`}
                      >
                        <span
                          className={styles.journyCalenderDateWrap}
                          onClick={() => setDate(30)}
                        >
                          Mon 30
                        </span>
                      </div>
                      <div
                        className={`${styles.journyCalenderDate} ${
                          date === 1 ? styles.activeDate : null
                        }`}
                      >
                        <span
                          className={styles.journyCalenderDateWrap}
                          onClick={() => setDate(1)}
                        >
                          Tue 1
                        </span>
                      </div>
                      <div
                        className={`${styles.journyCalenderDate} ${
                          date === 2 ? styles.activeDate : null
                        }`}
                      >
                        <span
                          className={styles.journyCalenderDateWrap}
                          onClick={() => setDate(2)}
                        >
                          Wed 2
                        </span>
                      </div>
                      <div
                        className={`${styles.journyCalenderDate} ${
                          date === 3 ? styles.activeDate : null
                        }`}
                      >
                        <span
                          className={styles.journyCalenderDateWrap}
                          onClick={() => setDate(3)}
                        >
                          Thu 3
                        </span>
                      </div>
                      <div
                        className={`${styles.journyCalenderDate} ${
                          date === 4 ? styles.activeDate : null
                        }`}
                      >
                        <span
                          className={styles.journyCalenderDateWrap}
                          onClick={() => setDate(4)}
                        >
                          Fri 4
                        </span>
                      </div>
                      <div
                        className={`${styles.journyCalenderDate} ${
                          date === 5 ? styles.activeDate : null
                        }`}
                      >
                        <span
                          className={styles.journyCalenderDateWrap}
                          onClick={() => setDate(5)}
                        >
                          Sat 5
                        </span>
                      </div>
                      <div
                        className={`${styles.journyCalenderDate} ${
                          date === 6 ? styles.activeDate : null
                        }`}
                      >
                        <span
                          className={styles.journyCalenderDateWrap}
                          onClick={() => setDate(6)}
                        >
                          Sun 6
                        </span>
                      </div>
                      <div
                        className={`${styles.journyCalenderDate} ${
                          date === 7 ? styles.activeDate : null
                        }`}
                      >
                        <span
                          className={styles.journyCalenderDateWrap}
                          onClick={() => setDate(7)}
                        >
                          Sun 7
                        </span>
                      </div>
                      <div
                        className={`${styles.journyCalenderDate} ${
                          date === 8 ? styles.activeDate : null
                        }`}
                      >
                        <span
                          className={styles.journyCalenderDateWrap}
                          onClick={() => setDate(8)}
                        >
                          Sun 8
                        </span>
                      </div>
                      <div
                        className={`${styles.journyCalenderDate} ${
                          date === 12 ? styles.activeDate : null
                        }`}
                      >
                        <span
                          className={styles.journyCalenderDateWrap}
                          onClick={() => setDate(12)}
                        >
                          Sun 12
                        </span>
                      </div>
                      <div
                        className={`${styles.journyCalenderDate} ${
                          date === 15 ? styles.activeDate : null
                        }`}
                      >
                        <span
                          className={styles.journyCalenderDateWrap}
                          onClick={() => setDate(15)}
                        >
                          Sun 15
                        </span>
                      </div>
                    </Carousel>
                  </div>
                  {width > 991 ? (
                    <div
                      className={styles.nextArrow}
                      onClick={() => carousel.current?.next()}
                    >
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
