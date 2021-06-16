import React, { FC, ReactNode } from 'react'
import styles from './FormTypeButton.module.less'
import { CheckCircleFilled } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'

interface FormTypeInfo {
  [key: string]: {
    label: string
    selected: boolean
    desc: string
    icon: ReactNode
    iconSelected: ReactNode
  }
}

export interface FormTypeButton {
  formTypeInfo: FormTypeInfo
  key1: string
  handleClickItem: (x) => void
  aligns: []
  index: number
}

export const FormTypeButton: FC<FormTypeButton> = ({
  formTypeInfo,
  key1,
  handleClickItem,
}) => {
  return (
    <div>
      <div className={styles.formTypeDiv}>
        {formTypeInfo[key1]?.selected && (
          <CheckCircleFilled className={styles.formTypeChecked} />
        )}
        <Tooltip placement="topLeft" title={formTypeInfo[key1]?.desc}>
          <div
            className={
              formTypeInfo[key1]?.selected ? styles.formTypeSelected : ''
            }
          >
            <Button
              className={styles.formTypeButton}
              onClick={() => handleClickItem(key1)}
            >
              {formTypeInfo[key1]?.selected
                ? formTypeInfo[key1]?.iconSelected
                : formTypeInfo[key1]?.icon}
            </Button>
            <p className={styles.formTypeLabel}>{formTypeInfo[key1]?.label}</p>
          </div>
        </Tooltip>
      </div>
    </div>
  )
}
export default FormTypeButton
