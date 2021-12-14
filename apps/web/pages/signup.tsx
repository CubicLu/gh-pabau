import { Logo } from '@pabau/ui'
import Link from 'next/link'
import React, { FC, useState } from 'react'
import { useUser } from '../context/UserContext'
import styles from './signup.module.less'
import {
  SignupStepOne,
  StepOneFormProps,
} from '../components/Auth/SignupStepOne'
import {
  SignupStepTwo,
  StepTwoFormProps,
} from '../components/Auth/SignupStepTwo'
import Lottie from 'react-lottie'
import LaunchingRocket from '../assets/lottie/rocket-launching.json'
import { useTranslationI18 } from '../hooks/useTranslationI18'

const Signup: FC = () => {
  const loggedInUser = useUser()
  const [step, setStep] = useState<number>(1)

  const { t } = useTranslationI18()

  const handleStepOneSubmit = (value: StepOneFormProps) => {
    console.log(value)
    setStep(2)
  }

  const handleStepTwoSubmit = (value: StepTwoFormProps) => {
    console.log(value)
  }

  if (window.location.pathname.includes('signup') && loggedInUser?.me?.id) {
    window.location.href = window.location.origin
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LaunchingRocket,
    pause: false,
    stop: false,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return loggedInUser?.me?.id ? (
    <div />
  ) : (
    <div className={styles.signupWrapper}>
      <div className={styles.signupBackground}>
        <Lottie options={defaultOptions} height={468} width={340} />
      </div>
      <div className={styles.signupContent}>
        <div className={styles.signupLogo}>
          <Logo />
        </div>
        <div className={styles.signupForm}>
          <div className={styles.formHead}>
            <h6>{t('signup.create.account.header')}</h6>
            <span>
              {t('signup.step')} {step} {t('signup.of')} 2
            </span>
          </div>
          {step === 1 ? (
            <SignupStepOne handleStepOneSubmit={handleStepOneSubmit} />
          ) : (
            <SignupStepTwo handleStepTwoSubmit={handleStepTwoSubmit} />
          )}
          <div className={styles.signupLogin}>
            <span>
              {t('signup.create.account.has.account')}{' '}
              <Link href="/login">{t('signup.create.account.login')}</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Signup
