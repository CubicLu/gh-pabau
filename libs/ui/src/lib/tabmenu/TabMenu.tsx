import { Tabs } from 'antd'
import { TabsProps } from 'antd/lib/tabs'
import classNames from 'classnames'
import React, { FC, ReactNode } from 'react'
import styles from './TabMenu.module.less'

const { TabPane } = Tabs
interface P extends TabsProps {
  tabPosition?: 'top' | 'left'
  menuItems: Array<ReactNode>
  minHeight?: string
  onChange?: (key: number | string) => void
  className?: string
  disabledKeys?: number[]
  activeDefaultKey?: string
}

export const TabMenu: FC<P> = ({
  tabPosition = 'left',
  children,
  menuItems,
  minHeight = '100vh',
  disabledKeys,
  activeDefaultKey = '0',
  ...props
}) => {
  const { onChange } = props
  const tabClick = (active: number | string) => {
    onChange?.(active)
  }
  return (
    <div className={classNames(styles.calendarSettings, props.className)}>
      <Tabs
        {...props}
        tabPosition={tabPosition}
        style={{ minHeight }}
        onChange={tabClick}
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
