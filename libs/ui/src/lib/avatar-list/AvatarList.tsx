import { Avatar } from '@pabau/ui'
import { AvatarSize } from 'antd/lib/avatar/SizeContext'
import React, { FC } from 'react'
import styles from './AvatarList.module.less'

interface User {
  id: number
  avatarUrl: string
  name: string
  role?: string
}
export interface AvatarListProps {
  users?: User[]
  isLoading?: boolean
  size?: AvatarSize
  tooltipField?: string
}

export const AvatarList: FC<AvatarListProps> = ({
  users = [],
  isLoading = false,
  size = 'default',
  tooltipField = 'name',
}) => {
  return (
    <div className={styles.avatarListContainer}>
      {isLoading ? (
        <div className={styles.avatarList}>
          {[...Array.from({ length: 3 })].map((_, index) => {
            return (
              <Avatar
                key={index}
                isLoading={isLoading}
                size={size}
                zIndex={index + 3}
                marginLeft={`-10px`}
              />
            )
          })}
        </div>
      ) : (
        <>
          <div className={styles.avatarList}>
            {users &&
              Array.isArray(users) &&
              users.length > 0 &&
              users.length <= 3 &&
              users.map((user, index) => (
                <Avatar
                  key={user.id}
                  isLoading={isLoading}
                  size={size}
                  name={user.name}
                  src={user.avatarUrl}
                  zIndex={index + 3}
                  marginLeft={`-10px`}
                  tooltipText={user[tooltipField]}
                />
              ))}
            {users &&
              Array.isArray(users) &&
              users.length > 0 &&
              users.length > 3 &&
              users
                .slice(0, 3)
                .map((user, index) => (
                  <Avatar
                    key={user.id}
                    isLoading={isLoading}
                    size={size}
                    name={user.name}
                    src={user.avatarUrl}
                    zIndex={index + 3}
                    marginLeft={`-10px`}
                    tooltipText={user[tooltipField]}
                  />
                ))}
          </div>
          <p>{users.length > 3 ? `+ ${users.length - 3}` : ''}</p>
        </>
      )}
    </div>
  )
}

export default AvatarList
