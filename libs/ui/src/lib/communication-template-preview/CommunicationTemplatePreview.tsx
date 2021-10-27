import { Smstext } from '@pabau/ui'
import { Button, Card } from 'antd'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './CommunicationTemplatePreview.module.less'

export interface CommunicationTemplatePreviewProps {
  sms: string
}

export const CommunicationTemplatePreview: FC<CommunicationTemplatePreviewProps> =
  ({ sms }) => {
    const { t } = useTranslation('common')

    const btn = (
      <Button className={styles.sendButton}>
        {t('notifications.commonNotificationHeader.sendTestSms')}
      </Button>
    )
    return (
      <div className={styles.previewContainer}>
        <Card title="Example Message" extra={btn}>
          <div className={styles.templatePreview}>
            <Smstext smsMessage={sms} />
          </div>
        </Card>
      </div>
    )
  }

export default CommunicationTemplatePreview
