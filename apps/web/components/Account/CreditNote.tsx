import React, { FC } from 'react'
import { Typography } from 'antd'
import { gql } from '@apollo/client'
import TableLayout from './TableLayout'
import { useTranslationI18 } from '../../hooks/useTranslationI18'

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
  const { t } = useTranslationI18()

  const CreditNoteColumns = [
    {
      title: t('account.finance.credit.note.columns.credit.no'),
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
      title: t('account.finance.credit.note.columns.location'),
      dataIndex: 'location',
      visible: true,
    },
    {
      title: t('account.finance.credit.note.columns.credit.date'),
      dataIndex: 'credit_date',
      visible: true,
      width: '120px',
    },
    {
      title: t('account.finance.credit.note.columns.customer'),
      dataIndex: 'customer',
      visible: true,
      // eslint-disable-next-line react/display-name
      render: (_, { customer }) => (
        <Typography.Text style={{ color: '#54B2D3' }}>
          {customer}
        </Typography.Text>
      ),
      ellipsis: true,
    },
    {
      title: t('account.finance.credit.note.columns.debtor'),
      dataIndex: 'debtor',
      visible: true,
      // eslint-disable-next-line react/display-name
      render: (_, { debtor }) => (
        <Typography.Text style={{ color: '#54B2D3' }}>{debtor}</Typography.Text>
      ),
      ellipsis: true,
    },
    {
      title: t('account.finance.credit.note.columns.invoice.no'),
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
      title: t('account.finance.credit.note.columns.total'),
      dataIndex: 'total',
      visible: true,
      width: '80px',
      // eslint-disable-next-line react/display-name
      render: (_, { total }) => (
        <Typography.Text>£{total.toFixed(2)}</Typography.Text>
      ),
    },
    {
      title: t('account.finance.credit.note.columns.type'),
      dataIndex: 'type',
      visible: true,
    },
  ]

  return (
    <TableLayout
      listQuery={LIST_QUERY}
      aggregateQuery={LIST_AGGREGATE}
      columns={CreditNoteColumns}
    />
  )
}

export default CreditNotes
