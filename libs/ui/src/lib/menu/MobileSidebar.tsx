import React, { FC, useState } from 'react'
import { Drawer, Menu } from 'antd'
import {
  Button,
  Search,
  Dropdown as AvatarDropDown,
  QuickCreate,
} from '@pabau/ui'
import styles from './MobileSidebar.module.less'
import classNames from 'classnames'
import {
  sidebarMenu,
  SidebarMenuItem,
  sidebarTranslations,
} from './SidebarMenu'
import {
  BellOutlined,
  CloseOutlined,
  MailOutlined,
  RightOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import Avatar from 'antd/lib/avatar/avatar'
import User from '../../assets/images/users/stephen.png'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { FullAuthenticationUser } from '@pabau/yup'

const { SubMenu } = Menu

interface P {
  searchRender?: (innerComponent: JSX.Element) => JSX.Element
  onSideBarClosed: () => void
  onClickNotificationDrawer: () => void
  onClickChatDrawer: () => void
  clientCreateRender?: () => JSX.Element
  leadCreateRender?: () => JSX.Element
  userData: FullAuthenticationUser
}

export const MobileSidebar: FC<P> = ({
  searchRender,
  onSideBarClosed,
  onClickNotificationDrawer,
  onClickChatDrawer,
  clientCreateRender,
  leadCreateRender,
  userData,
}) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [openProfileDrawer, setProfileDrawer] = useState<boolean>(false)

  const mobileSidebar: SidebarMenuItem[] = [
    {
      menuName: 'Notifications',
      icon: <BellOutlined />,
    },
    {
      menuName: 'Chat',
      icon: <MailOutlined />,
    },
  ]

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
  }

  const renderMenu = (index, menuName, icon, path) => {
    return (
      <Menu.Item
        key={index}
        icon={icon}
        onClick={() => onClickMenu({ key: index }, path)}
        className={styles.sidebarMenu}
      >
        {t(sidebarTranslations[menuName.toLowerCase().replace(' ', '')])}
      </Menu.Item>
    )
  }

  const onClickMenu = async (e, path = '') => {
    setSelectedKeys([e.key])
    if (e.key?.includes('Notifications') && e?.keyPath) {
      onClickNotificationDrawer()
    } else if (e.key?.includes('Chat') && e?.keyPath) {
      onClickChatDrawer()
    }
    if (e.key?.includes('Marketing')) {
      await router.push('/marketing/sources')
    }
    if (path) {
      router.push(path)
      if (router.pathname === path) onSideBarClosed?.()
    }
  }

  return (
    <Drawer
      visible={true}
      placement="left"
      closable={false}
      className={styles.mobileSidebar}
    >
      <div className={styles.mobileViewAlign}>
        <div className={styles.menuHeaderHeading}>
          <CloseOutlined
            className="menuHeaderIconColor"
            onClick={onSideBarClosed}
          />
          <p>{t('sidebar.mobile.menu')}</p>
        </div>
      </div>
      <div className={styles.searchBox}>
        {searchRender ? searchRender(<Search />) : <Search />}
      </div>
      <Menu
        className={styles.sidebar}
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        multiple={false}
        selectedKeys={selectedKeys}
        onClick={onClickMenu}
      >
        {sidebarMenu.map((menuData, index) => {
          return !menuData.children ? (
            renderMenu(
              menuData.menuName + index,
              menuData.menuName,
              menuData.icon,
              menuData?.path
            )
          ) : (
            <SubMenu
              key={menuData.menuName + index}
              icon={menuData.icon}
              title={t(
                sidebarTranslations[
                  menuData.menuName.toLowerCase().replace(' ', '')
                ]
              )}
              onTitleClick={onClickMenu}
              className={classNames(
                styles.sidebarSubMenu,
                selectedKeys.includes(menuData.menuName + index) &&
                  styles.subMenuActive
              )}
            >
              {menuData.children.map((subMenu, subIndex) => {
                return renderMenu(
                  subMenu.menuName + subIndex,
                  subMenu.menuName,
                  subMenu?.icon,
                  subMenu?.path
                )
              })}
            </SubMenu>
          )
        })}
        <div className={styles.divborder}></div>
        {mobileSidebar.map((menuData, index) => {
          return renderMenu(
            menuData.menuName + index,
            menuData.menuName,
            menuData.icon,
            menuData?.path
          )
        })}
        <Menu.Item
          className={classNames(styles.sidebarMenu, styles.profileMenu)}
          icon={<Avatar size={24} src={userData?.image || User} />}
          onClick={() => {
            setProfileDrawer(true)
          }}
        >
          {t('sidebar.mobile.profile')}
          <RightOutlined style={{ fontSize: '14px' }} />
        </Menu.Item>
        {openProfileDrawer && (
          <AvatarDropDown
            userData={userData}
            isOpen={openProfileDrawer}
            onCloseDrawer={() => setProfileDrawer((e) => !e)}
          />
        )}
        <div className={styles.buttonMenu}>
          <QuickCreate
            clientCreateRender={clientCreateRender}
            leadCreateRender={leadCreateRender}
          />
        </div>
        <div className={styles.buttonMenu}>
          <Link href="/setup">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a style={{ width: '100%' }}>
              <Button
                className={classNames(styles.buttonStyles, styles.setUpBtn)}
                icon={<SettingOutlined />}
              >
                {t('sidebar.setup')}
              </Button>
            </a>
          </Link>
        </div>
      </Menu>
    </Drawer>
  )
}

export default MobileSidebar
