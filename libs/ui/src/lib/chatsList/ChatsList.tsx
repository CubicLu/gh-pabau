import { Avatar } from '@pabau/ui'
import { Badge } from 'antd'
import classNames from 'classnames'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as MessageRead } from '../../assets/images/message-read.svg'
import styles from './ChatsList.module.less'

export interface ChatMessage {
  id: string

  /** The username or channel to display */
  userName: string

  image?: string
  message: string
  unread?: number
  dateTime: string
  isOnline?: boolean
  isMultiple?: boolean
  onClick?(): void
  active?: boolean
}

interface P {
  onClick?(ChatMessage): void
  active?: ChatMessage | false
  messages?: ChatMessage[]
  showGroupChatBox?: boolean
  isNewDm?: boolean
  isHeaderShow?: boolean
}

export const ChatsList = (props: P): JSX.Element => {
  const { t } = useTranslation('common')
  const { messages, active, onClick } = props

  return (
    <>
      {props.isHeaderShow && (
        <div className={classNames(styles.channelsText, styles.channelsHead)}>
          <p className={classNames(styles.grayTextColor, styles.textSm)}>
            {t('chat.chats')}
          </p>
        </div>
      )}
      <div>
        {messages?.map((message) => {
          const {
            id,
            message: messageBody,
            isOnline = true,
            unread,
            dateTime,
            image,
            userName,
          } = message

          // if (!fromUser) throw new Error('Item found with no fromUser')
          // const { image } = fromUser
          return (
            <div
              key={id}
              onClick={() => onClick?.(message)}
              className={styles.cursor}
            >
              <div
                className={classNames(
                  styles.flex,
                  active === message
                    ? styles.profileChatSpaceActive
                    : styles.porfileChatSpace
                )}
              >
                <div className={styles.chatProfile}>
                  <Badge
                    dot
                    color={isOnline ? '#65CD98' : '#FF9E44'}
                    offset={[-2, 32]}
                    size="default"
                    style={{
                      height: '12px',
                      width: '12px',
                      border: '2px solid #fff',
                    }}
                  >
                    <Avatar size={40} src={image} />
                  </Badge>
                </div>
                <div className={styles.chatText}>
                  <div className={classNames(styles.dFlex, styles.userDetails)}>
                    <p
                      className={classNames(
                        styles.textBlack,
                        styles.mb,
                        styles.textMd
                      )}
                    >
                      {userName}
                    </p>
                    <p
                      className={classNames(
                        styles.grayTextColor,
                        styles.mb,
                        styles.textSm
                      )}
                    >
                      {dateTime}
                    </p>
                  </div>
                  <div className={styles.dFlex}>
                    <span
                      className={classNames(
                        styles.grayTextColor,
                        styles.mb,
                        styles.fontMedium,
                        styles.textSm,
                        styles.userMessage
                      )}
                    >
                      {messageBody}
                    </span>
                    <h6
                      className={classNames(
                        styles.grayTextColor,
                        styles.textSm,
                        styles.mb
                      )}
                    >
                      {unread ? (
                        <Badge
                          count={unread}
                          style={{ backgroundColor: '#54B2D3' }}
                        />
                      ) : (
                        <MessageRead />
                      )}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default ChatsList
