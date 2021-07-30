import {
  CloseCircleFilled,
  LeftOutlined,
  MenuOutlined,
  PlusSquareFilled,
  SearchOutlined,
} from '@ant-design/icons'
import { MobileSidebar, NotificationDrawer } from '@pabau/ui'
import { ReactComponent as CloseIcon } from '../assets/images/close-icon.svg'
import { Layout as AntLayout, Input } from 'antd'
import React, { FC, useState } from 'react'
import Search from '../components/Search'
import { useTranslationI18 } from '../hooks/useTranslationI18'
import styles from './MobileHeader.module.less'
import Link from 'next/link'
const AntHeader = AntLayout.Header

interface P {
  title?: string
  isShowSearch?: boolean
  searchInputPlaceHolder?: string
  parent?: string
  handleSearch?: (searchTerm: string) => void
  displayCreateButton?: boolean
  handleCreate?: () => void
  showChat?: boolean
}

const MobileHeader: FC<P> = ({
  handleSearch,
  title = 'Pabau',
  parent = null,
  searchInputPlaceHolder,
  isShowSearch = false,
  displayCreateButton = false,
  handleCreate,
  children = null,
}) => {
  const [openMenuDrawer, setMenuDrawer] = useState<boolean>(false)
  const [openNotificationDrawer, setNotificationDrawer] = useState<boolean>(
    false
  )
  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { t } = useTranslationI18()

  return (
    <div className={styles.desktopViewNone}>
      <AntHeader className={styles.pabauCommonHeader}>
        <div className={styles.mobileViewAlign}>
          <div className={styles.commonHeaderHeading}>
            {parent ? (
              <Link href={parent || '/'}>
                <LeftOutlined />
              </Link>
            ) : (
              <MenuOutlined
                className={styles.menuHeaderIconColor}
                onClick={() => {
                  setMenuDrawer(() => !openMenuDrawer)
                }}
              />
            )}
            <p className={!isShowSearch && !children && styles.centeredTitle}>
              {title}
            </p>
          </div>
          {(isShowSearch || children) && (
            <div className={styles.rightContentWrapper}>
              {isShowSearch && (
                <div className={styles.searchInput}>
                  {!showSearch ? (
                    <SearchOutlined
                      onClick={() => {
                        setShowSearch(() => true)
                      }}
                      sizes={'large'}
                    />
                  ) : (
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
                  )}
                </div>
              )}
              {!showSearch && children}
            </div>
          )}
          {displayCreateButton && (
            <div className={styles.createPlusIcon}>
              <PlusSquareFilled
                className={styles.plusIconStyle}
                onClick={() => handleCreate?.()}
              />
            </div>
          )}
        </div>
      </AntHeader>
      {openMenuDrawer && (
        <MobileSidebar
          searchRender={() => <Search />}
          onSideBarClosed={() => setMenuDrawer(() => !openMenuDrawer)}
          onClickNotificationDrawer={() => setNotificationDrawer((e) => !e)}
          onClickChatDrawer={() => {
            //TODO:
            // setMessageDrawer((e) => !e)
          }}
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

export default MobileHeader
