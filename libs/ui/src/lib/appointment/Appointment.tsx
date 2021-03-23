/**
 * This is a Pabau Appointment
 */

import React, { FC, useEffect } from 'react'
import { Row, Col, Divider } from 'antd'
import {
  InstagramOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Button } from '@pabau/ui'
import styles from './Appointment.module.less'
import { ReactComponent as NormalClinicLogo } from '../../assets/images/normal-clinic-logo.svg'
import { ReactComponent as Calendar } from '../../assets/images/calendar.svg'

import ENSVG from '../../assets/images/lang-logos/en.svg'
import FRSVG from '../../assets/images/lang-logos/french.svg'
import SPSVG from '../../assets/images/lang-logos/spanish.svg'
import ARSVG from '../../assets/images/lang-logos/arabic.svg'
import BGSVG from '../../assets/images/lang-logos/bulgarian.svg'
import CSSVG from '../../assets/images/lang-logos/czech.svg'
import HUSVG from '../../assets/images/lang-logos/hungarian.svg'
import LVSVG from '../../assets/images/lang-logos/latvian.svg'
import NOSVG from '../../assets/images/lang-logos/norwegian.svg'
import PLSVG from '../../assets/images/lang-logos/polish.svg'
import SWSVG from '../../assets/images/lang-logos/swedish.svg'
import ROSVG from '../../assets/images/lang-logos/romanian.svg'
import RUSVG from '../../assets/images/lang-logos/russian.svg'
import DASVG from '../../assets/images/lang-logos/dutch.svg'

interface P {
  title?: string
  iconPath?: string
  appointDate?: string
  service?: string
  name?: string
  content?: string
  address?: string
  note?: string
  medicalHistory?: string
  information?: string
  requestConfirm?: boolean
  allowRescheduling?: boolean
  allowCancellation?: boolean
  displayPolicy?: boolean
  showService?: boolean
  showEmployeeName?: boolean
  addMedicalHisButton?: boolean
  selectLanguage: string
  backGroundColor?: string
  buttonColor?: string
  informationMessage?: string
  medicalMessage?: string
  standardTapIndex?: string
  activeSocialIcons?: string[]
  type?: string
}

