import React, { FC, useState, useEffect } from 'react'
import { Table as ClientDataTable, useLiveQuery } from '@pabau/ui'
import {
  UserOutlined,
  AlignLeftOutlined,
  DownOutlined,
  CalendarOutlined,
  PhoneOutlined,
  GlobalOutlined,
  MessageOutlined,
  CheckOutlined,
  MailOutlined,
  LockOutlined,
  NumberOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { Notification, NotificationType } from '@pabau/ui'
import {
  useGetContactCustomFieldsClientDataLazyQuery,
  GetCustomFieldsAggregateDocument,
  useUpdateOneManageCustomFieldMutation,
} from '@pabau/graphql'
import SelectCircleIcon from '../../../assets/images/icons/select-circle.png'
import AlignLeftIcon from '../../../assets/images/icons/align-left.png'
import CreateCustomFieldModal from './CreateCustomFieldsModal/index'
import styles from './tabs.module.less'
import { EditCustomFieldProps } from './CreateCustomFieldsModal/index'
import { useTranslation } from 'react-i18next'
import { clientData as staticData } from './data.js'

export const renderFormatText = (s, key = false) => {
  s = s.toLowerCase()
  if (
    [
      'string',
      'single line text',
      'single_line_text',
      'single text',
      'single_text',
      'short text',
      'short_text',
    ].indexOf(s) !== -1
  ) {
    if (key) return 'single_line_text'
    return 'Single Line Text'
  }
  if (['single choice', 'single_choice', 'bool'].indexOf(s) !== -1) {
    if (key) return 'single_choice'
    return 'Single Choice'
  }
  if (
    ['multiple', 'multiple choice', 'multiple_choice', 'checkbox'].indexOf(
      s
    ) !== -1
  ) {
    if (key) return 'multiple_choice'
    return 'Multiple Choice'
  }
  if (['text', 'paragraph_text'].indexOf(s) !== -1) {
    if (key) return 'paragraph_text'
    return 'Paragraph Text'
  }

  if (['url', 'website'].indexOf(s) !== -1) {
    if (key) return 'url'
    return 'URL'
  }

  if (['dropdown', 'list'].indexOf(s) !== -1) {
    if (key) return 'dropdown'
    return 'Dropdown'
  }

  if (key) {
    if (['date'].indexOf(s) !== -1) {
      return 'date'
    }
    if (['email'].indexOf(s) !== -1) {
      return 'email'
    }
    if (['phone'].indexOf(s) !== -1) {
      return 'phone'
    }
    if (['localized message', 'localized_message'].indexOf(s) !== -1) {
      return 'localized_message'
    }
  }

  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const renderLabelText = (val, row) => {
  let Icon = (
    <span>
      <AlignLeftOutlined
        style={{ fontSize: 14, marginRight: 8, color: '#b7b7b8' }}
      />
    </span>
  )
  const field_type = renderFormatText(row.field_type).toLowerCase()
  if (['single line text'].indexOf(field_type) !== -1) {
    Icon = (
      <span>
        <img
          src={AlignLeftIcon}
          alt={field_type}
          style={{ height: 16, width: 16, marginRight: 8, display: 'revert' }}
        />
      </span>
    )
  }
  if (['dropdown', 'list'].indexOf(field_type) !== -1) {
    Icon = (
      <span>
        <DownOutlined
          style={{ fontSize: 14, marginRight: 8, color: '#b7b7b8' }}
        />
      </span>
    )
  }
  if (['multiple choice', 'checkbox'].indexOf(field_type) !== -1) {
    Icon = (
      <span>
        <CheckOutlined
          style={{ fontSize: 14, marginRight: 8, color: '#b7b7b8' }}
        />
      </span>
    )
  }
  if (['single choice'].indexOf(field_type) !== -1) {
    Icon = (
      <img
        src={SelectCircleIcon}
        alt={field_type}
        style={{ height: 16, width: 16, marginRight: 8, display: 'revert' }}
      />
    )
  }
  if (['date'].indexOf(field_type) !== -1) {
    Icon = (
      <span>
        <CalendarOutlined
          style={{ fontSize: 14, marginRight: 8, color: '#b7b7b8' }}
        />
      </span>
    )
  }
  if (['email'].indexOf(field_type) !== -1) {
    Icon = (
      <span>
        <MailOutlined
          style={{ fontSize: 14, marginRight: 8, color: '#b7b7b8' }}
        />
      </span>
    )
  }
  if (['phone'].indexOf(field_type) !== -1) {
    Icon = (
      <span>
        <PhoneOutlined
          style={{ fontSize: 14, marginRight: 8, color: '#b7b7b8' }}
        />
      </span>
    )
  }
  if (['url'].indexOf(field_type) !== -1) {
    Icon = (
      <span>
        <GlobalOutlined
          style={{ fontSize: 14, marginRight: 8, color: '#b7b7b8' }}
        />
      </span>
    )
  }
  if (['localized message'].indexOf(field_type) !== -1) {
    Icon = (
      <span>
        <MessageOutlined
          style={{ fontSize: 14, marginRight: 8, color: '#b7b7b8' }}
        />
      </span>
    )
  }
  if (['user'].indexOf(field_type) !== -1) {
    Icon = (
      <span>
        <UserOutlined
          style={{ fontSize: 14, marginRight: 8, color: '#b7b7b8' }}
        />
      </span>
    )
  }
  if (['number'].indexOf(field_type) !== -1) {
    Icon = (
      <span>
        <NumberOutlined
          style={{ fontSize: 14, marginRight: 8, color: '#b7b7b8' }}
        />
      </span>
    )
  }

  if (['number'].indexOf(field_type) !== -1) {
    Icon = (
      <span>
        <NumberOutlined
          style={{ fontSize: 14, marginRight: 8, color: '#b7b7b8' }}
        />
      </span>
    )
  }

  if (['upload'].indexOf(field_type) !== -1) {
    Icon = (
      <span>
        <UploadOutlined
          style={{ fontSize: 14, marginRight: 8, color: '#b7b7b8' }}
        />
      </span>
    )
  }

  return (
    <span>
      {Icon}
      <span>{val}</span>
    </span>
  )
}

interface Pagination {
  total: number
  offset: number
  limit: number
  currentPage: number
  showingRecords: number
}

export interface ClientDataProps {
  paginateData?: Pagination
  setPaginateData?: (data) => void
  searchTerm?: string | number
  tabSelected?: boolean
}

export interface ClientDataRowProp {
  name?: string
  category?: string | number
  fieldType?: string
}

export const ClientData: FC<ClientDataProps> = ({
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
        type: ['CONTACT', 'CONTACTLEAD'],
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
  ] = useGetContactCustomFieldsClientDataLazyQuery({
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
  }, [data, loading, aggregateData])

  useEffect(() => {
    if (aggregateData && tabSelected) {
      setPaginateData((o) => ({
        ...o,
        total: aggregateData?._count?.count,
        showingRecords: data?.custom?.length,
      }))
      fetchCustomFields(getQueryVariables())
    }
    /* eslint-disable-next-line */
  }, [tabSelected, aggregateData])

  return (
    <>
      <ClientDataTable
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
              displayFor: 'CONTACT',
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
        noDataBtnText="Client"
        noDataText="Client"
        scroll={{ x: 'max-content' }}
      />
      {selectedItem && (
        <CreateCustomFieldModal
          visible={true}
          selectedAttributeLabel={'client'}
          modalTitle={'Edit Client'}
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

export default ClientData
