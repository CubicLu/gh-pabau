import { Alert, Button } from 'antd'
import { Formik } from 'formik'
import { Form, Input, SubmitButton } from 'formik-antd'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import styles from '../../pages/login.module.less'
import { ResetPasswordValidation } from '@pabau/yup'
import { ForgotPasswordDocument } from '@pabau/graphql'
import { useMutation } from '@apollo/client'
import React, { useState } from 'react'

interface P {
  onClose?(): void
}

const ResetPassword = ({ onClose }: P): JSX.Element => {
  const { t } = useTranslationI18()
  const [sentEmail, setSentEmail] = useState(false)
  const [enable, setEnable] = useState(false)

  const [userValidation, { loading }] = useMutation(ForgotPasswordDocument, {
    onCompleted() {
      setEnable(true)
    },
    onError() {
      setEnable(false)
    },
  })

  return (
    <div>
      <div className={styles.signInForm}>
        <div className={styles.formHead}>
          <h6>{t('reset.password.title', { fallbackLng: 'en' })}</h6>
          <span className={styles.textContent}>
            {t('reset.password.description', { fallbackLng: 'en' })}
          </span>
        </div>
      </div>
      <div className={styles.resetPassword}>
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={ResetPasswordValidation}
          validateOnChange={true}
          onSubmit={async (value) => {
            await userValidation({
              variables: {
                email: value.email,
              },
              optimisticResponse: {},
            })
            setSentEmail(true)
          }}
          render={({ values, isValid }) => (
            <Form className={styles.resetWrap} layout="vertical">
              {sentEmail && enable ? (
                <Alert
                  message={t('reset.password.banner.email.title', {
                    fallbackLng: 'en',
                  })}
                  description={t('reset.password.banner.email.description', {
                    fallbackLng: 'en',
                  })}
                  type="success"
                />
              ) : null}
              {sentEmail && !enable ? (
                <Alert
                  message={t('reset.password.banner.email.error.title', {
                    fallbackLng: 'en',
                  })}
                  description={t(
                    'reset.password.banner.email.error.description',
                    { fallbackLng: 'en' }
                  )}
                  type="error"
                />
              ) : null}
              <Form.Item
                label={t('clients.content.column.email', {
                  fallbackLng: 'en',
                })}
                name={'email'}
                className={styles.signupInput}
              >
                <Input
                  name={'email'}
                  value={values.email}
                  autoComplete={'off'}
                />
              </Form.Item>
              <div className={styles.btnReset}>
                <SubmitButton
                  className={
                    isValid && values.email !== ''
                      ? styles.btnStarted
                      : styles.btnDisabled
                  }
                  disabled={values.email === '' ? true : !isValid}
                  type={'primary'}
                  loading={loading}
                >
                  {t('ui.sms-purchase-modal.confirm', { fallbackLng: 'en' })}
                </SubmitButton>
                <Button
                  className={styles.btnReturn}
                  onClick={() => onClose?.()}
                >
                  {t('reset.password.login.link.text', { fallbackLng: 'en' })}
                </Button>
              </div>
              <div className={styles.linkReset}>
                <p>
                  {' '}
                  {t('reset.password.pabau.account.text', {
                    fallbackLng: 'en',
                  })}
                </p>
                <span>
                  {t('reset.password.start.trial.text', {
                    fallbackLng: 'en',
                  })}
                </span>
              </div>
            </Form>
          )}
        />
      </div>
    </div>
  )
}

export default ResetPassword
