import React, { FC } from 'react'
import {
  EmailSMSPreviewProps,
  ClassesSpotAvailableProps,
} from './EmailSmsPreview'
import { Col, Row } from 'antd'
import styles from './EmailSmsPreview.module.less'
import { Button } from '../button/Button'

export const ClassesSpotAvailable: FC<
  ClassesSpotAvailableProps & EmailSMSPreviewProps
> = ({
  message,
  buttonColor,
  buttonTitleMessage = 'Click here to book your appointment online:',
  bookButtonName = 'Book now',
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
          {bookButtonName}
        </Button>
      </Row>
    </>
  )
}

export default ClassesSpotAvailable
