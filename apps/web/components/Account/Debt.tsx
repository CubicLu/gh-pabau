import React, { FC } from 'react'
import { Avatar, Typography, Tooltip } from 'antd'
import { ButtonLabel, Stepper } from '@pabau/ui'
import { MailOutlined, BellOutlined } from '@ant-design/icons'
import { gql } from '@apollo/client'
import TableLayout from './TableLayout'
const mailIcon = (
  <Tooltip title="Invoice sent on 23/10/2022">
    <MailOutlined style={{ fontSize: 10 }} />
  </Tooltip>
)
const ballcon1 = (
  <Tooltip title="Reminder sent 7 days later">
    <BellOutlined style={{ fontSize: 10 }} />
  </Tooltip>
)
const ballcon2 = (
  <Tooltip title="2nd reminder sent 14 days later">
    <BellOutlined style={{ fontSize: 10 }} />
  </Tooltip>
)
const ballcon3 = (
  <Tooltip title="Final notice sent 30 days later">
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
      <Typography.Text style={{ color: '#54B2D3' }}>{debtor}</Typography.Text>
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
        style={{ maxWidth: 52, paddingTop: 1 }}
        type={status ? 'info' : 'danger'}
        text={status ? 'Paid' : 'Unpaid'}
      />
    ),
  },
  {
    title: 'Age',
    dataIndex: 'age',
    visible: true,
    // eslint-disable-next-line react/display-name
    render: () => {
      const age = '<=30 days'
      return <Typography.Text>{age}</Typography.Text>
    },
  },
  {
    title: 'Balance',
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
    title: 'Last Action',
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
            img: ballcon1,
            isActive: false,
          },
          {
            index: 2,
            step: 3,
            name: '',
            img: ballcon2,
            isActive: false,
          },
          {
            index: 3,
            step: 4,
            name: '',
            img: ballcon3,
            isActive: false,
          },
        ]}
      />
    ),
  },
]

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
  return (
    <TableLayout
      listQuery={LIST_QUERY}
      aggregateQuery={LIST_AGGREGATE}
      columns={DebtColumns}
    />
  )
}

export default Debt
