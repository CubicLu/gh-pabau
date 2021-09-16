import React, { FC, useState } from 'react'
import styles from '../CreateCall.module.less'
import { useTranslation } from 'react-i18next'
import { Steps, Input, Button } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'
import { ReactComponent as Completed } from '../../../assets/images/popout/completed.svg'
import { ReactComponent as CallVerificationFilled } from '../../../assets/images/popout/callverificationFilled.svg'

export interface VerifyNumberProps {
  changeScreen: () => void
  phoneValue: string
}

const VerifyNumberSMS: FC<VerifyNumberProps> = ({
  changeScreen,
  phoneValue,
}) => {
  const { t } = useTranslation('common')
  const [value, setValue] = useState('')
  const { Step } = Steps

  const onTextChange = (e) => {
    setValue(e.target.value)
  }
  return (
    <div>
      <div className={styles.verifySmsContainer}>
        <div className={styles.enterNumberHeader}>
          <h5>{t('dashboard.create.modal.verify.number.sms.header')}</h5>
        </div>
        <div className={styles.enterNumberInfo}>
          <p>
            Calling {phoneValue} you should receive this call shortly. Answer
            this call to hear a message that includes your verification code.
            Please be prepared to write down the number.
          </p>
          <label>
            {t('dashboard.create.modal.verify.number.sms.verificationmsg')}
          </label>
          <Input onChange={onTextChange} />
          <h6 style={{ marginTop: '10' }}>
            {"Didn't get the code?"}
            <span className={styles.fakeLink} id="fake-link-1">
              {'Call again.'}
            </span>
          </h6>
        </div>
        {value === '' && (
          <Button
            type={'primary'}
            className={styles.verifyNumberButton}
            disabled={true}
          >
            Next
          </Button>
        )}
        {value !== '' && (
          <Button
            type={'primary'}
            className={styles.verifyNumberButton}
            onClick={changeScreen}
          >
            Next
          </Button>
        )}
      </div>
      <div className={styles.enterNumberBorder}>
        <div className={styles.createCallSteps}>
          <Steps current={1} className={styles.enterNumberSteps}>
            <Step title="Details" icon={<Completed />} />
            <Step title="Verification" icon={<CallVerificationFilled />} />
            <Step title="Complete" icon={<CheckCircleOutlined />} />
          </Steps>
        </div>
      </div>
    </div>
  )
}

export default VerifyNumberSMS
