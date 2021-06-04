import React, { FC, ReactNode } from 'react'
import { Popover, Button } from 'antd'
import { MoreOutlined } from '@ant-design/icons'

import styles from './DotButton.module.less'

interface IOption {
  key: number
  icon: ReactNode
  label: string
  onClick?(): void
}

interface IgnoreOption {
  name: string
  target: string
  type: string
}
interface P {
  menuList?: IOption[]
  ignoreOption?: IgnoreOption
  popoverVisible?: boolean
  setPopoverVisible?(x): void
}

export const DotButton: FC<P> = ({ ...props }) => {
  const { menuList, ignoreOption, popoverVisible, setPopoverVisible } = props

  const renderItem = (key, icon, label, onClick, ignoreOptionFlag) => {
    if (ignoreOptionFlag) {
      return label === ignoreOption?.name &&
        ignoreOption?.type !== ignoreOption?.target ? (
        ``
      ) : (
        <div
          className={styles.dotList}
          key={`three-dot-menu-content-${key}`}
          onClick={() => onClick?.()}
        >
          {icon}
          <p>{label}</p>
        </div>
      )
    }

    return (
      <div
        className={styles.dotList}
        key={`three-dot-menu-content-${key}`}
        onClick={() => onClick?.()}
      >
        {icon}
        <p>{label}</p>
      </div>
    )
  }

  const prepareContent = () => {
    return (
      <div className={styles.dotWrapper}>
        {menuList?.map(({ key, icon, label, onClick }) =>
          renderItem(key, icon, label, onClick, ignoreOption)
        )}
      </div>
    )
  }

  return (
    <div className={styles.popOverContainer}>
      {menuList ? (
        ignoreOption ? (
          <Popover
            content={prepareContent()}
            placement="leftTop"
            visible={popoverVisible}
          >
            <Button
              className={styles.btnCircle}
              shape="circle"
              icon={<MoreOutlined />}
              onClick={() => setPopoverVisible?.(!popoverVisible)}
            />
          </Popover>
        ) : (
          <Popover
            content={prepareContent()}
            placement="leftTop"
            trigger="click"
          >
            <Button
              className={styles.btnCircle}
              shape="circle"
              icon={<MoreOutlined />}
            />
          </Popover>
        )
      ) : (
        <Button
          className={styles.btnCircle}
          shape="circle"
          icon={<MoreOutlined />}
        />
      )}
    </div>
  )
}

export default DotButton
