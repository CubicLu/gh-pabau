import React, {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react'
import Layout from '../../components/Layout/Layout'
import ActivitiesHeader from '../../components/Activities/ActivitiesHeader'
import {
  FilterDataProps,
  FilterDataObjectType,
} from '../../components/Activities/CreateFilterModal'
import ActivitiesTable from '../../components/Activities/ActivitiesTable'
import { OptionList } from '../../components/Activities/FilterMenu'
import {
  ActivityTypeFilter,
  CreateActivity,
  DataProps,
} from '../../components/Activities/CreateActivity'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Tabs, Tooltip, Popover, Skeleton } from 'antd'
import { RangePicker } from '@pabau/ui'
import styles from './index.module.less'
import dayjs, { Dayjs } from 'dayjs'
import classNames from 'classnames'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import CommonHeader from '../../components/CommonHeader'
import { useMedia } from 'react-use'
import confetti from 'canvas-confetti'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import * as Icon from '@ant-design/icons'
import {
  useGetActivityTypesQuery,
  useActivityUserListQuery,
  useFindManyActivityDataLazyQuery,
  useFindFirstActivityUserStateQuery,
  useGetMarketingSourcesQuery,
  useGetLeadStatusQuery,
  useRetrievePipelineQuery,
  useGetActiveLocationQuery,
  Activity_Status,
  User,
  useRetrieveSalutationAndStageQuery,
  useGetCmLabelsQuery,
} from '@pabau/graphql'
import utc from 'dayjs/plugin/utc'
import { useUser } from '../../context/UserContext'
import { PlusSquareFilled } from '@ant-design/icons'
dayjs.extend(utc)

const { TabPane } = Tabs
/* eslint-disable-next-line */
export interface IndexProps {
  client?: ApolloClient<NormalizedCacheObject>
}

export interface ActivitiesDataProps {
  id: number
  dueDate?: string
  dueEndDate?: string
  type_name?: string
  type_badge?: string
  subject?: string
  client?: clientDetail
  lead?: leadDetail
  assigned?: userDetail
  status?: string
  doneTime?: string
  duration?: number
  activityLead?: string
  note?: string
  freeBusy?: string
  creator?: string
  addTime?: string
  lead_id?: number
  contact_id?: number
}

interface userDetail {
  full_name?: string
}

interface LabelItem {
  id: number
  name: string
  color?: string
}

interface CmLabel {
  id: number
  CmLabel: LabelItem
}

interface clientDetail {
  firstName?: string
  lastName?: string
  label?: CmLabel[]
  email?: string
  phone?: string
  street?: string
  city?: string
  postcode?: string
  totalActivities?: number
}

interface ownerDetail {
  full_name?: string
}

interface leadDetail {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  dueDate?: string
  dueEndDate?: string
  createdDate?: string
  wonTime?: string
  owner?: ownerDetail
  leadDoneActivities?: number
  leadClosedOn?: string
  firstActivityTime?: number
  leadLastActivityDate?: string
  leadLastActivity?: number
  leadTotalActivities?: number
  leadLostId?: number
  leadLostTime?: Date
  leadLostReason?: string
  leadSource?: string
  wonBy?: User
}

const tabs = {
  toDo: 'To do',
  overdue: 'Overdue',
  today: 'Today',
  tomorrow: 'Tomorrow',
  thisWeek: 'This week',
  nextWeek: 'Next week',
  completed: 'Completed',
  selectPeriod: 'Select period',
}

export const filterTabsObj = {
  all: 'all',
  call: 'Call',
  meeting: 'Meeting',
  message: 'Message',
  email: 'Email',
}

export const statuses = {
  working_on: 'Working on',
  reopened: 'Reopened',
  pending: 'Pending',
  done: 'Done',
  awaiting: 'Awaiting',
}

interface EventsData {
  id: number
  title: string
  type: string
  start: string
  end: string
}

// interface EditedData {
//   subject: string
//   startDate: Dayjs
//   endDate: Dayjs
//   startTime: Dayjs
//   endTime: Dayjs
//   freeBusy: string
//   notes: string
//   user: string
//   lead: string
//   client: string
//   isDone: boolean
// }

export interface Labels {
  label?: string
  count?: number
  color?: string
}

export interface OrderValue {
  field: string
  order: string
}

const WAIT_INTERVAL = 400

