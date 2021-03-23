import {
  BellOutlined,
  LeftOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Layout, MobileHeader, TabMenu } from '@pabau/ui'
import { Button, Col, Row } from 'antd'
import React, { FC } from 'react'
import { useRouter } from 'next/router'
import styles from './index.module.less'
import useWindowSize from '../../../hooks/useWindowSize'
import Notification from './notifications'
import Profile from './profile'
import Security from './security'

const Index: FC = () => {
  const router = useRouter()
  const size = useWindowSize()
  const handleBack = () => {
    router.back()
  }
  return (
    <div className={styles.mainPageWrapper}>
      {size.width <= 767 && (
        <MobileHeader className={styles.accountSettingsMobile}>
          <div className={styles.allContentMobile}>
            <div className={styles.textStyle}>
              <LeftOutlined onClick={handleBack} />
              <p>Account Settings</p>
            </div>
          </div>
        </MobileHeader>
      )}
      <Layout>
        <Row className={styles.container}>
          {size.width > 767 && <Col span={5}></Col>}
          <Col span={size.width > 767 ? 14 : 24}>
            <div className={styles.accountSettingWrapper}>
              {size.width > 767 && <h1>Account Settings</h1>}
              <TabMenu
                tabPosition={size.width > 767 ? 'left' : 'top'}
                menuItems={[
                  <span key={'1'}>
                    <UserOutlined />
                    Profile
                  </span>,
                  <span key={'2'}>
                    <LockOutlined />
                    Security
                  </span>,
                  <span key={'3'}>
                    <BellOutlined />
                    Notifications
                  </span>,
                ]}
                className={styles.mainBody}
              >
                <Profile />
                <Security />
                <Notification />
              </TabMenu>
            </div>
          </Col>
          {size.width > 767 ? (
            <Col span={5}>
              <div className={styles.buttonWrapper}>
                <Button className={styles.btnSave}>Save Changes</Button>
              </div>
            </Col>
          ) : (
            <Row className={styles.accountMobileSave}>
              <div className={styles.btnSaveMobile}>
                <Button type="primary">Save Changes</Button>
              </div>
            </Row>
          )}
        </Row>
      </Layout>
    </div>
  )
}

export default Index
