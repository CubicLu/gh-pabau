import {
  LeftOutlined,
  PlusSquareFilled,
  SearchOutlined,
} from '@ant-design/icons'
import {
  Breadcrumb,
  Button,
  MedicalFilter,
  MedicalFormBuilder,
  MedicalFormItem,
  MobileHeader,
  Notification,
  NotificationBanner,
  NotificationType,
  TabMenu,
} from '@pabau/ui'
import { Input, Typography } from 'antd'
import Link from 'next/link'
import React, { FC, useState } from 'react'
import notificationBannerImage from '../../../assets/images/notification-image.png'
import Layout from '../../../components/Layout/Layout'
import Custom from '../../../components/MedicalForms/Custom'
import Library from '../../../components/MedicalForms/Library'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import styles from './index.module.less'
const { Title } = Typography

enum Tab {
  Custom = '0',
  Library = '1',
}

export const Index: FC = () => {
  const [hideBanner, setHideBanner] = useState(false)
  const [currentTab, setCurrentTab] = useState('0')
  const [addItem, setAddItem] = useState<MedicalFormItem>()
  const [query, setQuery] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const { t } = useTranslationI18()

  const saveForm = (addMedicalItem) => {
    setShowCreateForm(false)
    if (addMedicalItem) {
      Notification(
        NotificationType.success,
        `${addMedicalItem?.name} - ${t('setup.medical.forms.create.text')}`
      )
      setAddItem(addMedicalItem)
    }
  }

  const createForm = () => {
    setShowCreateForm(true)
    setAddItem(null)
  }

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
                  <Button type="primary" onClick={createForm}>
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
                preFormName=""
                onHideFormBuilder={() => setShowCreateForm(false)}
                onSaveForm={saveForm}
                create={true}
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
          <Custom addItem={addItem} />
          <Library />
        </TabMenu>
      </div>
    </Layout>
  )
}

export default Index
