import React, { FC, useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import Layout from '../../../components/Layout/Layout'
import MobileHeader from '../../../components/MobileHeader'
import useWindowSize from '../../../hooks/useWindowSize'
import AddButton from '../../../components/AddButton'
import {
  CreateDrugsModal,
  CreateDrugDataType,
} from '../../../components/Setup/Drugs/CreateDrugsModal'
import {
  EditDrugsModal,
  EditDrugDataType,
} from '../../../components/Setup/Drugs/EditDrugsModal'
import { LibrariesTab } from '../../../components/Setup/Drugs/LibrariesTab'
import {
  TabMenu,
  Button,
  Table,
  Breadcrumb,
  Pagination,
  useLiveQuery,
  BasicModal as DeleteModal,
  Notification,
  NotificationType,
} from '@pabau/ui'
import { Row, Col } from 'antd'
import {
  ApartmentOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import styles from './index.module.less'

const LIST_QUERY = gql`
  query drugs($limit: Int = 10, $offset: Int = 0, $searchTerm: String!) {
    drugs(
      limit: $limit
      offset: $offset
      order_by: { created_date: desc }
      where: {
        _or: [
          { _and: [{ name: { _ilike: $searchTerm } }] }
          { _and: [{ route: { _ilike: $searchTerm } }] }
          { _and: [{ unit: { _ilike: $searchTerm } }] }
          { _and: [{ frequency: { _ilike: $searchTerm } }] }
          { _and: [{ dosage: { _ilike: $searchTerm } }] }
        ]
      }
    ) {
      comment
      created_date
      dosage
      frequency
      id
      name
      route
      unit
      is_active
    }
  }
`

const LIST_AGGREGATE_QUERY = gql`
  query drugs_aggregate($searchTerm: String!) {
    drugs_aggregate(
      where: {
        _or: [
          { _and: [{ name: { _ilike: $searchTerm } }] }
          { _and: [{ route: { _ilike: $searchTerm } }] }
          { _and: [{ unit: { _ilike: $searchTerm } }] }
          { _and: [{ frequency: { _ilike: $searchTerm } }] }
          { _and: [{ dosage: { _ilike: $searchTerm } }] }
        ]
      }
    ) {
      aggregate {
        count
      }
    }
  }
`

const ADD_MUTATION = gql`
  mutation insert_drugs(
    $is_active: Boolean = false
    $name: String
    $route: String
    $frequency: String
    $unit: String
    $dosage: String
    $comment: String
  ) {
    insert_drugs_one(
      object: {
        comment: $comment
        dosage: $dosage
        frequency: $frequency
        is_active: $is_active
        name: $name
        route: $route
        unit: $unit
      }
    ) {
      __typename
      id
    }
  }
`

const EDIT_MUTATION = gql`
  mutation update_drugs_by_pk(
    $id: uuid!
    $is_active: Boolean
    $name: String
    $route: String
    $unit: String
    $frequency: String
    $dosage: String
    $comment: String
  ) {
    update_drugs_by_pk(
      pk_columns: { id: $id }
      _set: {
        is_active: $is_active
        name: $name
        route: $route
        unit: $unit
        frequency: $frequency
        dosage: $dosage
        comment: $comment
      }
    ) {
      __typename
      id
    }
  }
`

const DELETE_MUTATION = gql`
  mutation delete_drugs_by_pk($id: uuid!) {
    delete_drugs_by_pk(id: $id) {
      __typename
      id
    }
  }
`
export interface P {
  tableName?: string
}

export const Index: FC<P> = ({ ...props }) => {
  const { t } = useTranslationI18()
  const size = useWindowSize()
  const [mobileSearch, setMobileSearch] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [paginationState, setPaginationState] = useState(true)
  const [showCreateBtn, setShowCreateBtn] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [dataSource, setDataSource] = useState(null)

  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 10,
    currentPage: 1,
    showingRecords: 0,
  })

  const [createDrugModal, toggleCreateDrugModal] = useState(false)
  const [editDrugModal, setEditModal] = useState(false)
  const [editingRow, setEditingRow] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deletingRow, setDeletingRow] = useState(null)

  const columns = [
    {
      title: t('setup.drugs.table.header.name'),
      dataIndex: 'name',
      className: 'leftPadding',
      width: '30%',
      visible: true,
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: t('setup.drugs.table.header.units'),
      dataIndex: 'unit',
      visible: true,
      width: '10%',
      sorter: (a, b) => a.unit.length - b.unit.length,
    },
    {
      title: t('setup.drugs.table.header.frequency'),
      dataIndex: 'frequency',
      visible: true,
      width: '10%',
      filters: [
        {
          text: t('setup.drugs.table.header.frequency.filter.day'),
          value: '1 per day',
        },
        {
          text: t('setup.drugs.table.header.frequency.filter.hour'),
          value: '6-8 hour',
        },
      ],
      onFilter: (value, record) => record.frequency.indexOf(value) === 0,
      sorter: (a, b) => a.frequency.length - b.frequency.length,
    },
    {
      title: t('setup.drugs.table.header.route'),
      dataIndex: 'route',
      visible: true,
      width: '10%',
      sorter: (a, b) => a.route.length - b.route.length,
    },
    {
      title: t('setup.drugs.table.header.comment'),
      dataIndex: 'comment',
      visible: true,
      width: '20%',
      sorter: (a, b) => a.comment.length - b.comment.length,
    },
    {
      title: t('setup.drugs.table.header.status'),
      dataIndex: 'is_active',
      visible: true,
      width: '5%',
    },
    {
      title: '',
      visible: true,
      className: 'edit-btn',
      width: '10%',
      render: function renderTableSource(val, rowData) {
        return (
          <div>
            <Button
              type="default"
              size="middle"
              onClick={() => {
                setEditingRow(rowData)
                setEditModal(true)
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              type="default"
              size="middle"
              onClick={() => {
                setDeletingRow(rowData)
                setDeleteModal(true)
              }}
            >
              <DeleteOutlined />
            </Button>
          </div>
        )
      },
    },
  ]

  const tabItems = [t('setup.drugs.tab.drugs'), t('setup.drugs.tab.library')]

  const DrugsHeader = () => (
    <div className={styles.header}>
      <div className="leftDiv">
        <div>
          <Breadcrumb
            items={[
              { breadcrumbName: t('sidebar.setup'), path: 'setup' },
              { breadcrumbName: t('setup.drugs.title'), path: 'drugs' },
            ]}
          />
        </div>
        <h3 className={styles.drugsHeading}>{t('setup.drugs.title')}</h3>
      </div>
      <AddButton
        onFilterSource={() => false}
        addFilter={false}
        schema={{
          createButtonLabel: t('setup.drugs.create.text'),
          searchPlaceholder: t('setup.drugs.search.placeholder'),
        }}
        isCreateButtonVisible={showCreateBtn}
        onClick={() => toggleCreateDrugModal(() => !createDrugModal)}
        tableSearch
        onSearch={(text) => setSearchTerm(text)}
        needTranslation
      />
    </div>
  )

  const onTabChange = (item: string | number) => {
    switch (item) {
      case tabItems[0]:
        setShowCreateBtn(true)
        setPaginationState(true)
        break
      case tabItems[1]:
        setShowCreateBtn(false)
        setPaginationState(false)
        break
      default:
        return
    }
  }

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

  const { data, loading } = useLiveQuery(LIST_QUERY, getQueryVariables())
  const { data: aggregateData } = useLiveQuery(
    LIST_AGGREGATE_QUERY,
    getAggregateQueryVariables()
  )

  const [addMutation] = useMutation(ADD_MUTATION, {
    onCompleted() {
      toggleCreateDrugModal((createDrugModal) => !createDrugModal)
      Notification(
        NotificationType.success,
        t('setup.drugs.notification.create.success')
      )
    },
    onError(err) {
      console.log(err)
      Notification(
        NotificationType.error,
        t('setup.drugs.notification.create.error')
      )
    },
  })

  const [editMutation] = useMutation(EDIT_MUTATION, {
    onCompleted() {
      setEditModal(false)
      Notification(
        NotificationType.success,
        t('setup.drugs.notification.edit.success')
      )
    },
    onError() {
      Notification(
        NotificationType.error,
        t('setup.drugs.notification.edit.error')
      )
    },
  })

  const [deleteMutation] = useMutation(DELETE_MUTATION, {
    onCompleted() {
      Notification(
        NotificationType.success,
        t('setup.drugs.notification.delete.success')
      )
    },
    onError() {
      Notification(
        NotificationType.error,
        t('setup.drugs.notification.delete.error')
      )
    },
  })

  useEffect(() => {
    setIsLoading(loading)
    if (data) {
      setDataSource(data)
    }
    if (aggregateData)
      setPaginateData({
        ...paginateData,
        total: aggregateData?.aggregate.count,
        showingRecords: data?.length,
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, aggregateData, loading])

  const onPaginationChange = (currentPage) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({ ...paginateData, offset, currentPage: currentPage })
  }

  const submitCreateDrug = (data: CreateDrugDataType) => {
    addMutation({
      variables: data,
      optimisticResponse: {},
    })
  }

  const submitUpdateDrug = (data: EditDrugDataType) => {
    editMutation({
      variables: data,
      optimisticResponse: {},
    })
  }

  return (
    <Layout>
      <MobileHeader parent="/setup" title={t('setup.drugs.title')}>
        <AddButton
          onFilterSource={() => false}
          onSearch={(text) => setSearchTerm(text)}
          schema={{
            createButtonLabel: t('setup.drugs.create.text'),
            searchPlaceholder: t('setup.drugs.search.placeholder'),
          }}
          tableSearch={true}
          onClick={() => toggleCreateDrugModal(() => !createDrugModal)}
          needTranslation={false}
          mobileSearch={mobileSearch}
          setMobileSearch={() => setMobileSearch(() => !mobileSearch)}
          isCreateButtonVisible={showCreateBtn}
          addFilter={false}
        />
      </MobileHeader>
      <div className={styles.setupDragsContainer}>
        <div className={styles.drugsListingMain}>
          {size.width > 767 && <DrugsHeader />}
          <div className={styles.body}>
            <TabMenu
              tabPosition="top"
              menuItems={tabItems}
              onChange={(key) => onTabChange(tabItems[key])}
              minHeight="1px"
            >
              <div className={styles.drugsListing}>
                <Table
                  loading={isLoading}
                  columns={columns}
                  searchTerm={searchTerm}
                  noDataText={t('setup.drugs.title')}
                  noDataIcon={<ApartmentOutlined />}
                  noDataBtnText={t('setup.drugs.title')}
                  onAddTemplate={() =>
                    toggleCreateDrugModal((createDrugModal) => !createDrugModal)
                  }
                  scroll={{ x: 'max-content' }}
                  dataSource={dataSource?.map((e: { id }) => ({
                    key: e.id,
                    ...e,
                  }))}
                />
              </div>
              <div className={styles.library}>
                <LibrariesTab />
              </div>
            </TabMenu>
          </div>

          {paginationState && (
            <div className={styles.paginationDiv}>
              <Pagination
                total={paginateData.total}
                defaultPageSize={50}
                showSizeChanger={false}
                onPageSizeChange={(limit) => {
                  setPaginateData({
                    ...paginateData,
                    limit: limit,
                  })
                }}
                onChange={onPaginationChange}
                pageSize={paginateData.limit}
                current={paginateData.currentPage}
                showingRecords={paginateData.showingRecords}
              />
            </div>
          )}

          <Row>
            <Col md={24}>
              <CreateDrugsModal
                visible={createDrugModal}
                onCreate={(data: CreateDrugDataType) => {
                  submitCreateDrug(data)
                }}
                onClose={() =>
                  toggleCreateDrugModal((createDrugModal) => !createDrugModal)
                }
              />
              <EditDrugsModal
                visible={editDrugModal}
                editDrugData={editingRow}
                onUpdate={(data: EditDrugDataType) => {
                  submitUpdateDrug(data)
                }}
                onClose={() => setEditModal((editDrugModal) => !editDrugModal)}
              />
            </Col>
          </Row>

          <DeleteModal
            modalWidth={682}
            centered={true}
            onCancel={() => {
              setDeletingRow(null)
              setDeleteModal(false)
            }}
            onOk={async () => {
              const { id } = deletingRow as { id }
              await deleteMutation({
                variables: { id },
              })
              setDeletingRow(null)
              setDeleteModal(false)
            }}
            visible={deleteModal}
            title={t('setup.drugs.modal.delete.title')}
            newButtonText={t('setup.drugs.modal.delete.button')}
            isValidate={true}
          >
            <span
              style={{
                fontFamily: 'Circular-Std-Book',
                fontWeight: 'normal',
                fontSize: '16px',
                lineHeight: '20px',
                color: '#9292A3',
              }}
            >
              {t('setup.drugs.modal.delete.message', {
                what: deletingRow?.name,
              })}
            </span>
          </DeleteModal>
        </div>
      </div>
    </Layout>
  )
}

export default Index
