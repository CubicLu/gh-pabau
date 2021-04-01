import {
  BellOutlined,
  LeftOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { MobileHeader, TabMenu } from '@pabau/ui'
import { Button, Col, Row } from 'antd'
import React, { FC } from 'react'
import { useRouter } from 'next/router'
import styles from './index.module.less'
import useWindowSize from '../../../hooks/useWindowSize'
import Layout from '../../../components/Layout/Layout'
import Notification from '../../../components/Account/Settings/Notifications'
import Profile from '../../../components/Account/Settings/Profile'
import Security from '../../../components/Account/Settings/Security'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'

const Index: FC = () => {
  const router = useRouter()
  const size = useWindowSize()
  const { t } = useTranslationI18()
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
              <p>{t('account.settings.header')}</p>
            </div>
          </div>
        </MobileHeader>
      )}
      <Layout>
        <Row className={styles.container}>
          {size.width > 767 && <Col span={5}></Col>}
          <Col span={size.width > 767 ? 14 : 24}>
            <div className={styles.accountSettingWrapper}>
              {size.width > 767 && <h1>{t('account.settings.header')}</h1>}
              <TabMenu
                tabPosition={size.width > 767 ? 'left' : 'top'}
                menuItems={[
                  <span key={'1'}>
                    <UserOutlined />
                    {t('account.settings.tab.header1')}
                  </span>,
                  <span key={'2'}>
                    <LockOutlined />
                    {t('account.settings.tab.header2')}
                  </span>,
                  <span key={'3'}>
                    <BellOutlined />
                    {t('account.settings.tab.header3')}
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
                <Button className={styles.btnSave}>
                  {t('account.settings.save')}
                </Button>
              </div>
            </Col>
          ) : (
            <Row className={styles.accountMobileSave}>
              <div className={styles.btnSaveMobile}>
                <Button type="primary">{t('account.settings.save')}</Button>
              </div>
            </Row>
          )}
        </Row>
      </Layout>
    </div>
  )
}

export default Index
