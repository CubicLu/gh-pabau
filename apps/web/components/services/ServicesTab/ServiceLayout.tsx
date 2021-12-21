import { Popover, Tooltip } from 'antd'
import className from 'classnames'
import React, { FC, useEffect, useState, useRef } from 'react'
import {
  useServiceQuery,
  ServiceDocument,
  useService_AggregateQuery,
  Service_AggregateDocument,
  useInsert_Service_OneMutation,
  useUpdate_Service_By_PkMutation,
  useUpdate_ServiceMutation,
} from '@pabau/graphql'
import { Avatar, Notification, NotificationType } from '@pabau/ui'
import {
  Donate,
  File,
  Folder,
  Globe,
  Injection,
  Key,
  Team,
} from '../assets/Index'
import Label from '../StatusLabel/Label'
import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleFilled,
  TeamOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import {
  rooms,
  equipment,
  bookingDays,
  get,
  getImages,
} from '../../../mocks/Services'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import { ReactComponent as AxaPPP } from '../../../assets/images/axa-ppp.svg'
import { ReactComponent as Bupa } from '../../../assets/images/bupa.svg'
import Services from './Services'
import styles from './ServicesTab.module.less'

const reactImages = [
  { name: 'BUPA', img: <Bupa /> },
  { name: 'AXA PPP', img: <AxaPPP /> },
] //it is not a mock data, it's a function parameter

export interface ServiceLayoutProps {
  showCreateServiceModal: boolean
  onOpenCreateServiceModal?: () => void
  onCloseCreateServiceModal?: () => void
  searchTerm?: string
  updatedCategories?: []
}

