import classNames from 'classnames'
import * as React from 'react'
import { Group } from '@pabau/ui'
import styles from './GroupList.module.less'

interface P {
  onClick?(): void
  active?: boolean
  group: Group
}

export const GroupListChannelAllRead = (props: P): JSX.Element => {
  const { onClick, active, group } = props
  const { name } = group
  const dateTime = group.messages[0]?.dateTime
  const messageBody = group.messages[0]?.message

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
          {name}
        </p>
        <h6
          className={classNames(
            styles.grayTextColor,
            styles.textSm,
            styles.mbs
          )}
        >
          {dateTime || 'Empty - say Hi!'}
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
