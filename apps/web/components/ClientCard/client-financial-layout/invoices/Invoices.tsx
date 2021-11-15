import React, { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Table, Pagination, Avatar } from '@pabau/ui'
import classNames from 'classnames'
import moment from 'moment'
import { InvoiceProp } from './../ClientFinancialsLayout'
import { Formik } from 'formik'
import { ReactComponent as CollapseIcon } from '../../../../assets/images/collapse-icon.svg'
import styles from './Invoices.module.less'
import {
  Typography,
  Button,
  Popover,
  Radio,
  Space,
  Select,
  DatePicker,
  Tag,
  Tooltip,
  Skeleton,
} from 'antd'
import { FilterOutlined, EyeOutlined } from '@ant-design/icons'
import { GetFinancialInvoicesQuery, SaleItemsQuery } from '@pabau/graphql'
import EditInvoice from './EditInvoice'
import InvoiceFooter from './invoice-footer/InvoiceFooter'
import dayjs from 'dayjs'
import { useUser } from '../../../../context/UserContext'
import stringToCurrencySignConverter from '../../../../helper/stringToCurrencySignConverter'

export interface InitialFilterValue {
  type: string
  employee: string
  location: string
  dateStart: string
  dateEnd: string
}

export interface ISalesItemProps {
  employee: string
  id: number
  name: string
  quantity: number
  price: number
  tax: number
  discount: number
  totalPrice: number
}

interface P {
  invoice: GetFinancialInvoicesQuery
  salesDetails: SaleItemsQuery
  salesDetaillLoading: boolean
  loading: boolean
  invoiceEmployeeOptions: string[]
  locationOptions: string[]
  onChangePagination?(take: number, skip: number): void
  onExpand?(id: string): void
  onFilterSubmit?(
    type: string,
    employee: string,
    location: string,
    dateStart: string,
    dateEnd: string
  ): void
  totalInvoiceCount: number
}

