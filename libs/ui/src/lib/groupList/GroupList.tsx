import React, { FC, useEffect, useState } from 'react'
import { PlusCircleFilled } from '@ant-design/icons'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import styles from './GroupList.module.less'
import { ChatMessage } from '../chatsList/ChatsList'
import { GroupListChannelMultipleUnread } from './GroupListChannelMultipleUnread'
import { GroupListChannelAllRead } from './GroupListChannelAllRead'

interface P {
  onClick?: () => void
  onCreateModalClick?: () => void
  showChatBox?: boolean
  isNewDm?: boolean
  isHeaderShow?: boolean
  messages: ChatMessage[]
}

export const GroupList = (props: P) => {
  const { messages, onClick } = props
  const [active, setActive] = useState<typeof messages[number]>()
  // const [group, setGroup] = useState<string>('')
  const { t } = useTranslation('common')

  // useEffect(() => {
  //   if (props.showChatBox) {
  //     setActive(false)
  //   }
  //   if (props.isNewDm) {
  //     setActive(false)
  //   }
  // }, [props.showChatBox, props.isNewDm])

  const handleClick = (e: typeof active) => {
    setActive(e)
    onClick?.()
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
      {messages.map((e) => (
        // TODO: use a proper id for key
        <GroupListChannelMultipleUnread
          onClick={handleClick}
          messages={[e]}
          key={e.dateTime}
          active={e === active}
        />
      ))}

      {/* <GroupListChannelAllRead /> */}
    </div>
  )
}

export default GroupList
