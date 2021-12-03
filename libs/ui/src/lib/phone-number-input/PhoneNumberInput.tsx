import ClassNames from 'classnames'
import { PhoneNumberUtil } from 'google-libphonenumber'
import React, { FC, useEffect, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import styles from './PhoneNumberInput.module.less'

const phoneUtil = PhoneNumberUtil.getInstance()
export interface PhoneNumberInputProps {
  countryCode?: string
  label?: string
  value?: string
  labelStyle?: string
  onChange(val: string, valid?: boolean): void
  placeholder?: string
  showValidErrorMessage?: boolean
}

export const PhoneNumberInput: FC<PhoneNumberInputProps> = ({
  countryCode = 'GB',
  label = 'Phone Number',
  value = '44',
  onChange,
  labelStyle,
  placeholder = '',
  showValidErrorMessage = true,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [valid, setValid] = useState(true)
  const [country, setCountry] = useState(countryCode)
  useEffect(() => {
    setPhoneNumber(value)
    if (!value) {
      setCountry(countryCode)
    }
  }, [value, countryCode])

  const handleChangeInput = (val, country) => {
    let validNumber
    try {
      const isValid = phoneUtil.isValidNumberForRegion(
        phoneUtil.parse(val, country.countryCode.toUpperCase()),
        country.countryCode.toUpperCase()
      )
      setValid(isValid)
      validNumber = isValid
    } catch {
      setValid(false)
      validNumber = false
    }
    setPhoneNumber(val)
    // setCountry(country.countryCode)
    onChange(`${val}`, validNumber)
  }

  return (
    <div className={styles.phoneNumberInputContainer}>
      <p
        className={
          labelStyle
            ? ClassNames(styles.phoneNumberLabel, labelStyle)
            : styles.phoneNumberLabel
        }
      >
        {label}
      </p>
      <div
        className={
          valid
            ? styles.phoneNumberInput
            : ClassNames(styles.phoneNumberInput, styles.redBorder)
        }
      >
        <PhoneInput
          value={phoneNumber}
          country={country.toLowerCase()}
          onChange={(value, country) => handleChangeInput(value, country)}
          inputProps={{
            placeholder: placeholder,
          }}
        />
      </div>
      {showValidErrorMessage && !valid && (
        <div className={styles.phoneNumberValidMsg}>
          Please enter a valid phone number
        </div>
      )}
    </div>
  )
}

export default PhoneNumberInput
