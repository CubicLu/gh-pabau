import React, { PropsWithChildren } from 'react'
import { Radio as AntRadiobutton } from 'antd'
import { DataItems } from './mock'
import styles from './RadioButton.module.less'

const RadioGroup = AntRadiobutton.Group

// Radio button property interface
export interface RadioButtonProps {
  group: string
  Items: DataItems[]
}

export function RadioButton({
  group,
  Items,
}: PropsWithChildren<RadioButtonProps>): JSX.Element {
  return (
    <div className={styles.radioButtonWrapper}>
      <RadioGroup name={group}>
        {Items.map((menu: DataItems, i) => {
          return (
            <AntRadiobutton
              key={menu.key}
              value={menu.value}
              checked={menu.check}
            >
              {menu.label}
            </AntRadiobutton>
          )
        })}
      </RadioGroup>
    </div>
  )
}

export default RadioButton
