import React, { FC, useState } from 'react'
import Layout from '../../../components/Layout/Layout'
import { ClientData } from '../../../components/Setup/CustomFields/ClientDataTab'
import { LeadFields } from '../../../components/Setup/CustomFields/LeadFieldsTab'
import { AppointmentsTab } from '../../../components/Setup/CustomFields/AppointmentsTab'
import { ProductsTab } from '../../../components/Setup/CustomFields/ProductsTab'
import { StaffTab } from '../../../components/Setup/CustomFields/StaffTab'
import { LocationsTab } from '../../../components/Setup/CustomFields/LocationsTab'
import { GroupsTab } from '../../../components/Setup/CustomFields/GroupsTab'
import { ServicesTab } from '../../../components/Setup/CustomFields/ServicesTab'
import AddButton from '../../../components/AddButton'
import useWindowSize from '../../../hooks/useWindowSize'
import { CreateCustomFieldModal } from '../../../components/Setup/CustomFields/CreateCustomFieldsModal'
import CommonHeader from '../../../components/CommonHeader'
import { TabMenu, Breadcrumb, Pagination } from '@pabau/ui'
import { DownOutlined } from '@ant-design/icons'
import { Card, Popover } from 'antd'
import { CreateGroupsTab } from '../../../components/Setup/CustomFields/CreateGroupsTab'
import styles from './index.module.less'
import { useTranslation } from 'react-i18next'

interface PaginationProp {
  total: number
  offset: number
  limit: number
  currentPage: number
  showingRecords: number
}

