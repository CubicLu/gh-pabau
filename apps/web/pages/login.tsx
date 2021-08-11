import React, { FC, useState, useContext } from 'react'
import { ReactComponent as LoginImage } from '../assets/images/login.svg'
import { UserContext } from '../context/UserContext'
import styles from './login.module.less'
import { Logo, Notification, NotificationType } from '@pabau/ui'
import LoginMain from '../components/Auth/Login'
import TwoStepAuthentication from '../components/Auth/TwoStepAuthentication'
import MoreWayAuthentication from '../components/Auth/MoreWayToAuthentication'
import ResetPassword from '../components/Auth/ResetPassword'
import { JwtUser } from '../components/Auth/interfaces/common'
import { useTranslationI18 } from '../hooks/useTranslationI18'
import { useRouter } from 'next/router'

const Login: FC = () => {
  const loggedInUser = useContext(UserContext)
  const [showPage, setShowPage] = useState<string>('login')
  const router = useRouter()

  //TODO: improve this
  if (router.pathname.includes('login') && loggedInUser?.me?.id) {
    window.location.href = window.location.origin
  }

  return loggedInUser?.me?.id ? (
    <div />
  ) : (
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
        {showPage === 'login' ? (
          <LoginMain handlePageShow={setShowPage} />
        ) : showPage === 'twoStepAuth' ? (
          <TwoStepAuthentication handlePageShow={setShowPage} />
        ) : showPage === 'moreWayAuth' ? (
          <MoreWayAuthentication />
        ) : (
          showPage === 'resetPassword' && (
            <ResetPassword handlePageShow={setShowPage} />
          )
        )}
      </div>
    </div>
  )
}

export default Login
