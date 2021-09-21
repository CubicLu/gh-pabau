import React, { FC } from 'react'
import { Avatar, Typography, Tooltip } from 'antd'
import TableLayout, { AccountTabProps } from './TableLayout'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import xeroBlue from '../../assets/images/xero.svg'
import xeroRed from '../../assets/images/xero/red.svg'
import { useCreditNotesQuery, useCreditNoteCountQuery } from '@pabau/graphql'
import { DisplayDate } from '../../hooks/displayDate'

const CreditNotes: FC<AccountTabProps> = ({
  searchTerm,
  selectedDates,
  filterValue,
  selectedRange,
  accountRef,
  companyCurrency,
}) => {
  const { t } = useTranslationI18()

  const CreditNoteColumns = [
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
      title: t('account.finance.credit.note.columns.credit.no'),
      dataIndex: 'creditNo',
      visible: true,
      width: '90px',
      skeletonWidth: '50px',
      render: function render(data) {
        return (
          <Typography.Text style={{ color: '#54B2D3' }}>{data}</Typography.Text>
        )
      },
    },
    {
      title: t('account.finance.credit.note.columns.location'),
      dataIndex: 'location',
      visible: true,
      skeletonWidth: '100px',
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
      title: t('account.finance.credit.note.columns.credit.date'),
      dataIndex: 'creditDate',
      visible: true,
      width: '120px',
      skeletonWidth: '80px',
      render: function render(data) {
        return <Typography.Text>{DisplayDate(data)}</Typography.Text>
      },
    },
    {
      title: t('account.finance.credit.note.columns.customer'),
      dataIndex: 'customer',
      visible: true,
      skeletonWidth: '100px',
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
      title: t('account.finance.credit.note.columns.debtor'),
      dataIndex: 'debtor',
      visible: true,
      skeletonWidth: '100px',
      render: function render(data) {
        const item = data?.slice(0, 30)
        const isLarge = data?.length > 30
        return (
          <Tooltip title={isLarge && data}>
            <Typography.Text style={{ color: '#54B2D3' }}>
              {isLarge ? item + '...' : data}
            </Typography.Text>
          </Tooltip>
        )
      },
      ellipsis: true,
    },
    {
      title: t('account.finance.credit.note.columns.invoice.no'),
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
      title: t('account.finance.credit.note.columns.total'),
      dataIndex: 'total',
      visible: true,
      width: '100px',
      skeletonWidth: '50px',
      render: function render(data) {
        return <Typography.Text>{companyCurrency + data}</Typography.Text>
      },
    },
    {
      title: t('account.finance.credit.note.columns.type'),
      dataIndex: 'type',
      visible: true,
      skeletonWidth: '50px',
    },
  ]

  return (
    <TableLayout
      columns={CreditNoteColumns}
      searchTerm={searchTerm}
      selectedDates={selectedDates}
      filterValue={filterValue}
      selectedRange={selectedRange}
      listQuery={useCreditNotesQuery}
      aggregateQuery={useCreditNoteCountQuery}
      noDataText={t('account.finance.credit.not.empty.data.text')}
      tabName="creditNote"
      accountRef={accountRef}
    />
  )
}

export default CreditNotes