export const Index: FC = () => {
  const { t } = useTranslation('common')
  const tabLabels = [
    t('setup.custom-fields.client'),
    t('setup.custom-fields.lead'),
    t('setup.custom-fields.appointments'),
    t('setup.custom-fields.products'),
    t('setup.custom-fields.staff'),
    t('setup.custom-fields.locations'),
    t('setup.custom-fields.services'),
    t('setup.custom-fields.groups'),
  ]
  const size = useWindowSize()
  const [createSelTab, setCreateSelTab] = useState(tabLabels[0])
  const [selectedTab, setSelectedTab] = useState(tabLabels[0])
  const [selectedTabDisplayFor, setSelectedTabDisplayFor] = useState('')

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
              {tabSubItems.map((el) => (
                <div
                  className={el === currentTab && 'active'}
                  key={`third-tab-item-${el.key}`}
                  onClick={() => {
                    setCurrentThirdTab(el)
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

  const tabItems = tabLabels.map((t) => (
    <RenderCustomTab tabSubItems={[]} tab={t} key={t.toString()} />
  ))

  const [searchTerm, setSearchTerm] = useState('')
  const [createCustomFieldModal, setCreateCustomFieldModal] = useState(false)
  const [paginationState] = useState(true)
  const [paginateData, setPaginateData] = useState<PaginationProp>({
    total: 0,
    offset: 0,
    limit: 100,
    currentPage: 1,
    showingRecords: 0,
  })
  const [showCreateModal, setShowCreateModal] = useState(false)

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
                breadcrumbName: t('setup.clinic.data.custom.field'),
                path: '',
              },
            ]}
          />
        </div>
        <div>
          <h3 className={styles.fieldsHeading}>
            {t('setup.clinic.data.custom.field')}
          </h3>
        </div>
      </div>
      <AddButton
        onFilterSource={() => false}
        addFilter={false}
        schema={{
          createButtonLabel: t('setup.custom-fields.create'),
          searchPlaceholder: t('setup.custom-fields.search-in-name'),
        }}
        buttonDropdown={true}
        buttonDropdownOptions={[
          {
            title: t('setup.custom-fields.client-lead-fields'),
            onClick: () => {
              setSelectedTab('')
              setCreateSelTab(t('setup.custom-fields.client'))
              setSelectedTabDisplayFor('CONTACT')
            },
          },
          {
            title: t('setup.custom-fields.client-field'),
            onClick: () => {
              setSelectedTab('')
              setCreateSelTab(t('setup.custom-fields.client'))
              setSelectedTabDisplayFor('CONTACT')
            },
          },
          {
            title: t('setup.custom-fields.lead-field'),
            onClick: () => {
              setSelectedTab('')
              setCreateSelTab(t('setup.custom-fields.lead'))
              setSelectedTabDisplayFor('CONTACTLEAD')
            },
          },
          {
            title: t('setup.custom-fields.appointment-field'),
            onClick: () => {
              setSelectedTab('')
              setCreateSelTab(t('setup.custom-fields.appointments'))
              setSelectedTabDisplayFor('APPOINTMENT')
            },
          },
          {
            title: t('setup.custom-fields.product-field'),
            onClick: () => {
              setSelectedTab('')
              setCreateSelTab(t('setup.custom-fields.products'))
              setSelectedTabDisplayFor('PRODUCT')
            },
          },
          {
            title: t('setup.custom-fields.staff-fields'),
            onClick: () => {
              setSelectedTab('')
              setCreateSelTab(t('setup.custom-fields.staff'))
              setSelectedTabDisplayFor('STAFF')
            },
          },
          {
            title: t('setup.custom-fields.location-fields'),
            onClick: () => {
              setSelectedTab('')
              setCreateSelTab(t('setup.custom-fields.locations'))
              setSelectedTabDisplayFor('LOCATION')
            },
            disabled: false,
          },
          {
            title: t('setup.custom-fields.service-field'),
            onClick: () => {
              setSelectedTab('')
              setCreateSelTab(t('setup.custom-fields.services'))
              setSelectedTabDisplayFor('SERVICE')
            },
            disabled: false,
          },
          {
            title: t('setup.custom-fields.group-field'),
            overrideClick: true,
            onClick: () => {
              setSelectedTab('')
              setCreateSelTab(t('setup.custom-fields.groups'))
              setShowCreateModal(true)
            },
            disabled: false,
          },
        ]}
        onClick={() => setCreateCustomFieldModal(() => !createCustomFieldModal)}
        tableSearch
        onSearch={(text) => setSearchTerm(text)}
        needTranslation
        searchTerm={searchTerm}
      />
    </div>
  )

  const onTabChange = (tab) => {
    setSearchTerm('')
    setSelectedTab(tabLabels[tab])
  }

  const onPaginationChange = (currentPage) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData((o) => ({ ...o, offset, currentPage: currentPage }))
  }
  const onPageSizeChange = (pageSize) => {
    setPaginateData((o) => ({ ...o, limit: pageSize }))
  }

  return (
    <Layout>
      <CommonHeader
        isLeftOutlined
        reversePath="/setup"
        title={t('setup.custom-fields')}
        isShowSearch
        searchInputPlaceHolder={t('setup.custom-fields.search-in-name')}
        handleSearch={(text) => setSearchTerm(text)}
        searchValue={searchTerm}
      >
        <AddButton
          onFilterSource={() => false}
          schema={{
            createButtonLabel: t('setup.custom-fields.create'),
          }}
          tableSearch={false}
          onClick={() =>
            setCreateCustomFieldModal(() => !createCustomFieldModal)
          }
          needTranslation={false}
          addFilter={true}
        />
      </CommonHeader>
      <div className={styles.mainCustomFieldsWrapper}>
        <Card>
          {size.width > 767 && <CardHeader />}
          <div className={styles.body}>
            <TabMenu
              tabPosition="top"
              menuItems={tabItems}
              onChange={(tab) => onTabChange(tab)}
              activeKey={tabLabels.indexOf(selectedTab).toString()}
            >
              <ClientData
                paginateData={paginateData}
                setPaginateData={setPaginateData}
                searchTerm={searchTerm}
                tabSelected={selectedTab === tabLabels[0]}
              />
              <LeadFields
                paginateData={paginateData}
                setPaginateData={setPaginateData}
                searchTerm={searchTerm}
                tabSelected={selectedTab === tabLabels[1]}
              />
              <AppointmentsTab
                paginateData={paginateData}
                setPaginateData={setPaginateData}
                searchTerm={searchTerm}
                tabSelected={selectedTab === tabLabels[2]}
              />
              <ProductsTab
                paginateData={paginateData}
                setPaginateData={setPaginateData}
                searchTerm={searchTerm}
                tabSelected={selectedTab === tabLabels[3]}
              />
              <StaffTab
                paginateData={paginateData}
                setPaginateData={setPaginateData}
                searchTerm={searchTerm}
                tabSelected={selectedTab === tabLabels[4]}
              />
              <LocationsTab
                paginateData={paginateData}
                setPaginateData={setPaginateData}
                searchTerm={searchTerm}
                tabSelected={selectedTab === tabLabels[5]}
              />
              <ServicesTab
                paginateData={paginateData}
                setPaginateData={setPaginateData}
                searchTerm={searchTerm}
                tabSelected={selectedTab === tabLabels[6]}
              />
              <GroupsTab
                paginateData={paginateData}
                setPaginateData={setPaginateData}
                searchTerm={searchTerm}
                tabSelected={selectedTab === tabLabels[7]}
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
        selectedAttributeLabel={createSelTab.toLowerCase()}
        modalTitle={`${t('setup.custom-fields.create')} ${createSelTab}`}
        onClose={() => {
          setCreateCustomFieldModal(
            (createCustomFieldModal) => !createCustomFieldModal
          )
          setSelectedTab(createSelTab)
        }}
        values={{
          displayFor: selectedTabDisplayFor,
        }}
      />
      <CreateGroupsTab
        showModal={showCreateModal}
        closeModal={() => {
          setShowCreateModal(false)
          setSelectedTab(createSelTab)
        }}
      />
    </Layout>
  )
}

export default Index
