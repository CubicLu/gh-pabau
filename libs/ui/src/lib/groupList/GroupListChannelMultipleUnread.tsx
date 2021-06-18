import classNames from 'classnames'
import * as React from 'react'
import { Badge } from '../badge/Badge'
import { ChatMessage } from '../chatsList/ChatsList'
import styles from './GroupList.module.less'

interface P {
  onClick?(e: ChatMessage): void
  active?: boolean
  messages: ChatMessage[]
}

export const GroupListChannelMultipleUnread = (props: P): JSX.Element => {
  const { onClick, active, messages = [] } = props
  const { dateTime, userName } = messages[0]
  return (
    <div
      onClick={() => onClick?.(messages[0])}
      className={classNames(
        active ? styles.channelGroupActive : styles.channelGroup
      )}
    >
      <div
        className={classNames(styles.dFlex, styles.channelText, styles.cursor)}
      >
        <p
          className={classNames(
            styles.textBlack,
            styles.textMd,
            styles.fontMedium,
            styles.mb,
            styles.cursor
          )}
        >
          {userName}
        </p>
        <h6
          className={classNames(styles.grayTextColor, styles.textSm, styles.mb)}
        >
          {dateTime}
        </h6>
      </div>
      <div className={classNames(styles.dFlex, styles.channelMessage)}>
        <p
          className={classNames(
            styles.grayTextColor,
            styles.textMd,
            styles.fontMedium,
            styles.mb
          )}
        >
          {messages.length.toString()} unread messages
        </p>
        <h6
          className={classNames(styles.grayTextColor, styles.textSm, styles.mb)}
        >
          <Badge
            label={messages.length.toString()}
            // style={{ backgroundColor: '#54B2D3' }}
          />
        </h6>
      </div>
    </div>
  )
}
