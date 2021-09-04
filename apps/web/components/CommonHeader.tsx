import {
  LeftOutlined,
  MenuOutlined,
  PlusSquareFilled,
  SearchOutlined,
} from '@ant-design/icons'
import {
  MobileHeader,
  MobileSidebar,
  NotificationDrawer,
  SetupSearchInput,
} from '@pabau/ui'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { FC, ReactNode, useState } from 'react'
import Search from '../components/Search'
import { useUser } from '../context/UserContext'
import { useGridData } from '../hooks/useGridData'
import { useTranslationI18 } from '../hooks/useTranslationI18'
import styles from './Setup.module.less'

interface P {
  handleSearch?: (searchTerm: string) => void
  title?: string
  isShowSearch?: boolean
  isContent?: boolean
  ContentJsx?: () => JSX.Element
  isLeftOutlined?: boolean
  displayCreateButton?: boolean
  handleCreate?: () => void
  showChat?: boolean
  onChatClick?: () => void
  clientCreateRender?: () => JSX.Element
  leadCreateRender?: () => JSX.Element
  displayActivity?: boolean
  renderActivity?: ReactNode
}

const CommonHeader: FC<P> = ({
  handleSearch,
  title = 'Setup',
  isShowSearch,
  isContent,
  ContentJsx,
  isLeftOutlined = false,
  displayCreateButton = false,
  handleCreate,
  onChatClick,
  clientCreateRender,
  leadCreateRender,
  displayActivity = false,
  renderActivity,
}) => {
  const user = useUser()
  const [openMenuDrawer, setMenuDrawer] = useState<boolean>(false)
  const [openNotificationDrawer, setNotificationDrawer] = useState<boolean>(
    false
  )
  const [showSearch, setShowSearch] = useState(false)
  const { t } = useTranslationI18()
  const { getParentSetupData } = useGridData(t)
  const router = useRouter()

  const handleBack = () => {
    const parentMenu = getParentSetupData(router.pathname)

    if (parentMenu.length > 0) {
      router.push({
        pathname: '/setup',
        query: { menu: parentMenu[0]?.keyValue },
      })
    } else {
      router.push('/setup')
    }
  }

  return (
    <div className={classNames(styles.setupPage, styles.desktopViewNone)}>
      <MobileHeader className={styles.pabauMobileHeader}>
        <div className={styles.mobileViewAlign}>
          <div className={styles.mobileViewHeaderHeading}>
            {isLeftOutlined ? (
              <LeftOutlined onClick={handleBack} />
            ) : (
              <MenuOutlined
                className="menuHeaderIconColor"
                onClick={() => {
                  setMenuDrawer(() => !openMenuDrawer)
                }}
              />
            )}
            <p>{title}</p>
          </div>
          <div className={styles.rightContentWrapper}>
            {!isLeftOutlined && isShowSearch && (
              <div className={styles.searchInput}>
                {!showSearch ? (
                  <SearchOutlined
                    onClick={() => {
                      setShowSearch(true)
                    }}
                  />
                ) : (
                  <div className={styles.search}>
                    <SetupSearchInput
                      onChange={handleSearch}
                      placeholder={
                        isLeftOutlined ? t('integration.search') : ''
                      }
                    />
                  </div>
                )}
              </div>
            )}
            {isContent && <ContentJsx />}
          </div>
          {displayActivity && <div>{renderActivity}</div>}
          {displayCreateButton && (
            <div className={styles.createPlusIcon}>
              <PlusSquareFilled
                className={styles.plusIconStyle}
                onClick={() => handleCreate?.()}
              />
            </div>
          )}
        </div>
      </MobileHeader>
      {openMenuDrawer && (
        <MobileSidebar
          searchRender={() => <Search />}
          onSideBarClosed={() => setMenuDrawer(() => !openMenuDrawer)}
          onClickNotificationDrawer={() => setNotificationDrawer((e) => !e)}
          onClickChatDrawer={onChatClick}
          clientCreateRender={clientCreateRender}
          leadCreateRender={leadCreateRender}
          userData={user?.me}
        />
      )}
      {openNotificationDrawer && (
        <NotificationDrawer
          openDrawer={openNotificationDrawer}
          closeDrawer={() => setNotificationDrawer((e) => !e)}
        />
      )}
    </div>
  )
}

export default CommonHeader
