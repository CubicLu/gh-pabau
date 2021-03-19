import React, { FC } from 'react'
import { ButtonLabel } from '@pabau/ui'
import { Avatar, Typography } from 'antd'
import { gql } from '@apollo/client'
import TableLayout from './TableLayout'
const InvoiceColumns = [
  {
    title: '',
    dataIndex: 'invoice_no',
    visible: true,
    width: '40px',
    // eslint-disable-next-line react/display-name
    render: (_, data) => <Avatar src={data.invoice_logo} size="small" />,
  },
  {
    title: 'Invoice No.',
    dataIndex: 'invoice_no',
    visible: true,
    width: '120px',
    // eslint-disable-next-line react/display-name
    render: (_, { invoice_no }) => (
      <Typography.Text style={{ color: '#54B2D3' }}>
        {invoice_no}
      </Typography.Text>
    ),
  },
  {
    title: 'Location',
    dataIndex: 'location',
    visible: true,
  },
  {
    title: 'Inv Date',
    dataIndex: 'inv_date',
    visible: true,
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
    visible: true,
    // eslint-disable-next-line react/display-name
    render: (_, { customer }) => (
      <Typography.Text style={{ color: '#54B2D3' }}>{customer}</Typography.Text>
    ),
    ellipsis: true,
  },
  {
    title: 'Debtor',
    dataIndex: 'debtor',
    visible: true,
    // eslint-disable-next-line react/display-name
    render: (_, { debtor }) => (
      <Typography.Text style={{ color: '#54B2D3', minWidth: 88 }}>
        {debtor}
      </Typography.Text>
    ),
    ellipsis: true,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    visible: true,
    // eslint-disable-next-line react/display-name
    render: (_, { status }) => (
      <ButtonLabel
        style={{ minWidth: 92, paddingTop: 1 }}
        type={
          status === 'Failed'
            ? 'danger'
            : status === 'Unprocessed'
            ? 'warning'
            : 'info'
        }
        text={status}
      />
    ),
  },
  {
    title: 'Payment',
    dataIndex: 'payment',
    visible: true,
    // eslint-disable-next-line react/display-name
    render: (_, { payment }) => (
      <ButtonLabel
        style={{ minWidth: 52, paddingTop: 1 }}
        type={payment ? 'success' : 'danger'}
        text={payment ? 'Paid' : 'Unpaid'}
      />
    ),
  },
  {
    title: 'Net',
    dataIndex: 'net',
    visible: true,
    // eslint-disable-next-line react/display-name
    render: (_, { net }) => (
      <Typography.Text>£{net.toFixed(2)}</Typography.Text>
    ),
  },
  {
    title: 'Vat',
    dataIndex: 'vat',
    visible: true,
    // eslint-disable-next-line react/display-name
    render: (_, { vat }) => (
      <Typography.Text>£{vat.toFixed(2)}</Typography.Text>
    ),
  },
  {
    title: 'Gross',
    dataIndex: 'gross',
    visible: true,
    // eslint-disable-next-line react/display-name
    render: (_, { gross }) => (
      <Typography.Text>£{gross.toFixed(2)}</Typography.Text>
    ),
  },
  {
    title: 'Paid',
    dataIndex: 'paid',
    visible: true,
    // eslint-disable-next-line react/display-name
    render: (_, { paid }) => (
      <Typography.Text>£{paid.toFixed(2)}</Typography.Text>
    ),
  },
  {
    title: 'Balance',
    dataIndex: 'balance',
    visible: true,
    // eslint-disable-next-line react/display-name
    render: (_, { balance, payment }) => (
      <Typography.Text type={payment ? undefined : 'danger'}>
        £{balance.toFixed(2)}
      </Typography.Text>
    ),
  },
]

const LIST_QUERY = gql`
  query invoices($offset: Int, $limit: Int) {
    invoices(offset: $offset, limit: $limit) {
      id
      invoice_no
      invoice_logo
      location
      inv_date
      customer
      status
      payment
      net
      vat
      gross
      debtor
      paid
      balance
    }
  }
`

const LIST_AGGREGATE = gql`
  query invoices_aggregate {
    invoices_aggregate {
      aggregate {
        count
      }
    }
  }
`

const Invoice: FC = () => {
  return (
    <TableLayout
      listQuery={LIST_QUERY}
      aggregateQuery={LIST_AGGREGATE}
      columns={InvoiceColumns}
    />
  )
}

export default Invoice