const ServiceLayout: FC<ServiceLayoutProps> = ({
  searchTerm,
  showCreateServiceModal,
  onOpenCreateServiceModal,
  onCloseCreateServiceModal,
  ...rest
}) => {
  const { t } = useTranslationI18()
  const { locations, services, togglesViews, LeftTabs, durations } = get(t)
  const { contracts } = getImages(reactImages, t)
  const [selectedImage, setSelectedImage] = useState('')
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [showImageSelector, setShowImageSelector] = useState(false)
  const [selectedToggleView, setSelectedToggleView] = useState(togglesViews[0])
  const [selectedService, setSelectedService] = useState(services[0])
  const [paginationState] = useState(true)
  const [sourceData, setSourceData] = useState(null)

  const [openDeleteTabModal, setDeleteTabModal] = useState(false)
  const [deletingTab, setDeletingTab] = useState(null)

  const [serviceGroupName, setServiceGroupName] = useState(null)
  const [editServiceGroupName, setEditServiceGroupName] = useState(null)
  const [editData, setEditData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 50,
    currentPage: 1,
    showingRecords: 0,
  })
  const serviceTableRef = useRef(null)

  const columnsView1 = [
    {
      title: t('setup.services.servicestab.fields.name'),
      dataIndex: 'service_name',
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
              {rowData.type === 'Service' ? (
                <CalendarOutlined />
              ) : rowData.type === 'Virtual' ? (
                <VideoCameraOutlined />
              ) : rowData.type === 'Class' ? (
                <TeamOutlined />
              ) : null}
            </span>
            <div>
              <span>{val}</span>
              {rowData?.bundle_items?.length > 0 && (
                <h5 style={{ margin: 0 }}>
                  {`${rowData.bundle_items.length}
                  ${
                    rowData.bundle_items.length > 1
                      ? t('setup.services.servicestab.fieldvalue.services')
                      : t('setup.services.servicestab.fieldvalue.service')
                  }`}
                </h5>
              )}
            </div>
          </div>
        )
      },
    },
    {
      title: t('setup.services.servicestab.fields.duration'),
      dataIndex: 'duration',
      visible: true,
      className: 'duration',
      width: '20%',
      render: function renderSourceName(val, rowData) {
        const timeValue = durations.find((item) => item.value === val)
        const value = getMinimumDuration(timeValue, rowData.employees)
        return (
          <div className={styles.serviceName}>
            {!timeValue && !value
              ? null
              : value.value !== timeValue.value
              ? `${t('setup.services.servicestab.fieldvalue.from')} ${
                  value.title
                }`
              : timeValue.title}
          </div>
        )
      },
    },
    {
      title: t('setup.services.servicestab.fields.staffassigned'),
      dataIndex: 'staff_assigned',
      visible: true,
      loaderType: 'Input',
      width: '20%',
      render: function renderSourceName(val, rowData) {
        return (
          <div className={styles.staff}>
            <Popover
              trigger="hover"
              content={() => {
                return (
                  <div className="avatarsPopover">
                    {rowData.employees && rowData.employees.length > 0 ? (
                      rowData.employees.map((item, index) => (
                        <span key={index}>
                          <Avatar name={item.name} />
                        </span>
                      ))
                    ) : (
                      <span>
                        {t(
                          'setup.services.servicestab.fieldvalue.nostaffassigned'
                        )}
                      </span>
                    )}
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
      title: t('setup.services.servicestab.fields.price'),
      dataIndex: 'service_price',
      visible: true,
      width: '20%',
      render: function renderSourceName(val, rowData) {
        const value = getMinimumPrice(val, rowData.employees)
        return (
          <div className={styles.serviceName}>
            {' '}
            {value !== val
              ? `${t('setup.services.servicestab.fieldvalue.from')} £${value}`
              : `£${val}`}
          </div>
        )
      },
    },
  ]

  const [columns, setColumns] = useState(columnsView1)

  const columnsView2 = [
    {
      title: t('setup.services.servicestab.fields.name'),
      dataIndex: 'service_name',
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
      title: t('setup.services.servicestab.fields.status'),
      dataIndex: 'pricing_type',
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

  const getMinimumPrice = (price, employees) => {
    let amount = price
    for (const key of employees) {
      if (
        key.price !== '0' &&
        key.price !== '0.00' &&
        Number.parseFloat(key.price) < Number.parseFloat(amount)
      ) {
        amount = key.price
      }
    }
    return amount
  }

  const getMinutes = (value) => {
    const values = value.split(':')
    const minutes = Number.parseInt(values[0]) * 60 + Number.parseInt(values[1])
    return minutes
  }

  const getMinimumDuration = (duration, employees) => {
    if (duration) {
      let durationTime = getMinutes(duration.value)
      let time = duration
      for (const key of employees) {
        if (key.duration && getMinutes(key.duration) < durationTime) {
          durationTime = getMinutes(key.duration)
          time = durations.find((item) => item.value === key.duration)
        }
      }
      return time
    } else {
      return duration
    }
  }

  const listQueryVariables = () => {
    return {
      variables: {
        offset: paginateData.offset,
        limit: paginateData.limit,
        searchTerm: '%' + searchTerm + '%',
        fetchPolicy: 'network-only',
      },
    }
  }

  const listAggregateQueryVariables = () => {
    return {
      variables: {
        searchTerm: '%' + searchTerm + '%',
        fetchPolicy: 'network-only',
      },
    }
  }

  const { data, loading } = useServiceQuery(listQueryVariables())

  const { data: aggregateData } = useService_AggregateQuery(
    listAggregateQueryVariables()
  )

  const [addMutation] = useInsert_Service_OneMutation({
    onCompleted() {
      Notification(
        NotificationType.success,
        t('setup.services.servicestab.createservicesuccessfullymessage')
      )
    },
    onError(err) {
      Notification(
        NotificationType.error,
        t('setup.services.servicestab.createserviceerrormessages')
      )
    },
  })

  const [editMutation] = useUpdate_Service_By_PkMutation({
    onCompleted() {
      Notification(
        NotificationType.success,
        t('setup.services.servicestab.updateservicesuccessfullymessage')
      )
    },
    onError() {
      Notification(
        NotificationType.error,
        t('setup.services.servicestab.updateserviceerrormessages')
      )
    },
  })

  const [updateOrderMutation] = useUpdate_ServiceMutation({
    onError(err) {
      console.log(err)
      Notification(
        NotificationType.error,
        t('setup.services.servicestab.updateorder.error')
      )
    },
  })

  const GroupsItem = ({ onClick }) => {
    const [showOps, setShowOps] = useState(false)
    return (
      <div
        className={styles.groupsItem}
        onMouseEnter={() => setShowOps(true)}
        onMouseLeave={() => setShowOps(false)}
      >
        <span className="hidden-sm">
          {t('setup.services.servicestab.groups')}
        </span>
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
        title={t('setup.services.servicestab.all')}
        onEdit={() => {
          return
        }}
        onDelete={() => {
          return
        }}
      />
    </React.Fragment>,
    <React.Fragment key="Appointments">
      <TabMenuItem
        showActions={true}
        title={t('setup.services.servicestab.appointments')}
        onEdit={() => {
          setEditServiceGroupName('Appointments')
          setServiceGroupName('Appointments')
          setShowCreateGroup(true)
        }}
        onDelete={() => {
          setDeletingTab('Appointments')
          setDeleteTabModal(true)
        }}
      />
    </React.Fragment>,
  ])

  useEffect(() => {
    if (data) {
      setSourceData(data?.service)
    }
    if (aggregateData?.service_aggregate?.aggregate?.count) {
      setPaginateData({
        ...paginateData,
        total: aggregateData?.service_aggregate?.aggregate?.count,
        showingRecords: data?.service.length,
      })
    }
    if (!loading && data?.service) setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, aggregateData, loading])

  useEffect(() => {
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
                    setEditServiceGroupName(tab)
                    setServiceGroupName(tab)
                    setShowCreateGroup(true)
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
  }, [LeftTabs])

  useEffect(() => {
    if (serviceTableRef.current) {
      serviceTableRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [paginateData.currentPage, paginateData.limit])

  const handleSubmitServices = async (
    key,
    values,
    { resetForm },
    setShowModal
  ) => {
    setShowModal(false)
    delete values.apColors
    delete values.empData
    delete values.locData
    delete values.availableOnData
    delete values.showCoursePromotionMessage
    delete values.promotionView
    delete values.consultationType
    delete values.headAndNeckList
    delete values.bodyPartList
    delete values.showProductSellMessage
    delete values.showServiceSellMessage
    delete values.discount
    delete values.sellMessage
    delete values.sellProductMessage
    const newValues = {
      ...values,
      employeesData: values.employeesData.map((item) => ({
        name: item.name,
        price: item.price,
        duration: item.duration,
      })),
      locationData: values.locationData.map((item) => ({
        location: item.location,
        price: item.price,
      })),
      contractData: values.contractData.map((item) => ({
        name: item.name,
        price: item.price,
      })),
      bundleItems: values.bundleItems.map((item) => item.id),
    }
    key
      ? await editMutation({
          variables: newValues,
          optimisticResponse: {},
          refetchQueries: [
            {
              query: ServiceDocument,
              ...listQueryVariables(),
            },
            {
              query: Service_AggregateDocument,
              ...listAggregateQueryVariables(),
            },
          ],
        })
      : await addMutation({
          variables: newValues,
          optimisticResponse: {},
          refetchQueries: [
            {
              query: ServiceDocument,
              ...listQueryVariables(),
            },
            {
              query: Service_AggregateDocument,
              ...listAggregateQueryVariables(),
            },
          ],
        })
    resetForm()
    setEditData(null)
    onCloseCreateServiceModal()
  }

  const updateOrder = async (values) => {
    await updateOrderMutation({
      variables: values,
      optimisticResponse: {},
      refetchQueries: [
        {
          query: ServiceDocument,
          ...listQueryVariables(),
        },
      ],
    })
  }

  const onPaginationChange = (currentPage, limit) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({
      ...paginateData,
      offset,
      limit,
      currentPage: currentPage,
    })
  }

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

  const deleteTab = () => {
    const totalTabs = [...leftTabs]
    const tabData = totalTabs.find((el) => el.key === deletingTab)
    const index = totalTabs.indexOf(tabData)
    if (index !== -1) {
      totalTabs.splice(index, 1)
      setLeftTabs(totalTabs)
    }
    Notification(
      NotificationType.success,
      t('setup.services.servicestab.deletetab.notification')
    )
    setDeleteTabModal(false)
  }

  const createTab = () => {
    if (serviceGroupName) {
      const totalTabs = [...leftTabs]
      totalTabs.push(
        <React.Fragment key={serviceGroupName}>
          <TabMenuItem
            showActions={true}
            title={serviceGroupName}
            onEdit={() => {
              setEditServiceGroupName(serviceGroupName)
              setServiceGroupName(serviceGroupName)
              setShowCreateGroup(true)
            }}
            onDelete={() => {
              setDeletingTab(serviceGroupName)
              setDeleteTabModal(true)
            }}
          />
        </React.Fragment>
      )
      setLeftTabs(totalTabs)
      setServiceGroupName(null)
      setShowCreateGroup(false)
      setSelectedImage('')
    }
  }

  const updateTab = () => {
    if (
      serviceGroupName &&
      editServiceGroupName &&
      serviceGroupName !== editServiceGroupName
    ) {
      const totalTabs = [...leftTabs]
      console.log(totalTabs)
      const element = totalTabs.find((el) => el.key === editServiceGroupName)
      const editTab = (
        <React.Fragment key={serviceGroupName}>
          <TabMenuItem
            showActions={true}
            title={serviceGroupName}
            onEdit={() => {
              setEditServiceGroupName(serviceGroupName)
              setServiceGroupName(serviceGroupName)
              setShowCreateGroup(true)
            }}
            onDelete={() => {
              setDeletingTab(serviceGroupName)
              setDeleteTabModal(true)
            }}
          />
        </React.Fragment>
      )
      totalTabs.splice(totalTabs.indexOf(element), 1, editTab)
      setLeftTabs(totalTabs)
      setServiceGroupName(null)
      setShowCreateGroup(false)
      setSelectedImage('')
    } else {
      setServiceGroupName(null)
      setShowCreateGroup(false)
      setSelectedImage('')
    }
  }

  return (
    <Services
      serviceTableRef={serviceTableRef}
      setSelectedService={setSelectedService}
      selectedService={selectedService}
      setTableView={setTableView}
      selectedToggleView={selectedToggleView}
      setDeleteTabModal={setDeleteTabModal}
      leftTabs={leftTabs}
      isLoading={isLoading}
      sourceData={sourceData}
      searchTerm={searchTerm}
      columns={columns}
      paginateData={paginateData}
      setPaginateData={setPaginateData}
      onPaginationChange={onPaginationChange}
      setEditData={setEditData}
      updateOrder={updateOrder}
      setSourceData={setSourceData}
      showCreateServiceModal={showCreateServiceModal}
      onOpenCreateServiceModal={onOpenCreateServiceModal}
      onCloseCreateServiceModal={onCloseCreateServiceModal}
      editData={editData}
      handleSubmitServices={handleSubmitServices}
      serviceGroupName={serviceGroupName}
      setServiceGroupName={setServiceGroupName}
      showImageSelector={showImageSelector}
      setShowImageSelector={setShowImageSelector}
      updateTab={updateTab}
      createTab={createTab}
      setDeletingTab={setDeletingTab}
      deletingTab={deletingTab}
      openDeleteTabModal={openDeleteTabModal}
      deleteTab={deleteTab}
      showCreateGroup={showCreateGroup}
      setShowCreateGroup={setShowCreateGroup}
      selectedImage={selectedImage}
      setSelectedImage={setSelectedImage}
      locations={locations}
      services={services}
      togglesViews={togglesViews}
      bookingDays={bookingDays}
      equipment={equipment}
      rooms={rooms}
      contracts={contracts}
      paginationState={paginationState}
      editServiceGroupName={editServiceGroupName}
      setEditServiceGroupName={setEditServiceGroupName}
    />
  )
}

export default ServiceLayout
