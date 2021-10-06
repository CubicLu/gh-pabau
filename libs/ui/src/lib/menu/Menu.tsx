import React, { FC, useState, useEffect } from 'react'
import { Badge, Layout, Menu as AntMenu, Tooltip } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { Button } from '../../index'
import styles from './Menu.module.less'
import classNames from 'classnames'
import Link from 'next/link'
import { sidebarMenu, sidebarTranslations } from './SidebarMenu'
import { useTranslation } from 'react-i18next'
const { SubMenu } = AntMenu
const { Sider } = Layout

interface P {
  active?: string
  badgeCountList?: BadgeCountList
  collapsedProp: boolean
}

interface BadgeCountList {
  [key: string]: number
}

export const Menu: FC<P> = ({ badgeCountList, collapsedProp }) => {
  const { t } = useTranslation('common')
  const [collapsed, setCollapsed] = useState(true)
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [activeMenu, setActive] = useState<string>(window.location.pathname)

  useEffect(() => {
    setCollapsed(!collapsedProp)
  }, [collapsedProp])

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
  }

  const renderMenu = (index, menuName, icon, path) => {
    return (
      <AntMenu.Item
        key={index}
        icon={icon}
        className={classNames(
          styles.sidebarMenu,
          activeMenu !== path && styles.removeSelected,
          activeMenu === path && styles.menuSelected,
          activeMenu === path && 'ant-menu-item-selected'
        )}
        onClick={() => setActive(path)}
      >
        <Link href={path}>
          {t(sidebarTranslations[menuName.toLowerCase().replace(' ', '')])}
        </Link>
      </AntMenu.Item>
    )
  }

  const sidebarBadge = {
    activities: badgeCountList?.activities,
  }

  return (
    <Sider
      trigger={null}
      className={classNames(styles.pabauSidebar, styles.mobileViewNone)}
      collapsed={collapsed}
      style={{
        overflowY: 'auto',
        height: 'calc(100vh - 80px)',
        position: 'fixed',
        left: 0,
        overflowX: 'hidden',
      }}
    >
      <AntMenu
        mode="inline"
        className={styles.sidebar}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        multiple={false}
      >
        {sidebarMenu.map((menuData, index) => {
          const icon = menuData?.displayBadge ? (
            <Badge
              className={styles.badgeIcon}
              count={
                sidebarBadge[menuData.menuName.toLowerCase().replace(' ', '')]
              }
              style={{ backgroundColor: '#54B2D3' }}
              showZero={false}
            >
              {menuData.icon}
            </Badge>
          ) : (
            menuData.icon
          )
          return !menuData.children ? (
            renderMenu(
              menuData.menuName + index,
              menuData.menuName,
              icon,
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
              className={classNames(
                menuData.children.map((e) => e.path).indexOf(activeMenu) !==
                  -1 && styles.subMenuActive
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
        <AntMenu.Item
          disabled
          className={styles.setupMenuItem}
          style={{ height: 'fit-content' }}
          key="setup"
        >
          <Tooltip title={collapsed ? t('sidebar.setup') : ''} placement="left">
            <div
              className={styles.sidebarBtnAlign}
              onClick={() => setActive('/setup')}
            >
              <Link href="/setup">
                {collapsed ? (
                  <SettingOutlined
                    className={`${
                      activeMenu === '/setup'
                        ? styles.activeSidebarMenu
                        : styles.sidebarMenu
                    }`}
                  />
                ) : (
                  <Button
                    icon={
                      <SettingOutlined
                        className={`${
                          activeMenu === '/setup'
                            ? styles.activeSidebarMenu
                            : styles.sidebarMenu
                        }`}
                      />
                    }
                    className={`${styles.setupBtn} ${
                      activeMenu === '/setup' ? styles.setupBtnActive : null
                    }`}
                  >
                    {t('sidebar.setup')}
                  </Button>
                )}
              </Link>
            </div>
          </Tooltip>
        </AntMenu.Item>
      </AntMenu>
    </Sider>
  )
}

export default Menu
