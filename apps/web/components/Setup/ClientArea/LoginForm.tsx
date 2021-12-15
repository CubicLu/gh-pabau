import { Form, Input as AntInput } from 'antd'
import clinicLogo from '../../../assets/images/normal-clinic-logo.png'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import React, { FC } from 'react'
import { Button } from '@pabau/ui'
import styles from './Style.module.less'
import { useMedia } from 'react-use'
import { Anchor } from 'antd'

interface LoginProps {
  color1: string
}

export const LoginForm: FC<LoginProps> = ({ color1 }: LoginProps) => {
  const [form] = Form.useForm()
  const isMdScreen = useMedia('(min-width: 992px)', false)

  const { Link } = Anchor
  return (
    <div className={styles.clientAreaLoginForm}>
      <Form form={form} layout="vertical" initialValues={{ remember: true }}>
        <div className={styles.loginFormCenter}>
          <img src={clinicLogo} alt="" style={{ marginBottom: '2rem' }} />
        </div>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <AntInput />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <AntInput.Password
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <div
          className={styles.loginFormRight}
          style={{
            marginBottom: isMdScreen ? '2rem' : '20px',
            color: 'var(--primary-color)',
          }}
        >
          Forgot password?
        </div>
        <Button type="primary" block htmlType="submit">
          Login
        </Button>
        <div className={styles.loginFormCenter} style={{ margin: '8px 0' }}>
          or
        </div>
        <Button block className={styles.loginViaFB}>
          <Anchor className={styles.loginViaFBAnchor}>
            <Link
              className={styles.loginViaFBAnchor}
              href="https://www.facebook.com/"
              title="Login via Facebook"
            />
          </Anchor>
        </Button>
        <div className={styles.loginFormCenter} style={{ marginTop: '1rem' }}>
          <span style={{ color: 'var(--grey-text-color)' }}>
            Not a member yet?{' '}
            <span style={{ color: 'var(--primary-color)' }}>Sign in</span>
          </span>
        </div>
        <div
          className={styles.loginFormCenter}
          style={{ marginTop: '1rem', color: '#cccfd6' }}
        >
          Powered by Pabau
        </div>
      </Form>
    </div>
  )
}
