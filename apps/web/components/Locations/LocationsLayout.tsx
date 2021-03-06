import { ContactsOutlined, EditFilled } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Company_Branches_Attachments_Type,
  LocationsDocument,
  LocationsQueryVariables,
  useGetLastOrderQuery,
  useGetLocationStaffListLazyQuery,
  useInsertLocationMutation,
  useListEmployeeQueryQuery,
  useLocationsQuery,
  useUpdateLocationMutation,
  useUpdateLocationsOrderMutation,
  useLocationLimitQuery,
  useActiveLocationCountQuery,
} from '@pabau/graphql'
import {
  AvatarList,
  Breadcrumb,
  Button,
  Employees,
  FullScreenReportModal,
  Notification,
  NotificationType,
  OperationType,
} from '@pabau/ui'
import { Avatar, Col, Image, Row, Skeleton, Tooltip, Typography } from 'antd'
import classNames from 'classnames'
import { Formik } from 'formik'
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import * as Yup from 'yup'
import searchEmpty from '../../assets/images/empty.png'
import LogoSvg from '../../assets/images/logo.svg'
import { useUser } from '../../context/UserContext'
import CommonHeader from '../../components/CommonHeader'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { getBadgesList } from '../../mocks/Locations'
import AddButton from '../AddButton'
import Layout from '../Layout/Layout'
import Badges, { Badge } from './Badges'
import CustomFilter from './CustomFilter'
import General from './General'
import LocationDetails from './LocationDetails'
import styles from './LocationsLayout.module.less'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import postData, { getImage } from '../Uploaders/UploadHelpers/UploadHelpers'
import { cdnURL } from '../../baseUrl'

const { Title } = Typography
const iconList = Object.keys(Icons)
  .filter((key) => key !== 'fas' && key !== 'prefix')
  .map((icon) => Icons[icon])
library.add(...iconList)

interface P {
  schema: Schema
}

export interface Position {
  lng: number
  lat: number
}

interface EmployeeListProps {
  id?: number
  name: string
  selected: boolean
}

interface ListLocationQueryVariable {
  variables: LocationsQueryVariables
}

export interface InitialLocationProps {
  id: string
  name: string
  phone: string
  email: string
  website: string
  hasCalender: boolean
  bookable: boolean
  showOnline: boolean
  address: string
  street: string
  postcode: string
  employees: EmployeeListProps[]
  badges: string[]
  position: Position
  isActive: boolean
  city?: string
  region?: string
  country?: string
  location?: string
  imageUrl?: string
  imageData?: string
}

const createLocationOperation = [OperationType.active, OperationType.create]

const editLocationOperation = [OperationType.active, OperationType.create]

interface TabProps {
  values?: InitialLocationProps
  employeeListData?: EmployeeListProps[]
  badgeListData?: Badge[]
  setFieldValue(
    field: keyof InitialLocationProps,
    values: string | string[] | boolean | number
  ): void
}

const setListValues = (key, list, setter) => {
  const record = []
  for (const item of list) {
    if (item.selected) {
      record.push({
        id: item.id,
        name: item.name,
      })
    }
  }
  setter(key, record)
}

const EmployeesTab: FC<TabProps> = ({ setFieldValue, employeeListData }) => {
  const onSelected = (value) => {
    setListValues('employees', value, setFieldValue)
  }

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.contentBox}>
        <Employees employees={employeeListData} onSelected={onSelected} />
      </div>
    </div>
  )
}

const BadgesTab: FC<TabProps> = ({ setFieldValue, badgeListData }) => {
  const onSelected = (value) => {
    const badges = []
    for (const item of value) {
      if (item.selected) {
        badges.push({ name: item.name, icon: item.icon })
      }
    }
    setFieldValue('badges', badges)
  }

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.contentBox}>
        <Badges badges={badgeListData} onSelected={onSelected} />
      </div>
    </div>
  )
}

const defaultValue: InitialLocationProps = {
  id: '',
  name: '',
  phone: '',
  email: '',
  website: '',
  hasCalender: true,
  bookable: true,
  showOnline: true,
  address: '',
  street: '',
  postcode: '',
  location: '',
  city: '',
  country: '',
  region: '',
  employees: [],
  badges: [],
  position: {
    lat: 0,
    lng: 0,
  },
  isActive: true,
  imageUrl: '',
  imageData: '',
}

