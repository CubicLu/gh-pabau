import React, { FC, ReactNode, useState, useEffect } from 'react'
import { Button, Popover, Radio } from 'antd'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import { PabauPlus } from '@pabau/ui'
import styles from './DropdownWithIcon.module.less'

export interface CustomDropdownProp {
  data: DropdownOptionType[]
  selectedValue?: string
  handleChange?: (value: DropdownOptionType) => void
}

interface DropdownOptionType {
  key: string
  icon: ReactNode
  title: string
  displayTitle: string
  description: string
  isShowPlus?: boolean
}

export const CustomDropdown: FC<CustomDropdownProp> = ({
  data,
  selectedValue,
  handleChange,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [selected, setSelected] = useState<DropdownOptionType>()

  useEffect(() => {
    if (selectedValue) {
      setSelected(data.find((thread) => thread.key === selectedValue))
    } else if (data.length > 0) {
      setSelected(data[0])
    }
  }, [selectedValue, data])

  const handleRadioChange = (e) => {
    const selectedData = data.find((thread) => thread.key === e.target.value)
    if (selectedData) {
      setSelected(selectedData)
      handleChange?.(selectedData)
    }
  }

  const content = () => {
    return (
      <div className={styles.customPopoverContent}>
        <Radio.Group onChange={handleRadioChange} value={selected?.key}>
          {data.map((option) => {
            return (
              <Radio
                key={option.key}
                value={option.key}
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
