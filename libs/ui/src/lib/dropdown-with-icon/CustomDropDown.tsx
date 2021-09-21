import React, { FC, ReactNode, useState, useEffect } from 'react'
import { Button, Popover, Radio } from 'antd'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import { PabauPlus } from '@pabau/ui'
import styles from './DropdownWithIcon.module.less'

export interface CustomDropdownProp {
  data: CustomDropdownOptionType[]
  selectedValue?: string
  handleChange?: (value: CustomDropdownOptionType) => void
}

export interface CustomDropdownOptionType {
  key: string
  title: string
  displayTitle: string
  description: string
  icon: ReactNode
  isShowPlus?: boolean
  value: string
}

export const CustomDropdown: FC<CustomDropdownProp> = ({
  data,
  selectedValue,
  handleChange,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [selected, setSelected] = useState<CustomDropdownOptionType>()

  useEffect(() => {
    if (selectedValue) {
      setSelected(data.find((thread) => thread.value === selectedValue))
    } else if (data.length > 0) {
      setSelected(data[0])
    }
  }, [selectedValue, data])

  const handleRadioChange = (e) => {
    const selectedData = data.find((thread) => thread.value === e.target.value)
    if (selectedData) {
      setSelected(selectedData)
      handleChange?.(selectedData)
    }
  }

  const content = () => {
    return (
      <div className={styles.customPopoverContent}>
        <Radio.Group onChange={handleRadioChange} value={selected?.value}>
          {data.map((option) => {
            return (
              <Radio
                key={option.key}
                value={option.value}
                className={styles.radioWrapper}
              >
                <div className={styles.popUpHeader}>
                  {option.icon}
                  <span>{option.title}</span>
                  {option.isShowPlus && (
                    <span className={styles.plusBtn}>
                      <PabauPlus modalType="Marketing" />
                    </span>
                  )}
                </div>
                <p className={styles.description}>{option.description}</p>
              </Radio>
            )
          })}
        </Radio.Group>
      </div>
    )
  }

  return (
    <div className={styles.customDropdownWrapper}>
      <Popover
        placement="bottomRight"
        trigger="click"
        onVisibleChange={(visible) => setIsVisible(visible)}
        content={content}
        overlayClassName={styles.customDropdownPopover}
      >
        <Button className={styles.btnDropdown} icon={selected?.icon}>
          {selected?.displayTitle}
          {isVisible ? <UpOutlined /> : <DownOutlined />}
        </Button>
      </Popover>
    </div>
  )
}

export default CustomDropdown
