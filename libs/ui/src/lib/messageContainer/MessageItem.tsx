import styles from './MessageContainer.module.less'
import { Avatar } from 'antd'
import { ReactComponent as MessageRead } from '../../assets/images/message-read.svg'
import React from 'react'
import { Participant } from '@pabau/ui'

interface P {
  author: Participant
  message: string
  dateTime: string
  direction: 'sent' | 'received'
}

export const MessageItem = (props: P): JSX.Element => {
  const { direction, author, message, dateTime } = props
  return (
    <div
      className={direction === 'sent' ? styles.sendAlign : styles.receivedAlign}
    >
      <Avatar
        className={direction === 'sent' ? styles.sendUser : styles.receivedUser}
        size={32}
        src={author.avatarURL}
      />
      <div
        className={
          direction === 'sent' ? styles.sendMessage : styles.receivedMessage
        }
      >
        <p
          className={
            direction === 'sent'
              ? styles.sendMessageText
              : styles.receivedMessageText
          }
        >
          {message}
        </p>
        <div className={styles.timeRight}>
          <p
            className={
              direction === 'sent'
                ? styles.sendMessageTime
                : styles.receivedMessageTime
            }
          >
            {dateTime}
          </p>
          <MessageRead />
        </div>
      </div>
    </div>
  )
}
