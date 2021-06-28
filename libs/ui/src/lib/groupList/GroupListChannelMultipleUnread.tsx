import classNames from 'classnames'
import * as React from 'react'
import { Badge } from '../badge/Badge'
import styles from './GroupList.module.less'
import { Group } from '@pabau/ui'

interface P {
  onClick?(): void
  active?: boolean
  group: Group
}

export const GroupListChannelMultipleUnread = (props: P): JSX.Element => {
  const { onClick, active, group } = props
  const { dateTime } = group.messages[0]
  return (
    <div
      onClick={() => onClick?.()}
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
          {group.name}
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
          {group.messages.length} unread messages
        </p>
        <h6
          className={classNames(styles.grayTextColor, styles.textSm, styles.mb)}
        >
          <Badge
            label={group.messages.length.toString()}
            // style={{ backgroundColor: '#54B2D3' }}
          />
        </h6>
      </div>
    </div>
  )
}
