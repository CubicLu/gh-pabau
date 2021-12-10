import { useMutation } from '@apollo/client'
import { PasswordResetDocument } from '@pabau/graphql'
import { Logo, PasswordWithHelper } from '@pabau/ui'
import { Alert, Skeleton } from 'antd'
import { Formik } from 'formik'
import { Form, Input, SubmitButton } from 'formik-antd'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import React, { FC, useState } from 'react'
import styles from './index.module.less'
import { validatePasswordWithConfirm } from '@pabau/yup'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { TokenVerificationDocument } from '@pabau/graphql'

export interface PasswordFormProps {
  password: string
  confirmPassword: string
}
const Index: FC = () => {
  const { t } = useTranslationI18()
  const [loginButton, setLoginButton] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const params = new URLSearchParams(window.location.search)
  const router = useRouter()
  const token = params.get('id') ?? ''

  const { data, loading } = useQuery(TokenVerificationDocument, {
    variables: {
      token: token,
    },
  })
  const [updateUserPassword] = useMutation(PasswordResetDocument, {
    onCompleted() {
      setIsLoading(false)
      setLoginButton(true)
      setError(false)
      router.push('/')
    },
    onError() {
      setIsLoading(false)
      setError(true)
    },
    optimisticResponse: {},
  })

  if (data?.findFirstPasswordResetAuth === null) {
    setTimeout(() => {
      router.push('/')
    }, 5000)
  }

  return (
    <>
      <div className={styles.logo}>
        {!loading ? (
          data?.findFirstPasswordResetAuth ? (
            <Logo />
          ) : null
        ) : (
          <Skeleton.Input active style={{ width: '100px' }} size={'large'} />
        )}
      </div>
      <div className={styles.mainDiv}>
        <div className={styles.formLogin}>
          <div className={styles.errorSection}>
            {data?.findFirstPasswordResetAuth === null && (
              <div className={styles.mainErrorWrap}>
                <div className={styles.errorPage}>
                  <div className={styles.message}>
                    {t('reset.password.error.message', {
                      fallbackLng: 'en',
                    })}
                  </div>
                  <h5>
                    {t('reset.password.token.expired', {
                      fallbackLng: 'en',
                    })}
                  </h5>
                </div>
              </div>
            )}
          </div>
          <div className={styles.formHead}>
            <h1>
              {!loading ? (
                data?.findFirstPasswordResetAuth ? (
                  t('reset.password.title.text', { fallbackLng: 'en' })
                ) : null
              ) : (
                <Skeleton.Input
                  active
                  style={{ width: '300px' }}
                  size={'large'}
                />
              )}
            </h1>
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
            validationSchema={validatePasswordWithConfirm}
            onSubmit={async (value: PasswordFormProps) => {
              setIsLoading(true)
              updateUserPassword({
                variables: {
                  token: token,
                  newPassword1: value.password,
                  newPassword2: value.confirmPassword,
                },
                optimisticResponse: {},
              })
            }}
            render={({ isValid, values, setFieldValue }) => (
              <Form layout="vertical">
                <Form.Item
                  label={
                    !loading ? (
                      data?.findFirstPasswordResetAuth ? (
                        t('reset.username.title', {
                          fallbackLng: 'en',
                        })
                      ) : null
                    ) : (
                      <Skeleton.Input
                        active
                        style={{ width: '150px' }}
                        size={'small'}
                      />
                    )
                  }
                  name={'email'}
                  className={styles.Input}
                >
                  {!loading ? (
                    data?.findFirstPasswordResetAuth ? (
                      <Input
                        name={'email'}
                        value={data?.findFirstPasswordResetAuth?.username}
                        disabled
                      />
                    ) : null
                  ) : (
                    <Skeleton.Input active className={styles.Input} />
                  )}
                </Form.Item>
                <Form.Item
                  label={
                    !loading ? (
                      data?.findFirstPasswordResetAuth ? (
                        t('notifications.connectRegistration.passwordMessage', {
                          fallbackLng: 'en',
                        })
                      ) : null
                    ) : (
                      <Skeleton.Input
                        active
                        style={{ width: '150px' }}
                        size={'small'}
                      />
                    )
                  }
                  name={'password'}
                  className={styles.Input}
                >
                  {!loading ? (
                    data?.findFirstPasswordResetAuth ? (
                      <PasswordWithHelper
                        onChange={(value) => setFieldValue('password', value)}
                        placeholder={t(
                          'account.settings.security.new-password.label',
                          { fallbackLng: 'en' }
                        )}
                      />
                    ) : null
                  ) : (
                    <Skeleton.Input active className={styles.Input} />
                  )}
                </Form.Item>
                <Form.Item
                  label={
                    !loading ? (
                      data?.findFirstPasswordResetAuth ? (
                        t('reset.password.confirm.title', {
                          fallbackLng: 'en',
                        })
                      ) : null
                    ) : (
                      <Skeleton.Input
                        active
                        style={{ width: '150px' }}
                        size={'small'}
                      />
                    )
                  }
                  name={'confirmPassword'}
                  className={styles.Input}
                >
                  {!loading ? (
                    data?.findFirstPasswordResetAuth ? (
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
                    ) : null
                  ) : (
                    <Skeleton.Input active className={styles.Input} />
                  )}
                </Form.Item>
                <div className={`${styles.btnSubmit} ${styles.Input}`}>
                  {!loading ? (
                    data?.findFirstPasswordResetAuth ? (
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
                        {t('reset.password.change.button', {
                          fallbackLng: 'en',
                        })}
                      </SubmitButton>
                    ) : null
                  ) : (
                    <Skeleton.Input active className={styles.Input} />
                  )}
                </div>
              </Form>
            )}
          />
        </div>
      </div>
    </>
  )
}
export default Index
