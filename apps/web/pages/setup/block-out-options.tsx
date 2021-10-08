import React, { useState, useEffect } from 'react'
import {
  Breadcrumb,
  Notification,
  NotificationType,
  Table,
  useLiveQuery,
  Pagination,
} from '@pabau/ui'
import { Card, Col, Row, Typography } from 'antd'
import { gql, useMutation } from '@apollo/client'
import { useMedia } from 'react-use'
import CommonHeader from '../../components/CommonHeader'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import Layout from '../../components/Layout/Layout'
import AddButton from '../../components/AddButton'
import NewBlockTypeModal from '../../components/Setup/BlockOutOptions/NewBlockTypeModal'
import styles from './block-out-options.module.less'

/* eslint-disable-next-line */
export interface BlockOutOptionsProps {}

const LIST_QUERY = gql`
  query block_out_options(
    $offset: Int
    $limit: Int
    $isActive: Boolean = true
  ) {
    block_out_options(
      offset: $offset
      limit: $limit
      order_by: { created_at: desc }
      where: { is_active: { _eq: $isActive } }
    ) {
      id
      name
      paidBlockOut
      is_active
      type
      backgroundColor
      defaultTime
    }
  }
`

const ADD_MUTATION = gql`
  mutation insert_block_out_options_one(
    $name: String
    $type: String
    $paidBlockOut: Boolean = false
    $backgroundColor: String
    $defaultTime: Int
    $isActive: Boolean
  ) {
    insert_block_out_options_one(
      object: {
        name: $name
        type: $type
        paidBlockOut: $paidBlockOut
        backgroundColor: $backgroundColor
        defaultTime: $defaultTime
        is_active: $isActive
      }
    ) {
      id
      name
      paidBlockOut
      backgroundColor
      defaultTime
    }
  }
`

const EDIT_MUTATION = gql`
  mutation update_job_title_by_pk(
    $id: uuid!
    $name: String
    $type: String
    $paidBlockOut: Boolean = false
    $backgroundColor: String
    $defaultTime: Int
    $isActive: Boolean
  ) {
    update_block_out_options_by_pk(
      pk_columns: { id: $id }
      _set: {
        name: $name
        type: $type
        paidBlockOut: $paidBlockOut
        backgroundColor: $backgroundColor
        defaultTime: $defaultTime
        is_active: $isActive
      }
    ) {
      id
    }
  }
`

const DELETE_MUTATION = gql`
  mutation delete_block_out_options_by_pk($id: uuid!) {
    delete_block_out_options_by_pk(id: $id) {
      id
    }
  }
`

const LIST_AGGREGATE_QUERY = gql`
  query block_out_options_aggregate {
    block_out_options_aggregate {
      aggregate {
        count
      }
    }
  }
`

