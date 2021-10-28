import {
  FlagOutlined,
  SettingOutlined,
  WalletOutlined,
  WarningTwoTone,
} from '@ant-design/icons'
import { FullScreenReportModal, OperationType } from '@pabau/ui'
import { Card, Checkbox, Form, InputNumber, Select, Space } from 'antd'
import confetti from 'canvas-confetti'
import classnames from 'classnames'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMedia } from 'react-use'
import CoinIcon0 from '../../assets/images/sms-purchase-modal/coins-0.svg'
import CoinIcon1 from '../../assets/images/sms-purchase-modal/coins-1.svg'
import CoinIcon2 from '../../assets/images/sms-purchase-modal/coins-2.svg'
import CoinIcon3 from '../../assets/images/sms-purchase-modal/coins-3.svg'
import CoinIcon4 from '../../assets/images/sms-purchase-modal/coins-4.svg'
import CoinIcon5 from '../../assets/images/sms-purchase-modal/coins-5.svg'
import SelectedCheckImage from '../../assets/images/sms-purchase-modal/selected-check.svg'
import highFive from '../../assets/lottie/high-five.json'
import { MyLottie } from '../my-lottie/MyLottie'
import Stepper from '../stepper/Stepper'
import Wizard from '../wizard/Wizard'
import styles from './SMSPurchaseModal.module.less'

type Item = {
  count: number
  cost: number
  costPerUnit: number
  img: string
  id: number
}
// const Options: Item[] =
function formatCurrency(value: number) {
  return value >= 1 ? `£${value.toFixed(2)}` : `${value.toFixed(2)} p`
}

