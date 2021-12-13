import { DownloadOutlined, PlusSquareFilled } from '@ant-design/icons'
import { useCreateProductModalInitQuery } from '@pabau/graphql'
import { Button, MobileSidebar, NotificationDrawer, TabMenu } from '@pabau/ui'
import { Card, Divider, Input as AntInput, Typography } from 'antd'
import { useRouter } from 'next/router'
import React, { SetStateAction, useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'
import Layout from '../../components/Layout/Layout'
import SearchGlobal from '../../components/Search'
import Category from '../../components/Product/Category'
import Product from '../../components/Product/Products'
import PurchaseOrder from '../../components/Product/PurchaseOrder'
import StockTake from '../../components/Product/StockTake'
import Supplier from '../../components/Product/Supplier'
import Filter from '../../components/Product/Filter'
import CommonHeader from '../../components/CommonHeader'
import { useUser } from '../../context/UserContext'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import styles from './list.module.less'

const ProductList = (): JSX.Element => {
  const { t } = useTranslationI18()
  const { Title } = Typography
  const { Search } = AntInput
  const { width } = useWindowSize()
  const [isMobile, setIsMobile] = useState(false)
  const WAIT_INTERVAL = 400
  type Action = 'Edit' | 'Create'
  enum ActiveTab {
    Products = '0',
    Category = '1',
    Supplier = '2',
    PurchaseOrders = '3',
    StockTake = '4',
  }
  const [activeTab, setActiveTab] = useState('0')
  // const {
  //   data: pageAccess,
  //   loading: fetchingPermissions,
  // } = usePageAccessAuthorizationQuery({
  //   variables: {
  //     pageName: 'Stock',
  //   },
  // })
  const newBtnText = [
    t('products.list.newbtn.product'),
    t('products.list.newbtn.category'),
    t('products.list.newbtn.supplier'),
    t('products.list.newbtn.order'),
    t('products.list.newbtn.count'),
  ]
  const tabItemText = [
    t('products.list.tab.products'),
    t('products.list.tab.category'),
    t('products.list.tab.supplier'),
    t('products.list.tab.purchase'),
    t('products.list.tab.stock'),
  ]
  const categoryType = [
    t('products.list.category.type.retail'),
    t('products.list.category.type.consumable'),
    t('products.list.category.type.injectable'),
  ]
  const [showCreateProduct, setShowCreateProduct] = useState(false)
  const [categorySearchTerm, setCategorySearchTerm] = useState<string>()
  const [searchTerm, setSearchTerm] = useState<string>(null)
  const initialValues: { status: number; type: string } = {
    status: 1,
    type: 'Retail',
  }
  const [productSearchTerm, setProductSearchTerm] = useState<string>()
  const [supplierSearchTerm, setSupplierSearchTerm] = useState<string>()
  const [
    purchaseOrdersSearchTerm,
    setPurchaseOrdersSearchTerm,
  ] = useState<string>()
  const [stockSearchTerm, setStockSearchTerm] = useState<string>()
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false)
  const [showCreateSupplier, setShowCreateSupplier] = useState(false)
  const [openMenuDrawer, setMenuDrawer] = useState(false)
  const [openNotificationDrawer, setNotificationDrawer] = useState(false)
  const [selectedCategoryType, setSelectedCategoryType] = useState<string>(null)
  const [action, setAction] = useState<Action>(null)
  const {
    loading: productModalLoading,
    data: initialProductModalData,
    refetch: refetchModalData,
  } = useCreateProductModalInitQuery()
  const [productFilter, setProductFilter] = useState(1)
  const [categoryFilter, setCategoryFilter] = useState(1)
  const [supplierFilter, setSupplierFilter] = useState(1)
  const [purchaseOrdersFilter, setPurchaseOrdersFilter] = useState(1)

  const [, setMessageDrawer] = useState(false)

  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (activeTab === '0') {
      refetchModalData()
    }
  }, [activeTab, refetchModalData])

  const handleCreate = async () => {
    switch (activeTab) {
      case '0':
        setAction('Create')
        setShowCreateProduct(true)
        break
      case '1':
        setShowCreateCategoryModal(true)
        setAction('Create')
        break
      case '2':
        await router.push('/supplier/create')
        setShowCreateSupplier(true)
        setAction('Create')
        break
      case '3':
        await router.push('/purchase-order/create')
        break
      case '4':
        await router.push('/inventory-count/create')
        break
    }
  }
  const handleSearch = (val: SetStateAction<string>) => {
    switch (activeTab) {
      case '0':
        setProductSearchTerm(val)
        break
      case '1':
        setCategorySearchTerm(val)
        break
      case '2':
        setSupplierSearchTerm(val)
        break
      case '3':
        setPurchaseOrdersSearchTerm(val)
        break
      case '4':
        setStockSearchTerm(val)
        break
    }
  }

  const updateFilterStatus = (status: number) => {
    switch (activeTab) {
      case '0':
        setProductFilter(status)
        break
      case '1':
        setCategoryFilter(status)
        break
      case '2':
        setSupplierFilter(status)
        break
      case '3':
        setPurchaseOrdersFilter(status)
        break
    }
  }

  useEffect(() => {
    setIsMobile(width < 768)
  }, [width])

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchTerm)
    }, WAIT_INTERVAL)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm])

  return (
    <Layout {...user}>
      <CommonHeader
        isShowSearch
        searchInputPlaceHolder={t('products.list.searchbar.placeholder')}
        handleSearch={(value) => setSearchTerm(value)}
        title={tabItemText[activeTab]}
        searchValue={searchTerm}
      >
        {activeTab === ActiveTab.Products && (
          <DownloadOutlined className={styles.downloadIconStyle} />
        )}
        {(activeTab === ActiveTab.Products ||
          activeTab === ActiveTab.PurchaseOrders ||
          activeTab === ActiveTab.Category ||
          activeTab === ActiveTab.Supplier) && (
          <Filter
            initialValues={initialValues}
            selectedCategoryType={selectedCategoryType}
            activeTab={activeTab}
            categoryType={categoryType}
            ActiveTab={ActiveTab}
            changeFilter={(status) => updateFilterStatus(status)}
            changeCategoryType={(type) => {
              if (activeTab === '0') setSelectedCategoryType(type)
            }}
          />
        )}
        <PlusSquareFilled
          className={styles.plusIconStyle}
          onClick={() => handleCreate()}
        />
      </CommonHeader>
      <div className={styles.productsListContainer}>
        <Card bodyStyle={{ padding: 0 }} style={{ borderBottomWidth: 0 }}>
          {!isMobile && (
            <div className={styles.headerContainer}>
              <Title>{tabItemText[activeTab]}</Title>
              <div className={styles.headerRight}>
                <Search
                  value={searchTerm}
                  className={styles.searchBar}
                  placeholder={t('products.list.searchbar.placeholder')}
                  allowClear
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                {activeTab === ActiveTab.Products && (
                  <Button onClick={() => router.push('/products/export')}>
                    <DownloadOutlined />
                    {t('products.list.export')}
                  </Button>
                )}

                {(activeTab === ActiveTab.Products ||
                  activeTab === ActiveTab.PurchaseOrders ||
                  activeTab === ActiveTab.Supplier ||
                  activeTab === ActiveTab.Category) && (
                  <Filter
                    initialValues={initialValues}
                    selectedCategoryType={selectedCategoryType}
                    activeTab={activeTab}
                    categoryType={categoryType}
                    ActiveTab={ActiveTab}
                    changeFilter={(status) => updateFilterStatus(status)}
                    changeCategoryType={(type) => {
                      if (activeTab === '0') setSelectedCategoryType(type)
                    }}
                  />
                )}
                <Button type="primary" onClick={() => handleCreate()}>
                  {newBtnText[activeTab]}
                </Button>
              </div>
            </div>
          )}
        </Card>
        <Divider style={{ margin: 0 }} />
        <TabMenu
          tabPosition={'top'}
          menuItems={tabItemText}
          onTabClick={(activeKey) => setActiveTab(activeKey)}
          tabBarStyle={{ backgroundColor: '#FFF' }}
          minHeight="1px"
        >
          <Product
            modal={initialProductModalData}
            action={action}
            fetchingInitialData={productModalLoading}
            search={productSearchTerm}
            visible={showCreateProduct}
            filterByCategoryType={selectedCategoryType}
            filterByStatus={productFilter}
            changeModalState={(state: boolean) => {
              setShowCreateProduct(state)
            }}
            isEditing={() => setAction('Edit')}
          />
          <Category
            modalDataLoading={productModalLoading}
            visible={showCreateCategoryModal}
            action={action}
            search={categorySearchTerm}
            filterByStatus={categoryFilter}
            taxes={initialProductModalData?.findManyTax}
            changeModalState={(state: boolean) => {
              setShowCreateCategoryModal(state)
            }}
            isEditing={() => setAction('Edit')}
          />
          <Supplier
            search={supplierSearchTerm}
            visible={showCreateSupplier}
            filterByStatus={supplierFilter}
          />
          <PurchaseOrder
            filterByStatus={purchaseOrdersFilter}
            search={purchaseOrdersSearchTerm}
          />
          <StockTake search={stockSearchTerm} />
        </TabMenu>
        {openMenuDrawer && (
          <MobileSidebar
            userData={user?.me}
            searchRender={() => <SearchGlobal />}
            onSideBarClosed={() => setMenuDrawer(() => !openMenuDrawer)}
            onClickNotificationDrawer={() => setNotificationDrawer((e) => !e)}
            onClickChatDrawer={() => setMessageDrawer((e) => !e)}
          />
        )}
        {openNotificationDrawer && (
          <NotificationDrawer
            openDrawer={openNotificationDrawer}
            closeDrawer={() => setNotificationDrawer((e) => !e)}
          />
        )}
      </div>
    </Layout>
  )
}

export default ProductList
