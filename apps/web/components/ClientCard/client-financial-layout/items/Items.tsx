import React, { FC, useState, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Table, Pagination } from '@pabau/ui'
import styles from './Items.module.less'
import { ClientFinancialsLayoutProps } from './../ClientFinancialsLayout'
import {
  Typography,
  Button,
  Popover,
  Radio,
  Space,
  Select,
  DatePicker,
} from 'antd'
import { FilterOutlined } from '@ant-design/icons'
import InvoiceFooter from './../invoices/invoice-footer/InvoiceFooter'

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
  dataProps: ClientFinancialsLayoutProps
  invoiceEmployeeOptions: InvoiceEmployeeOptionProp[]
}

export const Items: FC<P> = (props) => {
  const { dataProps, invoiceEmployeeOptions } = props
  const { items, totalSales } = dataProps
  const { t } = useTranslation('common')
  const { Text } = Typography
  const { Option } = Select
  const { RangePicker } = DatePicker
  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 10,
    currentPage: 1,
    showingRecords: 0,
  })
  const [itemsFilter, setItemsFilter] = useState(getInvoiceItemsValues())

  const columns = [
    {
      title: t('ui.client-card-financial.items.date'),
      dataIndex: 'date',
      className: 'columnTitle',
      width: 100,
      visible: true,
    },
    {
      title: t('ui.client-card-financial.items.invoice-no'),
      dataIndex: 'invoiceNo',
      visible: true,
      width: 80,
      render: function renderItem(value) {
        return <span className={styles.primaryText}>#{value}</span>
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
  ]

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

  return (
    <div className={styles.financialItems}>
      <div className={styles.filterRow}>
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
      </div>
      <Table
        loading={false}
        draggable={false}
        scroll={{ x: true }}
        dataSource={items?.map((e: { id }) => ({
          key: e.id,
          ...e,
        }))}
        columns={columns}
        noDataText={t('ui.client-card-financial.items')}
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
            text: t('ui.client-card-financial.items.total-sales'),
            value: totalSales,
          },
        ]}
      />
    </div>
  )
}
