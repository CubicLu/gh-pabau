import React, { FC } from 'react'
import { EyeInvisibleOutlined } from '@ant-design/icons'
import { Formik } from 'formik'
import { Checkbox, Form, Input, SubmitButton } from 'formik-antd'
import { LoginValidation } from '@pabau/yup'
import styles from '../../pages/login.module.less'
import Link from 'next/link'
export interface LoginFormProps {
  email: string
  password: string
  remember?: boolean
}

interface P {
  handlePageShow: React.Dispatch<React.SetStateAction<string>>
}

const LoginMain: FC<P> = ({ handlePageShow }) => {
  const loginHandler = async (loginProps: LoginFormProps) => {
    if (localStorage?.getItem('token')) {
      localStorage.removeItem('token')
    }
    const { email, password } = loginProps
    // await login({
    //   variables: {
    //     username: email,
    //     password: password,
    //   },
    // })
  }

  return (
    <div>
      <div className={styles.signInForm}>
        <div className={styles.formHead}>
          <h6>Log In!!</h6>
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
          onSubmit={async (value: LoginFormProps) => {
            console.log('logging in...')
            await loginHandler(value)
          }}
          render={({ isValid, values }) => (
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
                  onClick={() => handlePageShow('resetPassword')}
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

export default LoginMain
