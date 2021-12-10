import { BellOutlined } from '@ant-design/icons'
import {
  Appointment,
  ColorPicker,
  PabauPlus,
  ReadReview,
  ReviewListing,
  Slider,
  TabMenu,
} from '@pabau/ui'
import { Badge, Col, Form, Radio, Row, Select } from 'antd'
import classNames from 'classnames'
import { useFormik } from 'formik'
import React, { FC, useState } from 'react'
import Link from 'next/link'
import {
  FeedbackSurveyBuilder,
  ReviewsConfigStepOneState,
} from '../../../components/Setup/ReviewsConfig/ReviewsConfigSetting'
import clinicLogo from '../../../assets/images/clinic-logo.png'
import { ReactComponent as ExternalLinkGrey } from '../../../assets/images/external-link-grey.svg'
import { ReactComponent as Palette } from '../../../assets/images/palette.svg'
import userAvatar from '../../../assets/images/users/alex.png'
import { ReactComponent as Voucher } from '../../../assets/images/voucher.svg'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import styles from './Style.module.less'

import { useGetVoucherTemplateQuery } from '@pabau/graphql'

const { Option } = Select

export interface ReviewsConfigStepOneProps {
  settings: FeedbackSurveyBuilder
  reviewsConfigStepOneSettings: ReviewsConfigStepOneState
  setReviewsConfigStepOneSettings: React.Dispatch<
    React.SetStateAction<ReviewsConfigStepOneState>
  >
}

