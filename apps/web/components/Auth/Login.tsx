import React, { FC } from 'react'
import { EyeInvisibleOutlined, LinkedinFilled } from '@ant-design/icons'
import { Button } from '@pabau/ui'
import { Formik } from 'formik'
import { Checkbox, Form, Input, SubmitButton } from 'formik-antd'
import { LoginValidation } from '@pabau/yup'
import { ReactComponent as GoogleIcon } from '../../assets/images/google.svg'
import { ReactComponent as SSOIcon } from '../../assets/images/sso.svg'
import { Exact } from '@pabau/graphql'
import { QueryLazyOptions } from '@apollo/client'
import styles from '../../pages/login.module.less'

export interface LoginFormProps {
  email: string
  password: string
  remember?: boolean
}

interface LoginProps {
  handlePageShow: React.Dispatch<React.SetStateAction<string>>
  verifyCredentials: (
    options?: QueryLazyOptions<Exact<{ username: string; password: string }>>
  ) => void
}

const LoginMain: FC<LoginProps> = ({ handlePageShow, verifyCredentials }) => {
  const loginHandler = async (loginProps: LoginFormProps): Promise<boolean> => {
    if (localStorage?.getItem('token')) {
      localStorage.removeItem('token')
    }
    const { email, password } = loginProps
    await verifyCredentials({
      variables: {
        username: email,
        password: password,
      },
    })
    return true
  }

  return (
    <div>
      <div className={styles.signInForm}>
        <div className={styles.formHead}>
          <h6>Log In!!</h6>
          <span>
            Do not have an account? <a>Start a free trial</a>
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
                  className={
                    isValid && values.email !== '' && values.password !== ''
                      ? styles.btnStarted
                      : styles.btnDisabled
                  }
                  type={'primary'}
                  disabled={
                    isValid && values.email !== '' && values.password !== ''
                      ? false
                      : true
                  }
                >
                  Confirm
                </SubmitButton>
              </div>
              <div className={styles.accessKey}>
                <div className={styles.line}>
                  <span>or access quickly</span>
                </div>
              </div>
              <div className={styles.socialWrapper}>
                <div className={styles.google}>
                  <Button
                    className={styles.btnStarted}
                    type={'default'}
                    icon={<GoogleIcon />}
                  >
                    Google
                  </Button>
                </div>
                <div className={styles.socialLine}>
                  <Button
                    className={styles.btnStarted}
                    type={'default'}
                    icon={<LinkedinFilled />}
                  >
                    LinkedIn
                  </Button>
                  <Button
                    className={styles.btnStarted}
                    type={'default'}
                    icon={<SSOIcon className={styles.keyIc} />}
                  >
                    <span className={styles.iconTxtKey}>SSO</span>
                  </Button>
                </div>
              </div>
            </Form>
          )}
        />
      </div>
    </div>
  )
}

export default LoginMain
