import React, { FC, useState, useEffect } from 'react'
import {
  TabMenu,
  Table,
  DotButton,
  Pagination,
  Avatar,
  BasicModal as CreateServiceGroup,
  CreateService,
  Input,
  Switch,
  SearchTags,
  ImageSelectorModal,
  BasicModal as Modal,
} from '@pabau/ui'
import { Button, Dropdown, Menu, Popover, Tooltip } from 'antd'
import {
  CaretDownFilled,
  MenuFoldOutlined,
  PlusOutlined,
  EditOutlined,
  VideoCameraOutlined,
  PlusCircleFilled,
  DeleteOutlined,
} from '@ant-design/icons'
import className from 'classnames'
import { Donate, File, Folder, Injection, Key, Team, Globe } from '../assets'
import { ReactComponent as Bupa } from '../../../assets/images/bupa.svg'
import { ReactComponent as AxaPPP } from '../../../assets/images/axa-ppp.svg'
import Label from '../StatusLabel/label'
import styles from './services_tab.module.less'

const data = [
  {
    id: 1,
    key: '1',
    name: 'Online Consulation',
    duration: '1 hour 25 min',
    staff: '4',
    price: '£100–300',
    index: 1,
    status: 'sell',
    color: '#faad14',
    edit: true,
  },
  {
    id: 2,
    key: '2',
    name: '3 ml Contour',
    duration: '1 hour 25 min',
    staff: '8',
    price: '£300',
    index: 2,
    status: 'both',
    color: '#faad14',
    edit: true,
  },
  {
    id: 3,
    key: '3',
    name: '2 ml Contour',
    duration: '1 hour 25 min',
    staff: '12',
    price: '£900',
    index: 3,
    status: 'both',
    color: '#faad14',
    edit: true,
  },
  {
    id: 4,
    key: '4',
    name: 'Elemis peptide facial & brow wax & tint',
    duration: '1 hour 25 min',
    staff: '5',
    price: '£900',
    index: 4,
    status: 'sell',
    color: '#faad14',
    edit: true,
  },
  {
    id: 5,
    key: '5',
    name: '1 ml filler',
    duration: '1 hour 25 min',
    staff: '4',
    price: '£900',
    index: 5,
    status: 'both',
    color: '#faad14',
    edit: true,
  },
  {
    id: 6,
    key: '6',
    name: 'Facebook',
    duration: '1 hour 25 min',
    staff: '8',
    price: '£900',
    index: 6,
    status: 'sell',
    color: '#faad14',
    edit: true,
  },
  {
    id: 7,
    key: '7',
    name: 'Fresha',
    duration: '1 hour 25 min',
    staff: '10',
    price: '£900',
    index: 7,
    status: 'both',
    color: '#faad14',
    edit: true,
  },
  {
    id: 8,
    key: '8',
    name: 'Fresha',
    duration: '1 hour 25 min',
    staff: '6',
    price: '£900',
    index: 8,
    status: 'both',
    color: '#faad14',
    edit: true,
  },
  {
    id: 9,
    key: '9',
    name: 'Fresha',
    duration: '1 hour 25 min',
    staff: '19',
    price: '£900',
    index: 9,
    status: 'sell',
    color: '#faad14',
    edit: true,
  },
  {
    id: 10,
    key: '10',
    name: 'Fresha',
    duration: '1 hour 25 min',
    staff: '14',
    price: '£900',
    index: 10,
    status: 'sell',
    color: '#faad14',
    edit: true,
  },
]

