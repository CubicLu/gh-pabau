import React, { FC } from 'react'
import { EmailSMSPreviewProps, PackageSessionProps } from './EmailSmsPreview'
import { Col, Row } from 'antd'
import styles from './EmailSmsPreview.module.less'
import { Button } from '../button/Button'

export const PackageSession: FC<PackageSessionProps & EmailSMSPreviewProps> = ({
  message,
  buttonColor,
  buttonName = 'Purchase Package',
}) => {
  return (
    <Row className={styles.messageContent}>
      <Col>
        <span className={styles.line}>{message}&nbsp;</span>
      </Col>
      <Col className={styles.purchaseButton}>
        <span>
          <Button type={'primary'} backgroundColor={buttonColor}>
            {buttonName}
          </Button>
        </span>
      </Col>
    </Row>
  )
}

export default PackageSession
