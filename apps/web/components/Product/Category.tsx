import type { Tax } from '@pabau/graphql'
import {
  CategoryListDocument,
  useCategoryListQuery,
  useCreateOneInvCategoryMutation,
  useUpdateOneInvCategoryMutation,
  useDeleteOneInvCategoryMutation,
} from '@pabau/graphql'
import { Notification, NotificationType, Pagination, Table } from '@pabau/ui'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { CreateCategory } from './CreateCategory'
import styles from './ProductListComponents.module.less'
import { filter } from './utility'
import { cdnURL } from '../../baseUrl'
import { Avatar } from 'antd'
import { ShopOutlined } from '@ant-design/icons'
interface P {
  showGroup?: boolean
  search: string
  filterByStatus: number
  modalDataLoading: boolean
  action: 'Edit' | 'Create'
  visible: boolean
  taxes: Pick<Tax, 'id' | 'name' | 'rate'>[]
  changeModalState: (state: boolean) => void
  isEditing: () => void
}

const CategoryList = ({
  showGroup,
  search = '',
  visible,
  action,
  isEditing,
  filterByStatus,
  changeModalState,
  modalDataLoading,
  taxes,
}: P): JSX.Element => {
  const { t } = useTranslationI18()
  const defaultPaginateData = {
    total: 0,
    offset: 0,
    limit: 50,
    currentPage: 1,
    showingRecords: 0,
  }
  const [paginateData, setPaginateData] = useState(defaultPaginateData)
  const [sourceData, setSourceData] = useState(null)
  const [record, setRecord] = useState(null)
  const getQueryVariables = useMemo(() => {
    return {
      searchTerm: '%' + search + '%',
      offset: paginateData.offset,
      limit: paginateData.limit,
      disabled: filter(filterByStatus),
    }
  }, [search, paginateData.offset, paginateData.limit, filterByStatus])
  const [deleteCategory] = useDeleteOneInvCategoryMutation({
    onCompleted(group) {
      changeModalState(false)
      Notification(
        NotificationType.success,
        t('products.list.category.notification.delete.success', {
          name: group?.deleteOneInvCategory?.name,
        })
      )
    },
    onError() {
      Notification(
        NotificationType.error,
        t('products.list.category.notification.delete.error')
      )
    },
    refetchQueries: [
      {
        query: CategoryListDocument,
        variables: { ...getQueryVariables },
      },
    ],
  })
  const [addMutation] = useCreateOneInvCategoryMutation({
    onCompleted(category) {
      Notification(
        NotificationType.success,
        t('products.list.products.notification.product.create.success', {
          name: category?.createOneInvCategory?.name,
        })
      )
      changeModalState(false)
    },
    onError() {
      Notification(
        NotificationType.error,
        t('products.list.category.create.error')
      )
    },
    refetchQueries: [
      {
        query: CategoryListDocument,
        variables: { ...getQueryVariables },
      },
    ],
  })

  const { data, loading } = useCategoryListQuery({
    variables: {
      ...getQueryVariables,
    },
  })

  useEffect(() => {
    if (data) {
      setSourceData(data?.findManyInvCategory)
    }
  }, [data])

  const [updateMutation] = useUpdateOneInvCategoryMutation({
    onCompleted(category) {
      Notification(
        NotificationType.success,
        t('products.list.products.notification.product.update.success', {
          name: category?.updateOneInvCategory?.name,
        })
      )
      changeModalState(false)
    },
    onError() {
      Notification(
        NotificationType.error,
        t('products.list.category.notification.updateorder.error')
      )
    },
  })

  const [updateOrderMutation] = useUpdateOneInvCategoryMutation({
    fetchPolicy: 'no-cache',
  })

  const updateOrder = (values: { id: number; order: number }) => {
    updateOrderMutation({
      variables: {
        data: {
          order: {
            set: !values?.order ? 1 : values?.order,
          },
        },
        where: {
          id: values?.id,
        },
      },
    })
  }

  useEffect(() => {
    if (data?.findManyInvCategoryCount) {
      setPaginateData((d) => ({
        ...d,
        total: data?.findManyInvCategoryCount,
        showingRecords: data?.findManyInvCategory?.length,
      }))
    }
  }, [data, search])

  const onPaginationChange = (currentPage: number) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({ ...paginateData, offset, currentPage: currentPage })
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
      dataIndex: 'image',
      className: 'drag-visible',
      visible: true,
      width: '64px',
      render: (imageKey, { image }) =>
        cdnURL && image ? (
          <Avatar src={cdnURL + '/' + image} key={imageKey} />
        ) : (
          <ShopOutlined style={{ color: '#B8B8C0', fontSize: 16 }} />
        ),
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
    <div>
      <Table
        draggable
        loading={loading}
        noDataText={t('products.list.category.table.nodata')}
        noDataBtnText={t('products.list.category.table.new')}
        columns={CategoryColumns}
        searchTerm={search}
        scroll={{ x: 'max-content' }}
        dataSource={sourceData?.map(
          (d: {
            disabled: boolean
            _count: { InvProduct: number }
            order: number
            id: number
            image: string
          }) => {
            return {
              ...d,
              is_active: !d.disabled,
              productsAssigned: d?._count?.InvProduct,
              order: d?.order,
              key: d.id,
              image: d?.image,
            }
          }
        )}
        onRowClick={(values) => {
          isEditing()
          changeModalState(true)
          setRecord(values)
        }}
        updateDataSource={({ newData, oldIndex, newIndex }) => {
          setSourceData(
            (newData = newData.map((data: { order: number }, i: number) => {
              data.order =
                sourceData[i]?.order === sourceData[i + 1]?.order
                  ? sourceData[i].order + 1
                  : !sourceData[i].order
                  ? 1
                  : sourceData[i].order
              return data
            }))
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
      />
      <div className={styles.pagination}>
        <Pagination
          total={paginateData.total}
          showSizeChanger={false}
          onChange={onPaginationChange}
          pageSize={paginateData.limit}
          current={paginateData.currentPage}
          showingRecords={paginateData.showingRecords}
          pageSizeOptions={['10', '25', '50', '100']}
          onPageSizeChange={(pageSize) => {
            setPaginateData({
              ...paginateData,
              limit: pageSize,
            })
          }}
        />
      </div>
      {visible && (
        <CreateCategory
          loading={modalDataLoading}
          visible={visible}
          action={action}
          taxes={taxes}
          category={record}
          onDelete={async (id: number) => {
            return !!(await deleteCategory({
              variables: {
                where: {
                  id: id,
                },
              },
            }))
          }}
          onClose={() => {
            changeModalState(false)
            setRecord(null)
          }}
          onCreate={async (category) => {
            const categoryData = {
              code: category?.code,
              disabled: !category.disabled,
              PriceListGroup_id: 0,
              technical: 0,
              custom_id: 0,
              imported: 0,
              order: data?.findManyInvCategory?.[0]?.order + 1,
              name: category?.name,
              image: category?.image,
              category_type: category?.category_type?.toLowerCase(),
              Company: {},
              User: {},
              Tax: {
                connect: {
                  id: category?.tax_id,
                },
              },
            }
            if (!category?.tax_id) {
              delete categoryData?.Tax
            }
            return !!(await addMutation({
              variables: {
                data: {
                  ...categoryData,
                },
              },
            }))
          }}
          onUpdate={async (category) => {
            const categoryData = {
              Company: {},
              User: {},
              Tax: {
                connect: {
                  id: category?.tax_id,
                },
              },
              disabled: {
                set: !category.disabled,
              },
              name: {
                set: category?.name,
              },
              image: {
                set: category?.image,
              },
              code: {
                set: category?.code,
              },
              category_type: {
                set: category?.category_type,
              },
            }
            if (!category?.tax_id) {
              delete categoryData?.Tax
            }
            return !!(await updateMutation({
              variables: {
                data: {
                  ...categoryData,
                },
                where: {
                  id: category.id,
                },
              },
            }))
          }}
        />
      )}
    </div>
  )
}

export default CategoryList
