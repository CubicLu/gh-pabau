import React, { FC, useContext, useState } from 'react'
import { Typography, Modal } from 'antd'
import { PauseCircleOutlined, MessageOutlined } from '@ant-design/icons'
import { UserContext } from '../../context/UserContext'
import {
  TabMenu,
  Breadcrumb,
  NotificationBanner,
  NotificationMessages,
  DropdownButton as DropDownButton,
} from '@pabau/ui'
import Layout from '../../components/Layout/Layout'
import useWindowSize from '../../hooks/useWindowSize'
import notificationData from '../../assets/notificationData'
import notificationBannerImage from '../../assets/images/notification-image.png'
import MobileHeader from '../../components/MobileHeader'
import styles from './style.module.less'
import { useRouter } from 'next/router'
import { useTranslationI18 } from '../../hooks/useTranslationI18'

const { Title } = Typography

const Index: FC = () => {
  const [hideBanner, setHideBanner] = useState(false)
  const { t } = useTranslationI18()
  const size = useWindowSize()
  const user = useContext(UserContext)

  const menuItems = [
    {
      name: t('notifications.clientNotifications.menuItem.appointments'),
      value: 'Appointments',
    },
    {
      name: t('notifications.clientNotifications.menuItem.engagement'),
      value: 'Engagement',
    },
    {
      name: t('notifications.clientNotifications.menuItem.sharing'),
      value: 'Sharing',
    },
    {
      name: t('notifications.clientNotifications.menuItem.classes'),
      value: 'Classes',
    },
    {
      name: t('notifications.clientNotifications.menuItem.other'),
      value: 'Other',
    },
  ]

  const router = useRouter()

  const options = [
    {
      title: 'Pause notifications',
      icon: <PauseCircleOutlined />,
    },
    {
      title: 'See message log',
      icon: <MessageOutlined />,
    },
  ]
  const handleOptionClick = (val) => {
    switch (val) {
      case options[0].title:
        Modal.info({
          content: (
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </span>
          ),
          onOk: (): void => {
            return
          },
        })
        break
      default:
        break
    }
  }

  const handleNotificationClick = (link) => {
    if (link) {
      router.push(link)
    }
  }
  return (
    <Layout {...user}>
      <MobileHeader
        title={t('notifications.breadcrumb.notificationMessage')}
        parent="/setup"
      >
        <DropDownButton
          placement="bottomRight"
          menuItems={options}
          onMenuClick={(val) => handleOptionClick(val)}
        >
          {t('notifications.manageOptions')}
        </DropDownButton>
      </MobileHeader>
      <NotificationBanner
        title={t('notifications.banner.title')}
        desc={t('notifications.banner.desc')}
        imgPath={notificationBannerImage}
        allowClose={true}
        setHide={[hideBanner, setHideBanner]}
        showPaymentTitle={t('notifications.banner.enablePayment')}
      />
      <div className={styles.clientNotificationsContent}>
        {size.width > 767 && (
          <div className={styles.clientNotificationTop}>
            <div>
              <Breadcrumb
                items={[
                  {
                    breadcrumbName: t('notifications.breadcrumb.setup'),
                    path: 'setup',
                  },
                  {
                    breadcrumbName: t(
                      'notifications.breadcrumb.notificationMessage'
                    ),
                    path: '',
                  },
                ]}
              />
              <Title>{t('notifications.breadcrumb.notificationMessage')}</Title>
              <p className={styles.clientNotificationsSubtitle}>
                {t('notifications.clientNotificationsSubtitle')}
              </p>
            </div>
            <div className={styles.clientNotificationsOps}>
              <DropDownButton
                menuItems={options}
                onMenuClick={(val) => handleOptionClick(val)}
              >
                {t('notifications.manageOptions')}
              </DropDownButton>
            </div>
          </div>
        )}
        <div className={styles.clientInnerNotifciationsDesktop}>
          <TabMenu
            tabPosition="left"
            menuItems={menuItems.map((menuItem) => menuItem.name)}
            minHeight="592px"
          >
            {menuItems.map((item) => (
              <NotificationMessages
                key={item.value}
                notificationData={notificationData({ t })?.[item.value]}
                onClick={handleNotificationClick}
              />
            ))}
          </TabMenu>
        </div>
        <div className={styles.clientInnerNotifciationsMobile}>
          <TabMenu
            tabPosition="top"
            menuItems={menuItems.map((menuItem) => menuItem.name)}
          >
            {menuItems.map((item) => (
              <NotificationMessages
                key={item.value}
                notificationData={notificationData({ t })?.[item.value]}
                onClick={handleNotificationClick}
              />
            ))}
          </TabMenu>
        </div>
      </div>
    </Layout>
  )
}

export default Index
