import {
  UserValidationDocument,
  SendEmailtoValidateUserDocument,
} from '@pabau/graphql'
import { useLiveQuery } from '@pabau/ui'
import { useMutation } from '@apollo/client'
import { Alert, Button } from 'antd'
import { Formik } from 'formik'
import { Form, Input, SubmitButton } from 'formik-antd'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import styles from '../../pages/login.module.less'
import { ResetPasswordValidation } from '@pabau/yup'

interface ResetPasswordProps {
  handlePageShow: (page: string) => void
}

const ResetPassword: FC<ResetPasswordProps> = ({ handlePageShow }) => {
  const { t } = useTranslationI18()
  const [email, setEmail] = useState('')
  const [call, setCall] = useState('')
  const [sentEmail, setSentEmail] = useState('')

  const getQueryVariables = useMemo(() => {
    const queryOptions = {
      variables: { username: call },
    }
    return queryOptions
  }, [call])

  const { data, loading } = useLiveQuery(
    UserValidationDocument,
    getQueryVariables
  )

  const [sendEmailMutation] = useMutation(SendEmailtoValidateUserDocument, {
    onCompleted() {
      setSentEmail('sent')
      setEmail('')
    },
    onError() {
      setSentEmail('error')
    },
  })
  useEffect(() => {
    const timeOutId = setTimeout(() => setCall(email), 50)
    return () => clearTimeout(timeOutId)
  }, [email])

  const onchange = (val, valid) => {
    if (valid && val.target.value !== '') {
      setEmail(val.target.value)
    }
  }
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
            await sendEmailMutation({
              variables: {
                to: email,
                subject: 'Reset Password Request',
                text: 'Reset Password Request',
                html: 'Reset Password Request',
                templateType: 'password-reset-requested',
                fields: [
                  {
                    key: 'url',
                    value: `${window.location.origin}/resetPassword?id=${data}`,
                  },
                ],
              },
              optimisticResponse: {},
            })
          }}
          render={({ isValid, values, errors }) => (
            <Form className={styles.resetWrap} layout="vertical">
              {errors.email === undefined &&
              email !== '' &&
              data === undefined ? (
                <Alert
                  message={t('reset.password.banner.search.title', {
                    fallbackLng: 'en',
                  })}
                  description={t('reset.password.banner.search.description', {
                    fallbackLng: 'en',
                  })}
                  type="error"
                />
              ) : null}
              {sentEmail === 'sent' ? (
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
              {sentEmail === 'error' ? (
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
                label={t('clients.content.column.email', { fallbackLng: 'en' })}
                name={'email'}
                className={styles.signupInput}
              >
                <Input
                  name={'email'}
                  value={values.email}
                  onChange={(val) => onchange(val, isValid)}
                  autoComplete={'off'}
                />
              </Form.Item>
              <div className={styles.btnReset}>
                <SubmitButton
                  className={
                    isValid &&
                    values.email !== '' &&
                    email !== '' &&
                    data !== undefined
                      ? styles.btnStarted
                      : styles.btnDisabled
                  }
                  disabled={
                    isValid &&
                    values.email !== '' &&
                    email !== '' &&
                    data !== undefined
                      ? false
                      : true
                  }
                  type={'primary'}
                  loading={loading}
                >
                  {t('ui.sms-purchase-modal.confirm', { fallbackLng: 'en' })}
                </SubmitButton>
                <Button
                  className={styles.btnReturn}
                  onClick={() => handlePageShow('login')}
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
                  {t('reset.password.start.trial.text', { fallbackLng: 'en' })}
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
