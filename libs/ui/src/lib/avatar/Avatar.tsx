import { UserOutlined } from '@ant-design/icons'
import { Avatar as AntAvatar, Tooltip } from 'antd'
import { AvatarProps as NativeAvatarProps } from 'antd/lib/avatar/avatar'
import ClassNames from 'classnames'
import React, { FC, useState } from 'react'
import stc from 'string-to-color'
import { ReactComponent as EditIcon } from '../../assets/images/edit_icon.svg'
import styles from './Avatar.module.less'

export enum Status {
  default = 'default',
  active = 'active',
  inactive = 'inactive',
}
export interface AvatarProps extends NativeAvatarProps {
  isLoading?: boolean
  zIndex?: number
  marginLeft?: string
  name?: string
  src?: string
  active?: Status
  edit?: boolean
  isTooltip?: boolean
}

export const Avatar: FC<AvatarProps> = ({
  isLoading = false,
  zIndex = 1,
  marginLeft = '0',
  name = '',
  src = '',
  active = 'default',
  edit,
  isTooltip = true,
  ...props
}) => {
  const [load] = useState(true)
  const [shortName] = useState('')

  return (
    <div className={styles.avatarContainer} style={{ zIndex, marginLeft }}>
      {isLoading ? (
        <div className={styles.avatarLoading}>
          <AntAvatar
            {...props}
            icon={<UserOutlined />}
            src={''}
            shape="circle"
          />
        </div>
      ) : (
        <Tooltip
          title={isTooltip ? name : ''}
          placement="bottom"
          overlayClassName={styles.overlay}
        >
          <div className={styles.avatarDisplay}>
            {load && src?.length > 0 ? (
              <AntAvatar {...props} src={src} shape="circle" />
            ) : (
              <AntAvatar
                {...props}
                shape="circle"
                style={{ backgroundColor: stc(name) }}
              >
                {shortName}
              </AntAvatar>
            )}
            {edit ? (
              <div className={styles.edit}>
                <EditIcon />
              </div>
            ) : (
              active !== Status.default && (
                <div
                  className={
                    active === Status.active
                      ? styles.avatarStatus
                      : ClassNames(styles.avatarStatus, styles.avatarInactive)
                  }
                />
              )
            )}
          </div>
        </Tooltip>
      )}
    </div>
  )
}

export default Avatar
