import { useMutation } from '@apollo/client'
import { PasswordResetDocument } from '@pabau/graphql'
import { Logo, PasswordWithHelper } from '@pabau/ui'
import { Alert } from 'antd'
import { Formik } from 'formik'
import { Form, Input, SubmitButton } from 'formik-antd'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import React, { FC, useState } from 'react'
import styles from './index.module.less'
import { ConfirmPasswordValidation } from '@pabau/yup'

export interface PasswordFormProps {
  password: string
  confirmPassword: string
}

const Index: FC = () => {
  const { t } = useTranslationI18()
  const [loginButton, setLoginButton] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [link, setLink] = useState(false)
  const [error, setError] = useState(false)

  const params = new URLSearchParams(window.location.search)

  const [updateUserPassword] = useMutation(PasswordResetDocument, {
    onCompleted() {
      setIsLoading(false)
      setLoginButton(true)
      setError(false)
      setLink(true)
    },
    onError() {
      setIsLoading(false)
      setError(true)
    },
    optimisticResponse: {},
  })

  return (
    <>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.mainDiv}>
        <div className={styles.formLogin}>
          <div className={styles.formHead}>
            <h1>{t('reset.password.title.text', { fallbackLng: 'en' })}</h1>
          </div>
          {loginButton ? (
            <Alert
              message={t('reset.password.changed.message', {
                fallbackLng: 'en',
              })}
              description={t('reset.password.changed.success.text', {
                fallbackLng: 'en',
              })}
              type="success"
            />
          ) : null}
          {error ? (
            <Alert
              message={t('reset.password.not.changed.message', {
                fallbackLng: 'en',
              })}
              description={t('reset.password.not.changed.description', {
                fallbackLng: 'en',
              })}
              type="error"
            />
          ) : null}
          <Formik
            initialValues={{
              password: '',
              confirmPassword: '',
            }}
            validationSchema={ConfirmPasswordValidation}
            onSubmit={async (value: PasswordFormProps) => {
              setIsLoading(true)
              updateUserPassword({
                variables: {
                  token: `${params.get('id')}`,
                  newPassword: value.confirmPassword,
                },
                optimisticResponse: {},
              })
            }}
            render={({ isValid, values, setFieldValue }) => (
              <Form layout="vertical">
                <Form.Item
                  label={t(
                    'notifications.connectRegistration.passwordMessage',
                    { fallbackLng: 'en' }
                  )}
                  name={'password'}
                  className={styles.signupInput}
                >
                  <PasswordWithHelper
                    onChange={(value) => setFieldValue('password', value)}
                    placeholder={t(
                      'account.settings.security.new-password.label',
                      { fallbackLng: 'en' }
                    )}
                  />
                </Form.Item>
                <Form.Item
                  label={t('reset.password.confirm.title', {
                    fallbackLng: 'en',
                  })}
                  name={'confirmPassword'}
                  className={styles.signupInput}
                >
                  <Input
                    name={'confirmPassword'}
                    type="password"
                    placeholder={t(
                      'account.settings.security.confirm-password.placeholder',
                      {
                        fallbackLng: 'en',
                      }
                    )}
                  />
                </Form.Item>
                <div className={styles.btnSubmit}>
                  <SubmitButton
                    className={
                      isValid &&
                      values.password !== '' &&
                      values.confirmPassword !== ''
                        ? ''
                        : styles.btnDisabled
                    }
                    type={'primary'}
                    loading={isLoading}
                    disabled={
                      isValid &&
                      values.password !== '' &&
                      values.confirmPassword !== ''
                        ? false
                        : true
                    }
                  >
                    {t('reset.password.change.button', { fallbackLng: 'en' })}
                  </SubmitButton>
                </div>
                {link && (
                  <div className={styles.link}>
                    <a href={`/`}>
                      {t('reset.password.login.link.text', {
                        fallbackLng: 'en',
                      })}
                    </a>
                  </div>
                )}
              </Form>
            )}
          />
        </div>
      </div>
    </>
  )
}
export default Index
