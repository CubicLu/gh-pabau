import { Collapse, Tabs, Tag, Tooltip } from 'antd'
import classNames from 'classnames'
import React, { FC, useEffect, useState } from 'react'
import styles from './CustomTabMenu.module.less'

const { Panel } = Collapse
const { TabPane } = Tabs

interface TagValue {
  color: string
  tag: string | number
}
export interface TabItem {
  key: string
  name: string
  count?: number
  tags?: readonly TagValue[]
  childTabs?: readonly TabItem[]
}

interface P {
  tabPosition: 'top' | 'left'
  tabWidth: string
  tabs: Readonly<TabItem[]>
  activeTab: string
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

  const findParentActiveKey = (
    obj: Readonly<TabItem[]>,
    val: string
  ): string => {
    let final = ''
    for (const ob of obj) {
      if (val === ob.key) {
        final = ob.key
      } else if (ob.childTabs && ob.childTabs.length > 0) {
        const index = ob.childTabs.findIndex((el) => el.key === val)
        if (index !== -1) {
          final = ob.key
        }
      }
    }
    return final
  }

  const LeftPositionTabs = (
    <div
      className={styles.leftPositionTabs}
      style={{ minHeight, gridTemplateColumns: `${tabWidth} 1fr` }}
    >
      <div className={styles.tabMenuItems} style={{ flex: 1 }}>
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
                  <div className={styles.titleCountWrapper}>
                    {tab.name}
                    {Object.keys(tab).includes('count') && (
                      <div className={styles.countWrapper}>
                        <div className={styles.countContainer}>{tab.count}</div>
                      </div>
                    )}

                    {tab?.tags !== undefined &&
                      tab?.tags.length > 0 &&
                      tab?.tags.map((tag, key) => {
                        return (
                          <Tag
                            style={{ marginLeft: 10 }}
                            key={key}
                            color={tag.color}
                          >
                            {tag.tag}
                          </Tag>
                        )
                      })}
                  </div>
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
      <div className={styles.tabPaneItems} style={{ flex: 4 }}>
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
          onChange={(key) => {
            const clickedTab = tabs?.find((el) => el?.key === key)
            if (!clickedTab?.childTabs || clickedTab?.childTabs?.length === 0) {
              onActiveChanged?.(key)
            } else if (clickedTab?.childTabs?.length > 0) {
              const existedInd = clickedTab?.childTabs?.findIndex(
                (el) => el?.key === activeTab
              )
              if (existedInd === -1) {
                onActiveChanged?.(clickedTab?.childTabs?.[0]?.key)
              }
            }
          }}
          defaultActiveKey={findParentActiveKey(tabs, activeTab || 'dashboard')}
        >
          {tabs?.map((tab) => {
            const { childTabs, name, key } = tab
            return (
              <TabPane tab={<span>{name}</span>} key={key}>
                {childTabs && childTabs.length > 0 && (
                  <Tabs
                    defaultActiveKey={findParentActiveKey(
                      childTabs,
                      activeTab || 'dashboard'
                    )}
                    tabPosition={tabPosition}
                    onChange={(ky) => {
                      const clickedTab = tabs?.find((el) => el?.name === name)
                      const clickedTabChild = clickedTab?.childTabs?.find(
                        (el) => el.key === ky
                      )
                      if (clickedTabChild?.key) {
                        onActiveChanged?.(ky)
                      }
                    }}
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
        <div className={styles.tabPaneItem}>{children}</div>
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