export const Invoices: FC<P> = (props) => {
  const {
    invoice,
    salesDetails,
    salesDetaillLoading,
    loading,
    totalInvoiceCount,
    invoiceEmployeeOptions = [],
    locationOptions = [],
    onChangePagination,
    onFilterSubmit,
    onExpand,
  } = props
  const [invoices, setInvoices] = useState(invoice?.invoices)
  const { Text, Title } = Typography
  const { Option } = Select
  const user = useUser()
  const { RangePicker } = DatePicker
  const { t } = useTranslation('common')
  const [expandedRow, setExpandedRow] = useState(0)
  const [showEditInvoice, setShowEditInvoice] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceProp>()
  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 50,
    currentPage: 1,
    showingRecords: 0,
  })
  const [totalOutstanding, setTotalOutstanding] = useState(0)
  const [totalInvoiced, setTotalInvoiced] = useState(0)
  const [filterOpen, setFilterOpen] = useState(false)
  const [isClear, setIsClear] = useState(true)
  const [saleItems, setSaleItem] = useState<ISalesItemProps[]>()
  const [totalVat, setTotalVat] = useState(0)
  const [expansionKey, setExpansionKey] = useState('')

  useEffect(() => {
    const invoicesDetails = []
    const expandedInvoice = invoice?.invoices?.filter(
      (item) => item.guid === expansionKey
    )
    invoice?.invoices?.map((item) => {
      const discount = expandedInvoice[0]?.discount_amount
      const inv_total = expandedInvoice[0]?.inv_total
      invoicesDetails.push({
        id: `${item.custom_id}`,
        date: dayjs(`${item.date}`).format(
          user?.me?.companyDateFormat === 'd/m/Y' ? 'DD/MM/YYYY' : 'MM/DD/YYYY'
        ),
        location: item.location_name ?? user?.me?.companyName,
        employee: item.billers,
        issuedTo: item.issue_to,
        paid: item.paid_amount === item.inv_total ? true : false,
        items: saleItems,
        totalVat: totalVat,
        amountPaid: expandedInvoice[0]?.paid_amount,
        subtotal: discount !== 0 ? inv_total + discount : inv_total,
        // tips: expandedInvoice[0]?.tip, TODO: still not implemented tips
        tips: 0,
        grandTotal: item.inv_total,
        guid: item.guid,
      })
      return invoicesDetails
    })
    setInvoices(invoicesDetails)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoice, saleItems, totalVat])

  useEffect(() => {
    const items: ISalesItemProps[] = []
    let total_vat = 0
    salesDetails?.items?.map((item, index) => {
      items.push({
        employee: '',
        id: index,
        name: item.name,
        quantity: item.quantity,
        price: item.unit_price + item.discount,
        tax: item.tax_total,
        discount: item.UnitDiscount,
        totalPrice:
          item.quantity *
          (item.unit_price - item.UnitDiscount + item.tax_total),
      })
      const unit_price = item.quantity * item.unit_price - item.discount
      const vat_multiplier = item.Tax?.rate / 100 + 1
      const vat_value =
        item.quantity > 1
          ? unit_price - unit_price / vat_multiplier
          : item.tax_total
      total_vat += vat_value
      return items
    })
    setTotalVat(Number.isFinite(total_vat) ? total_vat : 0)
    setSaleItem(items)
  }, [salesDetails])

  useEffect(() => {
    const sumTotalInv = 0
    const sumTotalPaidInv = 0
    const totalInvoice = invoice?.invoices
      ?.map((item) => sumTotalInv + item.inv_total)
      .reduce((a, b) => {
        return a + b
      }, 0)

    const totalPaid = invoice?.invoices
      ?.map((item) => sumTotalPaidInv + item.paid_amount)
      .reduce((a, b) => {
        return a + b
      }, 0)
    const outstanding = totalInvoice - totalPaid
    setTotalOutstanding(outstanding)
    setTotalInvoiced(totalPaid)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salesDetails, invoice])
  useEffect(() => {
    setPaginateData({
      ...paginateData,
      total: totalInvoiceCount,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalInvoiceCount])

  useEffect(() => {
    if (invoices) {
      setPaginateData((d) => ({
        ...d,
        total: totalInvoiceCount,
        showingRecords: invoices?.length,
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoices])

  const onPaginationChange = (currentPage) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({ ...paginateData, offset, currentPage: currentPage })
    onChangePagination?.(paginateData.limit, offset)
  }

  const onPressEditInvoice = (invoice) => {
    setShowEditInvoice(true)
    setSelectedInvoice(invoice)
  }

  const handleFilterMenu = () => {
    setFilterOpen(!filterOpen)
  }

  const columns = [
    {
      title: t('ui.client-card-financial.invoice'),
      dataIndex: 'id',
      className: 'columnTitle',
      visible: true,
      render: function renderItem(value, row) {
        return (
          <span
            className={styles.invoiceNo}
            onClick={() => onPressEditInvoice(row)}
          >
            <span>{row.date}</span>
            <span>#{value}</span>
          </span>
        )
      },
    },
    {
      title: t('ui.client-card-financial.location'),
      dataIndex: 'location',
      className: 'columnTitle',
      visible: true,
    },
    {
      title: t('ui.client-card-financial.employee'),
      dataIndex: 'employee',
      className: 'columnTitle',
      visible: true,
    },
    {
      title: t('ui.client-card-financial.issued-to'),
      dataIndex: 'issuedTo',
      className: 'columnTitle',
      visible: true,
    },
    {
      title: t('ui.client-card-financial.status'),
      dataIndex: 'paid',
      className: 'columnTitle',
      visible: true,
      render: function renderItem(value, row) {
        return (
          <div>
            {value ? (
              <Tag color="green">{t('ui.client-card-financial.paid')}</Tag>
            ) : (
              <Tag color="red">{t('ui.client-card-financial.unpaid')}</Tag>
            )}
            {invoices[0]?.id === row.id && (
              <div className={styles.shareIcon}>
                <Tooltip
                  trigger={'click'}
                  arrowPointAtCenter
                  title={
                    <div>
                      <p className={styles.shareTootip}>
                        {t('ui.client-card-financial.shared-with')}
                      </p>
                      {[row.employee].map((x, index) => {
                        return (
                          <span className={styles.avatarIcon} key={index}>
                            <Avatar key={index} name={x} size="large" />
                          </span>
                        )
                      })}
                    </div>
                  }
                >
                  <EyeOutlined />
                </Tooltip>
              </div>
            )}
          </div>
        )
      },
    },
    {
      title: t('ui.client-card-financial.amount'),
      dataIndex: 'grandTotal',
      className: 'columnTitle',
      visible: true,
      render: function renderItem(value, row) {
        return (
          <div className={styles.collapseIconContainer}>
            <span>
              {stringToCurrencySignConverter(user.me?.currency)}
              {(value ?? 0).toFixed(2)}
            </span>
            <span
              onClick={() => {
                setExpansionKey(row['guid'])
                onExpand?.(row['guid'])
                if (expandedRow === row['key']) return setExpandedRow(0)
                setExpandedRow(row['key'])
              }}
            >
              <CollapseIcon
                className={classNames(
                  styles.collapseIcon,
                  expandedRow === row['key']
                    ? styles.collapseIconExpanded
                    : null
                )}
              />
            </span>
          </div>
        )
      },
    },
  ]

  const expandedRowRender = (record) => {
    const payBtnValue = record.grandTotal - record.amountPaid
    return (
      <div className={styles.rowExpand}>
        {!salesDetaillLoading ? (
          <div className={styles.items}>
            {record?.items?.map((item, i) => (
              <div className={styles.item} key={i}>
                <div>
                  <Text>{item.name}</Text>
                </div>
                <div>
                  <Text>{item.quantity}</Text>
                </div>
                <div>
                  <Text>
                    {stringToCurrencySignConverter(user.me?.currency)}
                    {(item.quantity * item.price).toFixed(2)}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.items}>
            <div className={styles.item}>
              <div>
                <Skeleton.Input
                  active={true}
                  size="small"
                  className={styles.columnSkeleton}
                />
              </div>
              <div>
                <Skeleton.Input
                  active={true}
                  size="small"
                  className={styles.valueSkeleton}
                />
              </div>
              <div>
                <Skeleton.Input
                  active={true}
                  size="small"
                  className={styles.columnSkeleton}
                />
              </div>
            </div>
          </div>
        )}
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.left}>
              <div>
                {!salesDetaillLoading ? (
                  <Title level={5}>
                    {t('ui.client-card-financial.total-vat')}
                  </Title>
                ) : (
                  <Skeleton.Input
                    active={true}
                    size="small"
                    className={styles.columnSkeleton}
                  />
                )}
                {!salesDetaillLoading ? (
                  <Text>
                    {stringToCurrencySignConverter(user.me?.currency)}
                    {(record?.totalVat ?? 0).toFixed(2)}
                  </Text>
                ) : (
                  <Skeleton.Input
                    active={true}
                    size="small"
                    className={styles.totalSkeleton}
                  />
                )}
              </div>
              <div>
                {!salesDetaillLoading ? (
                  <Title level={5}>
                    {t('ui.client-card-financial.sub-total-amount')}
                  </Title>
                ) : (
                  <Skeleton.Input
                    active={true}
                    size="small"
                    className={styles.columnSkeleton}
                  />
                )}
                {!salesDetaillLoading ? (
                  <Text>
                    {stringToCurrencySignConverter(user.me?.currency)}
                    {(record?.grandTotal ?? 0).toFixed(2)}
                  </Text>
                ) : (
                  <Skeleton.Input
                    active={true}
                    size="small"
                    className={styles.totalSkeleton}
                  />
                )}
              </div>
            </div>
            <div className={styles.right}>
              <div>
                {!salesDetaillLoading ? (
                  <Title level={5}>
                    {t('ui.client-card-financial.amount-paid')}
                  </Title>
                ) : (
                  <Skeleton.Input
                    active={true}
                    size="small"
                    className={styles.columnSkeleton}
                  />
                )}
                {!salesDetaillLoading ? (
                  <Text>
                    {stringToCurrencySignConverter(user.me?.currency)}
                    {(record?.amountPaid ?? 0).toFixed(2)}
                  </Text>
                ) : (
                  <Skeleton.Input
                    active={true}
                    size="small"
                    className={styles.totalSkeleton}
                  />
                )}
              </div>
              <div>
                {!salesDetaillLoading ? (
                  <Title level={5}>{t('ui.client-card-financial.tips')}</Title>
                ) : (
                  <Skeleton.Input
                    active={true}
                    size="small"
                    className={styles.columnSkeleton}
                  />
                )}
                {!salesDetaillLoading ? (
                  <Text>
                    {stringToCurrencySignConverter(user.me?.currency)}
                    {(record?.tips ?? 0).toFixed(2)}
                  </Text>
                ) : (
                  <Skeleton.Input
                    active={true}
                    size="small"
                    className={styles.totalSkeleton}
                  />
                )}
              </div>
            </div>
          </div>
          <div className={styles.right}>
            {!salesDetaillLoading ? (
              <Title level={5}>
                {t('ui.client-card-financial.grand-total')}
              </Title>
            ) : (
              <Skeleton.Input
                active={true}
                size="default"
                className={styles.grandTotalSkeleton}
              />
            )}
            {!salesDetaillLoading ? (
              <Title level={4}>
                {stringToCurrencySignConverter(user.me?.currency)}
                {record?.grandTotal.toFixed(2)}
              </Title>
            ) : (
              <Skeleton.Input
                active={true}
                size="small"
                className={styles.totalValueSkeleton}
              />
            )}
            {!record.paid && (
              <Button type="primary">{`${t(
                'ui.client-card-financial.pay'
              )} ${stringToCurrencySignConverter(
                user.me?.currency
              )}${(Number.isFinite(payBtnValue) ? payBtnValue : 0).toFixed(
                2
              )}`}</Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  const filterContent = () => {
    return (
      <Formik
        initialValues={{
          type: 'all',
          employee: 'all',
          location: 'all',
          dateStart: '',
          dateEnd: '',
        }}
        enableReinitialize={true}
        onSubmit={(values) => {
          setFilterOpen(false)
          onFilterSubmit?.(
            values.type,
            values.employee,
            values.location,
            values.dateStart,
            values.dateEnd
          )
        }}
      >
        {({ setFieldValue, values, resetForm, submitForm }) => {
          return (
            <div>
              <div className={styles.invoicesFilCont}>
                <Text>{t('ui.client-card-financial.invoices')}</Text>
                <div>
                  <Radio.Group
                    value={values.type}
                    onChange={(e) => setFieldValue('type', e.target.value)}
                  >
                    <Space direction="vertical">
                      <Radio value={'all'}>
                        {t('ui.client-card-financial.invoices.all')}
                      </Radio>
                      <Radio value={'outstanding_invoices'}>
                        {t(
                          'ui.client-card-financial.invoices.outstanding-invoices'
                        )}
                      </Radio>
                      <Radio value={'paid'}>
                        {t('ui.client-card-financial.invoices.paid-invoice')}
                      </Radio>
                      <Radio value={'unsent_invoices'}>
                        {t('ui.client-card-financial.invoices.unsent-invoices')}
                      </Radio>
                      <Radio value={'sent_invoices'}>
                        {t('ui.client-card-financial.invoices.sent-invoices')}
                      </Radio>
                    </Space>
                  </Radio.Group>
                </div>
              </div>
              <div className={styles.invoicesFilCont}>
                <Text>{t('ui.client-card-financial.employee')}</Text>
                <Select
                  className={styles.invoiceFilter}
                  onChange={(e) => setFieldValue('employee', e)}
                  value={values.employee}
                >
                  <Option value="all">
                    {t('ui.client-card-financial.invoices.all')}
                  </Option>
                  {invoiceEmployeeOptions.map((e, i) => {
                    return (
                      <Option value={e} key={i}>
                        {e}
                      </Option>
                    )
                  })}
                </Select>
              </div>
              <div className={styles.invoicesFilCont}>
                <Text>{t('ui.client-card-financial.location')}</Text>
                <Select
                  className={styles.invoiceFilter}
                  onChange={(e) => setFieldValue('location', e)}
                  value={values.location}
                >
                  <Option value="all">
                    {t('ui.client-card-financial.invoices.all')}
                  </Option>
                  {locationOptions.map((e, i) => {
                    return (
                      <Option value={e} key={i}>
                        {e}
                      </Option>
                    )
                  })}
                </Select>
              </div>
              <div className={styles.invoicesFilCont}>
                <Text>{t('ui.client-card-financial.invoices.date')}</Text>
                <RangePicker
                  onChange={(e) => {
                    setIsClear(false)
                    setFieldValue('dateStart', e[0] ?? null)
                    setFieldValue('dateEnd', e[1] ?? null)
                  }}
                  allowClear
                  value={
                    isClear
                      ? null
                      : [moment(values.dateStart), moment(values.dateEnd)]
                  }
                />
              </div>
              <div className={styles.buttons}>
                <Button
                  onClick={() => {
                    setIsClear(true)
                    resetForm()
                  }}
                >
                  {t('ui.client-card-financial.invoices.clear-all')}
                </Button>
                <Button
                  htmlType="submit"
                  className={styles.applyButton}
                  type={'primary'}
                  onClick={() => submitForm()}
                >
                  {t('ui.client-card-financial.invoices.apply')}
                </Button>
              </div>
            </div>
          )
        }}
      </Formik>
    )
  }

  return (
    <>
      {showEditInvoice && (
        <EditInvoice
          invoice={selectedInvoice}
          onModalBackPress={() => setShowEditInvoice(false)}
        />
      )}
      <div className={styles.invoices}>
        <div className={styles.filterRow}>
          {!loading && invoice ? (
            <Popover
              content={filterContent}
              title={t('ui.client-card-financial.invoices.filter-by')}
              placement="bottomRight"
              overlayClassName={styles.invoicesFilter}
              visible={filterOpen}
            >
              <div className={styles.filter} onClick={handleFilterMenu}>
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
        {!loading && invoice ? (
          <Table
            draggable={false}
            scroll={{ x: true, y: '100vh' }}
            dataSource={invoices?.map((e: { id }) => ({
              key: e.id,
              ...e,
            }))}
            columns={columns}
            noDataText={t('ui.client-card-financial.invoices')}
            expandedRowRender={expandedRowRender}
            expandedRowKeys={[expandedRow]}
            expandIcon={() => <span></span>}
          />
        ) : (
          <Table
            rowKey="key"
            pagination={false}
            dataSource={[...Array.from({ length: 6 })].map((_, index) => (
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
                    case 'id':
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
                    case 'location':
                      return (
                        <Skeleton.Input
                          active={true}
                          size="small"
                          className={styles.locationSkeleton}
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
                    case 'issuedTo':
                      return (
                        <Skeleton.Input
                          active={true}
                          size="small"
                          className={styles.columnSkeleton}
                        />
                      )
                    case 'paid':
                      return (
                        <Skeleton.Input
                          active={true}
                          size="small"
                          className={styles.columnSkeleton}
                        />
                      )
                    case 'grandTotal':
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
        {!loading && invoice && (
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
                  const offset =
                    paginateData.limit * (paginateData.currentPage - 1)
                  setPaginateData({
                    ...paginateData,
                    offset,
                    currentPage: paginateData.currentPage,
                    limit: pageSize,
                  })
                  onChangePagination?.(pageSize, offset)
                }}
              />
            </div>
            <InvoiceFooter
              buttons={[
                {
                  text: t('ui.client-card-financial.outstanding'),
                  value: totalOutstanding,
                  valueColor: '#FF5B64',
                },
                {
                  text: t('ui.client-card-financial.total-invoiced'),
                  value: totalInvoiced,
                },
              ]}
              loading={salesDetaillLoading}
            />
          </>
        )}
      </div>
    </>
  )
}
