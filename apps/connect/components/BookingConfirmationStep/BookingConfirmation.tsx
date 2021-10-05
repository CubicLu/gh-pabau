import React, { FC, useContext } from 'react'
import { ClockCircleOutlined } from '@ant-design/icons'
import verifyLogo from '../../../web/assets/lottie/connect-verify.json'
import location from '../../../web/assets/images/connect/location.png'
import styles from './BookingConfirmation.module.less'
import { MyLottie, Button } from '@pabau/ui'
import { ReactComponent as Home } from '../../../web/assets/images/Home.svg'
import { ReactComponent as Laptop } from '../../../web/assets/images/laptop.svg'
import { SettingsContext } from '../../context/settings-context'
import { useSelectedDataStore } from '../../store/selectedData'
import { useTranslationI18 } from '../../hooks/useTranslationI18'

export interface P {}

const BookingConfirmation: FC<P> = () => {
  const settings = useContext(SettingsContext)
  const [selectedData] = useSelectedDataStore()
  const { t } = useTranslationI18()

  return (
    <div className={styles.bookingMainWrapper}>
      {false ? (
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
            <h4>{t('connect.onlinebooking.booked.title')}</h4>
            <p>{t('connect.onlinebooking.booked.description')}</p>
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
            <h5>{t('connect.onlinebooking.booked.service')}</h5>
            {selectedData.services.map((s) => (
              <div className={styles.appointment}>
                <h5>{s.name} (Video consultation)</h5>
                <p>
                  {s.duration}
                  {t('connect.onlinebooking.booked.min')}{' '}
                  <ClockCircleOutlined />
                </p>
              </div>
            ))}
            <Button className={styles.joinbtn} type={'primary'}>
              Join now
            </Button>
          </div>
          <div className={styles.customBoxService}>
            <h5>{t('connect.onlinebooking.booked.time')}</h5>
            <div className={styles.appointment}>
              <p>
                {selectedData.dateTime.format('dddd, Do MMMM at HH:mm')} (GMT)
              </p>
            </div>
            <div className={styles.btnCal}>
              <span>{t('connect.onlinebooking.booked.googlecalender')}</span>
              <span>{t('connect.onlinebooking.booked.icalcalender')}</span>
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
            <h4>{t('connect.onlinebooking.booked.title')}</h4>
            <p>{t('connect.onlinebooking.booked.description')}</p>
          </div>

          <div className={styles.bookingAdd}>
            <h5>{t('connect.onlinebooking.booked.location')}</h5>
            <div className={styles.location}>
              <img src={location} alt={'not_img'} />
              <div className={styles.locText}>
                <h6>{t('connect.onlinebooking.booked.skin')}</h6>
                <p>{selectedData.location.address}</p>
                <p>{selectedData.location.email}</p>
              </div>
            </div>
          </div>
          <div className={styles.customBoxService}>
            <h5>{t('connect.onlinebooking.booked.service')}</h5>
            {selectedData.services.map((s) => (
              <div className={styles.appointment}>
                <h5>
                  {s.name}{' '}
                  {s.online_only_service === 1
                    ? '(Offline Appointment)'
                    : '(Video consultation)'}
                </h5>
                <p>
                  {s.duration}
                  {t('connect.onlinebooking.booked.min')}{' '}
                  <ClockCircleOutlined />
                </p>
              </div>
            ))}
          </div>
          <div className={styles.customBoxService}>
            <h5>{t('connect.onlinebooking.booked.doctore')}</h5>
            <div className={styles.appointment}>
              <h5>{selectedData.employee.Public_User.full_name}</h5>
              <p>{'What is doctor description'}</p>
            </div>
          </div>
          <div className={styles.customBoxService}>
            <h5>{t('connect.onlinebooking.booked.time')}</h5>
            <div className={styles.appointment}>
              <p>
                {selectedData.dateTime.format('dddd, Do MMMM at HH:mm')} (GMT)
              </p>
            </div>
            <div className={styles.btnCal}>
              <span>{t('connect.onlinebooking.booked.googlecalender')}</span>
              <span>{t('connect.onlinebooking.booked.icalcalender')}</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
export default BookingConfirmation
