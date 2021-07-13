import React, { useState } from 'react'
import { Header } from '../../components/header'
import { Footer } from '../../components/footer'

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
import {
  useCompanyServicesCategorisedQuery,
  useCreateAppointmentMutation,
  useOnlineBookableLocationsQuery,
} from '@pabau/graphql'
import { Image } from 'antd'

import useServices from '../../hooks/useServices'
import { BookingData } from '../../types/booking'

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
  const [ispro, setispro] = useState(false)
  const [back, Setback] = useState(false)
  const [view, Setview] = useState(true)
  const [indicator, setindicator] = useState(false)
  const [user, setuser] = useState<userData>(userData)
  const [tempprice, settempprice] = useState('')
  const [editdate, seteditdate] = useState({ time: false, date: false })
  const [promoPrice, setpromoPrice] = useState<number>(0)
  const [percentage, setpercentage] = useState<number>(0)
  const [lang, setlang] = useState('en')
  const { t } = useTranslationI18()

  // FIXED
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [selectedData, setSelectedData] = useState<BookingData>({})

  const {
    loading: loadingServices,
    error: errorServices,
    data: servicesCategorised,
  } = useCompanyServicesCategorisedQuery({
    variables: {
      company_id: 8021,
    },
  })

  const {
    loading: loadingLocations,
    error: errorLocations,
    data: locationsResult,
  } = useOnlineBookableLocationsQuery({
    variables: {
      company_id: 8021,
    },
  })

  const [createBooking] = useCreateAppointmentMutation({
    onCompleted(data) {},
    onError(err) {},
  })

  if (errorServices || errorLocations) return <div>Error!</div>
  if (loadingServices || loadingLocations) return <div>Loading...</div>
  const masterCategories = servicesCategorised.serviceMasterCategories.map(
    (row) => {
      return {
        id: row.id,
        name: row.name,
        icon: row.image ? (
          <Image
            preview={false}
            height={'40px'}
            width={'40px'}
            src={'https://crm.pabau.com' + row.image}
            alt={row.name}
          />
        ) : null,
        categories: row.ServiceCategory.map((cat) => {
          return {
            id: cat.id,
            name: cat.name,
            icon: row.image ? (
              <Image
                preview={false}
                height={'40px'}
                width={'40px'}
                src={'https://crm.pabau.com' + row.image}
                alt={row.name}
              />
            ) : null,
            services: cat.CompanyService.map((service) => {
              return {
                review: 1,
                rating: 5,
                ...service,
              }
            }),
          }
        }),
      }
    }
  )

  const translation = (key) => {
    return t(key, { lng: lang.toString().slice(0, 2).toLowerCase() })
  }
  const rech = () => {
    setCurrentStep(currentStep + 1)
    Setback(true)
  }

  const goBackButton = () => {
    let buttonName = ''
    if (currentStep === 1) {
      buttonName = t('connect.onlinebooking.backButton.service')
    } else if (currentStep === 2) {
      buttonName = translation('connect.onlinebooking.backButton.service')
    } else if (currentStep === 3) {
      buttonName = translation('connect.onlinbooking.backButton.location')
    } else if (currentStep === 4) {
      buttonName = translation('connect.onlinebooking.backButton.employe')
    } else if (currentStep === 5) {
      buttonName = translation('connect.onlinebooking.backButton.choosedate')
    } else if (currentStep === 6) {
      buttonName = translation('connect.onlinebooking.backButton.conformation')
    } else if (currentStep === 7) {
      buttonName = translation(
        'connect.onlinebooking.backButton.bookingdetaile'
      )
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

  const classname = () => {
    if (currentStep === 1) {
      return styles.slide1
    } else if (currentStep === 2) {
      return styles.slide2
    } else if (currentStep === 3) {
      return styles.slide3
    } else if (currentStep === 4) {
      return styles.slide4
    } else if (currentStep === 5) {
      return styles.slide5
    } else if (currentStep === 6) {
      return styles.slide6
    } else if (currentStep === 7) {
      return styles.slide7
    } else if (currentStep === 8) {
      return styles.slide8
    } else if (currentStep === 9) {
      return styles.slide9
    }
  }

  const findServiceByIDs = (serviceIDs: number[]) => {
    const services = []
    for (const mcat of masterCategories) {
      if (mcat.categories) {
        for (const cat of mcat.categories) {
          if (cat.services) {
            for (const s of cat.services) {
              if (serviceIDs.includes(s.id)) {
                services.push(s)
              }
            }
          }
        }
      }
    }
    return services
  }

  return (
    <div className={styles.onlineBooking}>
      <Header
        currentStep={currentStep > 0 ? currentStep : 1}
        translation={translation}
        back={() => {
          setCurrentStep(currentStep - 1)
        }}
        visible={(back || !view) && currentStep <= 7}
      />

      <div className={styles.mainBody}>
        {goBackButton()}
        <div className={classname()}>
          {currentStep === 0 && (
            <div>
              <ServiceCategorySelector
                items={masterCategories}
                onSelected={(id) => {
                  setSelectedData({
                    ...selectedData,
                    categoryID: id,
                    masterCategoryID: 5639,
                  })
                  setCurrentStep(currentStep + 1)
                }}
              />
              <div className={styles.verification}>
                {translation('connect.onlinebooking.first.description')}
                <span>
                  &nbsp;
                  <a href={'online-booking/045787498450'}>045787498450</a>
                </span>
              </div>
            </div>
          )}
          {currentStep === 1 && (
            <div className={styles.slide1}>
              <ServiceSelector
                items={masterCategories}
                catID={selectedData.categoryID}
                mCatID={selectedData.masterCategoryID}
                translation={translation}
                onStepCompleted={(services: number[]) => {
                  const slist = findServiceByIDs(services)
                  setSelectedData({
                    ...selectedData,
                    serviceID: services,
                    services: slist,
                  })
                  setCurrentStep(currentStep + 1)
                }}
              />
            </div>
          )}
          {currentStep === 2 && (
            <LocationSelector
              items={locationsResult.companyBranches}
              onLocationSelected={(locationID) => {
                const location = locationsResult.companyBranches.find(
                  (loc) => loc.id === locationID
                )
                setSelectedData({
                  ...selectedData,
                  locationID: locationID,
                  location: location,
                })
                setCurrentStep(currentStep + 1)
              }}
            />
          )}
          {currentStep === 3 && (
            <EmployeeSelector
              onEmployeeSelected={(employeeID) => {
                setSelectedData({
                  ...selectedData,
                  employeeID: employeeID,
                })
                setCurrentStep(currentStep + 1)
              }}
            />
          )}
          {currentStep === 4 && (
            <DateTimeSelector
              employeeID={selectedData.employeeID}
              onSelectedTimeslot={(dateTime) => {
                setSelectedData({
                  ...selectedData,
                  dateTime: dateTime,
                })
                setCurrentStep(currentStep + 1)
              }}
            />
          )}
          {currentStep === 5 && (
            <div>
              <BookingDetails
                bookingData={selectedData}
                changescreen={function () {
                  createBooking({
                    variables: {
                      UID: 71638,
                      company_id: 8021,
                      location_id: selectedData.locationID,
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
                translation={translation}
                member={user.member}
                gotofirst={() => {
                  setCurrentStep(1)
                  // Setback(false)
                  Setview(true)
                  setindicator(false)
                  setispro(true)
                }}
                gotoclinic={() => {
                  setCurrentStep(2)
                  Setview(true)
                  setindicator(true)
                }}
                gotoemploy={() => {
                  setCurrentStep(3)
                  Setview(true)
                  setindicator(true)
                }}
                gotodate={() => {
                  setCurrentStep(4)
                  seteditdate({ date: true, time: false })
                  Setview(true)
                  setindicator(true)
                }}
                gotoedit={() => {
                  setCurrentStep(4)
                  seteditdate({ date: true, time: true })
                  Setview(true)
                  setindicator(true)
                }}
                getprice={(price, percentage) => {
                  setpromoPrice(price)
                  setpercentage(percentage)
                  console.log(user.charge)
                  settempprice(user.charge)
                  if (user.type === 'Laser') {
                    user.charge = String((price * (100 - percentage)) / 100)
                  } else {
                    user.charge = String(
                      ((Number(user.charge) + price) * (100 - percentage)) / 100
                    )
                  }

                  setuser(user)
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
                translation={translation}
              />
            </div>
          )}
          {currentStep === 7 && (
            <div>
              <Payment
                changescreen={rech}
                type={user.type}
                translation={translation}
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
                translation={translation}
                online={user.online}
                duration={user.duration}
              />
            </div>
          )}
          {currentStep === 9 && <div></div>}
        </div>
      </div>

      <Footer select={(value) => setlang(value)} translation={translation} />
    </div>
  )
}

export default Index
