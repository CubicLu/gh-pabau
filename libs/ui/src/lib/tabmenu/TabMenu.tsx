import React, { FC, ReactNode, useState } from 'react'
import { Tabs } from 'antd'
import { TabsProps } from 'antd/lib/tabs'
import classNames from 'classnames'
import styles from './TabMenu.module.less'

const { TabPane } = Tabs
interface P extends TabsProps {
  tabPosition?: 'top' | 'left'
  menuItems: Array<ReactNode>
  minHeight?: string
  onChange?: (key: string) => void
  className?: string
  disabledKeys?: number[]
  activeKey?: string
  activeDefaultKey?: string
}

export const TabMenu: FC<P> = ({
  tabPosition = 'left',
  children,
  menuItems,
  minHeight = '70vh',
  disabledKeys,
  activeKey = '0',
  activeDefaultKey = '0',
  ...props
}) => {
  const [keyActive, setKeyActive] = useState(activeKey)
  const { onChange } = props
  const tabClick = (active: string) => {
    onChange?.(active)
    setKeyActive(active)
  }
  return (
    <div className={classNames(styles.calendarSettings, props.className)}>
      <Tabs
        {...props}
        tabPosition={tabPosition}
        style={{ minHeight }}
        onChange={tabClick}
        activeKey={keyActive}
        defaultActiveKey={activeDefaultKey}
      >
        {Array.isArray(children) &&
          children?.map((tab, i) => (
            <TabPane
              tab={menuItems[i]}
              key={i}
              disabled={disabledKeys?.includes(i)}
            >
              {tab}
            </TabPane>
          ))}
      </Tabs>
    </div>
  )
}

export default TabMenu
