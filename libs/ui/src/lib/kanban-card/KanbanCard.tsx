import React, { FC } from 'react'
import styles from './KanbanCard.module.less'

import { Avatar } from '../avatar/Avatar'
import * as Icons from '@ant-design/icons'
import { Tag, Popover } from 'antd'
import { CustomButton } from '../button/Button.stories'
import { Button, RadioButton } from '@pabau/ui'
import KanbanCardSkeleton from './skeleton'
import { UserOutlined, PlusOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation('common')

  let cardBackground,
    btnColor,
    borderColor = `White`

  const popOverContent = (statusContent) => (
    <div>
      <div>
        <div>
          <RadioButton
            group={`Schedule Activity`}
            Items={[
              {
                key: `1`,
                label: `Call to Bruno Ballardin`,
                value: `1`,
                check: false,
              },
            ]}
          />
          <div className={styles.contactWrapper}>
            {statusContent ? (
              <p className={styles.overDueContent}>{statusContent}</p>
            ) : (
              ''
            )}
            <p className={styles.contectContentWrapper}>
              <div className={styles.contactContent}>
                <div className={styles.imageContent}>
                  <Avatar
                    className={styles.avatarImg}
                    src={contactImg}
                    icon={<UserOutlined />}
                    size={`small`}
                  />
                </div>{' '}
                <div className={styles.contactContentName}>
                  <span className={styles.nameSection}>{`Jon Snow`}</span>
                </div>
              </div>
            </p>
          </div>
        </div>
      </div>
      <div>
        <Button style={{ width: '100%' }} icon={<PlusOutlined />}>
          {t(`kanban-card.activity.schedule-activity-btn`)}
        </Button>
      </div>
    </div>
  )

  const mapLabels = labels?.map((label, index) => {
    return (
      <Tag key={index} color={`magenta`} className={styles.label}>
        {label}
      </Tag>
    )
  })

  const activityStatusIconAndColor = (
    status
  ): {
    color: string
    SelectedIcon: string
    statusContent: JSX.Element | null
    textContent: JSX.Element | null
  } => {
    switch (status?.toLowerCase()) {
      case 'activity due today':
        return {
          color: '#65CD98',
          SelectedIcon: `DownCircleFilled`,
          statusContent: popOverContent(`Today`),
          textContent: <span>{t(`kanban-card.activity.today`)}</span>,
        }
      case 'no activity scheduled':
        return {
          color: '#FAAD14',
          SelectedIcon: `ExclamationCircleFilled`,
          statusContent: popOverContent(``),
          textContent: null,
        }
      case 'activity overdue':
        return {
          color: '#FF5B64',
          SelectedIcon: `LeftCircleFilled`,
          statusContent: popOverContent(`7 weeks overdue`),
          textContent: <span>{t(`kanban-card.activity.overdue`)}</span>,
        }
      case 'future activity scheduled':
        return {
          color: '#CFCFD7',
          SelectedIcon: `RightCircleFilled`,
          statusContent: popOverContent(`Tomorrow`),
          textContent: <span>{t(`kanban-card.activity.scheduled`)}</span>,
        }
      default:
        return {
          color: '',
          SelectedIcon: '',
          statusContent: null,
          textContent: null,
        }
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
    const {
      color,
      SelectedIcon,
      statusContent,
      textContent,
    } = activityStatusIconAndColor(activityStatus)

    const activityStatusIcon = React.createElement(Icons?.[SelectedIcon], {
      style: { color: color },
      className: styles.statusArrow,
      size: 2,
    })

    return (
      <Popover
        placement="rightTop"
        title={textContent}
        content={statusContent}
        trigger="click"
        overlayClassName={styles.activityPopover}
        style={{ backgroundColor: 'blue' }}
      >
        <div className={styles.activityWrapper}>{activityStatusIcon}</div>
      </Popover>
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
