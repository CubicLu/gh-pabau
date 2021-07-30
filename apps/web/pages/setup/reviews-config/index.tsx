import React, { FC, useState, useEffect, useRef } from 'react'
import { Typography } from 'antd'
import {
  ToolOutlined,
  QuestionOutlined,
  ShareAltOutlined,
  LinkOutlined,
} from '@ant-design/icons'
import { Breadcrumb, NotificationBanner, Switch, Stepper } from '@pabau/ui'
import confetti from 'canvas-confetti'
import {
  ReviewsConfigFooter,
  ReviewsConfigStepOne,
  ReviewsConfigStepTwo,
  ReviewsConfigStepThree,
  ReviewsConfigStepFour,
} from '../../../components/Setup/ReviewsConfig'
import useWindowSize from '../../../hooks/useWindowSize'
import Layout from '../../../components/Layout/Layout'
import MobileHeader from '../../../components/MobileHeader'
import reviewsConfigBanner from '../../../assets/images/reviews-config-banner.png'
import { ReactComponent as ExternalLink } from '../../../assets/images/external-link.svg'
import {
  addQuestionData,
  reviewBadges,
  reviewWidgets,
  defaultBuilderSetting,
  FeedbackSurveyBuilder,
} from '../../../components/Setup/ReviewsConfig/ReviewsConfigSetting'
import styles from './index.module.less'

const stepData = [
  {
    step: 0,
    name: 'Builder',
    img: <ToolOutlined />,
    isActive: true,
    index: 0,
  },
  {
    step: 1,
    name: 'Questions',
    img: <QuestionOutlined />,
    isActive: false,
    index: 1,
  },
  {
    step: 2,
    name: 'Integrations',
    img: <LinkOutlined />,
    isActive: false,
    index: 2,
  },
  {
    step: 3,
    name: 'Share',
    img: <ShareAltOutlined />,
    isActive: false,
    index: 3,
  },
]

export interface ReviewsConfigProps {
  currentStep: number
  builderSetting: FeedbackSurveyBuilder
}

export const Index: FC<ReviewsConfigProps> = ({
  currentStep = 0,
  builderSetting = defaultBuilderSetting,
}) => {
  const reviewsConfigRef = useRef(null)
  const [showBanner, setShowBanner] = useState(false)
  const [setting, setSetting] = useState<FeedbackSurveyBuilder>(
    defaultBuilderSetting
  )

  const size = useWindowSize()
  const [step, setStep] = useState(0)

  const randomInRange = (min, max) => {
    return Math.random() * (max - min) + min
  }

  useEffect(() => {
    setSetting(builderSetting)
    setStep(currentStep)
  }, [currentStep, builderSetting])

  useEffect(() => {
    if (step === 3) {
      confetti({
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        particleCount: randomInRange(50, 100),
        origin: { y: 0.6 },
      })
    }
  }, [step])

  return (
    <div ref={reviewsConfigRef}>
      <Layout>
        <MobileHeader parent="/setup" title="Feedback Survey">
          <div className={styles.reviewsConfigOps}>
            <div className={styles.reviewLink}>
              Review Link <Switch size="small" />
            </div>
            <a
              href="https://www.pabau.com/reviews/cadogan-clinic"
              rel="noreferrer"
              target="_blank"
            >
              www.pabau.com/reviews/cadogan-clinic <ExternalLink />
            </a>
          </div>
        </MobileHeader>
        <NotificationBanner
          title="Reviews"
          desc="Increase the number of reviews your clients complete by by 72% by enabling feedback requests via SMS"
          imgPath={reviewsConfigBanner}
          allowClose={true}
          setHide={[showBanner, setShowBanner]}
        />
        <div className={styles.reviewsConfigContainer}>
          <div className={styles.reviewsConfigHeader}>
            <div className={styles.reviewsConfigBreadcrumb}>
              <Breadcrumb
                items={[
                  { breadcrumbName: 'Setup', path: '/setup' },
                  {
                    breadcrumbName: 'Feedback Survey',
                    path: '/setup/reviews-config',
                  },
                ]}
              />
              <Typography.Title>Feedback Survey</Typography.Title>
            </div>
            {size.width > 767 && (
              <div className={styles.reviewsConfigOps}>
                <div className={styles.reviewLink}>
                  Review Link <Switch size="small" />
                </div>
                <a
                  href="https://www.pabau.com/reviews/cadogan-clinic"
                  rel="noreferrer"
                  target="_blank"
                >
                  www.pabau.com/reviews/cadogan-clinic <ExternalLink />
                </a>
              </div>
            )}
          </div>
          <div className={styles.reviewsConfigStep}>
            <div>
              <Stepper datasource={stepData} step={step} />
            </div>
          </div>
          {step === 0 && <ReviewsConfigStepOne settings={setting} />}
          {step === 1 && (
            <ReviewsConfigStepTwo
              questionData={addQuestionData.questions}
              settings={setting}
            />
          )}
          {step === 2 && <ReviewsConfigStepThree />}
          {step === 3 && (
            <ReviewsConfigStepFour
              reviewBadges={reviewBadges}
              reviewWidgets={reviewWidgets}
            />
          )}
        </div>
        <ReviewsConfigFooter
          step={step}
          onNext={() => {
            setStep(step + 1)
            reviewsConfigRef.current.scrollIntoView({ behavior: 'smooth' })
          }}
          onPrev={() => {
            setStep(step - 1)
            reviewsConfigRef.current.scrollIntoView({ behavior: 'smooth' })
          }}
        />
      </Layout>
    </div>
  )
}

export default Index
