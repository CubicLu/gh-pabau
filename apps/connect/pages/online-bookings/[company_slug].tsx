import React, { useContext, useState } from 'react'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

import ServiceCategorySelector from '../../components/ServicesStep/ServiceCategorySelector'
import ServiceSelector from '../../components/ServicesStep/ServiceSelector'
import LocationSelector from '../../components/LocationStep/LocationSelector'
import BookingDetails from '../../components/BookingDetailsStep/BookingDetails'
import Payment from '../../components/payment/Payment'
import Booked from '../../components/bookingconform/booking'
import PatientInfo from '../../components/patientinformatioon/PatientInfo'
import EmployeeSelector from '../../components/EmployeeStep/EmployeeSelector'
import DateTimeSelector from '../../components/DateTimeStep/DateTimeSelector'
import styles from './index.module.less'
import moment from 'moment'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { useCreateAppointmentMutation } from '@pabau/graphql'

import { BookingData } from '../../types/booking'
import { SettingsContext } from '../../context/settings-context'

interface userData {
  firstname: string
  lastname: string
  type: string
  clinic: string
  docName: string
  docDescription: string
  date: string
  time: string
  charge: string
  address: string
  image: any
  online: boolean
  duration: number
  member: number
  services: number
  vouchers: number
}
const userData: userData = {
  firstname: '',
  lastname: '',
  type: '',
  clinic: '',
  docName: '',
  docDescription: '',
  date: '',
  time: '',
  charge: '',
  address: '',
  image: null,
  online: false,
  duration: 0,
  member: 1,
  services: 0,
  vouchers: 0,
}
export function Index() {
  // CRAP
  const [back, Setback] = useState(false)
  const [view, Setview] = useState(true)
  const [user, setuser] = useState<userData>(userData)

  // FIXED
  const [language, setLanguage] = useState('en')
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [selectedData, setSelectedData] = useState<BookingData>()
  const { t } = useTranslationI18()
  const settings = useContext(SettingsContext)

  const [createBooking] = useCreateAppointmentMutation({
    onCompleted(data) {},
    onError(err) {},
  })

  const rech = () => {
    setCurrentStep(currentStep + 1)
    Setback(true)
  }

  const goBackButton = () => {
    let buttonName = ''
    if (currentStep === 1) {
      buttonName = t('connect.onlinebooking.backButton.service')
    } else if (currentStep === 2) {
      buttonName = t('connect.onlinebooking.backButton.service')
    } else if (currentStep === 3) {
      buttonName = t('connect.onlinbooking.backButton.location')
    } else if (currentStep === 4) {
      buttonName = t('connect.onlinebooking.backButton.employe')
    } else if (currentStep === 5) {
      buttonName = t('connect.onlinebooking.backButton.choosedate')
    } else if (currentStep === 6) {
      buttonName = t('connect.onlinebooking.backButton.conformation')
    } else if (currentStep === 7) {
      buttonName = t('connect.onlinebooking.backButton.bookingdetaile')
    }

    return (
      currentStep > 0 &&
      currentStep <= 7 && (
        <div className={styles.backBut}>
          <span className={styles.arrowLeft}>
            <ArrowLeftOutlined
              onClick={() =>
                setCurrentStep(currentStep === 0 ? 0 : currentStep - 1)
              }
            />
          </span>
          <span className={styles.backName}>{buttonName}</span>
        </div>
      )
    )
  }

  const userinfo = (userdata) => {
    user.firstname = userdata.first
    user.lastname = userdata.last
    setuser(user)
  }

  return (
    <div className={styles.onlineBooking}>
      <Header
        currentStep={currentStep > 0 ? currentStep : 1}
        back={() => {
          setCurrentStep(currentStep - 1)
        }}
        visible={(back || !view) && currentStep <= 7}
      />

      <div className={styles.mainBody}>
        {goBackButton()}
        <div className={styles.slide}>
          {currentStep === 0 && (
            <>
              <ServiceCategorySelector
                onSelected={() => {
                  setCurrentStep(currentStep + 1)
                }}
              />
              <div className={styles.verification}>
                {t('connect.onlinebooking.first.description')}
                <span>
                  &nbsp;
                  <a href={'online-booking/045787498450'}>045787498450</a>
                </span>
              </div>
            </>
          )}
          {currentStep === 1 && (
            <div className={styles.slide1}>
              <ServiceSelector
                onSelected={() => {
                  setCurrentStep(currentStep + 1)
                }}
              />
            </div>
          )}
          {currentStep === 2 && (
            <LocationSelector
              onSelected={() => {
                setCurrentStep(currentStep + 1)
              }}
            />
          )}
          {currentStep === 3 && (
            <EmployeeSelector
              onSelected={() => {
                setCurrentStep(currentStep + 1)
              }}
            />
          )}
          {currentStep === 4 && (
            <DateTimeSelector
              onSelected={() => {
                setCurrentStep(currentStep + 1)
              }}
            />
          )}
          {currentStep === 5 && (
            <div>
              <BookingDetails
                changescreen={function () {
                  createBooking({
                    variables: {
                      user_id: selectedData.employee.ID,
                      company_id: settings.id,
                      location_id: selectedData.location.id,
                      service_id: 2691491,
                      contact_id: 22293092,
                      unique_id: '123',
                      start_date: selectedData.dateTime.format(
                        'YYYYMMDDHHmm00'
                      ),
                      end_date: moment(selectedData.dateTime)
                        .add(15, 'm')
                        .format('YYYYMMDDHHmm00'),
                      sent_sms: 0,
                      sent_email: 0,
                      sent_email_reminder: false,
                      sent_survey: 0,
                      issued_to: 22293092,
                    },
                  })
                  setCurrentStep(currentStep + 3)
                }}
                charge={user.charge}
                getinfo={userinfo}
                member={user.member}
                backToStep={(step: number) => {
                  setCurrentStep(step)
                }}
              />
            </div>
          )}
          {currentStep === 6 && (
            <div>
              <PatientInfo
                changescreen={rech}
                image={user.image}
                firstname={user.firstname}
                lastname={user.lastname}
                translation={t}
              />
            </div>
          )}
          {currentStep === 7 && (
            <div>
              <Payment
                changescreen={rech}
                type={user.type}
                translation={t}
                price={user.charge}
              />
            </div>
          )}
          {currentStep === 8 && (
            <div>
              <Booked
                address={user.address}
                type={user.type}
                doctor={user.docName}
                date={user.date}
                time={user.time}
                description={user.docDescription}
                translation={t}
                online={user.online}
                duration={user.duration}
              />
            </div>
          )}
          {currentStep === 9 && <div></div>}
        </div>
      </div>

      <Footer select={(value) => setLanguage(value)} />
    </div>
  )
}

export default Index
