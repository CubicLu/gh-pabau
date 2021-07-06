import React, { FC, useState } from 'react'
import { Input, Button } from '@pabau/ui'
import Styles from './LocationSelector.module.less'
import { CheckCircleFilled, CloseCircleOutlined } from '@ant-design/icons'
import fetch from 'node-fetch'

import { Location } from '../../types/locations'

export interface P {
  items: Location[]
  onLocationSelected: (locationID) => void
  translation: (val: string) => string
}

const LocationSelector: FC<P> = ({
  items,
  onLocationSelected,
  translation,
}) => {
  //const { t } = useTranslationI18()
  const apiKey = process.env.google_api_key
  const [auto, setauto] = useState(true)
  const [location, setlocation] = useState<string>('')

  const [searchLocation, setSearchLocation] = useState<boolean>(
    items.length > 5
  )

  const getLatLng = () => {
    //let obj = undefined
    navigator.geolocation.getCurrentPosition((item) => {
      // obj = item.coords.latitude
      // setlat(item.coords.latitude)
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${item.coords.latitude},${item.coords.longitude}&key=${apiKey}`
      )
        .then((response) => response.json())
        .then((res) => {
          // setarr([...res.results])

          setTimeout(() => {
            console.log(
              res.results[0].address_components.slice(-1)[0].long_name
            )
            setlocation(
              `${res.results[0].address_components.slice(-1)[0].long_name}`
            )
            setauto(false)
            // setauto(false)
            //  setlocation(
            //   arr[0].address_components.slice(-1)[0].long_name
            //  )
            //console.log(arr[0].address_components.slice(-1))
          }, 5)
          // res.results[0].address_components[res.results[0].address_components.length()-1].long_name
          // console.log( res.results[0].address_components[res.results[0].address_components.length()-1].long_name)
        })
    })
    // console.log(
    //   navigator.geolocation.getCurrentPosition((item) => item.coords.longitude)
    // )
    // console.log(obj)
    //return ob1
  }
  return (
    <>
      {searchLocation && (
        <div className={Styles.slide2}>
          <div className={Styles.locationMainWrapper}>
            <p className={Styles.preHeading}>
              {translation('connect.onlinebooking.location.title')}
            </p>
            <div className={Styles.formGroup}>
              <div className={Styles.inputWrap}>
                <Input
                  placeHolderText="Enter a postcode, town or city"
                  text={location}
                  onChange={(val) => {
                    setlocation(val)
                    setauto(true)
                  }}
                />
                {location.length > 0 && <CloseCircleOutlined />}
                {!auto && <CheckCircleFilled />}
              </div>
              <Button
                className={Styles.findBtn}
                type="primary"
                onClick={() => {
                  setSearchLocation(false)
                }}
              >
                {translation('connect.onlinebooking.location.findbutton')}
              </Button>
            </div>
            <div className={Styles.locationBtn}>
              <Button
                onClick={() => {
                  getLatLng()
                }}
              >
                {translation('connect.onlinebooking.location.currentlocation')}
              </Button>
            </div>
          </div>
        </div>
      )}
      {!searchLocation && (
        <div className={Styles.slide1}>
          <div className={Styles.chooseWrapper}>
            <p className={Styles.chooseHeading}>{location}</p>
            {items.map((val) => (
              <div
                key={val.id}
                onClick={() => onLocationSelected(val.id)}
                className={Styles.contentBox}
              >
                <div className={Styles.rightContent}>
                  <p className={Styles.clinicName}>{val.name}</p>
                  <p>{val.address}</p>
                  <p>0 km</p>
                </div>
              </div>
            ))}
            <div className={Styles.btnWrap}>
              <Button>
                {translation('connect.onlinebooking.clinic.viewall')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default LocationSelector
