import { OptionType } from '@pabau/ui'
import { Checkbox } from 'antd'
import React, { FC } from 'react'
import styles from './Inner.module.less'

interface P {
  options: OptionType[]
}

const InnerMedicalFormMultiSelect: FC<P> = ({ options }) => {
  return (
    <div>
      {options.length > 0 && (
        <div className={styles.formDropDownAddedOptions}>
          {options.map(({ id, name }) => (
            <div className={styles.formDropDownAddedOption} key={id}>
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default InnerMedicalFormMultiSelect