export const Index: FC<IndexProps> = ({ client }) => {
  const { t } = useTranslationI18()
  const activityRef = useRef(null)
  const isMobile = useMedia('(max-width: 768px)')
  const [sourceData, setSourceData] = useState([])
  const [tabValue, setTabValue] = useState(tabs.toDo)
  const loggedUser = useUser()
  const [progressBarData, setProgressBarData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [openPicker, setOpenPicker] = useState(false)
  const [selectedDates, setSelectedDates] = useState<Dayjs[]>([])
  const [createActivityVisible, setCreateActivityVisible] = useState(false)
  const [events, setEvents] = useState<EventsData[]>([])
  const [selectFilterUser, setSelectFilterUser] = useState<number[]>([])
  const [personsList, setPersonsList] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [editData, setEditData] = useState<DataProps>()
  const [labels, setLabels] = useState<Labels[]>([])
  const [filterActivityType, setFilterActivityType] = useState<
    ActivityTypeFilter[]
  >([])
  const [activityTypeOption, setActivityTypeOption] = useState<
    ActivityTypeFilter[]
  >([])
  const [selectedActivityType, setSelectedActivityType] = useState<string[]>()
  const [filterDates, setFilterDates] = useState<Dayjs[]>([dayjs(), dayjs()])
  const [searchTerm, setSearchTerm] = useState('')
  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 50,
    currentPage: 1,
    showingRecords: 0,
  })
  const [userFilterData, setUserFilterData] = useState<FilterDataProps>({})
  const [activityTypeLoading, setActivityTypeLoading] = useState<boolean>(true)
  const [selectedColumn, setSelectedColumn] = useState<string[]>([])
  const [userActiveColumn, setUserActiveColumn] = useState<string[]>([])
  const [orderValue, setOrderValue] = useState<OrderValue>({
    field: 'Due date',
    order: 'asc',
  })
  const [
    filterDataObject,
    setFilterDataObject,
  ] = useState<FilterDataObjectType>()
  const [userColumns, setUserColumns] = useState<string[]>([])
  const [leadSourceData, setLeadSourceData] = useState<OptionList[]>([])
  const [leadStageData, setLeadStageData] = useState<OptionList[]>([])
  const [pipelineData, setPipelineData] = useState<OptionList[]>([])
  const [locationData, setLocationData] = useState<OptionList[]>([])
  const [salutationData, setSalutationData] = useState<OptionList[]>([])
  const [pipelineStageData, setPipelineStageData] = useState<OptionList[]>([])
  const eventDateFormat = 'D MMMM YYYY hh:mm'

  const getQueryVariables = useMemo(() => {
    const queryOptions = {
      variables: {
        search: `%${searchTerm}%`,
        skip: paginateData.offset,
        limit: paginateData.limit,
        startDate: filterDates?.[0],
        endDate: filterDates?.[1],
        status: [
          Activity_Status.Reopened,
          Activity_Status.Pending,
          Activity_Status.WorkingOn,
          Activity_Status.Awaiting,
        ],
        activityType: selectedActivityType,
        userId: selectFilterUser,
        activeColumns: selectedColumn,
        filterOption: filterDataObject,
        orderValue,
      },
    }
    if (!searchTerm) {
      delete queryOptions.variables.search
      delete queryOptions.variables.activeColumns
    }
    if (!filterDataObject) {
      delete queryOptions.variables.filterOption
    }
    if (selectFilterUser.length === 0) {
      delete queryOptions.variables.userId
    }
    if (tabValue === 'To do') {
      delete queryOptions.variables.startDate
      delete queryOptions.variables.endDate
    }
    if (tabValue === 'Overdue') {
      delete queryOptions.variables.startDate
    }

    if (tabValue === 'Completed') {
      delete queryOptions.variables.startDate
      delete queryOptions.variables.endDate
      queryOptions.variables.status = [Activity_Status.Done]
    }
    return queryOptions
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    searchTerm,
    filterDates,
    selectedActivityType,
    paginateData.offset,
    paginateData.limit,
    selectFilterUser,
    orderValue,
    filterDataObject,
  ])

  const {
    data: activityActiveResponse,
    loading: activityActiveLoading,
  } = useFindFirstActivityUserStateQuery()

  const {
    loading: filterLoading,
    data: filterData,
  } = useGetActivityTypesQuery()
  const { data: userListData } = useActivityUserListQuery({
    variables: {
      isDeleted: 0,
    },
  })

  const [
    loadActivityData,
    {
      data: activityResponse,
      loading: activityDataLoading,
      refetch: activityRefetch,
    },
  ] = useFindManyActivityDataLazyQuery({
    ...getQueryVariables,
    fetchPolicy: 'no-cache',
  })

  const { data: leadSourceResponse } = useGetMarketingSourcesQuery()
  const { data: leadStatusResponse } = useGetLeadStatusQuery()
  const { data: pipelineResponse } = useRetrievePipelineQuery()
  const { data: locationResponse } = useGetActiveLocationQuery()
  const { data: salutationStageResponse } = useRetrieveSalutationAndStageQuery()
  const { data: labelResponse } = useGetCmLabelsQuery()

  useEffect(() => {
    if (labelResponse?.findManyCmLabel) {
      const records = [...labelResponse.findManyCmLabel]?.map((item) => {
        return {
          id: item.id,
          label: item.name,
          color: item.color,
        }
      })
      setLabels(records)
    }
  }, [labelResponse])

  useEffect(() => {
    if (leadSourceResponse?.findManyMarketingSource) {
      const records = [...leadSourceResponse.findManyMarketingSource]?.map(
        (item) => {
          return {
            id: item.id,
            name: item.name,
          }
        }
      )
      setLeadSourceData(records)
    }
  }, [leadSourceResponse])

  useEffect(() => {
    if (leadStatusResponse?.findManyLeadStatus) {
      const records = [...leadStatusResponse.findManyLeadStatus]?.map(
        (item) => {
          return {
            id: item.id,
            name: item.status_name,
          }
        }
      )
      setLeadStageData(records)
    }
  }, [leadStatusResponse])

  useEffect(() => {
    if (pipelineResponse?.findManyPipeline) {
      const records = [...pipelineResponse.findManyPipeline]?.map((item) => {
        return {
          id: item.id,
          name: item.name,
        }
      })
      setPipelineData(records)
    }
  }, [pipelineResponse])

  useEffect(() => {
    if (locationResponse?.locations) {
      const records = [...locationResponse.locations]?.map((item) => {
        return {
          id: item.id,
          name: item.name,
        }
      })
      setLocationData(records)
    }
  }, [locationResponse])

  useEffect(() => {
    if (salutationStageResponse?.findManyUserSalutation) {
      const records = [...salutationStageResponse.findManyUserSalutation]?.map(
        (item) => {
          return {
            id: item.id,
            name: item.name,
          }
        }
      )
      setSalutationData(records)
    }
    if (salutationStageResponse?.findManyPipelineStage) {
      const records = [...salutationStageResponse.findManyPipelineStage]?.map(
        (item) => {
          return {
            id: item.id,
            name: item.name,
          }
        }
      )
      setPipelineStageData(records)
    }
  }, [salutationStageResponse])

  useEffect(() => {
    const response = activityResponse?.findManyActivityData
    if (response) {
      if (response?.activityData) {
        const resultData = response?.activityData.map((data) => {
          const temp = { ...data }
          if (data?.type?.name) {
            temp['type_name'] = data?.type?.name
            temp['type_badge'] = data?.type?.badge
          }
          temp['status'] = statuses[temp?.status]
          return temp
        })
        setSourceData(resultData)
      }
      if (response?.retrieveActivityCount) {
        const records = response?.retrieveActivityCount
        const totalLength = Number(
          activityResponse?.findManyActivityData?.count
        )
        const progressBar = [
          { status: statuses.done, color: '#65CD98', key: 'done' },
          { status: statuses.reopened, color: '#FF5B64', key: 'reopened' },
          { status: statuses.pending, color: '#54B2D3', key: 'pending' },
          { status: statuses.working_on, color: '#FAAD14', key: 'working' },
          { status: statuses.awaiting, color: '#BABABA', key: 'awaiting' },
        ].map((item) => {
          const count = records[`${item.key}`] || 0
          const per = ((Number(count) / totalLength) * 100).toFixed(1)
          return { status: item.status, count, per, color: item.color }
        })
        setProgressBarData(progressBar)
      }
    }
  }, [activityResponse])

  useEffect(() => {
    if (activityResponse?.findManyActivityData?.count >= 0) {
      setPaginateData({
        ...paginateData,
        total: activityResponse?.findManyActivityData?.count,
        showingRecords: sourceData?.length,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceData, activityResponse])

  useEffect(() => {
    resetPagination()
    const timer = setTimeout(() => {
      setSearchTerm(searchText)
    }, WAIT_INTERVAL)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText])

  useEffect(() => {
    if (activityRef.current) {
      activityRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginateData.currentPage, paginateData.limit])

  useEffect(() => {
    if (filterData?.findManyActivityType) {
      const tempData: ActivityTypeFilter[] = [
        {
          id: 0,
          name: 'All',
          isSelected: true,
          hasIcon: false,
        },
      ]
      for (const item of filterData?.findManyActivityType) {
        tempData.push({
          id: item.id,
          name: item.name,
          hasIcon: !!item.badge,
          isSelected: true,
          icon: item.badge,
        })
      }
      setFilterActivityType(tempData)
      const item = [...filterData?.findManyActivityType]?.map((item) => {
        return {
          id: item.id,
          name: item.name,
          hasIcon: !!item.badge,
          icon: item.badge,
          isSelected: false,
        }
      })
      setActivityTypeOption(item)
      loadActivityData()
    }
    if (!filterLoading) setActivityTypeLoading(filterLoading)
  }, [filterData, filterLoading, loadActivityData])

  // useEffect(() => {
  //   if (activityData?.findManyActivity) {
  //     const resultData: ActivitiesDataProps[] = activityData?.findManyActivity.map((data) => {
  //       const temp = { ...data }
  //       if (data.dueDate && data.dueEndDate) {
  //         temp['duration'] = getDuration(
  //           data.dueDate,
  //           data.dueEndDate,
  //           eventDateFormat
  //         )
  //       }
  //       if (data?.type?.name) {
  //         temp['type'] = data?.type?.name
  //         temp['type_badge'] = data?.type?.badge
  //       }
  //       return temp
  //     })
  //     setSourceData(resultData)
  //   }
  // }, [activityData])

  // useEffect(() => {
  //   if (activityAggregateData?.count >= 0) {
  //     setPaginateData({
  //       ...paginateData,
  //       total: activityAggregateData?.count,
  //       showingRecords: sourceData?.length,
  //     })
  //   }
  //   setActivityAggregateLoading(aggregateLoading)
  // }, [sourceData, activityAggregateData, aggregateLoading])

  useEffect(() => {
    if (userListData?.findManyUser) {
      const userList = userListData.findManyUser.map((item) => {
        const { __typename, ...rest } = item
        return rest
      })
      setPersonsList(userList)
    }
  }, [userListData?.findManyUser])

  useEffect(() => {
    if (filterActivityType.length > 0) {
      const data = [...filterActivityType]
      const actityType = data
        .map((item) => {
          if (item.id !== 0 && item.isSelected) {
            return item.name
          }
          return null
        })
        .filter((e) => e)
      setSelectedActivityType(actityType)
      resetPagination()
    }
  }, [filterActivityType])

  useEffect(() => {
    if (selectedDates?.length > 0) {
      setFilterDates([
        dayjs(selectedDates[0]).utc().startOf('day'),
        dayjs(selectedDates[1]).utc().endOf('day'),
      ])
    }
  }, [selectedDates])

  // useEffect(() => {
  //   const resultData: ActivitiesDataProps[] = activitiesList.map((data) => {
  //     const temp = { ...data }
  //     if (data.dueDate && data.dueEndDate) {
  //       temp['duration'] = getDuration(
  //         data.dueDate,
  //         data.dueEndDate,
  //         eventDateFormat
  //       )
  //     }
  //     return temp
  //   })
  //   setSourceData(resultData)
  // }, [])

  useEffect(() => {
    if (activityActiveResponse?.findFirstActivityUserState) {
      const response = activityActiveResponse.findFirstActivityUserState
      const data = JSON.parse(response?.columns)
      const column = data?.columns ?? []
      const temp: FilterDataProps = {}
      if (response?.user_filter) {
        temp.type = 'user'
        temp.id = response?.user_filter
      } else if (response?.custom_filter) {
        const activityFilterResponse = response?.ActivityUserFilter
        temp.type = 'filter'
        temp.id = response?.custom_filter
        if (activityFilterResponse) {
          temp.filter = {
            andFilterOption: JSON.parse(activityFilterResponse?.data)
              ?.andFilterOption,
            column: JSON.parse(activityFilterResponse?.columns)?.columns,
            orFilterOption: JSON.parse(activityFilterResponse?.data)
              ?.orFilterOption,
            name: activityFilterResponse?.name,
            shared: activityFilterResponse?.shared,
          }
        }
      } else if (response?.user_group_filter) {
        temp.type = 'userGroup'
        temp.id = response?.user_group_filter
      }
      setUserFilterData(temp)
      setUserActiveColumn(column)
      setUserColumns(column)
    }
  }, [activityActiveResponse])

  const uniqLabels = useCallback(() => {
    // eslint-disable-next-line array-callback-return,unicorn/prefer-object-from-entries
    const labelsWithColor = sourceData.reduce((p, c) => {
      if (c.client.label) {
        for (const label of c.client.label) {
          const labelValue = label.CmLabel
          if (!Object.prototype.hasOwnProperty.call(p, labelValue.name)) {
            p[labelValue.name] = { color: labelValue.color }
          }
        }
      }
      return p
    }, {})
    const formatLabels = Object.keys(labelsWithColor ?? {}).map((k) => {
      return {
        label: k,
        color: labelsWithColor[k]?.color,
      }
    })
    return formatLabels
  }, [sourceData])

  const resetPagination = () => {
    setPaginateData({
      total: 0,
      offset: 0,
      limit: 50,
      currentPage: 1,
      showingRecords: 0,
    })
  }

  useEffect(() => {
    const doneData = []
    setSelectedRowKeys(doneData)
    const eventData = sourceData.map((data) => {
      return {
        id: data.id,
        title: data.subject,
        type: data.type,
        start: data.dueDate,
        end: data.dueEndDate,
      }
    })
    setEvents(eventData)
  }, [sourceData, uniqLabels])

  // useEffect(() => {
  //   let filteredData: ActivitiesDataProps[] = [...sourceData]
  //   const currentDate = dayjs(dayjs().format(eventDateFormat), eventDateFormat)

  //   if (tabValue === tabs.toDo) {
  //     filteredData = filteredData.filter((data) => {
  //       const dueDate = dayjs(data.dueDate, eventDateFormat)
  //       return dueDate >= currentDate && data.status !== statuses.done
  //     })
  //   } else if (tabValue === tabs.overdue) {
  //     filteredData = filteredData.filter((data) => {
  //       const dueDate = dayjs(data.dueDate, eventDateFormat)
  //       return dueDate < currentDate && data.status !== statuses.done
  //     })
  //   } else if (tabValue === tabs.today) {
  //     filteredData = filteredData.filter((data) => {
  //       const dueDate = dayjs(data.dueDate, eventDateFormat)
  //       return dueDate.format('DD-MM-YYYY') === currentDate.format('DD-MM-YYYY')
  //     })
  //   } else if (tabValue === tabs.tomorrow) {
  //     filteredData = filteredData.filter((data) => {
  //       const dueDate = dayjs(data.dueDate, eventDateFormat)
  //       return (
  //         dueDate.format('DD-MM-YYYY') ===
  //         dayjs().add(1, 'days').format('DD-MM-YYYY')
  //       )
  //     })
  //   } else if (tabValue === tabs.thisWeek) {
  //     const startDate = dayjs().startOf('week')
  //     const endDate = dayjs().endOf('week')
  //     filteredData = filteredData.filter((data) => {
  //       const dueDate = dayjs(data.dueDate, eventDateFormat)
  //       return dueDate >= startDate && dueDate <= endDate
  //     })
  //   } else if (tabValue === tabs.nextWeek) {
  //     const startDate = dayjs().endOf('week').add(1, 'days')
  //     const endDate = dayjs().endOf('week').add(7, 'days')
  //     filteredData = filteredData.filter((data) => {
  //       const dueDate = dayjs(data.dueDate, eventDateFormat)
  //       return dueDate >= startDate && dueDate <= endDate
  //     })
  //   } else if (tabValue === tabs.selectPeriod && selectedDates?.length > 0) {
  //     const startDate = selectedDates[0].format('DD-MM-YYYY')
  //     const endDate = selectedDates[1].format('DD-MM-YYYY')
  //     filteredData = filteredData.filter((data) => {
  //       const dueDate = dayjs(data.dueDate, eventDateFormat).format(
  //         'DD-MM-YYYY'
  //       )
  //       return dueDate >= startDate && dueDate <= endDate
  //     })
  //   }
  //   if (filterTabValue.includes(filterTabsObj.all)) {
  //     filteredData = [...filteredData]
  //   } else {
  //     filteredData = filteredData.filter((data) => {
  //       return filterTabValue.includes(data.type)
  //     })
  //   }
  //   if (selectFilterUser) {
  //     filteredData = filteredData.filter((data) => {
  //       const {
  //         assigned: { firstName = '', lastName = '' },
  //       } = data
  //       const name = `${firstName} ${lastName}`
  //       return name === selectFilterUser
  //     })
  //   }
  //   if (searchText) {
  //     const searchString = searchText.toLowerCase()
  //     const filterObject: ActivitiesDataProps[] = []
  //     for (const data of filteredData) {
  //       for (const key of Object.keys(data)) {
  //         if (key === 'client' || key === 'lead' || key === 'assigned') {
  //           if (
  //             `${data[key].firstName}`.toLowerCase().includes(searchString) ||
  //             `${data[key].lastName}`.toLowerCase().includes(searchString)
  //           ) {
  //             filterObject.push(data)
  //             break
  //           }
  //         } else if (`${data[key]}`.toLowerCase().includes(searchString)) {
  //           filterObject.push(data)
  //           break
  //         }
  //       }
  //     }
  //     filteredData = filterObject
  //   }

  //   setSourceFilteredData(filteredData)
  // }, [
  //   sourceData,
  //   tabValue,
  //   filterTabValue,
  //   searchText,
  //   selectedDates,
  //   selectFilterUser,
  // ])

  const randomInRange = (min, max) => {
    return Math.random() * (max - min) + min
  }

  const displayConfetti = useCallback(() => {
    confetti({
      angle: randomInRange(55, 125),
      spread: randomInRange(50, 70),
      particleCount: randomInRange(50, 100),
      origin: { y: 0.6, x: 0.6 },
    })
  }, [])

  const onSelectDone = useCallback(
    (record, selected, selectedRows) => {
      const newSourceData = sourceData.map((item) => {
        const temp = { ...item }
        if (item.id === record.id) {
          if (selected) {
            temp.status = statuses.done
            temp.doneTime = dayjs().format(eventDateFormat)
            displayConfetti()
          } else {
            temp.status = statuses.pending
          }
        }
        return temp
      })
      setSourceData(newSourceData)
    },
    [sourceData, displayConfetti]
  )

  const onStatusChange = (newStatus) => {
    if (newStatus === statuses.done) {
      displayConfetti()
    }
    activityRefetch()
  }

  const onSortData = useCallback((sorter) => {
    if (sorter?.column) {
      setOrderValue({
        field: sorter.column?.columnName,
        order: sorter.order === 'ascend' ? 'asc' : 'desc',
      })
    } else {
      setOrderValue({
        field: 'Due date',
        order: 'asc',
      })
    }
    // if (sorter.order) {
    //   const order = sorter.order === 'ascend' ? 'asc' : 'desc'
    //   const columnKey = sorter?.column?.id
    //   let result: ActivitiesDataProps[] = []
    //   if (
    //     columnKey === columnNames.dueDate.id ||
    //     columnKey === columnNames.doneTime.id
    //   ) {
    //     result = sourceData.sort((a, b) => {
    //       const dateA = a[columnKey]
    //       const dateB = b[columnKey]
    //       return order === 'asc'
    //         ? dayjs(dateA, eventDateFormat).valueOf() -
    //             dayjs(dateB, eventDateFormat).valueOf()
    //         : dayjs(dateB, eventDateFormat).valueOf() -
    //             dayjs(dateA, eventDateFormat).valueOf()
    //     })
    //   } else {
    //     result = orderBy(
    //       sourceData,
    //       (row) => {
    //         const value = getFunction(row, `${columnKey}`)
    //         return value != null ? value.toString().toLowerCase() : ''
    //       },
    //       order
    //     )
    //   }
    //   setSourceData([...result])
    // }
  }, [])

  const handleCellSave = (row, showConfetti = false, needRefetch = false) => {
    const newData = [...sourceData]
    const index = newData.findIndex((item) => row.id === item.id)
    const item = newData[index]
    newData.splice(index, 1, {
      ...item,
      ...row,
    })
    setSourceData(newData)
    showConfetti && displayConfetti()
    needRefetch && activityRefetch()
  }

  // const convertDateFormat = (
  //   date,
  //   time,
  //   isStart = false,
  //   startDate = '',
  //   startTime = ''
  // ) => {
  //   const dateFormat = date ? date.format('DD MMMM YYYY') : ''
  //   const timeFormat = time
  //     ? time.format('hh:mm')
  //     : isStart
  //     ? dayjs().format('hh:mm')
  //     : startTime
  //     ? dayjs(startTime).add(30, 'minutes').format('hh:mm')
  //     : dayjs().add(30, 'minutes').format('hh:mm')
  //   return `${dateFormat} ${timeFormat}`.trim()
  // }

  const handleActivitySave = () => {
    // const [full_name = ''] = data?.assigned.split(' ')
    // const [cFirstName = '', cLastName = ''] = data?.client?.split(' ')
    // if (isEdit) {
    //   const editedActivity = {
    //     id: selectedData.id,
    //     dueDate: convertDateFormat(data.startDate, data.startTime, true),
    //     dueEndDate: convertDateFormat(
    //       data.endDate,
    //       data.endTime,
    //       false,
    //       data.startDate,
    //       data.startTime
    //     ),
    //     activityLead: data.lead,
    //     type: data.type,
    //     subject: data.subject,
    //     client: {
    //       ...selectedData.client,
    //       firstName: cFirstName,
    //       lastName: cLastName,
    //     },
    //     lead: { ...selectedData.lead },
    //     assigned: { full_name: full_name },
    //     status: selectedData.status,
    //     note: data.notes,
    //     freeBusy: data.freeBusy,
    //     creator: selectedData.creator,
    //     addTime: selectedData.addTime,
    //   }
    //   const editedIndex = sourceData.findIndex(
    //     (item) => item.id === selectedData.id
    //   )
    //   const newSourceData = [...sourceData]
    //   newSourceData.splice(editedIndex, 1, editedActivity)
    //   setSourceData(newSourceData)
    // } else {
    //   const newData = {
    //     id: sourceData?.length + 1,
    //     dueDate: convertDateFormat(data.startDate, data.startTime, true),
    //     dueEndDate: convertDateFormat(
    //       data.endDate,
    //       data.endTime,
    //       false,
    //       data.startDate,
    //       data.startTime
    //     ),
    //     activityLead: data.lead,
    //     type: data.type,
    //     subject: data.subject,
    //     client: {
    //       firstName: cFirstName,
    //       lastName: cLastName,
    //       label: [],
    //       email: '',
    //       phone: '',
    //       street: '',
    //       city: '',
    //       postcode: '',
    //       totalActivities: 0,
    //     },
    //     lead: {
    //       firstName: '',
    //       lastName: '',
    //       email: '',
    //       phone: '',
    //       createdDate: '',
    //       wonTime: '',
    //       owner: { full_name: '' },
    //       leadDoneActivities: 0,
    //       leadClosedOn: '',
    //       firstActivityTime: 0,
    //       leadLastActivityDate: '',
    //       leadLastActivity: 0,
    //       leadLostReason: '',
    //       leadTotalActivities: 0,
    //       leadLostTime: '',
    //       leadSource: '',
    //       wonBy: '',
    //     },
    //     assigned: { full_name: full_name },
    //     status: data.isDone ? statuses.done : statuses.pending,
    //     doneTime: data.isDone ? dayjs().format(eventDateFormat) : '',
    //     note: data.notes,
    //     freeBusy: data.freeBusy,
    //     creator: '',
    //     addTime: dayjs().format(eventDateFormat),
    //   }
    //   setSourceData((e) => [...e, newData])
    // }
    activityRefetch()
    toggleCreateActivityModal()
  }

  // const onFilterTabsChange = (selectedTab) => {
  //   let filterTabs = [...filterTabValue]
  //   const index = filterTabs.indexOf(selectedTab)
  //   if (selectedTab === filterTabsObj.all) {
  //     filterTabs = index === -1 ? Object.values(filterTabsObj) : []
  //   } else {
  //     index === -1 ? filterTabs.push(selectedTab) : filterTabs.splice(index, 1)
  //     if (
  //       filterTabs.includes(filterTabsObj.email) &&
  //       filterTabs.includes(filterTabsObj.call) &&
  //       filterTabs.includes(filterTabsObj.meeting) &&
  //       filterTabs.includes(filterTabsObj.message)
  //     ) {
  //       !filterTabs.includes(filterTabsObj.all) &&
  //         filterTabs.push(filterTabsObj.all)
  //     } else {
  //       const allIndex = filterTabs.indexOf(filterTabsObj.all)
  //       allIndex > -1 && filterTabs.splice(allIndex, 1)
  //     }
  //   }
  //   setFilterTabValue(filterTabs)
  // }

  const DateRangeComponent = () => {
    return (
      <RangePicker
        format={'DD MMM YYYY'}
        value={[selectedDates?.[0], selectedDates?.[1]]}
        onChange={(val, dateStrings) =>
          setSelectedDates([dayjs(dateStrings[0]), dayjs(dateStrings[1])])
        }
      />
    )
  }

  const toggleCreateActivityModal = useCallback(() => {
    setCreateActivityVisible((e) => !e)
  }, [])

  const editCreateActivityModal = useCallback((data) => {
    const dataObject = {
      id: data.id,
      subject: data.subject,
      startDate: data.dueDate && dayjs(data.dueDate),
      endDate: data.dueEndDate && dayjs(data.dueEndDate),
      startTime: data.dueDate && dayjs(data.dueDate),
      endTime: data.dueEndDate && dayjs(data.dueEndDate),
      freeBusy: Number(data.freeBusy),
      notes: data.note,
      user: data?.assigned?.id,
      lead: data?.lead_id,
      client: data?.client?.id,
      activityType: data?.type?.id,
      isDone: data.status === statuses.done,
    }
    setEditData(dataObject)
    setCreateActivityVisible((e) => !e)
  }, [])

  const renderMobileTooltip = () => {
    return (
      <div>
        {progressBarData.map((status, i) => {
          return (
            <div key={i}>
              {Number(status?.per) > 0 && (
                <div className={styles.mobileProgressBar}>
                  <span
                    className={styles.colorPellets}
                    style={{
                      backgroundColor: status.color,
                    }}
                  />
                  <span>{`${status.status} ${status.count}/${paginateData?.total} - ${status.per}%`}</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  const renderTooltip = ({ title, icon }) => {
    return <Tooltip title={title}>{icon}</Tooltip>
  }

  const onActivityFilterChange = (id: number, isActive: boolean) => {
    const temp = [...filterActivityType]
    const activityType = temp.map((item) => {
      if (id !== 0 && item.id === id) {
        item.isSelected = !isActive
      } else if (id === 0) {
        item.isSelected = !isActive
      }
      return item
    })
    let count = 0
    for (const item of activityType) {
      if (item.isSelected && item.id !== 0) {
        count += 1
      }
    }
    count === filterActivityType.length - 1
      ? (activityType[0].isSelected = true)
      : (activityType[0].isSelected = false)
    setFilterActivityType(activityType)
  }

  const onDataRangeSelect = (value) => {
    setTabValue(value)
    resetPagination()
    switch (value) {
      case 'To do': {
        setFilterDates([dayjs(), dayjs()])
        break
      }
      case 'Overdue': {
        setFilterDates([dayjs().subtract(1, 'day'), dayjs()])
        break
      }
      case 'Today': {
        setFilterDates([
          dayjs().utc().startOf('day'),
          dayjs().utc().endOf('day'),
        ])
        break
      }
      case 'Tomorrow': {
        setFilterDates([
          dayjs().utc().add(1, 'day').startOf('day'),
          dayjs().utc().add(1, 'day').endOf('day'),
        ])
        break
      }
      case 'This week': {
        setFilterDates([
          dayjs().utc().startOf('week').day(1),
          dayjs().utc().endOf('week').day(7),
        ])
        break
      }
      case 'Next week': {
        setFilterDates([
          dayjs().utc().add(1, 'week').startOf('day'),
          dayjs().utc().add(1, 'week').endOf('week').day(7),
        ])
        break
      }
      case 'Completed': {
        setFilterDates([dayjs(), dayjs()])
        break
      }
    }
  }

  return (
    <div className={styles.activityWrapper} ref={activityRef}>
      <Layout badgeCountList={{ activities: paginateData?.total }}>
        <CommonHeader
          title={t('activityList.header')}
          isShowSearch={false}
          displayActivity={paginateData?.total > 0}
          renderActivity={
            <div className={styles.activitiesCircle}>
              {paginateData?.total > 0 && (
                <h5>
                  {t('activityList.activity', {
                    total: paginateData?.total,
                  })}
                </h5>
              )}
            </div>
          }
        >
          <div className={styles.createPlusIcon}>
            <PlusSquareFilled
              className={styles.plusIconStyle}
              onClick={toggleCreateActivityModal}
            />
          </div>
        </CommonHeader>
        {!isMobile && (
          <ActivitiesHeader
            totalActivity={paginateData.total}
            searchText={searchText}
            setSearchText={setSearchText}
            toggleCreateActivityModal={toggleCreateActivityModal}
            selectFilterUser={selectFilterUser}
            setSelectFilterUser={setSelectFilterUser}
            personsList={personsList}
            isMobile={isMobile}
            loggedUser={loggedUser?.me}
            activityTypeOption={activityTypeOption}
            filterData={userFilterData}
            selectedColumn={selectedColumn}
            setFilterDataObject={setFilterDataObject}
            userColumns={userColumns}
            setUserActiveColumn={setUserActiveColumn}
            leadSourceData={leadSourceData}
            leadStageData={leadStageData}
            pipelineData={pipelineData}
            locationData={locationData}
          />
        )}
        <div>
          <Tabs
            tabPosition={'top'}
            onChange={(key) => tabValue !== key && onDataRangeSelect(key)}
            activeKey={tabValue}
            className={styles.tabsClass}
          >
            {[
              { name: t('activityList.tabs.todo'), value: tabs.toDo },
              { name: t('activityList.tabs.overdue'), value: tabs.overdue },
              { name: t('activityList.tabs.today'), value: tabs.today },
              { name: t('activityList.tabs.tomorrow'), value: tabs.tomorrow },
              { name: t('activityList.tabs.thisWeek'), value: tabs.thisWeek },
              { name: t('activityList.tabs.nextWeek'), value: tabs.nextWeek },
              { name: t('activityList.tabs.completed'), value: tabs.completed },
              {
                name: t('activityList.tabs.selectPeriod'),
                value: tabs.selectPeriod,
                component: (
                  <div>
                    <Popover
                      content={openPicker && <DateRangeComponent />}
                      trigger={'click'}
                      placement={'bottomRight'}
                      onVisibleChange={(val) => setOpenPicker(val)}
                    >
                      <div>
                        {selectedDates?.length > 0
                          ? `${selectedDates[0]?.format(
                              'DD MMM YYYY'
                            )} - ${selectedDates[1]?.format('DD MMM YYYY')}`
                          : t('activityList.tabs.selectPeriod')}
                      </div>
                    </Popover>
                  </div>
                ),
              },
            ].map((tab, i) => {
              return <TabPane tab={tab.component || tab.name} key={tab.value} />
            })}
          </Tabs>
        </div>
        {isMobile && (
          <ActivitiesHeader
            totalActivity={paginateData.total}
            searchText={searchText}
            setSearchText={setSearchText}
            toggleCreateActivityModal={toggleCreateActivityModal}
            selectFilterUser={selectFilterUser}
            setSelectFilterUser={setSelectFilterUser}
            personsList={personsList}
            isMobile={isMobile}
            loggedUser={loggedUser?.me}
            activityTypeOption={activityTypeOption}
            filterData={userFilterData}
            selectedColumn={selectedColumn}
            setFilterDataObject={setFilterDataObject}
            userColumns={userColumns}
            setUserActiveColumn={setUserActiveColumn}
            leadSourceData={leadSourceData}
            leadStageData={leadStageData}
            pipelineData={pipelineData}
            locationData={locationData}
          />
        )}
        {/* <div className={styles.subHeader}>
          <div className={styles.subHeaderLeft}>
            {filterLoading ? (
              ['1', '2', '3', '4', '5'].map((item, index) => (
                <Skeleton.Input active={true} size={'small'} key={index} style={{ width: 25, height: 20 }}/>
              ))
            ) : (
              <>
              {filterActivityType.map((item) => (
                <div
                onClick={() => onActivityFilterChange(item.id, item.isSelected)}
                className={classNames({
                  [styles.active]: item.isSelected,
                })}
              >
                {item.hasIcon ? renderTooltip({
                title: item.name,
                icon: React.createElement(Icon && Icon[item.icon]),
               }) : item.name}
              </div>
              ))}
            </>
            )}
          </div>
        </div> */}
        <div className={styles.subHeader}>
          <div className={styles.subHeaderLeft}>
            {activityTypeLoading ? (
              ['1', '2', '3', '4', '5'].map((item, index) => (
                <Skeleton.Input
                  active={true}
                  size={'small'}
                  key={index}
                  style={{ width: 25, height: 20 }}
                />
              ))
            ) : (
              <>
                {filterActivityType.map((item) => (
                  <div
                    onClick={() =>
                      onActivityFilterChange(item.id, item.isSelected)
                    }
                    className={classNames({
                      [styles.active]: item.isSelected,
                    })}
                    key={item.id}
                  >
                    {item.hasIcon
                      ? renderTooltip({
                          title: item.name,
                          icon: React.createElement(Icon?.[item.icon]),
                        })
                      : item.name}
                  </div>
                ))}
              </>
            )}
            {/* <div
              onClick={() => onFilterTabsChange(filterTabsObj.all)}
              className={classNames({
                [styles.active]: filterTabValue.includes(filterTabsObj.all),
              })}
            >
              {t('activityList.subTabs.all')}
            </div>
            <div
              onClick={() => onFilterTabsChange(filterTabsObj.email)}
              className={classNames({
                [styles.active]: filterTabValue.includes(filterTabsObj.email),
              })}
            >
              {renderTooltip({
                title: t('activityList.subTabs.email'),
                icon: <SentEmailIcon />,
              })}
            </div>
            <div
              onClick={() => onFilterTabsChange(filterTabsObj.call)}
              className={classNames({
                [styles.active]: filterTabValue.includes(filterTabsObj.call),
              })}
            >
              {renderTooltip({
                title: t('activityList.subTabs.call'),
                icon: <CallIcon />,
              })}
            </div>
            <div
              onClick={() => onFilterTabsChange(filterTabsObj.message)}
              className={classNames({
                [styles.active]: filterTabValue.includes(filterTabsObj.message),
              })}
            >
              {renderTooltip({
                title: t('activityList.subTabs.message'),
                icon: <MessageIcon />,
              })}
            </div>
            <div
              onClick={() => onFilterTabsChange(filterTabsObj.meeting)}
              className={classNames({
                [styles.active]: filterTabValue.includes(filterTabsObj.meeting),
              })}
            >
              {renderTooltip({
                title: t('activityList.subTabs.meeting'),
                icon: <TeamIcon />,
              })}
            </div> */}
          </div>
          <Tooltip title={isMobile ? renderMobileTooltip() : undefined}>
            <div className={styles.subHeaderRight}>
              {activityDataLoading ? (
                <Skeleton.Input
                  active={true}
                  size={'small'}
                  key={'0'}
                  style={{ width: 350, height: 20 }}
                />
              ) : (
                progressBarData.map((status, i) => {
                  return (
                    <div
                      className={styles.progressBar}
                      key={i}
                      style={
                        Number(status?.per) > 0
                          ? { width: `${status.per}%` }
                          : { display: 'none' }
                      }
                    >
                      {Number(status?.per) > 0 && (
                        <Tooltip
                          title={
                            !isMobile
                              ? `${status.status} ${status.count}/${paginateData?.total} - ${status.per}%`
                              : undefined
                          }
                        >
                          <div
                            style={{
                              backgroundColor: status.color,
                              height: '12px',
                            }}
                          />
                        </Tooltip>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </Tooltip>
        </div>
        {!activityActiveLoading && (
          <ActivitiesTable
            filteredData={sourceData}
            onStatusChange={onStatusChange}
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
            onSelectDone={onSelectDone}
            onSortData={onSortData}
            handleCellSave={handleCellSave}
            editCreateActivityModal={editCreateActivityModal}
            labels={labels}
            setLabels={setLabels}
            paginateData={paginateData}
            setPaginateData={setPaginateData}
            loading={activityDataLoading}
            searchTerm={searchTerm}
            selectedColumn={selectedColumn}
            setSelectedColumn={setSelectedColumn}
            userActiveColumn={userActiveColumn}
            setCreateActivityVisible={setCreateActivityVisible}
            tabValue={tabValue}
            loggedUser={loggedUser?.me}
            personsList={personsList}
            activityTypeOption={activityTypeOption}
            leadSourceData={leadSourceData}
            leadStageData={leadStageData}
            locationData={locationData}
            pipelineData={pipelineData}
            salutationData={salutationData}
            pipelineStageData={pipelineStageData}
          />
        )}
      </Layout>
      {createActivityVisible && (
        <CreateActivity
          visible={createActivityVisible}
          onCancel={toggleCreateActivityModal}
          events={events}
          handleSave={handleActivitySave}
          activityTypeOption={activityTypeOption}
          editData={editData}
          userOptions={personsList}
        />
      )}
    </div>
  )
}

export default Index
