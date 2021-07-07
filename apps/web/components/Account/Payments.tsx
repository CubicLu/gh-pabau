import React, { FC } from 'react'
import { Typography } from 'antd'
import TableLayout, { FilterValueType } from './TableLayout'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { Dayjs } from 'dayjs'
import { usePaymentsQuery, usePaymentCountQuery } from '@pabau/graphql'

interface PaymentProps {
  searchTerm: string
  selectedDates: Dayjs[]
  filterValue: FilterValueType
  selectedRange: string
}

const Payments: FC<PaymentProps> = ({
  searchTerm,
  selectedDates,
  filterValue,
  selectedRange,
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
      width: '100px',
      skeletonWidth: '80px',
    },
    {
      title: t('account.finance.payments.columns.location'),
      dataIndex: 'location',
      className: 'drag-visible',
      skeletonWidth: '80px',
      visible: true,
    },
    {
      title: t('account.finance.payments.columns.date'),
      dataIndex: 'invDate',
      className: 'drag-visible',
      skeletonWidth: '80px',
      visible: true,
      render: function render(data) {
        return <Typography.Text>{data.split('T')[0]}</Typography.Text>
      },
    },
    {
      title: t('account.finance.payments.columns.customer'),
      dataIndex: 'customer',
      className: 'drag-visible',
      skeletonWidth: '80px',
      visible: true,
      render: function render(data) {
        return (
          <Typography.Text style={{ color: '#54B2D3' }}>{data}</Typography.Text>
        )
      },
    },
    {
      title: t('account.finance.payments.columns.amount'),
      dataIndex: 'amount',
      className: 'drag-visible',
      skeletonWidth: '80px',
      visible: true,
      render: function render(amount) {
        return <Typography.Text>£{amount}</Typography.Text>
      },
    },
    {
      title: t('account.finance.payments.columns.payment.method'),
      dataIndex: 'payment',
      className: 'drag-visible',
      skeletonWidth: '50px',
      visible: true,
      width: '100px',
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
    />
  )
}

export default Payments
