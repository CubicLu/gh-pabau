import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { Tooltip, Modal } from 'antd'
import { ClientCardLayout } from '../../../components/Clients/ClientCardLayout'
import styles from './clientCardLayout.module.less'
import {
  useGetActivityQuery,
  useCountClientActivityQuery,
  useDeleteManyActivityMutation,
} from '@pabau/graphql'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import * as Icon from '@ant-design/icons'
import {
  Activities,
  ActivitiesDataProps,
  Notification as ResNotification,
  NotificationType,
  PaginationType,
} from '@pabau/ui'
import { DisplayDate } from '../../../hooks/displayDate'
const ActivitiesTab = () => {
  const router = useRouter()
  const contactID = Number(router.query['id'])
  const [isActivityDelete, setIsActivityDelete] = useState(false)
  const [activityId, setActivityId] = useState<number>(0)
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
  const queryVariable = useMemo(() => {
    return {
      contactID: contactID,
      skip: pagination.offSet,
      take: pagination.limit,
    }
  }, [contactID, pagination.offSet, pagination.limit])
  const {
    loading,
    data: activityData,
    refetch: reFetchActivity,
  } = useGetActivityQuery({
    variables: queryVariable,
    skip: !contactID,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
  })

  const {
    data: countData,
    loading: countLoading,
    refetch: reFetchCountActivity,
  } = useCountClientActivityQuery({
    variables: { contactID },
    skip: !contactID,
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
  return (
    <div className={styles.wrapper}>
      <ClientCardLayout
        cssClass={'cardCoustomWrapper'}
        clientId={Number(router.query['id'])}
        activeTab="activities"
        deleteActivityId={activityId}
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
          isLoading={loading || countLoading}
          pagination={pagination}
          setPagination={setPagination}
          handleMenuClick={handleMenuClick}
          DisplayDate={DisplayDate}
        />
      </ClientCardLayout>
    </div>
  )
}

export default ActivitiesTab
