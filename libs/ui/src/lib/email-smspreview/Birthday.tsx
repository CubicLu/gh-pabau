import React, { FC } from 'react'
import { BirthDayPreviewProps, EmailSMSPreviewProps } from './EmailSmsPreview'
import { Col, Row } from 'antd'
import styles from './EmailSmsPreview.module.less'
import birthdayGift from '../../assets/images/birthdayGift.png'

export const Birthday: FC<BirthDayPreviewProps & EmailSMSPreviewProps> = ({
  wishingMessage,
  messages = [],
  closingText,
  signatureBlock,
}) => {
  return (
    <>
      <Row gutter={[0, 4]} className={styles.break}>
        <Col className={styles.messageTitle}>
          <span className={styles.message}>{wishingMessage}</span>
        </Col>
      </Row>
      <Row gutter={[0, 4]} className={styles.break}>
        <Col className={styles.imgGift}>
          <img src={birthdayGift} alt={'gift'}></img>
        </Col>
      </Row>
      {messages?.map((msg, key) => {
        return (
          <Row gutter={[0, 4]} className={styles.break} key={key}>
            <Col>
              <span className={styles.message}>{msg}</span>
            </Col>
          </Row>
        )
      })}
      <Row gutter={[0, 4]} className={styles.textBox}>
        <Col>
          <p className={styles.text}>{closingText}</p>
          <p className={styles.text}>{signatureBlock}</p>
        </Col>
      </Row>
    </>
  )
}

export default Birthday
