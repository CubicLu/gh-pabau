import React, { FC } from 'react'
import { EmailSMSPreviewProps, DocumentSharedProps } from './EmailSmsPreview'
import { Col, Row } from 'antd'
import styles from './EmailSmsPreview.module.less'
import { Button } from '../button/Button'

export const DocumentShared: FC<DocumentSharedProps & EmailSMSPreviewProps> = ({
  messageLine1,
  messageLine2,
  userEmail,
  userName,
  buttonName = 'View Document',
  buttonColor,
  clinicName,
  closingText,
  signatureBlock,
  infoText,
  userMessage = 'User',
  fromMessage = 'From',
}) => {
  return (
    <>
      <Row className={styles.userDetailWrapper}>
        <Col>
          <div>
            <span className={styles.message}>{messageLine1}</span>
          </div>
          <div className={styles.userDetail}>
            <span>
              {fromMessage}: {clinicName}
            </span>
            <span>
              {userMessage}: {`${userName} (${userEmail})`}
            </span>
          </div>
        </Col>
      </Row>
      <Row className={styles.userDetailWrapper}>
        <Col className={styles.fullWidth}>
          <div>
            <span className={styles.message}>{messageLine2}</span>
          </div>
          <Row gutter={[0, 4]} className={styles.viewDocument}>
            <Button backgroundColor={buttonColor} className={styles.bookButton}>
              {buttonName}
            </Button>
          </Row>
        </Col>
      </Row>
      <Row gutter={[0, 4]} className={`${styles.textBox} ${styles.break}`}>
        <Col>
          <p className={styles.text}>{closingText}</p>
          <p className={styles.text}>{signatureBlock}</p>
        </Col>
      </Row>
      <Row gutter={[0, 4]}>
        <Col>
          <span className={styles.text}>{infoText}</span>
        </Col>
      </Row>
    </>
  )
}

export default DocumentShared
