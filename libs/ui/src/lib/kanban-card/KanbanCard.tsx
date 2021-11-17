import React, { FC } from 'react'
import styles from './KanbanCard.module.less'

import { Avatar } from '../avatar/Avatar'
import * as Icons from '@ant-design/icons'
import { Tag, Tooltip } from 'antd'
import { CustomButton } from '../button/Button.stories'
import KanbanCardSkeleton from './skeleton'
import { UserOutlined } from '@ant-design/icons'

export interface KanbanCardProps {
  isLoading?: boolean
  leadTitle?: string
  onLeadTitleClickHandler?: () => void
  labels?: string[]
  leadOwnerName?: string
  leadOwnerImg?: string
  contactName?: string
  contactImg?: string
  activityStatus?: string
  leadStatus?: string
}

export const KanbanCard: FC<KanbanCardProps> = ({
  isLoading,
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
  let cardBackground,
    btnColor,
    borderColor = `White`

  activityStatus = activityStatus?.toLowerCase()

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

    const activityStatusIcon = React.createElement(Icons?.[SelectedIcon], {
      style: { color: color },
      className: styles.statusArrow,
      size: 2,
    })

    return (
      <Tooltip
        title={activityStatus}
        trigger={['click']}
        overlayStyle={{ width: '150px' }}
      >
        <div className={styles.activityWrapper}>{activityStatusIcon}</div>
      </Tooltip>
    )
  }

  if (isLoading) return <KanbanCardSkeleton />

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

      <div className={styles.labelAndBtn}>
        <div className={styles.labelsContent}>
          {leadStatus && ![`Open`, `Converted`].includes(leadStatus) && (
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
        <div className={styles.ownerImg}>
          <Avatar
            className={styles.avatarImg}
            name={leadOwnerName}
            src={leadOwnerImg}
            size={`small`}
          />
        </div>
        <div className={styles.contactContent}>
          {contactImg && (
            <div>
              <Avatar
                className={styles.avatarImg}
                src={contactImg}
                icon={<UserOutlined />}
                size={`small`}
              />
            </div>
          )}
          {contactName && (
            <div className={styles.contactContentName}>
              <span className={styles.nameSection}>{contactName}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default KanbanCard
