import React, { FC, useState } from 'react'
import Layout from '../../../components/Layout/Layout'
import { ClientData } from '../../../components/Setup/CustomFields/ClientDataTab'
import { LeadFields } from '../../../components/Setup/CustomFields/LeadFieldsTab'
import { Categories } from '../../../components/Setup/CustomFields/CategoriesTab'
import { OthersTab } from '../../../components/Setup/CustomFields/OthersTab'
import AddButton from '../../../components/AddButton'
import useWindowSize from '../../../hooks/useWindowSize'
import { CreateCustomFieldModal } from '../../../components/Setup/CustomFields/CreateCustomFieldsModal'
import MobileHeader from '../../../components/MobileHeader'
import { TabMenu, Breadcrumb, Pagination } from '@pabau/ui'
import { DownOutlined } from '@ant-design/icons'
import { Card, Popover } from 'antd'
import styles from './index.module.less'
import { useTranslation } from 'react-i18next'

export const Index: FC = () => {
  const { t } = useTranslation('common')
  const size = useWindowSize()
  const [otherTab, setOtherTab] = useState('Others')
  const [mobileSearch, setMobileSearch] = useState(false)
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

  const CardHeader = () => (
    <div className={styles.header}>
      <div className="leftDiv">
        <div>
          <Breadcrumb
            items={[
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
      <AddButton
        onFilterSource={() => false}
        addFilter={false}
        schema={{
          createButtonLabel: createAttributeLabel,
          searchPlaceholder: t('setup.custom-fields.search-in-name'),
        }}
        onClick={() => setCreateCustomFieldModal(() => !createCustomFieldModal)}
        tableSearch
        onSearch={(text) => setSearchTerm(text)}
        needTranslation
      />
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
      <MobileHeader parent="/setup" title={t('setup.custom-fields')}>
        <AddButton
          onFilterSource={() => false}
          onSearch={(text) => setSearchTerm(text)}
          schema={{
            createButtonLabel: createAttributeLabel,
            searchPlaceholder: t('setup.custom-fields.search-in-name'),
          }}
          tableSearch={true}
          onClick={() =>
            setCreateCustomFieldModal(() => !createCustomFieldModal)
          }
          needTranslation={false}
          mobileSearch={mobileSearch}
          setMobileSearch={() => setMobileSearch(() => !mobileSearch)}
          addFilter={true}
        />
      </MobileHeader>
      <div className={styles.mainCustomFieldsWrapper}>
        <Card>
          {size.width > 767 && <CardHeader />}
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
