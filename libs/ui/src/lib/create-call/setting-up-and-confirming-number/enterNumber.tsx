import { FC, useState } from 'react'
import * as React from 'react'
import styles from '../CreateCall.module.less'
import { useTranslation } from 'react-i18next'
import { PhoneNumberInput } from '../../phone-number-input/PhoneNumberInput'
import { Radio } from 'antd'
import { Steps } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'
import { ReactComponent as CallVerification } from '../../../assets/images/popout/CallVerification.svg'
import { ReactComponent as CallFilled } from '../../../assets/images/popout/callFilled.svg'
import { Form, SubmitButton } from 'formik-antd'
import { Formik } from 'formik'
import * as Yup from 'yup'

export interface EnterNumberProps {
  changeScreenSMS?: () => void
  changeScreenCall?: () => void
  phoneValue?: string
  setPhoneValue: (val) => void
}

const EnterNumber: FC<EnterNumberProps> = ({
  changeScreenSMS,
  changeScreenCall,
  phoneValue,
  setPhoneValue,
}) => {
  const { t } = useTranslation('common')
  const [value, setValue] = useState(1)
  const [radioValue, setRadioValue] = useState(1)
  // const [phoneValue, setPhoneValue] = useState('')
  const [valid, setValid] = useState(false)
  const { Step } = Steps

  const userData = {
    phone: '',
  }
  const formikValidationSchema = Yup.object({
    phone: Yup.string().required('phone is required'),
  })

  const onRadioChange = (e) => {
    setValue(e.target.value)
    setRadioValue(e.target.value)
  }

  return (
    <div>
      <div className={styles.createEnterNumberContainer}>
        <div className={styles.enterNumberHeader}>
          <h5>{t('dashboard.create.modal.enter.number.header')}</h5>
        </div>
        <div className={styles.enterNumberInfo}>
          <h6>{t('dashboard.create.modal.enter.number.info')}</h6>
        </div>
        <div className={styles.enterNumberPhoneInput}>
          <Formik
            enableReinitialize={true}
            initialValues={userData}
            validationSchema={formikValidationSchema}
            onSubmit={(values) => {
              // console.log(values)
            }}
          >
            {({ setFieldValue, isValid }) => (
              <Form layout="vertical">
                <div className={styles.formPhoneInput}>
                  <div className={styles.devOne}>
                    <Form.Item name={'PhoneInput'}>
                      <PhoneNumberInput
                        value={userData.phone}
                        onChange={(value) => {
                          setValid(isValid)
                          setFieldValue('phone', value)
                          setPhoneValue('+' + value)
                        }}
                      />
                    </Form.Item>
                  </div>

                  <div className={styles.enterNumberTextMe}>
                    {radioValue === 1 ? (
                      <SubmitButton
                        className={styles.btnSubmit}
                        type="primary"
                        disabled={valid ? false : true}
                        onClick={changeScreenSMS}
                      >
                        Text Me
                      </SubmitButton>
                    ) : (
                      <SubmitButton
                        className={styles.btnSubmit}
                        type="primary"
                        disabled={!valid}
                        onClick={changeScreenCall}
                      >
                        Call Me
                      </SubmitButton>
                    )}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className={styles.enterNumberInfo}>
          <h4>{t('dashboard.create.modal.enter.number.rates')}</h4>
        </div>
        <div className={styles.enterNumberRates}>
          <Radio.Group onChange={onRadioChange} value={value}>
            <Radio value={1}>SMS message</Radio>
            <Radio value={2}>Phone Call</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className={styles.enterNumberBorder}>
        <div className={styles.createCallSteps}>
          <Steps current={0} className={styles.enterNumberSteps}>
            <Step title="Details" icon={<CallFilled />} />
            <Step title="Verification" icon={<CallVerification />} />
            <Step title="Complete" icon={<CheckCircleOutlined />} />
          </Steps>
        </div>
      </div>
    </div>
  )
}

export default EnterNumber
