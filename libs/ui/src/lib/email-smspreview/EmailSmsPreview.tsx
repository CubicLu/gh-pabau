import React, { PropsWithChildren, ReactNode, useState } from 'react'
import { Row, Col, Divider, Radio } from 'antd'
import styles from './EmailSmsPreview.module.less'
import { ReactComponent as NormalClinicLogo } from '../../assets/images/normal-clinic-logo.svg'
import { ReactComponent as GiftVoucherLogo } from '../../assets/images/gift-voucher.svg'
import {
  FacebookOutlined,
  WhatsAppOutlined,
  InstagramOutlined,
  TwitterOutlined,
  LinkedinOutlined,
} from '@ant-design/icons'

export interface EmailSMSPreviewProps {
  greeting?: string
  subtitle?: string
  children?: ReactNode
  footerIconGroup?: boolean
  footerContact?: boolean
  footerText?: string
  isFooterText?: boolean
  smsGreeting?: string
  smsMessage?: string
  smsFooterText?: string
  footer?: boolean
  isGiftVoucher?: boolean
  hideLogo?: boolean
  previewButtonGroup?: boolean
  previewCustomStatus?: string
  activeSocialIcons?: string[]
  buttonColor?: string
  backGroundColor?: string
  contactEmail?: string
  contactInfoNumber?: string
  displayContactMessage?: boolean
  contactMessage?: string
}

export interface FooterProps {
  iconGroup?: boolean
  contact?: boolean
  text?: string
  isFooterText?: boolean
  activeSocialIcons?: string[]
  contactEmail?: string
  contactInfoNumber?: string
  displayContactMessage?: boolean
  contactMessage?: string
}

export interface NoShowAppointmentProps {
  message?: string
  contactNumber?: string
  closingText?: string
  signatureBlock?: string
  bookButtonName?: string
  buttonTitleMessage?: string
  contactFirstHalfMsg?: string
  contactSecondHalfMsg?: string
}

export interface BookedOntoClassProps {
  dateTime?: string
  consultationDetail?: string
  consultancyName?: string
  address?: string
  message?: string
  appointmentDetailMessage?: string
  regards?: string
  regardsName?: string
}

export interface CancelAClassBookingProps {
  dateTime?: string
  consultationDetail?: string
  consultancyName?: string
  address?: string
  message?: string
  text?: string
  cancelButtonName?: string
  rebookButtonName?: string
}

export interface ClassRescheduledProps {
  message?: string
}

export interface RequestFeedbackProps {
  message?: string
  message1?: string
  closingText?: string
  signatureBlock?: string
  buttonName?: string
}

export interface ReminderForClassProps {
  message?: string
  contactNumber?: number
}

export interface MissedAClassProps {
  message?: string
  contactNumber?: string
}

export interface ReferralProps {
  message?: string
  footerText?: string
  description?: string
  buttonName?: string
}

export interface InvoicesProps {
  message?: string[]
  footerText?: string
  showInvoiceButton?: boolean
  bestRegards?: string
  senderFirstName?: string
  showEnablePay?: boolean
  payButtonName?: string
  viewButtonName?: string
}

export interface LeadResponsesProps {
  message?: string
  text?: string
  companyEmail?: string
  companyPhone?: string
  description?: string
  messageLine?: string
}

export interface GiftVoucherProps {
  value?: string
  voucherCode?: string
  expiry?: string
  consultancyName?: string
  displayViewButton?: boolean
  buttonName?: string
  consultancyDetailMessage?: string
  valueMessage?: string
  voucherCodeMessage?: string
  expiryMessage?: string
}

export interface ConnectRegistrationProps {
  message?: string
  connectURL?: string
  username?: string
  password?: string
  text?: string
  credentialMessage?: string
  userNameMessage?: string
  passwordMessage?: string
}

export interface DocumentSharedProps {
  userEmail?: string
  userName?: string
  buttonName?: string
  clinicName?: string
  infoText?: string
  closingText?: string
  signatureBlock?: string
  messageLine1?: string
  messageLine2?: string
  fromMessage?: string
  userMessage?: string
}

export interface MedicalFormProps {
  message?: string
  contactNumber?: string
  text?: string
}

export interface PackageSessionProps {
  message?: string
  buttonName?: string
}

export interface NewAppoinmentsIsBookedProps {
  message?: string
  contactNumber?: number
}

export interface ClassWaitListProps {
  message?: string
  buttonTitleMessage?: string
  buttonName?: string
}

export interface ClassesSpotAvailableProps {
  message?: string
  buttonTitleMessage?: string
  bookButtonName?: string
}

export interface UpComingAppoinmentReminderProps {
  message?: string
  contactNumber?: number
}

export interface BirthDayPreviewProps {
  wishingMessage?: string
  messages?: string[]
  closingText?: string
  signatureBlock?: string
}

