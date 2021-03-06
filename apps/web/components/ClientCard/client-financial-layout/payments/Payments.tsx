import React, { FC, useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Table, Pagination } from '@pabau/ui'
import styles from './Payments.module.less'
import { FinancialPayment } from './../ClientFinancialsLayout'
import {
  Typography,
  Button,
  Popover,
  Radio,
  Space,
  Skeleton,
  Tooltip,
} from 'antd'
import { InvoiceProp } from './../ClientFinancialsLayout'
import EditInvoice from '../invoices/EditInvoice'
import { FilterOutlined } from '@ant-design/icons'
import InvoiceFooter from './../invoices/invoice-footer/InvoiceFooter'
import {
  GetPaymentsDocument,
  TotalPaymentsCountQuery,
  GetContactAccBalanceDocument,
} from '@pabau/graphql'
import { useQuery } from '@apollo/client'
import dayjs from 'dayjs'
import { useUser } from '../../../../context/UserContext'
import stringToCurrencySignConverter from '../../../../helper/stringToCurrencySignConverter'

const getInvoicePaymentValues = () => {
  return {
    type: 'all',
  }
}

interface IPaymentsProps {
  clientId?: number
  totalPaymentCounts?: TotalPaymentsCountQuery
}

export const Payments: FC<IPaymentsProps> = ({
  clientId,
  totalPaymentCounts,
}) => {
  const { t } = useTranslation('common')
  const { Text } = Typography
  const user = useUser()
  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 50,
    currentPage: 1,
    showingRecords: 0,
  })
  const [paymentFilter, setPaymentFilter] = useState(getInvoicePaymentValues())
  const [paymentData, setPayment] = useState<FinancialPayment[]>([])
  const [showEditInvoice, setShowEditInvoice] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceProp>()
  const [clickedID, setClickID] = useState('')

  const getQueryVariables = useMemo(() => {
    const queryOptions = {
      skip: !clientId,
      variables: {
        contactID: clientId,
        take: paginateData.limit,
        skip: paginateData.offset,
      },
    }
    return queryOptions
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginateData.limit, paginateData.offset, clientId])

  const { data: payment, loading } = useQuery(
    GetPaymentsDocument,
    getQueryVariables
  )

  const { data: accBalance } = useQuery(GetContactAccBalanceDocument, {
    skip: !clientId,
    variables: {
      contact_id: clientId,
    },
  })

  useEffect(() => {
    const paymentsDetails = []
    payment?.findManyPayments?.map((item, index) => {
      paymentsDetails.push({
        id: index,
        date: dayjs(`${item?.date}`).format(
          user?.me?.companyDateFormat === 'd/m/Y' ? 'DD/MM/YYYY' : 'MM/DD/YYYY'
        ),
        invoiceNo: item?.invoice_no,
        paymentNo: item?.id,
        location: item?.location ?? user?.me?.companyName,
        employee: item?.biller,
        paidBy: item?.user,
        method: item?.pmethod.charAt(0).toUpperCase() + item?.pmethod.slice(1),
        amount: item?.amount,
        dateTime: dayjs(item?.date).format('DD MMM, YYYY HH:mm:ss'),
      })
      return paymentsDetails
    })
    setPayment(paymentsDetails)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payment, user?.me?.companyDateFormat])

  useEffect(() => {
    setPaginateData({
      ...paginateData,
      total: totalPaymentCounts?.countPayments[0]?.count ?? 0,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPaymentCounts])

  useEffect(() => {
    if (payment) {
      setPaginateData((d) => ({
        ...d,
        total: totalPaymentCounts?.countPayments[0]?.count ?? 0,
        showingRecords: payment?.findManyPayments?.length,
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payment])

  const onPressEditInvoice = (invoice) => {
    setClickID('invoiceID')
    setShowEditInvoice(true)
    setSelectedInvoice(invoice)
  }

  const onPressEditPayment = (payment) => {
    setClickID('paymentID')
    setShowEditInvoice(true)
    setSelectedInvoice(payment)
  }

  const columns = [
    {
      title: t('ui.client-card-financial.payments.payment-no'),
      dataIndex: 'date',
      visible: true,
      width: 30,
      render: function renderItem(value, row) {
        return (
          <span className={styles.paymentNo}>
            <span>{value}</span>
            <span onClick={() => onPressEditPayment(row)}>
              #{row.paymentNo}
            </span>
          </span>
        )
      },
    },
    {
      title: t('ui.client-card-financial.payments.invoice-no'),
      dataIndex: 'invoiceNo',
      visible: true,
      width: 75,
      render: function renderItem(value, row) {
        return (
          <Tooltip title={`Created by ${row.employee} on ${row.dateTime} `}>
            <span
              className={styles.primaryText}
              onClick={() => onPressEditInvoice(row)}
            >
              #{value}
            </span>
          </Tooltip>
        )
      },
    },
    {
      title: t('ui.client-card-financial.payments.location'),
      dataIndex: 'location',
      visible: true,
      width: 175,
    },
    {
      title: t('ui.client-card-financial.payments.employee'),
      dataIndex: 'employee',
      visible: true,
      width: 75,
    },
    {
      title: t('ui.client-card-financial.payments.paid-by'),
      dataIndex: 'paidBy',
      visible: true,
      width: 75,
    },
    {
      title: t('ui.client-card-financial.payments.method'),
      dataIndex: 'method',
      visible: true,
      width: 75,
    },
    {
      title: t('ui.client-card-financial.payments.amount'),
      dataIndex: 'amount',
      visible: true,
      width: 75,
      render: function renderItem(value) {
        return (
          <span>
            {stringToCurrencySignConverter(user.me?.currency)}
            {value.toFixed(2)}
          </span>
        )
      },
    },
  ]

  const onPaginationChange = (currentPage) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({ ...paginateData, offset, currentPage: currentPage })
  }

  const filterContent = () => {
    return (
      <div>
        <div className={styles.invoicesFilCont}>
          <Text>{t('connect.onlinebooking.payment.payment')}</Text>
          <div>
            <Radio.Group
              onChange={(e) =>
                setPaymentFilter({ ...paymentFilter, type: e.target.value })
              }
              value={paymentFilter.type}
            >
              <Space direction="vertical">
                <Radio value={'all'}>
                  {t('ui.client-card-financial.invoices.all')}
                </Radio>
                <Radio value={'unallocated_payments'}>
                  Unallocated payments
                </Radio>
                <Radio value={'allocated_payments'}>Allocated payments</Radio>
              </Space>
            </Radio.Group>
          </div>
        </div>
        <div className={styles.invoicesFilCont}>
          <Button onClick={() => setPaymentFilter(getInvoicePaymentValues())}>
            {t('ui.client-card-financial.invoices.clear-all')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      {showEditInvoice && (
        <EditInvoice
          invoice={selectedInvoice}
          onModalBackPress={() => setShowEditInvoice(false)}
          activeKey={clickedID === 'invoiceID' ? '1' : '2'}
        />
      )}
      <div className={styles.payments}>
        <div className={styles.filterRow}>
          {!loading ? (
            <Popover
              content={filterContent}
              title={t('ui.client-card-financial.invoices.filter-by')}
              placement="bottomRight"
              overlayClassName={styles.paymentsFilter}
            >
              <div className={styles.filter}>
                <FilterOutlined />
              </div>
            </Popover>
          ) : (
            <Skeleton.Input
              active={true}
              size="default"
              className={styles.filterSkeleton}
            />
          )}
        </div>
        {!loading ? (
          <Table
            loading={false}
            draggable={false}
            scroll={{ x: true, y: '100vh' }}
            dataSource={paymentData?.map((e: { id }) => ({
              key: e.id,
              ...e,
            }))}
            columns={columns}
            noDataText={t('ui.client-card-financial.payments')}
          />
        ) : (
          <Table
            rowKey="key"
            pagination={false}
            dataSource={[...Array.from({ length: 10 })].map((_, index) => (
              <div key={index}>
                <Skeleton.Input
                  active={true}
                  size="small"
                  className={styles.columnSkeleton}
                />
              </div>
            ))}
            columns={columns.map((column) => {
              return {
                ...column,
                render: function renderPlaceholder() {
                  switch (column.dataIndex) {
                    case 'date':
                      return (
                        <span className={styles.paymentNo}>
                          <span>
                            <Skeleton.Input
                              active={true}
                              size="small"
                              className={styles.idSkeleton}
                            />
                          </span>
                          <span>
                            <Skeleton.Input
                              active={true}
                              size="small"
                              className={styles.idValueSkeleton}
                            />
                          </span>
                        </span>
                      )
                    case 'invoiceNo':
                      return (
                        <Skeleton.Input
                          active={true}
                          size="small"
                          className={styles.columnSkeleton}
                        />
                      )
                    case 'paymentNo':
                      return (
                        <Skeleton.Input
                          active={true}
                          size="small"
                          className={styles.columnSkeleton}
                        />
                      )
                    case 'location':
                      return (
                        <Skeleton.Input
                          active={true}
                          size="small"
                          className={styles.columnSkeleton}
                        />
                      )
                    case 'employee':
                      return (
                        <Skeleton.Input
                          active={true}
                          size="small"
                          className={styles.columnSkeleton}
                        />
                      )
                    case 'paidBy':
                      return (
                        <Skeleton.Input
                          active={true}
                          size="small"
                          className={styles.columnSkeleton}
                        />
                      )
                    case 'method':
                      return (
                        <Skeleton.Input
                          active={true}
                          size="small"
                          className={styles.columnSkeleton}
                        />
                      )
                    case 'amount':
                      return (
                        <Skeleton.Input
                          active={true}
                          size="small"
                          className={styles.columnSkeleton}
                        />
                      )
                  }
                },
              }
            })}
          />
        )}
        {!loading && (
          <div>
            <div className={styles.pagination}>
              <Pagination
                total={paginateData.total}
                defaultPageSize={50}
                pageSizeOptions={['10', '25', '50', '100']}
                showSizeChanger={false}
                onChange={onPaginationChange}
                pageSize={paginateData.limit}
                current={paginateData.currentPage}
                showingRecords={paginateData.showingRecords}
                onPageSizeChange={(pageSize) => {
                  setPaginateData({
                    ...paginateData,
                    limit: pageSize,
                  })
                }}
              />
            </div>
            <InvoiceFooter
              buttons={[
                {
                  text: t('ui.client-card-financial.payments.account-credit'),
                  value: accBalance?.findFirstAccountBalance?.balance ?? 0,
                  valueColor: '#65CD98',
                },
                {
                  text: t('ui.client-card-financial.payments.total-payments'),
                  value: totalPaymentCounts?.countPayments[0]?.amount ?? 0,
                },
              ]}
              loading={loading}
            />
          </div>
        )}
      </div>
    </>
  )
}
