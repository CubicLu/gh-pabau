import React, { FC } from 'react'
import { Typography } from 'antd'
import { gql } from '@apollo/client'
import TableLayout from './TableLayout'
const PaymentColumns = [
  {
    title: 'Payment No.',
    dataIndex: 'payment_no',
    className: 'drag-visible',
    visible: true,
    width: '120px',
  },
  {
    title: 'Location',
    dataIndex: 'location',
    className: 'drag-visible',
    visible: true,
  },
  {
    title: 'Inv Date',
    dataIndex: 'inv_date',
    className: 'drag-visible',
    visible: true,
  },
  {
    title: 'Account',
    dataIndex: 'account',
    className: 'drag-visible',
    visible: true,
    // eslint-disable-next-line react/display-name
    render: (_, { account }) => (
      <Typography.Text style={{ color: '#54B2D3' }}>{account}</Typography.Text>
    ),
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    className: 'drag-visible',
    visible: true,
    // eslint-disable-next-line react/display-name
    render: (_, { amount }) => (
      <Typography.Text>£{amount.toFixed(2)}</Typography.Text>
    ),
  },
  {
    title: 'Payment method',
    dataIndex: 'payment_method',
    className: 'drag-visible',
    visible: true,
  },
  {
    title: 'User',
    dataIndex: 'user',
    className: 'drag-visible',
    visible: true,
  },
]

const LIST_QUERY = gql`
  query payments($offset: Int, $limit: Int) {
    payments(offset: $offset, limit: $limit) {
      id
      payment_no
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
  return (
    <TableLayout
      listQuery={LIST_QUERY}
      aggregateQuery={LIST_AGGREGATE}
      columns={PaymentColumns}
    />
  )
}

export default Payments
