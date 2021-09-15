import React, { FC } from 'react'
import styles from '../CreateCall.module.less'
import { useTranslation } from 'react-i18next'
import { ReactComponent as WebCalls } from '../../../assets/images/popout/WebCalls.svg'
import { ReactComponent as TransferCall } from '../../../assets/images/popout/TransferCall.svg'
import { ReactComponent as TransferCallLogo } from '../../../assets/images/popout/TransferCallLogo.svg'
export interface AddPhoneRecordProps {
  changeScreen: () => void
}
const AddPhoneRecord: FC<AddPhoneRecordProps> = ({ changeScreen }) => {
  const { t } = useTranslation('common')
  return (
    <div className={styles.createCallContainer}>
      <div className={styles.createCallHeaderMessage}>
        {t('dashboard.create.modal.add.phone.header.message')}
      </div>
      <div className={styles.createCallBodyMessage}>
        {t('dashboard.create.modal.add.phone.body.message')}
      </div>
      <div className={styles.createCallButtons}>
        <div className={styles.webCall} onClick={changeScreen}>
          <WebCalls />
        </div>
        <div className={styles.callLog}>
          <TransferCallLogo className={styles.callLogo} />
          <TransferCall />
        </div>
      </div>
    </div>
  )
}

export default AddPhoneRecord
