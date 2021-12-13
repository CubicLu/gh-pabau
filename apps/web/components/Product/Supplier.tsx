import { useSuppliersListQuery } from '@pabau/graphql'
import { Pagination, Table } from '@pabau/ui'
import React, { FC, useEffect, useState, useMemo } from 'react'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import styles from './ProductListComponents.module.less'
import { filter } from './utility'

interface P {
  showGroup?: boolean
  search: string
  visible: boolean
  filterByStatus: number
}

const Suppliers: FC<P> = ({ search = '', filterByStatus }) => {
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
      searchTerm: search,
      offset: paginateData.offset,
      limit: paginateData.limit,
      disabled: filter(filterByStatus),
    }
  }, [search, paginateData.offset, paginateData.limit, filterByStatus])
  const { data, loading } = useSuppliersListQuery({
    variables: {
      ...getQueryVariables,
    },
  })
  const SupplierColumns = [
    {
      title: t('products.list.supplier.column.status'),
      dataIndex: 'is_active',
      className: 'drag-visible',
      visible: true,
      width: '120px',
    },
    {
      title: t('products.list.supplier.column.name'),
      dataIndex: 'organisation_name',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('products.list.supplier.column.products'),
      dataIndex: 'products_assigned',
      className: 'drag-visible',
      visible: true,
    },
  ]

  useEffect(() => {
    if (data?.findManyAccountManagerCount) {
      setPaginateData((d) => ({
        ...d,
        total: data?.findManyAccountManagerCount,
        showingRecords: data?.findManyAccountManager?.length,
      }))
    }
  }, [data])

  const onPaginationChange = (currentPage: number) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({ ...paginateData, offset, currentPage: currentPage })
  }

  return (
    <div className={styles.productListTab}>
      <Table
        searchTerm={search}
        loading={loading}
        noDataText={t('products.list.supplier.table.nodata')}
        noDataBtnText={t('products.list.supplier.table.new')}
        columns={SupplierColumns}
        dataSource={data?.findManyAccountManager?.map(
          ({
            id,
            organisation_name,
            _count: { InvProduct: number },
            organisation_status,
          }) => {
            return {
              id,
              organisation_name,
              products_assigned: number,
              is_active: organisation_status,
            }
          }
        )}
        scroll={{ x: 'max-content' }}
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

export default Suppliers
