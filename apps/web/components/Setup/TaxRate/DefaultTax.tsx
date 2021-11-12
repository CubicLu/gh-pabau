import { PlusOutlined } from '@ant-design/icons'
import { Button } from '@pabau/ui'
import { Card, Typography } from 'antd'
import Link from 'next/link'
import React from 'react'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import styles from './DefaultTax.module.less'

const cardBodyStyle = {
  padding: '20px 24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
}

export function DefaultTax() {
  const { t } = useTranslationI18()
  const { Title, Paragraph, Text } = Typography

  return (
    <Card className={styles.bottomCard}>
      <Title style={{ paddingBottom: 8 }}>
        {t('setup.taxrate.defaulttax.heading')}
      </Title>
      <Paragraph type="secondary" style={{ maxWidth: 500 }}>
        {t('setup.taxrate.defaulttax.paragraph')}
      </Paragraph>

      <Card bodyStyle={cardBodyStyle} style={{ marginTop: 32 }}>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <Text strong style={{ marginBottom: 12 }}>
            {t('setup.taxrate.defaulttax.services.mahair')}
          </Text>
          <Paragraph type="secondary" style={{ marginBottom: -2 }}>
            {t('setup.taxrate.defaulttax.products.default')}:{' '}
            {t('setup.taxrate.defaulttax.services.notax')}
          </Paragraph>
          <Paragraph type="secondary" style={{ marginBottom: 0 }}>
            {t('setup.taxrate.defaulttax.services.default')}:{' '}
            {t('setup.taxrate.defaulttax.services.notax')}
          </Paragraph>
        </div>
        {/* <Button size="small">{t('setup.taxrate.defaulttax.edit')}</Button> */}
      </Card>

      <Card bodyStyle={cardBodyStyle} className={styles.subCard}>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <Text strong style={{ marginBottom: 12 }}>
            {t('setup.taxrate.defaulttax.services.beautysalon')}
          </Text>
          <Paragraph type="secondary" style={{ marginBottom: -2 }}>
            {t('setup.taxrate.defaulttax.products.default')}:{' '}
            {t('setup.taxrate.defaulttax.services.vats')}
          </Paragraph>
          <Paragraph type="secondary" style={{ marginBottom: 0 }}>
            {t('setup.taxrate.defaulttax.services.default')}:{' '}
            {t('setup.taxrate.defaulttax.services.vat20')}
          </Paragraph>
        </div>
        {/* <Button size="small">{t('setup.taxrate.defaulttax.edit')}</Button> */}
      </Card>
      <Link href="/setup/issuing-company">
        <Button type="text" style={{ marginTop: 20, color: '#54B2D3' }}>
          {t('setup.taxrate.defaulttax.addnew')} <PlusOutlined />
        </Button>
      </Link>
    </Card>
  )
}

export default DefaultTax
