import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './PinScreen.module.less'
import { useMedia } from 'react-use'
import { Button } from '@pabau/ui'

// export interface Props {}

export const PinScreen: FC = () => {
  const { t } = useTranslation('common')
  const [password, setPassword] = useState('')

  const handleChange = (e) => {
    setPassword(e.target.value)
  }

  const isMobile = useMedia('(max-width: 767px)', false)
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
              <h4>Enter pincode</h4>
            </div>
            <div className={styles.passwordNumDots}>
              <div className={styles.dots}>
                <span className={`${styles.dot}`}></span>
                <span className={`${styles.dot}`}></span>
                <span className={`${styles.dot}`}></span>
                <span className={`${styles.dot}`}></span>
              </div>
              <div className={styles.numbers}>
                <button className={styles.number}>1</button>
                <button className={styles.number}>2</button>
                <button className={styles.number}>3</button>
                <button className={styles.number}>4</button>
                <button className={styles.number}>5</button>
                <button className={styles.number}>6</button>
                <button className={styles.number}>7</button>
                <button className={styles.number}>8</button>
                <button className={styles.number}>9</button>
                <button className={styles.number}>0</button>
              </div>
            </div>
            <div className={styles.buttonsWrapper}>
              <a href="/" className={styles.buttonLink}>
                Forgot pin?
              </a>
              <a href="/" className={styles.buttonLink}>
                Cancel
              </a>
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
              <h4>Enter passcode</h4>
            </div>
            <form>
              <div className={styles.passcodeForm}>
                <div className={styles.passcodeInput}>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.passcodeButton}>
                  <Button className={styles.cancelButton} disabled={false}>
                    Cancel
                  </Button>
                  <Button className={styles.submitButton} disabled={true}>
                    Done
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
