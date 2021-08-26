import { ReactComponent as LoginImage } from '../assets/images/login.svg'
import styles from './login.module.less'
import { Logo } from '@pabau/ui'
import { LoginMain } from '../components/Auth/Login'

const Login = () => {
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
