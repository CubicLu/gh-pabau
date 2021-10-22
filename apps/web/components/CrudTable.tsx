import { DocumentNode, useMutation } from '@apollo/client'
import {
  Breadcrumb,
  Notification,
  NotificationType,
  Pagination,
  Table,
  useLiveQuery,
} from '@pabau/ui'
import { LastAppointmentStatusOrderDocument } from '@pabau/graphql'
import { Typography } from 'antd'
import classNames from 'classnames'
import { Formik, FormikErrors } from 'formik'
import load from 'lodash'
import { useRouter } from 'next/router'
import React, { FC, RefObject, useEffect, useMemo, useState } from 'react'
import { useTranslationI18 } from '../hooks/useTranslationI18'
import CommonHeader from '../components/CommonHeader'
import AddButton from './AddButton'
import CrudModal from './CrudModal'
import styles from './CrudTable.module.less'

const { Title } = Typography

let lastOrder = 0
interface P {
  schema: Schema
  crudLayoutRef: RefObject<HTMLDivElement>
  addQuery?: DocumentNode
  deleteQuery?: DocumentNode
  listQuery: DocumentNode
  editQuery: DocumentNode
  aggregateQuery?: DocumentNode
  tableSearch?: boolean
  updateOrderQuery?: DocumentNode | null
  showNotificationBanner?: boolean
  createPage?: boolean
  notificationBanner?: React.ReactNode
  createPageOnClick?(): void
  addFilter?: boolean
  needTranslation?: boolean
  editPage?: boolean
  editPageRouteLink?: string
  isCustomFilter?: boolean
  customFilter?: () => JSX.Element
  setEditPage?(e): void
  draggable?: boolean
  getLastOrder?: DocumentNode
  isCustomOrder?: boolean
  isDependentField?: boolean
  displayColor?: boolean
  displayLock?: boolean
  isNestedQuery?: boolean
  isFilterNumber?: boolean
  isNotificationBannerOnData?: boolean
  isCodeGen?: boolean
  deleteOnInactive?: boolean
  isHavingDefaultRecords?: boolean
}