const columnsView1 = [
  {
    title: 'Name',
    dataIndex: 'name',
    visible: true,
    className: 'serviceName',
    width: '40%',
    render: function renderSourceName(val, rowData) {
      return (
        <div className={styles.serviceName}>
          <span
            className={styles.dot}
            style={{
              backgroundColor: `${rowData?.color}`,
              borderColor: `${rowData?.color}`,
            }}
          ></span>
          <span>
            <VideoCameraOutlined />
          </span>
          <span>{val}</span>
        </div>
      )
    },
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    visible: true,
    className: 'duration',
    width: '20%',
  },
  {
    title: 'Staff assigned',
    dataIndex: 'staff',
    visible: true,
    width: '20%',
    render: function renderSourceName(val) {
      return (
        <div className={styles.staff}>
          <Popover
            trigger="hover"
            content={() => {
              return (
                <div className="avatarsPopover">
                  <span>
                    <Avatar name={val} />
                  </span>
                  <span>
                    <Avatar name={val} />
                  </span>
                  <span>
                    <Avatar name={val} />
                  </span>
                  <span>
                    <Avatar name={val} />
                  </span>
                </div>
              )
            }}
          >
            <span className={styles.staffCount}>{val}</span>
          </Popover>
        </div>
      )
    },
  },
  {
    title: 'Price',
    dataIndex: 'price',
    visible: true,
    width: '20%',
  },
]

