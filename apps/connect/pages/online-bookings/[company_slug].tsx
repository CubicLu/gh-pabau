import React, { useContext, useState, useEffect } from 'react'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

import ServiceCategorySelector from '../../components/ServicesStep/ServiceCategorySelector'
import ServiceSelector from '../../components/ServicesStep/ServiceSelector'
import LocationSelector from '../../components/LocationStep/LocationSelector'
import BookingDetails from '../../components/BookingDetailsStep/BookingDetails'
import BookingConfirmation from '../../components/BookingConfirmationStep/BookingConfirmation'
import EmployeeSelector from '../../components/EmployeeStep/EmployeeSelector'
import DateTimeSelector from '../../components/DateTimeStep/DateTimeSelector'
import styles from './index.module.less'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { useCompanyServicesCategorisedQuery } from '@pabau/graphql'

import { useCreateOnlineBookingMutation } from '@pabau/graphql'
import { SettingsContext } from '../../context/settings-context'
import { useSelectedDataStore } from '../../store/selectedData'

export function Index() {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [hasMasterCategories, setHasMasterCategories] = useState<boolean>(true)
  const { selectedData } = useSelectedDataStore()
  const { t } = useTranslationI18()

  const settings = useContext(SettingsContext)

  const [createBooking] = useCreateOnlineBookingMutation({
    onCompleted(data) {
      setCurrentStep(currentStep + 3)
    },
    onError(err) {
      //I am not empty
    },
  })

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

  const {
    loading: loadingServices,
    error: errorServices,
    data: servicesCategorised,
  } = useCompanyServicesCategorisedQuery({
    variables: {
      company_id: settings?.id,
    },
  })

  useEffect(() => {
    if (
      !loadingServices &&
      servicesCategorised.Public_MasterCategories.length === 0
    ) {
      setCurrentStep(1)
      setHasMasterCategories(false)
    }
  }, [servicesCategorised, loadingServices])

  if (errorServices) return <div>Error!</div>
  if (loadingServices) return <div>Loading...</div>

  console.log('Rendering Page', currentStep)
  return (
    <div className={styles.onlineBooking}>
      <Header
        currentStep={currentStep > 0 ? currentStep : 1}
        back={() => {
          setCurrentStep(currentStep - 1)
        }}
        visible={currentStep > 0 && currentStep <= 7}
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
                  <a href={'tel:' + settings.details.phone}>
                    {settings.details.phone}
                  </a>
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
                hasMasterCategories={hasMasterCategories}
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
            <BookingDetails
              onConfirmed={function (contactsDetails) {
                createBooking({
                  variables: {
                    company_id: settings.id,
                    user_id: selectedData.employee.Public_User.id,
                    service_ids: selectedData.services.map((s) => s.id),
                    start_date: selectedData.dateTime._d,
                    location_id: selectedData.location.id,
                    contact: contactsDetails,
                  },
                })
              }}
              backToStep={(step: number) => {
                setCurrentStep(step)
              }}
            />
          )}
          {/*{currentStep === 6 && (*/}
          {/*  <div>*/}
          {/*    <PatientInfo*/}
          {/*      changescreen={rech}*/}
          {/*      image={user.image}*/}
          {/*      firstname={user.firstname}*/}
          {/*      lastname={user.lastname}*/}
          {/*      translation={t}*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*)}*/}
          {/*{currentStep === 7 && (*/}
          {/*  <div>*/}
          {/*    <Payment*/}
          {/*      changescreen={rech}*/}
          {/*      type={user.type}*/}
          {/*      translation={t}*/}
          {/*      price={user.charge}*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*)}*/}
          {currentStep === 8 && <BookingConfirmation />}
          {currentStep === 9 && <div>&nbsp;</div>}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Index
