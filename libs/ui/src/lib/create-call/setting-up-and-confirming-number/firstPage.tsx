import React, { FC } from 'react'
import styles from '../CreateCall.module.less'
import { useTranslation } from 'react-i18next'
import { Button } from 'antd'
import { ReactComponent as CallPoster } from '../../../assets/images/popout/CallPoster.svg'

export interface FirstPageProps {
  changeScreen: () => void
}
const FirstPage: FC<FirstPageProps> = ({ changeScreen }) => {
  const { t } = useTranslation('common')

  return (
    <div className={styles.createCallContainer}>
      <div className={styles.createCallPoster}>
        <CallPoster className={styles.typeIcon} />
      </div>
      <div className={styles.createCallHeaderMessage}>
        {t('dashboard.create.modal.create.call.header.message')}
      </div>
      <div className={styles.createCallBodyMessage}>
        {t('dashboard.create.modal.create.call.body.message')}
      </div>
      <div className={styles.createCallButtons}>
        <div className={styles.createCallConnect} onClick={changeScreen}>
          <Button type={'primary'}>Connect Phone Number</Button>
        </div>
        <div className={styles.createCallLearnMore}>
          <Button type={'primary'} className={styles.createCallLearnMore}>
            Learn More
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FirstPage
