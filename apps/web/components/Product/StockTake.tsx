import { useInventoryCountListQuery } from '@pabau/graphql'
import { OrderDiscrepancy, Pagination, Table } from '@pabau/ui'
import React, { useEffect, useState, useMemo } from 'react'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import styles from './ProductListComponents.module.less'

interface P {
  search: string
}
const StokeTake = ({ search = '' }: P): JSX.Element => {
  const { t } = useTranslationI18()
  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 50,
    currentPage: 1,
    showingRecords: 0,
  })
  const getQueryVariables = useMemo(() => {
    return {
      searchTerm: '%' + search + '%',
      offset: paginateData.offset,
      limit: paginateData.limit,
    }
  }, [search, paginateData.offset, paginateData.limit])

  const { data, loading } = useInventoryCountListQuery({
    variables: {
      ...getQueryVariables,
    },
  })

  const StockTakeColumns = [
    {
      title: t('products.list.stock.column.countno'),
      dataIndex: 'count_no',
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
      title: t('products.list.stock.column.discrepancies'),
      dataIndex: 'object',
      className: 'drag-visible',
      visible: true,
      width: 125,
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
    if (data?.findManyInventoryCountCount) {
      setPaginateData((d) => ({
        ...d,
        total: data?.findManyInventoryCountCount,
        showingRecords: data?.findManyStockTakeWithInventoryDiscrepancy?.length,
      }))
    }
  }, [data])

  const onPaginationChange = (currentPage) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({ ...paginateData, offset, currentPage: currentPage })
  }
  return (
    <div className={styles.productListTab}>
      <Table
        loading={loading}
        searchTerm={search}
        noDataText={t('products.list.stock.table.nodata')}
        noDataBtnText={t('products.list.stock.table.new')}
        columns={StockTakeColumns}
        scroll={{ x: 'max-content' }}
        dataSource={data?.findManyStockTakeWithInventoryDiscrepancy?.map?.(
          (d) => {
            return {
              ...d,
              status: d?.status,
              count_no: d?.count_name,

              start_date: new Date(d?.date_started * 1000).toLocaleDateString(
                'en-GB'
              ),
              counted_by: d?.user,
              location: d?.name,
              discrepanciesDown: d?.shortage ?? 0,
              discrepanciesUp: d?.overage ?? 0,
              key: d?.id,
            }
          }
        )}
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

export default StokeTake
