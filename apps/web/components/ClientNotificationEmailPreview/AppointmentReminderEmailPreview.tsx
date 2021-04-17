import React, { FC } from 'react'
import { setSocialIcon } from './utils'
import { TFunction } from 'i18next'

interface P {
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
  t: TFunction
}

export const AppointmentEmailPreview: FC<P> = ({
  requestConfirm,
  allowRescheduling,
  allowCancellation,
  displayPolicy,
  showService,
  showEmployeeName,
  addMedicalHisButton,
  informationMessage,
  medicalMessage,
  backGroundColor,
  buttonColor,
  activeSocialIcons = [],
  type,
  t,
}) => {
  return (
    <div
      style={{
        backgroundColor: backGroundColor || '#fff',
        padding: '24px',
        fontFamily: 'Arial, Helvetica, sans-serif !important',
        fontSize: '13px',
        color: 'rgba(0, 0, 0, 0.65)',
        width: '440px',
        maxWidth: '440px',
        margin: '40px auto',
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.35)',
        border: '2px solid rgba(0,0,0,0.06)',
      }}
    >
      <table cellSpacing="0" cellPadding="0" width="100%">
        <tr>
          <td>
            <div
              style={{
                borderBottom: '50px solid transparent',
                textAlign: 'center',
              }}
            >
              <img
                src="https://seeklogo.com/images/N/normal-clinic-logo-190E3BCE57-seeklogo.com.png"
                alt={'logo'}
                width={'85px'}
              />
            </div>
          </td>
        </tr>
        <tr>
          <td style={{ padding: '4px 0' }}>
            <span
              style={{
                fontSize: '20px',
                lineHeight: '18px',
                color: 'rgba(0, 0, 0, 0.65)',
              }}
            >
              {type === 'new'
                ? t('notifications.appointmentReminder.newAppointmentGreeting')
                : type === 'reschedule'
                ? t(
                    'notifications.appointmentReminder.rescheduleAppointmentGreeting'
                  )
                : t('notifications.appointmentReminder.greeting')}
            </span>
          </td>
        </tr>
        <tr>
          <td
            style={{
              margin: '24px 0 14px 0',
              borderTop: '1px solid rgba(0, 0, 0, 0.06)',
              display: 'block',
            }}
          ></td>
        </tr>
        <tr>
          <td style={{ padding: '4px 0' }}>
            <div
              style={{
                fontSize: '13px',
                color: 'rgba(0, 0, 0, 0.65)',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                src={
                  'https://i.pinimg.com/originals/b0/b8/5c/b0b85cd8797638d0c80035f572b0cbd3.jpg'
                }
                width="13px"
                height="13px"
                alt={'calender'}
                style={{ padding: '5px 0' }}
              />

              <span style={{ marginLeft: '5px', lineHeight: '23px' }}>
                {t('notifications.appointmentReminder.detail')}
              </span>
            </div>
          </td>
        </tr>
        <tr>
          <td style={{ padding: '4px 0' }}>
            <span
              style={{
                fontSize: '13px',
                color: 'rgba(0, 0, 0, 0.65)',
                marginRight: '8px',
              }}
            >
              {t('notifications.appointmentReminder.date')}
            </span>
            {allowRescheduling && (
              <button
                style={{
                  fontSize: '10px',
                  color: '#00a1e1',
                  borderRadius: '4px',
                  letterSpacing: '0.05em',
                  padding: '4px 1em',
                  background: 'transparent',
                  borderColor: 'transparent',
                  boxShadow: 'none',
                  outline: 'none',
                }}
              >
                {t('notifications.appointmentReminder.reschedule')}
              </button>
            )}
          </td>
        </tr>
        <tr>
          <td>
            {showService && (
              <div>
                <span>
                  {t('notifications.appointmentReminder.service')}{' '}
                  {showEmployeeName
                    ? t('notifications.appointmentReminder.employee')
                    : ''}
                </span>
              </div>
            )}
          </td>
        </tr>
        <tr>
          <td style={{ padding: '4px 0' }}>
            <span
              style={{
                fontSize: '13px',
                lineHeight: '18px',
                fontWeight: 'bold',
              }}
            >
              {t('notifications.appointmentReminder.title')}
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '10px' }}>
            <span style={{ fontSize: '10px', lineHeight: '15px' }}>
              {t('notifications.appointmentReminder.address')}
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '8px' }}>
            <table cellSpacing="0" cellPadding="0" width="100%">
              <tr>
                <td>
                  {allowCancellation && (
                    <div style={{ padding: '8px 0' }}>
                      <button
                        style={{
                          border: '1px solid #00a1e1',
                          background: buttonColor || '#fff',
                          color: '#00a1e1',
                          fontSize: '0.8rem',
                          borderRadius: '4px',
                          letterSpacing: '0.05em',
                          padding: '4px 1em',
                          lineHeight: '1.5715',
                          fontWeight: 400,
                          boxShadow: '0 2px 0 rgba(0, 0, 0, 0.02)',
                          outline: 'none',
                        }}
                      >
                        {t('notifications.appointmentReminder.cancelButton')}
                      </button>
                    </div>
                  )}
                </td>
                <td>
                  {requestConfirm && (
                    <div style={{ padding: '8px 0' }}>
                      <button
                        style={{
                          border: '1px solid #54b2d3',
                          background: buttonColor || '#54b2d3',
                          color: '#fff',
                          fontSize: '0.8rem',
                          borderRadius: '4px',
                          letterSpacing: '0.05em',
                          padding: '4px 1em',
                          lineHeight: '1.5715',
                          fontWeight: 400,
                          boxShadow: '0 2px 0 rgba(0, 0, 0, 0.05)',
                          textShadow: '0 -1px 0 rgba(0, 0, 0, 0.12)',
                          outline: 'none',
                        }}
                      >
                        {t('notifications.appointmentReminder.confirmButton')}
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            </table>
          </td>
        </tr>
        {displayPolicy && (
          <>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <span>{t('notifications.appointmentReminder.policy')}</span>
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0' }}>
                <button
                  style={{
                    fontSize: '10px',
                    color: '#00a1e1',
                    borderRadius: '4px',
                    letterSpacing: '0.05em',
                    padding: '4px 1em',
                    background: 'transparent',
                    borderColor: 'transparent',
                    lineHeight: '1.5715',
                    fontWeight: 400,
                    outline: 'none',
                  }}
                >
                  {t('notifications.appointmentReminder.cancelPolicy')}
                </button>
              </td>
            </tr>
          </>
        )}

        <tr>
          <td
            style={{
              margin: '24px 0 14px 0',
              borderTop: '1px solid rgba(0, 0, 0, 0.06)',
              display: 'block',
            }}
          ></td>
        </tr>

        <tr>
          <td style={{ paddingBottom: '20px' }}>
            <span>
              {medicalMessage ||
                t('notifications.clientNotification.medicalMessage')}
            </span>
          </td>
        </tr>
        <tr>
          <td align="center">
            {addMedicalHisButton && (
              <button
                style={{
                  border: '1px solid #00a1e1',
                  background: buttonColor || '#fff',
                  color: '#00a1e1',
                  fontSize: '0.8rem',
                  borderRadius: '4px',
                  letterSpacing: '0.05em',
                  padding: '4px 1em',
                  lineHeight: '1.5715',
                  fontWeight: 400,
                  boxShadow: '0 2px 0 rgba(0, 0, 0, 0.02)',
                  outline: 'none',
                }}
              >
                {t('notifications.appointmentReminder.complete')}
              </button>
            )}
          </td>
        </tr>
        <tr>
          <td align="center" style={{ paddingTop: '20px' }}>
            <span>{informationMessage}</span>
          </td>
        </tr>
        <tr>
          <td align="center" style={{ paddingTop: '20px' }}>
            {activeSocialIcons.map((value, index) => setSocialIcon(value))}
          </td>
        </tr>
      </table>
    </div>
  )
}

export default AppointmentEmailPreview
