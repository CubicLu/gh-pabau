import React from 'react'
import styles from '../../../../../libs/ui/src/lib/client-dashboard-layout/ClientDashboardLayout.module.less'
import { TickerTile, Avatar } from '@pabau/ui'
import { ReactComponent as Mail } from '../../../../../libs/ui/src/assets/images/mail.svg'
import { ReactComponent as MessageRead } from '../../../../../libs/ui/src/assets/images/message-read.svg'
import { ReactComponent as NoConversation } from '../../../../../libs/ui/src/assets/images/client-card/ticker/no-conversation.svg'

const noItemImage = <NoConversation />

//TODO: convert this to a useXxxQuery
const conversation = { users: [] }

export const LatestConversations = () => (
  <div className={styles.latestConversationsContainer}>
    <TickerTile
      title="Latest conversations"
      items={[
        <div
          key={'latest-conversations-1'}
          className={styles.tile}
          style={{ width: '100%' }}
        >
          {conversation.users.map((user, index) => (
            <div
              className={styles.conversation}
              key={`conversation-item-${index}`}
            >
              <div>
                <Avatar src={user.avatarUrl} name={user.name} size={24} />
              </div>
              <div>
                <div className={styles.name}>{user.name}</div>
                <div className={styles.type}>
                  <Mail style={{ marginRight: '4px' }} />
                  {user.type}
                </div>
              </div>
              <div>
                <span>{user.date}</span>
                <MessageRead />
              </div>
            </div>
          ))}
        </div>,
      ]}
      isBlank={conversation.users.length === 0}
      noItemText="No conversations"
      noItemImage={noItemImage}
      speed={2500}
    />
  </div>
)
