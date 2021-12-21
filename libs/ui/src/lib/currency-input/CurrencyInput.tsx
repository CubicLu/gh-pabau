import React, { FC, useState } from 'react'
import NumberFormat, { NumberFormatValues } from 'react-number-format'
import { useTranslation } from 'react-i18next'
import StringToCurrencySignConverter from '../../helper/stringToCurrencySignConverter'
import styles from './CurrencyInput.module.less'

export interface CurrencyInputProps {
  unit: string
  value?: string | number
  onChange?: (val) => void
  placeholder?: string
  onBlur?: () => void
}

export const CurrencyInput: FC<CurrencyInputProps> = ({
  unit,
  value = '',
  onChange,
  placeholder,
  onBlur,
}) => {
  const { t } = useTranslation('common')
  const [isPrefixed, setIsPrefixed] = useState(false)
  const handleChange = (val: NumberFormatValues) => {
    if (val) {
      setIsPrefixed(true)
    }
    onChange?.(val)
  }
  const checkValueLimit = (inputObj) => {
    const { value } = inputObj
    if (value >= 0) return inputObj
  }
  return (
    <div className={styles.currencyInput}>
      <NumberFormat
        className="ant-input"
        allowLeadingZeros={true}
        placeholder={
          Number(placeholder) > 0
            ? `${StringToCurrencySignConverter(unit) ?? unit}${placeholder}`
            : t(
                `ui.currencyinput.placeholder.${
                  StringToCurrencySignConverter(unit) ?? unit
                }`
              )
        }
        value={Number(value) > 0 ? Number(value).toFixed(2) : null}
        inputMode="numeric"
        thousandSeparator={true}
        thousandsGroupStyle="thousand"
        allowEmptyFormatting={true}
        decimalScale={2}
        prefix={isPrefixed ? StringToCurrencySignConverter(unit) ?? unit : ''}
        onValueChange={(val: NumberFormatValues) => handleChange(val)}
        isAllowed={checkValueLimit}
        onBlur={() => onBlur?.()}
      />
    </div>
  )
}

export default CurrencyInput
