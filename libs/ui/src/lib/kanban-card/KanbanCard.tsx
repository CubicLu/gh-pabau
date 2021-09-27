import React, { FC, useState } from 'react'
import styles from './KanbanCard.module.less'

import { Avatar } from '../avatar/Avatar'
import * as Icons from '@ant-design/icons'
import { Tag } from 'antd'
import { Activities } from '../activities/Activities'
import { eventsData } from '../activities/ActivitiesMock'
import { CustomButton } from '../button/Button.stories'

export interface KanbanCardProps {
  leadTitle?: string
  onLeadTitleClickHandler?: () => void
  labels?: string[]
  leadOwnerName?: string
  leadOwnerImg?: string
  contactId?: string
  contactName?: string
  contactImg?: string
  activityStatus?: string
  leadStatus?: string
}

export const KanbanCard: FC<KanbanCardProps> = ({
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
  const [isOpenActivity, setIsOpenActivity] = useState(false)
  let cardBackground,
    btnColor,
    borderColor = `White`

  activityStatus = activityStatus?.toLowerCase()

  const onStatusClickHandler = () => {
    setIsOpenActivity(!isOpenActivity)
  }

  const mapLabels = labels?.map((label, index) => {
    return (
      <Tag key={index} color={`magenta`} className={styles.label}>
        {label}
      </Tag>
    )
  })

  const activityStatusIconAndColor = (
    status
  ): { color: string; SelectedIcon: string } => {
    switch (status) {
      case 'activity due today':
        return { color: '#65CD98', SelectedIcon: `DownCircleFilled` }
      case 'no activity scheduled':
        return { color: '#FAAD14', SelectedIcon: `ExclamationCircleFilled` }
      case 'activity overdue':
        return { color: '#FF5B64', SelectedIcon: `LeftCircleFilled` }
      case 'future activity scheduled':
        return { color: '#CFCFD7', SelectedIcon: `RightCircleFilled` }
      default:
        return { color: '', SelectedIcon: '' }
    }
  }

  if (leadStatus === `Won`) {
    cardBackground = `#F4FCF8`
    btnColor = `#65CD98`
    borderColor = `1px solid #9DDFBD`
  } else if (leadStatus === `Lost`) {
    cardBackground = `#FFF7F7`
    btnColor = `#FF5B64`
    borderColor = `1px solid rgba(255, 91, 100, 0.4)`
  } else if (activityStatus === `activity overdue`) {
    cardBackground = `#FFFBF3`
    borderColor = `1px solid #FCCC6D`
  }

  const activeStatusComponent = () => {
    const { color, SelectedIcon } = activityStatusIconAndColor(activityStatus)

    return React.createElement(Icons?.[SelectedIcon], {
      style: { color: color },
      className: styles.statusArrow,
      onClick: onStatusClickHandler,
      size: 2,
    })
  }

  return (
    <div
      className={styles.cardContent}
      style={{ background: cardBackground, border: borderColor }}
    >
      <div
        className={styles.leadTitleContent}
        onClick={onLeadTitleClickHandler}
      >
        {leadTitle}
      </div>

      <div className={styles.btnWrapper}>
        <div className={styles.labelsContent}>
          {leadStatus !== `Open` && (
            <div className={styles.statusBtn}>
              <CustomButton
                label={leadStatus}
                size={'small'}
                color={`#FFFFFF`}
                backgroundColor={btnColor}
                disabled={true}
              />
            </div>
          )}
          {mapLabels}
        </div>
        <div className={styles.statusContent}>{activeStatusComponent()}</div>
      </div>
      <div className={styles.ownerClientContent}>
        <div className={styles.leadOwnerContent}>
          <Avatar name={leadOwnerName} src={leadOwnerImg} size={`small`} />
        </div>
        {contactId && (
          <div className={styles.contactContent}>
            <div>
              <Avatar src={contactImg} size={`small`} />
            </div>
            <div className={styles.contactContentName}>{contactName}</div>
          </div>
        )}
      </div>
      {isOpenActivity && (
        <div>
          <Activities
            eventsData={eventsData}
            eventDateFormat={`'DD-MM-YYYY, h:mm a'`}
            isLoading={false}
          />
        </div>
      )}
    </div>
  )
}

export default KanbanCard
