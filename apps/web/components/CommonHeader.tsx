import {
  CloseCircleFilled,
  LeftOutlined,
  MenuOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { MobileSidebar, NotificationDrawer } from '@pabau/ui'
import { ReactComponent as CloseIcon } from '../assets/images/close-icon.svg'
import { Layout as AntLayout, Input } from 'antd'
import React, { FC, useState, useEffect, ReactNode } from 'react'
import { useUser } from '../context/UserContext'
import { getImage } from './Uploaders/UploadHelpers/UploadHelpers'
import Search from '../components/Search'
import Chat from '../components/Chat/Chat'
import { useTranslationI18 } from '../hooks/useTranslationI18'
import styles from './CommonHeader.module.less'
import Link from 'next/link'
import router from 'next/router'
import classNames from 'classnames'
const AntHeader = AntLayout.Header

interface P {
  title?: string
  isShowSearch?: boolean
  searchValue?: string
  searchInputPlaceHolder?: string
  reversePath?: string
  handleSearch?: (searchTerm: string) => void
  isLeftOutlined?: boolean
  showChat?: boolean
  clientCreateRender?: (handleClose?: () => void) => JSX.Element
  leadCreateRender?: (handleClose?: () => void) => JSX.Element
  displayActivity?: boolean
  renderActivity?: ReactNode
  isShowMenuDrawer?: boolean
}

const CommonHeader: FC<P> = ({
  handleSearch,
  title = 'Pabau',
  reversePath = '/',
  searchInputPlaceHolder,
  isShowSearch = false,
  searchValue,
  isLeftOutlined = false,
  children = null,
  clientCreateRender,
  leadCreateRender,
  displayActivity = false,
  renderActivity,
  isShowMenuDrawer = true,
}) => {
  const user = useUser()
  const [showChat, setShowChat] = useState(false)
  const [openMenuDrawer, setMenuDrawer] = useState<boolean>(false)
  const [openNotificationDrawer, setNotificationDrawer] = useState<boolean>(
    false
  )
  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { t } = useTranslationI18()

  useEffect(() => {
    setSearchTerm(searchValue)
  }, [searchValue])

  return (
    <div className={styles.desktopViewNone}>
      <AntHeader className={styles.pabauCommonHeader}>
        <div className={styles.mobileViewAlign}>
          {!showSearch && (
            <div
              className={classNames(
                styles.commonHeaderHeading,
                !isShowSearch && !children ? styles.w100 : styles.w50
              )}
            >
              {isLeftOutlined ? (
                // <Link href={reversePath}>
                <button
                  className={styles.btnOuterWrapper}
                  onClick={() => {
                    setTimeout(() => router.push(reversePath), 120)
                  }}
                >
                  <LeftOutlined />
                </button>
              ) : (
                // </Link>
                isShowMenuDrawer && (
                  <MenuOutlined
                    className={styles.menuHeaderIconColor}
                    onClick={() => {
                      setMenuDrawer(() => !openMenuDrawer)
                    }}
                  />
                )
              )}
              <p className={!isShowSearch && !children && styles.centeredTitle}>
                {title}
              </p>
            </div>
          )}
          {(isShowSearch || children) && (
            <div
              className={classNames(
                styles.rightContentWrapper,
                (!isShowSearch && !children) || showSearch
                  ? styles.w100
                  : styles.w50
              )}
            >
              {isShowSearch && (
                <div className={styles.searchInput}>
                  {!showSearch ? (
                    <SearchOutlined
                      onClick={() => {
                        setShowSearch(() => true)
                      }}
                      className={classNames(
                        styles.marketingIconStyle,
                        children && styles.paddingRight
                      )}
                    />
                  ) : (
                    <div className={styles.searchInput}>
                      {isLeftOutlined ? (
                        <Link href={reversePath}>
                          <LeftOutlined />
                        </Link>
                      ) : (
                        isShowMenuDrawer && (
                          <MenuOutlined
                            className={styles.menuHeaderIconColor}
                            onClick={() => {
                              setMenuDrawer(() => !openMenuDrawer)
                            }}
                          />
                        )
                      )}
                      <Input
                        value={searchTerm}
                        className={styles.searchStyle}
                        placeholder={
                          searchInputPlaceHolder ||
                          t('basic-crud-table-input-search-placeholder')
                        }
                        onChange={(e) => {
                          setSearchTerm(e.target.value)
                          handleSearch?.(e.target.value)
                        }}
                        suffix={
                          searchTerm ? (
                            <CloseCircleFilled
                              className={styles.closeIcon}
                              onClick={() => {
                                setSearchTerm('')
                                handleSearch?.('')
                              }}
                            />
                          ) : (
                            <CloseIcon
                              onClick={() => {
                                setShowSearch(() => false)
                              }}
                            />
                          )
                        }
                        autoFocus
                      />
                    </div>
                  )}
                </div>
              )}
              {!showSearch && children}
              {displayActivity && <div>{renderActivity}</div>}
            </div>
          )}
        </div>
      </AntHeader>
      {openMenuDrawer && (
        <MobileSidebar
          searchRender={() => <Search />}
          onSideBarClosed={() => setMenuDrawer(() => !openMenuDrawer)}
          onClickNotificationDrawer={() => setNotificationDrawer((e) => !e)}
          onClickChatDrawer={() => setShowChat(() => true)}
          clientCreateRender={clientCreateRender}
          leadCreateRender={leadCreateRender}
          onLogout={user?.logout}
          userData={{
            company: user?.me?.company,
            user: user?.me?.user,
            fullName: user?.me?.full_name,
            companyName: user?.me?.companyName,
            imageUrl: getImage(user?.me?.imageUrl),
            ...user?.me,
          }}
        />
      )}
      {openNotificationDrawer && (
        <NotificationDrawer
          openDrawer={openNotificationDrawer}
          closeDrawer={() => setNotificationDrawer((e) => !e)}
        />
      )}
      <Chat closeDrawer={() => setShowChat(false)} visible={showChat} />
    </div>
  )
}

export default CommonHeader
