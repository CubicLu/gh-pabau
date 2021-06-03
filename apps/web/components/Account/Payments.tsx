import React, { FC } from 'react'
import { Typography } from 'antd'
import { gql } from '@apollo/client'
import TableLayout from './TableLayout'
import { useTranslationI18 } from '../../hooks/useTranslationI18'

const LIST_QUERY = gql`
  query payments($offset: Int, $limit: Int) {
    payments(offset: $offset, limit: $limit) {
      id
      payment_no
      against
      location
      inv_date
      account
      amount
      payment_method
      user
    }
  }
`

const LIST_AGGREGATE = gql`
  query payments_aggregate {
    payments_aggregate {
      aggregate {
        count
      }
    }
  }
`
const Payments: FC = () => {
  const { t } = useTranslationI18()
  const PaymentColumns = [
    {
      title: t('account.finance.payments.columns.payment.no'),
      dataIndex: 'payment_no',
      className: 'drag-visible',
      visible: true,
      width: '120px',
    },
    {
      title: t('account.finance.payments.columns.Against'),
      dataIndex: 'against',
      visible: true,
      width: '150px',
    },
    {
      title: t('account.finance.payments.columns.Location'),
      dataIndex: 'location',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('account.finance.payments.columns.Date'),
      dataIndex: 'inv_date',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('account.finance.payments.columns.Account'),
      dataIndex: 'account',
      className: 'drag-visible',
      visible: true,
      // eslint-disable-next-line react/display-name
      render: (_, { account }) => (
        <Typography.Text style={{ color: '#54B2D3' }}>
          {account}
        </Typography.Text>
      ),
    },
    {
      title: t('account.finance.payments.columns.Amount'),
      dataIndex: 'amount',
      className: 'drag-visible',
      visible: true,
      // eslint-disable-next-line react/display-name
      render: (_, { amount }) => (
        <Typography.Text>£{amount.toFixed(2)}</Typography.Text>
      ),
    },
    {
      title: t('account.finance.payments.columns.payment.method'),
      dataIndex: 'payment_method',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('account.finance.payments.columns.user'),
      dataIndex: 'user',
      className: 'drag-visible',
      visible: true,
    },
  ]
  return (
    <TableLayout
      listQuery={LIST_QUERY}
      aggregateQuery={LIST_AGGREGATE}
      columns={PaymentColumns}
    />
  )
}

export default Payments
