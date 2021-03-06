import React, { FC } from 'react'
import {
  EmailSMSPreviewProps,
  ConnectRegistrationProps,
} from './EmailSmsPreview'
import { Col, Row } from 'antd'
import styles from './EmailSmsPreview.module.less'

export const ConnectRegistration: FC<
  ConnectRegistrationProps & EmailSMSPreviewProps
> = ({
  message,
  connectURL,
  username,
  password,
  text,
  footerContact,
  credentialMessage = 'Here are your login credentials:',
  userNameMessage = 'User Name',
  passwordMessage = 'Password',
}) => {
  return (
    <>
      <Row gutter={[0, 4]} className={styles.break}>
        <Col>
          <span className={styles.message}>{message}</span>
        </Col>
      </Row>
      <span className={styles.contactInfo}>{connectURL}</span>
      <Row className={styles.loginCredentials}>
        <Col>
          <div>
            <span className={styles.message}>{credentialMessage}</span>
          </div>
          <div className={styles.loginDetail}>
            <span>
              {userNameMessage}: {username}
            </span>
            <span>
              {passwordMessage}: {password}
            </span>
          </div>
        </Col>
      </Row>
      {footerContact && (
        <Row gutter={[0, 4]} className={styles.textBox}>
          <span
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: text || '' }}
          ></span>
        </Row>
      )}
    </>
  )
}

export default ConnectRegistration
