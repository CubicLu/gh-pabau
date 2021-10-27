import { Breadcrumb, ButtonLabel, Pagination } from '@pabau/ui'
import { Table, Typography } from 'antd'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { useMedia } from 'react-use'
import ConnectLayout from '../../../components/ConnectLayout/ConnectLayout'
import styles from './billing-history.module.less'
import { useTranslation } from 'react-i18next'
import { ClientContext } from '../../../components/UserContext/context/ClientContext'

const { Title } = Typography

interface Invoice {
  invoiceNo: string
  location: string
  date: string
  service: string
  amount: number
  paymentBy: string
  status: boolean
}
const defaultBillingHistory: Invoice[] = [
  {
    invoiceNo: '#45645456456576',
    location: 'London',
    date: '2021-03-23',
    service: 'Acne Consultation',
    amount: 50,
    paymentBy: '',
    status: false,
  },
  {
    invoiceNo: '#45645456456575',
    location: 'London',
    date: '2021-03-17',
    service: 'Acne Consultation',
    amount: 50,
    paymentBy: 'Card',
    status: true,
  },
  {
    invoiceNo: '#45645456456574',
    location: 'London',
    date: '2021-03-10',
    service: 'Follow Up Consultation',
    amount: 40,
    paymentBy: 'Card',
    status: true,
  },
  {
    invoiceNo: '#45645456456573',
    location: 'London',
    date: '2021-03-06',
    service: 'Follow Up Consultation',
    amount: 40,
    paymentBy: 'Card',
    status: true,
  },
  {
    invoiceNo: '#45645456456572',
    location: 'London',
    date: '2021-03-01',
    service: 'Acne Consultation',
    amount: 50,
    paymentBy: 'Cash',
    status: true,
  },
  {
    invoiceNo: '#45645456456571',
    location: 'London',
    date: '2021-02-28',
    service: 'Acne Consultation',
    amount: 50,
    paymentBy: 'Cash',
    status: true,
  },
  {
    invoiceNo: '#45645456456570',
    location: 'London',
    date: '2021-02-21',
    service: 'Acne Consultation',
    amount: 50,
    paymentBy: 'Cash',
    status: true,
  },
  {
    invoiceNo: '#4564545645669',
    location: 'London',
    date: '2021-02-20',
    service: 'Acne Consultation',
    amount: 50,
    paymentBy: 'Cash',
    status: true,
  },
  {
    invoiceNo: '#4564545645668',
    location: 'London',
    date: '2021-02-16',
    service: 'Acne Consultation',
    amount: 50,
    paymentBy: 'Cash',
    status: true,
  },
  {
    invoiceNo: '#4564545645667',
    location: 'London',
    date: '2021-02-11',
    service: 'Acne Consultation',
    amount: 50,
    paymentBy: 'Cash',
    status: true,
  },
  {
    invoiceNo: '#4564545645666',
    location: 'London',
    date: '2021-02-03',
    service: 'Acne Consultation',
    amount: 50,
    paymentBy: 'Cash',
    status: true,
  },
]

