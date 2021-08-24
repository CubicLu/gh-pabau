import React, { FC } from 'react'
import { Button } from '@pabau/ui'
import styles from './index.module.less'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import Link from 'next/link'

export const Unauthorized: FC = () => {
  const { t } = useTranslationI18()

  return (
    <div className={styles.mainErrorWrap}>
      <div className={styles.errorPage}>
        <h1>{t('unauthorized.page.403.label')}</h1>
        <h5>{t('unauthorized.page.title')}</h5>
        <Link href="/">
          <Button className={styles.btnHome} type="primary">
            {t('unauthorized.page.button.label')}
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Unauthorized