const CrudTable: FC<P> = ({
  schema,
  addQuery,
  deleteQuery,
  listQuery,
  editQuery,
  aggregateQuery,
  tableSearch = true,
  updateOrderQuery,
  showNotificationBanner = false,
  notificationBanner,
  createPage = false,
  createPageOnClick,
  addFilter = true,
  needTranslation = false,
  editPage = false,
  editPageRouteLink,
  isCustomFilter = false,
  customFilter,
  setEditPage,
  draggable = true,
  getLastOrder = LastAppointmentStatusOrderDocument,
  isCustomOrder = false,
  isDependentField = false,
  displayColor = false,
  displayLock = false,
  isNestedQuery = false,
  isFilterNumber = false,
  isNotificationBannerOnData = false,
  crudLayoutRef,
  isCodeGen = false,
  deleteOnInactive = false,
  isHavingDefaultRecords = false,
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isActive, setIsActive] = useState<boolean | number>(
    schema?.filter?.primary?.default ?? true
  )
  const [searchTerm, setSearchTerm] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMobileSearch, setMobileSearch] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formSubmitAllowed, setFormSubmitAllowedStatus] = useState(true)
  const { t } = useTranslationI18()
  const router = useRouter()

  const [editMutation] = useMutation(editQuery, {
    onCompleted() {
      Notification(NotificationType.success, schema.messages.update.success)
    },
    onError() {
      Notification(NotificationType.error, schema.messages.update.error)
    },
    optimisticResponse: {},
  })
  const [updateOrderMutation] = useMutation(updateOrderQuery, {
    onError() {
      Notification(NotificationType.error, schema.messages.update.error)
    },
    optimisticResponse: {},
  })
  const [addMutation] = useMutation(addQuery, {
    onCompleted() {
      Notification(NotificationType.success, schema.messages.create.success)
    },
    onError() {
      Notification(NotificationType.error, schema.messages.create.error)
    },
  })
  const [sourceData, setSourceData] = useState(null)
  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 50,
    currentPage: 1,
    showingRecords: 0,
  })
  const [modalShowing, setModalShowing] = useState(false)
  const [editingRow, setEditingRow] = useState<
    Record<string, string | boolean | number>
  >({})

  const getQueryVariables = useMemo(() => {
    const queryOptions = {
      variables: {
        isActive,
        searchTerm: '%' + searchTerm + '%',
        offset: paginateData.offset,
        limit: paginateData.limit,
      },
    }
    if (!tableSearch) {
      delete queryOptions.variables.searchTerm
    }
    if (!addFilter) {
      console.log('my query vars', queryOptions.variables)
      delete queryOptions.variables.isActive
    }
    return queryOptions
  }, [
    searchTerm,
    tableSearch,
    addFilter,
    paginateData.offset,
    paginateData.limit,
    isActive,
  ])

  const getAggregateQueryVariables = () => {
    const queryOptions = {
      variables: {
        isActive,
        searchTerm: '%' + searchTerm + '%',
      },
    }

    if (!tableSearch) {
      delete queryOptions.variables.searchTerm
    }
    if (!addFilter) {
      delete queryOptions.variables.isActive
    }
    return queryOptions
  }

  const { data, error, loading } = useLiveQuery(listQuery, getQueryVariables)

  const { data: aggregateData } = useLiveQuery(
    aggregateQuery,
    getAggregateQueryVariables()
  )

  const { data: lastOrderData } = useLiveQuery(getLastOrder, {
    skip: !isCustomOrder,
  })

  if (lastOrderData?.[0].order) {
    lastOrder = lastOrderData?.[0].order
  }

  const getAddress = (data) => {
    const addressPreference = new Set([
      'country',
      'city',
      'street',
      'post_code',
    ])
    const { country, city, street, post_code } = data
    let address
    const addressPart = []
    if (!country && !city && !street && !post_code) {
      address = 'No address found'
    } else {
      for (const key in data) {
        if (addressPreference.has(key) && data[key]) {
          addressPart.push(data[key])
        }
      }
      address = addressPart.join(',').toString().replace(/,/g, ', ')
    }
    return address
  }

  useEffect(() => {
    if (data) {
      if (schema.full === 'Issuing Company') {
        const newData = data.map((d) => {
          return {
            ...d,
            address: getAddress(d),
          }
        })
        setSourceData(newData)
      } else if (isNotificationBannerOnData && Object.keys(data).length > 1) {
        let restData = { ...data }
        restData = restData[schema?.showNotification?.list]
        setSourceData(restData)
      } else {
        setSourceData(data)
      }
    }
    if (aggregateData !== undefined) {
      if (aggregateData?.aggregate?.count) {
        setPaginateData({
          ...paginateData,
          total: aggregateData?.aggregate.count,
          showingRecords: data?.length,
        })
      } else if (isNotificationBannerOnData) {
        setPaginateData({
          ...paginateData,
          total: aggregateData,
          showingRecords: data && data[schema?.showNotification?.list]?.length,
        })
      } else {
        setPaginateData({
          ...paginateData,
          total: aggregateData,
          showingRecords: data?.length,
        })
      }
    }
    if (!loading && data) setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, aggregateData, loading])

  useEffect(() => {
    if (crudLayoutRef.current) {
      crudLayoutRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginateData.currentPage, paginateData.limit])

  const onFilterMarketingSource = () => {
    resetPagination()
    if (schema?.filter?.primary?.type === 'number') {
      setIsActive((e) => {
        return e ? 0 : 1
      })
    } else {
      setIsActive((e) => !e)
    }
  }

  const onSearch = async (val) => {
    if (val !== searchTerm) {
      resetPagination()
      setSearchTerm(val)
    }
  }

  const onPaginationChange = (currentPage, limit) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({
      ...paginateData,
      offset,
      limit,
      currentPage: currentPage,
    })
  }

  const resetPagination = () => {
    setPaginateData({
      total: 0,
      offset: 0,
      limit: 50,
      currentPage: 1,
      showingRecords: 0,
    })
  }

  if (error) {
    console.error(error)
  }

  const { fields } = schema

  const getTrackTime = (value) => {
    return value.track_time ? 1 : 0
  }

  const getDependentValue = (name) => {
    return name.toLowerCase().replace(/[^\dA-Za-z]+/g, '')
  }

  const getCodeGenEditVariableValues = (values) => {
    const { key, __typename, id, ...rest } = values
    let newEditValues = {}
    for (const item of Object.keys(rest)) {
      if (values[item] !== null) {
        newEditValues = { ...newEditValues, [item]: { set: values[item] } }
      }
    }
    return { data: newEditValues, where: { id: id } }
  }

  const onSubmit = async (values, { resetForm }) => {
    setFormSubmitAllowedStatus(false)
    if (draggable && isCustomOrder && !values.id) {
      values = {
        ...values,
        order: lastOrder + 1,
        track_time: getTrackTime(values.track_time),
        value: getDependentValue(values.name),
      }
    } else if (isDependentField && values.id) {
      values = {
        ...values,
        track_time: getTrackTime(values.track_time),
        value: getDependentValue(values.name),
      }
    } else if (isFilterNumber && schema?.filter?.primary?.type === 'number') {
      values = {
        ...values,
        [schema?.filter?.primary?.name]: values[schema?.filter?.primary?.name]
          ? schema?.filter?.primary?.active
          : schema?.filter?.primary?.inactive,
      }
    }

    let newValues
    if (isCodeGen) {
      if (schema?.company) {
        newValues = { data: { ...values, [schema['company']]: {} } }
      } else {
        newValues = { data: { ...values } }
      }
      if (values.id) {
        newValues = getCodeGenEditVariableValues(values)
      }
    } else {
      newValues = values
    }

    if (isCodeGen && isCustomOrder) {
      if (values.id) {
        newValues.data = {
          ...newValues.data,
          [schema?.ordering?.name ?? 'order']: { set: values.order },
        }
      } else {
        newValues.data = {
          ...newValues.data,
          [schema?.ordering?.name ?? 'order']: values.order,
        }
      }
      delete newValues.data.order
    }
    if (isHavingDefaultRecords && !values.id) {
      newValues.data = {
        ...newValues.data,
        default: false,
      }
    }
    await (values.id
      ? editMutation({
          variables: newValues,
          optimisticResponse: {},
          refetchQueries: [
            {
              query: listQuery,
              ...getQueryVariables,
            },
            {
              query: aggregateQuery,
              ...getAggregateQueryVariables(),
            },
          ],
        })
      : addMutation({
          variables: newValues,
          optimisticResponse: {},
          refetchQueries: [
            {
              query: listQuery,
              ...getQueryVariables,
            },
            {
              query: aggregateQuery,
              ...getAggregateQueryVariables(),
            },
          ],
        }))
    resetForm()
    setModalShowing(false)
  }

  const formikFields = () => {
    const initialValues = { name: '' }
    Object.keys(fields).map((field) => {
      initialValues[field] = checkFieldType(
        fields[field]['type'],
        fields[field]['defaultvalue']
      )
      return field
    })
    return initialValues
  }

  const checkFieldType = (type: string, defaultVal) => {
    switch (type) {
      case 'string':
      case 'color-picker':
      case 'radio-group':
        return defaultVal ?? ''
      case 'boolean':
      case 'checkbox':
        return defaultVal ?? true
      default:
        return defaultVal ?? ''
    }
  }

  const checkCustomColorIconExist = (type) => {
    let exists = false
    sourceData?.map((data) => {
      if (data[type]) {
        exists = true
      }
      return data
    })
    return exists
  }

  const updateOrder = async (values) => {
    let newValues
    if (values.id) {
      if (isCodeGen) {
        newValues = {
          data: { ord: { set: values.order } },
          where: { id: values.id },
        }
      } else {
        newValues = values
      }
      await updateOrderMutation({
        variables: newValues,
        optimisticResponse: {},
        refetchQueries: [
          {
            query: listQuery,
            ...getQueryVariables,
          },
        ],
      })
    }
  }

  const createNew = () => {
    if (!createPage) {
      setModalShowing((e) => !e)
      setEditingRow({ name: '', isCreate: true })
    } else {
      createPageOnClick()
    }
  }

  const recursiveCallToFlatten = (value, main) => {
    for (const key in value) {
      if (typeof value[key] === 'object') {
        recursiveCallToFlatten(value[key], main)
      } else {
        main = load.defaults(main, { [key]: value[key] })
      }
    }
    return main
  }

  const handleEditValues = () => {
    if (isNestedQuery) {
      const nestedData = { ...editingRow }
      let newNestedData
      for (const key in nestedData) {
        newNestedData =
          typeof nestedData[key] === 'object' && nestedData[key]
            ? recursiveCallToFlatten(nestedData[key], newNestedData)
            : load.defaults(newNestedData, { [key]: nestedData[key] })
      }
      return newNestedData
    } else {
      return editingRow
    }
  }

  return (
    <Formik
      enableReinitialize={true}
      validate={(e) =>
        Object.entries(fields).reduce((a, c) => {
          if (
            c[1].min && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            c[1].min > e[c[0]]?.length &&
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            e[c[0]]?.length <= 50
          ) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            a[c[0]] = t('crud-table-input-min-length-validate', {
              what: c[1].shortLower,
              min: c[1].min,
            })
          } else if (
            c[1].required && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            e[c[0]]?.length === 0 &&
            c[1].validateMsg
          ) {
            a[c[0]] = c[1].validateMsg
          } else if (
            c[1].max && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            c[1].max < e[c[0]]?.toString().length
          ) {
            a[c[0]] = t('crud-table-input-max-length-validate', {
              max: c[1].max,
            })
          } else if (
            e[c[0]] &&
            c[1].type === 'number' &&
            // eslint-disable-next-line
              !/^[+]?([0-9]+(?:\.][0-9]*)?|\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/.test(
              e[c[0]].toString()
            )
          ) {
            a[c[0]] = t('crud-table-input-invalid-validate', {
              what: c[1].shortLower,
            })
          }
          return a
          // eslint-disable-next-line
          }, {} as FormikErrors<any>)
      }
      onSubmit={(values, { resetForm }) => {
        onSubmit(values, { resetForm })
      }}
      initialValues={
        editingRow?.id ? handleEditValues() : formikFields() //TODO: remove this, it should come from schema.fields[].*
      }
    >
      <>
        <div
          className={classNames(
            styles.marketingSourcePage,
            styles.desktopViewNone
          )}
        >
          <CommonHeader
            isLeftOutlined
            reversePath="/setup"
            title={schema.full || schema.short}
            isShowSearch={tableSearch}
            searchInputPlaceHolder={schema?.searchPlaceholder}
            handleSearch={onSearch}
            searchValue={searchTerm}
          >
            {addQuery && !createPage ? (
              <AddButton
                onClick={createNew}
                onFilterSource={onFilterMarketingSource}
                schema={schema}
                tableSearch={false}
                needTranslation={needTranslation}
                addFilter={addFilter}
                isCustomFilter={isCustomFilter}
                customFilter={customFilter}
              />
            ) : (
              <AddButton
                onClick={createPageOnClick}
                onFilterSource={onFilterMarketingSource}
                schema={schema}
                tableSearch={false}
                needTranslation={needTranslation}
                addFilter={addFilter}
                isCustomFilter={isCustomFilter}
                customFilter={customFilter}
              />
            )}
          </CommonHeader>
        </div>

        {modalShowing && (
          <CrudModal
            schema={schema}
            editingRow={editingRow}
            addQuery={addQuery}
            deleteQuery={deleteQuery}
            onClose={() => setModalShowing(false)}
            needTranslation={needTranslation}
            listQuery={listQuery}
            listQueryVariables={getQueryVariables}
            aggregateQuery={aggregateQuery}
            aggregateQueryVariables={getAggregateQueryVariables}
            isCodeGen={isCodeGen}
            deleteOnInactive={deleteOnInactive}
          />
        )}
        {isNotificationBannerOnData
          ? data?.[schema?.showNotification?.query]?.length > 0 &&
            data?.[schema?.showNotification?.query][0]?.create_invoice === '1'
            ? showNotificationBanner && notificationBanner
            : null
          : showNotificationBanner && notificationBanner}
        <div
          className={classNames(styles.tableMainHeading, styles.mobileViewNone)}
        >
          <div style={{ background: '#FFF' }}>
            <Breadcrumb
              items={[
                {
                  breadcrumbName: t('navigation-breadcrumb-setup'),
                  path: 'setup',
                },
                { breadcrumbName: schema.full || schema.short, path: '' },
              ]}
            />
            <Title>{schema.full || schema.short}</Title>
          </div>
          {addQuery && !createPage ? (
            <AddButton
              onClick={createNew}
              onFilterSource={onFilterMarketingSource}
              onSearch={onSearch}
              schema={schema}
              tableSearch={tableSearch}
              needTranslation={needTranslation}
              addFilter={addFilter}
              isCustomFilter={isCustomFilter}
              customFilter={customFilter}
              searchTerm={searchTerm}
            />
          ) : (
            <AddButton
              onClick={createPageOnClick}
              onFilterSource={onFilterMarketingSource}
              onSearch={onSearch}
              schema={schema}
              tableSearch={tableSearch}
              addFilter={addFilter}
              needTranslation={needTranslation}
              isCustomFilter={isCustomFilter}
              customFilter={customFilter}
              searchTerm={searchTerm}
            />
          )}
        </div>
        <div className={styles.marketingSourcesTableContainer}>
          <Table
            loading={isLoading}
            style={{ height: '100%' }}
            sticky={{ offsetScroll: 80, offsetHeader: 64 }}
            pagination={sourceData?.length > 10 ? {} : false}
            draggable={draggable}
            isCustomColorExist={checkCustomColorIconExist('color')}
            isCustomIconExist={checkCustomColorIconExist('icon')}
            noDataBtnText={schema?.noDataBtnText ?? schema.full}
            noDataText={schema?.noDataText ?? schema.fullLower}
            padlocked={schema.padlocked}
            scroll={{ x: 'max-content' }}
            onAddTemplate={
              createPage ? () => createPageOnClick() : () => createNew()
            }
            searchTerm={searchTerm}
            columns={[
              ...Object.entries(schema.fields).map(([k, v]) => ({
                dataIndex: k,
                width: v.cssWidth,
                title: v.short || v.full,
                visible: Object.prototype.hasOwnProperty.call(v, 'visible')
                  ? v.visible
                  : true,
                render: v.render,
              })),
            ]}
            dataSource={sourceData?.map((e: { id: string | number }) => ({
              key: e.id,
              ...e,
            }))}
            updateDataSource={({ newData, oldIndex, newIndex }) => {
              newData = newData.map((data, i) => {
                data.order = sourceData[i].order
                return data
              })
              if (oldIndex > newIndex) {
                for (let i = newIndex; i <= oldIndex; i++) {
                  updateOrder(newData[i])
                }
              } else {
                for (let i = oldIndex; i <= newIndex; i++) {
                  updateOrder(newData[i])
                }
              }
              setSourceData(newData)
            }}
            onRowClick={(e) => {
              if (editPage) {
                router.push(`${editPageRouteLink}/${e.id}`)
              } else if (createPage) {
                setEditPage(e)
              } else {
                setEditingRow(e)
                setModalShowing((e) => !e)
              }
            }}
            needTranslation={needTranslation}
            displayColor={displayColor}
            displayLock={displayLock}
          />
        </div>
        <Pagination
          total={paginateData.total}
          defaultPageSize={50}
          showSizeChanger={false}
          onChange={onPaginationChange}
          pageSizeOptions={['10', '25', '50', '100']}
          onPageSizeChange={(pageSize) => {
            setPaginateData({
              ...paginateData,
              limit: pageSize,
              offset: 0,
              currentPage: 1,
            })
          }}
          pageSize={paginateData.limit}
          current={paginateData.currentPage}
          showingRecords={paginateData.showingRecords}
        />
      </>
    </Formik>
  )
}
export default CrudTable
