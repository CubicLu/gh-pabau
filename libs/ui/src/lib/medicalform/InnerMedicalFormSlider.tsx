import { OptionType, SliderCustom } from '@pabau/ui'
import React, { FC, useState } from 'react'

interface P {
  options: OptionType[]
}

const InnerMedicalFormSlider: FC<P> = ({ options }) => {
  const [optionValue, setOptionValue] = useState<number | undefined>(-1)
  return (
    <SliderCustom
      data={options?.map(({ id, name }) => {
        return {
          id: id,
          name: name,
        }
      })}
      handleChange={(e) => setOptionValue(typeof e !== 'undefined' ? e.id : 0)}
      value={optionValue}
    />
  )
}

export default InnerMedicalFormSlider
