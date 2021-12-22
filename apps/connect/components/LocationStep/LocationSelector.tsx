import React, { FC, useState, useContext } from 'react'
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
  const GOOGLE_API_KEY = 'AIzaSyDKOGfJnjxyiqqze4sn0ZntJvVUcB706GM' //Yes, yes I know. Temporary
  const [searchString, setSearchString] = useState<string>()
  const [userLocation, setUserLocation] = useState({
    lng: 0,
    lat: 0,
  })
  const { canLocationPerformService } = useLocationPermissions()

  const getLatLng = () => {
    navigator.geolocation.getCurrentPosition((item) => {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${item.coords.latitude},${item.coords.longitude}&key=${GOOGLE_API_KEY}`
      )
        .then((response) => response.json())
        .then((res) => {
          if (res?.results && res.results.length > 0) {
            setUserLocation({ ...res.results[0].geometry.location })
            setSearchString(res.results[0].formatted_address)
            setauto(false)
          }
        })
    })
  }

  const handleSearchLocation = () => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${searchString}&key=${GOOGLE_API_KEY}`
    )
      .then((response) => response.json())
      .then((res) => {
        if (res?.results && res.results.length > 0) {
          setUserLocation(res.results[0].geometry.location)
        }
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

  const [searchLocation, setSearchLocation] = useState<boolean>(true)

  if (loadingLocations) return <div>Loading!</div>
  if (errorLocations) return <div>Error...</div>

  const orderedLocations = locationsResult.Public_Locations.map((val) => {
    return {
      ...val,
      distance:
        val.lat !== 0 && val.lng !== 0
          ? Number.parseFloat(
              getDistanceFromLatLonInKm(
                userLocation.lat,
                userLocation.lng,
                val.lat,
                val.lng
              ).toFixed(1)
            )
          : 99999,
    }
  }).sort((a, b) => (a.distance > b.distance ? 1 : -1))

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
                  text={searchString}
                  onChange={(val) => {
                    setSearchString(val)
                    setauto(true)
                  }}
                />
                {searchString && <CloseCircleOutlined />}
                {!auto && <CheckCircleFilled />}
              </div>
              <Button
                className={Styles.findBtn}
                type="primary"
                onClick={() => {
                  handleSearchLocation()
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
                  setSearchLocation(false)
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
            <p className={Styles.chooseHeading}>{searchString}</p>
            {orderedLocations.map((val) => {
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
                    {userLocation.lat !== 0 && val.distance !== 99999 && (
                      <p>
                        {'~ '}
                        {val.distance}
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
