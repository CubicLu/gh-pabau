import {
  CaretDownFilled,
  EditOutlined,
  PlusCircleFilled,
  ShopOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import type {
  CreateProductModalInitQuery,
  ServicesMasterCategory,
  InvCategory,
  ServicesMasterCategoryCreateInput,
} from '@pabau/graphql'
import {
  RetrieveAllInvProductsDocument,
  RetrieveProductsGroupByMasterCategoryDocument,
  Services_Master_Category_Type,
  useCreateOneInvProductMutation,
  useCreateOneServicesMasterCategoryMutation,
  useRetrieveAllInvProductsQuery,
  useRetrieveProductsGroupByMasterCategoryQuery,
  useUpdateOneInvProductMutation,
  useUpdateOneServicesMasterCategoryMutation,
  useProductCustomFieldValuesLazyQuery,
  useDeleteOneServicesMasterCategoryMutation,
  useLocationsAndProductQuantityQuery,
  useDeleteOneInvProductMutation,
} from '@pabau/graphql'
import type { Product } from './CreateProduct/CreateProduct'
import {
  ButtonLabel,
  Notification,
  NotificationType,
  Pagination,
  Table,
  TabMenu,
  ConfirmationDialog,
} from '@pabau/ui'
import { Dropdown, Menu, Spin } from 'antd'
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { useWindowSize } from 'react-use'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import CreateProduct from './CreateProduct/CreateProduct'
import CreateProductGroup from './CreateProductGroup'
import styles from './ProductListComponents.module.less'
import { uniqueConstraintErrorDecoder } from '../../helper/error-decoder/unique-constraint-error'

interface P {
  search?: string
  modal: CreateProductModalInitQuery
  visible: boolean
  filterByStatus?: number
  filterByCategoryType: string
  fetchingInitialData: boolean
  action: 'Edit' | 'Create'
  changeModalState: (state: boolean) => void
  isEditing: () => void
}

export const Products = ({
  search = '',
  changeModalState,
  visible,
  modal,
  action,
  isEditing,
  fetchingInitialData,
  filterByCategoryType,
  filterByStatus,
}: P): JSX.Element => {
  const { t } = useTranslationI18()
  const [isMobile, setIsMobile] = useState(false)
  const { width } = useWindowSize()
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)
  const [submitting, changeSubmittingStatus] = useState(false)
  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 50,
    currentPage: 1,
    showingRecords: 0,
  })
  const ProductsColumns = [
    {
      title: t('products.list.products.column.status'),
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
      render: () => <ShopOutlined style={{ color: '#B8B8C0', fontSize: 16 }} />,
      width: '64px',
    },
    {
      title: t('products.list.products.column.name'),
      dataIndex: 'name',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('products.list.products.column.category'),
      dataIndex: 'category',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('products.list.products.column.cost'),
      dataIndex: 'cost',
      className: 'drag-visible',
      visible: true,
      render: (_, { cost }) => {
        return cost ? <span>{Number(cost).toFixed(2)}</span> : 0
      },
    },
    {
      title: t('products.list.products.column.retail'),
      dataIndex: 'retail',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('products.list.products.column.quantity'),
      dataIndex: 'quantity',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: '',
      dataIndex: 'status',
      className: 'drag-visible',
      visible: true,
      render: (_, { status }) => (
        <ButtonLabel
          text={status}
          style={{ width: 90 }}
          type={
            status === 'Good'
              ? 'success'
              : status === 'Low'
              ? 'warning'
              : 'danger'
          }
        />
      ),
    },
  ]
  const [record, setRecord] = useState<Product>(null)
  const [sourceData, setSourceData] = useState(null)
  const [groups, setGroups] = useState([])
  const newGroup = {
    id: 0,
    name: '',
    image: '',
    InvCategory: [
      {
        id: 0,
        name: '',
      },
    ],
  }
  const [showGroupModal, setShowGroupModal] = useState(false)
  const [currentGroup, setCurrentGroup] = useState(newGroup)
  const [formikInitialValues, setFormikInitialValues] = useState(newGroup)
  const { data: locationStockData } = useLocationsAndProductQuantityQuery({
    variables: {
      product: record?.id,
    },
  })
  const [selectedCategory, setSelectedCategory] = useState<
    Partial<InvCategory>
  >()
  const [
    loadDefaultProductCustomFields,
    { data: defaultProductCustomFields },
  ] = useProductCustomFieldValuesLazyQuery()
  const [currentTab, setCurrentTab] = useState<number>(null)
  const [groupModalType, setGroupModalType] = useState('')
  const getQueryVariables = useMemo(() => {
    const queryOptions = {
      active: filterByStatus,
      search: search,
      group: Number(currentGroup?.id),
      category: Number(selectedCategory?.id),
      offset: paginateData.offset,
      limit: paginateData.limit,
      category_type: filterByCategoryType,
    }
    if (!currentGroup?.id || currentGroup?.id === 0) {
      delete queryOptions.group
    }
    if (!selectedCategory?.id) {
      delete queryOptions.category
    }
    if (!search) {
      delete queryOptions.search
    }
    if (!filterByCategoryType) {
      delete queryOptions.category_type
    }
    if (currentTab === 2) {
      queryOptions.group = 0
    }
    return queryOptions
  }, [
    filterByStatus,
    search,
    currentGroup?.id,
    selectedCategory?.id,
    paginateData.offset,
    paginateData.limit,
    filterByCategoryType,
    currentTab,
  ])

  const [deleteServiceGroup] = useDeleteOneServicesMasterCategoryMutation({
    onCompleted(group) {
      setShowGroupModal(false)
      Notification(
        NotificationType.success,
        t('products.list.products.notification.group.delete.success', {
          name: group?.deleteOneServicesMasterCategory?.name,
        })
      )
    },
    onError() {
      Notification(
        NotificationType.error,
        t('products.list.products.notification.group.delete.error')
      )
    },
  })
  const [createNewServiceGroup] = useCreateOneServicesMasterCategoryMutation({
    onCompleted(newServiceGroup) {
      setShowGroupModal(false)
      Notification(
        NotificationType.success,
        t('products.list.products.notification.product.create.success', {
          name: newServiceGroup?.createOneServicesMasterCategory?.name,
        })
      )
    },
    onError() {
      Notification(
        NotificationType.error,
        t('products.list.products.notification.group.error')
      )
    },
    refetchQueries: [
      {
        query: RetrieveProductsGroupByMasterCategoryDocument,
      },
      {
        query: RetrieveAllInvProductsDocument,
        ...getQueryVariables,
      },
    ],
  })
  const { data, loading } = useRetrieveProductsGroupByMasterCategoryQuery()
  const [updateProductOrderMutation] = useUpdateOneInvProductMutation({
    onError() {
      Notification(
        NotificationType.error,
        t('products.list.product.notification.updateorder.error')
      )
    },
    fetchPolicy: 'no-cache',
  })
  const [
    updateMutation,
    { loading: productIsBeingUpdated },
  ] = useUpdateOneInvProductMutation({
    onCompleted(product) {
      changeModalState(false)
      Notification(
        NotificationType.success,
        t('products.list.products.notification.edit.success', {
          name: product?.updateOneInvProduct?.name,
        })
      )
    },
    onError() {
      Notification(
        NotificationType.error,
        t('products.list.products.notification.edit.error')
      )
    },
    update: (cache, { data: { updateOneInvProduct } }) => {
      if (RetrieveProductsGroupByMasterCategoryDocument) {
        const existing = cache.readQuery({
          query: RetrieveProductsGroupByMasterCategoryDocument,
          variables: { ...getQueryVariables },
        })
        if (existing) {
          const key = Object.keys(existing)[0]
          cache.writeQuery({
            query: RetrieveProductsGroupByMasterCategoryDocument,
            ...getQueryVariables,
            data: {
              [key]: [...existing[key], updateOneInvProduct],
            },
          })
        }
      }
    },
    refetchQueries: [
      {
        query: RetrieveAllInvProductsDocument,
        ...getQueryVariables,
      },
    ],
  })
  const updateOrder = (values: { id: number; product_order: number }) => {
    updateProductOrderMutation({
      variables: {
        data: {
          product_order: {
            set: values?.product_order ?? 1,
          },
        },
        where: {
          id: values?.id,
        },
      },
    })
  }
  const {
    data: listAllProducts,
    loading: loadingAllProducts,
  } = useRetrieveAllInvProductsQuery({
    variables: {
      ...getQueryVariables,
    },
    fetchPolicy: 'network-only',
  })
  const [
    createOneInvProductMutation,
    { loading: addMutationLoading },
  ] = useCreateOneInvProductMutation({
    onCompleted(product) {
      changeModalState(false)
      Notification(
        NotificationType.success,
        t('products.list.products.notification.product.create.success', {
          name: product?.createOneInvProduct?.name,
        })
      )
    },
    onError(error) {
      const err = uniqueConstraintErrorDecoder(error)
      Notification(
        NotificationType.error,
        err?.type === 'UniqueConstraintError'
          ? t(
              'products.list.products.notification.product.create.error.uniqueConstraint',
              {
                field: err?.field,
              }
            )
          : t('products.list.products.notification.product.create.error')
      )
    },
    refetchQueries: [
      {
        query: RetrieveAllInvProductsDocument,
        ...getQueryVariables,
      },
    ],
  })
  const [updateServiceGroup] = useUpdateOneServicesMasterCategoryMutation({
    onCompleted(productGroup) {
      setSelectedCategory(groups[currentTab]?.InvCategory?.[0])
      setShowGroupModal(false)
      Notification(
        NotificationType.success,
        t('products.list.products.notification.product.update.success', {
          name: productGroup?.updateOneServicesMasterCategory?.name,
        })
      )
    },
    onError() {
      Notification(
        NotificationType.error,
        t('products.list.products.notification.group.update.error')
      )
    },
    refetchQueries: [
      {
        query: RetrieveProductsGroupByMasterCategoryDocument,
      },
      {
        query: RetrieveAllInvProductsDocument,
        ...getQueryVariables,
      },
    ],
  })

  useEffect(() => {
    if (listAllProducts?.findManyProductsWithAvailableQuantity) {
      setSourceData(listAllProducts?.findManyProductsWithAvailableQuantity)
    }
  }, [listAllProducts])

  useEffect(() => {
    if (!loading && !fetchingInitialData) {
      setGroups([
        {
          id: 1,
          name: t('products.list.filter.all'),
          image: '',
          InvCategory: [
            {
              id: 0,
              name: t('products.list.filter.all'),
            },
            ...modal?.findManyInvCategory,
          ],
        },
        {
          id: 2,
          name: t('products.list.filter.unallocated'),
          image: '',
          InvCategory: [],
        },
        ...data?.findManyServicesMasterCategory,
      ])
      setCurrentTab(1)
    }
  }, [data, fetchingInitialData, loading, modal?.findManyInvCategory, t])

  const GroupsItem = ({ shorten = false }) => {
    const [showOps, setShowOps] = useState(false)
    const handleClickEvent = () => {
      setFormikInitialValues(null)
      setGroupModalType('Create')
      setShowGroupModal(true)
    }
    return !shorten ? (
      <div
        className={styles.groupsItem}
        onMouseEnter={() => setShowOps(true)}
        onMouseLeave={() => setShowOps(false)}
      >
        <span>{t('products.list.products.groups')}</span>
        {showOps && (
          <PlusCircleFilled
            style={{
              color: 'var(--primary-color)',
              fontSize: '24px',
              cursor: 'pointer',
            }}
            onClick={() => handleClickEvent()}
          />
        )}
      </div>
    ) : (
      <PlusCircleFilled
        style={{
          color: 'var(--primary-color)',
          fontSize: '24px',
          cursor: 'pointer',
        }}
        onClick={() => handleClickEvent()}
      />
    )
  }

  const TabMenuItem = ({ title, onEdit, onDelete }) => {
    const [showOps, setShowOps] = useState(false)
    return (
      <div
        className={styles.tabMenuItem}
        onMouseEnter={() => setShowOps(true)}
        onMouseLeave={() => setShowOps(false)}
      >
        <span>{title}</span>
        {showOps && (
          <div className={styles.tabMenuItemOps}>
            <div onClick={() => onEdit()}>
              <EditOutlined />
            </div>
            <div onClick={() => onDelete()}>
              <DeleteOutlined />
            </div>
          </div>
        )}
      </div>
    )
  }

  const StaticTabItem = ({ title }) => (
    <div className={styles.tabMenuItem}>
      <span>{title}</span>
    </div>
  )

  useEffect(() => {
    setPaginateData((d) => ({
      ...d,
      total: listAllProducts?.findManyProductsWithAvailableQuantityCount,
      showingRecords:
        listAllProducts?.findManyProductsWithAvailableQuantity?.length,
    }))
  }, [
    listAllProducts,
    listAllProducts?.findManyProductsWithAvailableQuantityCount,
  ])

  useEffect(() => {
    setIsMobile(width < 768)
  }, [width])
  useEffect(() => {
    setFormikInitialValues(currentGroup)
  }, [currentGroup])

  const onPaginationChange = (currentPage: number) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({ ...paginateData, offset, currentPage: currentPage })
  }

  const handleEditEvent = (id: number) => {
    const groupItems = [...groups]
    const groupItem = groupItems.find((el) => el.id === id)
    if (groupItem) {
      setCurrentGroup(groupItem)
      setGroupModalType('Edit')
      setShowGroupModal(true)
    }
  }

  const handleDeleteGroup = async (id: number): Promise<boolean> => {
    const groupItems = [...groups]
    const groupData = groupItems.find((el) => el?.id === id)
    const index = groupItems.indexOf(groupData)
    if (index !== -1) {
      groupItems.splice(index, 1)
      setGroups(groupItems)
      return !!(await deleteServiceGroup({
        variables: {
          where: {
            id: id,
          },
        },
      }))
    }
  }

  const renderSideMenu = (isMobile: boolean) =>
    isMobile
      ? [
          <Fragment key="groups">
            <GroupsItem shorten={true} />
          </Fragment>,
          ...groups.map((group) => (
            <Fragment key={group?.id}>
              <span title={group?.name}>{group?.name}</span>
            </Fragment>
          )),
        ]
      : [
          <Fragment key="groups">
            <GroupsItem />
          </Fragment>,
          ...groups.map((group) => {
            if (group?.id <= 3) {
              return (
                <Fragment key={group.id}>
                  <StaticTabItem title={group.name} />
                </Fragment>
              )
            } else {
              return (
                <Fragment key={group.id}>
                  <TabMenuItem
                    title={group?.name}
                    onEdit={() => handleEditEvent(group?.id)}
                    onDelete={() => setShowConfirmationDialog(true)}
                  />
                </Fragment>
              )
            }
          }),
        ]

  const renderTable = (
    renderTableData: typeof listAllProducts.findManyProductsWithAvailableQuantity
  ) => (
    <div className={styles.productTable}>
      <Table
        loading={loadingAllProducts}
        draggable={!loadingAllProducts}
        noDataText={t('products.list.products.table.new')}
        noDataBtnText={t('products.list.newbtn.product')}
        columns={ProductsColumns}
        onAddTemplate={() => changeModalState(true)}
        searchTerm={search}
        dataSource={renderTableData?.map((d) => ({
          ...d,
          cost: d?.cost,
          is_active: d?.is_active,
          retail: d?.price,
          quantity: d?.sum ?? 0,
          status:
            d?.alert_quantity > d?.sum
              ? t('products.list.products.quantity.low')
              : t('products.list.products.quantity.good'),
          category: d?.category_name,
          key: d.id,
        }))}
        updateDataSource={({ newData, oldIndex, newIndex }) => {
          setSourceData(
            (newData = newData.map(
              (data: { product_order: number }, i: number) => {
                data.product_order =
                  sourceData[i]?.product_order ===
                  sourceData[i + 1]?.product_order
                    ? sourceData[i].product_order + 1
                    : !sourceData[i].product_order
                    ? 1
                    : sourceData[i].product_order
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
        onRowClick={(values) => {
          isEditing()
          loadDefaultProductCustomFields({
            variables: {
              product: values?.id,
            },
          })
          setRecord(values)
          changeModalState(true)
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
    </div>
  )

  const renderCategoryDropdown = (masterCategory: ServicesMasterCategory) => (
    <Menu style={{ maxHeight: '400px', overflowY: 'auto' }}>
      {masterCategory?.InvCategory?.map((category) => (
        <Menu.Item
          key={category.id}
          onClick={() => setSelectedCategory(category)}
          className={selectedCategory?.id === category.id && 'filterByStatus'}
        >
          {category?.name}
        </Menu.Item>
      ))}
    </Menu>
  )

  const renderTabContent = () => [
    <Fragment key="product-group" />,
    ...groups?.map((group) => {
      return (
        <Fragment key={group.id}>
          {!isMobile && group?.InvCategory?.length > 0 && (
            <div className={styles.productsHeader}>
              <Dropdown
                overlay={() => renderCategoryDropdown(group)}
                trigger={['hover']}
                placement="bottomLeft"
              >
                <div>
                  <div>{selectedCategory?.name}</div>
                  <CaretDownFilled />
                </div>
              </Dropdown>
              {isMobile && (
                <div className={styles.tabMenuItemOps}>
                  <div>
                    <EditOutlined
                      onClick={() => {
                        setCurrentGroup(groups[currentTab])
                        setGroupModalType('Edit')
                        setShowGroupModal(true)
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          {renderTable(sourceData)}
        </Fragment>
      )
    }),
  ]

  const handleGroupSwitch = (selected: number) => {
    if (selected === 1) {
      setCurrentGroup(null)
      setSelectedCategory(groups[0]?.InvCategory?.[0])
    } else {
      setCurrentGroup(groups[selected - 1])
      setSelectedCategory(groups[selected - 1]?.InvCategory?.[0])
    }
    setCurrentTab(selected)
  }

  const findCategories = (
    selectedCategories: number[]
  ): { id: number; name: string }[] => {
    return modal?.findManyInvCategory.map((category) =>
      category?.id === selectedCategories?.find((curr) => curr === category?.id)
        ? category
        : null
    )
  }
  const handleNewGroup = async (
    values: Partial<ServicesMasterCategoryCreateInput>,
    categories: number[]
  ) => {
    const newlyCreateServiceGroup = await createNewServiceGroup({
      variables: {
        data: {
          name: values?.name,
          type: Services_Master_Category_Type.Product,
          image: values?.image ?? '/cdn/not-finished-yet.png',
          Company: {},
        },
        categories: categories,
      },
    })
    setGroups([
      ...groups,
      {
        ...newGroup,
        name: values?.name,
        id: newlyCreateServiceGroup?.data?.createOneServicesMasterCategory?.id,
        InvCategory: findCategories?.(categories)?.map((category) => ({
          id: category?.id,
          name: category?.name,
        })),
      },
    ])
  }

  useEffect(() => {
    if (currentTab === 1) {
      setCurrentGroup(null)
      setSelectedCategory(groups[0]?.InvCategory?.[0])
    } else {
      setCurrentGroup(groups[currentTab - 1])
      setSelectedCategory(groups[currentTab - 1]?.InvCategory?.[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab])

  const [deleteProduct] = useDeleteOneInvProductMutation({
    onCompleted(group) {
      changeModalState(false)
      Notification(
        NotificationType.success,
        t('products.list.category.notification.delete.success', {
          name: group?.deleteOneInvProduct?.name,
        })
      )
    },
    onError() {
      Notification(
        NotificationType.error,
        t('products.list.product.notification.delete.error')
      )
    },
    refetchQueries: [
      {
        query: RetrieveProductsGroupByMasterCategoryDocument,
      },
      {
        query: RetrieveAllInvProductsDocument,
        ...getQueryVariables,
      },
    ],
  })

  return (
    <Spin spinning={loading && loadingAllProducts}>
      <div className={styles.productsTab}>
        <TabMenu
          tabPosition={isMobile ? 'top' : 'left'}
          menuItems={renderSideMenu(isMobile)}
          disabledKeys={[0]}
          activeKey={currentTab?.toString()}
          minHeight="1px"
          onTabClick={(activeTab) => handleGroupSwitch(Number(activeTab))}
        >
          {renderTabContent()}
        </TabMenu>
      </div>
      <CreateProductGroup
        changeModalState={(state: boolean) => setShowGroupModal(state)}
        categories={modal?.findManyInvCategory}
        formikValues={formikInitialValues}
        visible={showGroupModal}
        groupModalType={groupModalType}
        onEdit={(
          values: { name: string; id: number; image: string },
          categories: number[]
        ) => {
          console.log('categories,', categories)
          console.log('values', values)
          updateServiceGroup({
            variables: {
              data: {
                name: {
                  set: values?.name,
                },
                image: {
                  set: values?.image,
                },
              },
              categories: categories,
              where: {
                id: values?.id,
              },
            },
          })
        }}
        onCreate={(
          values: Partial<ServicesMasterCategoryCreateInput>,
          categories: number[]
        ) => handleNewGroup(values, categories)}
      />
      {showConfirmationDialog && (
        <ConfirmationDialog
          visible={showConfirmationDialog}
          loading={submitting}
          title={t('products.list.products.notification.group.delete.header')}
          tooltip={t(
            'products.list.products.notification.category.delete.tooltip'
          )}
          onClose={() => setShowConfirmationDialog(false)}
          onSubmit={async () => {
            changeSubmittingStatus(true)
            changeSubmittingStatus(await handleDeleteGroup(currentGroup?.id))
            setShowConfirmationDialog(false)
          }}
        >
          {t('products.list.delete.group.text')}
        </ConfirmationDialog>
      )}
      {visible && (
        <CreateProduct
          loading={productIsBeingUpdated || addMutationLoading}
          action={action}
          visible={visible}
          defaultCustomField={
            defaultProductCustomFields?.findManyCmProductCustomField
          }
          permissions={modal?.me?.StaffMeta}
          product={record}
          onClose={() => {
            changeModalState(false)
            setRecord(null)
          }}
          onDelete={async (product) =>
            !!deleteProduct({
              variables: {
                where: {
                  id: product,
                },
              },
            })
          }
          onSave={async (product, customFields) => {
            const data = {
              name: product.name,
              InvCategory: {
                connect: {
                  id: product?.category_id,
                },
              },
              Supplier: {
                connect: {
                  id: Number(product?.supplier),
                },
              },
              Tax: {
                connect: {
                  id: Number(product?.tax),
                },
              },
              code: product?.code,
              sku: product?.sku,
              size: product?.size,
              Description: product?.Description,
              allow_negative_qty: Boolean(product?.allow_negative_qty) ?? false,
              alert_quantity: product?.alert_quantity,
              price: Number(product?.price),
              cost: Number(product?.cost),
              product_order: sourceData?.[0]?.product_order ?? 1,
              is_active: Number(product?.is_active),
              PriceListGroup_id: 0,
              imported: 0,
              open_sale: 0,
              product_points: 0,
              product_account_code_xero: '',
              new_imported: 0,
              image: product?.image ?? '/cdn/not-finished-yet.png',
              max_level: product.max_level,
              sage_nominal_code: '',
              um: '',
              category_custom_id: 0,
              custom_id: '0',
            }
            if (typeof product?.supplier !== 'number') delete data?.Supplier
            if (typeof product?.tax !== 'number') delete data?.Tax
            return !!createOneInvProductMutation({
              variables: {
                data: {
                  ...data,
                },
                stock: product?.locations?.filter?.((curr) => curr),
                custom_fields: customFields,
              },
            })
          }}
          onEdit={async (product, customFields) => {
            const data = {
              sku: {
                set: product?.sku,
              },
              code: {
                set: product?.code,
              },
              image: {
                set: product?.image,
              },
              name: {
                set: product?.name,
              },
              size: {
                set: product?.size,
              },
              cost: {
                set: Number(product?.cost),
              },
              price: {
                set: Number(product?.price),
              },
              max_level: {
                set: product?.max_level,
              },
              alert_quantity: {
                set: product?.alert_quantity,
              },
              InvCategory: {
                connect: {
                  id: product?.category_id,
                },
              },
              Supplier: {
                connect: {
                  id: Number(product?.supplier),
                },
              },
              Tax: {
                connect: {
                  id: Number(product?.tax),
                },
              },
              Description: {
                set: product?.Description,
              },
              allow_negative_qty: {
                set: Boolean(product?.allow_negative_qty),
              },
              is_active: {
                set: Number(product?.is_active),
              },
            }
            if (typeof product?.supplier !== 'number') delete data?.Supplier
            if (typeof product?.tax !== 'number') delete data?.Tax
            if (!product?.category_id) delete data?.InvCategory
            return !!(await updateMutation({
              variables: {
                where: {
                  id: product?.id,
                },
                data: {
                  ...data,
                },
                stock: product?.locations?.filter?.((curr) => curr),
                custom_fields: customFields,
              },
            }))
          }}
          locations={
            locationStockData?.findManyLocationsWithAvailableProductStock
          }
          categories={modal?.findManyInvCategory}
          suppliers={modal?.findManyAccountManager}
          taxes={modal?.findManyTax}
        />
      )}
    </Spin>
  )
}

export default Products
