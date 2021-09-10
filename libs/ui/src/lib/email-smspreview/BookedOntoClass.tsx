import React, { FC } from 'react'
import { BookedOntoClassProps, EmailSMSPreviewProps } from './EmailSmsPreview'
import { Col, Divider, Row } from 'antd'
import { ReactComponent as Calendar } from '../../assets/images/calendar.svg'
import styles from './EmailSmsPreview.module.less'

export const BookedOntoClass: FC<BookedOntoClassProps & EmailSMSPreviewProps> =
  ({
    dateTime,
    consultancyName,
    consultationDetail,
    message,
    address,
    appointmentDetailMessage = 'Your class appointment details',
    regards = 'Kind regards,',
    regardsName = 'Your friends at The Clinic',
  }) => {
    return (
      <>
        <Divider className={styles.dividerHr} />
        <Row
          justify="start"
          align="middle"
          className={styles.calenderAppointRow}
        >
          <Col>
            <Calendar />
            <span className={styles.calenderAppoint}>
              {appointmentDetailMessage}:
            </span>
          </Col>
        </Row>
        <Row className={styles.calenderDateTime}>
          <Col>
            <p>{dateTime}</p>
            <p>{consultationDetail}</p>
          </Col>
        </Row>
        <Row className={styles.consultancyNameAddr}>
          <Col>
            <span className={styles.consultancyName}>{consultancyName}</span>
            <p className={styles.address}>{address}</p>
          </Col>
        </Row>
        <Row className={styles.messageContent}>
          <Col>
            <span className={styles.line}>{message}</span>
          </Col>
        </Row>
        <Row className={styles.textBox}>
          <Col>
            <p>{regards}</p>
            <p>{regardsName}</p>
          </Col>
        </Row>
      </>
    )
  }

export default BookedOntoClass
