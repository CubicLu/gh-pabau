import React, { FC, useState, useEffect, useContext } from 'react'
import { Input, Button } from '@pabau/ui'
import Styles from './LocationSelector.module.less'
import { CheckCircleFilled, CloseCircleOutlined } from '@ant-design/icons'
import fetch from 'node-fetch'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { useSelectedDataStore } from '../../store/selectedData'
import { SettingsContext } from '../../context/settings-context'
import { useOnlineBookableLocationsQuery } from '@pabau/graphql'
import { getDistanceFromLatLonInKm } from '../../helpers/DistanceHelper'
import useLocationPermissions from '../../hooks/useLocationPermissions'
export interface P {
  onSelected: () => void
}

const LocationSelector: FC<P> = ({ onSelected }) => {
  const [auto, setauto] = useState(true)
  const { setSelectedData, actionTypes } = useSelectedDataStore()
  const { t } = useTranslationI18()
  const settings = useContext(SettingsContext)

  const [formattedAddress, setFormattedAddress] = useState<string>()
  const [userLocation, setUserLocation] = useState({
    lng: 0,
    lat: 0,
  })
  const { canLocationPerformService } = useLocationPermissions()

  const getLatLng = () => {
    navigator.geolocation.getCurrentPosition((item) => {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${item.coords.latitude},${item.coords.longitude}&key=${process.env.google_api_key}`
      )
        .then((response) => response.json())
        .then((res) => {
          setUserLocation({ ...res.results[0].geometry.location })
          setFormattedAddress(res.results[0].formatted_address)
          setauto(false)
        })
    })
  }

  const {
    loading: loadingLocations,
    error: errorLocations,
    data: locationsResult,
  } = useOnlineBookableLocationsQuery({
    variables: {
      company_id: settings.id,
    },
  })
  const [searchLocation, setSearchLocation] = useState<boolean>(
    locationsResult?.Public_Locations.length > 5
  )

  useEffect(() => {
    if (!searchLocation) {
      getLatLng()
    }
  }, [searchLocation])

  if (loadingLocations) return <div>Error!</div>
  if (errorLocations) return <div>Loading...</div>

  return (
    <>
      {searchLocation && (
        <div className={Styles.slide2}>
          <div className={Styles.locationMainWrapper}>
            <p className={Styles.preHeading}>
              {t('connect.onlinebooking.location.title')}
            </p>
            <div className={Styles.formGroup}>
              <div className={Styles.inputWrap}>
                <Input
                  placeHolderText="Enter a postcode, town or city"
                  text={formattedAddress}
                  onChange={(val) => {
                    setFormattedAddress(val)
                    setauto(true)
                  }}
                />
                {formattedAddress && <CloseCircleOutlined />}
                {!auto && <CheckCircleFilled />}
              </div>
              <Button
                className={Styles.findBtn}
                type="primary"
                onClick={() => {
                  setSearchLocation(false)
                }}
              >
                {t('connect.onlinebooking.location.findbutton')}
              </Button>
            </div>
            <div className={Styles.locationBtn}>
              <Button
                onClick={() => {
                  getLatLng()
                }}
              >
                {t('connect.onlinebooking.location.currentlocation')}
              </Button>
            </div>
          </div>
        </div>
      )}
      {!searchLocation && (
        <div className={Styles.slide1}>
          <div className={Styles.chooseWrapper}>
            <p className={Styles.chooseHeading}>{formattedAddress}</p>
            {locationsResult.Public_Locations.map((val) => {
              if (!canLocationPerformService(val.id)) return false
              return (
                <div
                  key={val.id}
                  onClick={() => {
                    setSelectedData(actionTypes.SET_LOCATION, val)
                    onSelected()
                  }}
                  className={Styles.contentBox}
                >
                  <div className={Styles.rightContent}>
                    <p className={Styles.clinicName}>{val.name}</p>
                    <p>{val.address}</p>
                    {val.lat !== 0 && userLocation.lat !== 0 && (
                      <p>
                        {'~ '}
                        {getDistanceFromLatLonInKm(
                          userLocation.lat,
                          userLocation.lng,
                          val.lat,
                          val.lng
                        ).toFixed(1)}
                        {' km'}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
            <div className={Styles.btnWrap}>
              <Button>{t('connect.onlinebooking.clinic.viewall')}</Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default LocationSelector
