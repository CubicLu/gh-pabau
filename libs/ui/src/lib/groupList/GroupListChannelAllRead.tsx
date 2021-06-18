import classNames from 'classnames'
import * as React from 'react'
import { ChatMessage } from '../chatsList/ChatsList'
import styles from './GroupList.module.less'

interface P {
  onClick?(): void
  active?: boolean
  message: ChatMessage
}

export const GroupListChannelAllRead = (props: P) => {
  const { onClick, active, message = {} as Required<P['message']> } = props
  const { message: messageBody, dateTime, userName } = message
  return (
    <div
      onClick={onClick}
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
          className={classNames(
            styles.grayTextColor,
            styles.textSm,
            styles.mbs
          )}
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
          {messageBody}
        </p>
      </div>
    </div>
  )
}