export const ReviewsConfigStepOne: FC<ReviewsConfigStepOneProps> = ({
  settings,
  reviewsConfigStepOneSettings,
  setReviewsConfigStepOneSettings,
}) => {
  const formik = useFormik({
    initialValues: settings,
    onSubmit: (values) => {
      console.log('Values >>>', values)
    },
  })
  const { data: voucherReward } = useGetVoucherTemplateQuery()

  const [form] = Form.useForm()
  const [isListing, setIsListing] = useState(true)
  const [isEmail, setIsEmail] = useState(true)

  const clientFullName = 'Jamal Potter'

  const { t } = useTranslationI18()

  const handleChangeSetting = (key, val) => {
    formik.setFieldValue(key, val)
    setReviewsConfigStepOneSettings({
      ...reviewsConfigStepOneSettings,
      [key]: val,
    })
  }

  const displayClientName = [
    t('setup.reviewsConfig.fullName'),
    t('setup.reviewsConfig.firstName'),
    t('setup.reviewsConfig.initials'),
  ]

  const logoPosition = [
    t('setup.reviewsConfig.logoLeft'),
    t('setup.reviewsConfig.logoMiddle'),
    t('setup.reviewsConfig.logoRight'),
  ]

  const SMSText = () => {
    const messages = [
      {
        content: 'Hi, Kristy',
        direction: 'from',
      },
      {
        content: 'Heya',
        direction: 'to',
      },
    ]
    return (
      <div className={styles.smsTextContainer}>
        {messages.map((message) => (
          <div
            key={message.content}
            className={
              message.direction === 'from'
                ? classNames(styles.smsTextItem, styles.directionFrom)
                : classNames(styles.smsTextItem, styles.directionTo)
            }
          >
            <div className={styles.smsTextContent}>
              {message.content}
              <div className={styles.smsTextArrow} />
            </div>
          </div>
        ))}
      </div>
    )
  }
  return (
    <Form form={form} layout="vertical">
      <div className={styles.reviewsConfigBody}>
        <div className={styles.reviewsConfigBodyDesktop}>
          <div>
            <h2>{t('setup.reviewsConfig.builder')}</h2>
            <div>
              <div className={styles.section}>
                <h3>
                  <Palette className={styles.marginRight} />
                  <span>{t('setup.reviewsConfig.apperance')}</span>
                </h3>
                <h4>{t('setup.reviewsConfig.apperanceText')}</h4>
                <ColorPicker
                  heading={t('setup.reviewsConfig.colorSheme')}
                  onSelected={(val) => handleChangeSetting('color_1', val)}
                  selectedColor={formik.values?.color_1}
                />
                <div className={styles.sectionItem}>
                  <Form.Item label={t('setup.reviewsConfig.logoPosition')}>
                    <Select
                      defaultValue={formik.values?.logo_position}
                      onSelect={(val) =>
                        handleChangeSetting('logo_position', val)
                      }
                    >
                      {logoPosition.map((item) => (
                        <Option key={item} value={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className={styles.sectionItem}>
                  <Slider
                    title={t('setup.reviewsConfig.logoSize')}
                    value={formik.values?.logo_height}
                    onChange={(val) => handleChangeSetting('logo_height', val)}
                    calculatedValue={`${formik.values?.logo_height}px`}
                    min={30}
                    max={150}
                  />
                </div>
                <div className={styles.sectionItem}>
                  <Form.Item label={t('setup.reviewsConfig.clientNameLabel')}>
                    <Select
                      defaultValue={t('setup.reviewsConfig.fullName')}
                      onSelect={(val) => {
                        handleChangeSetting('clientName', val)
                        setIsListing(false)
                      }}
                    >
                      {displayClientName.map((item) => (
                        <Option key={item} value={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <div className={styles.section}>
                <h3>
                  <BellOutlined
                    className={`${styles.marginRight} ${styles.color}`}
                  />
                  <span>{t('setup.reviewsConfig.notifications')}</span>
                </h3>
                <h4>{t('setup.reviewsConfig.notificationText')}</h4>
                <div className={styles.sectionItem}>
                  <Row>
                    <Col span={12}>
                      <Form form={form} layout="vertical">
                        <Form.Item label={t('setup.reviewsConfig.email')}>
                          <Badge
                            status={
                              formik.values?.ty_enable_email
                                ? 'success'
                                : 'default'
                            }
                            text={
                              formik.values?.ty_enable_email
                                ? 'Enabled'
                                : 'Disabled'
                            }
                          />
                        </Form.Item>
                      </Form>
                    </Col>
                    <Col span={12}>
                      <Form form={form} layout="vertical">
                        <Form.Item label={t('setup.reviewsConfig.sms')}>
                          <Badge
                            status={
                              formik.values?.ty_enable_sms
                                ? 'success'
                                : 'default'
                            }
                            text={
                              formik.values?.ty_enable_sms
                                ? 'Enabled'
                                : 'Disabled'
                            }
                          />
                        </Form.Item>
                      </Form>
                    </Col>
                  </Row>
                </div>
                <div className={styles.sectionItem}>
                  <div className={styles.changeInClientNotifications}>
                    <Link href="/client-notifications/request-feedback">
                      <a target="_blank">
                        {t('setup.reviewsConfig.notificationsText')}
                        <ExternalLinkGrey className={styles.marginLeft} />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className={styles.section}>
                <h3>
                  <Voucher className={styles.marginRight} />
                  <span className={styles.marginRightEight}>
                    {t('setup.reviewsConfig.incentive')}
                  </span>
                  <PabauPlus modalType="Marketing" />
                </h3>
                <h4>{t('setup.reviewsConfig.incentiveText')}</h4>
                <div className={styles.sectionItem}>
                  <Form.Item label={t('setup.reviewsConfig.incentive.label')}>
                    <Select
                      defaultValue="No voucher issued"
                      onSelect={(val) =>
                        handleChangeSetting('voucherReward', val)
                      }
                    >
                      <Option value="No voucher issued">
                        No voucher issued
                      </Option>
                      {voucherReward?.templates.map((voucher) => {
                        const { template_id, template_name } = voucher
                        return (
                          <Option key={template_id} value={template_name}>
                            {template_name}
                          </Option>
                        )
                      })}
                    </Select>
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2>{t('setup.reviewsConfig.preview')}</h2>
            <div className={styles.previewPanel}>
              <Radio.Group
                buttonStyle="solid"
                defaultValue={isListing}
                value={isListing}
                onChange={(e) => setIsListing(e.target.value)}
              >
                <Radio.Button value={true}>
                  {t('setup.reviewsConfig.listingButton')}
                </Radio.Button>
                <Radio.Button value={false}>
                  {t('setup.reviewsConfig.readButton')}
                </Radio.Button>
              </Radio.Group>
              <div className={styles.templatePanel}>
                {isListing && (
                  <ReviewListing
                    image={clinicLogo}
                    review={4.67}
                    description="Things people are saying about us"
                    totalReview={5}
                    totalReviewUser={43}
                    weScoreLabel="We score"
                    fromLabel="from"
                    reviewLabel="reviews"
                    color={formik.values?.color_1}
                    logoPosition={formik.values?.logo_position}
                    logoSize={formik.values?.logo_height}
                  />
                )}

                {!isListing && (
                  <ReadReview
                    title="Highly Recommended"
                    bodyContent="Was extremely nervous about seeing Doctor Hazim Sadideen but had a very friendly and warm welcoming at the reception and immediately felt at ease. Doctor Hazim himself made me feel very comfortable and reassured, initially I was very nervous to begin with. Reassured me that everything was going to be OK and that he'll do the best he can with the surgery. His secretary is also very nice, very approachable and easy to talk to if there are any complications or concerns. Highly recommended."
                    updatedAt="1 year ago"
                    name={
                      formik.values?.clientName === undefined
                        ? clientFullName
                        : formik.values?.clientName === 'Full Name'
                        ? clientFullName
                        : formik.values?.clientName === 'First Name'
                        ? clientFullName.split(' ')[0]
                        : clientFullName
                            .split(' ')
                            .map((str) => str.charAt(0))
                            .join('. ')
                    }
                    defaultRating={2.5}
                    avatarSrc={userAvatar}
                    color={formik.values?.color_1}
                  />
                )}
              </div>
              <Radio.Group
                buttonStyle="solid"
                defaultValue={isEmail}
                value={isEmail}
                onChange={(e) => setIsEmail(e.target.value)}
              >
                <Radio.Button value={true}>
                  {t('setup.reviewsConfig.email')}
                </Radio.Button>
                <Radio.Button value={false}>
                  {t('setup.reviewsConfig.smsText')}
                </Radio.Button>
              </Radio.Group>
              <div className={styles.templatePanel}>
                {isEmail && <Appointment t={t} selectLanguage="en" />}
                {!isEmail && <SMSText />}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.reviewsConfigBodyMobile}>
          <TabMenu
            menuItems={[
              t('setup.reviewsConfig.builder'),
              t('setup.reviewsConfig.preview'),
            ]}
            tabPosition="top"
            minHeight="1px"
          >
            <div>
              <div className={styles.section}>
                <h3>
                  <Palette className={styles.marginRight} />
                  <span>{t('setup.reviewsConfig.apperance')}</span>
                </h3>
                <h4>{t('setup.reviewsConfig.apperanceText')}</h4>
                <ColorPicker
                  heading={t('setup.reviewsConfig.colorSheme')}
                  onSelected={(val) => handleChangeSetting('color_1', val)}
                  selectedColor={formik.values?.color_1}
                />
                <div className={styles.sectionItem}>
                  <Form.Item label={t('setup.reviewsConfig.logoPosition')}>
                    <Select
                      defaultValue={formik.values?.logo_position}
                      onSelect={(val) =>
                        handleChangeSetting('logo_position', val)
                      }
                    >
                      {logoPosition.map((item) => (
                        <Option key={item} value={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className={styles.sectionItem}>
                  <Slider
                    title={t('setup.reviewsConfig.logoSize')}
                    value={formik.values?.logo_height}
                    onChange={(val) => handleChangeSetting('logo_height', val)}
                    calculatedValue={`${formik.values?.logo_height}px`}
                    min={30}
                    max={150}
                  />
                </div>
                <div className={styles.sectionItem}>
                  <Form.Item label={t('setup.reviewsConfig.clientNameLabel')}>
                    <Select
                      defaultValue={t('setup.reviewsConfig.fullName')}
                      onSelect={(val) => {
                        handleChangeSetting('clientName', val)
                        setIsListing(false)
                      }}
                    >
                      {displayClientName.map((item) => (
                        <Option key={item} value={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <div className={styles.section}>
                <h3>
                  <BellOutlined
                    className={`${styles.marginRight} ${styles.color}`}
                  />
                  <span>Notifications</span>
                </h3>
                <h4>{t('setup.reviewsConfig.notificationText')}</h4>
                <div className={styles.sectionItem}>
                  <Row>
                    <Col span={12}>
                      <Form form={form} layout="vertical">
                        <Form.Item label={t('setup.reviewsConfig.email')}>
                          <Badge
                            status={
                              formik.values?.ty_enable_email
                                ? 'success'
                                : 'default'
                            }
                            text={
                              formik.values?.ty_enable_email
                                ? 'Enabled'
                                : 'Disabled'
                            }
                          />
                        </Form.Item>
                      </Form>
                    </Col>
                    <Col span={12}>
                      <Form form={form} layout="vertical">
                        <Form.Item label={t('setup.reviewsConfig.sms')}>
                          <Badge
                            status={
                              formik.values?.ty_enable_sms
                                ? 'success'
                                : 'default'
                            }
                            text={
                              formik.values?.ty_enable_sms
                                ? 'Enabled'
                                : 'Disabled'
                            }
                          />
                        </Form.Item>
                      </Form>
                    </Col>
                  </Row>
                </div>
                <div className={styles.sectionItem}>
                  <div className={styles.changeInClientNotifications}>
                    <Link href="/client-notifications/request-feedback">
                      <a target="_blank">
                        {t('setup.reviewsConfig.notificationsText')}
                        <ExternalLinkGrey className={styles.marginLeft} />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className={styles.section}>
                <h3>
                  <Voucher className={styles.marginRight} />
                  <span className={styles.marginRightEight}>
                    {t('setup.reviewsConfig.incentive')}
                  </span>
                  <PabauPlus modalType="Marketing" />
                </h3>
                <h4>Automatically reward clients for writing a review.</h4>
                <div className={styles.sectionItem}>
                  <Form.Item label={t('setup.reviewsConfig.incentive.label')}>
                    <Select
                      defaultValue="No voucher issued"
                      onSelect={(val) =>
                        handleChangeSetting('voucherReward', val)
                      }
                    >
                      <Option value="No voucher issued">
                        No voucher issued
                      </Option>
                      {voucherReward?.templates.map((voucher) => {
                        const { template_id, template_name } = voucher
                        return (
                          <Option key={template_id} value={template_name}>
                            {template_name}
                          </Option>
                        )
                      })}
                    </Select>
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className={styles.previewPanel}>
              <Radio.Group
                buttonStyle="solid"
                defaultValue={isListing}
                value={isListing}
                onChange={(e) => setIsListing(e.target.value)}
              >
                <Radio.Button value={true}>
                  {t('setup.reviewsConfig.listingButton')}
                </Radio.Button>
                <Radio.Button value={false}>
                  {t('setup.reviewsConfig.readButton')}
                </Radio.Button>
              </Radio.Group>
              <div className={styles.templatePanel}>
                {isListing && (
                  <ReviewListing
                    image={clinicLogo}
                    review={4.67}
                    description="Things people are saying about us"
                    totalReview={5}
                    totalReviewUser={43}
                    weScoreLabel="We score"
                    fromLabel="from"
                    reviewLabel="reviews"
                    color={formik.values?.color_1}
                    logoPosition={formik.values?.logo_position}
                    logoSize={formik.values?.logo_height}
                  />
                )}
                {!isListing && (
                  <ReadReview
                    title="Highly Recommended"
                    bodyContent="Was extremely nervous about seeing Doctor Smith but had a very friendly and warm welcoming at the reception and immediately felt at ease. Doctor Smith made me feel very comfortable and reassured, initially I was very nervous to begin with. Reassured me that everything was going to be OK and that he'll do the best he can with the surgery. Highly recommended."
                    updatedAt="1 year ago"
                    name="Jamal Potter"
                    defaultRating={2.5}
                    avatarSrc={userAvatar}
                    color={formik.values?.color_1}
                  />
                )}
              </div>
              <Radio.Group
                buttonStyle="solid"
                defaultValue={isEmail}
                value={isEmail}
                onChange={(e) => setIsEmail(e.target.value)}
              >
                <Radio.Button value={true}>
                  {t('setup.reviewsConfig.email')}
                </Radio.Button>
                <Radio.Button value={false}>
                  {t('setup.reviewsConfig.smsText')}
                </Radio.Button>
              </Radio.Group>
              <div className={styles.templatePanel}>
                {isEmail && <Appointment t={t} selectLanguage="en" />}
                {!isEmail && <SMSText />}
              </div>
            </div>
          </TabMenu>
        </div>
      </div>
    </Form>
  )
}

export default ReviewsConfigStepOne
