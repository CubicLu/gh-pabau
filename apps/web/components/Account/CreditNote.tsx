import React, { FC } from 'react'
import { Avatar, Typography, Tooltip } from 'antd'
import TableLayout, { FilterValueType } from './TableLayout'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { Dayjs } from 'dayjs'
import xeroBlue from '../../assets/images/xero.svg'
import xeroRed from '../../assets/images/xero/red.svg'
import { useCreditNotesQuery, useCreditNoteCountQuery } from '@pabau/graphql'

interface CreditNoteProps {
  searchTerm: string
  selectedDates: Dayjs[]
  filterValue: FilterValueType
  selectedRange: string
}

const CreditNotes: FC<CreditNoteProps> = ({
  searchTerm,
  selectedDates,
  filterValue,
  selectedRange,
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
    },
    {
      title: t('account.finance.credit.note.columns.credit.date'),
      dataIndex: 'creditDate',
      visible: true,
      width: '120px',
      skeletonWidth: '80px',
      render: function render(data) {
        return <Typography.Text>{data.split('T')[0]}</Typography.Text>
      },
    },
    {
      title: t('account.finance.credit.note.columns.customer'),
      dataIndex: 'customer',
      visible: true,
      skeletonWidth: '100px',
      render: function render(data) {
        return (
          <Typography.Text style={data !== 'N/A' && { color: '#54B2D3' }}>
            {data}
          </Typography.Text>
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
        return (
          <Typography.Text style={{ color: '#54B2D3' }}>{data}</Typography.Text>
        )
      },
      ellipsis: true,
    },
    {
      title: t('account.finance.credit.note.columns.invoice.no'),
      dataIndex: 'invoiceNo',
      visible: true,
      width: '100px',
      skeletonWidth: '50px',
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
        return <Typography.Text>£{data}</Typography.Text>
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
    />
  )
}

export default CreditNotes
