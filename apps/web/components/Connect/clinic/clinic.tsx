import React, { FC, useState } from 'react'
import { Input, Button } from '@pabau/ui'
import { Clincs } from '../../../mocks/connect/clinicMock'
import Styles from './clinic.module.less'
import { CheckCircleFilled, CloseCircleOutlined } from '@ant-design/icons'
import fetch from 'node-fetch'
/* eslint-disable-next-line */
export interface ClinicProps {
  changescreen: () => void
  getlocation: (location) => void
  indicator: boolean
  setindicator: (value) => void
  translation: (val: string) => string
}

const Clinic: FC<ClinicProps> = ({
  changescreen,
  getlocation,
  indicator,
  setindicator,
  translation,
}) => {
  // const [select, setselect] = useState(!indicator) true
  //const { t } = useTranslationI18()
  const apiKey = process.env.google_api_key
  const [auto, setauto] = useState(true)
  const [location, setlocation] = useState<string>('')
  const setdata = (data) => {
    changescreen()
    getlocation(data)
  }
  const lati = () => {
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
  //console.log('-----', lati())
  // const long = () => {
  //   navigator.geolocation.getCurrentPosition((item) =>
  //     setlong(item.coords.longitude)
  //   )
  //
  //   // return obj
  // }
  return (
    <>
      {!indicator && (
        <div className={Styles.slide2}>
          <div className={Styles.locationMainWrapper}>
            <p className={Styles.preHeading}>
              {translation('connect.onlinebooking.location.title')}
            </p>
            <div className={Styles.formGroup}>
              <div className={Styles.inputWrap}>
                {console.log(location)}
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
                  // setauto(false)
                  setindicator(!indicator)
                }}
              >
                {translation('connect.onlinebooking.location.findbutton')}
              </Button>
            </div>
            <div className={Styles.locationBtn}>
              <Button
                onClick={() => {
                  lati()
                  // await long()

                  // setTimeout(() => {
                  //
                  // }, 10)

                  // setindicator(!indicator)
                }}
              >
                {translation('connect.onlinebooking.location.currentlocation')}
              </Button>
            </div>
          </div>
        </div>
      )}
      {indicator && (
        <div className={Styles.slide1}>
          <div className={Styles.chooseWrapper}>
            <p className={Styles.chooseHeading}>{location}</p>
            {Clincs.map((val) => (
              <div
                key={val.key}
                onClick={() => setdata(val)}
                className={Styles.contentBox}
              >
                <div className={Styles.rightContent}>
                  <p className={Styles.clinicName}>{val.name}</p>
                  <p>{val.Address}</p>
                  <p>{val.distance}</p>
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
export default Clinic
