import { PasswordWithHelper } from '@pabau/ui'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { Formik } from 'formik'
import { Form, Input, SubmitButton } from 'formik-antd'
import React, { FC } from 'react'
import * as Yup from 'yup'
import styles from '../../pages/signup.module.less'

export interface StepOneFormProps {
  firstName: string
  lastName: string
  workEmail: string
  password: string
}
interface SignupStepOneProps {
  handleStepOneSubmit: (value: StepOneFormProps) => void
}
export const SignupStepOne: FC<SignupStepOneProps> = ({
  handleStepOneSubmit,
}) => {
  const { t } = useTranslationI18()

  return (
    <div className={styles.signupFormInput}>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          workEmail: '',
          password: '',
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required('First name is required'),
          lastName: Yup.string().required('Last name is required'),
          workEmail: Yup.string()
            .email('Invalid work email')
            .required('Work Email is required'),
          password: Yup.string()
            .required('Password is required')
            .matches(
              /^(?=.*\d)(?=.*[^\dA-Za-z])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
              'Must Contain strong password'
            ),
        })}
        onSubmit={(value) => {
          handleStepOneSubmit(value)
        }}
        render={({ setFieldValue, values, dirty, isValid }) => (
          <Form layout="vertical">
            <Form layout="vertical" className={styles.signupInput__div}>
              <Form.Item
                label={t('create.account.signup.first.name')}
                name={'firstName'}
                className={styles.signupInput}
              >
                <Input value={values.firstName} name={'firstName'} />
              </Form.Item>
              <Form.Item
                label={t('create.account.signup.last.name')}
                name={'lastName'}
                className={styles.signupInput}
              >
                <Input value={values.lastName} name={'lastName'} />
              </Form.Item>
            </Form>
            <Form.Item
              className={styles.signupInput}
              label={t('create.account.signup.work.email')}
              name={'workEmail'}
            >
              <Input value={values.workEmail} name={'workEmail'} />
            </Form.Item>
            <Form.Item
              className={styles.signupInput}
              label={t('create.account.signup.password')}
              name={'password'}
            >
              <PasswordWithHelper
                value={values.password}
                onChange={(value) => setFieldValue('password', value)}
              />
            </Form.Item>
            <div className={styles.signupButton}>
              <SubmitButton
                disabled={!isValid || !dirty}
                className={styles.btnStarted}
                type={'primary'}
              >
                {t('create.account.signup.get.started')}
              </SubmitButton>
            </div>
          </Form>
        )}
      />
    </div>
  )
}
