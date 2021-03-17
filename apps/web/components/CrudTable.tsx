import {
  Table,
  useLiveQuery,
  Pagination,
  MobileHeader,
  Notification,
  NotificationType,
} from '@pabau/ui'
import React, { FC, useEffect, useState, useRef, useMemo } from 'react'
import { DocumentNode, useMutation } from '@apollo/client'
import AddButton from './AddButton'
import { Breadcrumb } from '@pabau/ui'
import { Typography } from 'antd'
import styles from './CrudTable.module.less'
import CrudModal from './CrudModal'
import { Formik, FormikErrors } from 'formik'
import Layout from './Layout/Layout'
import { LeftOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import { useTranslationI18 } from '../hooks/useTranslationI18'
import { useRouter } from 'next/router'
import { getParentSetupData } from '../mocks/SetupGridData'

const { Title } = Typography
interface P {
  schema: Schema
  addQuery?: DocumentNode
  deleteQuery?: DocumentNode
  listQuery: DocumentNode
  editQuery: DocumentNode
  aggregateQuery?: DocumentNode
  tableSearch?: boolean
  updateOrderQuery?: DocumentNode
  showNotificationBanner?: boolean
  createPage?: boolean
  notificationBanner?: React.ReactNode
  createPageOnClick?(): void
  addFilter?: boolean
  needTranslation?: boolean
  editPage?: boolean
  editPageRouteLink?: string
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
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isActive, setIsActive] = useState<boolean | number>(
    schema?.filter?.primary?.default ?? true
  )
  const [searchTerm, setSearchTerm] = useState('')
  const [isMobileSearch, setMobileSearch] = useState(false)
  const { t } = useTranslationI18()
  const crudTableRef = useRef(null)
  const router = useRouter()

  const [editMutation] = useMutation(editQuery, {
    onCompleted(data) {
      Notification(
        NotificationType.success,
        `Success! ${schema.messages.update.success}`
      )
    },
    onError(err) {
      Notification(
        NotificationType.error,
        `Error! ${schema.messages.update.error}`
      )
    },
    optimisticResponse: {},
  })
  const [updateOrderMutation] = useMutation(updateOrderQuery, {
    onError(err) {
      Notification(
        NotificationType.error,
        `Error! ${schema.messages.update.error}`
      )
    },
    optimisticResponse: {},
  })
  const [addMutation] = useMutation(addQuery, {
    onCompleted(data) {
      Notification(
        NotificationType.success,
        `Success! ${schema.messages.create.success}`
      )
    },
    onError(err) {
      Notification(
        NotificationType.error,
        `Error! ${schema.messages.create.error}`
      )
    },
  })
  const [sourceData, setSourceData] = useState(null)
  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 10,
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

  useEffect(() => {
    if (data) {
      if (schema.full === 'Issuing Company') {
        const newData = data.map((d) => {
          const { country, city, street, post_code } = d
          return {
            ...d,
            address: country + ', ' + city + ', ' + street + ', ' + post_code,
          }
        })
        setSourceData(newData)
      } else {
        setSourceData(data)
      }
    }
    if (aggregateData) {
      setPaginateData({
        ...paginateData,
        total: aggregateData ?? aggregateData?.aggregate.count,
        showingRecords: data?.length,
      })
    }
    if (!loading && data) setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, aggregateData, loading])

  useEffect(() => {
    if (crudTableRef.current) {
      crudTableRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [paginateData.currentPage])

  const onFilterMarketingSource = () => {
    resetPagination()
    setIsActive((e) => {
      switch (typeof e) {
        case 'boolean':
          return !e
        case 'number':
          return e === schema?.filter.primary.active
            ? schema.filter.primary.inactive
            : schema.filter.primary.active
      }
    })
  }

  const onSearch = async (val) => {
    if (val !== searchTerm) {
      resetPagination()
      setSearchTerm(val)
    }
  }

  const onPaginationChange = (currentPage) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({ ...paginateData, offset, currentPage: currentPage })
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

  const onSubmit = async (values, { resetForm }) => {
    await (values.id
      ? editMutation({
          variables: values,
          optimisticResponse: {},
          update: (proxy) => {
            if (listQuery) {
              const existing = proxy.readQuery({
                query: listQuery,
              })
              if (existing) {
                const key = Object.keys(existing)[0]
                proxy.writeQuery({
                  query: listQuery,
                  data: {
                    [key]: [...existing[key], values],
                  },
                })
              }
            }
          },
        })
      : addMutation({
          variables: values,
          optimisticResponse: {},
          update: (proxy) => {
            console.log('OPTIMISIM NOW', !!listQuery)
            if (listQuery) {
              console.log('reading cache', {
                query: listQuery,
                ...getQueryVariables,
              })
              console.log(
                '1',
                proxy.readQuery({
                  query: listQuery,
                })
              )
              console.log(
                '2',
                proxy.readQuery({
                  query: listQuery,
                  ...getQueryVariables,
                })
              )
              console.log(
                '3',
                proxy.readQuery({
                  query: listQuery,
                  ...getQueryVariables,
                  returnPartialData: true,
                })
              )
              const existing = proxy.readQuery({
                query: listQuery,
                ...getQueryVariables,
              })
              if (existing) {
                const key = Object.keys(existing)[0]
                proxy.writeQuery({
                  query: listQuery,
                  ...getQueryVariables,
                  data: {
                    [key]: [...existing[key], values],
                  },
                })
                console.log('mutated cache!', key)
              } else console.warn('No apollo cache was found to mutate!')
            }
          },
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
        return defaultVal || ''
      case 'boolean':
      case 'checkbox':
        return defaultVal || true
      default:
        return defaultVal || ''
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
    if (values.id)
      await updateOrderMutation({
        variables: values,
        optimisticResponse: {},
        update: (proxy) => {
          if (listQuery) {
            const existing = proxy.readQuery({
              query: listQuery,
            })
            if (existing) {
              const key = Object.keys(existing)[0]
              proxy.writeQuery({
                query: listQuery,
                data: {
                  [key]: [...existing[key], values],
                },
              })
            }
          }
        },
      })
  }

  const createNew = () => {
    setModalShowing((e) => !e)
    setEditingRow({ name: '', isCreate: true })
  }

  const handleBack = () => {
    const parentMenu = getParentSetupData(router.pathname)
    if (parentMenu.length > 0) {
      router.push({
        pathname: '/setup',
        query: { menu: parentMenu[0]?.title },
      })
    } else {
      router.push('/setup')
    }
  }

  return (
    <div ref={crudTableRef}>
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
              a[
                c[0]
              ] = `The value for ${c[1].shortLower} at least ${c[1].min} characters.`
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
              a[c[0]] = `The max length of ${c[1].max} characters is reached.`
            } else if (
              e[c[0]] &&
              c[1].type === 'number' &&
              // eslint-disable-next-line
              !/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/.test(
                e[c[0]].toString()
              )
            ) {
              a[c[0]] = `Invalid ${c[1].shortLower}.`
            }
            return a
            // eslint-disable-next-line
          }, {} as FormikErrors<any>)
        }
        onSubmit={(values, { resetForm }) => {
          console.log('formik onsubmit', values)
          onSubmit(values, { resetForm })
        }}
        //initialValues={typeof modalShowing === 'object' ? modalShowing : undefined}
        initialValues={
          editingRow?.id ? editingRow : formikFields() //TODO: remove this, it should come from schema.fields[].*
        }
      >
        <>
          <div
            className={classNames(
              styles.marketingSourcePage,
              styles.desktopViewNone
            )}
          >
            <MobileHeader className={styles.marketingSourceHeader}>
              <div className={styles.allContentAlignMobile}>
                <div className={styles.marketingTextStyle}>
                  <LeftOutlined onClick={handleBack} />
                  {!isMobileSearch && <p>{schema.full || schema.short} </p>}
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
                    mobileSearch={isMobileSearch}
                    setMobileSearch={() => {
                      setMobileSearch((e) => !e)
                    }}
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
                    mobileSearch={isMobileSearch}
                    setMobileSearch={() => {
                      setMobileSearch((e) => !e)
                    }}
                  />
                )}
              </div>
            </MobileHeader>
          </div>

          {modalShowing && (
            <CrudModal
              schema={schema}
              editingRow={editingRow}
              addQuery={addQuery}
              listQuery={listQuery}
              deleteQuery={deleteQuery}
              onClose={() => setModalShowing(false)}
              needTranslation={needTranslation}
            />
          )}

          <Layout>
            {showNotificationBanner && notificationBanner}
            <div
              className={classNames(
                styles.tableMainHeading,
                styles.mobileViewNone
              )}
            >
              <div style={{ background: '#FFF' }}>
                <Breadcrumb
                  breadcrumbItems={[
                    {
                      breadcrumbName: needTranslation
                        ? t(
                            'marketingsource-header-breadcrumb-setup-link.translation'
                          )
                        : 'Setup',
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
                />
              )}
            </div>
            <div className={styles.marketingSourcesTableContainer}>
              <Table
                loading={isLoading}
                style={{ height: '100%' }}
                sticky={{ offsetScroll: 80, offsetHeader: 80 }}
                pagination={sourceData?.length > 10 ? {} : false}
                draggable={true}
                isCustomColorExist={checkCustomColorIconExist('color')}
                isCustomIconExist={checkCustomColorIconExist('icon')}
                noDataBtnText={schema.full}
                noDataText={schema.fullLower}
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
                  })),
                ]}
                // eslint-disable-next-line
                dataSource={sourceData?.map((e: { id: any }) => ({
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
                  console.log('newData, oldIndex, newIndex', {
                    newData,
                    oldIndex,
                    newIndex,
                  })
                }}
                onRowClick={(e) => {
                  if (editPage) {
                    router.push(`${editPageRouteLink}/${e.id}`)
                  } else {
                    setEditingRow(e)
                    setModalShowing((e) => !e)
                  }
                }}
                needTranslation={needTranslation}
              />
            </div>
            <Pagination
              total={paginateData.total}
              defaultPageSize={50}
              showSizeChanger={false}
              onChange={onPaginationChange}
              pageSize={paginateData.limit}
              current={paginateData.currentPage}
              showingRecords={paginateData.showingRecords}
            />
          </Layout>
        </>
      </Formik>
    </div>
  )
}

export default CrudTable
