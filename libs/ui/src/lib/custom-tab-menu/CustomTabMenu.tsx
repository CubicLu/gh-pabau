import { Collapse, Tabs } from 'antd'
import classNames from 'classnames'
import React, { FC, useEffect, useState } from 'react'
import styles from './CustomTabMenu.module.less'

const { Panel } = Collapse
const { TabPane } = Tabs

export interface TabItem {
  key: string
  name: string
  count?: number
  tags?: readonly string[]
  childTabs?: readonly TabItem[]
}

interface P {
  tabPosition: 'top' | 'left'
  tabWidth: string
  tabs: Readonly<TabItem[]>
  activeTab?: string
  onActiveChanged?(key: string): void
  minHeight?: string
}

export const CustomTabMenu: FC<P> = ({
  tabPosition,
  tabWidth,
  tabs,
  activeTab,
  minHeight = '1px',
  onActiveChanged,
  children,
}) => {
  const LeftPositionTabs = (
    <div
      className={styles.leftPositionTabs}
      style={{ minHeight, gridTemplateColumns: `${tabWidth} 1fr` }}
    >
      <div className={styles.tabMenuItems} style={{ width: tabWidth }}>
        {tabs?.map((tab) => {
          //TODO: add count and tags to ui
          const { name, count, tags, childTabs } = tab

          return (
            <React.Fragment key={name}>
              {(!childTabs || childTabs.length === 0) && (
                <div
                  className={classNames(
                    styles.tabMenuItem,
                    tab.key === activeTab ? styles.active : ''
                  )}
                  onClick={() => {
                    onActiveChanged?.(tab.key)
                  }}
                >
                  <div className={styles.titleCountWrapper}>
                    {name}
                    {count && (
                      <div className={styles.countWrapper}>
                        <div className={styles.countContainer}>{count}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {childTabs && childTabs.length > 0 && (
                <div
                  className={classNames(
                    styles.expandableItem,
                    activeTab && childTabs.find((e) => e.key === activeTab)
                      ? styles.active
                      : ''
                  )}
                >
                  <Collapse expandIconPosition="right">
                    <Panel key="1" header={<>tabItem.content</>}>
                      {childTabs.map((tab) => {
                        const { name } = tab

                        return (
                          <div
                            key={`tab-sub-item-${name}`}
                            className={classNames(
                              styles.tabMenuItem,
                              tab.key === activeTab ? styles.active : ''
                            )}
                            onClick={() => onActiveChanged?.(tab.key)}
                          >
                            {name}
                          </div>
                        )
                      })}
                    </Panel>
                  </Collapse>
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>
      <div className={styles.tabPaneItems}>
        <div className={classNames(styles.tabPaneItem, styles.active)}>
          {children}
        </div>
      </div>
    </div>
  )
  const TopPositionTabs = (
    <div className={styles.topPositionTabs} style={{ minHeight }}>
      <div className={styles.mainTabMenuItems}>
        <Tabs
          tabPosition={tabPosition}
          onChange={(name) => onActiveChanged?.(name)}
        >
          {tabs?.map((tab) => {
            const { childTabs, name } = tab
            return (
              <TabPane tab={<>item.content</>} key={name}>
                {childTabs && childTabs.length > 0 && (
                  <Tabs
                    tabPosition={tabPosition}
                    onChange={(name) => onActiveChanged?.(name)}
                  >
                    {childTabs.map(({ key, name }) => (
                      <TabPane tab={<>item.content</>} key={key} />
                    ))}
                  </Tabs>
                )}
              </TabPane>
            )
          })}
        </Tabs>
      </div>
      <div className={styles.tabPaneItems}>
        <div className={classNames(styles.tabPaneItem)}>{children}</div>
      </div>
    </div>
  )
  return (
    <div className={styles.customTabMenuContainer} style={{ minHeight }}>
      {tabPosition === 'top' ? TopPositionTabs : LeftPositionTabs}
    </div>
  )
}

export default CustomTabMenu
