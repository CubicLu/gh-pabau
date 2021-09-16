import { UserOutlined, LaptopOutlined } from '@ant-design/icons'
import { Avatar as AntAvatar, Tooltip, Badge } from 'antd'
import { AvatarProps as NativeAvatarProps } from 'antd/lib/avatar/avatar'
import ClassNames from 'classnames'
import React, { FC, useState, useEffect } from 'react'
import stc from 'string-to-color'
import { ReactComponent as EditIcon } from '../../assets/images/edit_icon.svg'
import { ReactComponent as CheckIcon } from '../../assets/images/client-card/check-badge.svg'
import styles from './Avatar.module.less'

export enum AvatarStatus {
  default = 'default',
  active = 'active',
  inactive = 'inactive',
  select = 'select',
  booking = 'booking',
}
export interface AvatarProps extends NativeAvatarProps {
  isLoading?: boolean
  zIndex?: number
  marginLeft?: string
  name?: string
  src?: string
  active?: AvatarStatus
  edit?: boolean
  isTooltip?: boolean
  handleCheck?: (name, checkable) => void
  checkList?: string[]
  counter?: string | number
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
  handleCheck,
  checkList,
  counter,
  ...props
}) => {
  const [load] = useState(true)
  const [shortName, setShortName] = useState('')
  const [selectAvatar, setSelectAvatar] = useState(false)
  const [firstName, setFirstName] = useState('')

  const bookingBadge = (
    <div className={styles.bookingBadgeContainer}>
      <LaptopOutlined />
    </div>
  )

  useEffect(() => {
    setShortName(
      name
        .toUpperCase()
        .split(' ')
        .map((item) => item.charAt(0))
        .join('')
    )
    setFirstName(
      name
        .split(' ')
        .map((item, index) => {
          if (index === 0) {
            return item.charAt(0).toUpperCase() + item.slice(1)
          }
          return null
        })
        .join('')
    )
    if (checkList?.includes(name)) {
      setSelectAvatar(true)
    } else if (!checkList?.includes(name)) {
      setSelectAvatar(false)
    }
  }, [name, checkList])

  return active !== AvatarStatus.booking ? (
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
      ) : active !== AvatarStatus.select ? (
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
              active !== AvatarStatus.default && (
                <div
                  className={
                    active === AvatarStatus.active
                      ? styles.avatarStatus
                      : ClassNames(styles.avatarStatus, styles.avatarInactive)
                  }
                />
              )
            )}
          </div>
        </Tooltip>
      ) : (
        <div
          className={selectAvatar ? styles.selectAvatar : styles.normalAvatar}
          onClick={() => {
            if (handleCheck) {
              setSelectAvatar(!selectAvatar)
              handleCheck(name, !selectAvatar)
            }
          }}
        >
          {load && src?.length > 0 ? (
            selectAvatar ? (
              <Badge count={<CheckIcon />} offset={[-8, 33]}>
                <AntAvatar {...props} src={src} shape="circle" />
              </Badge>
            ) : (
              <AntAvatar {...props} src={src} shape="circle"></AntAvatar>
            )
          ) : (
            <AntAvatar
              {...props}
              shape="circle"
              style={{ backgroundColor: stc(name) }}
            >
              {shortName}
            </AntAvatar>
          )}
        </div>
      )}
      {active === AvatarStatus.select && (
        <div className={styles.userNameContainer}>
          <span className={styles.userName}>{firstName}</span>
          {counter !== undefined && (
            <span className={styles.selectCounter}>{`(${counter})`}</span>
          )}
        </div>
      )}
    </div>
  ) : (
    <div className={styles.bookingAvatar}>
      <Badge
        count={
          <Tooltip title="Online Booking" overlayStyle={{ width: '120px' }}>
            {bookingBadge}
          </Tooltip>
        }
      >
        <AntAvatar {...props} src={src} shape="circle" />
      </Badge>
    </div>
  )
}

export default Avatar
