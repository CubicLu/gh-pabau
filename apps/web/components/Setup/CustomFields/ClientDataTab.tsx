import React, { FC, useState, useEffect } from 'react'
import { Table as ClientDataTable, useLiveQuery } from '@pabau/ui'
import { Rate } from 'antd'
import { LockOutlined, PhoneOutlined } from '@ant-design/icons'
import {
  ClientsDataDocument,
  ClientsDataAggregateDocument,
} from '@pabau/graphql'

const columns = [
  {
    title: '',
    dataIndex: 'is_liked',
    className: 'columnTitle starColumn',
    visible: true,
    width: '3.5%',
    render: function renderTableSource(val) {
      return (
        <span>
          <Rate
            value={val ? 1 : 0}
            disabled={true}
            count={1}
            style={{ color: '#54B2D3', fontSize: '16px' }}
          />
        </span>
      )
    },
  },
  {
    title: 'Field Name',
    dataIndex: 'name',
    className: 'columnTitle',
    visible: true,
    render: function renderTableSource(val) {
      return (
        <span>
          <span>
            <PhoneOutlined />
          </span>
          {val}
        </span>
      )
    },
  },
  {
    title: 'Field Label',
    dataIndex: 'label',
    className: 'columnTitle',
    visible: true,
  },
  {
    title: 'Format',
    dataIndex: 'format',
    className: 'columnTitle',
    visible: true,
  },
  {
    title: 'Field for',
    dataIndex: 'fieldFor',
    className: 'columnTitle',
    visible: true,
  },
  {
    title: 'Field Category',
    dataIndex: 'category',
    className: 'columnTitle',
    visible: true,
  },
  {
    title: 'Mendatory',
    dataIndex: 'is_mendatory',
    className: 'columnTitle',
    visible: true,
    width: '7.5%',
    render: function renderTableSource(val) {
      return <span>{val ? 'Yes' : 'No'}</span>
    },
  },
  {
    title: 'Privacy',
    dataIndex: 'is_private',
    className: 'columnTitle',
    visible: true,
    width: '7.5%',
    render: function renderTableSource(val) {
      return <span>{val ? 'Yes' : 'No'}</span>
    },
  },
  {
    title: 'Status',
    dataIndex: 'is_active',
    className: 'columnTitle',
    visible: true,
    width: '10%',
  },
  {
    title: '',
    dataIndex: 'is_locked',
    className: 'columnTitle lockColumn',
    visible: true,
    width: '7.5%',
    render: function renderTableSource(val) {
      return <span>{val && <LockOutlined style={{ fontSize: '16px' }} />}</span>
    },
  },
]

interface Pagination {
  total: number
  offset: number
  limit: number
  currentPage: number
  showingRecords: number
}

export interface ClientDataProps {
  paginateData?: Pagination
  setPaginateData?: (data: Pagination) => void
  searchTerm?: string | number
}

export const ClientData: FC<ClientDataProps> = ({
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
    ClientsDataDocument,
    getQueryVariables()
  )
  const { data: aggregateData } = useLiveQuery(
    ClientsDataAggregateDocument,
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
        total: aggregateData?.aggregate.count,
        showingRecords: data?.length,
      })
    }
    /* eslint-disable-next-line */
  }, [data, aggregateData, loading])

  return (
    <ClientDataTable
      loading={isLoading}
      draggable={true}
      pagination={false}
      dataSource={sourceData?.map((e: { id }) => ({
        key: e.id,
        ...e,
      }))}
      onRowClick={(e) => console.log(e)}
      columns={columns}
      noDataBtnText="Client"
      noDataText="Client"
      scroll={{ x: 'max-content' }}
    />
  )
}

export default ClientData
