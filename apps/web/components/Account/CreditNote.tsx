import React, { FC } from 'react'
import { Typography } from 'antd'
import { gql } from '@apollo/client'
import TableLayout from './TableLayout'
const CreditNoteColumns = [
  {
    title: 'Credit No.',
    dataIndex: 'credit_no',
    visible: true,
    width: '90px',
    // eslint-disable-next-line react/display-name
    render: (_, { credit_no }) => (
      <Typography.Text style={{ color: '#54B2D3' }}>
        {credit_no}
      </Typography.Text>
    ),
  },
  {
    title: 'Location',
    dataIndex: 'location',
    visible: true,
  },
  {
    title: 'Credit Date',
    dataIndex: 'credit_date',
    visible: true,
    width: '120px',
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
      <Typography.Text style={{ color: '#54B2D3' }}>{debtor}</Typography.Text>
    ),
    ellipsis: true,
  },
  {
    title: 'Invoice No.',
    dataIndex: 'invoice_no',
    visible: true,
    width: '100px',
    // eslint-disable-next-line react/display-name
    render: (_, { invoice_no }) => (
      <Typography.Text style={{ color: '#54B2D3' }}>
        {invoice_no}
      </Typography.Text>
    ),
  },
  {
    title: 'Total',
    dataIndex: 'total',
    visible: true,
    width: '80px',
    // eslint-disable-next-line react/display-name
    render: (_, { total }) => (
      <Typography.Text>£{total.toFixed(2)}</Typography.Text>
    ),
  },
  {
    title: 'Type',
    dataIndex: 'type',
    visible: true,
  },
]

const LIST_QUERY = gql`
  query credit_notes($offset: Int, $limit: Int) {
    credit_notes(offset: $offset, limit: $limit) {
      id
      credit_no
      invoice_no
      location
      credit_date
      customer
      debtor
      total
      type
    }
  }
`

const LIST_AGGREGATE = gql`
  query credit_notes_aggregate {
    credit_notes_aggregate {
      aggregate {
        count
      }
    }
  }
`

const CreditNotes: FC = () => {
  return (
    <TableLayout
      listQuery={LIST_QUERY}
      aggregateQuery={LIST_AGGREGATE}
      columns={CreditNoteColumns}
    />
  )
}

export default CreditNotes
