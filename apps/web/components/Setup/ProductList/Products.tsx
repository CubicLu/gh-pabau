import React, { FC, useState, useEffect } from 'react'
import { useWindowSize } from 'react-use'
import { Dropdown, Menu } from 'antd'
import {
  Table,
  useLiveQuery,
  Pagination,
  Notification,
  NotificationType,
  TabMenu,
  BasicModal as CreateProductGroup,
  ImageSelectorModal,
  ButtonLabel,
  SearchTags,
  Input,
  Button,
  Switch,
} from '@pabau/ui'
import {
  ShopOutlined,
  EditOutlined,
  PlusCircleFilled,
  DeleteOutlined,
  PlusOutlined,
  CaretDownFilled,
} from '@ant-design/icons'
import { gql, useMutation } from '@apollo/client'
import { updateTable } from './ProductListUtils'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import styles from './productListComponents.module.less'

const LIST_QUERY = gql`
  query product_lists($offset: Int, $limit: Int, $isActive: Boolean = true) {
    product_lists(
      offset: $offset
      limit: $limit
      order_by: { order: asc }
      where: { is_active: { _eq: $isActive } }
    ) {
      id
      name
      category
      cost
      retail
      quantity
      status
      is_active
      order
    }
  }
`

const LIST_AGGREGATE = gql`
  query product_lists_aggregate {
    product_lists_aggregate {
      aggregate {
        count
      }
    }
  }
`

const UPDATE_ORDER_MUTATION = gql`
  mutation update_product_lists($id: uuid!, $order: Int) {
    update_product_lists(where: { id: { _eq: $id } }, _set: { order: $order }) {
      affected_rows
    }
  }
`

interface ProductGroup {
  groupId: string
  name: string
  image: string
  categories: Array<string>
  is_active: boolean
}

