import React, { FC } from 'react'
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
import Flag from '../../../assets/images/united-kingdom.png'

const { SubMenu } = AntMenu
const { Sider } = Layout

const Index: FC = () => {
  const { t } = useTranslation('common')

  const renderMenuItem = (item, index) => {
    return (
      <AntMenu.Item key={index} icon={item.icon} className={'divider-item'}>
        <Link href={item?.path}>
          <span>
            {t(
              setupMenuTranslation[
                item?.menuName?.toLowerCase()?.replace(' ', '')
              ]
            )}{' '}
            <i className={'ant-menu-submenu-arrow'} />
          </span>
        </Link>
      </AntMenu.Item>
    )
  }

  const renderSubMenu = (item, index) => {
    return (
      <SubMenu
        key={`${item.menuName}${index}`}
        icon={item.icon}
        title={t(
          setupMenuTranslation[item?.menuName?.toLowerCase()?.replace(' ', '')]
        )}
        className={'divider-item'}
      >
        {item?.children?.map((subitem, subIndex) => {
          return renderMenuItem(subitem, subIndex)
        })}
      </SubMenu>
    )
  }

  return (
    <Sider
      trigger={null}
      className={styles.pabauSidebar}
      style={{
        overflowY: 'auto',
        height: 'calc(100vh - 80px)',
        position: 'fixed',
        left: 0,
        overflowX: 'hidden',
      }}
    >
      <AntMenu>
        {setupMenu?.map((item, index) => {
          return item?.children?.length > 0
            ? renderSubMenu(item, index)
            : renderMenuItem(item, index)
        })}
      </AntMenu>
      <div className={styles.antMenuitem}>SETUP</div>
      <AntMenu style={{ borderTop: '1px solid #ecedf0', paddingTop: '0' }}>
        {SetupMiddleMenu?.map((item, index) => {
          return item?.children?.length > 0
            ? renderSubMenu(item, index)
            : renderMenuItem(item, index)
        })}
      </AntMenu>
      <AntMenu
        style={{
          margin: '40px 0',
          borderTop: '1px solid #ecedf0',
          paddingTop: '0',
        }}
      >
        <AntMenu.Item key={'language'} className={'divider-item'}>
          <span>
            <img src={Flag} alt={'language'} style={{ marginRight: '8px' }} />{' '}
            English
            <i className={'ant-menu-submenu-arrow'} />
          </span>
        </AntMenu.Item>
        {SetupBottomMenu?.map((item, index) => {
          return item?.children?.length > 0
            ? renderSubMenu(item, index)
            : renderMenuItem(item, index)
        })}
        <AntMenu.Item key={'logout'} style={{ color: 'red' }}>
          <span>
            Logout <i className={'ant-menu-submenu-arrow'} />
          </span>
        </AntMenu.Item>
      </AntMenu>
    </Sider>
  )
}

export default Index
