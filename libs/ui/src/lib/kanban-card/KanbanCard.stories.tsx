import React, { FC } from 'react'
import { KanbanCard, KanbanCardProps } from './KanbanCard'

import userImage from '../../assets/images/user.png'
import noUser from '../../assets/images/no-user-icon.svg'

export default {
  component: KanbanCard,
  title: 'KanbanCard',
  args: {
    leadTitle: 'Lead Title',
    onLeadTitleClickHandler: () => {
      return
    },
    labels: ['#Label1', '#Label2'],
    leadOwnerName: 'Owner Name',
    leadOwnerImg: userImage,
    contactId: 'contact id',
    contactName: 'Contact Name',
    contactImg: noUser,
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
  contactId,
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
      contactId={contactId}
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