const LocationsLayout: FC<P> = ({ schema }) => {
  const { t } = useTranslationI18()
  const { badgesList } = getBadgesList(t)
  const [initialValues, setInitialValues] = useState<InitialLocationProps>(
    defaultValue
  )
  const [employeeListData, setEmployeeListData] = useState<EmployeeListProps[]>(
    []
  )
  const [badgeListData, setBadgeListData] = useState<Badge[]>([...badgesList])
  const [createLocationModal, setCreateLocationModal] = useState(false)
  const [isActive, setIsActive] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [tags, setTags] = useState([])
  const [locationIds, setLocationIds] = useState([])
  const [allowedLocationCount, setAllowedLocationCount] = useState<number>()
  const [activeLocation, setActiveLocation] = useState<number>()
  const [activeLocationLoading, setActiveLocationLoading] = useState(true)

  const user = useUser()
  const filterFormRef = useRef(null)

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('setup.locations.general.name.required'))
      .max(50, t('setup.locations.general.name.max.validation.message'))
      .matches(
        /^[\w!#$%&()*+.=@^-\s]+$/g,
        t('setup.locations.general.name.should.be.letters')
      ),
    email: Yup.string().email(t('setup.locations.general.email.invalid')),
  })

  const getQueryVariables = useMemo(() => {
    let queryOptions: ListLocationQueryVariable = {
      variables: {
        isActive,
        searchTerm: '%' + searchTerm + '%',
        filter: {
          every: {
            AND: [],
          },
        },
      },
    }

    if (tags.length > 0) {
      const filterData = []
      for (const tag of tags) {
        filterData.push({
          description: {
            contains: tag,
          },
        })
      }
      queryOptions = {
        variables: {
          ...queryOptions.variables,
          filter: {
            every: {
              type: { equals: Company_Branches_Attachments_Type['AntdBadge'] },
            },
            some: {
              OR: filterData,
            },
          },
        },
      }
    }
    return queryOptions
  }, [searchTerm, isActive, tags])

  const getStaffQueryVariables = useMemo(() => {
    const location = []
    for (const id of locationIds) {
      location.push({
        Location: { contains: id.toString() },
      })
    }
    const queryOptions = {
      variables: {
        location,
      },
    }
    return queryOptions
  }, [locationIds])

  const { data, loading } = useLocationsQuery({
    ...getQueryVariables,
    fetchPolicy: 'network-only',
  })

  const { data: employeeDataResponse } = useListEmployeeQueryQuery()
  const { data: lastOrder, refetch } = useGetLastOrderQuery()
  const {
    data: locationLimit,
    loading: locationLimitLoading,
  } = useLocationLimitQuery()
  const {
    data: activeLocationCount,
    refetch: refetchActiveLocationCount,
    loading: activeLoading,
  } = useActiveLocationCountQuery()

  const [
    loadStaffList,
    { data: staffData, loading: staffDataLoading },
  ] = useGetLocationStaffListLazyQuery({
    ...getStaffQueryVariables,
    fetchPolicy: 'network-only',
  })

  const [locationData, setLocationData] = useState(null)

  useEffect(() => {
    if (data?.findManyCompanyBranch && !loading) {
      const locationIds = []
      for (const item of data?.findManyCompanyBranch) {
        locationIds.push(item.id)
      }
      setLocationIds(locationIds)
      setLocationData(data?.findManyCompanyBranch)
      loadStaffList()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading])

  useEffect(() => {
    if (employeeDataResponse?.findManyCmStaffGeneral) {
      const employeeData = []
      for (const item of employeeDataResponse.findManyCmStaffGeneral) {
        employeeData.push({
          id: item.id,
          name: `${item.Fname} ${item.Lname}`,
          selected: false,
          avatar: item?.User?.image && getImage(item?.User?.image),
        })
      }
      setEmployeeListData(employeeData)
    }
  }, [employeeDataResponse])

  useEffect(() => {
    if (staffData?.findManyCmStaffGeneral && !staffDataLoading) {
      const locationRecord = []
      for (const item of locationData) {
        const assignedUserData = []
        for (const staff of staffData?.findManyCmStaffGeneral) {
          if (staff?.Location?.includes(item.id.toString())) {
            assignedUserData.push({
              id: staff.id,
              name: `${staff.Fname} ${staff.Lname}`,
              avatarUrl: staff?.User?.image && getImage(staff?.User?.image),
            })
          }
        }
        locationRecord.push({
          ...item,
          AssignedUser: assignedUserData,
        })
      }
      setLocationData(locationRecord)
    }
    if (!staffDataLoading) {
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staffData, staffDataLoading])

  useEffect(() => {
    if (locationLimit?.findManyCompanySubscription) {
      setAllowedLocationCount(
        locationLimit?.findManyCompanySubscription?.[0]['multiple_locations']
      )
    }
  }, [locationLimit])

  useEffect(() => {
    if (activeLocationCount?.findManyCompanyBranchCount) {
      setActiveLocation(activeLocationCount?.findManyCompanyBranchCount)
    }
    setActiveLocationLoading(activeLoading)
  }, [activeLocationCount, activeLoading])

  const [updateOrderMutation] = useUpdateLocationsOrderMutation()

  const resetBadgesList = () => {
    const resetBadgeList = badgesList.map((bdg) => ({
      ...bdg,
      selected: false,
    }))
    setBadgeListData([...resetBadgeList])
  }

  const resetEmployeeList = () => {
    const resetEmmplyeeList = employeeListData.map((emp) => ({
      ...emp,
      selected: false,
    }))
    setEmployeeListData(resetEmmplyeeList)
  }

  const onFilterLocations = () => {
    filterFormRef?.current?.submitForm()
  }

  const onResetFilter = () => {
    filterFormRef?.current?.resetForm()
  }

  const onDragEnd = (result) => {
    const { destination, source } = result

    const sorceIndex = source.index
    const destinationIndex = destination.index

    const items = reorder(locationData, source.index, destination.index)
    let isCustomOrder = false
    for (const item of locationData) {
      if (item.order === 0) {
        isCustomOrder = true
      }
    }
    if (isCustomOrder) {
      const totalRecord = locationData.length
      const lastOrderValue = lastOrder?.findManyCompanyBranch?.[0].loc_order
      const newData = []
      for (const [index, item] of items.entries()) {
        newData.push({
          ...item,
          order: lastOrderValue + totalRecord - index,
        })
      }
      for (let i = 0; i <= newData.length; i++) {
        updateOrder(newData[i])
      }
      setLocationData(newData)
    } else {
      const newData = items.map((locItem: any, i) => {
        locItem.order = locationData[i].order
        return locItem
      })

      if (sorceIndex > destinationIndex) {
        for (let i = destinationIndex; i <= sorceIndex; i++) {
          updateOrder(newData[i])
        }
      } else {
        for (let i = sorceIndex; i <= destinationIndex; i++) {
          updateOrder(newData[i])
        }
      }
      setLocationData(newData)
    }
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = [...list]

    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return JSON.parse(JSON.stringify(result))
  }

  const updateOrder = async (values) => {
    if (values?.id)
      await updateOrderMutation({
        variables: values,
        refetchQueries: [
          {
            query: LocationsDocument,
            ...getQueryVariables,
          },
        ],
      })
  }

  const [addMutation] = useInsertLocationMutation({
    onCompleted(data) {
      Notification(NotificationType.success, schema.messages.create.success)
    },
    onError(err) {
      Notification(NotificationType.error, schema.messages.create.error)
    },
  })

  const [editMutation] = useUpdateLocationMutation({
    onCompleted(data) {
      Notification(NotificationType.success, schema.messages.update.success)
    },
    onError(err) {
      Notification(NotificationType.error, schema.messages.update.error)
    },
  })

  const setEmployeeData = (records: EmployeeListProps[]) => {
    const ids = []
    for (const record of records) {
      ids.push(record.id)
    }
    const data = employeeListData.map((value) => {
      if (ids.includes(value.id)) {
        value.selected = true
      } else {
        value.selected = false
      }
      return value
    })
    return data
  }

  const setBadgesData = (badges) => {
    let data = [...badgesList]
    const addedBadges = []
    const foundedList = []
    for (const badge of badges) {
      let found = false
      for (const item of data) {
        if (item.name.includes(badge.name)) {
          found = true
          foundedList.push(item.name)
          item.selected = true
        } else if (!foundedList.includes(item.name)) {
          item.selected = false
        }
      }
      if (!found) {
        addedBadges.push({ ...badge, selected: true })
      }
    }
    data = [...data, ...addedBadges]
    return data
  }

  const createNew = () => {
    setCreateLocationModal((e) => !e)
    setInitialValues(defaultValue)
    resetBadgesList()
    resetEmployeeList()
  }

  const onEditLocation = (location) => {
    const employees = []
    for (const item of location.AssignedUser) {
      employees.push({
        id: item.id,
        name: `${item.Fname} ${item.Lname}`,
      })
    }
    location.employees = employees
    location.position = {
      lat: location.lat,
      lng: location.lng,
    }
    const badges = []
    for (const item of location.AssignedBadge) {
      item.type === 'antd_badge' &&
        badges.push({
          icon: item.icon,
          name: item.name,
        })
    }
    location.badges = badges
    setInitialValues(location)
    setCreateLocationModal((e) => !e)
  }

  useEffect(() => {
    if (initialValues.employees.length > 0) {
      const updatedEmpList = setEmployeeData(initialValues.employees)
      setEmployeeListData(updatedEmpList)
    } else {
      resetEmployeeList()
    }

    if (initialValues?.badges?.length > 0) {
      const updatedBdgList = setBadgesData(initialValues.badges)
      setBadgeListData([...updatedBdgList])
    } else {
      resetBadgesList()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues])

  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    setSubmitting(true)
    if (values.isActive && !(allowedLocationCount > activeLocation)) {
      setCreateLocationModal((e) => !e)
      resetForm()
      return Notification(
        NotificationType.error,
        t('setup.locations.location.limit.error')
      )
    }
    const badges = []
    for (const item of values.badges) {
      badges.push({
        icon: item.icon.iconName ?? item.icon,
        name: item.name,
      })
    }
    let imageLink
    if (values.imageData) {
      const data = await postData(
        cdnURL + '/api/upload.php',
        {
          mode: 'upload-cropped-photo',
          imageData: values.imageData,
          section: 'avatar_photos',
          type: 'file_attachments',
        },
        null
      )
      if (data.error) {
        Notification(NotificationType.error, t(data.code))
        return
      } else {
        imageLink = data.path
      }
    }

    const variables = {
      ...values,
      image: imageLink ?? values.imageUrl ?? '',
      lat: values.position.lat,
      lng: values.position.lng,
      isActive: values.isActive ? 1 : 0,
      bookable: values.bookable ? 1 : 0,
      hasCalender: values.hasCalender ? 1 : 0,
      showOnline: values.showOnline ? 1 : 0,
      badges,
    }
    delete variables.position
    await (values.id
      ? editMutation({
          variables,
          optimisticResponse: {},
          refetchQueries: [
            {
              query: LocationsDocument,
              ...getQueryVariables,
            },
          ],
        })
      : addMutation({
          variables,
          optimisticResponse: {},
          refetchQueries: [
            {
              query: LocationsDocument,
              ...getQueryVariables,
            },
          ],
        }))
    setSubmitting(false)
    resetForm()
    setCreateLocationModal((e) => !e)
    refetchActiveLocationCount()
    if (values.id || variables.isActive === isActive) {
      setIsLoading(true)
    }
  }

  const onSearch = async (val) => {
    if (val !== searchTerm) {
      setIsLoading(true)
      setSearchTerm(val)
    }
  }

  const onFilter = (values) => {
    setIsLoading(true)
    setIsActive(values.status === 'active' ? 1 : 0)
    setTags(values.tags)
    refetch()
  }

  const renderFilter = () => (
    <CustomFilter onFilter={onFilter} formRef={filterFormRef} />
  )

  const bindLocation = (location) => {
    const prepareAddress = []
    const addressFields = ['street', 'location', 'city', 'country']

    for (const item of addressFields) {
      if (location?.[item]) {
        prepareAddress.push(location?.[item])
      }
    }

    return prepareAddress.join(', ')
  }

  const SkeletonInput = () => {
    return (
      <Skeleton.Input
        active={true}
        size={'small'}
        style={{ width: 25, height: 20 }}
      />
    )
  }

  return (
    <Layout {...user} requireAdminAccess={true}>
      <CommonHeader
        isLeftOutlined
        reversePath="/setup"
        title={schema.full || schema.short}
        isShowSearch
        handleSearch={onSearch}
        searchInputPlaceHolder={schema?.searchPlaceholder}
        searchValue={searchTerm}
      >
        <AddButton
          onClick={createNew}
          onFilterSource={onFilterLocations}
          schema={schema}
          tableSearch={false}
          isCustomFilter={true}
          onResetFilter={onResetFilter}
          customFilter={renderFilter}
          isCreateButtonVisible={allowedLocationCount > activeLocation}
        />
      </CommonHeader>
      <div
        className={classNames(styles.tableMainHeading, styles.mobileViewNone)}
      >
        <div style={{ background: '#FFF' }}>
          <Breadcrumb
            items={[
              {
                breadcrumbName: t('navigation-breadcrumb-setup'),
                path: 'setup',
              },
              { breadcrumbName: schema.full || schema.short, path: '' },
            ]}
          />
          <Title>{schema.full || schema.short}</Title>
        </div>

        <AddButton
          onClick={createNew}
          onFilterSource={onFilterLocations}
          onSearch={onSearch}
          schema={schema}
          tableSearch={true}
          isCustomFilter={true}
          customFilter={renderFilter}
          searchTerm={searchTerm}
          isCreateButtonVisible={allowedLocationCount > activeLocation}
        />
      </div>
      <div className={styles.locationContainer}>
        <div className={styles.locationTitle}>
          <div className={styles.allowContent}>
            <h5>{t('setup.locations.allowed.location.label')}</h5>
            <Tooltip
              title={t('setup.locations.allowed.location.tooltip.label')}
            >
              <QuestionCircleOutlined /> :
            </Tooltip>
            <div>
              <div className={styles.displayCount}>
                {locationLimitLoading ? (
                  <SkeletonInput />
                ) : (
                  allowedLocationCount
                )}
              </div>
            </div>
          </div>
          <div className={styles.allowContent}>
            <h5>{t('setup.locations.active.location.label')}</h5>
            <span>:</span>
            <div>
              <div className={styles.displayCount}>
                {activeLocationLoading ? <SkeletonInput /> : activeLocation}
              </div>
            </div>
          </div>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {isLoading ? (
                  ['1', '2', '3'].map((item, index) => (
                    <Row className={styles.locationRow} key={index}>
                      <Col
                        md={4}
                        style={{ width: '100%' }}
                        className={styles.locationImg}
                      >
                        <Skeleton.Input active={true} size={'large'} />
                      </Col>
                      <Col md={20} className={styles.locationText}>
                        <div className={styles.locationDetailBox}>
                          <div className={styles.avtarWrapper}>
                            <Skeleton.Input active={true} size={'large'} />
                          </div>
                          <div className={styles.locationTextStyle}>
                            <Skeleton.Input active={true} size={'small'} />
                            <Skeleton.Input active={true} size={'small'} />
                            <Skeleton.Button active={true} size={'small'} />
                            <Skeleton.Button active={true} size={'small'} />
                          </div>
                        </div>
                      </Col>
                    </Row>
                  ))
                ) : !locationData?.length && !searchTerm ? (
                  <div className={styles.noDataTableBox}>
                    <Avatar
                      icon={<ContactsOutlined />}
                      size="large"
                      className={styles.roundDesign}
                    />
                    <p>{t(schema.noDataText)}</p>
                    <div className={styles.spaceBetweenText} />
                    {allowedLocationCount > activeLocation && (
                      <Button
                        className={styles.createTemaplateBtn}
                        type="primary"
                        onClick={createNew}
                      >
                        {t(schema.createButtonLabel)}
                      </Button>
                    )}
                  </div>
                ) : !locationData?.length && searchTerm ? (
                  <div className={styles.noSearchResult}>
                    <Image src={searchEmpty} preview={false} />
                    <p className={styles.noResultsText}>
                      {t('crud-table-no-search-results')}
                    </p>
                    <p className={styles.tryAdjustText}>
                      {t('crud-table-try-adjust')}
                    </p>
                  </div>
                ) : (
                  locationData?.map((location, index) => {
                    return (
                      <Draggable
                        className={styles.locationRow}
                        key={location.id}
                        index={index}
                        draggableId={location.id.toString()}
                      >
                        {(provided, snapshot) => (
                          <Row
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            key={location.id}
                            className={styles.locationRow}
                          >
                            <Col
                              md={4}
                              style={{ width: '100%' }}
                              className={styles.locationImg}
                            >
                              <Image
                                width="100%"
                                preview={false}
                                fallback={LogoSvg}
                                src={
                                  location.imageUrl
                                    ? getImage(location?.imageUrl)
                                    : 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                                }
                              />
                            </Col>
                            <Col md={20} className={styles.locationText}>
                              <div className={styles.locationDetailBox}>
                                <div className={styles.avtarWrapper}>
                                  <AvatarList
                                    size={'small'}
                                    users={location.AssignedUser}
                                    isLoading={false}
                                  />
                                </div>
                                <div className={styles.locationTextStyle}>
                                  <h1>{location?.name}</h1>
                                  <p>{bindLocation(location)}</p>
                                  {location.isActive === 1 ? (
                                    <div>
                                      <Button className={styles.activeBtn}>
                                        {t('common-label-active')}
                                      </Button>
                                    </div>
                                  ) : (
                                    <div>
                                      <Button
                                        className={styles.disableSourceBtn}
                                        disabled={true}
                                      >
                                        {t('common-label-inactive')}
                                      </Button>
                                    </div>
                                  )}
                                  <div className={styles.locationIcon}>
                                    {location?.AssignedBadge?.map(
                                      (badge) =>
                                        badge.type === 'antd_badge' && (
                                          <Tooltip
                                            title={badge.name}
                                            key={badge.name}
                                          >
                                            <FontAwesomeIcon
                                              color={'#9292A3'}
                                              size="1x"
                                              icon={badge.icon}
                                            />
                                          </Tooltip>
                                        )
                                    )}
                                  </div>
                                </div>
                                <div
                                  onClick={() => {
                                    onEditLocation(location)
                                  }}
                                  className={styles.locationIconBox}
                                >
                                  <Avatar
                                    className={styles.locationEditIcon}
                                    size="large"
                                    style={{ display: 'flex' }}
                                    icon={
                                      <EditFilled
                                        style={{
                                          color: '#fff',
                                          fontSize: 18,
                                        }}
                                      />
                                    }
                                  />
                                  <span>{t('common-label-edit')}</span>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        )}
                      </Draggable>
                    )
                  })
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          setFieldValue,
          handleSubmit,
          values,
          isValid,
          dirty,
          isSubmitting,
        }) => (
          <FullScreenReportModal
            title={
              values.id
                ? t('setup.locations.edit.modal.title')
                : t('setup.locations.header.create.title')
            }
            activated={values.isActive}
            onActivated={(value) => setFieldValue('isActive', value)}
            onCreate={handleSubmit}
            visible={createLocationModal}
            onBackClick={() => {
              setCreateLocationModal((e) => !e)
              setInitialValues(defaultValue)
            }}
            onClose={() => {
              setCreateLocationModal((e) => !e)
              setInitialValues(defaultValue)
            }}
            onSave={handleSubmit}
            enableCreateBtn={isValid && dirty && !isSubmitting}
            operations={
              values.id ? editLocationOperation : createLocationOperation
            }
            createBtnText={
              values.id ? t('common-label-save') : t('common-label-create')
            }
            deleteBtnText={t('common-label-delete')}
            activeBtnText={
              values.isActive
                ? t('common-label-active')
                : t('common-label-inactive')
            }
            subMenu={[
              t('setup.locations.submenu.general'),
              t('setup.locations.title.short'),
              t('setup.locations.submenu.employees'),
              t('setup.locations.submenu.badges'),
            ]}
          >
            <General setFieldValue={setFieldValue} values={values} />
            <LocationDetails setFieldValue={setFieldValue} values={values} />
            <EmployeesTab
              setFieldValue={setFieldValue}
              values={values}
              employeeListData={employeeListData}
            />
            <BadgesTab
              values={values}
              setFieldValue={setFieldValue}
              badgeListData={badgeListData}
            />
          </FullScreenReportModal>
        )}
      </Formik>
    </Layout>
  )
}

export default LocationsLayout
