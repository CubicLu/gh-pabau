import { Language } from '@pabau/ui'
import { Layout as AntLayout } from 'antd'
import Link from 'next/link'
import React, { FC } from 'react'
import { useMedia } from 'react-use'
import { ReactComponent as PabauLogo } from '../../assets/images/pabau-logo.svg'
import ConnectHeader from '../ConnectHeader/ConnectHeader'
import styles from './ConnectLayout.module.less'

const { Content } = AntLayout

interface ConnectLayoutProps {
  onChangeLanguage?: (lang) => void
  clientContext?
}

const ConnectLayout: FC<ConnectLayoutProps> = ({
  onChangeLanguage,
  children,
}) => {
  const isMobile = useMedia('(max-width: 767px)', false)
  return (
    <AntLayout className={styles.connectLayoutContainer}>
      <ConnectHeader />
      <Content className={styles.connectLayoutBody}>{children}</Content>
      <Content className={styles.connectLayoutFooter}>
        <div
          className={
            !isMobile ? styles.footerContainer : styles.footerMobileContainer
          }
        >
          <Link href="https://www.pabau.com">
            <div className={styles.footerLogoContainer}>
              <span style={{ marginRight: '8px' }}>Powered by</span>
              <PabauLogo />
            </div>
          </Link>
          <div className={styles.footerLangSelectContainer}>
            <Language
              defaultValue="English (UK)"
              useAbbreviation={true}
              onSelect={(val) => onChangeLanguage?.(val)}
            />
          </div>
        </div>
      </Content>
    </AntLayout>
  )
}

export default ConnectLayout
