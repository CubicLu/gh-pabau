import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Tooltip, Modal } from 'antd'
import { ClientCardLayout } from '../../../components/Clients/ClientCardLayout'
import styles from './clientCardLayout.module.less'
import {
  useGetActivityLazyQuery,
  useCountClientActivityLazyQuery,
  useDeleteManyActivityMutation,
  useGetActivityTypesQuery,
} from '@pabau/graphql'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import * as Icon from '@ant-design/icons'
import {
  Activities,
  ActivitiesDataProps,
  Notification as ResNotification,
  ActivityTypeFilter,
  NotificationType,
  PaginationType,
} from '@pabau/ui'
import { DisplayDate } from '../../../hooks/displayDate'

const ActivitiesTab = () => {
  const router = useRouter()
  let count
  const contactID = Number(router.query['id'])
  const [isActivityDelete, setIsActivityDelete] = useState(false)
  const [activityId, setActivityId] = useState<number>(0)
  const [activityTypeFilter, setActivityTypeFilter] = useState<number[]>([])
  const [activityTypes, setActivityTypes] = useState<number[]>([])
  const [activityFilterType, setActivityFilterType] = useState<
    ActivityTypeFilter[]
  >([])
  const { t } = useTranslation('common')
  const [activityDetails, setActivityDetails] = useState<ActivitiesDataProps[]>(
    []
  )
  const [pagination, setPagination] = useState<PaginationType>({
    total: 0,
    offSet: 0,
    limit: 10,
    currentPage: 1,
  })
  const resetPagionation = () => {
    setPagination({
      total: count,
      offSet: 0,
      limit: 10,
      currentPage: 1,
    })
  }

  const [
    getActivities,
    { loading, data: activityData, refetch: reFetchActivity },
  ] = useGetActivityLazyQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
  })
  const {
    loading: filterLoading,
    data: filterData,
  } = useGetActivityTypesQuery()
  const [
    getCountActivity,
    { data: countData, loading: countLoading, refetch: reFetchCountActivity },
  ] = useCountClientActivityLazyQuery()
  const [
    deleteActivityMutation,
    { loading: isDeleteLoading },
  ] = useDeleteManyActivityMutation({
    onCompleted() {
      ResNotification(
        NotificationType.success,
        t('clients.activities.delete.message')
      )
      setIsActivityDelete(false)
      reFetchActivity()
      reFetchCountActivity()
    },
    onError() {
      ResNotification(
        NotificationType.error,
        t('clients.activities.delete.error.message')
      )
    },
  })
  useEffect(() => {
    getActivities({
      variables: {
        contactID: contactID,
        skip: pagination.offSet,
        take: pagination.limit,
        activityType: activityTypeFilter,
      },
    })
    getCountActivity({
      variables: {
        contactID: contactID,
      },
    })
  }, [contactID, pagination.offSet, pagination.limit, activityTypeFilter])
  useEffect(() => {
    if (filterData?.findManyActivityType) {
      const activityTypeId = []
      const tempData: ActivityTypeFilter[] = [
        {
          id: 0,
          name: 'All',
          isSelected: true,
          hasIcon: false,
        },
      ]
      for (const item of filterData?.findManyActivityType) {
        activityTypeId.push(item.id)
        tempData.push({
          id: item.id,
          name: item.name,
          hasIcon: !!item.badge,
          isSelected: true,
          icon: item.badge,
        })
      }
      setActivityTypeFilter(activityTypeId)
      setActivityTypes(activityTypeId)
      setActivityFilterType(tempData)
    }
  }, [filterData])
  const renderTooltip = ({ title, icon }) => {
    return <Tooltip title={title}>{icon}</Tooltip>
  }
  const handleColorClass = (date, status) => {
    const dueDate = dayjs(date)
    const now = dayjs()
    let style = styles.todo
    if (
      status.toLocaleLowerCase() !==
      t('timeline.status.done').toLocaleLowerCase()
    ) {
      if (now > dueDate) {
        style = styles.overdueRow
      } else if (
        now <= dueDate &&
        now.format('DDMMYY') === dueDate.format('DDMMYY')
      ) {
        style = styles.todayRow
      }
    }
    return style
  }
  const handleMenuClick = (name, id) => {
    if (name === t('timeline.dotMenu.delete')) {
      setActivityId(id)
      setIsActivityDelete(true)
    }
  }
  useEffect(() => {
    const activity: ActivitiesDataProps[] = []
    if (activityData?.activities) {
      for (const d of activityData?.activities) {
        activity.push({
          id: d.id,
          dateTime: dayjs(d.due_start_date).format('DD-MM-YYYY, h:mm a'),
          eventName: d.subject,
          type: d.ActivityType.name,
          taskUserName: d.Assigned.full_name,
          description: d.note,
          taskChecked: d.status.toLocaleLowerCase() === 'done',
          typeIcon: renderTooltip({
            title: '',
            icon: React.createElement(Icon?.[d.ActivityType.badge]),
          }),
          dateColor: handleColorClass(d.due_start_date, d.status),
        })
      }
      setActivityDetails(activity)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityData])
  useEffect(() => {
    if (countData?.findManyActivityCount) {
      setPagination({ ...pagination, total: countData.findManyActivityCount })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countData])
  const handleDelete = () => {
    deleteActivityMutation({
      variables: {
        ids: [activityId],
      },
    })
  }
  const onActivityFilterChange = (id, isSelected) => {
    if (id !== 0) {
      resetPagionation()
      let filterObj = [...activityFilterType]
      filterObj = filterObj.map((d) => {
        if (d.id === id) {
          d.isSelected = true
        } else {
          d.isSelected = false
        }
        return d
      })
      setActivityFilterType(filterObj)
      setActivityTypeFilter([id])
    } else {
      let filterObj = [...activityFilterType]
      filterObj = filterObj.map((d) => {
        d.isSelected = true
        return d
      })
      setActivityFilterType(filterObj)
      setActivityTypeFilter(activityTypes)
    }
  }
  return (
    <div className={styles.wrapper}>
      <ClientCardLayout
        cssClass={'cardCoustomWrapper'}
        clientId={Number(router.query['id'])}
        activeTab="activities"
      >
        <Modal
          centered={true}
          onCancel={() => setIsActivityDelete(false)}
          onOk={() => handleDelete()}
          visible={isActivityDelete}
          title={t('galley.list.view.delete.modal.title')}
          cancelText={t('common-label-cancel')}
          okText={t('galley.list.view.delete.ok.button')}
          confirmLoading={isDeleteLoading}
        >
          <div>
            <p>{t('clients.activities.delete.modal.message')}</p>
          </div>
        </Modal>
        <Activities
          eventsData={activityDetails}
          eventDateFormat={'DD-MM-YYYY, h:mm a'}
          isLoading={loading || countLoading || filterLoading}
          pagination={pagination}
          setPagination={setPagination}
          handleMenuClick={handleMenuClick}
          DisplayDate={DisplayDate}
          activityTypeFilterList={activityFilterType}
          activityTypeLoading={filterLoading}
          onActivityFilterChange={onActivityFilterChange}
        />
      </ClientCardLayout>
    </div>
  )
}

export default ActivitiesTab
