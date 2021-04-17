import React, { FC } from 'react'
import CommonEmailPreview from './CommonEmailPreview'
import { Button, EmailSMSPreviewProps, NoShowAppointmentProps } from '@pabau/ui'

interface P {
  backGroundColor?: string
  buttonColor?: string
  activeSocialIcons?: string[]
  selectLanguage?: string
  showService?: boolean
  showEmployeeName?: boolean
  informationMessage?: string
  type?: string
  footerContact?: boolean
  contactNumber?: string
}

const NoShowAppointmentEmailPreview: FC<
  P & NoShowAppointmentProps & EmailSMSPreviewProps
> = ({
  backGroundColor,
  activeSocialIcons,
  buttonColor,
  informationMessage,
  type,
  footerContact,
  contactNumber,
  greeting,
  subtitle,
  message,
  bookButtonName,
  buttonTitleMessage,
  contactFirstHalfMsg,
  contactSecondHalfMsg,
  closingText,
  signatureBlock,
}) => {
  return (
    <div>
      <CommonEmailPreview
        greeting={greeting}
        subtitle={subtitle}
        footerIconGroup={true}
        previewButtonGroup={false}
        previewCustomStatus={'email'}
        activeSocialIcons={activeSocialIcons}
        backGroundColor={backGroundColor}
        isFooterText={true}
        footerText={informationMessage}
        footer={activeSocialIcons?.length > 0 || informationMessage?.length > 0}
      >
        <table style={{ width: '100%', borderSpacing: '0' }}>
          <tr>
            <td style={{ paddingBottom: '16px' }}>
              <span
                style={{
                  fontFamily: 'Arial',
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontSize: '12px',
                  lineHeight: '18px',
                  color: '#3d3d46',
                }}
              >
                {message}
              </span>
            </td>
          </tr>
          {!footerContact ? (
            <tr>
              <td style={{ paddingBottom: '16px' }}>
                <span
                  style={{
                    fontFamily: 'Arial',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: '12px',
                    lineHeight: '18px',
                    color: '#3d3d46',
                  }}
                >
                  {contactFirstHalfMsg}{' '}
                  <span style={{ color: '#00a1e1' }}>{contactNumber}</span>
                  {contactSecondHalfMsg}
                </span>
              </td>
            </tr>
          ) : (
            <tr
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <td style={{ paddingBottom: '16px' }}>
                <span
                  style={{
                    fontFamily: 'Arial',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: '12px',
                    lineHeight: '18px',
                    color: '#3d3d46',
                  }}
                >
                  {buttonTitleMessage}
                </span>
              </td>
            </tr>
          )}
          {bookButtonName && (
            <tr>
              <td style={{ textAlign: 'center' }}>
                <Button
                  backgroundColor={buttonColor || '#00a1e1'}
                  style={{
                    borderRadius: '4px',
                    border: 'none',
                    color: '#ffffff',
                    fontWeight: 'normal',
                    fontSize: '12px',
                    lineHeight: '18px',
                    minWidth: '174px',
                    padding: '5px 0',
                    height: 'auto',
                  }}
                >
                  {bookButtonName}
                </Button>
              </td>
            </tr>
          )}
          {!footerContact && (
            <tr
              style={{
                maxWidth: '70%',
              }}
            >
              <td style={{ paddingTop: '16px' }}>
                <div
                  style={{
                    fontSize: '10px',
                    lineHeight: '18px',
                    color: '#9292a3',
                  }}
                >
                  {closingText}
                </div>
                <div
                  style={{
                    fontSize: '10px',
                    lineHeight: '18px',
                    color: '#9292a3',
                  }}
                >
                  {signatureBlock}
                </div>
              </td>
            </tr>
          )}
        </table>
      </CommonEmailPreview>
    </div>
  )
}

export default NoShowAppointmentEmailPreview
