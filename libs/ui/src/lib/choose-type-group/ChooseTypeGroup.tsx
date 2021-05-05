import { MailOutlined, MessageOutlined, RightOutlined } from '@ant-design/icons'
import { ChooseModalItem } from '@pabau/ui'
import React, { FC, useState } from 'react'

import styles from './ChooseTypeGroup.module.less'

const addOnStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  border: '1px solid var(--border-color-base)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'var(--grey-text-color)',
  fontSize: '16px',
}

const defaultGroup: ChooseModalItem[] = [
  {
    title: 'General',
    icon: <MailOutlined />,
    addonIcon: (
      <div style={addOnStyle}>
        <RightOutlined />
      </div>
    ),
  },
  {
    title: 'SMS',
    icon: <MessageOutlined />,
    addonIcon: (
      <div style={addOnStyle}>
        <RightOutlined />
      </div>
    ),
  },
]

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const onSelected = (item) => alert(item.title + ' clicked.')

export const defaultChooseTypeGroupProps: ChooseTypeGroupProps = {
  items: defaultGroup,
  onSelected: onSelected,
}
export interface ChooseTypeGroupProps {
  items?: ChooseModalItem[]
  onSelected?: (item: ChooseModalItem) => void
  selectedService?: string
}

export const ChooseTypeGroup: FC<ChooseTypeGroupProps> = (
  chooseTypeGroupProps
) => {
  if (
    chooseTypeGroupProps === undefined ||
    Object.keys(chooseTypeGroupProps).length === 0
  )
    chooseTypeGroupProps = defaultChooseTypeGroupProps

  const { items, onSelected, selectedService } = chooseTypeGroupProps
  console.log('selectedService--', selectedService)

  const [selected, setSelected] = useState(selectedService)
  const subStr = (str) => {
    return str.length > 35 ? str.substring(1, 32).toString() + '...' : str
  }

  const _onSelected = (item: ChooseModalItem) => {
    setSelected(item.title)
    onSelected ? onSelected(item) : console.log()
  }
  return (
    <div className={styles.chooseModalContent}>
      {items?.map((item) => (
        <div
          key={item.title}
          className={
            selected === item.title
              ? [styles.chooseServiceTypeItem, styles.selectedItem].join(' ')
              : styles.chooseServiceTypeItem
          }
          onClick={() => _onSelected(item)}
        >
          <div>{item.icon}</div>
          <div>
            <div className={styles.chooseServiceTypeItemContent}>
              <p>{item.title}</p>
              {item.description && <p>{subStr(item.description)}</p>}
            </div>
            {item.addonIcon && <div>{item.addonIcon}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChooseTypeGroup
