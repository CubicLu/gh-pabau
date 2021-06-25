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
}

export const PhoneNumberInput: FC<PhoneNumberInputProps> = ({
  countryCode = 'GB',
  label = 'Phone Number',
  value = '',
  onChange,
  labelStyle,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [valid, setValid] = useState(true)
  useEffect(() => {
    if (value) {
      setPhoneNumber(value)
    }
  }, [value])

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
          country={countryCode.toLowerCase()}
          onChange={(value, country) => handleChangeInput(value, country)}
        />
      </div>
      {!valid && (
        <div className={styles.phoneNumberValidMsg}>
          Please enter a valid phone number
        </div>
      )}
    </div>
  )
}

export default PhoneNumberInput
