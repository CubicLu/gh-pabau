import React, { FC } from 'react'
import { Avatar, Typography, Tooltip } from 'antd'
import { ButtonLabel, Stepper } from '@pabau/ui'
import { MailOutlined, BellOutlined } from '@ant-design/icons'
import { gql } from '@apollo/client'
import TableLayout from './TableLayout'
import { useTranslationI18 } from '../../hooks/useTranslationI18'

const LIST_QUERY = gql`
  query debt($offset: Int, $limit: Int) {
    debt(offset: $offset, limit: $limit) {
      id
      invoice_no
      location
      inv_date
      customer
      debtor
      status
      age
      balance
      last_action
    }
  }
`

const LIST_AGGREGATE = gql`
  query debt_aggregate {
    debt_aggregate {
      aggregate {
        count
      }
    }
  }
`

const Debt: FC = () => {
  const { t } = useTranslationI18()

  const mailIcon = (
    <Tooltip title={t('account.finance.debt.invoice.sent')}>
      <MailOutlined style={{ fontSize: 10 }} />
    </Tooltip>
  )
  const bellIcon = (title) => (
    <Tooltip title={title}>
      <BellOutlined style={{ fontSize: 10 }} />
    </Tooltip>
  )

  const DebtColumns = [
    {
      title: '',
      dataIndex: '',
      visible: true,
      width: '40px',
      // eslint-disable-next-line react/display-name
      render: () => (
        <Avatar
          src="https://explorance.com/wp-content/uploads/explorance/blue-logo.jpg"
          size="small"
        />
      ),
    },
    {
      title: t('account.finance.debt.columns.invoice.no'),
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
      title: t('account.finance.debt.columns.location'),
      dataIndex: 'location',
      visible: true,
    },
    {
      title: t('account.finance.debt.columns.inv.date'),
      dataIndex: 'inv_date',
      visible: true,
    },
    {
      title: t('account.finance.debt.columns.customer'),
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
      title: t('account.finance.debt.columns.debtor'),
      dataIndex: 'debtor',
      visible: true,
      // eslint-disable-next-line react/display-name
      render: (_, { debtor }) => (
        <Typography.Text style={{ color: '#54B2D3' }}>{debtor}</Typography.Text>
      ),
      ellipsis: true,
    },
    {
      title: t('account.finance.debt.columns.status'),
      dataIndex: 'status',
      visible: true,
      // eslint-disable-next-line react/display-name
      render: (_, { status }) => (
        <ButtonLabel
          style={{ maxWidth: 52, paddingTop: 1 }}
          type={status ? 'info' : 'danger'}
          text={status ? 'Paid' : 'Unpaid'}
        />
      ),
    },
    {
      title: t('account.finance.debt.columns.age'),
      dataIndex: 'age',
      visible: true,
      // eslint-disable-next-line react/display-name
      render: () => {
        const age = '<=30 days'
        return <Typography.Text>{age}</Typography.Text>
      },
    },
    {
      title: t('account.finance.debt.columns.balance'),
      dataIndex: 'balance',
      visible: true,
      // eslint-disable-next-line react/display-name
      render: (_, { balance, status }) => (
        <Typography.Text type={!status ? 'danger' : undefined}>
          £{balance.toFixed(2)}
        </Typography.Text>
      ),
    },
    {
      title: t('account.finance.debt.columns.last.action'),
      dataIndex: 'last_action',
      visible: true,
      width: '200px',
      // eslint-disable-next-line react/display-name
      render: (_, { last_action }) => (
        <Stepper
          step={last_action - 1}
          datasource={[
            {
              index: 0,
              step: 1,
              name: '',
              img: mailIcon,
              isActive: true,
            },
            {
              index: 1,
              step: 2,
              name: '',
              img: bellIcon(t('account.finance.debt.reminder.sent')),
              isActive: false,
            },
            {
              index: 2,
              step: 3,
              name: '',
              img: bellIcon(t('account.finance.debt.reminder.second.sent')),
              isActive: false,
            },
            {
              index: 3,
              step: 4,
              name: '',
              img: bellIcon(t('account.finance.debt.notice.final.sent')),
              isActive: false,
            },
          ]}
        />
      ),
    },
  ]

  return (
    <TableLayout
      listQuery={LIST_QUERY}
      aggregateQuery={LIST_AGGREGATE}
      columns={DebtColumns}
    />
  )
}

export default Debt
