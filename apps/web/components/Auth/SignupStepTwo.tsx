import { PhoneNumberInput } from '@pabau/ui'
import { Formik } from 'formik'
import { Checkbox, Form, Input, SubmitButton } from 'formik-antd'
import countries from 'i18n-iso-countries'
import english from 'i18n-iso-countries/langs/en.json'
import React, { FC, useState } from 'react'
import * as Yup from 'yup'
import styles from '../../pages/signup.module.less'
import Link from 'next/link'
import LocationSettings from '../LocationSettings/LocationSettings'
import { useTranslationI18 } from '../../hooks/useTranslationI18'

export interface StepTwoFormProps {
  phoneNumber: string
  companyName: string
  country: string
}

interface SignupStepTwoProps {
  handleStepTwoSubmit?: (value: StepTwoFormProps) => void
}

export const SignupStepTwo: FC<SignupStepTwoProps> = ({
  handleStepTwoSubmit,
}) => {
  const [isValidPhone, setValidPhone] = useState<boolean>(false)
  countries.registerLocale(english)
  const { t } = useTranslationI18()

  return (
    <div className={styles.signupFormInput}>
      <Formik
        initialValues={{
          phoneNumber: '',
          companyName: '',
          country: '',
          timeZone: '',
          termsAndCondition: false,
        }}
        validationSchema={Yup.object({
          phoneNumber: Yup.string().required('Phone number is required'),
          companyName: Yup.string().required('Company name is required'),
          termsAndCondition: Yup.bool().oneOf(
            [true],
            'Accept Terms & Conditions is required'
          ),
        })}
        onSubmit={(value) => {
          if (isValidPhone) {
            handleStepTwoSubmit(value)
          }
        }}
        render={({ setFieldValue }) => (
          <Form className={styles.signupInputs__form} layout="vertical">
            <Form.Item
              // label={t('signup.phone.number')}
              name={'phoneNumber'}
              className={styles.signupInput}
            >
              <PhoneNumberInput
                onChange={(value, valid) => {
                  setFieldValue('phoneNumber', value)
                  if (!valid) {
                    setValidPhone(false)
                  } else {
                    setValidPhone(true)
                  }
                }}
              />
            </Form.Item>
            <Form className={styles.signupInputs__div}>
              <Form.Item
                className={styles.signupInput__CompanyForm}
                label={t('signup.company.name')}
                name={'companyName'}
              >
                <Input name={'companyName'} />
              </Form.Item>
              <LocationSettings />
            </Form>
            <div className={styles.signupAgree}>
              <Checkbox name={'termsAndCondition'}>
                {t('signup.i.agree')}{' '}
                <Link href="https://www.pabau.com/terms-conditions/" passHref>
                  <a target="_blink"> {t('signup.terms.and.conditions')} </a>
                </Link>
              </Checkbox>
            </div>
            <div className={styles.signupButton}>
              <SubmitButton
                className={styles.btnStarted}
                type={'primary'}
                disabled={!isValidPhone}
              >
                {t('signup.create.account')}
              </SubmitButton>
            </div>
          </Form>
        )}
      />
    </div>
  )
}
