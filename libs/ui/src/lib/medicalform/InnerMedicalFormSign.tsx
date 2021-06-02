import React, { FC } from 'react'
import styles from './Inner.module.less'

interface P {
  signData: string
}

const InnerMedicalFormSign: FC<P> = ({ signData }) => {
  return (
    <div className={styles.formSign}>
      {signData.length > 0 && <img src={signData} alt="" />}
    </div>
  )
}

export default InnerMedicalFormSign
