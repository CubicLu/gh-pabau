import React, { FC, useState } from 'react'
import classNames from 'classnames'
import { useFormik } from 'formik'
import { Badge, Form, Row, Col, Radio, Select } from 'antd'
import { BellOutlined } from '@ant-design/icons'
import {
  TabMenu,
  Slider,
  ColorPicker,
  Appointment,
  ReadReview,
  ReviewListing,
  PabauPlus,
} from '@pabau/ui'
import userAvatar from '../../../assets/images/users/alex.png'
import clinicLogo from '../../../assets/images/clinic-logo.png'
import { ReactComponent as ExternalLinkGrey } from '../../../assets/images/external-link-grey.svg'
import { ReactComponent as Palette } from '../../../assets/images/palette.svg'
import { ReactComponent as Voucher } from '../../../assets/images/voucher.svg'
import { FeedbackSurveyBuilder } from './ReviewsConfigSetting'
import styles from './style.module.less'

const { Option } = Select

export interface ReviewsConfigStepOneProps {
  settings: FeedbackSurveyBuilder
}

export const ReviewsConfigStepOne: FC<ReviewsConfigStepOneProps> = ({
  settings,
}) => {
  const formik = useFormik({
    initialValues: settings,
    onSubmit: (values) => {
      console.log('Values >>>', values)
    },
  })
  const [form] = Form.useForm()
  const [isListing, setIsListing] = useState(true)
  const [isEmail, setIsEmail] = useState(true)
  const handleChangeSetting = (key, val) => {
    formik.setFieldValue(key, val)
  }
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
            <h2>Builder</h2>
            <div>
              <div className={styles.section}>
                <h3>
                  <Palette style={{ marginRight: '.5rem' }} />
                  <span>Apperance</span>
                </h3>
                <h4>
                  Customize the look and feel of your survey page, as well as
                  customizing features such as displaying the clients full name
                  or aninymously
                </h4>
                <ColorPicker
                  heading="Colour sheme"
                  onSelected={(val) => handleChangeSetting('color', val)}
                />
                <div className={styles.sectionItem}>
                  <Form.Item label="Logo Position">
                    <Select
                      defaultValue={formik.values.logotypePosition}
                      onSelect={(val) =>
                        handleChangeSetting('logotypePosition', val)
                      }
                    >
                      {['Left', 'Middle', 'Right'].map((item) => (
                        <Option key={item} value={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className={styles.sectionItem}>
                  <Slider
                    title="Logo size"
                    value={formik.values.logotypeSize}
                    onChange={(val) => handleChangeSetting('logotypeSize', val)}
                    calculatedValue={`${formik.values.logotypeSize}px`}
                    min={30}
                    max={150}
                  />
                </div>
                <div className={styles.sectionItem}>
                  <Form.Item label="Display client name">
                    <Select
                      defaultValue={formik.values.clientName}
                      onSelect={(val) => {
                        handleChangeSetting('clientName', val)
                        setIsListing(false)
                      }}
                    >
                      {['Full Name', 'First Name', 'Initials'].map((item) => (
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
                    style={{ marginRight: '.5rem', color: '#54b2d3' }}
                  />
                  <span>Notifications</span>
                </h3>
                <h4>
                  The way in which you request feedback from clients who visit
                  you.
                </h4>
                <div className={styles.sectionItem}>
                  <Row>
                    <Col span={12}>
                      <Form form={form} layout="vertical">
                        <Form.Item label="Email">
                          <Badge
                            status={
                              formik.values.notifications.email
                                ? 'success'
                                : 'default'
                            }
                            text={
                              formik.values.notifications.email
                                ? 'Enabled'
                                : 'Disabled'
                            }
                          />
                        </Form.Item>
                      </Form>
                    </Col>
                    <Col span={12}>
                      <Form form={form} layout="vertical">
                        <Form.Item label="SMS">
                          <Badge
                            status={
                              formik.values.notifications.sms
                                ? 'success'
                                : 'default'
                            }
                            text={
                              formik.values.notifications.sms
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
                    <a
                      href="/client-notifications/request-feedback"
                      target="_blank"
                    >
                      Change in client notifications
                    </a>
                    <ExternalLinkGrey style={{ marginLeft: '0.5rem' }} />
                  </div>
                </div>
              </div>
              <div className={styles.section}>
                <h3>
                  <Voucher style={{ marginRight: '.5rem' }} />
                  <span style={{ marginRight: '8px' }}>Incentive</span>
                  <PabauPlus modalType="Marketing" />
                </h3>
                <h4>Reward clients for writing a review</h4>
                <div className={styles.sectionItem}>
                  <Form.Item label="Voucher reward">
                    <Select
                      defaultValue={formik.values.voucherReward}
                      onSelect={(val) =>
                        handleChangeSetting('voucherReward', val)
                      }
                    >
                      {['£5.00 Review Voucher Scheme', 'No voucher issued'].map(
                        (item) => (
                          <Option key={item} value={item}>
                            {item}
                          </Option>
                        )
                      )}
                    </Select>
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2>Preview</h2>
            <div className={styles.previewPanel}>
              <Radio.Group
                buttonStyle="solid"
                defaultValue={isListing}
                value={isListing}
                onChange={(e) => setIsListing(e.target.value)}
              >
                <Radio.Button value={true}>Listing</Radio.Button>
                <Radio.Button value={false}>Read</Radio.Button>
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
                    color={formik.values.color}
                    logoPosition={formik.values.logotypePosition}
                    logoSize={formik.values.logotypeSize}
                  />
                )}
                {!isListing && (
                  <ReadReview
                    title="Highly Recommended"
                    bodyContent="Was extremely nervous about seeing Doctor Hazim Sadideen but had a very friendly and warm welcoming at the reception and immediately felt at ease. Doctor Hazim himself made me feel very comfortable and reassured, initially I was very nervous to begin with. Reassured me that everything was going to be OK and that he'll do the best he can with the surgery. His secretary is also very nice, very approachable and easy to talk to if there are any complications or concerns. Highly recommended."
                    updatedAt="1 year ago"
                    name={
                      formik.values.clientName === 'Full Name'
                        ? formik.values.name
                        : formik.values.clientName === 'First Name'
                        ? formik.values.name.split(' ')[0]
                        : formik.values.name
                            .split(' ')
                            .map((str) => str.charAt(0))
                            .join('. ')
                    }
                    defaultRating={2.5}
                    avatarSrc={userAvatar}
                    color={formik.values.color}
                  />
                )}
              </div>
              <Radio.Group
                buttonStyle="solid"
                defaultValue={isEmail}
                value={isEmail}
                onChange={(e) => setIsEmail(e.target.value)}
              >
                <Radio.Button value={true}>Email</Radio.Button>
                <Radio.Button value={false}>SMS Text</Radio.Button>
              </Radio.Group>
              <div className={styles.templatePanel}>
                {isEmail && <Appointment selectLanguage="en" />}
                {!isEmail && <SMSText />}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.reviewsConfigBodyMobile}>
          <TabMenu
            menuItems={['BUILDER', 'PREVIEW']}
            tabPosition="top"
            minHeight="1px"
          >
            <div>
              <div className={styles.section}>
                <h3>
                  <Palette style={{ marginRight: '.5rem' }} />
                  <span>Apperance</span>
                </h3>
                <h4>
                  Customize the look and feel of your survey page, as well as
                  customizing features such as displaying the clients full name
                  or aninymously
                </h4>
                <ColorPicker
                  heading="Colour sheme"
                  onSelected={(val) => handleChangeSetting('color', val)}
                />
                <div className={styles.sectionItem}>
                  <Form.Item label="Logo Position">
                    <Select
                      defaultValue={formik.values.logotypePosition}
                      onSelect={(val) =>
                        handleChangeSetting('logotypePosition', val)
                      }
                    >
                      {['Left', 'Middle', 'Right'].map((item) => (
                        <Option key={item} value={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className={styles.sectionItem}>
                  <Slider
                    title="Logo size"
                    value={formik.values.logotypeSize}
                    onChange={(val) => handleChangeSetting('logotypeSize', val)}
                    calculatedValue={`${formik.values.logotypeSize}px`}
                    min={30}
                    max={150}
                  />
                </div>
                <div className={styles.sectionItem}>
                  <Form.Item label="Display client name">
                    <Select
                      defaultValue={formik.values.clientName}
                      onSelect={(val) => {
                        handleChangeSetting('clientName', val)
                        setIsListing(false)
                      }}
                    >
                      {['Full Name', 'First Name', 'Initials'].map((item) => (
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
                    style={{ marginRight: '.5rem', color: '#54b2d3' }}
                  />
                  <span>Notifications</span>
                </h3>
                <h4>
                  The way in which you request feedback from clients who visit
                  you. Changes in client notifications.
                </h4>
                <div className={styles.sectionItem}>
                  <Row>
                    <Col span={12}>
                      <Form form={form} layout="vertical">
                        <Form.Item label="Email">
                          <Badge
                            status={
                              formik.values.notifications.email
                                ? 'success'
                                : 'default'
                            }
                            text={
                              formik.values.notifications.email
                                ? 'Enabled'
                                : 'Disabled'
                            }
                          />
                        </Form.Item>
                      </Form>
                    </Col>
                    <Col span={12}>
                      <Form form={form} layout="vertical">
                        <Form.Item label="SMS">
                          <Badge
                            status={
                              formik.values.notifications.sms
                                ? 'success'
                                : 'default'
                            }
                            text={
                              formik.values.notifications.sms
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
                    <a
                      href="/client-notifications/request-feedback"
                      target="_blank"
                    >
                      Change in client notifications
                    </a>
                    <ExternalLinkGrey style={{ marginLeft: '0.5rem' }} />
                  </div>
                </div>
              </div>
              <div className={styles.section}>
                <h3>
                  <Voucher style={{ marginRight: '.5rem' }} />
                  <span style={{ marginRight: '8px' }}>Incentive</span>
                  <PabauPlus modalType="Marketing" />
                </h3>
                <h4>Automatically reward clients for writing a review.</h4>
                <div className={styles.sectionItem}>
                  <Form.Item label="Voucher reward">
                    <Select
                      defaultValue={formik.values.voucherReward}
                      onSelect={(val) =>
                        handleChangeSetting('voucherReward', val)
                      }
                    >
                      {['£5.00 Review Voucher Scheme', 'No voucher issued'].map(
                        (item) => (
                          <Option key={item} value={item}>
                            {item}
                          </Option>
                        )
                      )}
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
                <Radio.Button value={true}>Listing</Radio.Button>
                <Radio.Button value={false}>Read</Radio.Button>
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
                    color={formik.values.color}
                    logoPosition={formik.values.logotypePosition}
                    logoSize={formik.values.logotypeSize}
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
                    color={formik.values.color}
                  />
                )}
              </div>
              <Radio.Group
                buttonStyle="solid"
                defaultValue={isEmail}
                value={isEmail}
                onChange={(e) => setIsEmail(e.target.value)}
              >
                <Radio.Button value={true}>Email</Radio.Button>
                <Radio.Button value={false}>SMS Text</Radio.Button>
              </Radio.Group>
              <div className={styles.templatePanel}>
                {isEmail && <Appointment selectLanguage="en" />}
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
