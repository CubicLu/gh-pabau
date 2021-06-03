import React, { FC } from 'react'
import { ButtonLabel, Button } from '@pabau/ui'
import { Avatar, Typography } from 'antd'
import { gql } from '@apollo/client'
import TableLayout from './TableLayout'
import styles from '../../pages/setup/settings/loyalty.module.less'
import { useTranslationI18 } from '../../hooks/useTranslationI18'

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
  const { t } = useTranslationI18()
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
      title: t('account.finance.invoice.columns.invoice.no'),
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
      title: t('account.finance.invoice.columns.location'),
      dataIndex: 'location',
      visible: true,
    },
    {
      title: t('account.finance.invoice.columns.inv.date'),
      dataIndex: 'inv_date',
      visible: true,
    },
    {
      title: t('account.finance.invoice.columns.customer'),
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
      title: t('account.finance.invoice.columns.debtor'),
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
      title: t('account.finance.invoice.columns.status'),
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
      title: t('account.finance.invoice.columns.payment'),
      dataIndex: 'payment',
      visible: true,
      width: '100px',
      // eslint-disable-next-line react/display-name
      render: (_, { payment }) => (
        <ButtonLabel
          style={{ minWidth: 55, paddingTop: 1 }}
          type={payment ? 'success' : 'danger'}
          text={payment ? 'Paid' : 'Unpaid'}
        />
      ),
    },
    {
      title: t('account.finance.invoice.columns.net'),
      dataIndex: 'net',
      visible: true,
      // eslint-disable-next-line react/display-name
      render: (_, { net }) => (
        <Typography.Text>£{net.toFixed(2)}</Typography.Text>
      ),
    },
    {
      title: t('account.finance.invoice.columns.vat'),
      dataIndex: 'vat',
      visible: true,
      // eslint-disable-next-line react/display-name
      render: (_, { vat }) => (
        <Typography.Text>£{vat.toFixed(2)}</Typography.Text>
      ),
    },
    {
      title: t('account.finance.invoice.columns.gross'),
      dataIndex: 'gross',
      visible: true,
      // eslint-disable-next-line react/display-name
      render: (_, { gross }) => (
        <Typography.Text>£{gross.toFixed(2)}</Typography.Text>
      ),
    },
    {
      title: t('account.finance.invoice.columns.paid'),
      dataIndex: 'paid',
      visible: true,
      // eslint-disable-next-line react/display-name
      render: (_, { paid }) => (
        <Typography.Text>£{paid.toFixed(2)}</Typography.Text>
      ),
    },
    {
      title: t('account.finance.invoice.columns.balance'),
      dataIndex: 'balance',
      visible: true,
      // eslint-disable-next-line react/display-name
      render: (_, { balance, payment }) => (
        <Typography.Text type={payment ? undefined : 'danger'}>
          £{balance.toFixed(2)}
        </Typography.Text>
      ),
    },
    {
      title: '',
      dataIndex: 'card',
      visible: true,
      // eslint-disable-next-line react/display-name
      render: (_, { payment }) =>
        !payment && (
          <Button type="primary" className={styles.saveBtn}>
            {t('account.finance.invoice.columns.card.btn')}
          </Button>
        ),
    },
  ]
  return (
    <TableLayout
      listQuery={LIST_QUERY}
      aggregateQuery={LIST_AGGREGATE}
      columns={InvoiceColumns}
    />
  )
}

export default Invoice
