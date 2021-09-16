import { ReactComponent as LoginImage } from '../assets/images/login.svg'
import { Logo } from '../components/Logo/Logo'
import { LoginMain } from '../components/Auth/Login'
import { useRouter } from 'next/router'
import styles from './login.module.less'
import dynamic from 'next/dynamic'

const Login = () => {
  const PasswordReset = dynamic(() => import('../pages/resetPassword/index'), {
    ssr: false,
  })
  const router = useRouter()

  if (router.asPath.substring(0, 14) === '/resetPassword')
    return <PasswordReset />

  return (
    <div className={styles.signInWrapper}>
      <div className={styles.signInBackground}>
        <LoginImage />
      </div>
      <div className={styles.formWrapper}>
        <div className={styles.signInContent}>
          <div className={styles.signInLogo}>
            <Logo />
          </div>
        </div>
        <LoginMain />
      </div>
    </div>
  )
}

export default Login
