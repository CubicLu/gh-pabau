import { Breadcrumb } from '@pabau/ui'
import { Button, Col, Input, Row, Typography } from 'antd'
import React, { useContext, useState } from 'react'
import qrImg from '../../assets/images/qr.png'
import ConnectLayout from '../../components/ConnectLayout/ConnectLayout'
import styles from './share-record.module.less'
import { useTranslation } from 'react-i18next'
import { ClientContext } from '../../components/UserContext/context/ClientContext'

const { Title } = Typography

export const ShareRecord = () => {
  const { t } = useTranslation('connect')
  const [lang, setLang] = useState('en')
  const code = 2460
  const clientContext = useContext(ClientContext)

  const onPressEmailLink = () => {
    console.log('onPressEmailLink')
  }

  const onPressCopyLink = () => {
    console.log('onPressCopyLink')
  }

  return (
    <ConnectLayout
      onChangeLanguage={(val) => setLang(val)}
      clientContext={clientContext}
    >
      <div className={styles.shareRecord}>
        <div className={styles.shareRecordHeader}>
          <Breadcrumb
            breadcrumbItems={[
              {
                breadcrumbName: t('account.settings.account.title'),
                path: 'connect/account',
              },
              {
                breadcrumbName: t('account.settings.share-record.title'),
                path: '',
              },
            ]}
          />
          <Title>{t('account.settings.share-record.title')}</Title>
        </div>
        <div className={styles.shareRecordMobileHeader}>
          <Title>{t('account.settings.share-record.title')}</Title>
        </div>
        <div className={styles.shareRecordContent}>
          <p className={styles.shareLinkLabel}>
            {t('account.settings.share-record.share-link')}
          </p>
          <Input
            placeholder={t(
              'account.settings.share-record.share-link-place-holder'
            )}
            value="http://localhost:4200/account/share-record"
          />
          <div className={styles.shareLinkBtns}>
            <Button size={'large'} onClick={onPressEmailLink}>
              {t('account.settings.share-record.email-link')}
            </Button>
            <Button type="primary" size={'large'} onClick={onPressCopyLink}>
              {t('account.settings.share-record.copy-link')}
            </Button>
          </div>
          <p className={styles.textSectionTitle}>
            {t('account.settings.share-record.access-code')}
          </p>
          <p>{t('account.settings.share-record.access-code-description')}</p>
          <Title level={2}>{code}</Title>
          <p className={styles.textSectionTitle}>
            {t('account.settings.share-record.qr-code-access')}
          </p>
          <p>{t('account.settings.share-record.qr-code-access-description')}</p>
          <Row style={{ marginBottom: 20 }}>
            <Col span={8}>
              <img src={qrImg} alt="qr code" style={{ maxWidth: 130 }} />
            </Col>
            <Col span={16}>
              <p className={styles.qrText}>
                {t('account.settings.share-record.qr-code')}
                <a href="/">
                  {t('account.settings.share-record.share-your-record-page')}
                </a>
              </p>
            </Col>
          </Row>
        </div>
      </div>
    </ConnectLayout>
  )
}

export default ShareRecord
