import React, { FC, useState, useEffect } from 'react'
import { Input, Button } from '@pabau/ui'
import Styles from './LocationSelector.module.less'
import { CheckCircleFilled, CloseCircleOutlined } from '@ant-design/icons'
import fetch from 'node-fetch'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { useSelectedDataStore } from '../../store/selectedData'
import { Location } from '../../types/locations'

export interface P {
  items: Location[]
  onSelected: () => void
}

const LocationSelector: FC<P> = ({ items, onSelected }) => {
  const [auto, setauto] = useState(true)
  const [, setSelectedData] = useSelectedDataStore()
  const { t } = useTranslationI18()
  const [searchLocation, setSearchLocation] = useState<boolean>(
    items.length > 5
  )
  const [formattedAddress, setFormattedAddress] = useState<string>()
  const [userLocation, setUserLocation] = useState({
    lng: 0,
    lat: 0,
  })

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    function deg2rad(deg) {
      return deg * (Math.PI / 180)
    }

    const R = 6371 // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1) // deg2rad below
    const dLon = deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c // Distance in km
    return d
  }

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

  useEffect(() => {
    if (!searchLocation) {
      getLatLng()
    }
  }, [])

  console.log('userLocation', userLocation)
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
            {items.map((val) => (
              <div
                key={val.id}
                onClick={() => {
                  setSelectedData('SET_LOCATION', val)
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
            ))}
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
