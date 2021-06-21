import React from 'react'
import { PlusCircleFilled } from '@ant-design/icons'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import styles from './GroupList.module.less'
import { ChatMessage } from '../chatsList/ChatsList'
import { GroupListChannelMultipleUnread } from './GroupListChannelMultipleUnread'
import { GroupListChannelAllRead } from './GroupListChannelAllRead'
import { Chat_Room } from '@pabau/graphql'

export interface Participant {
  id: string
  name: string
  avatarURL?: string
}
export interface Group {
  id: string
  name: string
  messages: ChatMessage[]
  participants: Participant[]
}
interface P {
  onClick?(Group): void
  active?: Group | false
  onCreateModalClick?: () => void
  showChatBox?: boolean
  isNewDm?: boolean
  isHeaderShow?: boolean
  groups?: Group[]
}

export const GroupList = (props: P) => {
  const { t } = useTranslation('common')
  const { groups, active, onClick } = props

  const handleClick = (e: typeof active) => {
    onClick?.(e)
  }

  return (
    <div>
      {props.isHeaderShow && (
        <div
          className={classNames(
            styles.channelsText,
            styles.dFlex,
            styles.channelsHead
          )}
          style={{ cursor: 'pointer', transition: 'all 0.5s' }}
        >
          <span className={classNames(styles.textSm, styles.grayTextColor)}>
            {t('chat.channel')}
          </span>
          <PlusCircleFilled
            onClick={() => props.onCreateModalClick?.()}
            className={styles.addChannelIcon}
            style={{
              color: 'var(--primary-color)',
              fontSize: 'var(--font-size-base)',
            }}
          />
        </div>
      )}
      {groups?.map((group) =>
        group.messages?.length > 1 ? (
          <GroupListChannelMultipleUnread
            onClick={() => handleClick(group)}
            group={group}
            key={group.id}
            active={group === active}
          />
        ) : (
          <GroupListChannelAllRead
            onClick={() => handleClick(group)}
            group={group}
            key={group.id}
            active={group === active}
          />
        )
      )}
    </div>
  )
}

export default GroupList
