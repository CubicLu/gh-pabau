import React, { useState } from 'react'
import { EyeInvisibleOutlined } from '@ant-design/icons'
import { Formik } from 'formik'
import { Checkbox, Form, Input, SubmitButton } from 'formik-antd'
import { LoginForm, LoginValidation } from '@pabau/yup'
import styles from '../../pages/login.module.less'
import Link from 'next/link'
import { useLoginMutation } from '@pabau/graphql'
import ResetPassword from './ResetPassword'
import { useUser } from '../../context/UserContext'

export const LoginMain = (): JSX.Element => {
  const [page, setPage] = useState<'login' | 'resetPassword'>('login')
  const { login, logout } = useUser()
  const [loginMutate] = useLoginMutation()

  const loginHandler = async (loginProps: LoginForm) => {
    const { email, password } = loginProps
    await logout()
    const result = await loginMutate({
      variables: {
        username: email,
        password: password,
      },
    })
    try {
      await login(result.data.login)
    } catch (error) {
      console.log('LOGIN FAILED', error)
    }
    // BEWARE: Don't try and do anything after here because React garbage disposes of this function after login is completed.
  }

  if (page === 'resetPassword')
    return <ResetPassword onClose={() => setPage('login')} />

  return (
    <div>
      <div className={styles.signInForm}>
        <div className={styles.formHead}>
          <h6>Log In</h6>
          <span>
            Do not have an account?{' '}
            <Link href="/signup">Start a free trial</Link>
          </span>
        </div>
      </div>
      <div className={styles.formLogin}>
        <Formik
          initialValues={{
            email: '',
            password: '',
            remember: false,
          }}
          validationSchema={LoginValidation}
          onSubmit={loginHandler}
          render={({ isValid }) => (
            <Form layout="vertical">
              <Form.Item
                label={'Email'}
                name={'email'}
                className={styles.signupInput}
              >
                <Input name={'email'} />
              </Form.Item>
              <Form.Item
                label={'Password'}
                name={'password'}
                className={styles.signupInput}
              >
                <Input.Password
                  name={'password'}
                  iconRender={() => <EyeInvisibleOutlined />}
                />
              </Form.Item>
              <div className={styles.forgotWrap}>
                <div
                  className={styles.forgotKey}
                  onClick={() => setPage('resetPassword')}
                >
                  Forgot password?
                </div>
              </div>
              <div className={styles.checkBox}>
                <Checkbox name={'remember'}>Remember me</Checkbox>
              </div>
              <div className={styles.btnSubmit}>
                <SubmitButton
                  className={isValid ? styles.btnStarted : styles.btnDisabled}
                  type={'primary'}
                  disabled={!isValid}
                >
                  Confirm
                </SubmitButton>
              </div>
              {/* TODO uncomment them (followings) once something gets done */}
              {/*<div className={styles.accessKey}>
                <div className={styles.line}>
                  <span>or access quickly</span>
                </div>
              </div>
              <div className={styles.socialWrapper}>
                <div className={styles.google}>
                  <Button
                    className={styles.btnStarted}
                    disabled
                    type={'default'}
                    icon={<GoogleIcon />}
                  >
                    Google
                  </Button>
                </div>
                <div className={styles.socialLine}>
                  <Button
                    disabled
                    className={styles.btnStarted}
                    type={'default'}
                    icon={<LinkedinFilled />}
                  >
                    LinkedIn
                  </Button>
                  <Button
                    disabled
                    className={styles.btnStarted}
                    type={'default'}
                    icon={<SSOIcon className={styles.keyIc} />}
                  >
                    <span className={styles.iconTxtKey}>SSO</span>
                  </Button>
                </div>
              </div>*/}
            </Form>
          )}
        />
      </div>
    </div>
  )
}
