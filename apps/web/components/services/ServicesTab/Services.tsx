import { Button, Dropdown, Menu } from 'antd'
import className from 'classnames'
import React, { FC, RefObject } from 'react'
import {
  BasicModal as CreateServiceGroup,
  BasicModal as Modal,
  DotButton,
  ImageSelectorModal,
  Input,
  Pagination,
  SearchTags,
  Switch,
  Table,
  TabMenu,
} from '@pabau/ui'
import {
  CaretDownFilled,
  CloseCircleFilled,
  DeleteOutlined,
  EditOutlined,
  MenuFoldOutlined,
  PictureOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { employees } from '../../../mocks/Services'
import { ColumnType } from '../CategoriesTab/Categories'
import {
  EditDataType,
  LocationItem,
  BookingDaysType,
  ContractItem,
} from '../../CreateService/CreateService'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import CreateService from '../../CreateService/CreateService'
import styles from './ServicesTab.module.less'

interface sourceDataProps extends EditDataType {
  order: number
}

interface ServiceColumnType extends ColumnType {
  loaderType?: string
  width: string
}

interface PaginateDataType {
  total: number
  offset: number
  limit: number
  currentPage: number
  showingRecords: number
}

interface ServicesProps {
  serviceTableRef: RefObject<HTMLDivElement>
  selectedService: string
  setSelectedService: (e) => void
  setTableView: (view) => void
  selectedToggleView: string
  setDeleteTabModal: (e) => void
  leftTabs: React.ReactNode[]
  isLoading: boolean
  sourceData: sourceDataProps[]
  searchTerm: string
  columns: ServiceColumnType[]
  paginateData: PaginateDataType
  setPaginateData: (e) => void
  onPaginationChange: (cp, limit) => void
  setEditData: (e) => void
  updateOrder: (e) => void
  setSourceData: (e) => void
  showCreateServiceModal: boolean
  onOpenCreateServiceModal: () => void
  onCloseCreateServiceModal: () => void
  editData: []
  handleSubmitServices: (key, values, { resetForm }, setShowModal) => void
  serviceGroupName: string
  setServiceGroupName: (e) => void
  showImageSelector: boolean
  setShowImageSelector: (e) => void
  createTab: () => void
  updateTab: () => void
  setDeletingTab: (e) => void
  deletingTab: string
  openDeleteTabModal: boolean
  deleteTab: () => void
  showCreateGroup: boolean
  setShowCreateGroup: (e) => void
  selectedImage: string
  setSelectedImage: (e) => void
  locations: LocationItem[]
  services: string[]
  togglesViews: string[]
  bookingDays: BookingDaysType[]
  equipment: string[]
  rooms: string[]
  contracts: ContractItem[]
  paginationState: boolean
  editServiceGroupName: string
  setEditServiceGroupName: (e) => void
}

const Services: FC<ServicesProps> = ({
  serviceTableRef,
  setSelectedService,
  selectedService,
  setTableView,
  selectedToggleView,
  setDeleteTabModal,
  leftTabs,
  isLoading,
  sourceData,
  searchTerm,
  columns,
  paginateData,
  setPaginateData,
  onPaginationChange,
  setEditData,
  updateOrder,
  setSourceData,
  showCreateServiceModal,
  onOpenCreateServiceModal,
  onCloseCreateServiceModal,
  editData,
  handleSubmitServices,
  serviceGroupName,
  setServiceGroupName,
  showImageSelector,
  setShowImageSelector,
  createTab,
  updateTab,
  setDeletingTab,
  deletingTab,
  openDeleteTabModal,
  deleteTab,
  showCreateGroup,
  setShowCreateGroup,
  selectedImage,
  setSelectedImage,
  locations,
  services,
  togglesViews,
  bookingDays,
  equipment,
  rooms,
  contracts,
  paginationState,
  editServiceGroupName,
  setEditServiceGroupName,
}) => {
  const { t } = useTranslationI18()
  const servicesOverlay = (
    <Menu>
      {services.map((service, key) => (
        <Menu.Item
          key={`page-size-${key}`}
          onClick={() => {
            setSelectedService(service)
          }}
          className={selectedService === service && 'active'}
        >
          {service}
        </Menu.Item>
      ))}
    </Menu>
  )

  const toggleOverlay = (
    <Menu>
      {togglesViews.map((serviceView, key) => (
        <Menu.Item
          key={`page-size-${key}`}
          onClick={() => setTableView(serviceView)}
          className={selectedToggleView === serviceView && 'active'}
        >
          {serviceView}
        </Menu.Item>
      ))}
    </Menu>
  )

  const moreBtnOverlay = (
    <Menu>
      <Menu.Item>
        <PlusOutlined />{' '}
        {t('setup.services.servicestab.dotbutton.addnewservice')}
      </Menu.Item>
      <Menu.Item>
        <EditOutlined />{' '}
        {t('setup.services.servicestab.dotbutton.editcategory')}
      </Menu.Item>
      <Menu.Item onClick={() => setDeleteTabModal(true)}>
        <DeleteOutlined />{' '}
        {t('setup.services.servicestab.dotbutton.deletecategory')}
      </Menu.Item>
    </Menu>
  )

  const serviceHeader = () => {
    return (
      <div className={className(styles.servicesSectionHeading)}>
        <Dropdown
          overlay={servicesOverlay}
          trigger={['hover']}
          placement="bottomLeft"
        >
          <div>
            <div>{selectedService}</div> <CaretDownFilled />
          </div>
        </Dropdown>
        <div>
          <Button type="default" size="large" className="hidden-lg circle">
            <EditOutlined />
          </Button>
          <Button type="default" size="large" className="hidden-lg circle">
            <DeleteOutlined />
          </Button>
          <Dropdown
            overlay={toggleOverlay}
            trigger={['click']}
            placement="bottomRight"
            arrow
          >
            <div>
              <Button type="default" size="large" className="hidden-lg circle">
                <MenuFoldOutlined />
              </Button>
              <Button
                type="default"
                size="large"
                className="toggleBtn hidden-sm"
              >
                <MenuFoldOutlined /> {t('setup.services.servicestab.toggle')}
              </Button>
            </div>
          </Dropdown>
          <Dropdown
            overlay={moreBtnOverlay}
            trigger={['click']}
            placement="bottomRight"
            arrow
          >
            <span>
              <DotButton />
            </span>
          </Dropdown>
        </div>
      </div>
    )
  }

  const serviceFooter = () => {
    return (
      <div>
        {paginationState && (
          <div className={className(styles.paginationDiv, 'footerPagination')}>
            <Pagination
              total={paginateData.total}
              defaultPageSize={50}
              showSizeChanger={false}
              onChange={onPaginationChange}
              pageSizeOptions={['10', '25', '50', '100']}
              onPageSizeChange={(pageSize) => {
                setPaginateData({
                  ...paginateData,
                  limit: pageSize,
                  offset: 0,
                  currentPage: 1,
                })
              }}
              pageSize={paginateData.limit}
              current={paginateData.currentPage}
              showingRecords={paginateData.showingRecords}
            />
          </div>
        )}
      </div>
    )
  }

  const renderTabContent = () => {
    const arr = Array.from({ length: leftTabs?.length })
    return (
      leftTabs?.length > 0 &&
      arr.map((el, index) =>
        index === 1 || index === 2 ? (
          <div className={styles.appointments} key={`tab-left-${index}`}>
            <div className="hidden-sm">{serviceHeader()}</div>
            <div>
              <Table
                loading={isLoading}
                draggable={isLoading ? false : true}
                dataSource={sourceData?.map((e: { id }) => ({
                  key: e.id,
                  ...e,
                }))}
                scroll={{ x: 'max-content' }}
                columns={columns}
                pagination={false}
                searchTerm={searchTerm}
                noDataBtnText={t(
                  'setup.services.servicestab.table.nodatabtntext'
                )}
                noDataText={t('setup.services.servicestab.table.nodatatext')}
                onAddTemplate={onOpenCreateServiceModal}
                footer={serviceFooter}
                onRowClick={(e) => {
                  setEditData(e)
                }}
                updateDataSource={({ newData, oldIndex, newIndex }) => {
                  setSourceData(
                    (newData = newData.map(
                      (data: { order: number }, i: number) => {
                        data.order =
                          sourceData[i]?.order === sourceData[i + 1]?.order
                            ? sourceData[i]?.order + 1
                            : !sourceData[i].order
                            ? 1
                            : sourceData[i].order
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
              />
            </div>
          </div>
        ) : (
          <div key={`tab-left-${index}`} className="hidden-sm">
            {serviceHeader()}
          </div>
        )
      )
    )
  }

  return (
    <div ref={serviceTableRef} className={styles.servicesTabMain}>
      <div className="hidden-lg">{serviceHeader()}</div>
      <div className="hidden-sm">
        <TabMenu
          tabPosition="left"
          menuItems={leftTabs}
          className={styles.leftTabMenu}
          disabledKeys={[0]}
          activeDefaultKey="1"
          minHeight="70vh"
          size="large"
        >
          {renderTabContent()}
        </TabMenu>
      </div>
      <div className="hidden-lg">
        <TabMenu
          tabPosition="top"
          menuItems={leftTabs}
          className={styles.leftTabMenu}
          disabledKeys={[0]}
          activeDefaultKey="1"
          minHeight="70vh"
          size="large"
        >
          {renderTabContent()}
        </TabMenu>
      </div>

      <CreateService
        visible={showCreateServiceModal}
        onClose={() => onCloseCreateServiceModal?.()}
        rooms={rooms}
        equipment={equipment}
        contracts={contracts}
        employees={employees}
        locations={locations}
        bookingDays={bookingDays}
        editData={editData as never}
        setEditData={setEditData}
        handleSubmitServices={handleSubmitServices}
      />

      {showCreateGroup && (
        <CreateServiceGroup
          visible={showCreateGroup}
          modalWidth={500}
          wrapClassName={styles.createServiceGroup}
          title={t('setup.services.servicestab.createservicegroupmodal.title')}
          onCancel={() => {
            setShowCreateGroup(false)
            setSelectedImage('')
          }}
        >
          <div className="nameInput">
            <label>
              {t('setup.services.servicestab.createservicegroupmodal.name')}
            </label>
            <Input
              text={serviceGroupName}
              placeHolderText={t(
                'setup.services.servicestab.createservicegroupmodal.name.placeholder'
              )}
              onChange={(val) => setServiceGroupName(val)}
            />
          </div>
          <div style={{ marginTop: '30px' }}>
            <SearchTags
              items={rooms}
              description={t(
                'setup.services.servicestab.createservicegroupmodal.servicecategories'
              )}
              itemType="room"
            />
          </div>
          <div className="chooseImageInput">
            <p className={styles.createServiceSectionItemTitle}>
              {t('setup.services.servicestab.createmodal.general.image')}
            </p>
            <div
              className={styles.createServiceImageContainer}
              style={{ backgroundImage: `url(${selectedImage})` }}
            >
              {selectedImage && (
                <span
                  className={styles.serviceGroupCloseIcon}
                  onClick={() => setSelectedImage(null)}
                >
                  <CloseCircleFilled />
                </span>
              )}
              {!selectedImage && (
                <PictureOutlined
                  style={{
                    color: 'var(--light-grey-color)',
                    fontSize: '32px',
                  }}
                />
              )}
            </div>
            <Button
              icon={<PlusOutlined />}
              onClick={() => setShowImageSelector(true)}
            >
              {t(
                'setup.services.servicestab.createmodal.general.choosefromlibrary'
              )}
            </Button>
            <ImageSelectorModal
              visible={showImageSelector}
              onOk={(image) => {
                setSelectedImage(image.source)
                setShowImageSelector(false)
              }}
              onCancel={() => {
                setShowImageSelector(false)
              }}
            />
          </div>
          <div className="footerBtnInput">
            <div>
              <label>{t('marketingsource-status-label')}</label>
              <Switch defaultChecked={true} />
            </div>
            <div>
              <Button
                type="default"
                size="large"
                onClick={() => {
                  setServiceGroupName(null)
                  setEditServiceGroupName(null)
                  setShowCreateGroup(false)
                  setSelectedImage('')
                }}
              >
                {t('common-label-cancel')}
              </Button>
            </div>
            <div>
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  editServiceGroupName ? updateTab() : createTab()
                }}
              >
                {editServiceGroupName
                  ? t('common-label-update')
                  : t('common-label-create')}
              </Button>
            </div>
          </div>
        </CreateServiceGroup>
      )}
      <Modal
        modalWidth={682}
        centered={true}
        onCancel={() => {
          setDeletingTab(null)
          setDeleteTabModal(false)
        }}
        onOk={deleteTab}
        visible={openDeleteTabModal}
        title={`${t('common-label-delete')} ${deletingTab}`}
        newButtonText={t('setup.services.servicestab.deletemodal.button')}
        isValidate={true}
      >
        <span
          style={{
            fontFamily: 'Circular-Std-Book',
            fontWeight: 'normal',
            fontSize: '16px',
            lineHeight: '20px',
            color: '#9292A3',
          }}
        >
          {deletingTab ? `${deletingTab}` : null}{' '}
          {t('common-label-delete-warning')}
        </span>
      </Modal>
    </div>
  )
}

export default Services