function randomInRange(min: number, max: number) {
  return min + (max - min) * Math.random()
}
function StepOne({ item, setItem, children, numberFormatter, options }) {
  const { t } = useTranslation('common')
  return (
    <div className={styles.column}>
      {children}
      <Card className={styles.fillWidth}>
        <Space direction="vertical" className={styles.fillWidth}>
          <h1 className={styles.title}>
            {t('ui.sms-purchase-modal.select_bundle')}
          </h1>
          <div className={styles.buyCards}>
            {options.map((option, index) => (
              <Card
                key={option.count}
                className={classnames({
                  [styles.buyCard]: true,
                  [styles.selectedItemBox]: option === item,
                })}
                hoverable
                onClick={() => setItem(option)}
              >
                {option === item && (
                  <div className={styles.selectedItem}>
                    <img
                      src={SelectedCheckImage}
                      alt={t('ui.sms-purchase-modal.selected_checkmark_alt')}
                      width={14}
                      height={14}
                    />
                  </div>
                )}
                <div className={styles.coinIcon}>
                  <img
                    src={option.img}
                    alt={t('ui.sms-purchase-modal.coin_image_alt')}
                  />
                </div>
                <h2 className={styles.itemTitle}>
                  {numberFormatter.format(option.count)}
                </h2>
                <p className={styles.itemInfo}>{formatCurrency(option.cost)}</p>
                <p className={styles.itemInfo}>
                  {formatCurrency(option.costPerUnit)}
                </p>
              </Card>
            ))}
          </div>
        </Space>
      </Card>
      <Card className={styles.fillWidth}>
        <WarningTwoTone twoToneColor="#FAAD14" />
        <div className={styles.noChildMargin}>
          <p className={styles.normalText} style={{ maxWidth: '304px' }}>
            {t('ui.sms-purchase-modal.auto_top_ups_notice')}
          </p>
        </div>
        <a href="/somewhere" className={styles.autoTopUpsLink}>
          {t('ui.sms-purchase-modal.manage_settings')}
        </a>
      </Card>
      <Card className={styles.fillWidth}>
        <p style={{ marginBottom: '8px' }} className={styles.normalText}>
          {t('ui.sms-purchase-modal.cost_pre_credit')}
        </p>
        <p className={styles.backgroundText}>
          {t('ui.sms-purchase-modal.credit_per_character_message')}
        </p>
      </Card>
    </div>
  )
}
function StepTwo({ settings, setSettings, children }) {
  const { t } = useTranslation('common')
  return (
    <div className={styles.columnSettings}>
      {children}
      <Card className={styles.fillWidth}>
        <h2 className={styles.settingsTitle}>
          {t('ui.sms-purchase-modal.settings')}
        </h2>
        <p className={styles.lightNormal}>
          {t('ui.sms-purchase-modal.settings_description')}
        </p>
        <Form layout="vertical" requiredMark={'optional'}>
          <Form.Item
            label={
              <span className={styles.lightNormal}>
                {t('ui.sms-purchase-modal.low_account_level')}
              </span>
            }
            required
          >
            <InputNumber
              style={{ width: '100%' }}
              min={1}
              step="1"
              value={settings.lowLevelAmount}
              onChange={(newValue) => {
                setSettings({
                  ...settings,
                  lowLevelAmount: newValue,
                })
              }}
            />
          </Form.Item>
          <Form.Item
            label={
              <span className={styles.lightNormal}>
                {t('ui.sms-purchase-modal.when_running_low')}
              </span>
            }
            required
          >
            <Select
              style={{ width: '100%' }}
              placeholder={t('ui.sms-purchase-modal.select_an_option')}
              value={settings.refillOption}
              onChange={(newValue) => {
                setSettings({
                  ...settings,
                  refillOption: newValue,
                })
              }}
            >
              <Select.Option value={0}>
                {t('ui.sms-purchase-modal.options_none')}
              </Select.Option>
              <Select.Option value={500}>
                {t('ui.sms-purchase-modal.options_500')}
              </Select.Option>
              <Select.Option value={2000}>
                {t('ui.sms-purchase-modal.options_2000')}
              </Select.Option>
              <Select.Option value={5000}>
                {t('ui.sms-purchase-modal.options_5000')}
              </Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
function StepThree({ item, purchased, children, numberFormatter }) {
  const { t } = useTranslation('common')
  return purchased ? (
    <div className={styles.purchasedResult}>
      <div>
        <MyLottie
          width={400}
          height={400}
          options={{
            animationData: highFive,
            autoplay: true,
          }}
        ></MyLottie>
        <h2 className={styles.purchasedTitle}>
          {t('ui.sms-purchase-modal.all_right')}
        </h2>
        <p className={styles.purchasedFeedback}>
          {t('ui.sms-purchase-modal.purchase_confirmation')}
        </p>
      </div>
    </div>
  ) : (
    <div className={styles.columnSettings}>
      {children}
      <Card
        className={classnames(styles.fillWidth, styles.confirmationWrapper)}
      >
        <h2
          className={classnames(styles.largeDefault, styles.confirmationTitle)}
        >
          {t('ui.sms-purchase-modal.confirm_purchase')}
        </h2>

        <div className={styles.coinIcon}>
          <img
            src={item.img}
            alt={`${numberFormatter.format(item.count)} coins`}
          />
        </div>
        <h3 className={styles.confirmationItemTitle}>
          {numberFormatter.format(item.count)}
        </h3>
        <p className={styles.itemInfo}>{formatCurrency(item.cost)}</p>
        <p className={styles.itemInfo}>{formatCurrency(item.costPerUnit)}</p>

        <div className={styles.total}>
          <div className={styles.largeDefault}>
            {t('ui.sms-purchase-modal.total')}
          </div>
          <div className={styles.largeDefault}>{formatCurrency(item.cost)}</div>
        </div>
      </Card>
    </div>
  )
}
const stepRenders = [StepOne, StepTwo, StepThree]
/* eslint-disable-next-line */
export interface SMSPurchaseModalProps {
  onClose: () => void
  onComplete: (info: {
    item: Item | null
    settings: {
      lowLevelAmount: number
      refillOption: number | null
    } | null
    autoTopUp: boolean
  }) => void
  visible: boolean
  numberFormatter: Intl.NumberFormat
  options?: Item[]
}

export function SMSPurchaseModal({
  onClose,
  visible,
  onComplete,
  numberFormatter,
  options = [
    {
      count: 200,
      cost: 39,
      costPerUnit: 0.08,
      img: CoinIcon0,
      id: 0,
    },
    {
      count: 500,
      cost: 39,
      costPerUnit: 0.08,
      img: CoinIcon1,
      id: 1,
    },
    {
      count: 2000,
      cost: 39,
      costPerUnit: 0.08,
      img: CoinIcon2,
      id: 2,
    },
    {
      count: 5000,
      cost: 39,
      costPerUnit: 0.08,
      img: CoinIcon3,
      id: 3,
    },
    {
      count: 10000,
      cost: 39,
      costPerUnit: 0.08,
      img: CoinIcon4,
      id: 4,
    },
    {
      count: 20000,
      cost: 39,
      costPerUnit: 0.08,
      img: CoinIcon5,
      id: 5,
    },
  ],
}: SMSPurchaseModalProps): JSX.Element {
  const isMobile = useMedia('(max-width:770px)', true)
  const [step, setStep] = useState(0)
  const [item, setItem] = useState<Item | null>(null)
  const [nextStepEnabled, setNextStepEnabled] = useState(false)
  const [autoTopUp, setAutoTopUp] = useState(false)
  const [settings, setSettings] = useState({
    lowLevelAmount: 200,
    refillOption: null,
  })
  const [purchased, setPurchased] = useState(false)
  const [purchasedEmitted, setPurchasedEmitted] = useState(false)
  const { t } = useTranslation('common')
  const [nextButtonContent, setNextButtonContent] = useState(
    <span>{t('ui.sms-purchase-modal.next_step')}</span>
  )
  const [wizard, setWizardVisible] = useState(true)
  const [maxSteps, setMaxSteps] = useState(2)
  const steps = [
    {
      index: 0,
      name: t('ui.sms-purchase-modal.purchase'),
      step: 1,
      img: <WalletOutlined />,
      isActive: true,
    },
    {
      index: 1,
      name: t('ui.sms-purchase-modal.settings'),
      step: 2,
      img: <SettingOutlined />,
      isActive: autoTopUp,
    },
    {
      index: 2,
      name: t('ui.sms-purchase-modal.checkout'),
      step: 3,
      img: <FlagOutlined />,
      isActive: true,
    },
  ]
  const str_next_step = isMobile
    ? t('ui.sms-purchase-modal.next_step_mobile')
    : t('ui.sms-purchase-modal.next_step')
  const str_confirm = t('ui.sms-purchase-modal.confirm')
  const str_purchase = t('ui.sms-purchase-modal.purchase')
  useEffect(() => {
    switch (step) {
      case 0: {
        setNextStepEnabled(item !== null)
        setNextButtonContent(
          autoTopUp ? <span>{str_next_step}</span> : <span>{str_confirm}</span>
        )

        break
      }
      case 1: {
        setNextStepEnabled(settings.refillOption !== null)
        setNextButtonContent(<span>{str_next_step}</span>)

        break
      }
      case 2: {
        setNextButtonContent(
          <span>
            {str_purchase}&nbsp;
            <WalletOutlined></WalletOutlined>
          </span>
        )

        break
      }
      default: {
        if (!purchasedEmitted && step === 3) {
          setPurchased(true)
          onComplete({
            item: item,
            settings:
              autoTopUp && settings.refillOption !== null ? settings : null,
            autoTopUp,
          })
          setPurchasedEmitted(true)
          setWizardVisible(false)
          confetti({
            angle: randomInRange(45, 135),
            spread: randomInRange(50, 70),
            particleCount: randomInRange(50, 100),
            origin: { y: 0.5 },
            zIndex: 2000,
          })
        }
      }
    }
    setMaxSteps(autoTopUp ? 3 : 2)
  }, [
    item,
    step,
    settings,
    autoTopUp,
    onComplete,
    isMobile,
    purchasedEmitted,
    str_next_step,
    str_confirm,
    str_purchase,
  ])
  const Step = stepRenders[step === 3 ? 2 : step]
  return (
    <FullScreenReportModal
      forceDesktopOperations={true}
      hideBackIcon={true}
      title={purchased ? '' : t('ui.sms-purchase-modal.modal_title')}
      visible={visible}
      operations={[OperationType.close]}
      onClose={onClose}
      onBackClick={onClose}
      hideHeaderEdge={purchased}
      center={
        !isMobile ? (
          <div className={styles.stepper}>
            {wizard && (
              <Stepper
                datasource={steps.filter((step) => step.isActive)}
                step={step === 1 && !autoTopUp ? 0.5 : step}
              ></Stepper>
            )}
          </div>
        ) : null
      }
      className={styles.fullScreenModal}
    >
      <div className={styles.content}>
        <Step
          item={item}
          setItem={setItem}
          settings={settings}
          purchased={purchased}
          setSettings={setSettings}
          numberFormatter={numberFormatter}
          options={options}
        >
          {isMobile ? (
            <div className={styles.mobileStep}>
              <div className={styles.stepper}>
                {wizard && (
                  <Stepper
                    datasource={steps.filter((step) => step.isActive)}
                    step={step}
                  ></Stepper>
                )}
              </div>
            </div>
          ) : null}
        </Step>
      </div>
      <div
        className={styles.footer}
        style={{
          borderTop: purchased ? 'none' : undefined,
        }}
      >
        {wizard && (
          <Wizard
            active={!autoTopUp && step === 2 ? 1 : step}
            allSteps={maxSteps}
            disableNextStep={!nextStepEnabled}
            disablePrevStep={false}
            onNext={() => {
              if (step === 0) {
                if (autoTopUp) {
                  setStep(1)
                } else {
                  setStep(2)
                }
              } else {
                setStep((step) => step + 1)
              }
            }}
            onPrev={() => {
              if (step === 2) {
                if (autoTopUp) {
                  setStep(1)
                } else {
                  setStep(0)
                }
              } else {
                setStep(0)
              }
            }}
            nextButtonDecorator={
              <span style={{ marginRight: isMobile ? '5px' : '32px' }}>
                <Checkbox
                  onChange={() => {
                    setAutoTopUp((val) => !val)
                  }}
                  checked={autoTopUp}
                >
                  {t('ui.sms-purchase-modal.auto_top_up')}
                </Checkbox>
              </span>
            }
            nextButtonContent={nextButtonContent}
            prevButtonContent={
              <span>
                {isMobile
                  ? t('ui.sms-purchase-modal.previous_step_mobile')
                  : t('ui.sms-purchase-modal.previous_step')}
              </span>
            }
            finishDisablesNextStep={false}
            hideStep={isMobile}
          ></Wizard>
        )}
      </div>
    </FullScreenReportModal>
  )
}

export default SMSPurchaseModal
