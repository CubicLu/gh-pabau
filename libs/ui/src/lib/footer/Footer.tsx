import React, { FC } from 'react'
import { Row, Col } from 'antd'
import styles from './Footer.module.less'
import Guides from './Guides'
import Webinar from './Webinar'
import { useTranslation } from 'react-i18next'

export const Footer: FC = () => {
  const { t } = useTranslation('common')

  return (
    <div className={styles.footerBanner}>
      <div className={styles.footerBorder}></div>
      <Row>
        <Col md={16} sm={24}>
          <div className={styles.footerHeading}>
            <h1>{t('footer-guides-header-status-text')}</h1>
          </div>
          <Guides />
        </Col>
        <Col md={8} sm={24} className={styles.footerWebinar}>
          <Webinar />
        </Col>
      </Row>
    </div>
  )
}

export default Footer
