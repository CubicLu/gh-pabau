import React, { FC } from 'react'
import { EmailSMSPreviewProps, NoShowAppointmentProps } from './EmailSmsPreview'
import { Col, Row } from 'antd'
import styles from './EmailSmsPreview.module.less'
import { Button } from '@pabau/ui'

export const NoShowAppointment: FC<
  NoShowAppointmentProps & EmailSMSPreviewProps
> = ({
  message,
  contactNumber,
  footerContact,
  buttonColor,
  closingText,
  signatureBlock,
  bookButtonName = 'Book Now',
  buttonTitleMessage = 'Click here to get your appointment online',
  contactFirstHalfMsg = 'Please get back in touch on',
  contactSecondHalfMsg = 'to reschedule or you can book your next appointment below',
}) => {
  return (
    <>
      <Row gutter={[0, 4]} className={styles.break}>
        <Col>
          <span className={styles.message}>{message}</span>
        </Col>
      </Row>
      {!footerContact ? (
        <Row gutter={[0, 4]} className={styles.titleRow}>
          <Col>
            <span className={styles.message}>
              {contactFirstHalfMsg}{' '}
              <span className={styles.contactInfo}>{contactNumber}</span>
              {contactSecondHalfMsg}
            </span>
          </Col>
        </Row>
      ) : (
        <Row
          gutter={[0, 4]}
          className={`${styles.titleRow} ${styles.centerline}`}
        >
          <Col>
            <span className={styles.message}>{buttonTitleMessage}</span>
          </Col>
        </Row>
      )}
      <Row gutter={[0, 4]} className={styles.bookAppointment}>
        <Button backgroundColor={buttonColor} className={styles.bookButton}>
          {bookButtonName}
        </Button>
      </Row>
      {!footerContact && (
        <Row gutter={[0, 4]} className={styles.textBox}>
          <Col>
            <p className={styles.text}>{closingText}</p>
            <p className={styles.text}>{signatureBlock}</p>
          </Col>
        </Row>
      )}
    </>
  )
}

export default NoShowAppointment
