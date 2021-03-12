import React, { FC, useState } from 'react'
import { NumberFormatValues } from 'react-number-format'
import { CurrencyInput, CurrencyInputProps } from './CurrencyInput'

export default {
  title: 'UI/CurrencyInput',
  component: CurrencyInput,
  args: {},
  argTypes: {
    actions: { argTypesRegex: '^on[A-Z].*' },
  },
}

const defaultValue = {
  floatValue: 0,
  formattedValue: '0.00',
  value: '0.00',
}

const CurrencyInputStory: FC<CurrencyInputProps> = ({ ...args }) => {
  const [output, setOutput] = useState<NumberFormatValues>(defaultValue)
  return (
    <>
      <div style={{ width: '200px' }}>
        <CurrencyInput
          {...args}
          onChange={(val: NumberFormatValues) => setOutput(val)}
        />
      </div>
      <div>{`Float Value: ${output.floatValue}`}</div>
      <div>{`Formatted Value: ${output.formattedValue}`}</div>
      <div>{`Value: ${output.value}`}</div>
      <div>{Intl.NumberFormat().format(12345.678)}</div>
    </>
  )
}

export const Default = CurrencyInputStory.bind({})
Default.args = {
  unit: '$',
  value: '0.226',
}
