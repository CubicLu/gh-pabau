import React, { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Table, Pagination, Avatar } from '@pabau/ui'
import classNames from 'classnames'
import moment from 'moment'
import {
  ClientFinancialsLayoutProps,
  InvoiceProp,
} from './../ClientFinancialsLayout'
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
} from 'antd'
import { FilterOutlined, EyeOutlined } from '@ant-design/icons'
import EditInvoice from './EditInvoice'
import InvoiceFooter from './invoice-footer/InvoiceFooter'

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
  dataProps: ClientFinancialsLayoutProps
  invoiceEmployeeOptions: string[]
  locationOptions: string[]
  onChangePagination?(take: number, skip: number): void
  onExpand?(id: number): void
  onFilterSubmit?(
    type: string,
    employee: string,
    location: string,
    dateStart: string,
    dateEnd: string
  ): void
  totalInoviceCount: number
}

export const Invoices: FC<P> = (props) => {
  const {
    totalInoviceCount,
    dataProps,
    invoiceEmployeeOptions,
    locationOptions,
    onChangePagination,
    onFilterSubmit,
    onExpand,
  } = props
  const { totalInvoiced, totalOutstanding } = dataProps
  const [invoices, setInvoices] = useState(dataProps.invoices)
  const { Text, Title } = Typography
  const { Option } = Select
  const { RangePicker } = DatePicker
  const [isLoading] = useState(false)
  const { t } = useTranslation('common')
  const [expandedRow, setExpandedRow] = useState(0)
  const [showEditInvoice, setShowEditInvoice] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceProp>()
  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 10,
    currentPage: 1,
    showingRecords: 0,
  })
  const [filterOpen, setFilterOpen] = useState(false)
  const [isClear, setIsClear] = useState(true)

  useEffect(() => {
    setInvoices(dataProps.invoices)
  }, [dataProps])

  useEffect(() => {
    setPaginateData({
      ...paginateData,
      total: totalInoviceCount,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalInoviceCount])

  useEffect(() => {
    if (invoices) {
      setPaginateData((d) => ({
        ...d,
        total: totalInoviceCount,
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
            {invoices[0].id === row.id && (
              <div className={styles.shareIcon}>
                <Tooltip
                  trigger={'click'}
                  arrowPointAtCenter
                  title={
                    <div>
                      <p style={{ margin: 5 }}>
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
            <span>£{value.toFixed(2)}</span>
            <span
              onClick={() => {
                onExpand?.(row['key'])
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
    return (
      <div className={styles.rowExpand}>
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
                <Text>£{(item.quantity * item.price).toFixed(2)}</Text>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.left}>
              <div>
                <Title level={5}>
                  {t('ui.client-card-financial.total-vat')}
                </Title>
                <Text>£{(record?.totalVat ?? 0).toFixed(2)}</Text>
              </div>
              <div>
                <Title level={5}>
                  {t('ui.client-card-financial.sub-total-amount')}
                </Title>
                <Text>£{(record?.grandTotal ?? 0).toFixed(2)}</Text>
              </div>
            </div>
            <div className={styles.right}>
              <div>
                <Title level={5}>
                  {t('ui.client-card-financial.amount-paid')}
                </Title>
                <Text>£{(record?.amountPaid ?? 0).toFixed(2)}</Text>
              </div>
              <div>
                <Title level={5}>{t('ui.client-card-financial.tips')}</Title>
                <Text>£{(record?.tips ?? 0).toFixed(2)}</Text>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <Title level={5}>{t('ui.client-card-financial.grand-total')}</Title>
            <Title level={4}>£{record?.grandTotal.toFixed(2)}</Title>
            {!record.paid && (
              <Button type="primary">{`${t(
                'ui.client-card-financial.pay'
              )} £${record.grandTotal.toFixed(2)}`}</Button>
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
                      <Radio value={'paid_invoice'}>
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
                  style={{ width: '100%' }}
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
                  style={{ width: '100%' }}
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
                    setFilterOpen(false)
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
        </div>
        <Table
          loading={isLoading}
          draggable={false}
          scroll={{ x: true }}
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
        <div className={styles.pagination}>
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
        />
      </div>
    </>
  )
}
