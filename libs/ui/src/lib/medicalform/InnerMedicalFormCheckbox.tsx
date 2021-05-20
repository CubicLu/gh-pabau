import { OptionType } from '@pabau/ui'
import { Checkbox } from 'antd'
import React, { FC } from 'react'
import styles from './Inner.module.less'

interface P {
  options: OptionType[]
}

const InnerMedicalFormCheckbox: FC<P> = ({ options }) => {
  return (
    <>
      {options.map(({ id, name }) => (
        <Checkbox key={id} value={id} className={styles.checkbox}>
          {name}
        </Checkbox>
      ))}
    </>
  )
}

export default InnerMedicalFormCheckbox
