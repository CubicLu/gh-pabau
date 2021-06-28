//TODO: this file is not DRY

import React, { FC, useState, useEffect } from 'react'
import { useWindowSize } from 'react-use'
import { Card, Typography, Input as AntInput, Divider, Select } from 'antd'
import {
  FilterOutlined,
  DownloadOutlined,
  PlusOutlined,
  PlusSquareFilled,
  SearchOutlined,
  CheckCircleFilled,
  MenuOutlined,
} from '@ant-design/icons'
import {
  Input,
  TabMenu,
  Button,
  Switch,
  ImageSelectorModal,
  BasicModal as CreateCategory,
  MobileSidebar,
  NotificationDrawer,
  PabauMessages,
} from '@pabau/ui'
import SearchGlobal from '../../components/Search'
import CreateProduct from '../../components/Setup/ProductList/CreateProduct'
import Products from '../../components/Setup/ProductList/Products'
import Category from '../../components/Setup/ProductList/Category'
import PurchaseOrder from '../../components/Setup/ProductList/PurchaseOrder'
import StockTake from '../../components/Setup/ProductList/StockTake'
import Supplier from '../../components/Setup/ProductList/Supplier'
import Layout from '../../components/Layout/Layout'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import styles from './list.module.less'

const { Option } = Select

interface NewCategory {
  name: string
  image: string
  code: string
  type: string
  tax: string
  is_active: boolean
}

enum ActiveTab {
  Products = '0',
  Category = '1',
  Supplier = '2',
  PurchaseOrders = '3',
  StockTake = '4',
}

