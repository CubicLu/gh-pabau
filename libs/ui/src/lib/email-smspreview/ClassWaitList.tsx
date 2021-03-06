import React, { FC } from 'react'
import { EmailSMSPreviewProps, ClassWaitListProps } from './EmailSmsPreview'
import { Col, Row } from 'antd'
import styles from './EmailSmsPreview.module.less'
import { Button } from '../button/Button'

export const ClassWaitList: FC<ClassWaitListProps & EmailSMSPreviewProps> = ({
  message,
  buttonColor,
  buttonTitleMessage = 'Click here to book your appointment online:',
  buttonName = 'Book now',
}) => {
  return (
    <>
      <Row gutter={[0, 4]} className={styles.break}>
        <Col>
          <span className={styles.message}>{message}</span>
        </Col>
      </Row>
      <Row className={styles.centerRow}>
        <Col>
          <span className={styles.message}>{buttonTitleMessage}</span>
        </Col>
      </Row>
      <Row gutter={[0, 4]} className={styles.bookAppointment}>
        <Button backgroundColor={buttonColor} className={styles.bookButton}>
          {buttonName}
        </Button>
      </Row>
    </>
  )
}

export default ClassWaitList
