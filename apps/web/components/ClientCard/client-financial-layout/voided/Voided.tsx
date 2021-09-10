import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Table, Pagination } from '@pabau/ui'
import styles from './Voided.module.less'
import { ClientFinancialsLayoutProps } from './../ClientFinancialsLayout'

export const Voided: FC<ClientFinancialsLayoutProps> = ({ voidedPayments }) => {
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
      title: t('ui.client-card-financial.voided.ref-no'),
      dataIndex: 'refNo',
      className: 'columnTitle',
      width: 100,
      visible: true,
      render: function renderItem(value) {
        return <span className={styles.primaryText}>#{value}</span>
      },
    },
    {
      title: t('ui.client-card-financial.voided.items'),
      dataIndex: 'items',
      visible: true,
      width: 200,
    },
    {
      title: t('ui.client-card-financial.voided.amount'),
      dataIndex: 'amount',
      visible: true,
      width: 80,
      render: function renderItem(value) {
        return '£' + value.toFixed(2)
      },
    },
    {
      title: t('ui.client-card-financial.voided.voided-by'),
      dataIndex: 'voidedBy',
      visible: true,
      width: 100,
    },
    {
      title: t('ui.client-card-financial.voided.date'),
      dataIndex: 'date',
      visible: true,
      width: 100,
    },
  ]

  const onPaginationChange = (currentPage) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({ ...paginateData, offset, currentPage: currentPage })
  }

  return (
    <div className={styles.voided}>
      <Table
        loading={false}
        draggable={false}
        scroll={{ x: true }}
        dataSource={voidedPayments?.map((e: { id }) => ({
          key: e.id,
          ...e,
        }))}
        columns={columns}
        noDataText={t('ui.client-card-financial.voided')}
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
    </div>
  )
}
