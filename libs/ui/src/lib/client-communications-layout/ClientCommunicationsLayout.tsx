import React, { FC, useRef } from 'react'
import {
  CommunicationTimeline,
  EventsDataProps,
  PaginationType,
} from '@pabau/ui'
import styles from './ClientCommunicationsLayout.module.less'

export interface ClientCommunicationsLayoutProps {
  eventsData: EventsDataProps[]
  eventDateFormat: string
  isLoading?: boolean
  pagination?: PaginationType
  setPagination?: (e: PaginationType) => void
}

export const ClientCommunicationsLayout: FC<ClientCommunicationsLayoutProps> = ({
  eventDateFormat,
  eventsData,
  isLoading,
  pagination,
  setPagination,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div className={styles.clientLayout} ref={ref}>
      <CommunicationTimeline
        eventsData={eventsData}
        eventDateFormat={eventDateFormat}
        isLoading={isLoading}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  )
}

export default ClientCommunicationsLayout
