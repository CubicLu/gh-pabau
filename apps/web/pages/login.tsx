import { ReactComponent as LoginImage } from '../assets/images/login.svg'
import { Logo } from '../components/Logo/Logo'
import { LoginMain } from '../components/Auth/Login'
import styles from './login.module.less'

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
