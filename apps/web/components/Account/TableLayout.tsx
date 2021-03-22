import React, { FC, useState, useEffect, useMemo } from 'react'
import { Table, useLiveQuery, Pagination } from '@pabau/ui'
import { DocumentNode } from '@apollo/client'

export interface TableLayoutProps {
  listQuery?: DocumentNode
  aggregateQuery?: DocumentNode
  columns?: Column[]
}
interface Column {
  title: string
  dataIndex: string
  className?: string
  visible?: boolean
  width?: string
}
const TableLayout: FC<TableLayoutProps> = ({
  listQuery,
  aggregateQuery,
  columns,
}) => {
  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 10,
    currentPage: 1,
    showingRecords: 0,
  })

  const { data, loading } = useLiveQuery(listQuery, {
    variables: {
      offset: paginateData.offset,
      limit: paginateData.limit,
    },
  })

  const { data: aggregateData } = useLiveQuery(aggregateQuery)

  const onPaginationChange = (currentPage) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData((d) => ({ ...d, offset, currentPage }))
  }

  const invoices = useMemo(() => data?.map((d) => ({ ...d, key: d.id })), [
    data,
  ])

  useEffect(() => {
    if (aggregateData) {
      setPaginateData((paginateData) => ({
        ...paginateData,
        total: aggregateData.aggregate?.count,
        showingRecords: data?.length,
      }))
    }
  }, [data, aggregateData])

  return (
    <section>
      <div>
        <Table
          columns={columns}
          sticky={{ offsetScroll: 80, offsetHeader: 40 }}
          scroll={{ x: 'max-content' }}
          key={loading?.toString()}
          loading={loading}
          pagination={false}
          dataSource={invoices}
        />
      </div>
      <Pagination
        showingRecords={paginateData.showingRecords}
        defaultCurrent={1}
        total={paginateData.total}
        pageSize={paginateData.limit}
        current={paginateData.currentPage}
        onChange={onPaginationChange}
      />
    </section>
  )
}

export default TableLayout
