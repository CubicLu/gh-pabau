import React, { FC, useState } from 'react'
import Layout from '../../../components/Layout/Layout'
import ServicesTab from '../../../components/services/ServicesTab/ServicesTab'
import CategoriesTab from '../../../components/services/CategoriesTab/CategoriesTab'
import LibrariesTab from '../../../components/services/LibrariesTab/LibrariesTab'
import CommonHeader from '../../../components/CommonHeader'
import useWindowSize from '../../../hooks/useWindowSize'
import { TabMenu, Breadcrumb, Button } from '@pabau/ui'
import { Card, Input, Popover, Radio, Select } from 'antd'
import {
  SearchOutlined,
  FilterOutlined,
  ExportOutlined,
  PlusSquareFilled,
} from '@ant-design/icons'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import classNames from 'classnames'
import styles from './index.module.less'

const { Option } = Select

export const Index: FC = () => {
  const { t } = useTranslationI18()
  const size = useWindowSize()

  const TopTabMenuItems = [
    t('setup.services.services.tab'),
    t('setup.services.categories.tab'),
    t('setup.services.library.tab'),
  ]
  const AddBtnLabels = [
    t('setup.services.service.createbutton'),
    t('setup.services.category.createbutton'),
  ]

  const [isStatusActive, setIsStatusActive] = useState(null)
  const [isBookingActive, setIsBookingActive] = useState(null)
  const [showCreateBtn] = useState(true)
  const [showCreateService, setShowCreateService] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [addBtnState, setAddBtnState] = useState(true)
  const [addBtnLabel, setAddBtnLabel] = useState(AddBtnLabels[0])
  const [updatedCategories, setUpdatedCategories] = useState(null)
  const [addCategoryModal, setAddCategoryModal] = useState(false)

  const filterContent = () => (
    <div className="filterContent">
      <Card title={<h2>{t('setup.services.filter.title')}</h2>}>
        <div className={styles.radioTextStyle}>
          <label>{t('setup.services.filter.status')}</label>
          <Radio.Group
            onChange={(e) => {
              setIsStatusActive(e.target.value)
            }}
            value={isStatusActive}
          >
            <Radio value={true}>
              <span>{t('setup.services.filter.status.active')}</span>
            </Radio>
            <Radio value={false}>
              <span>{t('setup.services.filter.status.disabled')}</span>
            </Radio>
          </Radio.Group>
        </div>
        <div className={styles.radioTextStyle}>
          <label>{t('setup.services.filter.onlinebooking')}</label>
          <Radio.Group
            onChange={(e) => {
              setIsBookingActive(e.target.value)
            }}
            value={isBookingActive}
          >
            <Radio value={true}>
              <span>{t('setup.services.filter.status.active')}</span>
            </Radio>
            <Radio value={false}>
              <span>{t('setup.services.filter.status.disabled')}</span>
            </Radio>
          </Radio.Group>
        </div>
        <div className={styles.radioTextStyle}>
          <div>
            <label>{t('setup.services.filter.servicecategory')}</label>
            <Select
              placeholder={t('setup.services.filter.servicecategory.category')}
              style={{ width: '100%' }}
            >
              <Option value="1">
                {t('setup.services.filter.servicecategory.cat1')}
              </Option>
              <Option value="2">
                {t('setup.services.filter.servicecategory.cat2')}
              </Option>
            </Select>
          </div>
          <div className="filtersInnerButtons">
            <Button type="default">
              {t('setup.services.filter.servicecategory.clearall')}
            </Button>
            <Button type="primary">
              {t('setup.services.filter.servicecategory.applyfilter')}
            </Button>
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

  const CardHeader = () => (
    <div className={styles.header}>
      <div className="leftDiv">
        <div className="hidden-sm">
          <Breadcrumb
            items={[
              {
                breadcrumbName: t('navigation-breadcrumb-setup'),
                path: 'setup',
              },
              { breadcrumbName: t('setup.services.title'), path: '' },
            ]}
          />
        </div>
        <h3 className={styles.servicesHeading}>{t('setup.services.title')}</h3>
      </div>
      <div className="rightDiv">
        <Input
          value={searchTerm}
          className={styles.searchDrugsListing}
          autoFocus
          placeholder={t('basic-crud-table-input-search-placeholder')}
          suffix={<SearchOutlined style={{ color: '#8C8C8C' }} />}
          onChange={(e) => {
            setSearchTerm(e.target.value)
          }}
        />
        {showCreateBtn && (
          <div>
            <span className="hidden-lg">
              <ExportOutlined />
            </span>
            <Button type="default" size="large" className="hidden-sm">
              <ExportOutlined /> {t('setup.services.export')}
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
                className={classNames(styles.filterBtn, 'hidden-sm')}
                size="large"
              >
                <FilterOutlined /> {t('basic-crud-table-button-filter')}
              </Button>
            </Popover>
            {addBtnState && (
              <>
                <PlusSquareFilled
                  className="plus-icon-style"
                  onClick={() => addBtnClick()}
                />
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

  const onTabClick = (tab) => {
    switch (tab) {
      case TopTabMenuItems[0]:
        setSearchTerm('')
        setAddBtnState(true)
        setAddBtnLabel(AddBtnLabels[0])
        break
      case TopTabMenuItems[1]:
        setSearchTerm('')
        setAddBtnState(true)
        setAddBtnLabel(AddBtnLabels[1])
        break
      case TopTabMenuItems[2]:
        setSearchTerm('')
        setAddBtnState(false)
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
      <CommonHeader
        isLeftOutlined
        reversePath="/setup"
        title={'Services'}
        isShowSearch
        handleSearch={(value) => setSearchTerm(value)}
        searchValue={searchTerm}
      >
        <Popover
          trigger="click"
          content={filterContent}
          placement="bottomRight"
          overlayClassName={styles.filterPopover}
        >
          <FilterOutlined className={styles.marketingIconStyle} />
        </Popover>
        {addBtnState && (
          <PlusSquareFilled
            className={styles.plusIconStyle}
            onClick={() => addBtnClick()}
          />
        )}
      </CommonHeader>
      <div className={styles.servicesMain}>
        <Card>
          {size.width > 767 && <CardHeader />}
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
                  onOpenCreateServiceModal={() =>
                    setShowCreateService((val) => !val)
                  }
                  onCloseCreateServiceModal={() => setShowCreateService(false)}
                  updatedCategories={updatedCategories}
                />
              </div>
              <div className={styles.categoriesTab}>
                <CategoriesTab
                  searchTerm={searchTerm}
                  modalShowState={addCategoryModal}
                  categoriesUpdates={(categories) => emitCategories(categories)}
                  openModal={() =>
                    setAddCategoryModal((addCategoryModal) => !addCategoryModal)
                  }
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
      </div>
    </Layout>
  )
}

export default Index
