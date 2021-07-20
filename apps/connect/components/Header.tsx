import React, { FC } from 'react'
import styles from './Header.module.less'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { ReactComponent as SkinHealth } from '../../web/assets/images/skin-health-logo.svg'
import { useMedia } from 'react-use'
import { useTranslationI18 } from '../hooks/useTranslationI18'
export interface P {
  currentStep: number
  back: () => void
  visible: boolean
}
export const Header: FC<P> = ({ currentStep, back, visible }) => {
  const isMobile = useMedia('(max-width: 768px)', false)
  const { t } = useTranslationI18()
  const type = () => {
    if (currentStep === 1) {
      return t('connect.onlinebooking.header.service')
    } else if (currentStep === 2) {
      return t('connect.onlinebooking.header.clinic')
    } else if (currentStep === 3) {
      return t('connect.onlinebooking.header.employee')
    } else if (currentStep === 4) {
      return t('connect.onlinebooking.header.date&time')
    } else if (currentStep === 5) {
      return t('connect.onlinebooking.header.confirmation')
    } else if (currentStep === 6) {
      return t('connect.onlinebooking.header.patientinfo')
    } else if (currentStep === 7) {
      return t('connect.onlinebooking.header.payment')
    } else if (currentStep === 8) {
      return ''
    } else {
      return ''
    }
  }
  return (
    <div className={styles.header}>
      <SkinHealth className={styles.headerLogo} />
      <div className={styles.headerInner}>
        <div className={styles.textCenter}>{type()}</div>
        {currentStep <= 7 && (
          <div className={styles.stepText}>
            {t('connect.onlinebooking.header.step')}{' '}
            {currentStep <= 9 && currentStep}/8
          </div>
        )}
      </div>
      {isMobile && visible && (
        <div className={styles.arrowBack} onClick={() => back()}>
          <ArrowLeftOutlined />
        </div>
      )}
    </div>
  )
}
