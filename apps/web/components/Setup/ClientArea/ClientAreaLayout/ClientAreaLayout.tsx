import React, { FC, useState, useEffect, useRef } from 'react'
import { Typography, Skeleton } from 'antd'
import { Breadcrumb, Switch, Stepper } from '@pabau/ui'
import confetti from 'canvas-confetti'
import Layout from '../../../Layout/Layout'
import { connectURL } from '../../../../baseUrl'
import CommonHeader from '../../../CommonHeader'
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
  Company,
} from '..'
import useWindowSize from '../../../../hooks/useWindowSize'
import { ReactComponent as ExternalLink } from '../../../../assets/images/external-link.svg'
import styles from './index.module.less'
import { useGetBookitProGeneralQuery } from '@pabau/graphql'

const { Title } = Typography
export interface ClientAreaProps {
  currentStep?: number
  builderSetting?: ClientAreaBuilderSetting
  widgetsSetting?: ClientAreaWidgets
  shareSetting?: ClientAreaShare
}

export const ClientAreaLayout: FC<ClientAreaProps> = () => {
  const clientAreaRef = useRef(null)
  const size = useWindowSize()
  const [step, setStep] = useState(0)
  const [widgets] = useState<ClientAreaWidgets>(defaultWidgetsData)
  const [share] = useState<ClientAreaShare>(defaultShareData)
  const [stepOneData, setStepOneData] = useState<Company>()

  const { data: settingsData, loading } = useGetBookitProGeneralQuery()

  useEffect(() => {
    if (!loading) {
      setStepOneData(settingsData.findFirstBookitProGeneral.Company)
    }
  }, [loading, settingsData])

  const randomInRange = (min, max) => {
    return Math.random() * (max - min) + min
  }
  function toggleBooking(checked) {
    return checked
  }
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

  return !stepOneData ? (
    <Skeleton />
  ) : (
    <div ref={clientAreaRef}>
      <Layout>
        <CommonHeader isLeftOutlined reversePath="/setup" title="Client Area" />
        <div className={styles.clientAreaContainer}>
          <div className={styles.clientAreaHeader}>
            {size.width > 767 && (
              <div className={styles.clientAreaBreadcrumb}>
                <Breadcrumb
                  items={[
                    { breadcrumbName: 'Setup', path: 'setup' },
                    {
                      breadcrumbName: 'Client Area',
                      path: 'setup/client-area',
                    },
                  ]}
                />
                <Title>Client Area</Title>
              </div>
            )}
            <div className={styles.clientAreaOps}>
              <div className={styles.reviewLink}>
                Your current Pabau portal address{' '}
                <Switch
                  checked={Boolean(
                    settingsData.findFirstBookitProGeneral.enable_bookings
                  )}
                  onChange={toggleBooking}
                  size="small"
                />
              </div>
              <a
                href="https://connect-lutetia.pabau.me/booking"
                rel="noreferrer"
                target="_blank"
              >
                {connectURL +
                  settingsData?.findFirstBookitProGeneral.Company.slug}
                <ExternalLink />
              </a>
            </div>
          </div>
          <div className={styles.clientAreaStep}>
            <div>
              <Stepper datasource={defaultStepData} step={step} />
            </div>
          </div>
          {step === 0 && (
            <ClientAreaStepOne
              stepOneData={stepOneData}
              setStepOneData={setStepOneData}
              defaultData={defaultBuilderSetting.registrationFields}
            />
          )}
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

export default ClientAreaLayout
