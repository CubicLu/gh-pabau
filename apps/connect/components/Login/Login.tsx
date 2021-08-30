import { EyeInvisibleOutlined } from '@ant-design/icons'
import { useLoginMutation } from '@pabau/graphql'
import { Formik } from 'formik'
import { Checkbox, Form, Input, SubmitButton } from 'formik-antd'
import React, { FC } from 'react'
import styles from './Login.module.less'
import { useUser } from '../UserContext/UserContext'
import { LoginForm } from '@pabau/yup'

const Login: FC = () => {
  const { me, login, logout } = useUser()
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
    await login(result.data.login)
  }

  return (
    <div className={styles.formLogin}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={loginHandler}
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
              <div className={styles.forgotKey} onClick={() => true}>
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
          </Form>
        )}
      />
    </div>
  )
}

export default Login
