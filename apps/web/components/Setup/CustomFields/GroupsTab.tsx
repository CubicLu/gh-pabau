import React, { FC, useState, useEffect } from 'react'
import { LockOutlined } from '@ant-design/icons'
import { Table as CategoriesTable, useLiveQuery } from '@pabau/ui'
import {
  useCustomFieldsGroupCountsLazyQuery,
  CustomFieldsGroupAggregateDocument,
} from '@pabau/graphql'
import { CreateGroupsTab, CreateGroupsTabValueProp } from './CreateGroupsTab'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import { groupData as staticData } from './data.js'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    className: 'columnTitle',
    visible: true,
  },
  {
    title: 'Number of fields',
    dataIndex: 'no_of_fields',
    className: 'columnTitle',
    visible: true,
    render: function renderTableSource(val) {
      return <span>{`${val}`}</span>
    },
  },
  {
    title: '',
    dataIndex: 'is_locked',
    className: 'columnTitle lockColumn',
    visible: true,
    render: function renderTableSource(val, row) {
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

export interface GroupsTabProps {
  paginateData?: Pagination
  setPaginateData?: (data) => void
  searchTerm?: string | number
  tabSelected?: boolean
}

export interface GroupProp {
  id: number | string
  name: string
  no_of_fields: number
}

export const GroupsTab: FC<GroupsTabProps> = ({
  paginateData = {
    total: 0,
    offset: 0,
    limit: 50,
    currentPage: 1,
    showingRecords: 0,
  },
  searchTerm = '',
  setPaginateData,
  tabSelected,
  ...props
}) => {
  const { t } = useTranslationI18()
  const [isLoading, setIsLoading] = useState(false)
  const [sourceData, setSourceData] = useState<GroupProp[]>([])
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<CreateGroupsTabValueProp>()

  const getAggregateQueryVariables = () => {
    return {
      variables: {
        searchTerm: '%' + searchTerm + '%',
      },
    }
  }

  const { data: aggregateData } = useLiveQuery(
    CustomFieldsGroupAggregateDocument,
    getAggregateQueryVariables()
  )

  const getQueryVariables = () => {
    return {
      variables: {
        offset: paginateData.offset,
        limit: paginateData.limit,
        searchTerm: '%' + searchTerm + '%',
      },
    }
  }

  const [
    fetchGroupsFields,
    { data, loading },
  ] = useCustomFieldsGroupCountsLazyQuery({
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    fetchGroupsFields(getQueryVariables())
    /* eslint-disable-next-line */
  }, [searchTerm, paginateData.offset])

  useEffect(() => {
    setIsLoading(loading)
    if (data) {
      const data_ = data?.findManyManageCustomFieldCategory?.map((d) => {
        return {
          id: d.id,
          name: d.name,
          no_of_fields: d.ManageCustomField.length,
        }
      })

      if (searchTerm) {
        const staticData_ = staticData.filter(
          (f) =>
            f.name
              .toLowerCase()
              .indexOf(searchTerm.toString().toLowerCase()) !== -1
        )
        setSourceData([...data_, ...staticData_])
      } else {
        if (paginateData.offset === 0) {
          setSourceData([...data_, ...staticData])
        } else {
          setSourceData([...data_])
        }
      }
    }

    if (aggregateData) {
      setPaginateData((o) => ({
        ...o,
        total: aggregateData?._count?.count,
        showingRecords: data?.findManyManageCustomFieldCategory?.length,
      }))
    }

    /* eslint-disable-next-line */
  }, [data, loading, aggregateData])

  useEffect(() => {
    if (aggregateData && tabSelected) {
      setPaginateData((o) => ({
        ...o,
        total: aggregateData?._count?.count,
        showingRecords: data?.findManyManageCustomFieldCategory?.length,
      }))
      fetchGroupsFields(getQueryVariables())
    }
    /* eslint-disable-next-line */
  }, [tabSelected, aggregateData])

  return (
    <>
      <CategoriesTable
        loading={isLoading}
        draggable={true}
        pagination={false}
        dataSource={sourceData?.map((e: { id }) => ({
          key: e.id,
          ...e,
        }))}
        onRowClick={(e) => {
          if (!e.is_locked) {
            setShowModal(true)
            setSelectedItem({
              id: e.id,
              name: e.name,
              noOfFields: e.no_of_fields,
            })
          }
        }}
        columns={columns}
        noDataBtnText={t('setup.custom-fields.groups')}
        noDataText={t('setup.custom-fields.groups')}
        scroll={{ x: 'max-content' }}
      />
      <CreateGroupsTab
        showModal={showModal}
        values={selectedItem}
        closeModal={() => {
          fetchGroupsFields(getQueryVariables())
          setShowModal(false)
        }}
      />
    </>
  )
}

export default GroupsTab
