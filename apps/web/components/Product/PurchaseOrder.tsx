import { usePurchaseOrdersListQuery } from '@pabau/graphql'
import { Pagination, Table } from '@pabau/ui'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import styles from './ProductListComponents.module.less'

interface P {
  search: string
  filterByStatus?: number
}
const PurchaseOrders = ({ search, filterByStatus }: P): JSX.Element => {
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
        isHidden: Number(!filterByStatus),
        searchTerm: search,
        offset: paginateData.offset,
        limit: paginateData.limit,
      },
    }
    if (!search) {
      delete queryOptions.variables.searchTerm
    }
    return queryOptions
  }, [filterByStatus, search, paginateData.offset, paginateData.limit])

  const { data, loading } = usePurchaseOrdersListQuery(getQueryVariables)

  const calculateTotalCost = (
    items: {
      cost_price?: number
      quantity: number
    }[]
  ): string =>
    items
      ?.map((item) => item?.cost_price * item?.quantity)
      .reduce((amount, sum) => {
        return sum + amount
      }, 0)
      .toFixed(2)

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
      title: t('products.list.purchase.column.createdby'),
      dataIndex: 'created_by',
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
      title: t('products.list.purchase.column.grnNumber'),
      dataIndex: 'grn_number',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('products.list.stock.column.status'),
      dataIndex: 'status',
      className: 'drag-visible',
      visible: true,
      render: (_, { status }) => (
        <span
          className={
            status === 'complete'
              ? styles.greenBtn
              : status === 'open'
              ? styles.redBtn
              : styles.blueBtn
          }
        >
          {status}
        </span>
      ),
    },
    {
      title: t('products.list.purchase.column.location'),
      dataIndex: 'location',
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
      title: t('products.list.purchase.column.category'),
      dataIndex: 'category',
      className: 'drag-visible',
      visible: true,
    },
  ]

  useEffect(() => {
    if (data?.findManyCmPurchaseOrderCount) {
      setPaginateData((d) => ({
        ...d,
        total: data?.findManyCmPurchaseOrderCount,
        showingRecords: data?.findManyCmPurchaseOrder.length,
        searchTerm: search,
      }))
    }
  }, [data, search])

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
            created_date: new Date(d?.created_date * 1000).toLocaleDateString(
              'en-GB'
            ),
            supplier: d?.Supplier?.organisation_name,
            created_by: d?.User?.full_name,
            grn_number:
              d?.grn_number ??
              t('products.list.purchase.column.grnNumber.empty'),
            location: d?.Location?.name,
            is_active: Number(!d?.is_hidden),
            total_cost: calculateTotalCost(d?.Items),
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
