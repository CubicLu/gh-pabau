import React, { useState } from 'react'
import { Header } from '../../components/header'
import { Footer } from '../../components/footer'
import Selector, {
  MasterCategory,
  Category,
  Service,
} from '../../components/selector/selector'
import Clinic from '../../components/clinic/clinic'
import BookingDatail from '../../components/bookingdetails/Bookingdetail'
import ScreenTwo from '../../components/screentwo/ScreenTwo'
import moment from 'moment'
//import Conformation from '../../components/Connect/conformation/conformation'
import Payment from '../../components/payment/Payment'
import Booked from '../../components/bookingconform/booking'
import PatientInfo from '../../components/patientinformatioon/PatientInfo'
import Employ, { EmployData } from '../../components/selectemploy/employ'
import DateTime from '../../components/dateTime/DateTime'
import { defaultItems } from '../../../web/mocks/connect/onlineBooking'
import styles from './index.module.less'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { employes } from '../../../web/mocks/connect/employMock'
import { useTranslationI18 } from '../../../web/hooks/useTranslationI18'
import { useCompanyServicesCategorisedQuery } from '@pabau/graphql'
import Shop from '../../../../libs/ui/src/assets/images/shop.svg'
import { Image } from 'antd'
/* eslint-disable-next-line */
export interface OnlineBookingProps {}
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
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [seleData, SetselData] = useState(defaultItems.slice(0, 4))
  const [proD, setproD] = useState<MasterCategory[]>()
  const [ispro, setispro] = useState(false)
  const [back, Setback] = useState(false)
  //const [appointmentDate, setAppointmentDate] = useState<Date>()
  const [view, Setview] = useState(true)
  const [indicator, setindicator] = useState(false)
  const [serviceid, setserviceid] = useState<number>()
  const [tempT, settempT] = useState('')
  const [user, setuser] = useState<userData>(userData)
  const [first, setfirst] = useState(true)
  const [all, setall] = useState(false)
  const [datetime, setDateTime] = useState<EmployData>()
  const [date, setdate] = useState()
  const [tempprice, settempprice] = useState('')
  const [editdate, seteditdate] = useState({ time: false, date: false })
  const [conType, setconType] = useState<Category>()
  const [promoPrice, setpromoPrice] = useState<number>(0)
  const [percentage, setpercentage] = useState<number>(0)
  const [lang, setlang] = useState('en')
  const { t } = useTranslationI18()

  const {
    loading,
    error,
    data: servicesCategorised,
  } = useCompanyServicesCategorisedQuery({
    variables: {
      company_id: 8021,
    },
  })
  if (error) return <div>Error!</div>
  if (loading || !servicesCategorised) return <div>Loading...</div>

  const masterCategories = servicesCategorised.serviceMasterCategories.map(
    (row) => {
      return {
        id: row.id,
        name: row.name,
        icon: row.image ? (
          <Image
            preview={false}
            height={'40px'}
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
                src={'https://crm.pabau.com' + row.image}
                alt={row.name}
              />
            ) : null,
            services: cat.CompanyService,
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
  const SelectEmp = (value: EmployData) => {
    setDateTime(value)
    console.log(value)
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
  const getlocation = (location) => {
    user.clinic = location.name
    user.address = location.Address
    user.docDescription = location.description
    // user.type = 'Acne consultation'
    setuser(user)
    console.log(location)
  }
  const backbutton = () => {
    if (currentStep === 1) {
      SetselData([...defaultItems.slice(0, 4)])
      Setback(false)
      Setview(true)
      setfirst(true)
      setall(false)
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
        setfirst(true)
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
    // if (currentStep === 8) {
    //   setCurrentStep(currentStep - 2)
    //   SetselData([...defaultItems.slice(0, 4)])
    //   Setview(true)
    // }
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
    console.log(userdata)
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
        currentStep={currentStep}
        translation={translation}
        back={backbutton}
        visible={(back || !view) && currentStep <= 7}
      />

      <div className={styles.mainBody}>
        {(back || !view) && currentStep <= 7 && (
          <div className={styles.backBut}>
            <span className={styles.arrowLeft}>
              <ArrowLeftOutlined
                onClick={() => {
                  backbutton()
                }}
              />
            </span>
            <span className={styles.backName}>{backname()}</span>
          </div>
        )}

        <div className={classname()}>
          {currentStep === 1 &&
            (first ? (
              <div>
                <Selector
                  items={masterCategories}
                  view={view}
                  click={(member, viewbtn) => {
                    console.log(member)
                    user.member = member
                    setuser(user)
                    SetselData([...defaultItems.slice(0, 4)])
                    Setview(false)
                    console.log(all)
                    setall(true)
                    viewbtn ? setfirst(false) : setfirst(true)
                    //
                  }}
                  onSelected={(val, id) => {
                    setserviceid(id)
                    setconType(() => {
                      for (const im of val.services) {
                        //im.selected = false
                      }
                      return val
                    })
                    Setback(true)
                    console.log(id)
                    setall(false)
                    setfirst(false)
                    //rech()
                  }}
                  indicator={indicator}
                  setindicator={setindicator}
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
            ) : (
              <div className={styles.slide1}>
                <ScreenTwo
                  items={masterCategories}
                  ispro={ispro}
                  proD={proD}
                  changescreen={rech}
                  catData={conType}
                  isall={all}
                  translation={translation}
                  parentid={serviceid}
                  onSelect={(
                    conName: string,
                    price,
                    online,
                    range,
                    services,
                    vouchers,
                    proData: MasterCategory[]
                  ) => {
                    user.services = services
                    user.vouchers = vouchers
                    user.type = conName
                    user.charge = String(price)
                    user.online = online
                    user.duration = range
                    setuser(user)
                    setproD(proData)
                    console.log(proData)
                    console.log(conName)
                  }}
                />
              </div>
            ))}
          {currentStep === 2 && (
            <div>
              <Clinic
                getlocation={getlocation}
                changescreen={rech}
                indicator={indicator}
                setindicator={setindicator}
                translation={translation}
              />
            </div>
          )}
          {currentStep === 3 && (
            <div>
              <Employ
                items={employes}
                changescreen={rech}
                onselect={SelectEmp}
                translation={translation}
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
                  setfirst(false)
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
              {/*<Conformation*/}
              {/*  changescreen={rech}*/}
              {/*  clinic={user.clinic}*/}
              {/*  docname={user.docName}*/}
              {/*  date={user.date}*/}
              {/*  time={user.time}*/}
              {/*  charge={user.charge}*/}
              {/*  address={user.address}*/}
              {/*  image={user.image}*/}
              {/*  type={user.type}*/}
              {/*  services={user.services}*/}
              {/*  translation={translation}*/}
              {/*  gotofirst={() => {*/}
              {/*    SetselData([...defaultItems.slice(0, 4)])*/}
              {/*    setCurrentStep(1)*/}
              {/*    Setback(false)*/}
              {/*    Setview(true)*/}
              {/*    setfirst(true)*/}
              {/*    setindicator(false)*/}
              {/*  }}*/}
              {/*  gotoclinic={() => {*/}
              {/*    setCurrentStep(2)*/}
              {/*    SetselData([...defaultItems.slice(0, 4)])*/}
              {/*    Setview(true)*/}
              {/*    setindicator(true)*/}
              {/*  }}*/}
              {/*  gotoemploy={() => {*/}
              {/*    setCurrentStep(3)*/}
              {/*    SetselData([...defaultItems.slice(0, 4)])*/}
              {/*    Setview(true)*/}
              {/*    setindicator(true)*/}
              {/*  }}*/}
              {/*  gotodate={() => {*/}
              {/*    setCurrentStep(4)*/}
              {/*    seteditdate(false)*/}
              {/*    SetselData([...defaultItems.slice(0, 4)])*/}
              {/*    Setview(true)*/}
              {/*    setindicator(true)*/}
              {/*  }}*/}
              {/*  gotoedit={() => {*/}
              {/*    setCurrentStep(4)*/}
              {/*    seteditdate(true)*/}
              {/*    SetselData([...defaultItems.slice(0, 4)])*/}
              {/*    Setview(true)*/}
              {/*    setindicator(true)*/}
              {/*  }}*/}
              {/*  getprice={(price, percentage) => {*/}
              {/*    setpromoPrice(price)*/}
              {/*    setpercentage(percentage)*/}
              {/*    console.log(user.charge)*/}
              {/*    settempprice(user.charge)*/}
              {/*    if (user.type === 'Laser') {*/}
              {/*      user.charge = String((price * (100 - percentage)) / 100)*/}
              {/*    } else {*/}
              {/*      user.charge = String(*/}
              {/*        ((Number(user.charge) + price) * (100 - percentage)) / 100*/}
              {/*      )*/}
              {/*    }*/}

              {/*    setuser(user)*/}
              {/*  }}*/}
              {/*/>*/}
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
              {/*<BookingDatail*/}
              {/*  changescreen={rech}*/}
              {/*  clinic={user.clinic}*/}
              {/*  docname={user.docName}*/}
              {/*  date={user.date}*/}
              {/*  time={user.time}*/}
              {/*  charge={user.charge}*/}
              {/*  address={user.address}*/}
              {/*  image={user.image}*/}
              {/*  getinfo={userinfo}*/}
              {/*  services={user.services}*/}
              {/*  type={user.type}*/}
              {/*  translation={translation}*/}
              {/*  member={user.member}*/}
              {/*  gotofirst={() => {*/}
              {/*    SetselData([...defaultItems.slice(0, 4)])*/}
              {/*    setCurrentStep(1)*/}
              {/*    Setback(false)*/}
              {/*    Setview(true)*/}
              {/*    setfirst(true)*/}
              {/*    setindicator(false)*/}
              {/*  }}*/}
              {/*  gotoclinic={() => {*/}
              {/*    setCurrentStep(2)*/}
              {/*    SetselData([...defaultItems.slice(0, 4)])*/}
              {/*    Setview(true)*/}
              {/*    setindicator(true)*/}
              {/*  }}*/}
              {/*  gotoemploy={() => {*/}
              {/*    setCurrentStep(3)*/}
              {/*    SetselData([...defaultItems.slice(0, 4)])*/}
              {/*    Setview(true)*/}
              {/*    setindicator(true)*/}
              {/*  }}*/}
              {/*  gotodate={() => {*/}
              {/*    setCurrentStep(4)*/}
              {/*    seteditdate(false)*/}
              {/*    SetselData([...defaultItems.slice(0, 4)])*/}
              {/*    Setview(true)*/}
              {/*    setindicator(true)*/}
              {/*  }}*/}
              {/*  gotoedit={() => {*/}
              {/*    setCurrentStep(4)*/}
              {/*    seteditdate(true)*/}
              {/*    SetselData([...defaultItems.slice(0, 4)])*/}
              {/*    Setview(true)*/}
              {/*    setindicator(true)*/}
              {/*  }}*/}
              {/*  getprice={(price, percentage) => {*/}
              {/*    setpromoPrice(price)*/}
              {/*    setpercentage(percentage)*/}
              {/*    console.log(user.charge)*/}
              {/*    settempprice(user.charge)*/}
              {/*    if (user.type === 'Laser') {*/}
              {/*      user.charge = String((price * (100 - percentage)) / 100)*/}
              {/*    } else {*/}
              {/*      user.charge = String(*/}
              {/*        ((Number(user.charge) + price) * (100 - percentage)) / 100*/}
              {/*      )*/}
              {/*    }*/}

              {/*    setuser(user)*/}
              {/*  }}*/}
              {/*/>*/}
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
              {/*<PatientInfo*/}
              {/*  changescreen={rech}*/}
              {/*  image={user.image}*/}
              {/*  firstname={user.firstname}*/}
              {/*  lastname={user.lastname}*/}
              {/*  translation={translation}*/}
              {/*/>*/}
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
              {/*<Payment*/}
              {/*  changescreen={rech}*/}
              {/*  type={user.type}*/}
              {/*  translation={translation}*/}
              {/*  price={user.charge}*/}
              {/*/>*/}
            </div>
          )}
          {currentStep === 9 && (
            <div>
              {/*<Booked*/}
              {/*  address={user.address}*/}
              {/*  type={user.type}*/}
              {/*  doctor={user.docName}*/}
              {/*  date={user.date}*/}
              {/*  time={user.time}*/}
              {/*  description={user.docDescription}*/}
              {/*  translation={translation}*/}
              {/*  online={user.online}*/}
              {/*  duration={user.duration}*/}
              {/*/>*/}
            </div>
          )}
        </div>
      </div>

      <Footer select={(value) => setlang(value)} translation={translation} />
    </div>
  )
}

export default Index
