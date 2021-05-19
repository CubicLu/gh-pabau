import React, { FC, useState, useEffect } from 'react'
import Layout from '../../../components/Layout/Layout'
import ServicesTab from '../../../components/services/ServicesTab/ServicesTab'
import CategoriesTab from '../../../components/services/CategoriesTab/CategoriesTab'
import LibrariesTab from '../../../components/services/LibrariesTab/LibrariesTab'
import { TabMenu, Breadcrumb, Button, Pagination } from '@pabau/ui'
import { Card, Input, Popover, Radio, Select } from 'antd'
import className from 'classnames'
import { useMedia } from 'react-use'
import { useRouter } from 'next/router'
import {
  LeftOutlined,
  SearchOutlined,
  FilterOutlined,
  ExportOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import styles from './index.module.less'

const { Option } = Select

export const Index: FC = () => {
  const [showSearchInput, setShowSearchInput] = useState(false)

  const TopTabMenuItems = ['Services', 'Categories', 'Library']
  const AddBtnLabels = ['New Service', 'New Category']

  const [isStatusActive, setIsStatusActive] = useState(null)
  const [isBookingActive, setIsBookingActive] = useState(null)
  const [showCreateBtn] = useState(true)
  const [showCreateService, setShowCreateService] = useState(false)
  const [totalCategories, setTotalCategories] = useState(0)
  const [paginationState, setPaginationState] = useState(false)
  const [searchTerm, setSearchTerm] = useState(null)
  const [addBtnState, setAddBtnState] = useState(true)
  const [addBtnLabel, setAddBtnLabel] = useState(AddBtnLabels[0])
  const [updatedCategories, setUpdatedCategories] = useState(null)
  const [addCategoryModal, setAddCategoryModal] = useState(false)

  const isMobile = useMedia('(max-width: 768px)', false)
  const router = useRouter()

  const filterContent = (isMobile = false) => (
    <div className="filterContent">
      <Card title={<h2>Filter</h2>}>
        <div className={styles.radioTextStyle}>
          <label>Status</label>
          <Radio.Group
            onChange={(e) => {
              setIsStatusActive(e.target.value)
            }}
            value={isStatusActive}
          >
            <Radio value={true}>
              <span>Active</span>
            </Radio>
            <Radio value={false}>
              <span>Disabled</span>
            </Radio>
          </Radio.Group>
        </div>
        <div className={styles.radioTextStyle}>
          <label>Online Booking</label>
          <Radio.Group
            onChange={(e) => {
              setIsBookingActive(e.target.value)
            }}
            value={isBookingActive}
          >
            <Radio value={true}>
              <span>Active</span>
            </Radio>
            <Radio value={false}>
              <span>Disabled</span>
            </Radio>
          </Radio.Group>
        </div>
        <div className={styles.radioTextStyle}>
          <div>
            <label>Service Cateogry</label>
            <Select placeholder="Category" style={{ width: '100%' }}>
              <Option value="1">Cat 1</Option>
              <Option value="2">Cat 2</Option>
            </Select>
          </div>
          <div className="filtersInnerButtons">
            <Button type="default">Clear All</Button>
            <Button type="primary">Apply Filter</Button>
          </div>
        </div>
      </Card>
    </div>
  )

  const addBtnClick = () => {
    switch (addBtnLabel) {
      case AddBtnLabels[0]:
        setShowCreateService(true)
        break
      case AddBtnLabels[1]:
        setAddCategoryModal(true)
        break
      default:
        return
    }
  }

  const handleBack = () => {
    router.back()
  }

  const CardHeader = (
    <div className={styles.header}>
      <div className="leftDiv">
        <div className="hidden-sm">
          <Breadcrumb
            breadcrumbItems={[
              { breadcrumbName: 'Setup', path: 'setup' },
              { breadcrumbName: 'Services', path: '' },
            ]}
          />
        </div>
        <h3 className={styles.servicesHeading}>
          <span className="hidden-lg">
            <LeftOutlined onClick={handleBack} />
          </span>{' '}
          Services
        </h3>
      </div>
      <div className="rightDiv">
        <span className="hidden-lg">
          {isMobile && showSearchInput ? (
            <Input
              className="isMobile-search-input"
              value={searchTerm}
              autoFocus
              placeholder="Search"
              suffix={<SearchOutlined style={{ color: '#8C8C8C' }} />}
              onChange={(e) => {
                setSearchTerm(e.target.value)
              }}
            />
          ) : (
            <SearchOutlined
              className="isMobile-search-icon"
              onClick={() =>
                setShowSearchInput((showSearchInput) => !showSearchInput)
              }
            />
          )}
        </span>

        <Input
          value={searchTerm}
          className={className(styles.searchDrugsListing, 'hidden-sm')}
          autoFocus
          placeholder="Search"
          suffix={<SearchOutlined style={{ color: '#8C8C8C' }} />}
          onChange={(e) => {
            setSearchTerm(e.target.value)
          }}
        />
        {showCreateBtn && (
          <div>
            <Button type="default" size="large" className="hidden-sm">
              <ExportOutlined /> Export
            </Button>
            <Popover
              trigger="click"
              content={filterContent}
              placement="bottomRight"
              overlayClassName={styles.filterPopover}
            >
              <span className="hidden-lg">
                <FilterOutlined />
              </span>
              <Button
                className={className(styles.filterBtn, 'hidden-sm')}
                size="large"
              >
                <FilterOutlined /> Filter
              </Button>
            </Popover>
            {addBtnState && (
              <>
                <Button
                  type="primary"
                  size="middle"
                  className="hidden-lg"
                  onClick={() => addBtnClick()}
                >
                  <span>
                    <PlusOutlined />
                  </span>
                </Button>
                <Button
                  type="primary"
                  size="large"
                  className="hidden-sm"
                  onClick={() => addBtnClick()}
                >
                  {addBtnLabel}
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )

  const checkClickOutsideInput = (e) => {
    if (e.key === 'Escape') {
      setShowSearchInput(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', checkClickOutsideInput)
  }, [])

  const onTabClick = (tab) => {
    switch (tab) {
      case TopTabMenuItems[0]:
        setSearchTerm(null)
        setAddBtnState(true)
        setPaginationState(false)
        setAddBtnLabel(AddBtnLabels[0])
        break
      case TopTabMenuItems[1]:
        setSearchTerm(null)
        setAddBtnState(true)
        setPaginationState(true)
        setAddBtnLabel(AddBtnLabels[1])
        break
      case TopTabMenuItems[2]:
        setSearchTerm(null)
        setAddBtnState(false)
        setPaginationState(false)
        break
      default:
        return
    }
  }

  const emitCategories = (categories) => {
    setUpdatedCategories(categories)
  }

  return (
    <Layout>
      <div className={styles.servicesMain}>
        <Card title={CardHeader}>
          <div className={styles.body}>
            <TabMenu
              tabPosition="top"
              menuItems={TopTabMenuItems}
              className={styles.topTabMenu}
              minHeight="60vh"
              onTabClick={(tab) => onTabClick(TopTabMenuItems[tab])}
            >
              <div className={styles.servicesTab}>
                <ServicesTab
                  searchTerm={searchTerm}
                  showCreateServiceModal={showCreateService}
                  onCloseCreateServiceModal={() => setShowCreateService(false)}
                  updatedCategories={updatedCategories}
                />
              </div>
              <div className={styles.categoriesTab}>
                <CategoriesTab
                  totalRecords={(total) => setTotalCategories(total)}
                  modalShowState={addCategoryModal}
                  categoriesUpdates={(categories) => emitCategories(categories)}
                  closeModal={() =>
                    setAddCategoryModal((addCategoryModal) => !addCategoryModal)
                  }
                />
              </div>
              <div className={styles.librariesTab}>
                <LibrariesTab />
              </div>
            </TabMenu>
          </div>
        </Card>
        {paginationState && (
          <div className={styles.paginationDiv}>
            <Pagination
              showingRecords={totalCategories}
              defaultCurrent={1}
              total={totalCategories}
              pageSize={10}
            />
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Index
