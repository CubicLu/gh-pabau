import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Table, Pagination } from '@pabau/ui'
import styles from './Payments.module.less'
import { ClientFinancialsLayoutProps } from './../ClientFinancialsLayout'
import { Typography, Button, Popover, Radio, Space } from 'antd'
import { FilterOutlined } from '@ant-design/icons'
import InvoiceFooter from './../invoices/invoice-footer/InvoiceFooter'

const getInvoicePaymentValues = () => {
  return {
    type: 'all',
  }
}

export const Payments: FC<ClientFinancialsLayoutProps> = ({
  payments,
  accountCredit,
  totalPayments,
}) => {
  const { t } = useTranslation('common')
  const { Text } = Typography
  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 10,
    currentPage: 1,
    showingRecords: 0,
  })
  const [paymentFilter, setPaymentFilter] = useState(getInvoicePaymentValues())

  const columns = [
    {
      title: t('ui.client-card-financial.payments.date'),
      dataIndex: 'date',
      className: 'columnTitle',
      width: 100,
      visible: true,
    },
    {
      title: t('ui.client-card-financial.payments.invoice-no'),
      dataIndex: 'invoiceNo',
      visible: true,
      width: 80,
      render: function renderItem(value) {
        return <span className={styles.primaryText}>#{value}</span>
      },
    },
    {
      title: t('ui.client-card-financial.payments.payment-no'),
      dataIndex: 'paymentNo',
      visible: true,
      width: 80,
      render: function renderItem(value) {
        return <span className={styles.primaryText}>#{value}</span>
      },
    },
    {
      title: t('ui.client-card-financial.payments.location'),
      dataIndex: 'location',
      visible: true,
      width: 150,
    },
    {
      title: t('ui.client-card-financial.payments.employee'),
      dataIndex: 'employee',
      visible: true,
      width: 100,
    },
    {
      title: t('ui.client-card-financial.payments.paid-by'),
      dataIndex: 'paidBy',
      visible: true,
      width: 100,
    },
    {
      title: t('ui.client-card-financial.payments.method'),
      dataIndex: 'method',
      visible: true,
      width: 80,
    },
    {
      title: t('ui.client-card-financial.payments.amount'),
      dataIndex: 'amount',
      visible: true,
      width: 80,
      render: function renderItem(value) {
        return <span>£{value.toFixed(2)}</span>
      },
    },
  ]

  const onPaginationChange = (currentPage) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({ ...paginateData, offset, currentPage: currentPage })
  }

  const filterContent = () => {
    return (
      <div>
        <div className={styles.invoicesFilCont}>
          <Text>{t('connect.onlinebooking.payment.payment')}</Text>
          <div>
            <Radio.Group
              onChange={(e) =>
                setPaymentFilter({ ...paymentFilter, type: e.target.value })
              }
              value={paymentFilter.type}
            >
              <Space direction="vertical">
                <Radio value={'all'}>
                  {t('ui.client-card-financial.invoices.all')}
                </Radio>
                <Radio value={'unallocated_payments'}>
                  Unallocated payments
                </Radio>
                <Radio value={'allocated_payments'}>Allocated payments</Radio>
              </Space>
            </Radio.Group>
          </div>
        </div>
        <div className={styles.invoicesFilCont}>
          <Button onClick={() => setPaymentFilter(getInvoicePaymentValues())}>
            {t('ui.client-card-financial.invoices.clear-all')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.payments}>
      <div className={styles.filterRow}>
        <Popover
          content={filterContent}
          title={t('ui.client-card-financial.invoices.filter-by')}
          placement="bottomRight"
          overlayClassName={styles.paymentsFilter}
        >
          <div className={styles.filter}>
            <FilterOutlined />
          </div>
        </Popover>
      </div>
      <Table
        loading={false}
        draggable={false}
        scroll={{ x: true }}
        dataSource={payments?.map((e: { id }) => ({
          key: e.id,
          ...e,
        }))}
        columns={columns}
        noDataText={t('ui.client-card-financial.payments')}
      />
      <div className={styles.pagination}>
        <Pagination
          total={paginateData.total}
          defaultPageSize={10}
          showSizeChanger={false}
          onChange={onPaginationChange}
          pageSize={paginateData.limit}
          current={paginateData.currentPage}
          showingRecords={paginateData.showingRecords}
        />
      </div>

      <InvoiceFooter
        buttons={[
          {
            text: t('ui.client-card-financial.payments.account-credit'),
            value: accountCredit,
            valueColor: '#65CD98',
          },
          {
            text: t('ui.client-card-financial.payments.total-payments'),
            value: totalPayments,
          },
        ]}
      />
    </div>
  )
}
