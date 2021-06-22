import React, { FC, useEffect, useState } from 'react'
import { ReactComponent as LoginImage } from '../assets/images/login.svg'
import styles from './login.module.less'
import { Logo, Notification, NotificationType } from '@pabau/ui'
import LoginMain from '../components/Auth/Login'
import TwoStepAuthentication from '../components/Auth/TwoStepAuthentication'
import MoreWayAuthentication from '../components/Auth/MoreWayToAuthentication'
import ResetPassword from '../components/Auth/ResetPassword'
import { JwtUser } from '../components/Auth/interfaces/common'
import {
  useAuthenticateUserMutation,
  useVerifyCredentialsLazyQuery,
  useVerifyTwoFaCodeLazyQuery,
} from '@pabau/graphql'
import { useTranslationI18 } from '../hooks/useTranslationI18'
import { useRouter } from 'next/router'

const Login: FC = () => {
  const [showPage, setShowPage] = useState<string>('login')
  const [user, setUser] = useState<JwtUser>()
  const { t } = useTranslationI18()
  const router = useRouter()

  const [
    verifyCredentials,
    { data: verifyData, loading: verifyLoading },
  ] = useVerifyCredentialsLazyQuery()

  const [
    verifyTwoFaCode,
    { data: verifyTwoFaData, loading: verifyTwoFaLoading },
  ] = useVerifyTwoFaCodeLazyQuery()

  const [
    authenticateUserMutation,
    { data: authenticateData, loading: authenticateLoading },
  ] = useAuthenticateUserMutation()

  useEffect(() => {
    //verification process for login credentials, Step 1;
    if (!verifyLoading && verifyData) {
      const user = verifyData.VerifyCredentials
      if (!user) {
        return Notification(
          NotificationType.error,
          t('login.wrong_credentials')
        )
      }

      setUser({
        id: user.id,
        company_id: user.company_id,
        admin: user.admin,
        company: {
          details: {
            admin: user.company.details.admin,
            enable_2fa: user.company.details.enable_2fa,
          },
          admin: user.company.details.admin,
          remote_url: user.company.remote_url,
          remote_connect: user.company.remote_connect,
        },
        CmStaffGeneral: {
          CellPhone: user.CmStaffGeneral[0].CellPhone,
        },
      })

      //check for 2fa if enabled or disabled
      if (user.company.details.enable_2fa) {
        setShowPage('twoStepAuth')
        return
      }

      //regular login - authenticate user
      authenticateUserMutation({
        variables: {
          user_id: user.id,
          company_id: user.company_id,
          user_admin: user.admin,
          company_admin: user.company.details.admin,
          remote_url: user.company.remote_url,
          remote_connect: user.company.remote_connect,
        },
      })
    }
  }, [verifyData, t, authenticateUserMutation, verifyLoading])

  useEffect(() => {
    if (!verifyTwoFaLoading && verifyTwoFaData) {
      if (!verifyTwoFaData.VerifyTwoFaCode) {
        return Notification(
          NotificationType.error,
          t('login.wrong_credentials_2fa')
        )
      }

      //code is verified, login user
      authenticateUserMutation({
        variables: {
          user_id: user.id,
          company_id: user.company_id,
          user_admin: user.admin,
          company_admin: user.company.details.admin,
          remote_url: user.company.remote_url,
          remote_connect: user.company.remote_connect,
        },
      })
    }
  }, [verifyTwoFaData, verifyTwoFaLoading, authenticateUserMutation, t, user])

  useEffect(() => {
    if (!authenticateLoading && authenticateData) {
      const response = authenticateData.AuthenticateUser
      if (response) {
        localStorage.setItem('token', response)
        router.reload()
      }
    }
  }, [authenticateData, authenticateLoading, router])

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
        {showPage === 'login' ? (
          <LoginMain
            handlePageShow={setShowPage}
            verifyCredentials={verifyCredentials}
          />
        ) : showPage === 'twoStepAuth' ? (
          <TwoStepAuthentication
            handlePageShow={setShowPage}
            currentUser={user}
            verifyTwoFaCode={verifyTwoFaCode}
          />
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
