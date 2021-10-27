import React, { FC, useRef, useState } from 'react'
import { useMedia } from 'react-use'
import _ from 'lodash'
import cn from 'classnames'
import moment from 'moment'
import { Popover, Drawer, Tooltip } from 'antd'
import {
  MoreOutlined,
  EditOutlined,
  ExceptionOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
import { MyLottie as Lottie, Table, TabMenu } from '@pabau/ui'
import emptyState from '../../assets/lottie/empty-state.json'
import { ReactComponent as GridView } from '../../assets/images/client-card/package/grid-view.svg'
import { ReactComponent as ListView } from '../../assets/images/client-card/package/list-view.svg'
import styles from './ClientPackagesLayout.module.less'

type ViewMode = 'list' | 'grid'

export interface ClientPackageItem {
  id: string
  thumbnail: string
  avatar: string
  packageName: string
  packageUsage: number
  expDate: string
  actDate: string
  valueEach: number
  used: number
  invoice: number
  lastSaw: string
  lastVisited: string
}
export interface ClientPackagesLayoutProps {
  items: ClientPackageItem[]
  handleSendEmail?: (type) => void
}

interface GridItemProps {
  item: ClientPackageItem
  expired: boolean
}

const defaultPackageItem: ClientPackageItem = {
  id: '',
  thumbnail: '',
  avatar: '',
  packageName: '',
  packageUsage: 0,
  expDate: '',
  actDate: '',
  valueEach: 0,
  used: 0,
  invoice: 0,
  lastSaw: '',
  lastVisited: '',
}

export const ClientPackagesLayout: FC<ClientPackagesLayoutProps> = ({
  items,
  handleSendEmail,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const isMobile = useMedia('(max-width: 767px)', false)
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [currentItem, setCurrentItem] =
    useState<ClientPackageItem>(defaultPackageItem)

  const [openActions, setOpenActions] = useState(false)
  const [openPopover, setOpenPopover] = useState(false)
  const [openNormalDrawer, setOpenNormalDrawer] = useState(false)
  const [openExpiredDrawer, setOpenExpiredDrawer] = useState(false)

  const tableItemActionPopover = (expired: boolean) => (
    <div className={styles.tableItemActionPopoverContainer}>
      {!expired ? (
        <div className={styles.text}>Send reminder</div>
      ) : (
        <>
          <div className={styles.changeHistory}>
            <div className={styles.icon}>
              <EditOutlined />
            </div>
            <div className={styles.text}>Change expiry</div>
          </div>
          <div className={styles.void}>
            <div className={styles.icon}>
              <ExceptionOutlined />
            </div>
            <div className={styles.text}>Void</div>
          </div>
        </>
      )}
    </div>
  )

  const mobileDrawer = (expired: boolean, item) => {
    if (expired) {
      return (
        <div
          className={styles.moreIcon}
          onClick={() => {
            setOpenExpiredDrawer(true)
            setCurrentItem(item)
          }}
        >
          <MoreOutlined />
        </div>
      )
    } else {
      return (
        <div
          className={styles.moreIcon}
          onClick={() => {
            setOpenNormalDrawer(true)
            setCurrentItem(item)
          }}
        >
          <MoreOutlined />
        </div>
      )
    }
  }

  const infoTooltip = (item: ClientPackageItem) => {
    const purchaseDate = moment(item.actDate).format('DD/MM/YYYY')
    const daysFromLastVisited = moment().diff(item.lastVisited, 'days')
    return (
      <div className={styles.infoTooltip}>
        <p>Purchased on: {purchaseDate}</p>
        <p>Booking frequency: every 5 weeks</p>
        <p>Last saw: {item.lastSaw}</p>
        <p>Last visited: {daysFromLastVisited} days ago</p>
      </div>
    )
  }

  const GridItem = ({ item, expired }: GridItemProps) => {
    const { id, thumbnail, avatar, packageName, packageUsage, used } = item

    const [hover, setHover] = useState(false)

    return (
      <div className={styles.gridItem}>
        <div
          className={styles.packageImage}
          style={{ backgroundImage: `url(${thumbnail})` }}
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Tooltip placement="bottomLeft" title={infoTooltip(item)}>
            <div className={styles.infoIcon}>
              <InfoCircleOutlined />
            </div>
          </Tooltip>
          {isMobile ? (
            hover || (openPopover && currentItem.id === id) ? (
              moment().diff(item.lastVisited, 'days') >= 90 ? (
                <div
                  className={styles.redIcon}
                  onClick={() => handleSendEmail?.('email')}
                ></div>
              ) : (
                mobileDrawer(expired, item)
              )
            ) : null
          ) : moment().diff(item.lastVisited, 'days') >= 90 ? (
            hover ? (
              <div
                className={styles.redIcon}
                onClick={() => handleSendEmail?.('email')}
              ></div>
            ) : null
          ) : (
            <Popover
              placement="bottomLeft"
              overlayClassName={cn(
                styles.tableItemActionPopover,
                currentItem.id !== id ? styles.hidePopover : ''
              )}
              content={tableItemActionPopover(expired)}
              trigger="click"
              visible={openPopover}
              onVisibleChange={(visible) => setOpenPopover(visible)}
            >
              {(hover || (openPopover && currentItem.id === id)) && (
                <div
                  className={styles.moreIcon}
                  onClick={() => {
                    setOpenPopover(true)
                    setCurrentItem(item)
                  }}
                >
                  <MoreOutlined />
                </div>
              )}
            </Popover>
          )}
        </div>
        <div className={styles.gridPackageName}>{packageName}</div>
        <div
          className={cn(
            styles.gridPackageUsage,
            expired
              ? styles.red
              : packageUsage - used === 1
              ? styles.orange
              : styles.green
          )}
        >{`${used}/${packageUsage}`}</div>
        <div className={styles.gridPackageProgress}>
          {_.times(used).map((_item, index) => (
            <Tooltip
              key={`used-item-${index}`}
              title="William Brandham - redeemed on 23/10/2021"
            >
              <div className={styles.usedItem}>
                <div
                  className={styles.greenSession}
                  style={{ backgroundImage: `url(${avatar})` }}
                />
              </div>
            </Tooltip>
          ))}
          {_.times(packageUsage - used).map((_item, index) => (
            <div key={`remain-item-${index}`}>
              <div
                className={
                  packageUsage - used === 1
                    ? styles.lastSession
                    : styles.greenSession
                }
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  const columns = [
    {
      title: 'Name',
      visible: true,
      width: isMobile ? '135px' : '182px',
      render: (data) => {
        const { packageName, packageUsage } = data
        return `${packageName} (${packageUsage})`
      },
    },
    {
      title: 'Invoice',
      visible: true,
      width: '92px',
      render: (data) => {
        const { invoice } = data
        return `£${Number(invoice).toFixed(2)}`
      },
    },
    {
      title: 'Used',
      visible: true,
      // eslint-disable-next-line react/display-name
      render: (data: ClientPackageItem) => {
        const { used, packageUsage } = data
        return (
          <div className={styles.usedField}>
            <div>{`${used} / ${packageUsage}`}</div>
            {_.times(used).map((_item, index) => (
              <div key={`used-item-${index}`} className={styles.usedItem} />
            ))}
            {_.times(packageUsage - used).map((_item, index) => (
              <div
                key={`remain-item-${index}`}
                className={
                  packageUsage - used === 1
                    ? styles.lastSession
                    : styles.remainItem
                }
              />
            ))}
          </div>
        )
      },
    },
    {
      title: 'Act. Date',
      visible: true,
      width: '105px',
      // eslint-disable-next-line react/display-name
      render: (data) => {
        const { actDate } = data
        return (
          <span className={styles.tableDate}>
            {moment(actDate).format('DD/MM/YYYY')}
          </span>
        )
      },
    },
    {
      title: 'Exp. Date',
      visible: true,
      width: '105px',
      // eslint-disable-next-line react/display-name
      render: (data) => {
        const { expDate } = data
        return (
          <span className={styles.tableDate}>
            {moment(expDate).format('DD/MM/YYYY')}
          </span>
        )
      },
    },
    {
      title: 'Value Each',
      visible: true,
      width: '92px',
      render: (data) => {
        const { valueEach } = data
        return `£${Number(valueEach).toFixed(2)}`
      },
    },
    {
      title: '',
      visible: true,
      width: '80px',
      // eslint-disable-next-line react/display-name
      render: (data) =>
        isMobile ? (
          mobileDrawer(isExpired(data), data)
        ) : (
          <Popover
            placement="bottomLeft"
            overlayClassName={cn(
              styles.tableItemActionPopover,
              currentItem.id !== data.id ? styles.hidePopover : ''
            )}
            content={tableItemActionPopover(isExpired(data))}
            trigger="click"
            visible={openPopover}
            onVisibleChange={(visible) => setOpenPopover(visible)}
          >
            <div
              className={styles.tableItemAction}
              onClick={() => {
                setOpenPopover(true)
                setCurrentItem(data)
              }}
            >
              <MoreOutlined />
            </div>
          </Popover>
        ),
    },
  ]

  const isExpired = (item: ClientPackageItem) => {
    return moment().isAfter(moment(item.expDate))
  }

  return (
    <div className={styles.clientLayout} ref={ref}>
      {items.length === 0 && (
        <Lottie
          options={{
            loop: true,
            autoPlay: true,
            animationData: emptyState,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
          }}
        />
      )}
      {items.length > 0 && (
        <>
          {!isMobile && (
            <div className={styles.viewModes}>
              <div
                className={cn(
                  styles.gridView,
                  viewMode === 'grid' ? styles.selected : ''
                )}
                onClick={() => setViewMode('grid')}
              >
                <GridView />
              </div>
              <div
                className={cn(
                  styles.listView,
                  viewMode === 'list' ? styles.selected : ''
                )}
                onClick={() => setViewMode('list')}
              >
                <ListView />
              </div>
            </div>
          )}
          <div className={styles.tabsContainer}>
            <TabMenu
              tabPosition="top"
              menuItems={[
                `Active (${items.filter((el) => !isExpired(el)).length})`,
                `Expired (${items.filter((el) => isExpired(el)).length})`,
              ]}
              minHeight="1px"
            >
              <div className={styles.packageItems}>
                {isMobile && (
                  <div className={styles.packageItemsHeader}>
                    <div
                      className={cn(
                        styles.gridView,
                        viewMode === 'grid' ? styles.selected : ''
                      )}
                      onClick={() => setViewMode('grid')}
                    >
                      <GridView />
                    </div>
                    <div
                      className={cn(
                        styles.listView,
                        viewMode === 'list' ? styles.selected : ''
                      )}
                      onClick={() => setViewMode('list')}
                    >
                      <ListView />
                    </div>
                  </div>
                )}
                {viewMode === 'list' && (
                  <Table
                    columns={columns}
                    scroll={{ x: 'max-content' }}
                    dataSource={items.filter((el) => !isExpired(el))}
                    pagination={false}
                  />
                )}
                {viewMode === 'grid' && (
                  <div className={styles.gridItemsContainer}>
                    {items
                      .filter((el) => !isExpired(el))
                      .map((item, index) => (
                        <GridItem
                          item={item}
                          key={`grid-item-${index}`}
                          expired={false}
                        />
                      ))}
                  </div>
                )}
              </div>
              <div className={styles.packageItems}>
                {isMobile && (
                  <div className={styles.packageItemsHeader}>
                    <div
                      className={cn(
                        styles.gridView,
                        viewMode === 'grid' ? styles.selected : ''
                      )}
                      onClick={() => setViewMode('grid')}
                    >
                      <GridView />
                    </div>
                    <div
                      className={cn(
                        styles.listView,
                        viewMode === 'list' ? styles.selected : ''
                      )}
                      onClick={() => setViewMode('list')}
                    >
                      <ListView />
                    </div>
                  </div>
                )}
                {viewMode === 'list' && (
                  <Table
                    columns={columns}
                    scroll={{ x: 'max-content' }}
                    dataSource={items.filter((el) => isExpired(el))}
                    pagination={false}
                  />
                )}
                {viewMode === 'grid' && (
                  <div className={styles.gridItemsContainer}>
                    {items
                      .filter((el) => isExpired(el))
                      .map((item, index) => (
                        <GridItem
                          item={item}
                          key={`grid-item-${index}`}
                          expired={true}
                        />
                      ))}
                  </div>
                )}
              </div>
            </TabMenu>
          </div>
        </>
      )}
      {isMobile && (
        <>
          <Drawer
            visible={openNormalDrawer}
            placement="bottom"
            closable={false}
            onClose={() => setOpenNormalDrawer(false)}
            className={styles.packageItemDrawer}
          >
            <div className={styles.packageItemDrawerHeader}>
              <div
                className={styles.handler}
                onClick={() => setOpenNormalDrawer(false)}
              />
            </div>
            <div className={styles.packageItemDrawerBody}>
              {tableItemActionPopover(false)}
            </div>
          </Drawer>
          <Drawer
            visible={openExpiredDrawer}
            placement="bottom"
            closable={false}
            onClose={() => setOpenExpiredDrawer(false)}
            className={styles.packageItemDrawer}
          >
            <div className={styles.packageItemDrawerHeader}>
              <div
                className={styles.handler}
                onClick={() => setOpenExpiredDrawer(false)}
              />
            </div>
            <div className={styles.packageItemDrawerBody}>
              {tableItemActionPopover(true)}
            </div>
          </Drawer>
        </>
      )}
    </div>
  )
}

export default ClientPackagesLayout
