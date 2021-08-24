import { Collapse, Tabs } from 'antd'
import cn from 'classnames'
import React, { FC, ReactNode, useState } from 'react'
import styles from './CustomTabMenu.module.less'

const { Panel } = Collapse
const { TabPane } = Tabs

export interface CustomTabItem {
  key: number
  content: ReactNode
  children?: { key: number; content: ReactNode }[]
}

export interface CustomTabMenuProps {
  tabPosition: 'top' | 'left'
  tabWidth: string
  tabItems: CustomTabItem[]
  minHeight?: string
}

export const CustomTabMenu: FC<CustomTabMenuProps> = ({
  tabPosition,
  tabWidth,
  tabItems,
  minHeight = '1px',
  children,
}) => {
  const [activeKey, setActiveKey] = useState(0)

  const LeftPositionTabs = (
    <div
      className={styles.leftPositionTabs}
      style={{ minHeight, gridTemplateColumns: `${tabWidth} 1fr` }}
    >
      <div className={styles.tabMenuItems} style={{ width: tabWidth }}>
        {tabItems.map((tabItem, index) => (
          <React.Fragment key={`tab-item-${tabItem.key}`}>
            {!tabItem.children && (
              <div
                className={cn(
                  styles.tabMenuItem,
                  tabItem.key === activeKey ? styles.active : ''
                )}
                onClick={() => {
                  setActiveKey(tabItem.key)
                }}
              >
                {tabItem.content}
              </div>
            )}
            {tabItem.children && (
              <div
                className={cn(
                  styles.expandableItem,
                  tabItem.children.map((item) => item.key).includes(activeKey)
                    ? styles.active
                    : ''
                )}
              >
                <Collapse expandIconPosition="right">
                  <Panel key="1" header={tabItem.content}>
                    {tabItem.children.map((item) => (
                      <div
                        key={`tab-sub-item-${item.key}`}
                        className={cn(
                          styles.tabMenuItem,
                          item.key === activeKey ? styles.active : ''
                        )}
                        onClick={() => setActiveKey(item.key)}
                      >
                        {item.content}
                      </div>
                    ))}
                  </Panel>
                </Collapse>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className={styles.tabPaneItems}>
        {Array.isArray(children) &&
          children.map((tabPane, index) => (
            <div
              key={`tab-pane-${index}`}
              className={cn(
                styles.tabPaneItem,
                index === activeKey ? styles.active : ''
              )}
            >
              {tabPane}
            </div>
          ))}
      </div>
    </div>
  )
  const TopPositionTabs = (
    <div className={styles.topPositionTabs} style={{ minHeight }}>
      <div className={styles.mainTabMenuItems}>
        <Tabs
          tabPosition={tabPosition}
          onChange={(activeKey) => setActiveKey(Number(activeKey))}
        >
          {tabItems.map((tabItem) => (
            <TabPane tab={tabItem.content} key={tabItem.key}>
              {tabItem.children && (
                <Tabs
                  tabPosition={tabPosition}
                  onChange={(activeKey) => setActiveKey(Number(activeKey))}
                >
                  {tabItem.children.map((item) => (
                    <TabPane tab={item.content} key={item.key} />
                  ))}
                </Tabs>
              )}
            </TabPane>
          ))}
        </Tabs>
      </div>
      <div className={styles.tabPaneItems}>
        {Array.isArray(children) &&
          children.map((tabPane, index) => (
            <div
              key={`tab-pane-${index}`}
              className={cn(
                styles.tabPaneItem,
                index === activeKey ? styles.active : ''
              )}
            >
              {tabPane}
            </div>
          ))}
      </div>
    </div>
  )
  return tabPosition === 'top' ? (
    <div className={styles.customTabMenuContainer} style={{ minHeight }}>
      {TopPositionTabs}
    </div>
  ) : (
    <div className={styles.customTabMenuContainer} style={{ minHeight }}>
      {LeftPositionTabs}
    </div>
  )
}

export default CustomTabMenu
