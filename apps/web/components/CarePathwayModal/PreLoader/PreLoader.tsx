import React, { FC } from 'react'
import styles from './Preloader.module.less'
import { ReactComponent as MainLogo } from '../../../assets/images/main-logo.svg'
import { Avatar } from '@pabau/ui'
import { UserOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { useTranslationI18 } from '../../../../web/hooks/useTranslationI18'
export interface PreLoader {
  display?: boolean
  avatar?: string
  pathwayTakenId?: number
  name?: string
}

export const PreLoader: FC<PreLoader> = ({
  display = false,
  avatar,
  pathwayTakenId,
  name,
}) => {
  const router = useRouter()
  const { t } = useTranslationI18()
  setTimeout(function () {
    document
      .querySelector('#spinner')
      .setAttribute('style', 'animation:unset;border-left:4px solid #54bfe1;')
  }, 2000)

  setTimeout(function () {
    document.querySelector('#first_step').setAttribute('style', 'display:none;')
    document
      .querySelector('#thrid_step')
      .setAttribute('style', 'display:block;')
  }, 3000)

  setTimeout(function () {
    document
      ?.querySelector('#forth_step')
      ?.setAttribute('style', 'display:flex;')
    router.push(`/journey/${pathwayTakenId}`)
  }, 5000)

  return (
    <div>
      {display && (
        <div className={styles.back}>
          <div id="first_step" className={styles.first_step}>
            <div className={styles.spinner_wrapper}>
              <Avatar src={avatar} size={'large'} icon={<UserOutlined />} />
              <div id="spinner" className={styles.spinner}></div>
            </div>
            <div className={styles.checkedIn}>
              {t('care.pathway.preloader.checked.in')}
            </div>
            <div className={styles.secound_step}>
              <div className={styles.spinner_wrapper}></div>
            </div>
          </div>
          <div id="thrid_step" className={styles.thrid_step}>
            <div className={styles.logo_sec}>
              <MainLogo />
            </div>
          </div>
          <div id="forth_step" className={styles.forth_step}>
            <div className={styles.circle}></div>
          </div>
        </div>
      )}
    </div>
  )
}
