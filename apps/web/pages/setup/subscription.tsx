import { FilterOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, NotificationBanner, TabMenu } from '@pabau/ui'
import { Card, Divider, Input, Popover, Radio, Typography } from 'antd'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import classNames from 'classnames'
import React, { FC, useState, useEffect } from 'react'
import { useMedia } from 'react-use'
import paymentUpdateBanner from '../../assets/images/payment-update-banner.png'
import Layout from '../../components/Layout/Layout'
import CommonHeader from '../../components/CommonHeader'
import AccountInformation from '../../components/Setup/Subscription/AccountInformation'
import BillingInformation from '../../components/Setup/Subscription/BillingInformation'
import InvoiceActivity from '../../components/Setup/Subscription/InvoiceActivityList'
import styles from './subscription.module.less'
import { useRouter } from 'next/router'

const tabName = {
  '0': 'invoice',
  '1': 'billing',
  '2': 'accountinfo',
}
const Subscription: FC = () => {
  const { Title } = Typography
  const { Search } = Input
  const [activeTab, setActiveTab] = useState('0')
  const setHide = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterValue, setFilterValue] = useState<'ALL' | 'PAID' | 'NOT_PAID'>(
    'ALL'
  )
  const { t } = useTranslationI18()
  const isMobile = useMedia('(max-width: 768px)', false)
  const router = useRouter()
  const { title } = router.query

  const handleSearch = (value) => {
    setSearchTerm(value)
  }

  useEffect(() => {
    if (title === 'billing') {
      setActiveTab('1')
    } else if (title === 'accountinfo') {
      setActiveTab('2')
    }
  }, [title])

  useEffect(() => {
    router.push({
      pathname: '/setup/subscription',
      query: { title: tabName[activeTab] },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  const filterContent = () => (
    <div className={styles.filterContent}>
      {!isMobile && (
        <div className={classNames(styles.filterHeader)}>
          <h6>{t('add-button-filter-header-text-filter')}:</h6>
          <p>{t('add-button-filter-header-text-status')}</p>
        </div>
      )}
      <div className={styles.radioTextStyle}>
        <Radio.Group
          onChange={(e) => {
            setFilterValue(e.target.value)
          }}
          value={filterValue}
        >
          <Radio value="ALL">
            <span>{t('setup.table.status.all')}</span>
          </Radio>
          <Radio value="PAID">
            <span>{t('setup.table.status.paidout')}</span>
          </Radio>
          <Radio value="NOT_PAID">
            <span>{t('setup.table.status.other')}</span>
          </Radio>
        </Radio.Group>
      </div>
    </div>
  )

  return (
    <Layout>
      <CommonHeader
        isLeftOutlined
        reversePath="/setup"
        title={`Pabau ${t('setup.subscription')}`}
        isShowSearch={activeTab === '0' ? true : false}
        searchInputPlaceHolder={t('setup.crud.subscription.searchholder')}
        handleSearch={handleSearch}
        searchValue={searchTerm}
      >
        {activeTab === '0' && (
          <Popover
            trigger="click"
            content={filterContent}
            placement="bottomRight"
            overlayClassName={styles.filterPopover}
          >
            <FilterOutlined className={styles.marketingIconStyle} />
          </Popover>
        )}
      </CommonHeader>
      <NotificationBanner
        title={t('notifications.banner.title')}
        desc={t('notifications.banner.desc')}
        allowClose
        showPaymentButton
        showPaymentTitle={t('notifications.banner.enablePayment')}
        showEmail={false}
        setHide={setHide}
        imgPath={paymentUpdateBanner}
      />
      <Card bodyStyle={{ padding: 0 }}>
        {!isMobile && (
          <div className={styles.headerContainer}>
            <div>
              <Breadcrumb
                items={[
                  { breadcrumbName: t('sidebar.setup'), path: 'setup' },
                  { breadcrumbName: t('setup.subscription'), path: '' },
                ]}
              />
              <Title>Pabau {t('setup.subscription')}</Title>
            </div>
            {activeTab === '0' && (
              <div className={styles.searchBarContainer}>
                <Search
                  placeholder={t('setup.crud.subscription.searchholder')}
                  allowClear
                  onSearch={handleSearch}
                  className={styles.searchBar}
                  value={searchTerm}
                />
                <div className={styles.btnWrapperFilter}>
                  <Popover
                    trigger="click"
                    content={filterContent}
                    placement="bottomRight"
                    overlayClassName={styles.filterPopover}
                  >
                    <Button className={styles.filterBtn}>
                      <FilterOutlined /> {t('setup.crud.filter')}
                    </Button>
                  </Popover>
                </div>
              </div>
            )}
          </div>
        )}
        <Divider style={{ margin: 0 }} />
        <TabMenu
          tabPosition={'top'}
          menuItems={[
            t('setup.subscription.invoiceactvity'),
            t('setup.subscription.billingdetails'),
            t('setup.subscription.accountinformations'),
          ]}
          activeKey={activeTab}
          onTabClick={(activeKey) => setActiveTab(activeKey)}
        >
          <InvoiceActivity searchTerm={searchTerm} filterValue={filterValue} />
          <BillingInformation />
          <AccountInformation />
        </TabMenu>
      </Card>
    </Layout>
  )
}

export default Subscription
