import React, { FC } from 'react'
import styles from './footer.module.less'
import { LanguageDropdown } from '@pabau/ui'
import { ReactComponent as LogoSvg } from '../../../../libs/ui/src/lib/logo/logo.svg'

export interface FooterProps {
  select: (value: string) => void
  translation: (val: string) => string
}
export const Footer: FC<FooterProps> = ({ select, translation }) => {
  // const { t } = useTranslationI18()
  return (
    <div className={styles.clicnikFooter}>
      <div className={styles.footerText}>
        <div className={styles.centerEle}>
          {translation('connect.onlinebooking.footer.data')}
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
          <LanguageDropdown onSelected={(value) => select(value)} />
        </div>
      </div>
    </div>
  )
}