export const BillingHistory = () => {
  const { t } = useTranslation('connect')
  const [lang, setLang] = useState('en')
  const isMobile = useMedia('(max-width: 767px)', false)
  const [billingHistory, setBillingHistory] = useState([])
  const clientContext = useContext(ClientContext)
  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 10,
    currentPage: 1,
    showingRecords: 0,
  })
  const columns = [
    {
      title: t('connect.account.payments.billinghistory.column.invoiceno'),
      dataIndex: 'invoiceNo',
      key: 'invoiceNo',
      width: !isMobile ? '199px' : '193px',
    },
    {
      title: t('connect.account.payments.billinghistory.column.location'),
      dataIndex: 'location',
      key: 'location',
      width: '120px',
    },
    {
      title: t('connect.account.payments.billinghistory.column.invdate'),
      dataIndex: 'date',
      key: 'date',
      width: !isMobile ? '108px' : '96px',
      // eslint-disable-next-line react/display-name
      render: (date) => {
        return <span>{moment(date).format('DD-MM-YY')}</span>
      },
    },
    {
      title: t('connect.account.payments.billinghistory.column.service'),
      dataIndex: 'service',
      key: 'service',
      width: !isMobile ? '314px' : '300px',
    },
    {
      title: t('connect.account.payments.billinghistory.column.amount'),
      dataIndex: 'amount',
      key: 'amount',
      width: !isMobile ? '112px' : '82px',
      // eslint-disable-next-line react/display-name
      render: (amount) => {
        return <span>{`£${Number(amount).toFixed(2)}`}</span>
      },
    },
    {
      title: t('connect.account.payments.billinghistory.column.paymentby'),
      dataIndex: 'paymentBy',
      key: 'paymentBy',
      width: '110px',
    },
    {
      title: t('connect.account.payments.billinghistory.column.status'),
      dataIndex: 'status',
      key: 'status',
      width: !isMobile ? '195px' : '108px',
      // eslint-disable-next-line react/display-name
      render: (status) => {
        return (
          <div className={styles.buttonLabelContainer}>
            <ButtonLabel
              text={
                status
                  ? t(
                      'connect.account.payments.billinghistory.column.status.paid'
                    )
                  : t(
                      'connect.account.payments.billinghistory.column.status.unpaid'
                    )
              }
              className={
                status ? styles.invoiceStatusPaid : styles.inoviceStatusUnpaid
              }
            />
          </div>
        )
      },
    },
  ]

  useEffect(() => {
    const items = [...defaultBillingHistory]
    setBillingHistory(items)
    setPaginateData({
      total: items.length,
      offset: 0,
      limit: 10,
      currentPage: 1,
      showingRecords: items.length > 10 ? 10 : items.length,
    })
  }, [])

  return (
    <ConnectLayout
      onChangeLanguage={(val) => setLang(val)}
      clientContext={clientContext}
    >
      <div className={styles.billingHistory}>
        <div className={styles.billingHistoryHeader}>
          <Breadcrumb
            items={[
              {
                breadcrumbName: t('connect.account.title'),
                path: 'connect/account',
              },
              {
                breadcrumbName: t('connect.account.payments'),
                path: 'connect/account/payments',
              },
              {
                breadcrumbName: t('connect.account.payments.billinghistory'),
                path: '',
              },
            ]}
          />
          <Title>{t('connect.account.payments.billinghistory')}</Title>
        </div>
        <div className={styles.billingHistoryMobileHeader}>
          <Title>{t('connect.account.payments.billinghistory')}</Title>
        </div>
        <div className={styles.billingHistoryContent}>
          <div className={styles.billingHistoryTableContainer}>
            {billingHistory.length > 0 && (
              <Table
                dataSource={
                  billingHistory
                    .slice(
                      paginateData.offset,
                      paginateData.offset + paginateData.showingRecords
                    )
                    .map((item, index) => ({
                      ...item,
                      key: index,
                    })) as never[]
                }
                columns={columns}
                pagination={false}
                scroll={{ x: 'max-content' }}
              />
            )}
          </div>
        </div>
        <div className={styles.paginationContainer}>
          <Pagination
            total={paginateData.total}
            defaultPageSize={10}
            showSizeChanger={false}
            pageSizeOptions={['10', '25', '50', '100']}
            onPageSizeChange={(pageSize) => {
              setPaginateData({
                ...paginateData,
                offset: 0,
                limit: pageSize,
                currentPage: 1,
                showingRecords:
                  paginateData.total > pageSize ? pageSize : paginateData.total,
              })
            }}
            onChange={(page, pageSize) => {
              setPaginateData({
                ...paginateData,
                offset: pageSize * (page - 1),
                currentPage: page,
                limit: pageSize,
                showingRecords:
                  paginateData.total > page * pageSize
                    ? pageSize
                    : paginateData.total % pageSize,
              })
            }}
            pageSize={paginateData.limit}
            current={paginateData.currentPage}
            showingRecords={paginateData.showingRecords}
          />
        </div>
      </div>
    </ConnectLayout>
  )
}

export default BillingHistory
