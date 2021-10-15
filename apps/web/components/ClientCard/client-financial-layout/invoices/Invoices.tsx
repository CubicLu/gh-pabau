import React, { FC, useState, useEffect, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Table, Pagination, Avatar } from '@pabau/ui'
import classNames from 'classnames'
import moment from 'moment'
import {
  ClientFinancialsLayoutProps,
  InvoiceProp,
} from './../ClientFinancialsLayout'
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

const getInvoiceFilterValues = () => {
  return {
    type: 'all',
    employee: 'all',
    location: 'all',
    dateStart: '',
    dateEnd: '',
  }
}

interface InvoiceEmployeeOptionProp {
  label: string
  icon: ReactNode
}

interface LocationOptionProp {
  key: number
  value: string
}

interface P {
  dataProps: ClientFinancialsLayoutProps
  invoiceEmployeeOptions: InvoiceEmployeeOptionProp[]
  locationOptions: LocationOptionProp[]
  onChangePagination?(take: number, skip: number): void
  totalInoviceCount: number
}

export const Invoices: FC<P> = (props) => {
  const {
    totalInoviceCount,
    dataProps,
    invoiceEmployeeOptions,
    locationOptions,
    onChangePagination,
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
  const [invoiceFilter, setInvoiceFilter] = useState(getInvoiceFilterValues())

  const updateInvoiceFilter = (e) => {
    let tempInvoices = dataProps.invoices

    if (e.type !== 'all' && e.type !== '') {
      tempInvoices = tempInvoices.filter((i) => i.status === e.type)
    }

    if (e.employee !== 'all' && e.employee !== '') {
      tempInvoices = tempInvoices.filter((i) => i.employee === e.employee)
    }

    if (e.location !== 'all' && e.location !== '') {
      tempInvoices = tempInvoices.filter((i) => i.location === e.location)
    }

    if (e.dateStart) {
      tempInvoices = tempInvoices.filter((i) => {
        const invDate = moment(i.date, 'DD/MM/YYYY')
        const startDate = e.dateStart
        const endDate = e.dateEnd
        return invDate.isBetween(startDate, endDate)
      })
    }

    setInvoices(tempInvoices)
    setInvoiceFilter(e)
  }

  useEffect(() => {
    setInvoices(dataProps.invoices)
  }, [dataProps])

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
          {record.items.map((item, i) => (
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
                <Text>£{record.totalVat.toFixed(2)}</Text>
              </div>
              <div>
                <Title level={5}>
                  {t('ui.client-card-financial.sub-total-amount')}
                </Title>
                <Text>£{record.grandTotal.toFixed(2)}</Text>
              </div>
            </div>
            <div className={styles.right}>
              <div>
                <Title level={5}>
                  {t('ui.client-card-financial.amount-paid')}
                </Title>
                <Text>£{record.amountPaid.toFixed(2)}</Text>
              </div>
              <div>
                <Title level={5}>{t('ui.client-card-financial.tips')}</Title>
                <Text>£{record.tips.toFixed(2)}</Text>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <Title level={5}>{t('ui.client-card-financial.grand-total')}</Title>
            <Title level={4}>£{record.grandTotal.toFixed(2)}</Title>
            {!record.paid && (
              <Button onClick={() => console.log('Pay')} type="primary">{`${t(
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
      <div>
        <div className={styles.invoicesFilCont}>
          <Text>{t('ui.client-card-financial.invoices')}</Text>
          <div>
            <Radio.Group
              onChange={(e) =>
                updateInvoiceFilter({ ...invoiceFilter, type: e.target.value })
              }
              value={invoiceFilter.type}
            >
              <Space direction="vertical">
                <Radio value={'all'}>
                  {t('ui.client-card-financial.invoices.all')}
                </Radio>
                <Radio value={'outstanding_invoices'}>
                  {t('ui.client-card-financial.invoices.outstanding-invoices')}
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
            onChange={(e) =>
              updateInvoiceFilter({ ...invoiceFilter, employee: e })
            }
            defaultValue={invoiceFilter.employee}
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
          <Text>{t('ui.client-card-financial.location')}</Text>
          <Select
            style={{ width: '100%' }}
            onChange={(e) =>
              updateInvoiceFilter({ ...invoiceFilter, location: e })
            }
            defaultValue={invoiceFilter.location}
          >
            <Option value="all">
              {t('ui.client-card-financial.invoices.all')}
            </Option>
            {locationOptions.map((e, i) => {
              return (
                <Option value={e.value} key={i}>
                  {e.value}
                </Option>
              )
            })}
          </Select>
        </div>
        <div className={styles.invoicesFilCont}>
          <Text>{t('ui.client-card-financial.invoices.date')}</Text>
          <RangePicker
            onChange={(e) =>
              updateInvoiceFilter({
                ...invoiceFilter,
                dateStart: e[0],
                dateEnd: e[1],
              })
            }
          />
        </div>
        <div className={styles.invoicesFilCont}>
          <Button onClick={() => updateInvoiceFilter(getInvoiceFilterValues())}>
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
        />
      )}
      <div className={styles.invoices}>
        <div className={styles.filterRow}>
          <Popover
            content={filterContent}
            title={t('ui.client-card-financial.invoices.filter-by')}
            placement="bottomRight"
            overlayClassName={styles.invoicesFilter}
          >
            <div className={styles.filter}>
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
