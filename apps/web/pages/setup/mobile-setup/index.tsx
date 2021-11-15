import React, { FC, useState } from 'react'
import { Layout, Menu as AntMenu } from 'antd'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import styles from './index.module.less'
import {
  setupMenu,
  SetupBottomMenu,
  setupMenuTranslation,
  SetupMiddleMenu,
} from '../../../components/Setup/MobileSetup/SetupMenu'
import classNames from 'classnames'
import { Avatar } from '@pabau/ui'
import { RightOutlined } from '@ant-design/icons'
import Flag from '../../../assets/images/united-kingdom.png'

const { SubMenu } = AntMenu
const { Sider } = Layout

const Index: FC = () => {
  const { t } = useTranslation('common')
  const [user] = useState('William Brandham')
  const [activeMenu, setActive] = useState<string>('')

  const renderMenuItem = (item, index, length, isSubMenu = false) => {
    return (
      <AntMenu.Item
        key={`${item?.menuName}${index}`}
        icon={item.icon}
        className={classNames(
          styles.sidebarMenu,
          item?.path && activeMenu !== item?.path && styles.removeSelected,
          item?.path && activeMenu === item?.path && styles.menuSelected,
          item?.path && activeMenu === item?.path && 'ant-menu-item-selected'
        )}
        style={{
          borderBottom:
            isSubMenu && length - 1 === index ? '0px' : '1px solid #ecedf0',
        }}
        onClick={() => setActive(item?.path)}
      >
        <Link href={item?.path}>
          <span>
            {t(
              setupMenuTranslation[
                item?.menuName?.toLowerCase()?.replace(' ', '')
              ]
            )}{' '}
            {isSubMenu ? null : <i className={'ant-menu-submenu-arrow'} />}
          </span>
        </Link>
      </AntMenu.Item>
    )
  }

  const renderSubMenu = (item, index) => {
    return (
      <SubMenu
        key={`${item.menuName}${index}`}
        icon={
          <div className={styles.contentWrapper}>
            {item.icon}
            <span>
              {t(
                setupMenuTranslation[
                  item?.menuName?.toLowerCase()?.replace(' ', '')
                ]
              )}
            </span>
            <RightOutlined className={styles.customIcon} />
          </div>
        }
        className={classNames(
          item.children.map((e) => e.path).indexOf(activeMenu) !== -1 &&
            styles.subMenuActive
        )}
      >
        {item?.children?.map((subitem, subIndex) => {
          return renderMenuItem(subitem, subIndex, item?.children?.length, true)
        })}
      </SubMenu>
    )
  }

  return (
    <Sider
      trigger={null}
      className={classNames(styles.pabauSidebar)}
      style={{
        overflowY: 'auto',
        height: 'calc(100vh - 80px)',
        position: 'fixed',
        left: 0,
        overflowX: 'hidden',
      }}
    >
      <div className={styles.header}>
        <div
          className={styles.block}
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <span className={styles.avatarWrapper}>
            <Avatar name={user} />
          </span>
        </div>
        <div className={styles.block}>
          <div>{user}</div>
          <div>Pabau</div>
        </div>
      </div>
      <div style={{ padding: '0px 16px' }}>
        <AntMenu mode="inline" className={styles.sidebar}>
          {setupMenu?.map((item, index) => {
            return item?.children?.length > 0
              ? renderSubMenu(item, index)
              : renderMenuItem(item, index, 0)
          })}
        </AntMenu>
        <div className={styles.antMenuitem}>SETUP</div>
        <AntMenu
          style={{ borderTop: '1px solid #ecedf0', paddingTop: '0' }}
          mode="inline"
          className={styles.sidebar}
        >
          {SetupMiddleMenu?.map((item, index) => {
            return item?.children?.length > 0
              ? renderSubMenu(item, index)
              : renderMenuItem(item, index, 0)
          })}
        </AntMenu>
        <AntMenu
          mode="inline"
          className={styles.sidebar}
          style={{
            margin: '40px 0',
            borderTop: '1px solid #ecedf0',
            paddingTop: '0',
          }}
        >
          <AntMenu.Item key={'language'}>
            <span>
              <img src={Flag} alt={'language'} style={{ marginRight: '8px' }} />{' '}
              English
              <i className={'ant-menu-submenu-arrow'} />
            </span>
          </AntMenu.Item>
          {SetupBottomMenu?.map((item, index) => {
            return item?.children?.length > 0
              ? renderSubMenu(item, index)
              : renderMenuItem(item, index, 0)
          })}
          <AntMenu.Item key={'logout'} style={{ color: 'red' }}>
            <span>
              Logout <i className={'ant-menu-submenu-arrow'} />
            </span>
          </AntMenu.Item>
        </AntMenu>
      </div>
    </Sider>
  )
}

export default Index
