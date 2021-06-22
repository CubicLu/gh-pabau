import React, { FC, VoidFunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { Tooltip, Skeleton } from 'antd'
import { useMedia } from 'react-use'
import { KeyOutlined } from '@ant-design/icons'
import className from 'classnames'
import { Button, Avatar, Status as AvatarStatusProps } from '@pabau/ui'
import Airplane from '../../assets/images/airplane.svg'
import Sickness from '../../assets/images/sickness.svg'
import styles from './UserTile.module.less'

interface Vacation {
  startDate?: string
  endDate?: string
}

export interface UserProps {
  id?: number
  name: string
  title: string
  img?: string | undefined
  active?: boolean
  available?: boolean
  owner?: boolean
  admin?: boolean
  vacation?: Vacation
  isPending?: boolean
  isLoading?: boolean
  isSick?: boolean
}

interface UnavailableProps {
  vacation?: Vacation
}

const UnavailableStatus: FC<UnavailableProps> = ({ vacation }) => {
  const { t } = useTranslation('common')
  return (
    <Tooltip
      title={`${t('team.user.grid.on.vacation.tooltip')}: ${
        vacation?.startDate
      }  - ${vacation?.endDate}`}
      placement="bottom"
    >
      <div
        className={styles.inner}
        style={{
          backgroundImage: `url(${Airplane})`,
        }}
      />
    </Tooltip>
  )
}

const UserIsAdmin: VoidFunctionComponent = (): JSX.Element => {
  const { t } = useTranslation('common')
  return (
    <Tooltip title={t('team.user.grid.user.admin.tooltip')} placement="bottom">
      <KeyOutlined className={styles.admin} />
    </Tooltip>
  )
}

export const UserTile: FC<UserProps> = ({
  name,
  title,
  vacation,
  active = false,
  available,
  img,
  owner = false,
  admin = false,
  isPending = false,
  isLoading = false,
  isSick = false,
}: UserProps): JSX.Element => {
  const { t } = useTranslation('common')
  const isMobile = useMedia('(max-width: 767px)', false)

  const online: AvatarStatusProps = active
    ? AvatarStatusProps.active
    : AvatarStatusProps.default

  const OwnerButtonJsx = (): JSX.Element => {
    return (
      <div className={styles.btnOwner}>
        {owner && <Button>{t('team.user.grid.owner.button')}</Button>}
      </div>
    )
  }

  return (
    <div className={styles.tile}>
      {isLoading ? (
        <div className={styles.wrapper}>
          <div className={styles.mobDevUser}>
            <Skeleton.Avatar active size={64} shape={'circle'} />
            <div className={styles.userInfo}>
              <Skeleton
                className={styles.skeletonName}
                paragraph={false}
                round
                active
              />
              <div
                className={className(
                  styles.titleWrapper,
                  styles.skeletonTitleWrapper
                )}
              >
                <Skeleton
                  className={styles.skeletonDes}
                  paragraph={false}
                  round
                  active
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.mobDevUser}>
            <Avatar
              className={styles.avatar}
              size={64}
              src={img}
              active={online}
              name={name}
            />
            {!isMobile && <OwnerButtonJsx />}
            <div className={styles.userInfo}>
              <p className={styles.name}>{name}</p>
              <div className={styles.titleWrapper}>
                {admin && <UserIsAdmin />}
                <p className={styles.title}>{title}</p>
              </div>
            </div>
          </div>
          <div className={styles.vacationWrapper}>
            {available && isPending && (
              <Button
                className={styles.btnVacationPending}
                disabled={true}
                type={'default'}
              >
                <span className={styles.btnVacationPendingInnerText}>
                  {t('team.user.grid.pending.button')}
                </span>
              </Button>
            )}
            {!available && <UnavailableStatus vacation={vacation} />}
            {isSick && (
              <div
                className={styles.inner}
                style={{
                  backgroundImage: `url(${Sickness})`,
                }}
              />
            )}
            {isMobile && <OwnerButtonJsx />}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserTile
