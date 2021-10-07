import React, { FC } from 'react'
import styles from './Footer.module.less'
import { LanguageDropdown } from '@pabau/ui'
import { ReactComponent as LogoSvg } from '../../../libs/ui/src/lib/logo/logo.svg'
import { useTranslationI18 } from '../hooks/useTranslationI18'

export const Footer: FC = () => {
  const { t, i18n } = useTranslationI18()

  const handleLanguageChange = (val) => {
    i18n.changeLanguage(val).then()
  }
  return (
    <div className={styles.clicnikFooter}>
      <div className={styles.footerText}>
        <div className={styles.centerEle}>
          {t('connect.onlinebooking.footer.data')}
          &nbsp;
          <a
            href={'https://www.pabau.com'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LogoSvg style={{ height: '15px', width: '60px' }} />
          </a>{' '}
        </div>
        <div className={styles.langLocale}>
          <LanguageDropdown onSelected={(val) => handleLanguageChange(val)} />
        </div>
      </div>
    </div>
  )
}
