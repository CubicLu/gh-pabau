import React, { FC } from 'react'
import styles from '../../pages/login.module.less'
import { Button, Notification, NotificationType } from '@pabau/ui'
import * as Yup from 'yup'
import { Form, Input, Checkbox, SubmitButton } from 'formik-antd'
import { Formik } from 'formik'
import { EyeInvisibleOutlined, LinkedinFilled } from '@ant-design/icons'
import { ReactComponent as GoogleIcon } from '../../assets/images/google.svg'
import { ReactComponent as SSOIcon } from '../../assets/images/sso.svg'
import { gql, useMutation } from '@apollo/client'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { useRouter } from 'next/router'

export interface LoginFormProps {
  email: string
  password: string
  remember?: boolean
}

interface LoginProps {
  handlePageShow: (page: string) => void
}
const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(username: $email, password: $password)
  }
`
const LoginMain: FC<LoginProps> = ({ handlePageShow }) => {
  const [login] = useMutation(LOGIN_MUTATION)
  const { t } = useTranslationI18()
  const router = useRouter()

  const loginHandler = async (loginProps: LoginFormProps): Promise<boolean> => {
    if (localStorage?.getItem('token')) {
      localStorage.removeItem('token')
    }
    const { email, password } = loginProps
    const result = await login({
      variables: {
        email,
        password,
      },
    })
    if (!result) {
      throw new Error('Wrong user/password')
    }
    // setCookie('user', JSON.stringify(result.data?.login), {
    //   path: '/',
    //   maxAge: 3600,
    //   sameSite: true,
    // })
    localStorage.setItem('token', result.data?.login)
    return true
  }

  return (
    <div>
      <div className={styles.signInForm}>
        <div className={styles.formHead}>
          <h6>{t('login.title')}</h6>
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
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Invalid work email')
              .required('Email is required'),
            password: Yup.string().required('Password is required'),
          })}
          onSubmit={async (value: LoginFormProps) => {
            try {
              await loginHandler(value)
              router.reload()
            } catch (error) {
              if (localStorage?.getItem('token')) {
                localStorage.removeItem('token')
              }
              Notification(NotificationType.error, error.toString())
            }
          }}
          render={() => (
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
                <SubmitButton className={styles.btnStarted} type={'primary'}>
                  Login
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