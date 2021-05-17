import React from 'react'
import styles from './SetupChip.module.less'
import { useTranslation } from 'react-i18next'
import emptyImage from '../../assets/images/empty.png'

export function SetupEmptySearch(): JSX.Element {
  const { t } = useTranslation('common')
  return (
    <div className={styles.emptyWrapper}>
      <img src={emptyImage} alt={'empty'} />
      <div>
        <p className={styles.emptyTitle}>
          {t('setup.page.search.no.result.label')}
        </p>
        <span className={styles.emptyDesc}>
          {t('setup.page.search.no.result.subTitle')}
        </span>
      </div>
    </div>
  )
}

export default SetupEmptySearch
