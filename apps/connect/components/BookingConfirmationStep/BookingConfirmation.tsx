import React, { FC, useContext } from 'react'
import { ClockCircleOutlined } from '@ant-design/icons'
import verifyLogo from '../../../../libs/ui/src/assets/lottie/connect-verify.json'
import location from '../../assets/images/location.png'
import styles from './BookingConfirmation.module.less'
import { MyLottie } from '@pabau/ui'
import { SettingsContext } from '../../context/settings-context'
import { useSelectedDataStore } from '../../store/selectedData'
import { useTranslationI18 } from '../../hooks/useTranslationI18'

const BookingConfirmation: FC = () => {
  const settings = useContext(SettingsContext)
  const { selectedData } = useSelectedDataStore()
  const { t } = useTranslationI18()

  return (
    <div className={styles.bookingMainWrapper}>
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
            <h6>{settings.details.company_name}</h6>
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
              {t('connect.onlinebooking.booked.min')} <ClockCircleOutlined />
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
          <p>{selectedData.dateTime.format('dddd, Do MMMM at HH:mm')} (GMT)</p>
        </div>
        <div className={styles.btnCal}>
          <span>{t('connect.onlinebooking.booked.googlecalender')}</span>
          <span>{t('connect.onlinebooking.booked.icalcalender')}</span>
        </div>
      </div>
    </div>
  )
}
export default BookingConfirmation
