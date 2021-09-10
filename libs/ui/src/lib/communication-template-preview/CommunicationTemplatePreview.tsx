import { Smstext } from '@pabau/ui'
import { Button, Card } from 'antd'
import React, { FC } from 'react'

import styles from './CommunicationTemplatePreview.module.less'

/* eslint-disable-next-line */
export interface CommunicationTemplatePreviewProps {
  sms: string
}

export const CommunicationTemplatePreview: FC<CommunicationTemplatePreviewProps> =
  ({ sms }) => {
    const btn = <Button className={styles.sendButton}>{'Send Test SMS'}</Button>
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