const Subscription: FC = () => {
  const { t } = useTranslationI18()
  const { Title } = Typography
  const { Search } = AntInput
  const { width } = useWindowSize()
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState('0')
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
  const taxItems = []
  const categoryType = [
    t('products.list.category.type.retail'),
    t('products.list.category.type.consumable'),
    t('products.list.category.type.injectable'),
  ]
  const defaultCategoryData: NewCategory = {
    name: '',
    image: '',
    code: '',
    type: categoryType[0],
    tax: '',
    is_active: true,
  }
  const [newCategoryData, setNewCategoryData] = useState<NewCategory>(
    defaultCategoryData
  )
  const [showCreateProduct, setShowCreateProduct] = useState(false)
  const [showCreteCategory, setShowCreateCategory] = useState(false)
  const [showImageSelector, setShowImageSelector] = useState(false)
  const [openMenuDrawer, setMenuDrawer] = useState(false)
  const [openNotificationDrawer, setNotificationDrawer] = useState(false)
  const [openMessageDrawer, setMessageDrawer] = useState(false)

  const handleSearch = (val) => {
    console.log('val', val)
  }

  const inputHandler = (key, value) => {
    const data = { ...newCategoryData }
    data[key] = value
    setNewCategoryData(data)
  }

  const handleSubmitCategory = () => {
    setShowCreateCategory(false)
    setNewCategoryData(defaultCategoryData)
  }

  const handleCreate = () => {
    switch (activeTab) {
      case '0':
        setShowCreateProduct(true)
        break
      case '1':
        setShowCreateCategory(true)
        break
      default:
    }
  }

  useEffect(() => {
    setIsMobile(width < 768)
  }, [width])

  return (
    <div className={styles.productsListContainer}>
      <Layout>
        <Card bodyStyle={{ padding: 0 }} style={{ borderBottomWidth: 0 }}>
          <div className={styles.headerContainer}>
            <Title>
              {isMobile && (
                <MenuOutlined
                  className={styles.menuIconStyle}
                  onClick={() => setMenuDrawer(true)}
                />
              )}
              {tabItemText[activeTab]}
            </Title>
            <div className={styles.headerRight}>
              {!isMobile && (
                <Search
                  className={styles.searchBar}
                  placeholder={t('products.list.searchbar.placeholder')}
                  allowClear
                  onSearch={handleSearch}
                />
              )}
              {isMobile && (
                <SearchOutlined className={styles.searchIconStyle} />
              )}
              {activeTab === ActiveTab.Products && !isMobile && (
                <Button>
                  <DownloadOutlined />
                  {t('products.list.export')}
                </Button>
              )}
              {activeTab === ActiveTab.Products && isMobile && (
                <DownloadOutlined className={styles.downloadIconStyle} />
              )}
              {(activeTab === ActiveTab.Products ||
                activeTab === ActiveTab.PurchaseOrders ||
                activeTab === ActiveTab.StockTake) &&
                !isMobile && (
                  <Button>
                    <FilterOutlined />
                    {t('products.list.filter')}
                  </Button>
                )}
              {(activeTab === ActiveTab.Products ||
                activeTab === ActiveTab.PurchaseOrders ||
                activeTab === ActiveTab.StockTake) &&
                isMobile && (
                  <FilterOutlined className={styles.filterIconStyle} />
                )}
              {!isMobile && (
                <Button type="primary" onClick={() => handleCreate()}>
                  {newBtnText[activeTab]}
                </Button>
              )}
              {isMobile && (
                <PlusSquareFilled
                  className={styles.plusIconStyle}
                  onClick={() => handleCreate()}
                />
              )}
            </div>
          </div>
        </Card>
        <Divider style={{ margin: 0 }} />
        <TabMenu
          tabPosition={'top'}
          menuItems={tabItemText}
          onTabClick={(activeKey) => setActiveTab(activeKey)}
          tabBarStyle={{ backgroundColor: '#FFF' }}
          minHeight="1px"
        >
          <Products />
          <Category />
          <Supplier />
          <PurchaseOrder />
          <StockTake />
        </TabMenu>
        <CreateProduct
          visible={showCreateProduct}
          plotColors={[]}
          incrementDefaults={[]}
          locations={[]}
          supplierNames={[]}
          categories={[]}
          taxNames={[]}
          onClose={() => {
            setShowCreateProduct(false)
          }}
          onSaveChanges={() => {
            setShowCreateProduct(false)
          }}
        />
        <CreateCategory
          visible={showCreteCategory}
          modalWidth={438}
          wrapClassName="addProductCategoryModal"
          title={t('products.list.create.category.title')}
          onCancel={() => {
            setNewCategoryData(defaultCategoryData)
            setShowCreateCategory(false)
          }}
        >
          <div>
            <label>{t('products.list.create.category.name')}</label>
            <Input
              type="text"
              placeHolderText={t(
                'products.list.create.category.name.placeholder'
              )}
              name="name"
              onChange={(val) => inputHandler('name', val)}
            />
          </div>
          <div className="chooseImageInput">
            <label>{t('products.list.create.category.image')}</label>
            <Button
              type="default"
              size="small"
              className={styles.chooseImgBtn}
              onClick={() => setShowImageSelector(true)}
            >
              <PlusOutlined />
              {t('products.list.create.category.image.choose')}
            </Button>
            {newCategoryData.image && (
              <div
                className={styles.productCategoryImagePreview}
                style={{ backgroundImage: `url(${newCategoryData.image})` }}
              />
            )}
          </div>
          <div>
            <label>{t('products.list.create.category.categorycode')}</label>
            <Input
              type="text"
              placeHolderText={t(
                'products.list.create.category.categorycode.placeholder'
              )}
              name="code"
              onChange={(val) => inputHandler('code', val)}
            />
          </div>
          <div>
            <label>{t('products.list.create.category.categorytype')}</label>
            <div className={styles.productCategoryType}>
              {categoryType.map((type) => (
                <div
                  key={type}
                  className={
                    type === newCategoryData.type ? styles.selected : ''
                  }
                  onClick={() => inputHandler('type', type)}
                >
                  {type}
                  <div>
                    <CheckCircleFilled />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label>{t('products.list.create.category.tax')}</label>
            <Select
              placeholder={t('products.list.create.category.tax.placeholder')}
            >
              {taxItems.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </div>
          <div className="footerBtnInput">
            <div>
              <label>{t('products.list.create.category.active')}</label>
              <Switch
                defaultChecked={newCategoryData.is_active}
                onChange={(check) => inputHandler('is_active', check)}
                size="small"
              />
            </div>
            <div>
              <Button
                type="default"
                size="large"
                onClick={() => {
                  setNewCategoryData(defaultCategoryData)
                  setShowCreateCategory(false)
                }}
              >
                {t('common-label-cancel')}
              </Button>
            </div>
            <div>
              <Button
                type="primary"
                size="large"
                onClick={() => handleSubmitCategory()}
              >
                {t('common-label-create')}
              </Button>
            </div>
          </div>
        </CreateCategory>
        <ImageSelectorModal
          visible={showImageSelector}
          initialSearch={newCategoryData.name}
          onOk={(image) => {
            inputHandler('image', image.source)
            setShowImageSelector(false)
          }}
          onCancel={() => setShowImageSelector(false)}
          title={t('ui.imageselector.title')}
          attachButtonText={t('ui.imageselector.attach')}
          chooseButtonText={t('ui.imageselector.choose')}
        />
        {openMenuDrawer && (
          <MobileSidebar
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
      </Layout>
    </div>
  )
}

export default Subscription
