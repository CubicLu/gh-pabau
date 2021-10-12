import React, { FC, ReactNode } from 'react'
import { useMedia } from 'react-use'
import { Radio } from 'antd'
import styles from './GridVsList.module.less'

export interface displayTypes {
  title: string
  icon: ReactNode
}

interface P {
  displayTypes?: displayTypes[]
  onChange?: (type?: string) => void
  selectedValue?: string
}

export const GridVsList: FC<P> = ({
  displayTypes,
  onChange,
  selectedValue,
}) => {
  const isMobile = useMedia('(max-width: 767px)', false)
  const selectedType = (e) => {
    onChange?.(e.target.value)
  }

  return (
    <Radio.Group
      defaultValue={displayTypes?.[0].title}
      value={selectedValue}
      onChange={selectedType}
      className={isMobile ? styles.mobileGridVsList : ''}
    >
      {displayTypes?.map((display) => (
        <Radio.Button
          value={display.title}
          key={display.title}
          style={{ marginRight: isMobile ? 25 : 16 }}
        >
          {display.icon}
        </Radio.Button>
      ))}
    </Radio.Group>
  )
}

export default GridVsList
