import React, { FC, useState } from 'react'
import Layout from '../../../components/Layout/Layout'
import { ClientData } from '../../../components/Setup/CustomFields/ClientDataTab'
import { LeadFields } from '../../../components/Setup/CustomFields/LeadFieldsTab'
import { Categories } from '../../../components/Setup/CustomFields/CategoriesTab'
import { OthersTab } from '../../../components/Setup/CustomFields/OthersTab'
import { CreateCustomFieldModal } from '../../../components/Setup/CustomFields/CreateCustomFieldsModal'
import { TabMenu, Button, Breadcrumb, Pagination } from '@pabau/ui'
import { Card, Input, Popover } from 'antd'
import { useMedia } from 'react-use'
import classNames from 'classnames'
import { SearchOutlined, DownOutlined, PlusOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { useTranslation } from 'react-i18next'

export const Index: FC = () => {
  const { t } = useTranslation('common')
  const isMobile = useMedia('(max-width: 767px)', true)
  const [otherTab, setOtherTab] = useState('Others')
  const [mobileInput, setMobileInput] = useState(false)
  const [selectedTab, setSelectedTab] = useState('Client Data')
  const tabLabels = [
    t('setup.custom-fields.client-data'),
    t('setup.custom-fields.lead-fields'),
    t('setup.custom-fields.others'),
    t('setup.custom-fields.categories'),
  ]
  const otherTabLabels = [
    t('setup.custom-fields.appointements'),
    t('setup.custom-fields.products'),
    t('setup.custom-fields.services'),
    t('setup.custom-fields.staff'),
  ]

  const RenderCustomTab = ({ tabSubItems, tab }) => {
    const [currentTab, setCurrentThirdTab] = useState(tab)
    const [showPopover, setShowPopover] = useState(false)
    return (
      <React.Fragment key="tabs">
        <Popover
          trigger="click"
          visible={tabSubItems?.length && showPopover}
          onVisibleChange={(visible) => setShowPopover(visible)}
          content={
            <div className="popover-menu">
              {tabSubItems.map((el, index) => (
                <div
                  className={el === currentTab && 'active'}
                  key={`third-tab-item-${index}`}
                  onClick={() => {
                    setCurrentThirdTab(el)
                    setOtherTab(el)
                    setSelectedTab(el)
                    setShowPopover((showPopover) => !showPopover)
                  }}
                >
                  {el}
                </div>
              ))}
            </div>
          }
          placement="bottom"
        >
          <span className={'custom-tab'}>
            {currentTab} {tabSubItems?.length > 0 && <DownOutlined />}
          </span>
        </Popover>
      </React.Fragment>
    )
  }

  const tabItems = [
    <RenderCustomTab
      tabSubItems={[]}
      tab={tabLabels[0]}
      key={tabLabels[0].toString()}
    />,
    <RenderCustomTab
      tabSubItems={[]}
      tab={tabLabels[1]}
      key={tabLabels[1].toString()}
    />,
    <RenderCustomTab
      tabSubItems={otherTabLabels}
      tab={otherTab}
      key={tabLabels[2].toString()}
    />,
    <RenderCustomTab
      tabSubItems={[]}
      tab={tabLabels[3]}
      key={tabLabels[3].toString()}
    />,
  ]
  const [searchTerm, setSearchTerm] = useState('')
  const [createCustomFieldModal, setCreateCustomFieldModal] = useState(false)
  const [paginationState] = useState(true)
  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 50,
    currentPage: 1,
    showingRecords: 0,
  })

  const selectedAttributeLabel =
    selectedTab === 'Others'
      ? otherTab === 'Others'
        ? t('setup.custom-fields.appointements')
        : otherTab
      : selectedTab

  const createAttributeLabel = `${t(
    'setup.custom-fields.new'
  )} ${selectedAttributeLabel} ${t('setup.custom-fields.attribute')}`

  const MobileHeaderRightSide = () => {
    return (
      <>
        {mobileInput ? (
          <Input
            className={classNames(
              styles.searchFieldsListing,
              'mobileViewInput'
            )}
            autoFocus
            size="middle"
            placeholder={t('setup.custom-fields.search-in-name')}
            suffix={<SearchOutlined style={{ color: '#8C8C8C' }} />}
            value={searchTerm || ''}
            onChange={(e) => {
              setSearchTerm(e.target.value)
            }}
          />
        ) : (
          <span
            className="mobileViewSearchIcon"
            onClick={() => setMobileInput((mobileInput) => !mobileInput)}
          >
            <SearchOutlined />
          </span>
        )}

        <Button
          type="primary"
          size="middle"
          className="plus-btn"
          onClick={() =>
            setCreateCustomFieldModal(
              (createCustomFieldModal) => !createCustomFieldModal
            )
          }
        >
          <PlusOutlined />
        </Button>
      </>
    )
  }

  const cardHeader = (
    <div className={styles.header}>
      <div className="leftDiv">
        <div>
          <Breadcrumb
            breadcrumbItems={[
              {
                breadcrumbName: t('sidebar.setup'),
                path: 'setup',
              },
              {
                breadcrumbName: t('setup.custom-fields'),
                path: '',
              },
            ]}
          />
        </div>
        <div>
          <h3 className={styles.fieldsHeading}>{t('setup.custom-fields')}</h3>
        </div>
      </div>
      <div className="rightDiv">
        {isMobile ? (
          <MobileHeaderRightSide />
        ) : (
          <>
            <Input
              className={styles.searchFieldsListing}
              autoFocus
              placeholder={t('setup.custom-fields.search-in-name')}
              suffix={<SearchOutlined style={{ color: '#8C8C8C' }} />}
              value={searchTerm || ''}
              onChange={(e) => {
                setSearchTerm(e.target.value)
              }}
            />
            <Button
              type="primary"
              size="large"
              onClick={() =>
                setCreateCustomFieldModal(
                  (createCustomFieldModal) => !createCustomFieldModal
                )
              }
            >
              {createAttributeLabel}
            </Button>
          </>
        )}
      </div>
    </div>
  )

  const onTabChange = (tab) => {
    setSearchTerm('')
    if (otherTab === 'Others' && tab === 2) {
      setOtherTab(otherTabLabels[0])
      setSelectedTab(otherTabLabels[0])
      return
    }
    setSelectedTab(tabLabels[tab])
  }

  const onPaginationChange = (currentPage) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({ ...paginateData, offset, currentPage: currentPage })
  }
  const onPageSizeChange = (pageSize) => {
    setPaginateData({ ...paginateData, limit: pageSize })
  }

  return (
    <Layout>
      <div className={styles.mainCustomFieldsWrapper}>
        <Card title={cardHeader}>
          <div className={styles.body}>
            <TabMenu
              tabPosition="top"
              menuItems={tabItems}
              onChange={(tab) => onTabChange(tab)}
            >
              <ClientData
                paginateData={paginateData}
                setPaginateData={(data) => setPaginateData(data)}
                searchTerm={searchTerm}
              />
              <LeadFields
                paginateData={paginateData}
                setPaginateData={(data) => setPaginateData(data)}
                searchTerm={searchTerm}
              />
              <OthersTab
                paginateData={paginateData}
                setPaginateData={(data) => setPaginateData(data)}
                searchTerm={searchTerm}
                tabType={otherTab}
              />
              <Categories
                paginateData={paginateData}
                setPaginateData={(data) => setPaginateData(data)}
                searchTerm={searchTerm}
              />
            </TabMenu>
          </div>
        </Card>
        {paginationState && (
          <Pagination
            total={paginateData.total}
            defaultPageSize={paginateData.limit}
            showSizeChanger={true}
            onPageSizeChange={(pageSize) => onPageSizeChange(pageSize)}
            onChange={onPaginationChange}
            pageSize={paginateData.limit}
            current={paginateData.currentPage}
            showingRecords={paginateData.showingRecords}
          />
        )}
      </div>
      <CreateCustomFieldModal
        visible={createCustomFieldModal}
        selectedAttributeLabel={selectedAttributeLabel}
        modalTitle={createAttributeLabel}
        onClose={() =>
          setCreateCustomFieldModal(
            (createCustomFieldModal) => !createCustomFieldModal
          )
        }
      />
    </Layout>
  )
}

export default Index
