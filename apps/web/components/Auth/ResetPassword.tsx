import { Button } from 'antd'
import { Formik } from 'formik'
import { Form, Input, SubmitButton } from 'formik-antd'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import styles from '../../pages/login.module.less'
import { ResetPasswordValidation } from '@pabau/yup'
import { useForgotPasswordMutation } from '@pabau/graphql'

interface P {
  onClose?(): void
}

const ResetPassword = ({ onClose }: P): JSX.Element => {
  const { t } = useTranslationI18()
  const [mutate, { loading, data }] = useForgotPasswordMutation()
  return (
    <div>
      <div className={styles.signInForm}>
        <div className={styles.formHead}>
          <h6>{t('reset.password.title', { fallbackLng: 'en' })}</h6>
          <span className={styles.textContent}>
            {t('reset.password.description', { fallbackLng: 'en' })}
          </span>
        </div>
      </div>
      <div className={styles.resetPassword}>
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={ResetPasswordValidation}
          validateOnChange={true}
          onSubmit={async ({ email }) => {
            await mutate({
              variables: {
                email,
              },
            })
          }}
          render={({ isValid, values, errors }) => (
            <Form className={styles.resetWrap} layout="vertical">
              {/* TODO: show these */}
              {/*<Alert*/}
              {/*  message={t('reset.password.banner.search.title', {*/}
              {/*    fallbackLng: 'en',*/}
              {/*  })}*/}
              {/*  description={t('reset.password.banner.search.description', {*/}
              {/*    fallbackLng: 'en',*/}
              {/*  })}*/}
              {/*  type="error"*/}
              {/*/>*/}
              {/*<Alert*/}
              {/*  message={t('reset.password.banner.email.title', {*/}
              {/*    fallbackLng: 'en',*/}
              {/*  })}*/}
              {/*  description={t('reset.password.banner.email.description', {*/}
              {/*    fallbackLng: 'en',*/}
              {/*  })}*/}
              {/*  type="success"*/}
              {/*/>*/}
              {/*<Alert*/}
              {/*  message={t('reset.password.banner.email.error.title', {*/}
              {/*    fallbackLng: 'en',*/}
              {/*  })}*/}
              {/*  description={t(*/}
              {/*    'reset.password.banner.email.error.description',*/}
              {/*    { fallbackLng: 'en' }*/}
              {/*  )}*/}
              {/*  type="error"*/}
              {/*/>*/}
              <Form.Item
                label={t('clients.content.column.email', {
                  fallbackLng: 'en',
                })}
                name={'email'}
                className={styles.signupInput}
              >
                <Input
                  name={'email'}
                  value={values.email}
                  autoComplete={'off'}
                />
              </Form.Item>
              <div className={styles.btnReset}>
                <SubmitButton
                  className={
                    isValid && values.email !== '' && data !== undefined
                      ? styles.btnStarted
                      : styles.btnDisabled
                  }
                  disabled={
                    !(isValid && values.email !== '' && data !== undefined)
                  }
                  type={'primary'}
                  loading={loading}
                >
                  {t('ui.sms-purchase-modal.confirm', { fallbackLng: 'en' })}
                </SubmitButton>
                {onClose && (
                  <Button
                    className={styles.btnReturn}
                    onClick={() => onClose?.()}
                  >
                    {t('reset.password.login.link.text', { fallbackLng: 'en' })}
                  </Button>
                )}
              </div>
              <div className={styles.linkReset}>
                <p>
                  {' '}
                  {t('reset.password.pabau.account.text', {
                    fallbackLng: 'en',
                  })}
                </p>
                <span>
                  {t('reset.password.start.trial.text', {
                    fallbackLng: 'en',
                  })}
                </span>
              </div>
            </Form>
          )}
        />
      </div>
    </div>
  )
}

export default ResetPassword
