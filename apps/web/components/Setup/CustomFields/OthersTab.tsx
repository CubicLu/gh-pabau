import React, { FC, useState, useEffect } from 'react'
import { Table as LeadFieldsTable } from '@pabau/ui'
import { LockOutlined, PhoneOutlined } from '@ant-design/icons'

const columns = [
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

const data = [
  {
    key: '2332',
    id: '2342332',
    name: 'Address (second line)',
    label: 'Address (second line)',
    format: 'Text',
    fieldFor: 'Location',
    category: 'Category 1',
    is_mendatory: true,
    is_active: true,
    is_locked: true,
  },
]

interface Pagination {
  total: number
  offset: number
  limit: number
  currentPage: number
  showingRecords: number
}

export interface OthersTabProps {
  paginateData?: Pagination
  setPaginateData?: (data: Pagination) => void
  searchTerm?: string | number
  tabType?: string
}

export const OthersTab: FC<OthersTabProps> = ({
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
  const [isLoading] = useState(false)
  const [sourceData, setSourceData] = useState(null)

  useEffect(() => {
    setSourceData(data)
  }, [])

  return (
    <LeadFieldsTable
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

export default OthersTab
