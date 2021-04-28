import { MenuOutlined, SearchOutlined } from '@ant-design/icons'
import {
  MobileHeader,
  MobileSidebar,
  NotificationDrawer,
  PabauMessages,
  SetupSearchInput,
} from '@pabau/ui'
import classNames from 'classnames'
import React, { FC, useState } from 'react'
import Search from '../components/Search'
import styles from './Setup.module.less'

interface P {
  handleSearch?: (searchTerm: string) => void
  title?: string
}

const CommonHeader: FC<P> = ({ handleSearch, title = 'Setup' }) => {
  const [openMenuDrawer, setMenuDrawer] = useState<boolean>(false)
  const [openNotificationDrawer, setNotificationDrawer] = useState<boolean>(
    false
  )
  const [openMessageDrawer, setMessageDrawer] = useState<boolean>(false)
  const [showSearch, setShowSearch] = useState(false)

  return (
    <div className={classNames(styles.setupPage, styles.desktopViewNone)}>
      <MobileHeader className={styles.pabauMobileHeader}>
        <div className={styles.mobileViewAlign}>
          <div className={styles.mobileViewHeaderHeading}>
            <MenuOutlined
              className="menuHeaderIconColor"
              onClick={() => {
                setMenuDrawer(() => !openMenuDrawer)
              }}
            />
            <p>{title}</p>
          </div>
          <div className={styles.searchInput}>
            {!showSearch ? (
              <SearchOutlined
                onClick={() => {
                  setShowSearch(true)
                }}
              />
            ) : (
              <div className={styles.search}>
                <SetupSearchInput onChange={handleSearch} />
              </div>
            )}
          </div>
        </div>
      </MobileHeader>
      {openMenuDrawer && (
        <MobileSidebar
          searchRender={() => <Search />}
          onSideBarClosed={() => setMenuDrawer(() => !openMenuDrawer)}
          onClickNotificationDrawer={() => setNotificationDrawer((e) => !e)}
          onClickChatDrawer={() => setMessageDrawer((e) => !e)}
        />
      )}
      {openNotificationDrawer && (
        <NotificationDrawer
          openDrawer={openNotificationDrawer}
          closeDrawer={() => setNotificationDrawer((e) => !e)}
        />
      )}
      {openMessageDrawer && (
        <PabauMessages
          openDrawer={openMessageDrawer}
          closeDrawer={() => setMessageDrawer((e) => !e)}
        />
      )}
    </div>
  )
}

export default CommonHeader
