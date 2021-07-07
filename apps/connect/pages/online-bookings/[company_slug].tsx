import React, { useState } from 'react'
import { Header } from '../../components/header'
import { Footer } from '../../components/footer'

import ServiceCategorySelector from '../../components/ServicesStep/ServiceCategorySelector'
import ServiceSelector from '../../components/ServicesStep/ServiceSelector'
import LocationSelector from '../../components/LocationStep/LocationSelector'
import BookingDatail from '../../components/bookingdetails/Bookingdetail'
import moment from 'moment'
import Payment from '../../components/payment/Payment'
import Booked from '../../components/bookingconform/booking'
import PatientInfo from '../../components/patientinformatioon/PatientInfo'
import EmployeeSelector from '../../components/EmployeeStep/EmployeeSelector'
import DateTime from '../../components/dateTime/DateTime'
import { defaultItems } from '../../../web/mocks/connect/onlineBooking'
import styles from './index.module.less'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import {
  useCompanyServicesCategorisedQuery,
  useOnlineBookableLocationsQuery,
} from '@pabau/graphql'
import { Image } from 'antd'

import useServices from '../../hooks/useServices'

/* eslint-disable-next-line */
export interface OnlineBookingProps {}

interface BookingData {
  masterCategoryID?: number
  categoryID?: number
  serviceID?: number[]
  employeeID?: number
  locationID?: number
}

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
export function Index(props: OnlineBookingProps) {
  // CRAP
  const [seleData, SetselData] = useState(defaultItems.slice(0, 4))
  const [ispro, setispro] = useState(false)
  const [back, Setback] = useState(false)
  const [view, Setview] = useState(true)
  const [indicator, setindicator] = useState(false)
  const [tempT, settempT] = useState('')
  const [user, setuser] = useState<userData>(userData)
  const [datetime, setDateTime] = useState<EmployData>()
  const [date, setdate] = useState()
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

  const gettime = (tm) => {
    if (tm < 9) {
      return `0${tm}:00 - 0${tm + 1}:00`
    } else if (tm === 9) {
      return `0${tm}:00 - ${tm + 1}:00`
    } else if (tm > 9) {
      return `${tm}:00 - ${tm + 1}:00`
    }
  }
  const slot = (slotData) => {
    const day = moment(slotData.date).format('DD')
    const month = moment(slotData.date).format('MMMM')
    const word = moment(slotData.date).format('dddd')
    user.docDescription = slotData.description
    user.docName = slotData.name
    user.date = `${word}, ${day}th ${month}`
    user.time = gettime(slotData.time)
    user.image = slotData.image
    console.log(userData)
    setuser(user)
    setdate(slotData.date)
    settempT(slotData.time)
    console.log(user)
  }

  const backbutton = () => {
    if (currentStep === 1) {
      SetselData([...defaultItems.slice(0, 4)])
      Setback(false)
      Setview(true)
      setCurrentStep(0)
      setindicator(false)
    }
    if (currentStep === 2) {
      if (indicator) {
        setindicator(false)
        setispro(false)
      } else {
        setCurrentStep(currentStep - 1)
        SetselData([...defaultItems.slice(0, 4)])
        Setback(false)
        setCurrentStep(0)
        Setview(true)
        setispro(false)
      }
    }
    if (currentStep === 3) {
      setCurrentStep(currentStep - 1)
      SetselData([...defaultItems.slice(0, 4)])
      setindicator(true)
      Setview(true)
    }
    if (currentStep === 4) {
      setCurrentStep(currentStep - 1)
      SetselData([...defaultItems.slice(0, 4)])
      Setview(true)
      seteditdate({ date: false, time: false })
      setindicator(true)
    }
    if (currentStep === 5) {
      setCurrentStep(currentStep - 1)
      seteditdate({ date: false, time: false })
      // if (user.type === 'Laser') {
      //   user.charge =
      // } else {
      //   user.charge = String(
      //     (Number(user.charge) * 100) / (100 - percentage) - promoPrice
      //   )
      // }
      setuser(user)
      SetselData([...defaultItems.slice(0, 4)])
      Setview(true)
    }
    if (currentStep === 6) {
      seteditdate({ date: false, time: false })
      setCurrentStep(currentStep - 1)
      if (user.type === 'Laser') {
        user.charge = tempprice
      } else {
        user.charge = String(
          (Number(user.charge) * 100) / (100 - percentage) - promoPrice
        )
      }
      setuser(user)
      SetselData([...defaultItems.slice(0, 4)])
      Setview(true)
    }
    if (currentStep === 7) {
      setCurrentStep(currentStep - 2)
      if (user.type === 'Laser') {
        user.charge = tempprice
      } else {
        user.charge = String(
          (Number(user.charge) * 100) / (100 - percentage) - promoPrice
        )
      }
      setuser(user)
      SetselData([...defaultItems.slice(0, 4)])
      Setview(true)
    }
  }
  const backname = () => {
    if (currentStep === 1) {
      return translation('connect.onlinebooking.backButton.service')
    } else if (currentStep === 2) {
      return indicator
        ? translation('connect.onlinbooking.backButton.location')
        : translation('connect.onlinebooking.backButton.service')
    } else if (currentStep === 3) {
      return translation('connect.onlinebooking.backButton.clinic')
    } else if (currentStep === 4) {
      return translation('connect.onlinebooking.backButton.employe')
    } else if (currentStep === 5) {
      return translation('connect.onlinebooking.backButton.choosedate')
    } else if (currentStep === 6) {
      return translation('connect.onlinebooking.backButton.conformation')
    } else if (currentStep === 7) {
      return translation('connect.onlinebooking.backButton.bookingdetaile')
    }
    // } else if (currentStep === 8) {
    //   return translation('connect.onlinebooking.backButton.bookingdetaile')
    // }
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

  return (
    <div className={styles.onlineBooking}>
      <Header
        currentStep={currentStep > 0 ? currentStep : 1}
        translation={translation}
        back={backbutton}
        visible={(back || !view) && currentStep <= 7}
      />

      <div className={styles.mainBody}>
        {(back || !view) && currentStep <= 7 && (
          <div className={styles.backBut}>
            <span className={styles.arrowLeft}>
              <ArrowLeftOutlined
                onClick={() =>
                  setCurrentStep(currentStep === 0 ? 0 : currentStep - 1)
                }
              />
            </span>
            <span className={styles.backName}>{backname()}</span>
          </div>
        )}

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
                translation={translation}
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
                  setSelectedData({
                    ...selectedData,
                    serviceID: services,
                  })
                  setCurrentStep(currentStep + 1)
                }}
              />
            </div>
          )}
          {currentStep === 2 && (
            <div>
              <LocationSelector
                items={locationsResult.companyBranches}
                onLocationSelected={(locationID) => {
                  setSelectedData({
                    ...selectedData,
                    locationID: locationID,
                  })
                  setCurrentStep(currentStep + 1)
                }}
              />
            </div>
          )}
          {currentStep === 3 && (
            <div>
              <EmployeeSelector
                onEmployeeSelected={(employeeID) => {
                  setSelectedData({
                    ...selectedData,
                    employeeID: employeeID,
                  })
                  setCurrentStep(currentStep + 1)
                }}
              />
            </div>
          )}
          {currentStep === 4 && (
            <div>
              <DateTime
                data={datetime}
                changescreen={rech}
                selectslot={slot}
                translation={translation}
                dateVal={date}
                oldValue={editdate}
                time={tempT}
              />
            </div>
          )}
          {currentStep === 5 && (
            <div>
              <BookingDatail
                changescreen={rech}
                clinic={user.clinic}
                docname={user.docName}
                date={user.date}
                time={user.time}
                charge={user.charge}
                address={user.address}
                image={user.image}
                getinfo={userinfo}
                services={user.services}
                type={user.type}
                translation={translation}
                member={user.member}
                gotofirst={() => {
                  SetselData([...defaultItems.slice(0, 4)])
                  setCurrentStep(1)
                  // Setback(false)
                  Setview(true)
                  setindicator(false)
                  setispro(true)
                }}
                gotoclinic={() => {
                  setCurrentStep(2)
                  SetselData([...defaultItems.slice(0, 4)])
                  Setview(true)
                  setindicator(true)
                }}
                gotoemploy={() => {
                  setCurrentStep(3)
                  SetselData([...defaultItems.slice(0, 4)])
                  Setview(true)
                  setindicator(true)
                }}
                gotodate={() => {
                  setCurrentStep(4)
                  seteditdate({ date: true, time: false })
                  SetselData([...defaultItems.slice(0, 4)])
                  Setview(true)
                  setindicator(true)
                }}
                gotoedit={() => {
                  setCurrentStep(4)
                  seteditdate({ date: true, time: true })
                  SetselData([...defaultItems.slice(0, 4)])
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
