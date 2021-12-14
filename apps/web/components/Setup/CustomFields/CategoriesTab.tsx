import React, { FC, useState, useEffect } from 'react'
import { Table as CategoriesTable, useLiveQuery } from '@pabau/ui'
import {
  CustomFieldsCategoriesDocument,
  CustomFieldsCategoriesAggregateDocument,
} from '@pabau/graphql'

const columns = [
  {
    title: 'Category',
    dataIndex: 'category',
    className: 'columnTitle',
    visible: true,
  },
  {
    title: 'Assigned Fields',
    dataIndex: 'assigned',
    className: 'columnTitle',
    visible: true,
  },
]

interface Pagination {
  total: number
  offset: number
  limit: number
  currentPage: number
  showingRecords: number
}

export interface CategoriesProps {
  paginateData?: Pagination
  setPaginateData?: (data: Pagination) => void
  searchTerm?: string | number
}

export const Categories: FC<CategoriesProps> = ({
  paginateData = {
    total: 0,
    offset: 0,
    limit: 50,
    currentPage: 1,
    showingRecords: 0,
  },
  searchTerm = '',
  setPaginateData,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [sourceData, setSourceData] = useState(null)

  const getQueryVariables = () => {
    const queryOptions = {
      variables: {
        offset: paginateData.offset,
        limit: paginateData.limit,
        searchTerm: '%' + searchTerm + '%',
      },
    }
    return queryOptions
  }
  const getAggregateQueryVariables = () => {
    const queryOptions = {
      variables: {
        searchTerm: '%' + searchTerm + '%',
      },
    }
    return queryOptions
  }

  const { data, loading } = useLiveQuery(
    CustomFieldsCategoriesDocument,
    getQueryVariables()
  )
  const { data: aggregateData } = useLiveQuery(
    CustomFieldsCategoriesAggregateDocument,
    getAggregateQueryVariables()
  )

  useEffect(() => {
    setIsLoading(loading)
    if (data) {
      setSourceData(data)
    }
    if (aggregateData) {
      setPaginateData({
        ...paginateData,
        total: aggregateData?.aggregate?.count,
        showingRecords: data?.length,
      })
    }
    /* eslint-disable-next-line */
  }, [data, aggregateData, loading])

  return (
    <CategoriesTable
      loading={isLoading}
      draggable={true}
      pagination={false}
      dataSource={sourceData?.map((e: { id }) => ({
        key: e.id,
        ...e,
      }))}
      columns={columns}
      noDataBtnText="Fields"
      noDataText="Fields"
      scroll={{ x: 'max-content' }}
    />
  )
}

export default Categories
