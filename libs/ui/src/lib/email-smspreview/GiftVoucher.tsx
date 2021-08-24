import React, { FC } from 'react'
import { EmailSMSPreviewProps, GiftVoucherProps } from './EmailSmsPreview'
import { Col, Row } from 'antd'
import styles from './EmailSmsPreview.module.less'
import { Button } from '@pabau/ui'

export const GiftVoucher: FC<GiftVoucherProps & EmailSMSPreviewProps> = ({
  value,
  voucherCode,
  expiry,
  consultancyName,
  buttonColor,
  displayViewButton = false,
  buttonName = 'View Voucher',
  valueMessage = 'Value',
  voucherCodeMessage = 'Voucher Code',
  expiryMessage = 'Expiry',
}) => {
  return (
    <>
      {value && (
        <Row gutter={[0, 4]} className={styles.break}>
          <Col>
            <span className={styles.contactInfo}>
              {valueMessage}:&nbsp;{value}
            </span>
          </Col>
        </Row>
      )}
      {voucherCode && (
        <Row gutter={[0, 4]} className={styles.break}>
          <Col>
            <span className={styles.contactInfo}>
              {voucherCodeMessage}:&nbsp;{voucherCode}
            </span>
          </Col>
        </Row>
      )}
      {expiry && (
        <Row gutter={[0, 4]} className={styles.break}>
          <Col>
            <span className={styles.contactInfo}>
              {expiryMessage} :&nbsp;{expiry}
            </span>
          </Col>
        </Row>
      )}
      {consultancyName && (
        <Row gutter={[0, 4]} className={styles.break}>
          <Col>
            This Voucher can be redeemed against any services at&nbsp;
            {consultancyName}
          </Col>
        </Row>
      )}
      {displayViewButton && (
        <Row gutter={[0, 4]} className={styles.bookAppointment}>
          <Button backgroundColor={buttonColor} className={styles.bookButton}>
            {buttonName}
          </Button>
        </Row>
      )}
    </>
  )
}

export default GiftVoucher