export function EmailSMSFooter(props: FooterProps): JSX.Element {
  const {
    iconGroup = true,
    contact = false,
    text,
    isFooterText = false,
    activeSocialIcons = [],
    contactInfoNumber,
    contactEmail,
    displayContactMessage = true,
    contactMessage = 'Or get in touch with us via Phone or Email:',
  } = props

  const setSocialIcon = (value) => {
    if (value.includes('facebook')) {
      return <FacebookOutlined className={styles.color} />
    } else if (value.includes('whatsApp')) {
      return <WhatsAppOutlined className={styles.color} />
    } else if (value.includes('linksIn')) {
      return <LinkedinOutlined className={styles.color} />
    } else if (value.includes('instagram')) {
      return <InstagramOutlined className={styles.color} />
    } else if (value.includes('twitter')) {
      return <TwitterOutlined className={styles.color} />
    }
  }
  return (
    <>
      <Divider className={styles.dividerHr} />
      {contact && (
        <>
          {displayContactMessage && (
            <Row gutter={[0, 4]} className={styles.bookAppointment}>
              <Col>
                <span className={styles.message}>{contactMessage}</span>
              </Col>
            </Row>
          )}
          <Row gutter={[0, 4]} className={styles.bookAppointment}>
            <Col>
              <span className={styles.contactInfo}>
                {contactInfoNumber || '+44 000 987 507'}
              </span>
            </Col>
          </Row>
          <Row gutter={[0, 4]} className={styles.bookAppointment}>
            <Col>
              <span className={styles.contactInfo}>
                {contactEmail || 'info@theclinic.com'}
              </span>
            </Col>
          </Row>
        </>
      )}
      {isFooterText && text !== '' && (
        <Row gutter={[0, 4]} className={styles.textBox}>
          <Col>
            <span
              className={`${styles.text} ${styles.footerText}`}
              dangerouslySetInnerHTML={{ __html: text || '' }}
            ></span>
          </Col>
        </Row>
      )}
      {iconGroup === true && (
        <Row className={styles.footerIcon}>
          <Col>
            <div className={styles.iconGroup}>
              {activeSocialIcons.map((value, index) => setSocialIcon(value))}
            </div>
          </Col>
        </Row>
      )}
    </>
  )
}

export const EmailSmsPreview = (
  props: PropsWithChildren<EmailSMSPreviewProps>
): JSX.Element => {
  const {
    greeting,
    subtitle,
    children,
    footerContact,
    footerIconGroup,
    footerText,
    isFooterText,
    smsGreeting,
    smsFooterText,
    smsMessage,
    footer = true,
    isGiftVoucher = false,
    hideLogo = false,
    previewButtonGroup = true,
    previewCustomStatus,
    backGroundColor = '',
    contactEmail,
    contactInfoNumber,
    activeSocialIcons = ['facebook', 'whatsApp', 'instagram', 'twitter'],
    displayContactMessage = true,
    contactMessage,
  } = props
  const [previewStatus, setPreviewStatus] = useState(
    previewCustomStatus || 'email'
  )

  const handleSmsTabChanged = (value) => {
    setPreviewStatus(value)
  }

  return (
    <div>
      {previewButtonGroup && (
        <Row justify="center" className={styles.previewButtonGroup}>
          <Radio.Group defaultValue="email" buttonStyle="solid">
            <Radio.Button
              className={styles.radioLeftButton}
              value="email"
              onClick={() => handleSmsTabChanged('email')}
            >
              Email
            </Radio.Button>
            <Radio.Button
              className={styles.radioRightButton}
              value="sms"
              onClick={() => handleSmsTabChanged('sms')}
            >
              SMS Text
            </Radio.Button>
          </Radio.Group>
        </Row>
      )}
      {previewStatus === 'email' && (
        <div
          style={{ backgroundColor: backGroundColor }}
          className={`${styles.emailPreview} ${
            isGiftVoucher && `${styles.giftVoucher}`
          }`}
        >
          {isGiftVoucher && (
            <div className={styles.giftVoucherBlock}>
              <div className={styles.giftVoucherCenter}>
                <GiftVoucherLogo />
              </div>
            </div>
          )}
          <div>
            {!hideLogo && (
              <>
                <Row justify="center" className={styles.logo}>
                  <Col>
                    <NormalClinicLogo />
                  </Col>
                </Row>
                <Row gutter={[0, 4]}>
                  <Col>
                    <span className={styles.greetingText}>{greeting}</span>
                  </Col>
                </Row>
              </>
            )}
            {subtitle !== '' && (
              <Row className={styles.subhead}>
                <Col>
                  <span className={styles.mainAppointment}>{subtitle}</span>
                </Col>
              </Row>
            )}
            {children}
            {footer && (
              <EmailSMSFooter
                contact={footerContact}
                iconGroup={footerIconGroup}
                text={footerText}
                isFooterText={isFooterText}
                activeSocialIcons={activeSocialIcons}
                contactInfoNumber={contactInfoNumber}
                contactEmail={contactEmail}
                displayContactMessage={displayContactMessage}
                contactMessage={contactMessage}
              />
            )}
          </div>
        </div>
      )}
      {previewStatus === 'sms' && (
        <div className={styles.smsPreview}>
          <Row className={styles.smsHead}>
            <Col>
              {smsGreeting !== '' && (
                <span className={styles.titleRow}>{smsGreeting}</span>
              )}
            </Col>
          </Row>
          <Row className={styles.smsHead}>
            <Col>
              {smsMessage && smsMessage !== '' && (
                <span
                  id="smsMessage"
                  dangerouslySetInnerHTML={{ __html: smsMessage }}
                ></span>
              )}
            </Col>
          </Row>
          {smsFooterText && smsFooterText !== '' && (
            <span
              id="smsFooterText"
              dangerouslySetInnerHTML={{ __html: smsFooterText || '' }}
            ></span>
          )}
        </div>
      )}
    </div>
  )
}

export default EmailSmsPreview
