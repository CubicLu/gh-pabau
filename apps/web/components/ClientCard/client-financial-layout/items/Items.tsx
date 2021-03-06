import React, { FC, useState, ReactNode, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Table, Pagination } from '@pabau/ui'
import styles from './Items.module.less'
import {
  Typography,
  Button,
  Popover,
  Radio,
  Space,
  Select,
  DatePicker,
  Skeleton,
} from 'antd'
import { FilterOutlined } from '@ant-design/icons'
import InvoiceFooter from './../invoices/invoice-footer/InvoiceFooter'
import { useQuery } from '@apollo/client'
import EditInvoice from '../invoices/EditInvoice'
import { InvoiceProp } from './../ClientFinancialsLayout'
import {
  AggregateItemTotalDocument,
  GetContactSalesItemsDocument,
} from '@pabau/graphql'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import { useUser } from '../../../../context/UserContext'
import stringToCurrencySignConverter from '../../../../helper/stringToCurrencySignConverter'

const getInvoiceItemsValues = () => {
  return {
    type: 'all',
    employee: 'all',
  }
}

interface InvoiceEmployeeOptionProp {
  label: string
  icon: ReactNode
}

interface P {
  totalItemsCounts: number
  invoiceEmployeeOptions: InvoiceEmployeeOptionProp[]
}

