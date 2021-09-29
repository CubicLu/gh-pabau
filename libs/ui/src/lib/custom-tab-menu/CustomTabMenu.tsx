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
  const getActiveKey = (tab) => {
    if (
      tab?.childTabs?.length > 0 &&
      tab?.childTabs?.find((el) => el.key === activeTab)
    )
      return [tab.key]
    return ''
  }

  const LeftPositionTabs = (
    <div
      className={styles.leftPositionTabs}
      style={{ minHeight, gridTemplateColumns: `${tabWidth} 1fr` }}
    >
      <div className={styles.tabMenuItems} style={{ width: tabWidth }}>
        {tabs?.map((tab) => {
          //TODO: add count and tags to ui

          return (
            <React.Fragment key={tab.name}>
              {(!tab.childTabs || tab.childTabs.length === 0) && (
                <div
                  className={classNames(
                    styles.tabMenuItem,
                    tab.key === activeTab ? styles.active : ''
                  )}
                  onClick={() => onActiveChanged?.(tab.key)}
                >
                  {tab.name}
                </div>
              )}
              {tab.childTabs && tab.childTabs.length > 0 && (
                <div
                  className={classNames(
                    styles.expandableItem,
                    activeTab && tab.childTabs.find((e) => e.key === activeTab)
                      ? styles.active
                      : ''
                  )}
                >
                  <Collapse
                    defaultActiveKey={getActiveKey(tab)}
                    expandIconPosition="right"
                  >
                    <Panel key={tab.key} header={<span>{tab.name}</span>}>
                      {tab.childTabs.map((childTab) => {
                        return (
                          <div
                            key={childTab.key}
                            className={classNames(
                              styles.tabMenuItem,
                              childTab.key === activeTab ? styles.active : ''
                            )}
                            onClick={() => onActiveChanged?.(childTab.key)}
                          >
                            {childTab.name}
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
              <TabPane tab={<span>{name}</span>} key={name}>
                {childTabs && childTabs.length > 0 && (
                  <Tabs
                    tabPosition={tabPosition}
                    onChange={(name) => onActiveChanged?.(name)}
                  >
                    {childTabs.map(({ key, name }) => (
                      <TabPane tab={<span>{name}</span>} key={key} />
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
