import { EyeOutlined } from '@ant-design/icons'
import { BasicModal, Button, Pagination, Table } from '@pabau/ui'
import { useUser } from '../../../context/UserContext'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import React, { FC, useEffect, useState } from 'react'
import { sendEmailService } from '../../ClientNotificationEmailPreview/sendEmailService'
import EmailSendButton from './EmailSendButton'
import styles from './SubscriptionComponents.module.less'
import {
  SubscriptionInvoice,
  useSubscriptionInvoicesQuery,
  useTotalSubscriptionsQuery,
} from '@pabau/graphql'
import { DisplayDate } from '../../../hooks/displayDate'
import stringToCurrencySignConverter from '../../../helper/stringToCurrencySignConverter'

interface P {
  searchTerm: string
  filterValue: string
}
type FilterStatus = 'ALL' | 'PAID' | 'NOT_PAID'

const InvoiceActivity: FC<P> = (p) => {
  const [dataList, setDataList] = useState<SubscriptionInvoice[]>([])
  const [status, setStatus] = useState<FilterStatus>('ALL')
  const [searchTerm, setSearchTerm] = useState('')
  const [sendEmails, setSendEmails] = useState<string[]>([])
  const { t } = useTranslationI18()
  const user = useUser()

  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 50,
    currentPage: 1,
    showingRecords: 0,
  })
  const [showPreview, setShowPreview] = useState(false)
  const [urlPreview, setUrlPreview] = useState('')

  const invoiceColumns = [
    {
      title: t('setup.table.column.invoicedate'),
      dataIndex: 'date',
      key: 'date',
      visible: true,
      render: (data) => {
        return <div>{DisplayDate(data)}</div>
      },
    },
    {
      title: t('setup.table.column.invoice'),
      dataIndex: 'id',
      key: 'id',
      visible: true,
    },
    {
      title: t('setup.table.column.description'),
      dataIndex: 'description',
      key: 'description',
      visible: true,
    },
    {
      title: t('setup.table.column.amount'),
      dataIndex: 'amount',
      key: 'amount',
      visible: true,
      render: (_, { amount, currency }: SubscriptionInvoice) => {
        return (
          <div>
            {stringToCurrencySignConverter(currency)}{' '}
            {(amount as number).toFixed(2)}
          </div>
        )
      },
    },
    {
      title: t('setup.table.column.status'),
      dataIndex: 'status',
      key: 'status',
      visible: true,
    },
    {
      title: t('setup.table.column.actions'),
      dataIndex: 'invoice_link',
      key: 'invoice_link',
      visible: true,
      // eslint-disable-next-line react/display-name
      render: (_, { invoice_link, id, status }: SubscriptionInvoice) => {
        return (
          <div>
            <EmailSendButton
              style={{ marginRight: 16 }}
              disabled={
                sendEmails.includes(id) || invoice_link === null ? true : false
              }
              onClick={() => sendEmail(id, invoice_link)}
            />
            <Button
              onClick={() => onPreviewInvoice(invoice_link)}
              disabled={invoice_link === null ? true : false}
            >
              <EyeOutlined /> {t('setup.table.btn.preview')}
            </Button>
          </div>
        )
      },
    },
  ]

  const { data, loading } = useSubscriptionInvoicesQuery({
    variables: {
      status: status === 'ALL' ? '' : status,
      searchTerm: searchTerm,
      offset: paginateData.offset,
      limit: paginateData.limit,
    },
  })

  const { data: totalCount } = useTotalSubscriptionsQuery({
    variables: {
      status: status === 'ALL' ? '' : status,
      searchTerm: searchTerm,
    },
  })

  useEffect(() => {
    setStatus(p.filterValue as FilterStatus)
    setSearchTerm(p.searchTerm)
  }, [p, paginateData])

  useEffect(() => {
    if (data !== undefined) {
      setDataList(data.invoices)
    }
  }, [data])

  useEffect(() => {
    if (totalCount?.total) {
      setPaginateData((d) => ({
        ...d,
        total: totalCount.total,
        showingRecords: data?.invoices?.length,
      }))
    }
  }, [data, totalCount])

  const onPaginationChange = (currentPage: number) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({ ...paginateData, offset, currentPage: currentPage })
  }

  const onPreviewInvoice = (url: React.SetStateAction<string>) => {
    if (url.toString().includes('stripe')) {
      window.open(url.toString(), '_blank')
    } else {
      setUrlPreview(url)
      setShowPreview((showPreview) => !showPreview)
    }
  }
  const onCloseInvoicePreview = () => {
    setUrlPreview('')
    setShowPreview(false)
  }

  const sendEmail = (id: string, url: string) => {
    const email = user.me.username
    const bodyContent = `${t('setup.subscription.invoice')}: ${url}`
    sendEmailService({
      email,
      subject: t('setup.subscription.invoice'),
      bodyContent,
      successMessage: t('notifications.email.send.successMessage'),
      failedMessage: t('notifications.email.send.failedMessage'),
    })
    setSendEmails([...sendEmails, id])
  }

  return (
    <div>
      <Table
        rowKey="key"
        loading={loading && (user ? true : false)}
        noDataText={t('crud-table-no-search-results')}
        pagination={dataList?.length > 50 ? {} : false}
        columns={invoiceColumns}
        dataSource={dataList.map((item, index) => ({
          ...item,
          key: index,
        }))}
      />
      <div style={{ margin: 24 }}>
        <Pagination
          total={paginateData.total}
          defaultPageSize={50}
          showSizeChanger={false}
          onChange={onPaginationChange}
          pageSize={paginateData.limit}
          current={paginateData.currentPage}
          pageSizeOptions={['10', '25', '50', '100']}
          showingRecords={paginateData.showingRecords}
          onPageSizeChange={(pageSize) => {
            setPaginateData({
              ...paginateData,
              limit: pageSize,
            })
          }}
        />
      </div>
      {showPreview && (
        <BasicModal
          wrapClassName={styles.subscriptionInvoiceModal}
          title={t('setup.subscription.invoice')}
          visible={showPreview}
          width="50%"
          onCancel={onCloseInvoicePreview}
        >
          <iframe title={t('setup.subscription.invoice')} src={urlPreview} />
        </BasicModal>
      )}
    </div>
  )
}

export default InvoiceActivity
