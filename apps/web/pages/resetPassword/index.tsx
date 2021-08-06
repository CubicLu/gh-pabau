import { useMutation } from '@apollo/client'
import { PasswordResetDocument } from '@pabau/graphql'
import { Logo, PasswordWithHelper } from '@pabau/ui'
import { Alert, Skeleton } from 'antd'
import { Formik } from 'formik'
import { Form, Input, SubmitButton } from 'formik-antd'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import React, { FC, useState } from 'react'
import styles from './index.module.less'
import { ConfirmPasswordValidation } from '@pabau/yup'
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

  return (
    <>
      {!loading && (
        <div className={styles.logo}>
          <Logo />
        </div>
      )}
      <div className={styles.mainDiv}>
        <div className={styles.formLogin}>
          <div className={styles.formHead}>
            <h1>
              {!loading ? (
                t('reset.password.title.text', { fallbackLng: 'en' })
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
            validationSchema={ConfirmPasswordValidation}
            onSubmit={async (value: PasswordFormProps) => {
              setIsLoading(true)
              updateUserPassword({
                variables: {
                  token: token,
                  newPassword: value.confirmPassword,
                },
                optimisticResponse: {},
              })
            }}
            render={({ isValid, values, setFieldValue }) => (
              <Form layout="vertical">
                <Form.Item
                  label={
                    !loading ? (
                      t('reset.company.name.title', {
                        fallbackLng: 'en',
                      })
                    ) : (
                      <Skeleton.Input
                        active
                        style={{ width: '150px' }}
                        size={'small'}
                      />
                    )
                  }
                  name={'companyName'}
                  className={styles.Input}
                >
                  {!loading ? (
                    <Input
                      name={'companyName'}
                      value={
                        data?.findFirstPasswordResetAuth?.User?.CompanyDetails
                          ?.company_name
                      }
                      disabled
                    />
                  ) : (
                    <Skeleton.Input active className={styles.Input} />
                  )}
                </Form.Item>
                <Form.Item
                  label={
                    !loading ? (
                      t('reset.username.title', {
                        fallbackLng: 'en',
                      })
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
                    <Input
                      name={'email'}
                      value={data?.findFirstPasswordResetAuth?.username}
                      disabled
                    />
                  ) : (
                    <Skeleton.Input active className={styles.Input} />
                  )}
                </Form.Item>
                <Form.Item
                  label={
                    !loading ? (
                      t('notifications.connectRegistration.passwordMessage', {
                        fallbackLng: 'en',
                      })
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
                    <PasswordWithHelper
                      onChange={(value) => setFieldValue('password', value)}
                      placeholder={t(
                        'account.settings.security.new-password.label',
                        { fallbackLng: 'en' }
                      )}
                    />
                  ) : (
                    <Skeleton.Input active className={styles.Input} />
                  )}
                </Form.Item>
                <Form.Item
                  label={
                    !loading ? (
                      t('reset.password.confirm.title', {
                        fallbackLng: 'en',
                      })
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
                  ) : (
                    <Skeleton.Input active className={styles.Input} />
                  )}
                </Form.Item>
                <div className={`${styles.btnSubmit} ${styles.Input}`}>
                  {!loading ? (
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
