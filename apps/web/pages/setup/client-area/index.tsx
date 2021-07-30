import React, { FC, useState, useEffect, useRef } from 'react'
import { Typography } from 'antd'
import { Breadcrumb, Switch, Stepper } from '@pabau/ui'
import confetti from 'canvas-confetti'
import Layout from '../../../components/Layout/Layout'
import MobileHeader from '../../../components/MobileHeader'
import {
  ClientAreaFooter,
  ClientAreaStepOne,
  ClientAreaStepTwo,
  ClientAreaStepThree,
  defaultBuilderSetting,
  defaultStepData,
  defaultWidgetsData,
  defaultShareData,
  ClientAreaBuilderSetting,
  ClientAreaWidgets,
  ClientAreaShare,
} from '../../../components/Setup/ClientArea'
import useWindowSize from '../../../hooks/useWindowSize'
import { ReactComponent as ExternalLink } from '../../../assets/images/external-link.svg'
import styles from './index.module.less'

const { Title } = Typography
export interface ClientAreaProps {
  currentStep: number
  builderSetting: ClientAreaBuilderSetting
  widgetsSetting: ClientAreaWidgets
  shareSetting: ClientAreaShare
}

export const Index: FC<ClientAreaProps> = ({
  currentStep = 0,
  builderSetting = defaultBuilderSetting,
  widgetsSetting = defaultWidgetsData,
  shareSetting = defaultShareData,
}) => {
  const clientAreaRef = useRef(null)
  const size = useWindowSize()
  const [step, setStep] = useState(0)
  const [setting, setSetting] = useState<ClientAreaBuilderSetting>(
    defaultBuilderSetting
  )
  const [widgets, setWidgets] = useState<ClientAreaWidgets>(defaultWidgetsData)
  const [share, setShare] = useState<ClientAreaShare>(defaultShareData)
  const randomInRange = (min, max) => {
    return Math.random() * (max - min) + min
  }
  useEffect(() => {
    setStep(currentStep)
    setSetting(builderSetting)
    setWidgets(widgetsSetting)
    setShare(shareSetting)
  }, [currentStep, builderSetting, widgetsSetting, shareSetting])

  useEffect(() => {
    if (step === 2) {
      confetti({
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        particleCount: randomInRange(50, 100),
        origin: { y: 0.6 },
      })
    }
  }, [step])

  return (
    <div ref={clientAreaRef}>
      <Layout>
        <MobileHeader parent="/setup" title="Client Area">
          <div className={styles.clientAreaOps}>
            <div className={styles.reviewLink}>
              Your current Pabau portal address <Switch size="small" />
            </div>
            <a
              href="https://connect-lutetia.pabau.me/booking"
              rel="noreferrer"
              target="_blank"
            >
              https://connect-lutetia.pabau.me/booking <ExternalLink />
            </a>
          </div>
        </MobileHeader>
        <div className={styles.clientAreaContainer}>
          {size.width > 767 && (
            <div className={styles.clientAreaHeader}>
              <div className={styles.clientAreaBreadcrumb}>
                <Breadcrumb
                  items={[
                    { breadcrumbName: 'Setup', path: '/setup' },
                    {
                      breadcrumbName: 'Client Area',
                      path: '/setup/client-area',
                    },
                  ]}
                />
                <Title>Client Area</Title>
              </div>
              <div className={styles.clientAreaOps}>
                <div className={styles.reviewLink}>
                  Your current Pabau portal address <Switch size="small" />
                </div>
                <a
                  href="https://connect-lutetia.pabau.me/booking"
                  rel="noreferrer"
                  target="_blank"
                >
                  https://connect-lutetia.pabau.me/booking <ExternalLink />
                </a>
              </div>
            </div>
          )}
          <div className={styles.clientAreaStep}>
            <div>
              <Stepper datasource={defaultStepData} step={step} />
            </div>
          </div>
          {step === 0 && <ClientAreaStepOne settings={setting} />}
          {step === 1 && <ClientAreaStepTwo settings={widgets} />}
          {step === 2 && <ClientAreaStepThree settings={share} />}
          <ClientAreaFooter
            step={step}
            onNext={() => {
              setStep(step + 1)
              clientAreaRef.current.scrollIntoView({ behavior: 'smooth' })
            }}
            onPrev={() => {
              setStep(step - 1)
              clientAreaRef.current.scrollIntoView({ behavior: 'smooth' })
            }}
          />
        </div>
      </Layout>
    </div>
  )
}

export default Index