const columnsView2 = [
  {
    title: 'Name',
    dataIndex: 'name',
    visible: true,
    className: 'serviceName',
    width: '50%',
    render: function renderSourceName(val) {
      return (
        <div className={styles.serviceName}>
          <span>{val}</span>
        </div>
      )
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    visible: true,
    className: 'serviceStatus',
    width: '25%',
    render: function renderSourceName(val) {
      return (
        <div>
          <Label type={`${val}`} />
        </div>
      )
    },
  },
  {
    title: '',
    dataIndex: 'edit',
    visible: true,
    width: '25%',
    className: 'serviceEdit',
    render: function renderSourceName() {
      return (
        <div className={styles.editIconsDiv}>
          <Tooltip placement="top" title="Prompt Text">
            <span>
              <Donate />
            </span>
          </Tooltip>
          <Tooltip placement="top" title="Prompt Text">
            <span>
              <Key />
            </span>
          </Tooltip>
          <Tooltip placement="top" title="Prompt Text">
            <span>
              <File />
            </span>
          </Tooltip>
          <Tooltip placement="top" title="Prompt Text">
            <span>
              <Globe />
            </span>
          </Tooltip>
          <Tooltip placement="top" title="Prompt Text">
            <span>
              <Folder />
            </span>
          </Tooltip>
          <Tooltip placement="top" title="Prompt Text">
            <span>
              <Injection />
            </span>
          </Tooltip>
          <Tooltip placement="top" title="Prompt Text">
            <span>
              <Team />
            </span>
          </Tooltip>
        </div>
      )
    },
  },
]

const rooms = ['Botox', ' Theraphy', 'Massage', 'Lab']

const equipment = [
  'Equipment A',
  'Equipment B',
  'Equipment C',
  'Equipment D',
  'Equipment E',
  'Equipment F',
  'Equipment G',
]

const contracts = [
  {
    logo: <Bupa />,
    name: 'BUPA',
    type: 'Insurance',
  },
  {
    logo: <AxaPPP />,
    name: 'AXA PPP',
    type: 'Insurance',
  },
]

const employees = [
  { name: 'Jessica Winter', selected: false },
  { name: 'Jeff Hackley', selected: false },
  { name: 'Alexander Wang', selected: false },
  { name: 'Linda Davis', selected: false },
  { name: 'William Tyson', selected: false },
  { name: 'Max Starck', selected: false },
  { name: 'Kyle Walsh', selected: false },
  { name: 'Owen Phillips', selected: false },
  { name: 'Aidan Kelly', selected: false },
  { name: 'Ewan Morgan', selected: false },
  { name: 'Jordan Martin', selected: false },
  { name: 'Grant Dudley', selected: false },
]

const locations = [
  {
    location: 'The London Clinic',
    detail: '20 Devonshire Pl, Marylebone, London W1G 6BW, UK',
    selected: false,
  },
  {
    location: 'Sloan Medical Centre',
    detail: '2 Little London Rd, Meersbrook, Sheffield S8 0YH, UK',
    selected: false,
  },
  {
    location: 'Sheffield Late Night Pharmacy',
    detail: '277 Fulwood Rd, Sheffield S10 3BD, UK',
    selected: false,
  },
]

const LeftTabs = [
  'All',
  'Appointments',
  'Enrollments',
  'Arrival',
  'Pricing',
  'Contracts',
  'Injectables',
]

export interface SP {
  showCreateServiceModal: boolean
  onCloseCreateServiceModal?: () => void
  searchTerm?: string
  updatedCategories?: []
}

export const ServicesTab: FC<SP> = ({
  searchTerm,
  showCreateServiceModal,
  onCloseCreateServiceModal,
}) => {
  const services = ['Seasonal Offers', 'The Beauty & Skin Clinic – Prepaid']
  const togglesViews = ['Standard View', 'Detailed View']

  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [showImageSelector, setShowImageSelector] = useState(false)
  const [columns, setColumns] = useState(columnsView1)
  const [selectedToggleView, setSelectedToggleView] = useState(togglesViews[0])
  const [selectedService, setSelectedService] = useState(services[0])
  const [paginationState] = useState(true)
  const [sourceData, setSourceData] = useState(null)

  const [openDeleteTabModal, setDeleteTabModal] = useState(false)
  const [deletingTab, setDeletingTab] = useState(null)

  const [newServiceGroupName, setNewServiceGroupName] = useState(null)

  const GroupsItem = ({ onClick }) => {
    const [showOps, setShowOps] = useState(false)
    return (
      <div
        className={styles.groupsItem}
        onMouseEnter={() => setShowOps(true)}
        onMouseLeave={() => setShowOps(false)}
      >
        <span className="hidden-sm">Groups</span>
        {showOps && (
          <PlusCircleFilled
            className="hidden-sm"
            style={{
              color: 'var(--primary-color)',
              fontSize: '24px',
              cursor: 'pointer',
            }}
            onClick={() => onClick()}
          />
        )}
        <PlusCircleFilled
          className="hidden-lg"
          style={{
            color: 'var(--primary-color)',
            fontSize: '24px',
            cursor: 'pointer',
          }}
          onClick={() => onClick()}
        />
      </div>
    )
  }
  const TabMenuItem = ({ title, onEdit, onDelete, showActions = true }) => {
    const [showOps, setShowOps] = useState(false)
    return (
      <div
        className={styles.tabMenuItem}
        onMouseEnter={() => setShowOps(true)}
        onMouseLeave={() => setShowOps(false)}
      >
        <span>{title}</span>
        {showOps && showActions && (
          <div className={className(styles.tabMenuItemOps, 'hidden-sm')}>
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

  const [leftTabs, setLeftTabs] = useState([
    <React.Fragment key="groups">
      <GroupsItem onClick={() => setShowCreateGroup(true)} />
    </React.Fragment>,
    <React.Fragment key="All">
      <TabMenuItem
        showActions={false}
        title="All"
        onEdit={() => {
          return
        }}
        onDelete={() => {
          setDeletingTab('All')
          setDeleteTabModal(true)
        }}
      />
    </React.Fragment>,
    <React.Fragment key="Appointments">
      <TabMenuItem
        showActions={true}
        title="Appointments"
        onEdit={() => {
          return
        }}
        onDelete={() => {
          setDeletingTab('Appointments')
          setDeleteTabModal(true)
        }}
      />
    </React.Fragment>,
  ])

  useEffect(() => {
    setSourceData(data)
    if (LeftTabs?.length) {
      const totalTabs = [...leftTabs]
      if (totalTabs?.length < LeftTabs.length) {
        for (const tab of LeftTabs) {
          const existingTab = totalTabs.find((el) => el.key === tab)
          if (!existingTab) {
            totalTabs.push(
              <React.Fragment key={tab}>
                <TabMenuItem
                  showActions={tab === 'All' ? false : true}
                  title={tab}
                  onEdit={() => {
                    return
                  }}
                  onDelete={() => {
                    setDeletingTab(tab)
                    setDeleteTabModal(true)
                  }}
                />
              </React.Fragment>
            )
          }
        }
        setLeftTabs(totalTabs)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSourceData, LeftTabs])

  const setTableView = (view) => {
    setSelectedToggleView(view)
    switch (view) {
      case togglesViews[0]:
        setColumns(columnsView1)
        break
      case togglesViews[1]:
        setColumns(columnsView2)
        break
      default:
        return
    }
  }

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
        <PlusOutlined /> Add new service
      </Menu.Item>
      <Menu.Item>
        <EditOutlined /> Edit category
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
              <Button type="default" size="large" className="hidden-sm">
                <MenuFoldOutlined /> Toggle
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
              showingRecords={sourceData?.length}
              defaultCurrent={1}
              total={sourceData?.length}
              pageSize={10}
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
                draggable={true}
                dataSource={sourceData?.map((e: { id }) => ({
                  key: e.id,
                  ...e,
                }))}
                scroll={{ x: 'max-content' }}
                columns={columns}
                pagination={false}
                searchTerm={searchTerm}
                noDataBtnText="Services"
                noDataText="service"
                footer={serviceFooter}
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

  const deleteTab = () => {
    const totalTabs = [...leftTabs]
    const tabData = totalTabs.find((el) => el.key === deletingTab)
    const index = totalTabs.indexOf(tabData)
    if (index !== -1) {
      totalTabs.splice(index, 1)
      setLeftTabs(totalTabs)
    }
    setDeleteTabModal(false)
  }

  const createTab = () => {
    if (newServiceGroupName) {
      const totalTabs = [...leftTabs]
      totalTabs.push(
        <React.Fragment key={newServiceGroupName}>
          <TabMenuItem
            showActions={true}
            title={newServiceGroupName}
            onEdit={() => {
              return
            }}
            onDelete={() => {
              setDeletingTab(newServiceGroupName)
              setDeleteTabModal(true)
            }}
          />
        </React.Fragment>
      )
      setLeftTabs(totalTabs)
      setNewServiceGroupName(null)
      setShowCreateGroup(false)
    }
  }

  return (
    <div className={styles.servicesTabMain}>
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
      />

      <CreateServiceGroup
        visible={showCreateGroup}
        modalWidth={500}
        wrapClassName={styles.createServiceGroup}
        title="Create service group"
        onCancel={() => setShowCreateGroup(false)}
      >
        <div className="nameInput">
          <label>Name</label>
          <Input
            placeHolderText="Enter Name"
            onChange={(val) => setNewServiceGroupName(val)}
          />
        </div>
        <div style={{ marginTop: '30px' }}>
          <SearchTags
            items={rooms}
            description="Service categories"
            itemType="room"
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
        </div>
        <div className="footerBtnInput">
          <div>
            <label>Active</label>
            <Switch defaultChecked={true} />
          </div>
          <div>
            <Button
              type="default"
              size="large"
              onClick={() => setShowCreateGroup(false)}
            >
              Cancel
            </Button>
          </div>
          <div>
            <Button type="primary" size="large" onClick={() => createTab()}>
              Create
            </Button>
          </div>
        </div>
      </CreateServiceGroup>
      <ImageSelectorModal
        visible={showImageSelector}
        initialSearch={''}
        onOk={(image) => {
          setShowImageSelector(false)
        }}
        onCancel={() => {
          setShowImageSelector(false)
        }}
      />

      <Modal
        modalWidth={682}
        centered={true}
        onCancel={() => {
          setDeletingTab(null)
          setDeleteTabModal(false)
        }}
        onOk={deleteTab}
        visible={openDeleteTabModal}
        title={`Delete ${deletingTab}`}
        newButtonText={'Yes, Delete'}
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
          {deletingTab ? `${deletingTab} tab` : 'This'} will be deleted. This
          action is irreversable
        </span>
      </Modal>
    </div>
  )
}

export default ServicesTab
