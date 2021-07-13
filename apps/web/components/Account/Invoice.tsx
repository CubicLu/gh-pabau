import React, { FC } from 'react'
import { ButtonLabel, Button } from '@pabau/ui'
import { Avatar, Typography, Tooltip } from 'antd'
import TableLayout, { FilterValueType } from './TableLayout'
import styles from '../../pages/setup/settings/loyalty.module.less'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import xeroBlue from '../../assets/images/xero.svg'
import xeroRed from '../../assets/images/xero/red.svg'
import { Dayjs } from 'dayjs'
import { useInvoicesQuery, useInvoiceCountQuery } from '@pabau/graphql'

export const tempType = {
  Paid: 'success',
  Unpaid: 'danger',
  'Part Paid': 'warning',
}

const tempStatus = {
  '': 'Unprocessed',
  0: 'Unprocessed',
  2: 'Submitted',
}

interface InvoiceProps {
  searchTerm: string
  selectedDates: Dayjs[]
  filterValue: FilterValueType
  selectedRange: string
}

const Invoice: FC<InvoiceProps> = ({
  searchTerm,
  selectedDates,
  filterValue,
  selectedRange,
}) => {
  const { t } = useTranslationI18()
  const InvoiceColumns = [
    {
      title: '',
      dataIndex: 'invoice_img',
      visible: true,
      width: '40px',
      skeletonWidth: '30px',
      render: function render(data, { status, tooltip }) {
        const image = status === 2 ? xeroBlue : xeroRed
        return (
          <Tooltip placement="top" title={tooltip}>
            <Avatar src={image} size="small" />
          </Tooltip>
        )
      },
    },
    {
      title: t('account.finance.invoice.columns.invoice.no'),
      dataIndex: 'invoice_no',
      visible: true,
      width: '120px',
      skeletonWidth: '50px',
      render: function render(data) {
        return (
          <Typography.Text style={{ color: '#54B2D3' }}>{data}</Typography.Text>
        )
      },
    },
    {
      title: t('account.finance.invoice.columns.location'),
      dataIndex: 'location',
      visible: true,
      skeletonWidth: '50px',
    },
    {
      title: t('account.finance.invoice.columns.inv.date'),
      dataIndex: 'inv_date',
      visible: true,
      skeletonWidth: '50px',
      render: function render(data) {
        return <Typography.Text>{data.split('T')[0]}</Typography.Text>
      },
    },
    {
      title: t('account.finance.invoice.columns.customer'),
      dataIndex: 'customer',
      skeletonWidth: '50px',
      visible: true,
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
      title: t('account.finance.invoice.columns.debtor'),
      dataIndex: 'debtor',
      skeletonWidth: '50px',
      visible: true,
      render: function render(data) {
        return (
          <Typography.Text style={{ color: '#54B2D3', minWidth: 88 }}>
            {data}
          </Typography.Text>
        )
      },
      ellipsis: true,
    },
    {
      title: t('account.finance.invoice.columns.status'),
      dataIndex: 'status',
      skeletonWidth: '50px',
      visible: true,
      render: function render(data) {
        const status = tempStatus[data ?? ''] ?? 'Failed'
        return (
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
        )
      },
    },
    {
      title: t('account.finance.invoice.columns.payment'),
      dataIndex: 'payment',
      skeletonWidth: '50px',
      visible: true,
      width: '100px',
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
      title: t('account.finance.invoice.columns.net'),
      dataIndex: 'net',
      skeletonWidth: '50px',
      visible: true,
      render: function render(data) {
        return <Typography.Text>£{data}</Typography.Text>
      },
    },
    {
      title: t('account.finance.invoice.columns.gst'),
      dataIndex: 'vat',
      skeletonWidth: '50px',
      visible: true,
      render: function render(data) {
        return <Typography.Text>£{data}</Typography.Text>
      },
    },
    {
      title: t('account.finance.invoice.columns.gross'),
      dataIndex: 'gross',
      skeletonWidth: '50px',
      visible: true,
      render: function render(data) {
        return <Typography.Text>£{data}</Typography.Text>
      },
    },
    {
      title: t('account.finance.invoice.columns.paid'),
      dataIndex: 'paid',
      skeletonWidth: '50px',
      visible: true,
      render: function render(data) {
        return <Typography.Text>£{data}</Typography.Text>
      },
    },
    {
      title: t('account.finance.invoice.columns.balance'),
      dataIndex: 'balance',
      visible: true,
      skeletonWidth: '50px',
      width: '100px',
      render: function render(data, { payment }) {
        return (
          <Typography.Text type={payment !== 'Paid' ? 'danger' : undefined}>
            £{data}
          </Typography.Text>
        )
      },
    },
    {
      title: '',
      dataIndex: 'card',
      skeletonWidth: '50px',
      visible: true,
      render: function render(data, { payment }) {
        return (
          payment !== 'Paid' && (
            <Button type="primary" className={styles.saveBtn}>
              {t('account.finance.invoice.columns.card.btn')}
            </Button>
          )
        )
      },
    },
  ]
  return (
    <TableLayout
      columns={InvoiceColumns}
      searchTerm={searchTerm}
      selectedDates={selectedDates}
      filterValue={filterValue}
      selectedRange={selectedRange}
      listQuery={useInvoicesQuery}
      aggregateQuery={useInvoiceCountQuery}
    />
  )
}

export default Invoice
