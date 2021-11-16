import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { Modal } from 'antd'
import { ClientCardLayout } from '../../../components/Clients/ClientCardLayout'
import styles from './clientCardLayout.module.less'
import {
  useGetActivityLazyQuery,
  useCountClientActivityWithTypeLazyQuery,
  CountClientActivityDocument,
  useDeleteManyActivityMutation,
  useGetActivityTypesQuery,
  GetActivityDocument,
} from '@pabau/graphql'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import {
  Activities,
  ActivitiesDataProps,
  Notification as ResNotification,
  NotificationType,
  PaginationType,
} from '@pabau/ui'
import { ActivityTypeFilter } from '../../activities'
import { DisplayDate } from '../../../hooks/displayDate'
const ActivitiesTab = () => {
  const router = useRouter()
  const contactID = Number(router.query['id'])
  const [isActivityDelete, setIsActivityDelete] = useState(false)
  const [activityId, setActivityId] = useState<number>(0)
  const [currentSeletedActivityType, setCurrentSeletedActivityType] = useState<
    number[]
  >([])
  const [allActivityType, setAllActivityType] = useState<number[]>([])
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
    limit: 50,
    currentPage: 1,
  })
  const queryVariables = useMemo(() => {
    return {
      contactID: contactID,
      skip: pagination.offSet,
      take: pagination.limit,
      activityType: currentSeletedActivityType,
    }
  }, [
    contactID,
    pagination.offSet,
    pagination.limit,
    currentSeletedActivityType,
  ])
  const resetPagionation = () => {
    setPagination({ ...pagination, offSet: 0, limit: 50, currentPage: 1 })
  }

  const [
    getActivities,
    { loading, data: activityData },
  ] = useGetActivityLazyQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  })
  const {
    loading: filterLoading,
    data: filterData,
  } = useGetActivityTypesQuery()
  const [
    getCountActivity,
    { data: countData, loading: countLoading },
  ] = useCountClientActivityWithTypeLazyQuery({
    fetchPolicy: 'no-cache',
  })
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
    },
    onError() {
      ResNotification(
        NotificationType.error,
        t('clients.activities.delete.error.message')
      )
    },
    update(cache, { data }) {
      const ActivityCount: any = cache.readQuery({
        query: CountClientActivityDocument,
        variables: {
          contactID: contactID,
        },
      })
      const activityCountKey = Object.keys(ActivityCount)[0]
      cache.writeQuery({
        query: CountClientActivityDocument,
        variables: {
          contactID: contactID,
        },
        data: {
          [activityCountKey]: ActivityCount[activityCountKey] - 1,
        },
      })
      let Activities: any = cache.readQuery({
        query: GetActivityDocument,
        variables: queryVariables,
      })
      const activityKey = Object.keys(Activities)[0]
      Activities = Activities.activities.filter((d) => d.id !== activityId)
      cache.writeQuery({
        query: GetActivityDocument,
        variables: queryVariables,
        data: {
          [activityKey]: Activities,
        },
      })
    },
  })
  useEffect(() => {
    if (currentSeletedActivityType && currentSeletedActivityType.length > 0) {
      getActivities({
        variables: queryVariables,
      })
      getCountActivity({
        variables: {
          contactID: contactID,
          activityType: currentSeletedActivityType,
        },
      })
    }
  }, [
    contactID,
    getActivities,
    getCountActivity,
    queryVariables,
    currentSeletedActivityType,
  ])
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
      setCurrentSeletedActivityType(activityTypeId)
      setAllActivityType(activityTypeId)
      setActivityFilterType(tempData)
    }
  }, [filterData])
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
    if (
      name === t('timeline.dotMenu.delete') ||
      name.toLocaleLowerCase() === 'delete'
    ) {
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
          typeIcon: d.ActivityType.badge,
          dateColor: handleColorClass(d.due_start_date, d.status),
        })
      }
      setActivityDetails(activity)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityData?.activities])
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
  const onActivityFilterChange = (id) => {
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
      setCurrentSeletedActivityType([id])
    } else {
      let filterObj = [...activityFilterType]
      filterObj = filterObj.map((d) => {
        d.isSelected = true
        return d
      })
      setActivityFilterType(filterObj)
      setCurrentSeletedActivityType(allActivityType)
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
