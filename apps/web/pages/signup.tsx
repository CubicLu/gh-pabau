import { Logo } from '@pabau/ui'
import Link from 'next/link'
import React, { FC, useState } from 'react'
import { useUser } from '../context/UserContext'
import { ReactComponent as LaunchingImage } from '../assets/images/launching-pana.svg'
import styles from './signup.module.less'
import {
  SignupStepOne,
  StepOneFormProps,
} from '../components/Auth/SignupStepOne'
import {
  SignupStepTwo,
  StepTwoFormProps,
} from '../components/Auth/SignupStepTwo'

const Signup: FC = () => {
  const loggedInUser = useUser()

  const [step, setStep] = useState<number>(1)

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

  return loggedInUser?.me?.id ? (
    <div />
  ) : (
    <div className={styles.signupWrapper}>
      <div className={styles.signupBackground}>
        <LaunchingImage />
      </div>
      <div className={styles.signupContent}>
        <div className={styles.signupLogo}>
          <Logo />
        </div>
        <div className={styles.signupForm}>
          <div className={styles.formHead}>
            <h6>We’re ready to set up your free trial of Pabau</h6>
            <span>Step {step} of 2</span>
          </div>
          {step === 1 ? (
            <SignupStepOne handleStepOneSubmit={handleStepOneSubmit} />
          ) : (
            <SignupStepTwo handleStepTwoSubmit={handleStepTwoSubmit} />
          )}
          <div className={styles.signupLogin}>
            <span>
              Already has an account? <Link href="/login">Log in</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
