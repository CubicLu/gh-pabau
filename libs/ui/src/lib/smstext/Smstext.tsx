import React from 'react'

import styles from './Smstext.module.less'
import ic_sms from '../../assets/images/sms_triangle.svg'

interface P {
  smsMessage?: string
  manageAppointment?: boolean
  myCustomCss?: string
}

export const Smstext: React.FC<P> = ({
  smsMessage,
  manageAppointment,
  myCustomCss,
}) => {
  return (
    <div className={`${styles.container} ${myCustomCss}`}>
      <div className={styles.smsContainer}>
        <span className={styles.smsText}>{smsMessage}</span>
        <img
          src={ic_sms}
          alt=""
          className={styles.icSms}
          width="8"
          height="14"
        />
      </div>
    </div>
  )
}

export default Smstext
