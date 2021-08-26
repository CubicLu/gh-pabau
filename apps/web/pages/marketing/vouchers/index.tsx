import React, { FC, useState, useEffect } from 'react'
import Layout from '../../../components/Layout/Layout'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import {
  SearchOutlined,
  FilterOutlined,
  ApartmentOutlined,
} from '@ant-design/icons'
import { Input } from 'antd'
import { TabbedTable, Button, VoucherCard, Pagination, Table } from '@pabau/ui'
import CommonHeader from '../../../components/CommonHeader'
import useWindowSize from '../../../hooks/useWindowSize'
import VoucherIcon from '../../../components/Marketing/GiftVouchersList/assets/VocherIcon.svg'
import { Card, Row, Col } from 'antd'
import Link from 'next/link'
import styles from './index.module.less'

const giftCardSettings = {
  cardWidth: 500,
  backgroundColor1: '#9013FE',
  backgroundColor2: '#BD10E0',
  gradientType: 'linear-gradient',
  borderColor: '#000',
  bookNowButton: true,
  buttonLabel: 'Book Now',
  dotMenuShow: true,

  voucherType: '',
  voucherNum: 100001,
  voucherPrice: 100,
  voucherPriceLabel: 'Voucher Value',
  voucherSoldPrice: 100,
  voucherSoldPriceLabel: 'Sold 5',
  voucherRelation: 'Family',
  voucherRelationLabel: 'Redeem on all services',
  currencyType: '£',
  termsConditions: `
    lorem ipsum, quia dolor sit, amet, consectetur, adipisci
    velit, sed quia non numquam eius modi tempora incidunt, ut
    labore et dolore magnam aliquam quaerat voluptatem.
  `,
}

const data = [
  {
    id: 1,
    key: '1',
    number: '7214771214',
    description: 'FTT Voucher',
    name: 'FTT Voucher',
    purchase_date: '14/01/2021',
    expiry_date: '14/01/2022',
    amount: 100,
    remaining_balance: '£100',
    is_active: 1,
    index: 0,
  },
  {
    id: 2,
    key: '2',
    number: '7214771214',
    description: 'FTT Voucher',
    name: 'FTT Voucher',
    purchase_date: '14/01/2021',
    expiry_date: '14/01/2022',
    amount: 100,
    remaining_balance: '£100',
    is_active: 0,
    index: 1,
  },
  {
    id: 3,
    key: '3',
    number: '7214771214',
    description: 'FTT Voucher',
    name: 'FTT Voucher',
    purchase_date: '14/01/2021',
    expiry_date: '14/01/2022',
    amount: 100,
    remaining_balance: '£100',
    is_active: 0,
    index: 2,
  },
  {
    id: 4,
    key: '4',
    number: '7214771214',
    description: 'FTT Voucher',
    name: 'FTT Voucher',
    purchase_date: '14/01/2021',
    expiry_date: '14/01/2022',
    amount: 100,
    remaining_balance: '£100',
    is_active: 1,
    index: 3,
  },
  {
    id: 5,
    key: '5',
    number: '7214771214',
    description: 'FTT Voucher',
    name: 'FTT Voucher',
    purchase_date: '14/01/2021',
    expiry_date: '14/01/2022',
    amount: 100,
    remaining_balance: '£100',
    is_active: 1,
    index: 4,
  },
  {
    id: 6,
    key: '6',
    number: '7214771214',
    description: 'FTT Voucher',
    name: 'FTT Voucher',
    purchase_date: '14/01/2021',
    expiry_date: '14/01/2022',
    amount: 100,
    remaining_balance: '£100',
    is_active: 0,
    index: 5,
  },
  {
    id: 7,
    key: '7',
    number: '7214771214',
    description: 'FTT Voucher',
    name: 'FTT Voucher',
    purchase_date: '14/01/2021',
    expiry_date: '14/01/2022',
    amount: 100,
    remaining_balance: '£100',
    is_active: 0,
    index: 6,
  },
]

export interface GiftVouchersProps {
  title?: string
}

const GiftVouchers: FC<GiftVouchersProps> = ({ title }) => {
  const { t } = useTranslationI18()
  const size = useWindowSize()

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
      title: <span style={{ visibility: 'hidden' }}>view</span>,
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

  const tabItems = [t('giftvouchers.tabs.tab1'), t('giftvouchers.tabs.tab2')]
  const [gifts, setGifts] = useState([])
  const [searchTerm, setSearchTerm] = useState(null)
  const [paginationState, setPaginationState] = useState(true)
  const [dataSource, setDataSource] = useState(null)
  const [activeTab, setActiveTab] = useState(tabItems[0])

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
            <Input
              className={styles.searchDrugsListing}
              autoFocus
              placeholder={t('giftvouchers.search.placeholder')}
              suffix={<SearchOutlined style={{ color: '#8C8C8C' }} />}
              onChange={(e) => {
                setSearchTerm(e.target.value)
              }}
            />
            <Button type="default" size="large">
              <FilterOutlined /> {t('giftvouchers.filter')}
            </Button>
          </div>
        )}
      </div>
    </div>
  )

  useEffect(() => {
    setGifts([
      { ...giftCardSettings },
      { ...giftCardSettings },
      {
        ...giftCardSettings,
        gradientType: 'linear-gradient',
        voucherType: 'birthday',
      },
      {
        ...giftCardSettings,
        gradientType: 'linear-gradient',
        voucherType: 'valentine',
      },
      {
        ...giftCardSettings,
        gradientType: 'radial-gradient',
      },
      {
        ...giftCardSettings,
        gradientType: 'linear-gradient',
        voucherType: 'flowers',
      },
    ])
    setDataSource(data)
  }, [])

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

  return (
    <Layout>
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
                          <VoucherCard {...gift} />
                        </div>
                      </Col>
                    ))
                  ) : (
                    <div className={styles.noDataContent}>
                      <div className={styles.noDataTableBox}>
                        <div className={styles.noDataTextStyle}>
                          <div className={styles.noDataIcon}>
                            <img src={VoucherIcon} alt="voucher-icon" />
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
      </div>
    </Layout>
  )
}

export default GiftVouchers
