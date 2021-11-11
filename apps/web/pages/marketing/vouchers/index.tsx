import React, { FC, useState, useEffect } from 'react'
import Layout from '../../../components/Layout/Layout'
import { useUser } from '../../../context/UserContext'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import { ApartmentOutlined } from '@ant-design/icons'
import {
  TabbedTable,
  Button,
  VoucherCard,
  Pagination,
  Table,
  BasicModal as TermsModal,
} from '@pabau/ui'
import CommonHeader from '../../../components/CommonHeader'
import AddButton from '../../../components/AddButton'
import useWindowSize from '../../../hooks/useWindowSize'
import { ReactComponent as VoucherIcon } from '../../../assets/images/voucher-icon.svg'
import { data, giftCardSettings } from '../../../mocks/vouchers'
import { Card, Row, Col, Typography } from 'antd'
import Link from 'next/link'
import styles from './index.module.less'

const { Paragraph } = Typography

const GiftVouchers: FC = () => {
  const { t } = useTranslationI18()
  const size = useWindowSize()
  const user = useUser()

  const columns = [
    {
      title: t('giftvouchers.circulations.columns.number'),
      dataIndex: 'number',
      visible: true,
      width: '150px',
    },
    {
      title: t('giftvouchers.circulations.columns.description'),
      dataIndex: 'description',
      visible: true,
      width: '250px',
    },
    {
      title: t('giftvouchers.circulations.columns.name'),
      dataIndex: 'name',
      visible: true,
      width: '250px',
    },
    {
      title: t('giftvouchers.circulations.columns.purchasedate'),
      dataIndex: 'purchase_date',
      visible: true,
    },
    {
      title: t('giftvouchers.circulations.columns.expirydate'),
      dataIndex: 'expiry_date',
      visible: true,
    },
    {
      title: t('giftvouchers.circulations.columns.amount'),
      dataIndex: 'amount',
      visible: true,
    },
    {
      title: t('giftvouchers.circulations.columns.remainingbalance'),
      dataIndex: 'remaining_balance',
      visible: true,
    },
    {
      title: t('giftvouchers.circulations.columns.status'),
      dataIndex: 'is_active',
      visible: true,
    },
    {
      title: '',
      dataIndex: 'view',
      visible: true,
      className: 'lastColumn',
      render: function renderTableSource() {
        return (
          <div>
            <Button size="large">View</Button>
          </div>
        )
      },
    },
  ]
  type TabItems = 'Types' | 'Circlulation'
  const tabItems = [
    t('giftvouchers.tabs.tab1') as TabItems,
    t('giftvouchers.tabs.tab2') as TabItems,
  ]
  const [gifts, setGifts] = useState([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [paginationState, setPaginationState] = useState(true)
  const [dataSource, setDataSource] = useState(null)
  const [activeTab, setActiveTab] = useState(tabItems[0])
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [selectedVoucher, setSelectedVoucher] = useState(null)

  const CardHeader = () => (
    <div className={styles.header}>
      {size.width > 767 && (
        <div className="leftDiv">
          <h3 className={styles.drugsHeading}>{t('giftvouchers.title')}</h3>
        </div>
      )}
      <div className="rightDiv">
        {activeTab === tabItems[0] && (
          <Link href="/marketing/vouchers/create">
            <Button type="primary" size="large">
              {t('giftvouchers.create')}
            </Button>
          </Link>
        )}
        {activeTab === tabItems[1] && (
          <div>
            <AddButton
              addFilter
              tableSearch
              onFilterSource={() => false}
              schema={{
                searchPlaceholder: t('giftvouchers.search.placeholder'),
              }}
              onSearch={(data) => setSearchTerm(data)}
            />
          </div>
        )}
      </div>
    </div>
  )

  useEffect(() => {
    setGifts([
      { ...giftCardSettings(t) },
      { ...giftCardSettings(t) },
      {
        ...giftCardSettings(t),
        gradientType: 'linear-gradient',
        voucherType: 'birthday',
      },
      {
        ...giftCardSettings(t),
        gradientType: 'linear-gradient',
        voucherType: 'valentine',
      },
      {
        ...giftCardSettings(t),
        gradientType: 'radial-gradient',
      },
      {
        ...giftCardSettings(t),
        gradientType: 'linear-gradient',
        voucherType: 'flowers',
      },
    ])
    setDataSource(data)
  }, [t])

  const onTabChange = (tab) => {
    switch (tabItems[tab]) {
      case tabItems[0]:
        setActiveTab(tabItems[0])
        setPaginationState(false)
        break
      case tabItems[1]:
        setActiveTab(tabItems[1])
        setPaginationState(true)
        break
      default:
        return
    }
  }

  const onMenuClick = (key, data) => {
    switch (key) {
      case 4:
        setSelectedVoucher(data)
        setShowTermsModal(() => true)
        break
      default:
        return
    }
  }

  return (
    <Layout {...user}>
      <CommonHeader isLeftOutlined title={t('giftvouchers.title')} />
      <div className={styles.giftVoucherMain}>
        <Card title={<CardHeader />}>
          <div className={styles.body}>
            <TabbedTable
              tabItems={tabItems}
              onTabChange={(tab) => onTabChange(tab)}
            >
              <div className={styles.types}>
                <Row>
                  {gifts.length > 0 ? (
                    gifts.map((gift, key) => (
                      <Col
                        lg={8}
                        md={12}
                        sm={12}
                        xs={24}
                        key={`col-key-${key * 123}`}
                      >
                        <div className={styles.voucherCard}>
                          <VoucherCard
                            onMenuClick={(key) => onMenuClick(key, gift)}
                            showDrawerMenu={size.width < 768}
                            {...gift}
                          />
                        </div>
                      </Col>
                    ))
                  ) : (
                    <div className={styles.noDataContent}>
                      <div className={styles.noDataTableBox}>
                        <div className={styles.noDataTextStyle}>
                          <div className={styles.noDataIcon}>
                            <VoucherIcon />
                          </div>
                          <h2>{t('giftvouchers.add.label')}</h2>
                          <p>{t('giftvouchers.no.voucher.label')}</p>
                          <Link href="/marketing/vouchers/create">
                            <Button type="primary" size="large">
                              {t('giftvouchers.create')}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </Row>
              </div>
              <div className={styles.tableSheet}>
                <Table
                  draggable={false}
                  columns={columns}
                  searchTerm={searchTerm}
                  noDataText={t('giftvouchers.circulations.nodata')}
                  noDataIcon={<ApartmentOutlined />}
                  noDataBtnText={t('giftvouchers.circulations.nodata')}
                  scroll={{ x: 'max-content' }}
                  dataSource={dataSource}
                />
              </div>
            </TabbedTable>
          </div>
        </Card>
        {paginationState && (
          <div className={styles.paginationDiv}>
            <Pagination
              showingRecords={dataSource?.length}
              defaultCurrent={1}
              total={dataSource?.length}
              pageSize={10}
            />
          </div>
        )}
        <TermsModal
          width={800}
          visible={showTermsModal}
          onCancel={() => {
            setShowTermsModal(() => false)
            setSelectedVoucher(null)
          }}
          title={t('giftvouchers.create.label.terms')}
          closable={size?.width > 767 ? true : false}
        >
          <Paragraph className={styles.modalTerms}>
            {selectedVoucher?.termsConditions}
          </Paragraph>
          {size?.width < 768 && (
            <div className={styles.closeBtn}>
              <Button
                onClick={() => {
                  setShowTermsModal(() => false)
                  setSelectedVoucher(null)
                }}
              >
                {t('common-label-cancel')}
              </Button>
            </div>
          )}
        </TermsModal>
      </div>
    </Layout>
  )
}

export default GiftVouchers
