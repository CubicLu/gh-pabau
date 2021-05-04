import { CheckCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, Col, Modal, Row } from 'antd'
import React, { FC, ReactNode, useState } from 'react'
import { DefaultFormTypeItems } from './FormTypeGroup.data'

import styles from './FormTypeGroup.module.less'

export interface FormTypeGroupInfo {
  [key: string]: {
    label: string
    selected: boolean
    desc: string
    icon: ReactNode
    iconSelected: ReactNode
  }
}

export interface FormTypeGroupProps {
  title?: string
  titleVisible?: boolean
  editable?: boolean
  multiable?: boolean
  alerted?: boolean
  _formTypeItems?: FormTypeGroupInfo
  onChangeSetting?: (_formTypeItems: FormTypeGroupInfo) => void
  isSelected?: (val: boolean) => void
}

export const FormTypeGroup: FC<FormTypeGroupProps> = ({
  title = 'Form Type',
  titleVisible = true,
  editable = false,
  alerted = false,
  multiable = false,
  _formTypeItems = DefaultFormTypeItems,
  onChangeSetting = () => console.log(),
  isSelected = () => console.log(),
}) => {
  const aligns = [
    styles.formTypeStart,
    styles.formTypeCenter,
    styles.formTypeEnd,
  ]

  /*--- Form Type Group State ---*/
  const [formTypeItems, setFormTypeItems] = useState(_formTypeItems)

  /*--- Form Type Group State End ---*/

  const goClickItem = (name) => {
    const tempItems = _formTypeItems || formTypeItems
    const newValue = !tempItems[name].selected
    if (!multiable)
      for (const key of Object.keys(tempItems)) {
        tempItems[key].selected = false
      }
    tempItems[name].selected = newValue
    setFormTypeItems({ ...tempItems })
    onChangeSetting(tempItems)
    isSelected(tempItems[name].selected)
  }

  const handleClickItem = (name) => {
    if (alerted) {
      showWarningMessage(name)
      return
    }
    editable && goClickItem(name)
  }

  const { confirm } = Modal

  const showWarningMessage = (name) => {
    confirm({
      title: 'Warning',
      icon: <ExclamationCircleOutlined />,
      content:
        'You are about to change the type of form. This will reset your data',
      onOk() {
        goClickItem(name)
      },
      onCancel() {
        console.log('cancel')
      },
    })
  }

  return (
    <div className={styles.formTypeContainer}>
      {titleVisible ? (
        <div className={styles.label}>{title ?? 'Form Type'}</div>
      ) : null}
      <Row>
        {Object.keys(_formTypeItems).map((key, index) => (
          <Col key={key} className={aligns[index % 3]}>
            {/* <Col key={key} span={8} className={aligns[index % 3]}></Col> */}
            <div className={styles.formTypeDiv}>
              {_formTypeItems[key].selected && (
                <CheckCircleFilled className={styles.formTypeChecked} />
              )}
              {/* <Tooltip placement="topLeft" title={formTypeItems[key].desc}> */}
              <div
                className={
                  _formTypeItems[key].selected ? styles.formTypeSelected : ''
                }
              >
                <Button
                  className={styles.formTypeButton}
                  onClick={() => handleClickItem(key)}
                >
                  {_formTypeItems[key].selected
                    ? _formTypeItems[key].iconSelected
                    : _formTypeItems[key].icon}
                </Button>
                <p className={styles.formTypeLabel}>
                  {_formTypeItems[key].label}
                </p>
              </div>
              {/* </Tooltip> */}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default FormTypeGroup
