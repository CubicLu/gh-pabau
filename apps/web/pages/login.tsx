import React, { FC, useState } from 'react'
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
import fetch from 'cross-fetch'

const Login: FC = () => {
  const [showPage, setShowPage] = useState<string>('login')
  const [user, setUser] = useState<JwtUser>()
  const { t } = useTranslationI18()
  const router = useRouter()
  const [tempLegacyTab, setTempLegacyTab] = useState<Window | null>(null)

  const [verifyCredentials] = useVerifyCredentialsLazyQuery({
    onCompleted(verifyData) {
      const user = verifyData.VerifyCredentials
      if (!user) {
        return Notification(
          NotificationType.error,
          t('login.wrong_credentials')
        )
      }

      setUser({
        id: user.id,
        username: user.username,
        company_id: user.company_id,
        admin: user.admin,
        company: {
          details: {
            admin: user.CompanyDetails?.admin,
            enable_2fa: user.CompanyDetails?.enable_2fa,
          },
          admin: user.CompanyDetails?.admin,
          remote_url: user.Company?.remote_url,
          remote_connect: user.Company?.remote_connect,
        },
        CmStaffGeneral: {
          CellPhone: user.CmStaffGeneral.CellPhone,
        },
      })

      //check for 2fa if enabled or disabled
      // eslint-disable-next-line no-constant-condition
      if (false && user.CompanyDetails?.enable_2fa) {
        setShowPage('twoStepAuth')
        return
      }

      //simulating a pabau1(legacy) login for iframes
      ;(async () => {
        const formData = new FormData()
        formData.append(
          'company',
          JSON.stringify({
            company_id: user.company_id,
            username: user.username,
            pod_url: user.Company?.remote_url,
            pabau2: 1,
          })
        )

        try {
          await fetch(process.env.NEXT_PUBLIC_LEGACY_HASH_ENDPOINT, {
            method: 'POST',
            body: formData,
            mode: 'no-cors',
          })
            .then(
              function (response) {
                return response.json()
              },
              function (error) {
                console.error(error.message)
              }
            )
            .then((response) => {
              const tempWindow = window.open(response, '_blank')
              setTempLegacyTab(tempWindow)

              //regular login - authenticate user
              authenticateUserMutation({
                variables: {
                  user_id: user.id,
                  username: user.username,
                  company_id: user.company_id,
                  user_admin: user.admin,
                  company_admin: user.CompanyDetails?.admin,
                  remote_url: user.Company?.remote_url,
                  remote_connect: user.Company?.remote_connect,
                },
              })
            })
        } catch {
          console.error('cross-platform verification failed..')
        }
      })()
    },
  })

  const [verifyTwoFaCode] = useVerifyTwoFaCodeLazyQuery({
    onCompleted(verifyTwoFaData) {
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
          username: user.username,
          company_id: user.company_id,
          user_admin: user.admin,
          company_admin: user.company.details.admin,
          remote_url: user.company.remote_url,
          remote_connect: user.company.remote_connect,
        },
      })
    },
  })

  const [authenticateUserMutation] = useAuthenticateUserMutation({
    onCompleted(authenticateData) {
      const response = authenticateData.AuthenticateUser
      if (response) {
        localStorage.setItem('token', response)
        setTimeout(() => {
          tempLegacyTab?.close()
          router.reload()
        }, 2000)
      }
    },
  })

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
