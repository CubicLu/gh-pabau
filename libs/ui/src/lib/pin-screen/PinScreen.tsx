import React, { FC, useState } from 'react'
import { Input, Alert } from 'antd'
import { useTranslation } from 'react-i18next'
import styles from './PinScreen.module.less'
import { useMedia } from 'react-use'
import { Button, Notification, NotificationType } from '@pabau/ui'

export interface PinScreenProps {
  onSubmit: (result: boolean) => void
  pin: string
}

export const PinScreen: FC<PinScreenProps> = ({ onSubmit, pin }) => {
  const { t } = useTranslation('common')
  const reg = /^\d*(\d*)?$/
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState(false)
  const isMobile = useMedia('(max-width: 767px)', false)

  const checkPin = (value) => {
    if (value.length === 4 && value !== pin) {
      setAlert(true)
      setPassword('')
      onSubmit(false)
      !isMobile &&
        Notification(
          NotificationType.error,
          t('ui.pinscreen.incorrect.alert.message')
        )
    } else {
      setAlert(false)
      onSubmit(true)
    }
  }
  const handleChange = (e) => {
    const { value } = e.target
    if (!Number.isNaN(value) && reg.test(value) && value.length <= 4) {
      setAlert(false)
      setPassword(value)
    }
  }

  const buttonHandle = (e, val) => {
    const value = password + val
    if (!Number.isNaN(value) && reg.test(value) && value.length <= 4) {
      setAlert(false)
      setPassword(value)
      if (value.length === 4) {
        checkPin(value)
      }
    }
    if (e.target.className === `${styles.number} ${styles.active}`) {
      e.target.className = `${styles.number}`
    } else {
      setTimeout(function () {
        e.target.className = `${styles.number} ${styles.active}`
      })
    }
    setTimeout(function () {
      e.target.className = `${styles.number} ${styles.active}`
    })
  }

  const handleRemove = () => {
    password.length === 4 && setAlert(false)
    setPassword(password.slice(0, -1))
  }

  return (
    <div className={styles.pincodeMainWrapper}>
      {isMobile ? (
        <div className={styles.password}>
          <div className={styles.passwordWraper}>
            <div className={styles.lockIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="22"
                viewBox="0 0 20 22"
                fill="none"
              >
                <path
                  d="M18.75 9.6875H16.8906V3.5625C16.8906 1.6293 15.3238 0.0625 13.3906 0.0625H6.60938C4.67617 0.0625 3.10938 1.6293 3.10938 3.5625V9.6875H1.25C0.766016 9.6875 0.375 10.0785 0.375 10.5625V21.0625C0.375 21.5465 0.766016 21.9375 1.25 21.9375H18.75C19.234 21.9375 19.625 21.5465 19.625 21.0625V10.5625C19.625 10.0785 19.234 9.6875 18.75 9.6875ZM10.7656 16.168V17.6172C10.7656 17.7375 10.6672 17.8359 10.5469 17.8359H9.45312C9.33281 17.8359 9.23438 17.7375 9.23438 17.6172V16.168C9.00866 16.0059 8.84019 15.7764 8.75321 15.5125C8.66622 15.2486 8.66522 14.9639 8.75034 14.6994C8.83546 14.4349 9.00231 14.2043 9.22687 14.0406C9.45144 13.877 9.72214 13.7888 10 13.7888C10.2779 13.7888 10.5486 13.877 10.7731 14.0406C10.9977 14.2043 11.1645 14.4349 11.2497 14.6994C11.3348 14.9639 11.3338 15.2486 11.2468 15.5125C11.1598 15.7764 10.9913 16.0059 10.7656 16.168ZM14.9219 9.6875H5.07812V3.5625C5.07812 2.71758 5.76445 2.03125 6.60938 2.03125H13.3906C14.2355 2.03125 14.9219 2.71758 14.9219 3.5625V9.6875Z"
                  fill="#40A0C1"
                />
              </svg>
            </div>
            <div className={styles.passwordHeading}>
              <h4>{t('ui.pinscreen.title.mobile')}</h4>
            </div>
            {alert && (
              <>
                <Alert
                  message={t('ui.pinscreen.incorrect.alert.message')}
                  type="error"
                />
                <br />
              </>
            )}
            <div className={styles.passwordNumDots}>
              <div className={`${styles.dots} ${alert && styles.wrongpw}`}>
                {Array.from({ length: 4 })
                  .fill('')
                  .map((val, key) => {
                    return (
                      <span
                        key={key}
                        className={`${styles.dot} ${
                          password.length > key && styles.active
                        }`}
                      ></span>
                    )
                  })}
              </div>
              <div className={styles.numbers}>
                {Array.from({ length: 10 })
                  .fill('')
                  .map((val, key) => {
                    const num = key === 9 ? 0 : key + 1
                    return (
                      <span
                        key={key}
                        className={`${styles.number}`}
                        onClick={(e) => buttonHandle(e, num)}
                      >
                        {num}
                      </span>
                    )
                  })}
              </div>
            </div>
            <div className={styles.buttonsWrapper}>
              <Button type="link" className={styles.buttonLink}>
                {t('ui.pinscreen.forgot.pin')}
              </Button>
              {password.length > 0 ? (
                <Button
                  type="link"
                  className={styles.buttonLink}
                  onClick={handleRemove}
                >
                  {t('ui.pinscreen.delete')}
                </Button>
              ) : (
                <Button type="link" className={styles.buttonLink}>
                  {t('ui.pinscreen.cancel')}
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.passcode}>
          <div className={styles.passcodeWrapper}>
            <div className={styles.lockIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="22"
                viewBox="0 0 20 22"
                fill="none"
              >
                <path
                  d="M18.75 9.6875H16.8906V3.5625C16.8906 1.6293 15.3238 0.0625 13.3906 0.0625H6.60938C4.67617 0.0625 3.10938 1.6293 3.10938 3.5625V9.6875H1.25C0.766016 9.6875 0.375 10.0785 0.375 10.5625V21.0625C0.375 21.5465 0.766016 21.9375 1.25 21.9375H18.75C19.234 21.9375 19.625 21.5465 19.625 21.0625V10.5625C19.625 10.0785 19.234 9.6875 18.75 9.6875ZM10.7656 16.168V17.6172C10.7656 17.7375 10.6672 17.8359 10.5469 17.8359H9.45312C9.33281 17.8359 9.23438 17.7375 9.23438 17.6172V16.168C9.00866 16.0059 8.84019 15.7764 8.75321 15.5125C8.66622 15.2486 8.66522 14.9639 8.75034 14.6994C8.83546 14.4349 9.00231 14.2043 9.22687 14.0406C9.45144 13.877 9.72214 13.7888 10 13.7888C10.2779 13.7888 10.5486 13.877 10.7731 14.0406C10.9977 14.2043 11.1645 14.4349 11.2497 14.6994C11.3348 14.9639 11.3338 15.2486 11.2468 15.5125C11.1598 15.7764 10.9913 16.0059 10.7656 16.168ZM14.9219 9.6875H5.07812V3.5625C5.07812 2.71758 5.76445 2.03125 6.60938 2.03125H13.3906C14.2355 2.03125 14.9219 2.71758 14.9219 3.5625V9.6875Z"
                  fill="#40A0C1"
                />
              </svg>
            </div>
            <div className={styles.passcodeHeading}>
              <h4>{t('ui.pinscreen.title')}</h4>
            </div>
            <form>
              <div className={styles.passcodeForm}>
                <div className={styles.passcodeInput}>
                  <Input
                    type="password"
                    name="password"
                    placeholder={t('ui.pinscreen.input.label')}
                    value={password}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.passcodeButton}>
                  <Button className={styles.cancelButton} disabled={false}>
                    {t('ui.pinscreen.cancel')}
                  </Button>
                  <Button
                    className={styles.submitButton}
                    type={'primary'}
                    disabled={password.length === 4 ? false : true}
                    onClick={() => checkPin(password)}
                  >
                    {t('ui.pinscreen.done')}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default PinScreen
