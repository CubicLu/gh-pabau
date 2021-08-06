import { EyeInvisibleOutlined } from '@ant-design/icons'
import {
  useConnectAuthorizeUserMutation,
  useConnectVerifyCredentialsMutation,
} from '@pabau/graphql'
import { Formik } from 'formik'
import { Checkbox, Form, Input, SubmitButton } from 'formik-antd'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import styles from './Login.module.less'

const Login: FC = () => {
  const router = useRouter()

  const [
    connectVerifyCredentialsMutation,
  ] = useConnectVerifyCredentialsMutation({
    onCompleted(response) {
      connectAuthorizeUserMutation({
        // variables: {
        //   contact_id: 1000,
        //   company_id: 8254,
        // },
        variables: {
          contact_id: response.ConnectVerifyCredentials.contact_id,
          company_id: response.ConnectVerifyCredentials.company_id,
        },
      })
    },
    onError(error) {
      console.log('error', error)
    },
  })

  const [connectAuthorizeUserMutation] = useConnectAuthorizeUserMutation({
    onCompleted(response) {
      localStorage.setItem('token', response.ConnectAuthorizeUser)
      // localStorage.setItem('token', '1111')
      router.push('/dashboard')
    },
    onError(error) {
      console.log('error', error)
    },
  })

  const verifyCredentials = ({ email, password }) => {
    connectVerifyCredentialsMutation({
      variables: {
        username: email,
        password: password,
      },
    })
  }

  return (
    <div className={styles.formLogin}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={verifyCredentials}
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
