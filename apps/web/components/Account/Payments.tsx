import React, { FC } from 'react'
import { Typography, Tooltip } from 'antd'
import TableLayout, { AccountTabProps } from './TableLayout'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { usePaymentsQuery, usePaymentCountQuery } from '@pabau/graphql'
import { DisplayDate } from '../../hooks/displayDate'

const Payments: FC<AccountTabProps> = ({
  searchTerm,
  selectedDates,
  filterValue,
  selectedRange,
  accountRef,
  companyCurrency,
}) => {
  const { t } = useTranslationI18()
  const PaymentColumns = [
    {
      title: t('account.finance.payments.columns.payment.no'),
      dataIndex: 'id',
      className: 'drag-visible',
      visible: true,
      width: '120px',
      skeletonWidth: '80px',
    },
    {
      title: t('account.finance.payments.columns.invoiceNo'),
      dataIndex: 'invoiceNo',
      visible: true,
      skeletonWidth: '80px',
      width: '140px',
      render: function render(data) {
        return (
          <Typography.Text style={{ color: '#54B2D3' }}>{data}</Typography.Text>
        )
      },
    },
    {
      title: t('account.finance.payments.columns.location'),
      dataIndex: 'location',
      className: 'drag-visible',
      skeletonWidth: '80px',
      visible: true,
      render: function render(data) {
        const item = data?.slice(0, 35)
        const isLarge = data?.length > 35
        return (
          <Tooltip title={isLarge && data}>
            <div style={{ minWidth: '50px' }}>
              {isLarge ? item + '...' : data}
            </div>
          </Tooltip>
        )
      },
    },
    {
      title: t('account.finance.payments.columns.date'),
      dataIndex: 'invDate',
      className: 'drag-visible',
      skeletonWidth: '80px',
      width: '120px',
      visible: true,
      render: function render(data) {
        return <Typography.Text>{DisplayDate(data)}</Typography.Text>
      },
    },
    {
      title: t('account.finance.payments.columns.customer'),
      dataIndex: 'customer',
      className: 'drag-visible',
      skeletonWidth: '80px',
      visible: true,
      render: function render(data) {
        const item = data?.slice(0, 30)
        const isLarge = data?.length > 30
        return (
          <Tooltip title={isLarge && data}>
            <Typography.Text style={{ color: '#54B2D3' }}>
              {isLarge ? item + '...' : data}
            </Typography.Text>
          </Tooltip>
        )
      },
    },
    {
      title: t('account.finance.payments.columns.amount'),
      dataIndex: 'amount',
      className: 'drag-visible',
      skeletonWidth: '80px',
      width: '100px',
      visible: true,
      render: function render(amount) {
        return <Typography.Text>{companyCurrency + amount}</Typography.Text>
      },
    },
    {
      title: t('account.finance.payments.columns.payment.method'),
      dataIndex: 'payment',
      className: 'drag-visible',
      skeletonWidth: '50px',
      visible: true,
      width: '180px',
    },
    {
      title: t('account.finance.payments.columns.user'),
      dataIndex: 'user',
      className: 'drag-visible',
      skeletonWidth: '80px',
      visible: true,
    },
  ]
  return (
    <TableLayout
      columns={PaymentColumns}
      searchTerm={searchTerm}
      selectedDates={selectedDates}
      filterValue={filterValue}
      selectedRange={selectedRange}
      listQuery={usePaymentsQuery}
      aggregateQuery={usePaymentCountQuery}
      noDataText={t('account.finance.payments.empty.data.text')}
      tabName="payment"
      accountRef={accountRef}
    />
  )
}

export default Payments
