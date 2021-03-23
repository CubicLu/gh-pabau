import React, { FC, useState, useEffect } from 'react'
import { useWindowSize } from 'react-use'
import { Card, Typography, Input as AntInput, Divider, Select } from 'antd'
import {
  FilterOutlined,
  DownloadOutlined,
  PlusOutlined,
  SearchOutlined,
  CheckCircleFilled,
} from '@ant-design/icons'
import {
  Input,
  TabMenu,
  Button,
  Switch,
  ImageSelectorModal,
  CreateProduct,
  BasicModal as CreateCategory,
} from '@pabau/ui'
import Products from '../../components/Setup/ProductList/Products'
import Category from '../../components/Setup/ProductList/Category'
import PurchaseOrder from '../../components/Setup/ProductList/PurchaseOrder'
import StokeTake from '../../components/Setup/ProductList/StokeTake'
import Supplier from '../../components/Setup/ProductList/Supplier'
import Layout from '../../components/Layout/Layout'
import CommonHeader from '../setup/common-header'
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

const newBtnText = ['Product', 'Category', 'Supplier', 'Order', 'Count']
const tabItemText = [
  'Products',
  'Category',
  'Supplier',
  'Purchase orders',
  'Stock take',
]
const taxItems = []
const categoryType = ['Retail', 'Consumable', 'Injectable']
const defaultCategoryData: NewCategory = {
  name: '',
  image: '',
  code: '',
  type: 'Retail',
  tax: '',
  is_active: true,
}

enum ActiveTab {
  Products = '0',
  Category = '1',
  Supplier = '2',
  PurchaseOrders = '3',
  StockTake = '4',
}

const Subscription: FC = () => {
  const { Title } = Typography
  const { Search } = AntInput
  const { width } = useWindowSize()
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState('0')
  const [newCategoryData, setNewCategoryData] = useState<NewCategory>(
    defaultCategoryData
  )
  const [showCreateProduct, setShowCreateProduct] = useState(false)
  const [showCreteCategory, setShowCreateCategory] = useState(false)
  const [showImageSelector, setShowImageSelector] = useState(false)

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
    <>
      <CommonHeader />
      <Layout>
        <Card bodyStyle={{ padding: 0 }} style={{ borderBottomWidth: 0 }}>
          <div className={styles.headerContainer}>
            <Title>{tabItemText[activeTab]}</Title>
            <div className={styles.headerRight}>
              {!isMobile && (
                <Search
                  className={styles.searchBar}
                  placeholder={'Search in Custom'}
                  allowClear
                  onSearch={handleSearch}
                />
              )}
              {isMobile && <SearchOutlined />}
              {activeTab === ActiveTab.Products && !isMobile && (
                <Button>
                  <DownloadOutlined />
                  Export
                </Button>
              )}
              {activeTab === ActiveTab.Products && isMobile && (
                <DownloadOutlined />
              )}
              {(activeTab === ActiveTab.Products ||
                activeTab === ActiveTab.PurchaseOrders ||
                activeTab === ActiveTab.StockTake) &&
                !isMobile && (
                  <Button>
                    <FilterOutlined />
                    Filter
                  </Button>
                )}
              {(activeTab === ActiveTab.Products ||
                activeTab === ActiveTab.PurchaseOrders ||
                activeTab === ActiveTab.StockTake) &&
                isMobile && <FilterOutlined />}
              {!isMobile && (
                <Button type="primary" onClick={() => handleCreate()}>
                  New {newBtnText[activeTab]}
                </Button>
              )}
              {isMobile && (
                <Button type="primary" onClick={() => handleCreate()}>
                  <PlusOutlined style={{ fontSize: '20px' }} />
                </Button>
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
          <StokeTake />
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
          title="Create product category"
          onCancel={() => {
            setNewCategoryData(defaultCategoryData)
            setShowCreateCategory(false)
          }}
        >
          <div>
            <label>Name</label>
            <Input
              type="text"
              placeHolderText="Enter Name"
              name="name"
              onChange={(val) => inputHandler('name', val)}
            />
          </div>
          <div className="chooseImageInput">
            <label>Image</label>
            <Button
              type="default"
              size="small"
              className={styles.chooseImgBtn}
              onClick={() => setShowImageSelector(true)}
            >
              <PlusOutlined />
              Choose from Library
            </Button>
            {newCategoryData.image && (
              <div
                className={styles.productCategoryImagePreview}
                style={{ backgroundImage: `url(${newCategoryData.image})` }}
              />
            )}
          </div>
          <div>
            <label>Category code</label>
            <Input
              type="text"
              placeHolderText="Enter category code"
              name="code"
              onChange={(val) => inputHandler('code', val)}
            />
          </div>
          <div>
            <label>Category type</label>
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
            <label>Tax</label>
            <Select placeholder="Select tax">
              {taxItems.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </div>
          <div className="footerBtnInput">
            <div>
              <label>Active</label>
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
                Cancel
              </Button>
            </div>
            <div>
              <Button
                type="primary"
                size="large"
                onClick={() => handleSubmitCategory()}
              >
                Create
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
        />
      </Layout>
    </>
  )
}

export default Subscription
