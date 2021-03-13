import React, { FC } from 'react'
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
  value = '0.115',
  onChange,
  placeholder,
}) => {
  const handleChange = (val: NumberFormatValues) => {
    onChange?.(val)
  }
  return (
    <div className={styles.currencyInput}>
      <NumberFormat
        className="ant-input"
        placeholder={placeholder}
        defaultValue={Number(value).toFixed(2)}
        inputMode="numeric"
        thousandSeparator={true}
        thousandsGroupStyle="thousand"
        allowEmptyFormatting={true}
        decimalScale={2}
        prefix={unit}
        onValueChange={(val: NumberFormatValues) => handleChange(val)}
      />
    </div>
  )
}

export default CurrencyInput
