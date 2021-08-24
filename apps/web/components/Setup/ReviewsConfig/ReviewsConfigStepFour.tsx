import { LinkOutlined } from '@ant-design/icons'
import {
  BasicModal,
  Button,
  CopyEmbedCodeModal,
  DotButton,
  ReviewSlider,
  ReviewSliderProps,
} from '@pabau/ui'
import React, { FC, useState } from 'react'
import { useMedia } from 'react-use'
import FeedbackSurveyFinal from '../../../assets/images/feedback-survey-final.png'
import { defaultPreview, ReviewBadgeProp } from './ReviewsConfigSetting'
import styles from './Style.module.less'

interface ReviewsConfigStepFourProps {
  reviewBadges: ReviewBadgeProp[]
  reviewWidgets: ReviewBadgeProp[]
}

export const ReviewsConfigStepFour: FC<ReviewsConfigStepFourProps> = ({
  reviewBadges = [],
  reviewWidgets = [],
}) => {
  const isMobile = useMedia('(max-width: 767px)', false)
  const [openPreview, setOpenPreview] = useState(false)
  const [currentReviews, setCurrentReviews] = useState<ReviewSliderProps>(
    defaultPreview
  )
  const [embedCodeView, setEmbedCodeView] = useState(false)
  const [embedCode, setEmbedCode] = useState('')
  return (
    <>
      <div className={styles.reviewsConfigBody}>
        <div className={styles.reviewsShare}>
          <div>
            <img src={FeedbackSurveyFinal} alt="" width="100%" />
          </div>
          <div>
            <p className={styles.reviewsShareTitle}>
              Share your reviews with pride
            </p>
            <p className={styles.reviewsShareDescription}>
              Reviews are an important component of a successful profiles,
              considering that today’s tech savvy buyers often trust online
              reviews as muuch as personal recommednations. We make it asy to
              reuquest, track, and reply all within your portal..
            </p>
            <Button
              type="primary"
              onClick={() => {
                window.open(
                  'https://www.pabau.com/reviews/cadogan-clinic',
                  '_blank'
                )
              }}
            >
              View Listing
            </Button>
          </div>
        </div>
        <div className={styles.reviewContent}>
          <p className={styles.reviewContentTitle}>Review Badges</p>
          <p className={styles.reviewContentSubTitle}>
            Display your strong product ratings and attract new reviews with
            your dynamic user review badge
          </p>
          {reviewBadges?.map((badge) => (
            <div className={styles.reviewContentItem} key={badge.title}>
              <div>
                <img src={badge.imgSrc} alt="" />
              </div>
              <div>
                <p>{badge.title}</p>
                <div>
                  <Button
                    type="primary"
                    onClick={() => {
                      setEmbedCodeView(true)
                      setEmbedCode(badge.embedCode)
                    }}
                  >
                    View Embed Code
                  </Button>
                  {!isMobile ? (
                    <>
                      {badge.wordpressPlugin && (
                        <a
                          href={badge.wordpressPlugin}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Button>View Wordpress Plugin</Button>
                        </a>
                      )}
                      {badge.preview && (
                        <Button
                          onClick={() => {
                            setCurrentReviews(badge.preview)
                            setOpenPreview(true)
                          }}
                        >
                          Preview
                        </Button>
                      )}
                    </>
                  ) : badge.wordpressPlugin || badge.preview ? (
                    <DotButton
                      menuList={[
                        badge.wordpressPlugin && {
                          key: 1,
                          icon: <LinkOutlined />,
                          label: 'Viewe Wordpress Plugin',
                          onClick: () => {
                            window.open(badge.wordpressPlugin, '_blank')
                          },
                        },
                        badge.preview && {
                          key: 2,
                          label: 'Preview',
                          icon: <LinkOutlined />,
                          onClick: () => {
                            setCurrentReviews(badge.preview)
                            setOpenPreview(true)
                          },
                        },
                      ]}
                    />
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          ))}
          <p className={styles.reviewContentTitle}>Review widgets</p>
          <p className={styles.reviewContentSubTitle}>
            Embedd your reviews onto your website
          </p>
          {reviewWidgets?.map((widget) => (
            <div className={styles.reviewContentItem} key={widget.title}>
              <div>
                <img src={widget.imgSrc} alt="" />
              </div>
              <div>
                <p>{widget.title}</p>
                <div>
                  <Button
                    type="primary"
                    onClick={() => {
                      setEmbedCodeView(true)
                      setEmbedCode(widget.embedCode)
                    }}
                  >
                    View Embed Code
                  </Button>
                  {!isMobile ? (
                    <>
                      {widget.wordpressPlugin && (
                        <a
                          href={widget.wordpressPlugin}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Button>View Wordpress Plugin</Button>
                        </a>
                      )}
                      {widget.preview && (
                        <Button
                          onClick={() => {
                            setCurrentReviews(widget.preview)
                            setOpenPreview(true)
                          }}
                        >
                          Preview
                        </Button>
                      )}
                    </>
                  ) : widget.wordpressPlugin || widget.preview ? (
                    <DotButton
                      menuList={[
                        widget.wordpressPlugin && {
                          key: 1,
                          icon: <LinkOutlined />,
                          label: 'Viewe Wordpress Plugin',
                          onClick: () => {
                            window.open(widget.wordpressPlugin, '_blank')
                          },
                        },
                        widget.preview && {
                          key: 2,
                          label: 'Preview',
                          icon: <LinkOutlined />,
                          onClick: () => {
                            setCurrentReviews(widget.preview)
                            setOpenPreview(true)
                          },
                        },
                      ]}
                    />
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {openPreview && (
        <BasicModal
          visible={openPreview}
          width="100%"
          footer={null}
          onOk={() => setOpenPreview(false)}
          onCancel={() => setOpenPreview(false)}
        >
          <ReviewSlider {...currentReviews} />
        </BasicModal>
      )}
      {embedCodeView && (
        <CopyEmbedCodeModal
          visible={embedCodeView}
          code={embedCode}
          title="Copy embed code"
          subTitle="Paste this snippet into your webbsite’s source code"
          modalWidth={600}
          onClose={() => {
            setEmbedCodeView(false)
          }}
          onDownloadImg={() => {
            return
          }}
          onEmailInput={() => {
            return
          }}
        />
      )}
    </>
  )
}

export default ReviewsConfigStepFour
