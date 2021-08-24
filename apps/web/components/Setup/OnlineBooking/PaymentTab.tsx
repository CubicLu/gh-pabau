import React, { FC, useState } from 'react'
import classNames from 'classnames'
import { CurrencyInput } from '@pabau/ui'
import { Tooltip, Radio } from 'antd'
import { QuestionCircleOutlined, CheckCircleFilled } from '@ant-design/icons'
import { paymentMethodItems } from './OnlineBookingSetting'
import styles from './style.module.less'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'

export const PaymentTab: FC = () => {
  const { t } = useTranslationI18()

  const [selectedCard, setSelectedCard] = useState('Visa')
  const [requirement, setRequirement] = useState(1)
  const [rollingDeposit, setRollingDeposit] = useState(true)
  const [defaultDeposit, setDefaultDeposit] = useState('')
  const radioStyle = {
    display: 'block',
    height: '22px',
    lineHeight: '22px',
    marginBottom: '18px',
    color: 'var(--grey-text-color)',
  }
  return (
    <div className={styles.onlineBookingPayment}>
      <div className={styles.deposit}>
        <div className={styles.depositHeader}>Deposit</div>
        <div className={styles.depositRequirements}>
          <p>{t('setup.online-booking.payment.requirements')}</p>
          <Radio.Group
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
          >
            <Radio style={radioStyle} value={1}>
              {t('setup.online-booking.payment.no-deposit-required')}
            </Radio>
            <Radio style={radioStyle} value={2}>
              {t('setup.online-booking.payment.require-default-deposit')}{' '}
              <Tooltip title="lorem ipsum">
                <QuestionCircleOutlined
                  style={{
                    marginLeft: '8px',
                    color: 'var(--light-grey-color)',
                  }}
                />
              </Tooltip>
            </Radio>
            <Radio style={radioStyle} value={3}>
              {t('setup.online-booking.payment.take-full-payment')}
            </Radio>
          </Radio.Group>
        </div>
        <div className={styles.depositDefault}>
          <p>{t('setup.online-booking.payment.default-deposit')}</p>
          <CurrencyInput
            unit="£"
            placeholder="0.00"
            value={defaultDeposit}
            onChange={(val) => setDefaultDeposit(val.value)}
          />
        </div>
        <div className={styles.depositRolling}>
          <p>{t('setup.online-booking.payment.rolling-deposit')}</p>
          <p>{t('setup.online-booking.payment.rolling-deposit-description')}</p>
          <Radio.Group
            value={rollingDeposit}
            onChange={(e) => setRollingDeposit(e.target.value)}
          >
            <Radio style={radioStyle} value={true}>
              {t('setup.online-booking.payment.rolling-deposit-yes')}
            </Radio>
            <Radio style={radioStyle} value={false}>
              {t('setup.online-booking.payment.rolling-deposit-no')}
            </Radio>
          </Radio.Group>
        </div>
      </div>
      <div className={styles.paymentMethods}>
        <div className={styles.paymentMethodsHeader}>
          {t('setup.online-booking.payment.payment-methods')}
        </div>
        <div className={styles.paymentMethodsContainer}>
          {paymentMethodItems.map((item) => (
            <React.Fragment key={item.title}>
              {item.showInstructions === true && (
                <div
                  className={classNames(
                    styles.paymentMethodItem,
                    styles.showInstructions
                  )}
                >
                  <div className={styles.itemLogo}>{item.logo}</div>
                  <div className={styles.itemShowInstructions}>
                    {t('setup.online-booking.payment.show-instructions')}
                  </div>
                </div>
              )}
              {item.showInstructions !== true && (
                <div
                  className={
                    item.title === selectedCard
                      ? classNames(
                          styles.paymentMethodItem,
                          styles.selectedItem
                        )
                      : styles.paymentMethodItem
                  }
                  onClick={() => setSelectedCard(item.title)}
                >
                  <div className={styles.itemLogo}>{item.logo}</div>
                  <div className={styles.itemTitle}>{item.title}</div>
                  <div className={styles.selectedSymbol}>
                    <CheckCircleFilled
                      style={{ color: 'var(--primary-color)' }}
                    />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PaymentTab
