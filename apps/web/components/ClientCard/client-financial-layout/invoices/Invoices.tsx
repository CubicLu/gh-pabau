import React, { FC, useState, useEffect, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Table, Pagination } from '@pabau/ui'
import {
  ClientFinancialsLayoutProps,
  InvoiceProp,
} from './../ClientFinancialsLayout'
import styles from './Invoices.module.less'
import {
  Typography,
  Button,
  Popover,
  Radio,
  Space,
  Select,
  DatePicker,
} from 'antd'
import {
  CloseCircleOutlined,
  CaretDownOutlined,
  FilterOutlined,
} from '@ant-design/icons'
import EditInvoice from './EditInvoice'
import InvoiceFooter from './invoice-footer/InvoiceFooter'

const getInvoiceFilterValues = () => {
  return {
    type: 'all',
    employee: 'all',
    location: 'all',
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
}

export const Invoices: FC<P> = (props) => {
  const { dataProps, invoiceEmployeeOptions, locationOptions } = props
  const { invoices, totalInvoiced, totalOutstanding } = dataProps
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

  useEffect(() => {
    if (invoices) {
      setPaginateData((d) => ({
        ...d,
        total: invoices?.length,
        showingRecords: invoices?.length,
      }))
    }
  }, [invoices])

  const onPaginationChange = (currentPage) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({ ...paginateData, offset, currentPage: currentPage })
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
      width: 100,
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
      width: 150,
      visible: true,
    },
    {
      title: t('ui.client-card-financial.employee'),
      dataIndex: 'employee',
      className: 'columnTitle',
      width: 100,
      visible: true,
    },
    {
      title: t('ui.client-card-financial.issued-to'),
      dataIndex: 'issuedTo',
      className: 'columnTitle',
      width: 100,
      visible: true,
    },
    {
      title: t('ui.client-card-financial.status'),
      dataIndex: 'paid',
      className: 'columnTitle',
      visible: true,
      width: 80,
      render: function renderItem(value) {
        return value
          ? t('ui.client-card-financial.paid')
          : t('ui.client-card-financial.unpaid')
      },
    },
    {
      title: t('ui.client-card-financial.amount'),
      dataIndex: 'grandTotal',
      className: 'columnTitle',
      width: 110,
      visible: true,
      render: function renderItem(value) {
        return <span>£{value.toFixed(2)}</span>
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
                setInvoiceFilter({ ...invoiceFilter, type: e.target.value })
              }
              value={invoiceFilter.type}
            >
              <Space direction="vertical">
                <Radio value={'all'}>
                  {t('ui.client-card-financial.invoices.all')}
                </Radio>
                <Radio value={'outstanding_invoices'}>
                  Outstanding invoices
                </Radio>
                <Radio value={'paid_invoice'}>Paid invoice</Radio>
                <Radio value={'unsent_invoices'}>Unsent invoices</Radio>
                <Radio value={'sent_invoices'}>Sent Invoices</Radio>
              </Space>
            </Radio.Group>
          </div>
        </div>
        <div className={styles.invoicesFilCont}>
          <Text>{t('ui.client-card-financial.employee')}</Text>
          <Select
            showSearch
            style={{ width: '100%' }}
            onChange={(e) =>
              setInvoiceFilter({ ...invoiceFilter, employee: e })
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
            showSearch
            style={{ width: '100%' }}
            onChange={(e) =>
              setInvoiceFilter({ ...invoiceFilter, location: e })
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
          <RangePicker onChange={(e) => console.log(e)} />
        </div>
        <div className={styles.invoicesFilCont}>
          <Button onClick={() => setInvoiceFilter(getInvoiceFilterValues())}>
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
          onExpand={(isExpanded, record) =>
            setExpandedRow(isExpanded ? record['key'] : undefined)
          }
          expandIconColumnIndex={6}
          expandedRowRender={expandedRowRender}
          expandedRowKeys={[expandedRow]}
          expandIcon={({ expanded, onExpand, record }) =>
            expanded ? (
              <CloseCircleOutlined
                size={28}
                onClick={(e) => onExpand(record, e)}
              />
            ) : (
              <CaretDownOutlined
                size={20}
                onClick={(e) => onExpand(record, e)}
              />
            )
          }
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
