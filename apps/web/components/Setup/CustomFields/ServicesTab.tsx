import React, { FC, useState, useEffect } from 'react'
import { Table as LeadFieldsTable, useLiveQuery } from '@pabau/ui'
import { LockOutlined } from '@ant-design/icons'
import { Notification, NotificationType } from '@pabau/ui'
import { renderFormatText, renderLabelText } from './ClientDataTab'
import {
  useGetServicesCustomFieldsLeadDataLazyQuery,
  GetCustomFieldsAggregateDocument,
  useUpdateOneManageCustomFieldMutation,
} from '@pabau/graphql'
import CreateCustomFieldModal from './CreateCustomFieldsModal/index'
import styles from './tabs.module.less'
import { EditCustomFieldProps } from './CreateCustomFieldsModal/index'
import { useTranslation } from 'react-i18next'
import { serviceData as staticData } from './data.js'

interface Pagination {
  total: number
  offset: number
  limit: number
  currentPage: number
  showingRecords: number
}

export interface ServicesTabProps {
  paginateData?: Pagination
  setPaginateData?: (data) => void
  searchTerm?: string | number
  tabSelected?: boolean
}

export const ServicesTab: FC<ServicesTabProps> = ({
  paginateData = {
    total: 0,
    offset: 0,
    limit: 100,
    currentPage: 1,
    showingRecords: 0,
  },
  searchTerm = '',
  setPaginateData,
  tabSelected,
  ...props
}) => {
  const { t } = useTranslation('common')
  const [isLoading, setIsLoading] = useState(false)
  const [sourceData, setSourceData] = useState(null)
  const [selectedItem, setSelectedItem] = useState<EditCustomFieldProps>()

  const columns = [
    {
      title: t('setup.custom-fields.field-label'),
      dataIndex: 'field_label',
      className: 'columnTitle',
      visible: true,
      render: function renderTableSource(val, row) {
        return renderLabelText(val, row)
      },
    },
    {
      title: t('setup.custom-fields.format'),
      dataIndex: 'field_type',
      className: 'columnTitle',
      visible: true,
      render: function renderTableSource(val) {
        return <span> {renderFormatText(val)} </span>
      },
    },
    {
      title: t('setup.custom-fields.category'),
      dataIndex: 'Category',
      className: 'columnTitle',
      visible: true,
      render: function renderTableSource(val) {
        return <span> {val?.name ? val?.name : 'Details'} </span>
      },
    },
    {
      title: t('setup.custom-fields.rule'),
      dataIndex: 'is_required',
      className: 'columnTitle',
      visible: true,
      render: function renderTableSource(val, row) {
        return (
          <span>
            {val === 1 ? (
              <span className={styles.customRequiredTag}>
                {t('setup.custom-fields.required')}
              </span>
            ) : (
              <span></span>
            )}
            {row.show_in_cal === true ? (
              <span className={styles.customHiddenTag}>
                {t('setup.custom-fields.hidden')}
              </span>
            ) : (
              <span></span>
            )}
          </span>
        )
      },
    },
    {
      title: '',
      dataIndex: 'is_locked',
      className: 'columnTitle lockColumn',
      visible: true,
      width: '7.5%',
      render: function renderTableSource(val) {
        return (
          <span>{val && <LockOutlined style={{ fontSize: '16px' }} />}</span>
        )
      },
    },
  ]

  const getQueryVariables = () => {
    return {
      variables: {
        offset: paginateData.offset,
        limit: paginateData.limit,
        searchTerm: '%' + searchTerm + '%',
      },
    }
  }

  const getAggregateQueryVariables = () => {
    return {
      variables: {
        searchTerm: '%' + searchTerm + '%',
        type: ['SERVICE'],
      },
    }
  }

  const { data: aggregateData } = useLiveQuery(
    GetCustomFieldsAggregateDocument,
    getAggregateQueryVariables()
  )

  const [
    fetchCustomFields,
    { data, loading },
  ] = useGetServicesCustomFieldsLeadDataLazyQuery({
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    fetchCustomFields(getQueryVariables())
    /* eslint-disable-next-line */
  }, [searchTerm, paginateData.offset])

  const [updateOrderMutation] = useUpdateOneManageCustomFieldMutation({
    fetchPolicy: 'no-cache',
  })

  const updateOrder = (values: { id: number; field_order: number }) => {
    updateOrderMutation({
      variables: {
        data: {
          field_order: {
            set: values?.field_order,
          },
        },
        where: {
          id: values?.id,
        },
      },
    })
  }

  useEffect(() => {
    setIsLoading(loading)
    if (data) {
      if (searchTerm) {
        const staticData_ = staticData.filter(
          (f) =>
            f.field_label
              .toLowerCase()
              .indexOf(searchTerm.toString().toLowerCase()) !== -1
        )
        setSourceData([...data?.custom, ...staticData_])
      } else {
        if (paginateData.offset === 0) {
          setSourceData([...data?.custom, ...staticData])
        } else {
          setSourceData([...data?.custom])
        }
      }
    }

    if (aggregateData) {
      setPaginateData((o) => ({
        ...o,
        total: aggregateData?._count?.count,
        showingRecords: data?.custom?.length,
      }))
    }
    /* eslint-disable-next-line */
  }, [data, loading])

  useEffect(() => {
    if (aggregateData && tabSelected) {
      setPaginateData((o) => ({
        ...o,
        total: aggregateData?._count?.count,
        showingRecords: data?.custom?.length,
      }))
    }
    fetchCustomFields(getQueryVariables())
    /* eslint-disable-next-line */
  }, [tabSelected, aggregateData])

  return (
    <>
      <LeadFieldsTable
        loading={isLoading}
        draggable={true}
        pagination={false}
        dataSource={sourceData?.map((e: { id }) => ({
          key: e.id,
          ...e,
        }))}
        updateDataSource={({ newData, oldIndex, newIndex }) => {
          if (
            sourceData[oldIndex].is_locked ||
            sourceData[newIndex].is_locked
          ) {
            Notification(
              NotificationType.error,
              t('setup.custom-fields.you-can-not-move-static-fields')
            )
            return
          }
          setSourceData(
            (newData = newData.map(
              (data: { field_order: number }, i: number) => {
                data.field_order =
                  sourceData[i]?.field_order === sourceData[i + 1]?.field_order
                    ? sourceData[i].field_order + 1
                    : !sourceData[i].field_order
                    ? 1
                    : sourceData[i].field_order
                return data
              }
            ))
          )

          if (oldIndex > newIndex) {
            for (let i = newIndex; i <= oldIndex; i++) {
              updateOrder(newData[i])
            }
          } else {
            for (let i = oldIndex; i <= newIndex; i++) {
              updateOrder(newData[i])
            }
          }
        }}
        onRowClick={(e) => {
          if (!e.is_locked) {
            const custom_field_display =
              e.CustomFieldDisplay[e.CustomFieldDisplay.length - 1]
            setSelectedItem({
              id: e.id,
              name: e.field_label,
              category: e.category_id,
              fieldType: renderFormatText(e.field_type, true),
              displayFor: 'SERVICE',
              visibleInClientDataView: e.display_in_invoice,
              appearsInAddClientView: e.default_in_reports,
              required: e.is_required,
              visibilityOption: e.show_in_cal,
              in_cases: custom_field_display?.depends_on,
              in_cases_text: custom_field_display?.value,
            })
          }
        }}
        columns={columns}
        noDataBtnText="Fields"
        noDataText="Fields"
        scroll={{ x: 'max-content' }}
      />
      {selectedItem && (
        <CreateCustomFieldModal
          visible={true}
          selectedAttributeLabel={'Services'}
          modalTitle={'Edit Services'}
          onClose={() => {
            setSelectedItem(undefined)
            fetchCustomFields(getQueryVariables())
          }}
          values={selectedItem}
        />
      )}
    </>
  )
}

export default ServicesTab
