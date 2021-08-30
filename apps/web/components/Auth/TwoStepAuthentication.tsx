import styles from '../../pages/login.module.less'
import { SubmitButton, Form } from 'formik-antd'
import { Formik } from 'formik'
import { Button } from '@pabau/ui'
import PinInput from 'react-pin-input'
import { useBoolean } from 'react-use'
import { twoFactorAuth } from '@pabau/yup'

interface FormProps {
  code: string
}

interface P {
  onClose: () => void
  maskedPhoneNumber: string
  onSubmit(form: FormProps): Promise<{ error: string } | true>
}

export const TwoStepAuthentication = ({
  onClose,
  onSubmit,
  maskedPhoneNumber,
}: P): JSX.Element => {
  const [isSubmitting, setIsSubmitting] = useBoolean(false)
  return (
    <div>
      <div className={styles.signInForm}>
        <div className={styles.formHead}>
          <h6>Two-step authentication</h6>
          <span className={styles.textContent}>
            To continue, please, enter the 6-digit verification code sent to
            <b>your phone ending in {maskedPhoneNumber || 'N/A'}</b>
          </span>
          <span className={styles.textContent} hidden>
            Did not receive a code? <a>Resend.</a>
          </span>
        </div>
      </div>
      <div className={styles.twoStepAuth}>
        <Formik
          initialValues={{
            code: '',
          }}
          validationSchema={twoFactorAuth}
          onSubmit={async ({ code }) => {
            setIsSubmitting(true)
            const result = await onSubmit({ code })
            setIsSubmitting(false)
            if (result === true) onClose()
          }}
          render={({ setFieldValue }) => {
            return (
              <Form>
                <div className={styles.inputWrap}>
                  <PinInput
                    length={6}
                    focus
                    secret
                    type="numeric"
                    onChange={(e) => setFieldValue('code', e, true)}
                  />
                </div>
                <div className={styles.btnAuthWrap}>
                  <SubmitButton loading={isSubmitting} type={'primary'}>
                    Continue
                  </SubmitButton>
                  <Button
                    className={styles.btnSignAuth}
                    type={'default'}
                    onClick={() => onClose()}
                  >
                    Sign in another way
                  </Button>
                </div>
              </Form>
            )
          }}
        />
      </div>
    </div>
  )
}
