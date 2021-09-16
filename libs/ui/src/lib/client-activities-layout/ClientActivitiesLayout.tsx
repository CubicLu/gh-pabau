import React, { FC, useRef } from 'react'
import { MyLottie as Lottie, Activities, ActivitiesDataProps } from '@pabau/ui'
import emptyState from '../../assets/lottie/empty-state.json'
import { eventsData } from '../activities/ActivitiesMock'

export interface ClientActivitiesLayoutProps {
  isEmpty?: boolean
  eventData?: ActivitiesDataProps[]
  eventDateFormat?: string
  isLoading?: boolean
}

export const ClientActivitiesLayout: FC<ClientActivitiesLayoutProps> = ({
  isEmpty,
  eventData,
  isLoading,
  eventDateFormat,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  eventData = [...eventsData]
  return (
    <div ref={ref}>
      {isEmpty && (
        <Lottie
          options={{
            loop: true,
            autoPlay: true,
            animationData: emptyState,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
          }}
        />
      )}
      <Activities
        isLoading={isLoading}
        eventsData={eventData}
        eventDateFormat={eventDateFormat ?? ''}
      />
    </div>
  )
}

export default ClientActivitiesLayout
