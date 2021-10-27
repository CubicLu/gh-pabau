import React, { FC, useState } from 'react'
import styles from './CreateCall.module.less'
import EnterNumber from './setting-up-and-confirming-number/enterNumber'
import VerificationComplete from './setting-up-and-confirming-number/verificationComplete'
import VerifyNumberSMS from './setting-up-and-confirming-number/verifyNumberSMS'
import VerifyNumberCall from './setting-up-and-confirming-number/verifyNumberCall'
import FirstPage from './setting-up-and-confirming-number/firstPage'
import InitiatingCall from './setting-up-and-confirming-number/initiatingCall'
import AddPhoneRecord from './setting-up-and-confirming-number/addPhoneRecord'
import CallCompleted from './setting-up-and-confirming-number/callCompleted'
import CallFailed from './setting-up-and-confirming-number/callFailed'

export interface CreateCallProps {
  currentStep: number
  setCurrentStep: (val) => void
}

const CreateCall: FC<CreateCallProps> = ({ currentStep, setCurrentStep }) => {
  const [phoneValue, setPhoneValue] = useState('')
  // setPhoneValue('+' + phoneValue)
  const handleChange = () => {
    setCurrentStep(currentStep + 1)
  }
  const handleCall = () => {
    setCurrentStep(currentStep + 2)
  }
  const changeScreenCall = () => {
    setCurrentStep(7)
  }
  return (
    <div className={styles.createCallGlobal}>
      {currentStep === 1 && <FirstPage changeScreen={handleChange} />}
      {currentStep === 2 && (
        <EnterNumber
          changeScreenSMS={handleChange}
          changeScreenCall={handleCall}
          phoneValue={phoneValue}
          setPhoneValue={setPhoneValue}
        />
      )}
      {currentStep === 3 && (
        <VerifyNumberSMS changeScreen={handleCall} phoneValue={phoneValue} />
      )}
      {currentStep === 4 && (
        <VerifyNumberCall changeScreen={handleChange} phoneValue={phoneValue} />
      )}
      {currentStep === 5 && (
        <VerificationComplete
          changeScreen={handleChange}
          phoneValue={phoneValue}
        />
      )}
      {currentStep === 6 && <AddPhoneRecord changeScreen={handleChange} />}
      {currentStep === 7 && (
        <InitiatingCall changeScreen={handleChange} phoneValue={phoneValue} />
      )}
      {currentStep === 8 && <CallCompleted changeScreen={handleChange} />}
      {currentStep === 9 && (
        <CallFailed
          changeScreenCall={changeScreenCall}
          phoneValue={phoneValue}
        />
      )}
    </div>
  )
}

export default CreateCall
