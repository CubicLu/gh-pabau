import React, { FC, useState, useEffect } from 'react'
import { ButtonLabel } from '@pabau/ui'
import { Avatar, Typography, Tooltip } from 'antd'
import TableLayout, { AccountTabProps } from './TableLayout'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import xeroBlue from '../../assets/images/xero.svg'
import xeroRed from '../../assets/images/xero/red.svg'
import {
  useInvoicesQuery,
  useInvoiceCountQuery,
  useGetCompanyMetaQuery,
} from '@pabau/graphql'
import { DisplayDate } from '../../hooks/displayDate'
import EditInvoice from './../../components/ClientCard/client-financial-layout/invoices/EditInvoice'

export const tempType = {
  Paid: 'success',
  Unpaid: 'danger',
  'Part Paid': 'warning',
}

const Invoice: FC<AccountTabProps> = ({
  searchTerm,
  selectedDates,
  filterValue,
  selectedRange,
  accountRef,
  companyCurrency,
}) => {
  const [isHealthcodeEnabled, setIsHealthcodeEnabled] = useState<boolean>(false)
  const [editInvoice, setEditInvoice] = useState<number>()
  const { t } = useTranslationI18()
  const [taxName, setTaxName] = useState('VAT')
  const { data } = useGetCompanyMetaQuery({
    variables: {
      name: ['tax_singular'],
    },
  })

  useEffect(() => {
    if (data?.findManyCompanyMeta) {
      const tax = data?.findManyCompanyMeta?.[0]?.meta_value ?? 'VAT'
      setTaxName(tax)
    }
  }, [data])

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
      skeletonWidth: '80px',
      width: '150px',
      render: function render(invoice_no, row) {
        return (
          <div onClick={() => setEditInvoice(row.id)}>
            <Typography.Text style={{ color: '#54B2D3' }}>
              {invoice_no}
            </Typography.Text>
          </div>
        )
      },
    },
    {
      title: t('account.finance.invoice.columns.location'),
      dataIndex: 'location',
      visible: true,
      skeletonWidth: '50px',
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
      title: t('account.finance.invoice.columns.inv.date'),
      dataIndex: 'inv_date',
      visible: true,
      skeletonWidth: '50px',
      render: function render(data) {
        return <Typography.Text>{DisplayDate(data)}</Typography.Text>
      },
    },
    {
      title: t('account.finance.invoice.columns.customer'),
      dataIndex: 'customer',
      skeletonWidth: '50px',
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
      title: t('account.finance.invoice.columns.debtor'),
      dataIndex: 'debtor',
      skeletonWidth: '50px',
      visible: true,
      render: function render(data) {
        const item = data?.slice(0, 30)
        const isLarge = data?.length > 30
        return (
          <Tooltip title={isLarge && data}>
            <Typography.Text style={{ color: '#54B2D3', minWidth: 88 }}>
              {isLarge ? item + '...' : data}
            </Typography.Text>
          </Tooltip>
        )
      },
      ellipsis: true,
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
        return <Typography.Text>{companyCurrency + data}</Typography.Text>
      },
    },
    {
      title: taxName,
      dataIndex: 'vat',
      skeletonWidth: '50px',
      visible: true,
      render: function render(data) {
        return <Typography.Text>{companyCurrency + data}</Typography.Text>
      },
    },
    {
      title: t('account.finance.invoice.columns.gross'),
      dataIndex: 'gross',
      skeletonWidth: '50px',
      visible: true,
      render: function render(data) {
        return <Typography.Text>{companyCurrency + data}</Typography.Text>
      },
    },
    {
      title: t('account.finance.invoice.columns.paid'),
      dataIndex: 'paid',
      skeletonWidth: '50px',
      visible: true,
      render: function render(data) {
        return <Typography.Text>{companyCurrency + data}</Typography.Text>
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
            {companyCurrency + data}
          </Typography.Text>
        )
      },
    },
    // We have to skip this for now as integration so just hide it from UI
    /*{
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
    },*/
  ]

  if (isHealthcodeEnabled) {
    InvoiceColumns.splice(6, 0, {
      title: t('account.finance.invoice.columns.status'),
      dataIndex: 'status',
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
    <>
      {editInvoice && (
        <EditInvoice
          id={editInvoice}
          onModalBackPress={() => setEditInvoice(0)}
        />
      )}

      <TableLayout
        columns={InvoiceColumns}
        searchTerm={searchTerm}
        selectedDates={selectedDates}
        filterValue={filterValue}
        selectedRange={selectedRange}
        listQuery={useInvoicesQuery}
        aggregateQuery={useInvoiceCountQuery}
        noDataText={t('account.finance.invoice.empty.data.text')}
        setIsHealthcodeEnabled={setIsHealthcodeEnabled}
        tabName="invoice"
        accountRef={accountRef}
      />
    </>
  )
}

export default Invoice
