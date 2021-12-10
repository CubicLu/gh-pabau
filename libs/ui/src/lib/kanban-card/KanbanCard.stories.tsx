import React, { FC } from 'react'
import { KanbanCard, KanbanCardProps } from './KanbanCard'

import userImage from '../../assets/images/user.png'

export default {
  component: KanbanCard,
  title: 'KanbanCard',
  args: {
    leadTitle: 'Lead Title',
    onLeadTitleClickHandler: () => {
      return
    },
    labels: ['#Label1', '#Label2', '#Label3'],
    leadOwnerName: 'Owner Name',
    leadOwnerImg: userImage,
    contactName: 'Contact Name',
    contactImg: 'contactImage',
    activityStatus: 'future activity scheduled',
    leadStatus: 'Open',
  },
}

const KanbanCardComponent: FC<KanbanCardProps> = ({
  leadTitle,
  onLeadTitleClickHandler,
  labels,
  leadOwnerName,
  leadOwnerImg,
  contactName,
  contactImg,
  activityStatus,
  leadStatus,
}) => {
  return (
    <KanbanCard
      leadTitle={leadTitle}
      onLeadTitleClickHandler={onLeadTitleClickHandler}
      labels={labels}
      leadOwnerName={leadOwnerName}
      leadOwnerImg={leadOwnerImg}
      contactName={contactName}
      contactImg={contactImg}
      activityStatus={activityStatus}
      leadStatus={leadStatus}
    />
  )
}

export const KanbanCardComponentStory = KanbanCardComponent.bind({})

export const KanbanCardWonComponentStory = KanbanCardComponent.bind({})

KanbanCardWonComponentStory.args = {
  leadStatus: 'Won',
}

export const KanbanCardLostComponentStory = KanbanCardComponent.bind({})

KanbanCardLostComponentStory.args = {
  leadStatus: 'Lost',
}

export const KanbanCardActiveStatusOverdueComponentStory = KanbanCardComponent.bind(
  {}
)

KanbanCardActiveStatusOverdueComponentStory.args = {
  activityStatus: 'activity overdue',
}

export const KanbanCardActiveStatusTodayComponentStory = KanbanCardComponent.bind(
  {}
)

KanbanCardActiveStatusTodayComponentStory.args = {
  activityStatus: 'activity due today',
}

export const KanbanCardActiveStatusFutureComponentStory = KanbanCardComponent.bind(
  {}
)

KanbanCardActiveStatusFutureComponentStory.args = {
  activityStatus: 'future activity scheduled',
}
