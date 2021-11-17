import {
  BellOutlined,
  CalendarOutlined,
  CloseOutlined,
  DownOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, AvatarStatus } from '@pabau/ui'
import { Drawer, Image, Popover } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import connectLogo from '../../assets/images/connect-logo.png'
import { ReactComponent as PabauLogo } from '../../assets/images/pabau-logo.svg'
import styles from './ConnectHeader.module.less'
import { ClientContext } from '../ConnectLayout/interfaces/common'
import { useUser } from '../UserContext/UserContext'

const ConnectHeader = (): JSX.Element => {
  const clientContext = {
    fname: 'Nenad',
    lname: 'Jovanovski',
  }
  const router = useRouter()
  const [openDrawer, setOpenDrawer] = useState(false)
  const { me } = useUser()
  const ConnectAvatarDropdown = (
    <div className={styles.avatarMenu}>
      <div className={styles.dropdownMenu}>
        <div className={styles.dropdownHeader}>
          <UserOutlined style={{ color: '#9292A3' }} />
          <Link href="/account">
            <span className={styles.headerText}>Account</span>
          </Link>
        </div>
      </div>
      <div onClick={() => handleLogOut()} className={styles.dropdownMenu}>
        <div className={styles.dropdownHeader}>
          <LogoutOutlined className={styles.dropdownIcon} />
          <span className={styles.headerText}>Logout</span>
        </div>
      </div>
    </div>
  )

  const ConnectMobileMenu = (
    <div className={styles.connectAccountMobileMenu}>
      <Link href="/online-booking">
        <div className={styles.connectAccountMobileMenuItem}>
          <div className={styles.icon}>
            <CalendarOutlined />
          </div>
          <span className={styles.title}>Book Appointment</span>
        </div>
      </Link>
      <Link href="/notifications">
        <div className={styles.connectAccountMobileMenuItem}>
          <div className={styles.icon}>
            <BellOutlined />
          </div>
          <span className={styles.title}>Notifications</span>
        </div>
      </Link>
      <div
        className={styles.connectAccountMobileMenuItem}
        onClick={() => handleLogOut()}
      >
        <div className={styles.icon}>
          <LogoutOutlined />
        </div>
        <span className={styles.title}>Logout</span>
      </div>
    </div>
  )

  const handleLogOut = () => {
    localStorage.removeItem('token')
    //setLoggedInUser(null)
    router.push('/')
  }

  const handleClickLogo = () => {
    router.push('/dashboard')
  }

  const handleClickAccount = () => {
    router.push('/account')
  }

  return (
    <div className={styles.connectHeaderContainer}>
      <div className={styles.connectMobileHeaderContainer}>
        <div
          className={styles.connectHeaderMenu}
          onClick={() => setOpenDrawer(true)}
        >
          <MenuOutlined />
        </div>
        <Image
          src={connectLogo}
          width="106"
          height="52"
          preview={false}
          onClick={handleClickLogo}
          style={{ cursor: 'pointer' }}
        />
        <div onClick={() => handleClickAccount()}>
          <Avatar
            size={32}
            active={AvatarStatus.active}
            name={`${clientContext?.fname} ${clientContext?.lname}`}
          />
        </div>
      </div>
      <div className={styles.connectDesktopHeaderContainer}>
        <Image
          src={connectLogo}
          width="106"
          height="52"
          preview={false}
          onClick={handleClickLogo}
          style={{ cursor: 'pointer' }}
        />
        <div className={styles.connectedHeaderItems}>
          <Link href="/appointment">
            <div className={styles.connectHeaderItem}>
              <CalendarOutlined className={styles.connectHeaderItemIcon} />
              <span>Book Appointment</span>
            </div>
          </Link>
          <Link href="/notifications">
            <div className={styles.connectHeaderItem}>
              <BellOutlined className={styles.connectHeaderItemIcon} />
              <span>Notifications</span>
            </div>
          </Link>
          <Popover
            content={ConnectAvatarDropdown}
            trigger="click"
            placement="bottomRight"
            overlayClassName={styles.avatarPopover}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '20px',
                cursor: 'pointer',
              }}
            >
              <Avatar
                size={40}
                active={AvatarStatus.active}
                name={`${clientContext?.fname} ${clientContext?.lname}`}
              />
              <DownOutlined style={{ paddingLeft: '5px', color: '#9292A3' }} />
            </div>
          </Popover>
        </div>
      </div>
      {openDrawer && (
        <Drawer
          visible={openDrawer}
          placement="left"
          width="100%"
          closable={false}
          className={styles.connectAccountDrawer}
        >
          <div className={styles.connectAccountDrawerHeader}>
            <div
              className={styles.connectAccountClose}
              onClick={() => setOpenDrawer(false)}
            >
              <CloseOutlined />
            </div>
            <Image
              src={connectLogo}
              width="106"
              height="52"
              preview={false}
              onClick={handleClickLogo}
            />
            <div onClick={() => handleClickAccount()}>
              <Avatar
                size={32}
                active={AvatarStatus.active}
                name={`${clientContext?.fname} ${clientContext?.lname}`}
              />
            </div>
          </div>
          <div className={styles.connectAccountDrawerBody}>
            {ConnectMobileMenu}
          </div>
          <div className={styles.connectAccountDrawerFooter}>
            <span style={{ marginRight: '8px' }}>Powered by</span>
            <PabauLogo />
          </div>
        </Drawer>
      )}
    </div>
  )
}

export default ConnectHeader
