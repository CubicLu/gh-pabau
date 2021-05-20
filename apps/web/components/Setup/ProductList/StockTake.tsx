import { gql } from '@apollo/client'
import { OrderDiscrepancy, Pagination, Table, useLiveQuery } from '@pabau/ui'
import React, { FC, useEffect, useState } from 'react'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import styles from './ProductListComponents.module.less'

const LIST_QUERY = gql`
  query stock_take($offset: Int, $limit: Int) {
    stock_take(offset: $offset, limit: $limit) {
      id
      name
      count_no
      start_date
      counted_by
      total
      location
      status
      discrepanciesUp
      discrepanciesDown
    }
  }
`

const LIST_AGGREGATE = gql`
  query stock_take_aggregate {
    stock_take_aggregate {
      aggregate {
        count
      }
    }
  }
`

const StokeTake: FC = () => {
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

  const StockTakeColumns = [
    {
      title: t('products.list.stock.column.countno'),
      dataIndex: 'count_no',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('products.list.stock.column.name'),
      dataIndex: 'name',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('products.list.stock.column.start'),
      dataIndex: 'start_date',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('products.list.stock.column.countedby'),
      dataIndex: 'counted_by',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('products.list.stock.column.location'),
      dataIndex: 'location',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('products.list.stock.column.total'),
      dataIndex: 'total',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('products.list.stock.column.discrepancies'),
      dataIndex: 'object',
      className: 'drag-visible',
      visible: true,
      width: 125,
      // eslint-disable-next-line react/display-name
      render: (_, { discrepanciesUp, discrepanciesDown }) => (
        <span className={styles.row}>
          <span style={{ marginRight: 6 }}>
            <OrderDiscrepancy number={discrepanciesUp} word={1} />
          </span>
          <OrderDiscrepancy number={discrepanciesDown} word={0} />
        </span>
      ),
    },
    {
      title: t('products.list.stock.column.status'),
      dataIndex: 'status',
      className: 'drag-visible',
      visible: true,
      // eslint-disable-next-line react/display-name
      render: (_, { status }) => (
        <span
          className={
            status === 'Completed'
              ? styles.greenBtn
              : status === 'Cancelled'
              ? styles.redBtn
              : styles.blueBtn
          }
        >
          {status}
        </span>
      ),
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
        noDataText={t('products.list.stock.table.nodata')}
        noDataBtnText={t('products.list.stock.table.new')}
        columns={StockTakeColumns}
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

export default StokeTake
