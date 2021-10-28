import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { Tooltip } from 'antd'
import { ClientCardLayout } from '../../../components/Clients/ClientCardLayout'
import styles from './clientCardLayout.module.less'
import {
  useGetActivityQuery,
  useCountClinetActivityQuery,
} from '@pabau/graphql'
import dayjs from 'dayjs'
import * as Icon from '@ant-design/icons'
import { Activities, ActivitiesDataProps, Pagination } from '@pabau/ui'

const Appointments = () => {
  const router = useRouter()
  const contactID = Number(router.query['id'])
  const [activityDetails, setActivityDetails] = useState<ActivitiesDataProps[]>(
    []
  )
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    offSet: 0,
    limit: 10,
    currentPage: 1,
  })
  const queryVariable = useMemo(() => {
    return {
      contactID: contactID,
      skip: pagination.offSet,
      take: pagination.limit,
    }
  }, [contactID, pagination.offSet, pagination.limit])
  const { loading, data: activityData } = useGetActivityQuery({
    variables: queryVariable,
    skip: !contactID,
  })

  const {
    data: countData,
    loading: countLoading,
  } = useCountClinetActivityQuery({
    variables: { contactID },
    skip: !contactID,
  })
  const renderTooltip = ({ title, icon }) => {
    return <Tooltip title={title}>{icon}</Tooltip>
  }
  const handleColorClass = (date) => {
    const dueDate = dayjs(date)
    const now = dayjs()
    let style
    if (now > dueDate) {
      style = styles.overdueRow
    } else if (now <= dueDate && now.format('DD') === dueDate.format('DD')) {
      style = styles.todayRow
    } else {
      style = styles.todo
    }
    return style
  }
  useEffect(() => {
    if (activityData?.findManyActivity) {
      const activity: ActivitiesDataProps[] = []
      if (activityData?.findManyActivity) {
        for (const d of activityData?.findManyActivity) {
          activity.push({
            id: d.id,
            dateTime: dayjs(d.due_start_date).format('DD-MM-YYYY, h:mm a'),
            eventName: d.subject,
            clientName: d.Creator.full_name,
            type: d.ActivityType.name,
            taskUserName: d.Assigned.full_name,
            description: d.note,
            taskChecked: d.status.toLocaleLowerCase() === 'done',
            typeIcon: renderTooltip({
              title: '',
              icon: React.createElement(Icon?.[d.ActivityType.badge]),
            }),
            dateColor: handleColorClass(d.due_start_date),
          })
        }
        setActivityDetails(activity)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityData])
  useEffect(() => {
    if (countData?.findManyActivityCount) {
      setPagination({ ...pagination, total: countData.findManyActivityCount })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countData])
  return (
    <div className={styles.wrapper}>
      <ClientCardLayout
        cssClass={'cardCoustomWrapper'}
        clientId={Number(router.query['id'])}
        activeTab="activities"
      >
        <Activities
          eventsData={activityDetails}
          eventDateFormat={'DD-MM-YYYY, h:mm a'}
          isLoading={loading || countLoading}
          pagination={pagination}
          setPagination={setPagination}
        />
      </ClientCardLayout>
    </div>
  )
}

export default Appointments
