import {
  usePurchaseOrdersAggregateQuery,
  usePurchaseOrdersListQuery,
} from '@pabau/graphql'
import { Pagination, Table } from '@pabau/ui'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import styles from './ProductListComponents.module.less'

interface P {
  search: string
  active?: number
}

const PurchaseOrders = ({ search, active }: P): JSX.Element => {
  const { t } = useTranslationI18()
  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 50,
    currentPage: 1,
    showingRecords: 0,
  })
  const getQueryVariables = useMemo(() => {
    const queryOptions = {
      variables: {
        isActive: Number(active),
        searchTerm: search,
        offset: paginateData.offset,
        limit: paginateData.limit,
      },
    }
    if (!search) {
      delete queryOptions.variables.searchTerm
    }
    if (!active) {
      delete queryOptions.variables.isActive
    }
    return queryOptions
  }, [active, search, paginateData.offset, paginateData.limit])

  const getAggregateQueryVariables = useMemo(() => {
    const queryOptions = {
      variables: {
        isActive: Number(active),
        searchTerm: search,
      },
    }
    if (!search) {
      delete queryOptions.variables.searchTerm
    }
    if (!active) {
      delete queryOptions.variables.isActive
    }
    return queryOptions
  }, [active, search])

  const { data, loading } = usePurchaseOrdersListQuery(getQueryVariables)

  const { data: aggregateData } = usePurchaseOrdersAggregateQuery(
    getAggregateQueryVariables
  )

  const PurchaseOrderColumns = [
    {
      title: t('products.list.purchase.column.status'),
      dataIndex: 'is_active',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('products.list.purchase.column.ponumber'),
      dataIndex: 'order_no',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('products.list.purchase.column.created'),
      dataIndex: 'created_date',
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
  ]

  useEffect(() => {
    if (aggregateData) {
      setPaginateData((d) => ({
        ...d,
        total: aggregateData.findManyCmPurchaseOrderCount,
        showingRecords: data?.findManyCmPurchaseOrder.length,
        searchTerm: search,
      }))
    }
  }, [data, aggregateData, search])

  const onPaginationChange = (currentPage: number) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({ ...paginateData, offset, currentPage: currentPage })
  }
  return (
    <div className={styles.productListTab}>
      <Table
        loading={loading}
        searchTerm={search}
        noDataText={t('products.list.purchase.table.nodata')}
        noDataBtnText={t('products.list.purchase.table.new')}
        columns={PurchaseOrderColumns}
        scroll={{ x: 'max-content' }}
        dataSource={data?.findManyCmPurchaseOrder?.map((d) => {
          return {
            ...d,
            supplier: d?.Supplier?.organisation_name,
            created_by: d?.User?.full_name,
            location: d?.Location?.city,
            is_active: d?.status,
            total_cost: d?.Items?.map(
              (item) => item.cost_price * item.quantity
            ),
            key: d.id,
          }
        })}
      />
      <div className={styles.pagination}>
        <Pagination
          total={paginateData.total}
          showSizeChanger={false}
          onChange={onPaginationChange}
          pageSize={paginateData.limit}
          current={paginateData.currentPage}
          showingRecords={paginateData.showingRecords}
          pageSizeOptions={['10', '25', '50', '100']}
          onPageSizeChange={(pageSize) => {
            setPaginateData({
              ...paginateData,
              limit: pageSize,
            })
          }}
        />
      </div>
    </div>
  )
}

export default PurchaseOrders