const Products: FC = () => {
  const { t } = useTranslationI18()
  const [isMobile, setIsMobile] = useState(false)
  const { width } = useWindowSize()
  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 10,
    currentPage: 1,
    showingRecords: 0,
  })

  const products = ['Product Category 1', 'Product Category 2']
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
      // eslint-disable-next-line react/display-name
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
      // eslint-disable-next-line react/display-name
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

  const [groups, setGroups] = useState<ProductGroup[]>([])
  const [newGroup, setNewGroup] = useState<ProductGroup>({
    groupId: '',
    name: '',
    image: '',
    is_active: true,
    categories: [],
  })
  const [currentGroup, setCurrentGroup] = useState<ProductGroup>({
    groupId: '',
    name: '',
    image: '',
    is_active: true,
    categories: [],
  })
  const [selectedProduct, setSelectedProduct] = useState(products[0])
  const [showGroupModal, setShowGroupModal] = useState(false)
  const [currentTab, setCurrentTab] = useState('1')
  const [showImageSelector, setShowImageSelector] = useState(false)
  const [groupModalType, setGroupModalType] = useState('')

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
        t('products.list.products.notification.updateorder.error')
      )
    },
  })

  const GroupsItem = ({ shorten = false }) => {
    const [showOps, setShowOps] = useState(false)
    const handleClickEvent = () => {
      setNewGroup({
        groupId: '',
        name: '',
        image: '',
        is_active: true,
        categories: [],
      })
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
  useEffect(() => {
    if (aggregateData) {
      setPaginateData((d) => ({
        ...d,
        total: aggregateData?.aggregate.count,
        showingRecords: data?.length,
      }))
    }
  }, [data, aggregateData])

  useEffect(() => {
    setIsMobile(width < 768)
  }, [width])

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

  const handleEditEvent = (groupId) => {
    const groupItems = [...groups]
    const groupItem = groupItems.find((el) => el.groupId === groupId)
    if (groupItem) {
      setCurrentGroup(groupItem)
      setGroupModalType('Edit')
      setShowGroupModal(true)
    }
  }

  const handleDeleteGroup = (groupId) => {
    const groupItems = [...groups]
    const groupData = groupItems.find((el) => el.groupId === groupId)
    const index = groupItems.indexOf(groupData)
    if (index !== -1) {
      groupItems.splice(index, 1)
      setGroups(groupItems)
    }
  }

  const handleEditGroup = (groupId) => {
    const groupItems = [...groups]
    const groupData = groupItems.find((el) => el.groupId === groupId)
    const index = groupItems.indexOf(groupData)
    groupItems.splice(index, 1, currentGroup)
    setGroups(groupItems)
    setShowGroupModal(false)
  }

  const handleNewGroup = () => {
    const newGroupItem = {
      ...newGroup,
      groupId: `${Date.now()}`,
    }
    const groupItems = [...groups, newGroupItem]
    setGroups(groupItems)
    setShowGroupModal(false)
  }

  const groupInputHandler = (key, value) => {
    if (groupModalType === 'Create') {
      const newGroupData = { ...newGroup }
      newGroupData[key] = value
      setNewGroup({ ...newGroupData })
    } else {
      const currentGroupData = { ...currentGroup }
      currentGroupData[key] = value
      setCurrentGroup({ ...currentGroupData })
    }
  }

  const getGroupValue = (key) => {
    return groupModalType === 'Create' ? newGroup[key] : currentGroup[key]
  }

  const productsOverlay = (
    <Menu>
      {products.map((product, key) => (
        <Menu.Item
          key={`page-size-${key}`}
          onClick={() => {
            setSelectedProduct(product)
          }}
          className={selectedProduct === product && 'active'}
        >
          {product}
        </Menu.Item>
      ))}
    </Menu>
  )

  const productsHeader = () => {
    return (
      <div className={styles.productsHeader}>
        <Dropdown
          overlay={productsOverlay}
          trigger={['hover']}
          placement="bottomLeft"
        >
          <div>
            <div>{selectedProduct}</div> <CaretDownFilled />
          </div>
        </Dropdown>
        {isMobile && (
          <div className={styles.tabMenuItemOps}>
            <div>
              <EditOutlined
                onClick={() => {
                  setCurrentGroup(groups[Number(currentTab) - 1])
                  setGroupModalType('Edit')
                  setShowGroupModal(true)
                }}
              />
            </div>
            <div>
              <DeleteOutlined
                onClick={() => {
                  handleDeleteGroup(groups[Number(currentTab) - 1].groupId)
                }}
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  const getTabMenus = (isMobile) => {
    let menuItems = []
    menuItems = isMobile
      ? [
          <React.Fragment key="groups">
            <GroupsItem shorten={true} />
          </React.Fragment>,
          ...groups.map((group) => (
            <React.Fragment key={group.groupId}>
              <span title={group.name}>{group.name}</span>
            </React.Fragment>
          )),
        ]
      : [
          <React.Fragment key="groups">
            <GroupsItem />
          </React.Fragment>,
          ...groups.map((group) => (
            <React.Fragment key={group.groupId}>
              <TabMenuItem
                title={group.name}
                onEdit={() => handleEditEvent(group.groupId)}
                onDelete={() => handleDeleteGroup(group.groupId)}
              />
            </React.Fragment>
          )),
        ]
    return menuItems
  }

  const getTabContents = () => {
    const contents = [
      <React.Fragment key="product-group"></React.Fragment>,
      ...groups.map((group) => (
        <React.Fragment key={`product-group-${group.groupId}`}>
          <div>
            <Table
              draggable
              loading={loading}
              noDataText={t('products.list.products.table.new')}
              noDataBtnText={t('products.list.products.table.nodata')}
              columns={ProductsColumns}
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
        </React.Fragment>
      )),
    ]
    return contents
  }

  return (
    <>
      <div className={styles.productsTab}>
        {productsHeader()}
        <TabMenu
          tabPosition={isMobile ? 'top' : 'left'}
          menuItems={getTabMenus(isMobile)}
          disabledKeys={[0]}
          activeDefaultKey="1"
          minHeight="1px"
          onTabClick={(activeKey) => {
            setCurrentTab(activeKey)
            setCurrentGroup(groups[Number(activeKey) - 1])
          }}
        >
          {getTabContents()}
        </TabMenu>
      </div>
      {showGroupModal && (
        <CreateProductGroup
          visible={showGroupModal}
          modalWidth={500}
          wrapClassName={styles.productGroupModal}
          title={
            groupModalType === 'Create'
              ? t('products.list.products.groupmodal.title.create')
              : t('products.list.products.groupmodal.title.edit')
          }
          onCancel={() => setShowGroupModal(false)}
        >
          <div className="nameInput">
            <label>{t('products.list.products.groupmodal.name')}</label>
            <Input
              text={getGroupValue('name')}
              placeHolderText={t(
                'products.list.products.groupmodal.name.placeholder'
              )}
              onChange={(val) => groupInputHandler('name', val)}
            />
          </div>
          <div style={{ marginTop: '30px' }}>
            <SearchTags
              items={['item 1', 'item 2', 'item3']}
              selectedItems={getGroupValue('categories')}
              onChange={(items) => groupInputHandler('categories', items)}
              description={t('products.list.products.groupmodal.category')}
              itemType={t('products.list.products.groupmodal.category.item')}
              noItemText={t('ui.searchtag.noitem')}
              selectAllText={t('ui.searchtag.selectall')}
            />
          </div>
          <div className="chooseImageInput">
            <label>{t('products.list.products.groupmodal.image')}</label>
            <Button
              type="default"
              size="small"
              className={styles.chooseImgBtn}
              onClick={() => setShowImageSelector(true)}
            >
              <PlusOutlined />
              {t('products.list.products.groupmodal.image.choose')}
            </Button>
            {getGroupValue('image') && (
              <div
                className={styles.productGroupImgPreview}
                style={{ backgroundImage: `url(${getGroupValue('image')})` }}
              />
            )}
          </div>
          <div className="footerBtnInput">
            <div>
              <label>{t('products.list.products.groupmodal.active')}</label>
              <Switch
                defaultChecked={getGroupValue('is_active')}
                onChange={(checked) => groupInputHandler('is_active', checked)}
              />
            </div>
            <div>
              <Button
                type="default"
                size="large"
                onClick={() => setShowGroupModal(false)}
              >
                {t('common-label-cancel')}
              </Button>
            </div>
            <div>
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  groupModalType === 'Create'
                    ? handleNewGroup()
                    : handleEditGroup(currentGroup.groupId)
                }}
              >
                {groupModalType === 'Create'
                  ? t('common-label-create')
                  : t('common-label-save')}
              </Button>
            </div>
          </div>
        </CreateProductGroup>
      )}
      {showImageSelector && (
        <ImageSelectorModal
          title={t('ui.imageselector.title')}
          attachButtonText={t('ui.imageselector.attach')}
          chooseButtonText={t('ui.imageselector.choose')}
          visible={showImageSelector}
          onOk={(image) => {
            groupInputHandler('image', image.source)
            setShowImageSelector(false)
          }}
          onCancel={() => {
            setShowImageSelector(false)
          }}
        />
      )}
    </>
  )
}

export default Products