export function BlockOutOptions(props: BlockOutOptionsProps) {
  const { t } = useTranslationI18()
  const isMobile = useMedia('(max-width: 767px)', false)
  const { Title } = Typography

  const columns = [
    {
      title: t('setup.blockout.table.header.name'),
      dataIndex: 'name',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('setup.blockout.table.header.type'),
      dataIndex: 'type',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('setup.blockout.table.header.status'),
      dataIndex: 'is_active',
      className: 'drag-visible',
      visible: true,
      width: '160px',
    },
  ]

  const [isActive, setIsActive] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [edit, setEdit] = useState(null)
  const [paginateData, setPaginateData] = useState({
    currentPage: 0,
    total: 0,
    offset: 0,
    limit: 10,
    showingRecords: 0,
  })

  const { data, loading } = useLiveQuery(LIST_QUERY, {
    variables: {
      offset: paginateData.offset,
      limit: paginateData.limit,
      isActive,
    },
  })

  const { data: aggregateData } = useLiveQuery(LIST_AGGREGATE_QUERY)

  const [addMutation] = useMutation(ADD_MUTATION, {
    onCompleted() {
      Notification(
        NotificationType.success,
        t('setup.blockout.notification.create.success')
      )
    },
    onError() {
      Notification(
        NotificationType.error,
        t('setup.blockout.notification.create.error')
      )
    },
  })

  const [editMutation] = useMutation(EDIT_MUTATION, {
    onCompleted() {
      Notification(
        NotificationType.success,
        t('setup.blockout.notification.edit.success')
      )
    },
    onError() {
      Notification(
        NotificationType.error,
        t('setup.blockout.notification.edit.error')
      )
    },
  })

  const [deleteMutation] = useMutation(DELETE_MUTATION, {
    onCompleted() {
      Notification(
        NotificationType.success,
        t('setup.blockout.notification.delete.success')
      )
    },
    onError() {
      Notification(
        NotificationType.error,
        t('setup.blockout.notification.delete.error')
      )
    },
  })

  useEffect(() => {
    if (aggregateData) {
      setPaginateData((paginateData) => ({
        ...paginateData,
        total: aggregateData.aggregate?.count,
        showingRecords: data?.length,
      }))
    }
  }, [data, aggregateData])

  const onRowClick = (data) => {
    setEdit(data)
    setShowModal(true)
  }

  const onPaginationChange = (currentPage) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData((d) => ({ ...d, offset, currentPage }))
  }

  const createClick = () => {
    setShowModal(true)
    setEdit(null)
  }

  const onSave = async (values) => {
    setShowModal(false)
    setEdit(null)
    await (edit
      ? editMutation({
          variables: { ...edit, ...values },
          optimisticResponse: {},
          update: (proxy) => {
            const existing = proxy.readQuery({
              query: LIST_QUERY,
            })
            if (existing) {
              const key = Object.keys(existing)[0]
              proxy.writeQuery({
                query: LIST_QUERY,
                data: {
                  [key]: [...existing[key], values],
                },
              })
            }
          },
        })
      : addMutation({
          variables: values,
          optimisticResponse: {},
          update: (proxy) => {
            const existing = proxy.readQuery({
              query: LIST_QUERY,
            })
            if (existing) {
              const key = Object.keys(existing)[0]
              proxy.writeQuery({
                query: LIST_QUERY,
                data: {
                  [key]: [...existing[key], values],
                },
              })
            }
          },
        }))
  }

  const onDelete = async () => {
    await deleteMutation({
      variables: { id: edit?.id },
      optimisticResponse: {},
      update: (cache) => {
        const existing = cache.readQuery({
          query: LIST_QUERY,
        })
        if (existing) {
          // eslint-disable-next-line @typescript-eslint/ban-types
          const key = Object.keys(existing as object)[0]
          cache.writeQuery({
            query: LIST_QUERY,
            data: {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              [key]: (existing[key] as Record<string, never>).filter(
                (e) => e.id !== edit?.id
              ),
            },
          })
        }
      },
    })
    setShowModal(false)
    setEdit(null)
  }

  const resetPagination = () => {
    setPaginateData({
      total: 0,
      offset: 0,
      limit: 10,
      currentPage: 1,
      showingRecords: 0,
    })
  }

  const onFilter = () => {
    resetPagination()
    setIsActive((e) => !e)
  }

  return (
    <Layout>
      <CommonHeader
        title={t('setup.blockout.title')}
        isLeftOutlined
        reversePath="/setup"
      >
        <AddButton
          addFilter
          onFilterSource={onFilter}
          onClick={createClick}
          schema={{
            createButtonLabel: t('setup.blockout.create.text'),
          }}
          tableSearch={false}
          needTranslation={false}
        />
      </CommonHeader>
      <div className={styles.setupBlockOutOptionsContainer}>
        <Card bodyStyle={{ padding: 0 }}>
          {!isMobile && (
            <Row className={styles.headerContainer}>
              <Col>
                <Breadcrumb
                  items={[
                    { breadcrumbName: t('sidebar.setup'), path: 'setup' },
                    { breadcrumbName: t('setup.blockout.title'), path: '' },
                  ]}
                />
                <Title>{t('setup.blockout.title')}</Title>
              </Col>
              <Col>
                <AddButton
                  addFilter
                  onFilterSource={onFilter}
                  onClick={createClick}
                  schema={{
                    createButtonLabel: t('setup.blockout.create.text'),
                  }}
                  tableSearch={false}
                  needTranslation={false}
                />
              </Col>
            </Row>
          )}
          <Table
            columns={columns}
            dataSource={data?.map((d) => ({ ...d, key: d.id }))}
            onRowClick={onRowClick}
            loading={loading}
            noDataText={t('setup.blockout.blocktype.text')}
            noDataBtnText={t('setup.blockout.blocktype.text')}
            onAddTemplate={createClick}
            rowKey="id"
          />
        </Card>
        <Pagination
          showingRecords={paginateData.showingRecords}
          defaultCurrent={1}
          total={paginateData.total}
          pageSize={paginateData.limit}
          current={paginateData.currentPage}
          onChange={onPaginationChange}
        />
        {showModal && (
          <NewBlockTypeModal
            visible={showModal}
            onCancel={() => setShowModal(false)}
            isEdit={!!edit}
            editData={edit}
            onSave={onSave}
            onDelete={onDelete}
          />
        )}
      </div>
    </Layout>
  )
}

export default BlockOutOptions
