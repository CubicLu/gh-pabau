import { Button } from '@pabau/ui'
import { Form, Input, Typography } from 'antd'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import ConnectLayout from '../../components/ConnectLayout/ConnectLayout'
import styles from './index.module.less'
import { useTranslation } from 'react-i18next'

const { Title } = Typography

export default function Access() {
  const router = useRouter()
  const { index } = router.query
  const destination = atob(index.toString())
  const { t } = useTranslation('connect')
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [verifyForm, setVerifyForm] = useState(false)
  const [buttonDisable, setButtonDisable] = useState(true)
  const [buttonConfirmDisable, setButtonConfirmDisable] = useState(true)

  const onPhoneChange = (e) => {
    setPhone(e)

    if (e.length > 0) {
      setButtonDisable(false)
    } else {
      setButtonDisable(true)
    }
  }

  const onCodeChange = (e) => {
    setCode(e)

    if (e.length > 0) {
      setButtonConfirmDisable(false)
    } else {
      setButtonConfirmDisable(true)
    }
  }

  const onSubmit = () => {
    setVerifyForm(true)
  }

  const onSubmitCode = () => {
    console.log('onSubmitCode')

    const datetime = Date.now()
    localStorage?.setItem('_2fa', btoa(String(datetime)))
    router.push(destination)
  }

  const onPressResendCode = () => {
    console.log('onPressResendCode')
  }

  return (
    <ConnectLayout>
      <div className={styles.access}>
        <div className={styles.accessContent}>
          <div>
            <div className={styles.item}>
              <span className={styles.title}>Client name</span>
              <span className={styles.content}>J.T</span>
            </div>
            <div className={styles.item}>
              <span className={styles.title}>Date Of birth</span>
              <span className={styles.content}>28/11/1968 (52 years)</span>
            </div>
          </div>
          <div>
            <Title level={4}>{t('ui.access.title')}</Title>
            <p className={styles.textGray}>{t('ui.access.description')}</p>
            <p
              className={classNames(
                styles.textGrayLight,
                styles.confidentialText
              )}
            >
              {t('ui.access.confidential-message')}
            </p>
            <Title level={5} style={{ marginTop: 20 }}>
              {t('ui.access.verification')}
            </Title>

            {!verifyForm ? (
              <Form layout="vertical">
                <Form.Item
                  label={''}
                  name={'phone'}
                  style={{ marginBottom: 10 }}
                >
                  <Input
                    name={'phone'}
                    value={phone}
                    placeholder={t('ui.access.phone.placeholder')}
                    onChange={(e) => onPhoneChange(e.target.value)}
                  />
                </Form.Item>
                <Button
                  size={'large'}
                  htmlType={'submit'}
                  disabled={buttonDisable}
                  onClick={onSubmit}
                >
                  {t('ui.access.get.verification.code')}
                </Button>
              </Form>
            ) : (
              <>
                <p className={styles.textGrayLight}>
                  {t('ui.access.verification.code-description') + ':' + phone}
                </p>
                <Form layout="vertical">
                  <Form.Item
                    label={''}
                    name={'code'}
                    style={{ marginBottom: 10 }}
                  >
                    <Input
                      name={'code'}
                      value={code}
                      placeholder={'Enter code'}
                      onChange={(e) => onCodeChange(e.target.value)}
                    />
                  </Form.Item>
                  <Button
                    size={'large'}
                    htmlType={'submit'}
                    disabled={buttonConfirmDisable}
                    onClick={onSubmitCode}
                  >
                    Confirm
                  </Button>
                  <Button
                    size={'large'}
                    htmlType={'button'}
                    onClick={onPressResendCode}
                    style={{ marginLeft: 20 }}
                  >
                    Resend Code
                  </Button>
                </Form>
              </>
            )}
          </div>
        </div>
      </div>
    </ConnectLayout>
  )
}
