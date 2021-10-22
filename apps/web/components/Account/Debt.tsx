import React, { FC, useState } from 'react'
import { Avatar, Typography, Tooltip } from 'antd'
import { ButtonLabel, Stepper } from '@pabau/ui'
import { MailOutlined, BellOutlined } from '@ant-design/icons'
import TableLayout, { AccountTabProps } from './TableLayout'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import xeroBlue from '../../assets/images/xero.svg'
import xeroRed from '../../assets/images/xero/red.svg'
import { tempType } from './Invoice'
import dayjs from 'dayjs'
import { useDebtsQuery, useDebtCountQuery } from '@pabau/graphql'
import relativeTime from 'dayjs/plugin/relativeTime'
import { DisplayDate } from '../../hooks/displayDate'

interface ActionType {
  communication_id: number
  time: Date
}

const Debt: FC<AccountTabProps> = ({
  searchTerm,
  selectedDates,
  filterValue,
  selectedRange,
  accountRef,
  companyCurrency,
}) => {
  const [isHealthcodeEnabled, setIsHealthcodeEnabled] = useState<boolean>(false)
  const { t } = useTranslationI18()

  const calculateDate = (invDate: Date): string => {
    dayjs.extend(relativeTime)
    const date = dayjs(invDate).fromNow()
    return date === 'a month ago'
      ? t('account.finance.debt.one.month.ago')
      : date
  }

  const prepareLastAction = (lastActionData: ActionType[], date: Date) => {
    const actions = []
    const data = calculateDate(date)
    actions.push(
      {
        tooltip: t('account.finance.invoice.create.message', {
          data,
        }),
      },
      {
        tooltip: t('account.finance.invoice.letter.send', {
          count: 1,
        }),
      }
    )
    if (lastActionData[0]) {
      const data = calculateDate(lastActionData[0]?.time)
      actions[1]['tooltip'] = t(
        'account.finance.invoice.letter.send.with.date',
        {
          date: data,
        }
      )
      actions.push({
        tooltip: t('account.finance.invoice.letter.send', {
          count: 2,
        }),
      })
    }
    if (lastActionData[1]) {
      const data = calculateDate(lastActionData[1]?.time)
      actions[2]['tooltip'] = t(
        'account.finance.invoice.letter.send.with.date',
        {
          date: data,
        }
      )
      actions.push({
        tooltip: t('account.finance.invoice.letter.send', {
          count: 3,
        }),
      })
    }
    if (lastActionData[2]) {
      const data = calculateDate(lastActionData[2]?.time)
      actions[3]['tooltip'] = t(
        'account.finance.invoice.letter.send.with.date',
        {
          date: data,
        }
      )
    }
    return actions
  }

  const calculateAge = (invDate: Date): string => {
    const date = dayjs(invDate)
    const days = dayjs().diff(date, 'days')
    let age = ''
    switch (true) {
      case days <= 30:
        age = t('account.finance.debt.30.days')
        break
      case days > 30 && days < 61:
        age = t('account.finance.debt.31.60.days')
        break
      case days > 60 && days < 91:
        age = t('account.finance.debt.61.90.days')
        break
      case days > 90 && days < 121:
        age = t('account.finance.debt.91.120.days')
        break
      case days > 120 && days < 151:
        age = t('account.finance.debt.121.150.days')
        break
      case days > 150 && days < 181:
        age = t('account.finance.debt.151.180.days')
        break
      case days > 180 && days < 211:
        age = t('account.finance.debt.181.210.days')
        break
      case days > 210 && days < 241:
        age = t('account.finance.debt.211.240.days')
        break
      case days > 240 && days < 271:
        age = t('account.finance.debt.241.270.days')
        break
      case days > 270 && days < 301:
        age = t('account.finance.debt.271.300.days')
        break
      case days > 300 && days < 331:
        age = t('account.finance.debt.301.330.days')
        break
      default:
        age = t('account.finance.debt.330.days')
        break
    }
    return age
  }

  const mailIcon = (title = '') => (
    <Tooltip title={title}>
      <MailOutlined style={{ fontSize: 10 }} />
    </Tooltip>
  )
  const bellIcon = (title = '') => (
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
      skeletonWidth: '30px',
      render: function render(_, { status, tooltip }) {
        const image = status === 2 ? xeroBlue : xeroRed
        return (
          <Tooltip placement="top" title={tooltip}>
            <Avatar src={image} size="small" />
          </Tooltip>
        )
      },
    },
    {
      title: t('account.finance.debt.columns.invoice.no'),
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
      title: t('account.finance.debt.columns.location'),
      dataIndex: 'location',
      visible: true,
      skeletonWidth: '70px',
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
      title: t('account.finance.debt.columns.inv.date'),
      dataIndex: 'invDate',
      skeletonWidth: '70px',
      visible: true,
      render: function render(data) {
        return <Typography.Text>{DisplayDate(data)}</Typography.Text>
      },
    },
    {
      title: t('account.finance.debt.columns.customer'),
      dataIndex: 'customer',
      skeletonWidth: '70px',
      visible: true,
      render: function render(data) {
        const item = data?.slice(0, 30)
        const isLarge = data?.length > 30
        return (
          <Tooltip title={isLarge && data}>
            <Typography.Text style={data !== 'N/A' && { color: '#54B2D3' }}>
              {isLarge ? item + '...' : data}
            </Typography.Text>
          </Tooltip>
        )
      },
      ellipsis: true,
    },
    {
      title: t('account.finance.debt.columns.debtor'),
      dataIndex: 'debtor',
      skeletonWidth: '70px',
      visible: true,
      render: function render(debtor) {
        const item = debtor?.slice(0, 30)
        const isLarge = debtor?.length > 30
        return (
          <Tooltip title={isLarge && debtor}>
            <Typography.Text style={{ color: '#54B2D3' }}>
              {isLarge ? item + '...' : debtor}
            </Typography.Text>
          </Tooltip>
        )
      },
      ellipsis: true,
    },
    {
      title: t('account.finance.debt.columns.status'),
      dataIndex: 'payment',
      skeletonWidth: '70px',
      visible: true,
      render: function render(data) {
        return (
          <ButtonLabel
            style={{ minWidth: 55, paddingTop: 1 }}
            type={tempType[data]}
            text={data}
          />
        )
      },
    },
    {
      title: t('account.finance.debt.columns.age'),
      dataIndex: 'age',
      skeletonWidth: '70px',
      visible: true,
      render: function render(data, { invDate }) {
        const age = calculateAge(invDate)
        return <Typography.Text>{age}</Typography.Text>
      },
    },
    {
      title: t('account.finance.debt.columns.balance'),
      dataIndex: 'balance',
      visible: true,
      skeletonWidth: '50px',
      width: '90px',
      render: function render(_, { balance, status }) {
        return (
          <Typography.Text type={!status ? 'danger' : undefined}>
            {companyCurrency + balance}
          </Typography.Text>
        )
      },
    },
    {
      title: t('account.finance.debt.columns.last.action'),
      dataIndex: 'lastAction',
      visible: true,
      skeletonWidth: '70px',
      width: '200px',
      render: function render(_, { lastAction, invDate }) {
        const lastActionRecords = prepareLastAction(lastAction, invDate)
        const stepper = lastActionRecords.length - 1
        const data = [
          {
            index: 0,
            step: 1,
            name: '',
            img: mailIcon(),
            isActive: true,
          },
          {
            index: 1,
            step: 2,
            name: '',
            img: bellIcon(),
            isActive: false,
          },
          {
            index: 2,
            step: 3,
            name: '',
            img: bellIcon(),
            isActive: false,
          },
          {
            index: 3,
            step: 4,
            name: '',
            img: bellIcon(),
            isActive: false,
          },
        ]
        for (const [index, item] of lastActionRecords.entries()) {
          if (index === 0) {
            data[index]['img'] = mailIcon(item.tooltip)
          } else {
            data[index]['img'] = bellIcon(item.tooltip)
          }
        }
        return <Stepper step={stepper} datasource={data} />
      },
    },
  ]

  if (isHealthcodeEnabled) {
    DebtColumns.splice(8, 0, {
      title: t('account.finance.invoice.columns.status'),
      dataIndex: 'healthcodeStatus',
      skeletonWidth: '50px',
      visible: true,
      width: '80px',
      render: function render(data) {
        return (
          data && (
            <ButtonLabel
              style={{ minWidth: 92, paddingTop: 1 }}
              type={
                data === 'Failed'
                  ? 'danger'
                  : data === 'Unprocessed'
                  ? 'warning'
                  : 'info'
              }
              text={data}
            />
          )
        )
      },
    })
  }

  return (
    <TableLayout
      columns={DebtColumns}
      searchTerm={searchTerm}
      selectedDates={selectedDates}
      filterValue={filterValue}
      selectedRange={selectedRange}
      listQuery={useDebtsQuery}
      aggregateQuery={useDebtCountQuery}
      noDataText={t('account.finance.debt.empty.data.text')}
      setIsHealthcodeEnabled={setIsHealthcodeEnabled}
      tabName="debt"
      accountRef={accountRef}
    />
  )
}

export default Debt
