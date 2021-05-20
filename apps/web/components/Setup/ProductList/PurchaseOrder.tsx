import { gql } from '@apollo/client'
import { Pagination, Table, useLiveQuery } from '@pabau/ui'
import React, { FC, useEffect, useState } from 'react'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import styles from './ProductListComponents.module.less'

const LIST_QUERY = gql`
  query purchase_order($offset: Int, $limit: Int, $isActive: Boolean = true) {
    purchase_order(
      offset: $offset
      limit: $limit
      where: { is_active: { _eq: $isActive } }
    ) {
      id
      po_number
      create_date
      supplier
      created_by
      location
      total_cost
      is_active
    }
  }
`

const LIST_AGGREGATE = gql`
  query purchase_order_aggregate {
    purchase_order_aggregate {
      aggregate {
        count
      }
    }
  }
`

const PurchaseOrders: FC = () => {
  const { t } = useTranslationI18()
  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 10,
    currentPage: 1,
    showingRecords: 0,
  })
  const { data, loading } = useLiveQuery(LIST_QUERY, {
    variables: {
      offset: paginateData.offset,
      limit: paginateData.limit,
    },
  })
  const { data: aggregateData } = useLiveQuery(LIST_AGGREGATE)

  const PurchaseOrderColumns = [
    {
      title: t('products.list.purchase.column.ponumber'),
      dataIndex: 'po_number',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('products.list.purchase.column.created'),
      dataIndex: 'create_date',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('products.list.purchase.column.supplier'),
      dataIndex: 'supplier',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('products.list.purchase.column.createdby'),
      dataIndex: 'created_by',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('products.list.purchase.column.location'),
      dataIndex: 'location',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('products.list.purchase.column.totalcost'),
      dataIndex: 'total_cost',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('products.list.purchase.column.status'),
      dataIndex: 'is_active',
      className: 'drag-visible',
      visible: true,
    },
  ]

  useEffect(() => {
    if (aggregateData) {
      setPaginateData((d) => ({
        ...d,
        total: aggregateData?.aggregate.count,
        showingRecords: data?.length,
      }))
    }
  }, [data, aggregateData])

  const onPaginationChange = (currentPage) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({ ...paginateData, offset, currentPage: currentPage })
  }
  return (
    <div className={styles.productListTab}>
      <Table
        loading={loading}
        noDataText={t('products.list.purchase.table.nodata')}
        noDataBtnText={t('products.list.purchase.table.new')}
        columns={PurchaseOrderColumns}
        scroll={{ x: 'max-content' }}
        dataSource={data?.map((d) => ({ ...d, key: d.id }))}
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

export default PurchaseOrders
