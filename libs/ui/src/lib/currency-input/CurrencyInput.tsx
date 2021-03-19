import React, { FC, useState } from 'react'
import NumberFormat, { NumberFormatValues } from 'react-number-format'
import styles from './CurrencyInput.module.less'

export interface CurrencyInputProps {
  unit: string
  value?: string | number
  onChange?: (val) => void
  placeholder?: string
}

export const CurrencyInput: FC<CurrencyInputProps> = ({
  unit,
  value = '',
  onChange,
  placeholder,
}) => {
  const [isPrefixed, setIsPrefixed] = useState(false)
  const handleChange = (val: NumberFormatValues) => {
    if (val) {
      setIsPrefixed(true)
    }
    onChange?.(val)
  }
  return (
    <div className={styles.currencyInput}>
      <NumberFormat
        className="ant-input"
        allowLeadingZeros={true}
        placeholder={
          Number(placeholder) > 0 ? `${unit}${placeholder}` : `${unit}0.00`
        }
        value={Number(value) > 0 ? Number(value).toFixed(2) : null}
        inputMode="numeric"
        thousandSeparator={true}
        thousandsGroupStyle="thousand"
        allowEmptyFormatting={true}
        decimalScale={2}
        prefix={isPrefixed ? unit : ''}
        onValueChange={(val: NumberFormatValues) => handleChange(val)}
      />
    </div>
  )
}

export default CurrencyInput