export const Appointment: FC<P> = ({
  requestConfirm,
  allowRescheduling,
  allowCancellation,
  displayPolicy,
  showService,
  showEmployeeName,
  addMedicalHisButton,
  selectLanguage,
  informationMessage,
  medicalMessage,
  backGroundColor,
  buttonColor,
  standardTapIndex,
  activeSocialIcons = [],
  type = '',
}) => {
  const { t, i18n } = useTranslation('common')

  useEffect(() => {
    const lanCode = selectLanguage.toLowerCase()
      ? selectLanguage.toLowerCase()
      : 'en'
    i18n.changeLanguage(lanCode)
  }, [i18n, selectLanguage])

  function setSocialIcon(value) {
    if (value.includes('facebook')) {
      return <FacebookOutlined style={{ padding: '5px' }} />
    } else if (value.includes('linksIn')) {
      return <LinkedinOutlined style={{ padding: '5px' }} />
    } else if (value.includes('instagram')) {
      return <InstagramOutlined style={{ padding: '5px' }} />
    } else if (value.includes('twitter')) {
      return <TwitterOutlined style={{ padding: '5px' }} />
    }
  }

  function getFlag(country) {
    switch (country) {
      case 'EN':
        return ENSVG
      case 'FR':
        return FRSVG
      case 'SP':
        return SPSVG
      case 'AR':
        return ARSVG
      case 'BG':
        return BGSVG
      case 'CS':
        return CSSVG
      case 'DA':
        return DASVG
      case 'HU':
        return HUSVG
      case 'LV':
        return LVSVG
      case 'NO':
        return NOSVG
      case 'PL':
        return PLSVG
      case 'SW':
        return SWSVG
      case 'RO':
        return ROSVG
      case 'RU':
        return RUSVG
    }
  }

  return (
    <div>
      {standardTapIndex === '1' ? (
        <div
          className={styles.cardAppointment}
          style={{ backgroundColor: backGroundColor }}
        >
          <Row justify="center" className={styles.logo}>
            <Col>
              <NormalClinicLogo />
            </Col>
          </Row>
          <Row gutter={[0, 4]}>
            <Col>
              <span className={styles.greetingText}>
                {type === 'new'
                  ? t(
                      'notifications.appointmentReminder.newAppointmentGreeting'
                    )
                  : type === 'reschedule'
                  ? t(
                      'notifications.appointmentReminder.rescheduleAppointmentGreeting'
                    )
                  : t('notifications.appointmentReminder.greeting')}
              </span>
            </Col>
          </Row>
          <Divider className={styles.divider} />
          <Row justify="start" align="middle" gutter={[0, 4]}>
            <Col>
              <Calendar />
              <span style={{ marginLeft: '5px' }}>
                {t('notifications.appointmentReminder.detail')}
              </span>
            </Col>
          </Row>
          <Row gutter={[0, 4]}>
            <Col>
              <span>{t('notifications.appointmentReminder.date')}</span>
              {allowRescheduling && (
                <Button type="link" className={styles.anchor}>
                  {t('notifications.appointmentReminder.reschedule')}
                </Button>
              )}
            </Col>
          </Row>
          <Row gutter={[0, 4]}>
            {showService && (
              <Col>
                <span>
                  {t('notifications.appointmentReminder.service')}{' '}
                  {showEmployeeName
                    ? t('notifications.appointmentReminder.employee')
                    : ''}
                </span>
              </Col>
            )}
          </Row>
          <Row gutter={[0, 4]}>
            <Col>
              <span className={styles.mainAppointment}>
                {t('notifications.appointmentReminder.title')}
              </span>
            </Col>
          </Row>
          <Row gutter={[0, 16]}>
            <Col>
              <span className={styles.address}>
                {t('notifications.appointmentReminder.address')}
              </span>
            </Col>
          </Row>
          <Row gutter={[0, 16]} justify="space-between">
            {allowCancellation && (
              <Col>
                <Button
                  type="default"
                  className={styles.button}
                  backgroundColor={buttonColor}
                >
                  {t('notifications.appointmentReminder.cancelButton')}
                </Button>
              </Col>
            )}
            {requestConfirm && (
              <Col>
                <Button type="primary" backgroundColor={buttonColor}>
                  {t('notifications.appointmentReminder.confirmButton')}
                </Button>
              </Col>
            )}
          </Row>
          {displayPolicy && (
            <>
              <Row gutter={[0, 8]}>
                <Col>
                  <span>{t('notifications.appointmentReminder.policy')}</span>
                </Col>
              </Row>
              <Row gutter={[0, 8]}>
                <Col>
                  <Button type="link" className={styles.anchor}>
                    {t('notifications.appointmentReminder.cancelPolicy')}
                  </Button>
                </Col>
              </Row>
            </>
          )}

          {(medicalMessage ||
            addMedicalHisButton ||
            informationMessage ||
            activeSocialIcons.length > 0) && <Divider />}

          {medicalMessage && (
            <Row justify="center" style={{ marginBottom: '20px', width: 440 }}>
              <span className={styles.breaktext}>{medicalMessage}</span>
            </Row>
          )}

          <Row justify="center">
            {addMedicalHisButton && (
              <Button
                type="default"
                className={styles.button}
                backgroundColor={buttonColor}
              >
                {t('notifications.appointmentReminder.complete')}
              </Button>
            )}
          </Row>

          {informationMessage && (
            <Row justify="center" style={{ marginTop: '20px', width: 440 }}>
              <span className={styles.breaktext}>{informationMessage}</span>
            </Row>
          )}

          <Row justify="center" style={{ marginTop: '20px' }}>
            {activeSocialIcons.map((value, index) => setSocialIcon(value))}
          </Row>
        </div>
      ) : (
        <div
          className={styles.cardAddTemplateContainer}
          style={{ backgroundColor: backGroundColor }}
        >
          <Button type="default" className={styles.addTemplateTxt}>
            <img src={getFlag(selectLanguage)} alt="" />
            &nbsp;+ Add Template
          </Button>
        </div>
      )}
    </div>
  )
}

export default Appointment
