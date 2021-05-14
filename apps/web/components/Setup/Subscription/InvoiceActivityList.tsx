import { EyeOutlined } from '@ant-design/icons'
import { gql } from '@apollo/client'
import {
  Button,
  Notification,
  NotificationType,
  Pagination,
  Table,
  useLiveQuery,
} from '@pabau/ui'
import { Skeleton } from 'antd'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserContext } from 'apps/web/context/UserContext'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { useTranslationI18 } from 'apps/web/hooks/useTranslationI18'
import React, { FC, useContext, useEffect, useMemo, useState } from 'react'
import { sendEmailService } from '../../ClientNotificationEmailPreview/sendEmailService'
import EmailSendButton from './EmailSendButton'

const LIST_AGGREGATE = gql`
  query countSMSPurchases {
    smsPurchasesCount
  }
`
const LIST_SMS_PURCHASES = gql`
  query getSmsPurchases(
    $isActive: Int = 1
    $searchTerm: String = ""
    $offset: Int = 0
    $limit: Int = 10
  ) {
    smsPurchases(
      skip: $offset
      take: $limit
      orderBy: { date: desc }
      where: {
        status: { equals: $isActive }
        OR: [{ AND: [{ purchase_type: { contains: $searchTerm } }] }]
      }
    ) {
      __typename
      id
      user_id
      company_id
      date
      sms_amount
      price
      profit
      purchase_type
      User {
        full_name
      }
    }
  }
`
interface P {
  searchTerm: string
  filterValue: number
}
const InvoiceActivity: FC<P> = (p) => {
  const [dataList, setDataList] = useState<any>([])
  const { t } = useTranslationI18()
  const user = useContext(UserContext)

  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 10,
    currentPage: 1,
    showingRecords: 0,
  })
  const invoiceColumns = [
    {
      title: t('setup.table.column.invoicedate'),
      dataIndex: 'date',
      visible: true,
    },
    {
      title: t('setup.table.column.invoice'),
      dataIndex: 'number',
      visible: true,
    },
    {
      title: t('setup.table.column.description'),
      dataIndex: 'description',
      visible: true,
    },
    {
      title: t('setup.table.column.amount'),
      dataIndex: 'amount',
      visible: true,
    },
    {
      title: t('setup.table.column.status'),
      dataIndex: 'invoice_status',
      visible: true,
    },
    {
      title: '',
      dataIndex: 'buttonGp',
      visible: true,
      // eslint-disable-next-line react/display-name
      render: () => (
        <div>
          <EmailSendButton style={{ marginRight: 16 }} onClick={sendEmail} />
          <Button onClick={previewInvoice}>
            <EyeOutlined /> {t('setup.table.btn.preview')}
          </Button>
        </div>
      ),
    },
  ]

  // eslint-disable-next-line react/destructuring-assignment
  const { data, loading } = useLiveQuery(LIST_SMS_PURCHASES, {
    variables: {
      // eslint-disable-next-line react/destructuring-assignment
      isActive: p.filterValue,
      // eslint-disable-next-line react/destructuring-assignment
      searchTerm: '%' + p.searchTerm + '%',
      offset: paginateData.offset,
      limit: paginateData.limit,
    },
  })

  const { data: totalCount } = useLiveQuery(LIST_AGGREGATE)

  const mappedData = useMemo(
    () =>
      data?.smsPurchases.map((d) => ({
        description: `${d.sms_amount} X SMS`,
        number: `#INV${d.id}`,
        amount: d.price.toFixed(2),
        date: new Date(d?.date * 1000).toLocaleDateString('en-GB'),
        invoice_status: d.status
          ? t('setup.table.status.submitted')
          : t('setup.table.status.paidout'),
      })),
    [data, t]
  )

  useEffect(() => {
    setDataList(data?.smsPurchases ?? [])
  }, [dataList, data])

  useEffect(() => {
    if (totalCount) {
      setPaginateData((d) => ({
        ...d,
        total: totalCount,
        showingRecords: data?.smsPurchases.length,
      }))
    }
  }, [data, totalCount])

  const onPaginationChange = (currentPage) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({ ...paginateData, offset, currentPage: currentPage })
  }

  const email = user.me.username
  const bodyContent = 'Hi you are pretty nice person.'
  const sendEmail = () => {
    sendEmailService({
      email,
      subject: t('notifications.email.invoice.subject'),
      bodyContent,
      successMessage: t('notifications.email.send.successMessage'),
      failedMessage: t('notifications.email.send.failedMessage'),
    })
  }

  const previewInvoice = () => {
    Notification(
      NotificationType.error,
      'Invoice preview component still not ready'
    )
  }

  return (
    <div>
      {loading ? (
        <Table
          rowKey="key"
          pagination={false}
          dataSource={[...Array.from({ length: 6 })].map((_, index) => ({
            key: `key${index}`,
          }))}
          columns={invoiceColumns.map((column) => {
            return {
              ...column,
              render: function renderPlaceholder() {
                return (
                  <Skeleton
                    loading={loading}
                    active
                    title={true}
                    paragraph={false}
                  />
                )
              },
            }
          })}
        />
      ) : (
        <Table
          loading={loading}
          noDataText={t('crud-table-no-search-results')}
          pagination={mappedData?.length > 10 ? {} : false}
          columns={invoiceColumns}
          dataSource={mappedData}
        />
      )}

      <div style={{ margin: 24 }}>
        <Pagination
          total={paginateData.total}
          defaultPageSize={10}
          showSizeChanger={false}
          onChange={onPaginationChange}
          pageSize={paginateData.limit}
          current={paginateData.currentPage}
          showingRecords={paginateData.showingRecords}
        />
      </div>
    </div>
  )
}

export default InvoiceActivity