export const Items: FC<P> = (props) => {
  const router = useRouter()
  const user = useUser()
  const { invoiceEmployeeOptions, totalItemsCounts } = props
  const { t } = useTranslation('common')
  const { Text } = Typography
  const { Option } = Select
  const { RangePicker } = DatePicker
  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 50,
    currentPage: 1,
    showingRecords: 0,
  })
  const [itemsFilter, setItemsFilter] = useState(getInvoiceItemsValues())
  const [items, setItems] = useState([])
  const [showEditInvoice, setShowEditInvoice] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceProp>()

  const getQuerySaleItemVariables = useMemo(() => {
    const queryOptions = {
      skip: !router.query.id,
      variables: {
        contactID: Number.parseInt(`${router.query.id}`),
        take: paginateData.limit,
        skip: paginateData.offset,
      },
    }
    return queryOptions
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginateData.limit, paginateData.offset, router.query.id])

  const { data: itemsData, loading: itemsLoading } = useQuery(
    GetContactSalesItemsDocument,
    getQuerySaleItemVariables
  )

  const { data: itemTotal, loading: itemTotalLoading } = useQuery(
    AggregateItemTotalDocument,
    {
      skip: !router.query.id,
      variables: {
        contactID: Number.parseInt(`${router.query.id}`),
      },
    }
  )
  useEffect(() => {
    const itemsDetails = []
    itemsData?.findManySoldItems?.map((item) => {
      itemsDetails.push({
        date: dayjs(`${item?.date}`).format(
          user?.me?.companyDateFormat === 'd/m/Y' ? 'DD/MM/YYYY' : 'MM/DD/YYYY'
        ),
        invoiceNo: item?.custom_id,
        name: item?.product_name,
        type:
          item?.type === 'retail' || item.type === '' ? 'Product' : item.type,
        employee: item?.biller_name,
        soldBy: item?.biller_name,
        qty: item?.quantity,
        total:
          stringToCurrencySignConverter(user.me?.currency) +
          item?.gross_total.toFixed(2),
      })

      return itemsDetails
    })

    setItems(itemsDetails)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsData, user?.me?.companyDateFormat])
  const columns = [
    {
      title: t('ui.client-card-financial.items.invoice-no'),
      dataIndex: 'date',
      className: 'columnTitle',
      width: 100,
      visible: true,
      render: function renderItem(value, row) {
        return (
          <span
            className={styles.invoiceNo}
            onClick={() => onPressEditInvoice(row)}
          >
            <span>{value}</span>
            <span>#{row.invoiceNo}</span>
          </span>
        )
      },
    },
    {
      title: t('ui.client-card-financial.items.item-name'),
      dataIndex: 'name',
      visible: true,
      width: 150,
    },
    {
      title: t('ui.client-card-financial.items.type'),
      dataIndex: 'type',
      visible: true,
      width: 80,
      render: function renderItem(value) {
        return (
          <span className={styles.type}>
            <span>{value}</span>
          </span>
        )
      },
    },
    {
      title: t('ui.client-card-financial.items.employee'),
      dataIndex: 'employee',
      visible: true,
      width: 100,
    },
    {
      title: t('ui.client-card-financial.items.who-sold'),
      dataIndex: 'soldBy',
      visible: true,
      width: 100,
    },
    {
      title: t('ui.client-card-financial.items.qty'),
      dataIndex: 'qty',
      visible: true,
      width: 50,
    },
    {
      title: t('ui.client-card-financial.items.total'),
      dataIndex: 'total',
      visible: true,
      width: 50,
    },
  ]

  useEffect(() => {
    setPaginateData({
      ...paginateData,
      total: totalItemsCounts,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItemsCounts])

  useEffect(() => {
    if (itemsData) {
      setPaginateData((d) => ({
        ...d,
        total: totalItemsCounts,
        showingRecords: itemsData?.findManySoldItems?.length,
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsData])

  const onPaginationChange = (currentPage) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({ ...paginateData, offset, currentPage: currentPage })
  }

  const filterContent = () => {
    return (
      <div>
        <div className={styles.invoicesFilCont}>
          <Text>{t('ui.client-card-financial.items.type')}</Text>
          <div>
            <Radio.Group
              onChange={(e) =>
                setItemsFilter({ ...itemsFilter, type: e.target.value })
              }
              value={itemsFilter.type}
            >
              <Space direction="vertical">
                <Radio value={'all'}>
                  {t('ui.client-card-financial.invoices.all')}
                </Radio>
                <Radio value={'service'}>Service</Radio>
                <Radio value={'package'}>Package</Radio>
                <Radio value={'retail'}>Retail</Radio>
              </Space>
            </Radio.Group>
          </div>
        </div>
        <div className={styles.invoicesFilCont}>
          <Text>{t('ui.client-card-financial.employee')}</Text>
          <Select
            showSearch
            style={{ width: '100%' }}
            onChange={(e) => setItemsFilter({ ...itemsFilter, employee: e })}
            defaultValue={itemsFilter.employee}
          >
            <Option value="all">
              {t('ui.client-card-financial.invoices.all')}
            </Option>
            {invoiceEmployeeOptions.map((e, i) => {
              return (
                <Option value={e.label} key={i}>
                  {e.label}
                </Option>
              )
            })}
          </Select>
        </div>
        <div className={styles.invoicesFilCont}>
          <Text>{t('ui.client-card-financial.invoices.date')}</Text>
          <RangePicker onChange={(e) => console.log(e)} />
        </div>
        <div className={styles.invoicesFilCont}>
          <Button onClick={() => setItemsFilter(getInvoiceItemsValues())}>
            {t('ui.client-card-financial.invoices.clear-all')}
          </Button>
        </div>
      </div>
    )
  }

  const onPressEditInvoice = (invoice) => {
    setShowEditInvoice(true)
    setSelectedInvoice(invoice)
  }

  return (
    <>
      {showEditInvoice && (
        <EditInvoice
          invoice={selectedInvoice}
          onModalBackPress={() => setShowEditInvoice(false)}
          activeKey="1"
        />
      )}
      <div className={styles.financialItems}>
        <div className={styles.filterRow}>
          {!itemsLoading ? (
            <Popover
              content={filterContent}
              title={t('ui.client-card-financial.invoices.filter-by')}
              placement="bottomRight"
              overlayClassName={styles.financialItemsFilter}
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
        {!itemsLoading ? (
          <Table
            loading={false}
            draggable={false}
            scroll={{ x: true, y: '100vh' }}
            dataSource={items?.map((e: { id }) => ({
              key: e.id,
              ...e,
            }))}
            columns={columns}
            noDataText={t('ui.client-card-financial.items')}
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
                        <span className={styles.invoiceNo}>
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
                    case 'name':
                      return (
                        <Skeleton.Input
                          active={true}
                          size="small"
                          className={styles.columnSkeleton}
                        />
                      )
                    case 'type':
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
                    case 'soldBy':
                      return (
                        <Skeleton.Input
                          active={true}
                          size="small"
                          className={styles.columnSkeleton}
                        />
                      )
                    case 'qty':
                      return (
                        <Skeleton.Input
                          active={true}
                          size="small"
                          className={styles.qtySkeleton}
                        />
                      )
                    case 'total':
                      return (
                        <Skeleton.Input
                          active={true}
                          size="small"
                          className={styles.qtySkeleton}
                        />
                      )
                  }
                },
              }
            })}
          />
        )}
        {!itemsLoading && (
          <>
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
                  text: t('ui.client-card-financial.items.total-sales'),
                  value: itemTotal?.itemTotal?.totalSum?.total ?? 0,
                },
              ]}
              loading={itemTotalLoading}
            />
          </>
        )}
      </div>
    </>
  )
}
