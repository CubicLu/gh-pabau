import React, { FC } from 'react'
import { Typography, Input } from 'antd'
import {
  SearchOutlined,
  LeftOutlined,
  PlusSquareFilled,
} from '@ant-design/icons'
import {
  TabMenu,
  Breadcrumb,
  NotificationBanner,
  Button,
  MobileHeader,
  MedicalFormBuilder,
  MedicalFilter,
} from '@pabau/ui'
import Layout from '../../../components/Layout/Layout'
import Custom from '../../../components/MedicalForms/Custom'
import Library from '../../../components/MedicalForms/Library'
import notificationBannerImage from '../../../assets/images/notification-image.png'
import styles from './index.module.less'
import Link from 'next/link'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'

const { Title } = Typography

enum Tab {
  Custom = '0',
  Library = '1',
}

export const Index: FC = () => {
  const [hideBanner, setHideBanner] = React.useState(false)
  const [currentTab, setCurrentTab] = React.useState('0')
  const [query, setQuery] = React.useState('')
  const [showCreateForm, setShowCreateForm] = React.useState(false)
  const { t } = useTranslationI18()
  return (
    <Layout>
      <NotificationBanner
        title={t('setup.medical.forms.notificationBanner.title')}
        desc={t('setup.medical.forms.notificationBanner.desc')}
        imgPath={notificationBannerImage}
        allowClose={true}
        setHide={[hideBanner, setHideBanner]}
        enableClientForms={t(
          'setup.medical.forms.notificationBanner.enableClientForms'
        )}
      />

      <div className={styles.medicalFormsContainer}>
        <div className={styles.desktopViewNone}>
          {currentTab === Tab.Custom && (
            <MobileHeader className={styles.mobileHeader}>
              <div className={styles.allContentAlignMobile}>
                <div className={styles.mobileHeaderTextStyle}>
                  <Link href="/setup">
                    <LeftOutlined />
                  </Link>
                  <p>{t('setup.medical.forms.patientFormName')}</p>
                </div>
                <div className={styles.mobileHeaderOpsStyle}>
                  <MedicalFilter />
                  <PlusSquareFilled
                    className={styles.plusIconStyle}
                    onClick={() => setShowCreateForm(true)}
                  />
                </div>
              </div>
            </MobileHeader>
          )}
          {currentTab === Tab.Library && (
            <MobileHeader className={styles.mobileHeader}>
              <div className={styles.allContentAlignMobile}>
                <div className={styles.mobileHeaderTextStyle}>
                  <Link href="/setup">
                    <LeftOutlined />
                  </Link>
                  <p>{t('setup.medical.forms.patientFormName')}</p>
                </div>
                <div className={styles.mobileHeaderOpsStyle}>
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t('setup.medical.forms.searchLibrary')}
                  />
                </div>
              </div>
            </MobileHeader>
          )}
        </div>
        <div className={styles.medicalFormsHeader}>
          <div>
            <Breadcrumb
              breadcrumbItems={[
                {
                  breadcrumbName: t('navigation-breadcrumb-setup'),
                  path: 'setup',
                },
                {
                  breadcrumbName: t('setup.medical.forms.patientFormName'),
                  path: '',
                },
              ]}
            />
            <Title>{t('setup.medical.forms.patientFormName')}</Title>
          </div>
          <div className={styles.medicalFormsOps}>
            {currentTab === Tab.Custom && (
              <>
                <div>
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    addonAfter={<SearchOutlined />}
                    placeholder={t('setup.medical.forms.searchMyForms')}
                  />
                </div>
                <div>
                  <MedicalFilter />
                </div>
                <div>
                  <Button
                    type="primary"
                    onClick={() => setShowCreateForm(true)}
                  >
                    {t('setup.medical.forms.createForm.text')}
                  </Button>
                </div>
              </>
            )}
            {currentTab === Tab.Library && (
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                addonAfter={<SearchOutlined />}
                placeholder={t('setup.medical.forms.searchLibrary')}
              />
            )}
            {showCreateForm && (
              <MedicalFormBuilder
                visible={showCreateForm}
                previewData=""
                onCreate={() => setShowCreateForm(false)}
              />
            )}
          </div>
        </div>
        <TabMenu
          tabPosition="top"
          minHeight="1px"
          menuItems={[
            t('setup.medical.forms.menuItems.myForms'),
            t('setup.medical.forms.menuItems.library'),
          ]}
          onTabClick={(key) => setCurrentTab(key)}
        >
          <Custom />
          <Library />
        </TabMenu>
      </div>
    </Layout>
  )
}

export default Index
