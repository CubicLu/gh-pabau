import { ShopOutlined } from '@ant-design/icons'
import { gql, useMutation } from '@apollo/client'
import {
  Notification,
  NotificationType,
  Pagination,
  Table,
  useLiveQuery,
} from '@pabau/ui'
import React, { FC, useEffect, useState } from 'react'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import styles from './ProductListComponents.module.less'
import { updateTable } from './ProductListUtils'

interface CategoryListProps {
  showGroup?: boolean
}

const LIST_QUERY = gql`
  query category($isActive: Boolean = true, $offset: Int, $limit: Int) {
    category(
      offset: $offset
      limit: $limit
      order_by: { created_at: desc }
      where: { is_active: { _eq: $isActive } }
    ) {
      id
      name
      order
      productsAssigned
      is_active
      groupName
    }
  }
`

const LIST_AGGREGATE = gql`
  query category_aggregate {
    category_aggregate {
      aggregate {
        count
      }
    }
  }
`

const UPDATE_ORDER_MUTATION = gql`
  mutation update_category($id: uuid!, $order: Int) {
    update_category(where: { id: { _eq: $id } }, _set: { order: $order }) {
      affected_rows
    }
  }
`

const CategoryList: FC<CategoryListProps> = ({ showGroup }) => {
  const { t } = useTranslationI18()
  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 10,
    currentPage: 1,
    showingRecords: 0,
  })

  const { data, loading } = useLiveQuery(LIST_QUERY, {
    variables: {
      offset: paginateData.offset,
      limit: paginateData.limit,
    },
  })

  const { data: aggregateData } = useLiveQuery(LIST_AGGREGATE)

  const [updateOrderMutation] = useMutation(UPDATE_ORDER_MUTATION, {
    onError(err) {
      console.log(err)
      Notification(
        NotificationType.error,
        t('products.list.category.notification.updateorder.error')
      )
    },
  })

  useEffect(() => {
    if (aggregateData) {
      setPaginateData((d) => ({
        ...d,
        total: aggregateData?.aggregate.count,
        showingRecords: data?.length,
      }))
    }
  }, [data, aggregateData])

  const updateOrder = async (values) => {
    await updateOrderMutation({
      variables: values,
      optimisticResponse: {},
      update: (proxy) => {
        if (LIST_QUERY) {
          const existing = proxy.readQuery({ query: LIST_QUERY })
          updateTable(proxy, existing, LIST_QUERY, values)
        }
      },
    })
  }

  const onPaginationChange = (currentPage) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({ ...paginateData, offset, currentPage: currentPage })
  }

  const onRowClick = (values) => {
    console.log(values)
  }

  const CategoryColumns = [
    {
      title: t('products.list.category.column.status'),
      dataIndex: 'is_active',
      className: 'drag-visible',
      visible: true,
      width: '120px',
    },
    {
      title: '',
      dataIndex: 'test',
      className: 'drag-visible',
      visible: true,
      // eslint-disable-next-line react/display-name
      render: () => <ShopOutlined style={{ color: '#B8B8C0', fontSize: 16 }} />,
      width: '64px',
    },
    {
      title: t('products.list.category.column.name.group'),
      dataIndex: 'groupName',
      className: 'drag-visible',
      visible: showGroup,
    },
    {
      title: t('products.list.category.column.name'),
      dataIndex: 'name',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('products.list.category.column.products'),
      dataIndex: 'productsAssigned',
      className: 'drag-visible',
      visible: true,
    },
  ]

  return (
    <div className={styles.productListTab}>
      <Table
        draggable
        loading={loading}
        noDataText={t('products.list.category.table.nodata')}
        noDataBtnText={t('products.list.category.table.new')}
        columns={CategoryColumns}
        scroll={{ x: 'max-content' }}
        dataSource={data?.map((d) => ({ ...d, key: d.id }))}
        onRowClick={onRowClick}
        updateDataSource={({ newData, oldIndex, newIndex }) => {
          newData = newData.map((d, i) => {
            d.order = data[i].order
            return d
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
        }}
      />
      <div className={styles.pagination}>
        <Pagination
          total={paginateData.total}
          defaultPageSize={10}
          showSizeChanger={false}
          onChange={onPaginationChange}
          pageSize={paginateData.limit}
          current={paginateData.currentPage}
          showingRecords={paginateData.showingRecords}
        />
      </div>
    </div>
  )
}

export default CategoryList
