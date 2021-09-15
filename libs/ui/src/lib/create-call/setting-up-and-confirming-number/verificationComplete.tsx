import React, { FC } from 'react'
import styles from '../CreateCall.module.less'
import { useTranslation } from 'react-i18next'
import { Button } from 'antd'
import { Steps } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import { ReactComponent as Completed } from '../../../assets/images/popout/completed.svg'

export interface EnterNumberProps {
  changeScreen?: () => void
  phoneValue: string
}
const VerificationComplete: FC<EnterNumberProps> = ({
  changeScreen,
  phoneValue,
}) => {
  const { t } = useTranslation('common')
  const { Step } = Steps

  return (
    <div>
      <div className={styles.verifyCompleteContainer}>
        <div className={styles.verifyCompleteHeader}>
          <div className={styles.verifyTick}>
            <CheckOutlined style={{ color: 'white' }} />
          </div>
          <p>{t('dashboard.create.modal.enter.verification.header')}</p>
        </div>
        <div className={styles.verifyMessage}>
          <div className={styles.verifyChecked}>
            <div>
              <CheckOutlined style={{ color: '#65CD98' }} />
            </div>
            <p>
              You have 15 calling minutes per month. Your minutes will resent on
              the first of each month. Learn more about{' '}
              <span className={styles.fakeLink} id="fake-link-1">
                adding minutes.
              </span>
            </p>
          </div>
          <div className={styles.verifyChecked}>
            <div>
              <CheckOutlined style={{ color: '#65CD98' }} />
            </div>
            <p>
              You have access to calling within United Kingdom. Learn more about{' '}
              <span className={styles.fakeLink} id="fake-link-1">
                supported countries.
              </span>
            </p>
          </div>
          <div className={styles.verifyChecked}>
            <div>
              <CheckOutlined style={{ color: '#65CD98' }} />
            </div>
            <p>
              When making calls through Pabau, your phone number {phoneValue}{' '}
              will appear on the receiving end.
            </p>
          </div>

          <h5>
            Want to have good quality?{' '}
            <span className={styles.fakeLink} id="fake-link-1">
              Check here{' '}
            </span>{' '}
            to see if you meet technical requirements for calling.
          </h5>
          <Button type={'primary'} onClick={changeScreen} id={'doneBtn'}>
            Done
          </Button>
        </div>
      </div>
      <div className={styles.enterNumberBorder}>
        <div className={styles.createCallSteps}>
          <Steps current={2} className={styles.enterNumberSteps}>
            <Step title="Details" icon={<Completed />} />
            <Step title="Verification" icon={<Completed />} />
            <Step title="Complete" icon={<Completed />} />
          </Steps>
        </div>
      </div>
    </div>
  )
}

export default VerificationComplete
