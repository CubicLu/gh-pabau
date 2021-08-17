import React, { FC, useState, useEffect } from 'react'
import { NumberFormatValues } from 'react-number-format'
import { Avatar, Button, CurrencyInput } from '@pabau/ui'
import {
  CaretDownFilled,
  PoundOutlined,
  CopyOutlined,
  FormOutlined,
} from '@ant-design/icons'
import { Popover } from 'antd'
import userAvatar from '../../assets/images/users/austin.png'
import styles from './RequestPayment.module.less'

export interface Payment {
  avatar: string
  fullName: string
  link: string
  amount: string
}

export interface RequestPaymentProps {
  message: string
  onSharePayLink: (payment: Payment) => void
}

export const RequestPayment: FC<RequestPaymentProps> = ({
  message,
  onSharePayLink,
}) => {
  const [visible, setVisible] = useState(false)
  const [autoPopout, setAutoPopout] = useState(false)
  const link = 'Pabau.me/pay/payd34'
  const [amount, setAmount] = useState('')
  const [editAmount, setEditAmount] = useState(false)
  const fullName = 'James Nicholson'
  const requestPaymentPopover = (
    <div className={styles.requestPaymentPopoverContent}>
      <Avatar src={userAvatar} size={48} />
      <div className={styles.fullName}>{fullName}</div>
      <div className={styles.linkContainer}>
        <div className={styles.link}>{link}</div>
        <CopyOutlined className={styles.copyIcon} />
      </div>
      <div className={styles.amountContainer}>
        {editAmount && (
          <div className={styles.amountInput}>
            <CurrencyInput
              unit="£"
              value={amount}
              onChange={(val: NumberFormatValues) => setAmount(val.value)}
              onBlur={() => setEditAmount(false)}
            />
          </div>
        )}
        {!editAmount && (
          <React.Fragment>
            <div className={styles.amount}>
              {`£${Number(amount).toFixed(2)}`}
            </div>
            <FormOutlined
              className={styles.editIcon}
              onClick={() => setEditAmount(true)}
            />
          </React.Fragment>
        )}
      </div>
      <Button
        type="primary"
        onClick={() =>
          onSharePayLink({ avatar: userAvatar, link, fullName, amount })
        }
      >
        Share Pay Link
      </Button>
    </div>
  )

  useEffect(() => {
    const content = message.toLocaleLowerCase()
    if (
      !autoPopout &&
      (message.includes('invoice') ||
        message.includes('payment') ||
        message.includes('deposit') ||
        message.includes('cost'))
    ) {
      setVisible(true)
      setAutoPopout(true)
    }
    if (content === '') setAutoPopout(false)
  }, [message, autoPopout])

  return (
    <Popover
      trigger="click"
      content={requestPaymentPopover}
      visible={visible}
      onVisibleChange={(visible) => setVisible(visible)}
      overlayClassName={styles.requestPaymentPopover}
    >
      <div
        className={styles.requestPaymentContainer}
        onClick={() => setVisible((e) => !e)}
      >
        <div>
          <PoundOutlined />
        </div>
        <div>Request Payments</div>
        <div>
          <CaretDownFilled />
        </div>
      </div>
    </Popover>
  )
}

export default RequestPayment
