import React, { FC } from 'react'
import { ClockCircleOutlined } from '@ant-design/icons'
import verifyLogo from '../../../../../libs/ui/src/assets/lottie/connect-verify.json'
import location from '../../../assets/images/connect/location.png'
import styles from './booking.module.less'
import { MyLottie, Button } from '@pabau/ui'
import { ReactComponent as Home } from '../../../../../libs/ui/src/assets/images/Home.svg'
import { ReactComponent as Laptop } from '../../../../../libs/ui/src/assets/images/laptop.svg'

/* eslint-disable-next-line */
export interface BookingProps {
  address: string
  type: string
  doctor: string
  date: string
  time: string
  description: string
  online: boolean
  duration: number
  translation: (val: string) => string
}

const Booked: FC<BookingProps> = ({
  address,
  type,
  doctor,
  date,
  time,
  description,
  online,
  duration,
  translation,
}) => {
  return (
    <div className={styles.bookingMainWrapper}>
      {online ? (
        <div>
          <div className={styles.bookingImg}>
            <MyLottie
              width="20%"
              height="auto"
              options={{
                animationData: verifyLogo,
                autoplay: true,
              }}
            />
            <h4>{translation('connect.onlinebooking.booked.title')}</h4>
            <p>{translation('connect.onlinebooking.booked.description')}</p>
          </div>

          <div className={styles.onlinechoice}>
            <Laptop />
            <span className={styles.onlinedetaile}>
              The team member will video call you Thu, 15th April at 17:00.
              Please check your appointment confirmation email for details on
              connecting to the online call.
            </span>
          </div>
          <div className={styles.onlinechoice}>
            <Home />
            <span className={styles.onlinedetaile}>
              Find a quiet place where you can talk about your concern.
            </span>
          </div>
          <div className={styles.customBoxService}>
            <h5>{translation('connect.onlinebooking.booked.service')}</h5>
            <div className={styles.appointment}>
              <h5>Video consultation ({type})</h5>
              <p>
                {duration}
                {translation('connect.onlinebooking.booked.min')}{' '}
                <ClockCircleOutlined />
              </p>
            </div>
            <Button className={styles.joinbtn} type={'primary'}>
              Join now
            </Button>
          </div>
          {/*<div>*/}
          {/*  <span>Service</span>*/}
          {/*  <span>Video consultation ({type})</span>*/}
          {/*  <span>*/}
          {/*    {duration}min*/}
          {/*    <ClockCircleOutlined />*/}
          {/*  </span>*/}
          {/*  <Button type={'primary'}>Join now</Button>*/}
          {/*</div>*/}
          <div className={styles.customBoxService}>
            <h5>{translation('connect.onlinebooking.booked.time')}</h5>
            <div className={styles.appointment}>
              <p>
                {date}, {time} (GMT)
              </p>
            </div>
            <div className={styles.btnCal}>
              <span>
                {translation('connect.onlinebooking.booked.googlecalender')}
              </span>
              <span>
                {translation('connect.onlinebooking.booked.icalcalender')}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.bookingImg}>
            <MyLottie
              width="20%"
              height="auto"
              options={{
                animationData: verifyLogo,
                autoplay: true,
              }}
            />
            <h4>{translation('connect.onlinebooking.booked.title')}</h4>
            <p>{translation('connect.onlinebooking.booked.description')}</p>
          </div>

          <div className={styles.bookingAdd}>
            <h5>{translation('connect.onlinebooking.booked.location')}</h5>
            <div className={styles.location}>
              <img src={location} alt={'not_img'} />
              <div className={styles.locText}>
                <h6>{translation('connect.onlinebooking.booked.skin')}</h6>
                <p>{address}</p>
                <p> {translation('connect.onlinebooking.booked.emailid')}</p>
              </div>
            </div>
          </div>
          <div className={styles.customBoxService}>
            <h5>{translation('connect.onlinebooking.booked.service')}</h5>
            <div className={styles.appointment}>
              <h5>{type} (Offline Appointment)</h5>
              <p>
                {duration}
                {translation('connect.onlinebooking.booked.min')}{' '}
                <ClockCircleOutlined />
              </p>
            </div>
          </div>
          <div className={styles.customBoxService}>
            <h5>{translation('connect.onlinebooking.booked.doctore')}</h5>
            <div className={styles.appointment}>
              <h5>{doctor}</h5>
              <p>{description}</p>
            </div>
          </div>
          <div className={styles.customBoxService}>
            <h5>{translation('connect.onlinebooking.booked.time')}</h5>
            <div className={styles.appointment}>
              <p>
                {date}, {time} (GMT)
              </p>
            </div>
            <div className={styles.btnCal}>
              <span>
                {translation('connect.onlinebooking.booked.googlecalender')}
              </span>
              <span>
                {translation('connect.onlinebooking.booked.icalcalender')}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
export default Booked
