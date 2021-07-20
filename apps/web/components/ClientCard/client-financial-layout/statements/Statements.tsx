import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Table, Pagination } from '@pabau/ui'
import styles from './Statements.module.less'
import { ClientFinancialsLayoutProps } from './../ClientFinancialsLayout'
import { Button } from 'antd'
import { FilterOutlined } from '@ant-design/icons'
import InvoiceFooter from './../invoices/invoice-footer/InvoiceFooter'

export const Statements: FC<ClientFinancialsLayoutProps> = ({
  statements,
  totalPayments,
  totalInvoiced,
  totalBalance,
}) => {
  const { t } = useTranslation('common')
  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 10,
    currentPage: 1,
    showingRecords: 0,
  })

  const columns = [
    {
      title: t('ui.client-card-financial.statements.ref-no'),
      dataIndex: 'refNo',
      className: 'columnTitle',
      width: 100,
      visible: true,
    },
    {
      title: t('ui.client-card-financial.statements.statement-date'),
      dataIndex: 'startDate',
      visible: true,
      width: 80,
      render: function renderItem(value, row) {
        return `${value} - ${row.endDate}`
      },
    },
    {
      title: t('ui.client-card-financial.statements.issued-to'),
      dataIndex: 'issuedTo',
      visible: true,
      width: 150,
    },
    {
      title: t('ui.client-card-financial.statements.location'),
      dataIndex: 'location',
      visible: true,
      width: 80,
    },
  ]

  const onPaginationChange = (currentPage) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({ ...paginateData, offset, currentPage: currentPage })
  }

  return (
    <div className={styles.financialItems}>
      <div className={styles.filterRow} style={{ alignItems: 'center' }}>
        <Button
          type="primary"
          size={'small'}
          onClick={() => console.log('new statement')}
        >
          New Statement
        </Button>
        <div className={styles.filter}>
          <FilterOutlined />
        </div>
      </div>
      <Table
        loading={false}
        draggable={false}
        scroll={{ x: true }}
        dataSource={statements?.map((e: { id }) => ({
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
            text: t('ui.client-card-financial.payments.total-payments'),
            value: totalPayments,
          },
          {
            text: t('ui.client-card-financial.total-invoiced'),
            value: totalInvoiced,
          },
          {
            text: t('ui.client-card-financial.statements.balance'),
            value: totalBalance,
          },
        ]}
      />
    </div>
  )
}
