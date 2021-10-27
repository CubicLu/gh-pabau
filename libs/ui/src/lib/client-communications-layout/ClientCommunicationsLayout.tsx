import React, { FC, useRef } from 'react'
import { CommunicationTimeline, EventsDataProps } from '@pabau/ui'
import styles from './ClientCommunicationsLayout.module.less'

export interface ClientCommunicationsLayoutProps {
  eventsData: EventsDataProps[]
  eventDateFormat: string
  isLoading?: boolean
}

export const ClientCommunicationsLayout: FC<ClientCommunicationsLayoutProps> =
  ({ eventDateFormat, eventsData, isLoading }) => {
    const ref = useRef<HTMLDivElement>(null)
    return (
      <div className={styles.clientLayout} ref={ref}>
        <CommunicationTimeline
          eventsData={eventsData}
          eventDateFormat={eventDateFormat}
          isLoading={isLoading}
        />
      </div>
    )
  }

export default ClientCommunicationsLayout
