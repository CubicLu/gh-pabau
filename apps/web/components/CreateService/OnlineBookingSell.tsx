import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './CreateService.module.less'

interface OnlineBookingSellProps {
  leftPanelTitle?: string
  rightPanelTitle?: string
  builderContent?: JSX.Element
  previewContent?: JSX.Element
}
const OnlineBookingSell: FC<OnlineBookingSellProps> = ({
  leftPanelTitle,
  rightPanelTitle,
  builderContent,
  previewContent,
}) => {
  const { t } = useTranslation('common')
  return (
    <div className={styles.onlineBookingSellWrapper}>
      <div className={styles.builderWrapper}>
        <div className={styles.builderHeader}>
          <span className={styles.builderText}>
            {leftPanelTitle ||
              t(
                'setup.services.servicestab.createmodal.onlinebooking.buildersellview'
              )}
          </span>
        </div>
        <div className={styles.builderContentWrapper}>{builderContent}</div>
      </div>
      <div className={styles.previewWrapper}>
        <div className={styles.previewHeader}>
          <span className={styles.previewText}>
            {rightPanelTitle ||
              t(
                'setup.services.servicestab.createmodal.onlinebooking.previewsellview'
              )}
          </span>
        </div>
        <div>{previewContent}</div>
      </div>
    </div>
  )
}

export default OnlineBookingSell
