import React, { FC, useState } from 'react'
import { Typography, Modal } from 'antd'
import { PauseCircleOutlined, MessageOutlined } from '@ant-design/icons'
import {
  TabMenu,
  Breadcrumb,
  NotificationBanner,
  NotificationMessages,
  DropdownButton as DropDownButton,
} from '@pabau/ui'
import Layout from '../../components/Layout/Layout'
import CommonHeader from '../../components/CommonHeader'
import notificationData from '../../assets/notificationData'
import notificationBannerImage from '../../assets/images/notification-image.png'
import styles from './style.module.less'
import { useRouter } from 'next/router'
import { useTranslationI18 } from '../../hooks/useTranslationI18'

const { Title } = Typography

const Index: FC = () => {
  const [hideBanner, setHideBanner] = useState(false)
  const menuItems = ['Appointments', 'Engagement', 'Classes', 'Other']
  const router = useRouter()

  const { t } = useTranslationI18()

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
    <>
      <CommonHeader />
      <Layout>
        <NotificationBanner
          title={t('notifications.banner.title')}
          desc={t('notifications.banner.desc')}
          imgPath={notificationBannerImage}
          allowClose={true}
          setHide={[hideBanner, setHideBanner]}
          showPaymentTitle={t('notifications.banner.enablePayment')}
        />
        <div className={styles.clientNotificationsContent}>
          <div className={styles.clientNotificationTop}>
            <div>
              <Breadcrumb
                breadcrumbItems={[
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
          <div className={styles.clientInnerNotifciationsDesktop}>
            <TabMenu tabPosition="left" menuItems={menuItems} minHeight="592px">
              {menuItems.map((item) => (
                <NotificationMessages
                  key={item}
                  notificationData={notificationData[item]}
                  onClick={handleNotificationClick}
                />
              ))}
            </TabMenu>
          </div>
          <div className={styles.clientInnerNotifciationsMobile}>
            <TabMenu tabPosition="top" menuItems={menuItems}>
              {menuItems.map((item) => (
                <NotificationMessages
                  key={item}
                  notificationData={notificationData[item]}
                  onClick={handleNotificationClick}
                />
              ))}
            </TabMenu>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Index
