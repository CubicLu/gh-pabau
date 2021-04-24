import React, { FC } from 'react'
import {
  Button,
  CancelAClassBookingProps,
  EmailSMSPreviewProps,
} from '@pabau/ui'
import CommonEmailPreview from './CommonEmailPreview'

interface P {
  backGroundColor?: string
  buttonColor?: string
  activeSocialIcons?: string[]
  informationMessage?: string
  type?: string
}

const CancelAppointmentEmailPreview: FC<
  P & CancelAClassBookingProps & EmailSMSPreviewProps
> = ({
  backGroundColor,
  activeSocialIcons,
  buttonColor,
  informationMessage,
  type,
  greeting,
  text,
  dateTime,
  address,
  message,
  consultancyName,
  consultationDetail,
  cancelButtonName,
  rebookButtonName,
}) => {
  return (
    <div>
      <CommonEmailPreview
        greeting={greeting}
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
                  color: '#3d3d46',
                  fontWeight: 'normal',
                  fontSize: '13px',
                  lineHeight: '18px',
                }}
              >
                {text}
              </span>
            </td>
          </tr>
          <tr>
            <td style={{ paddingBottom: '4px' }}>
              <p
                style={{
                  color: '#959595',
                  fontWeight: 'normal',
                  fontSize: '13px',
                  lineHeight: '18px',
                  marginTop: '0',
                  marginBottom: '4px',
                }}
              >
                {dateTime}
              </p>
              <p
                style={{
                  color: '#959595',
                  fontWeight: 'normal',
                  fontSize: '13px',
                  lineHeight: '18px',
                  marginTop: '0',
                  marginBottom: '4px',
                }}
              >
                {consultationDetail}
              </p>
            </td>
          </tr>
          {cancelButtonName && (
            <tr>
              <td style={{ paddingBottom: '12px' }}>
                <Button
                  size="small"
                  danger
                  style={{
                    background: '#fff1f0',
                    border: '1px solid #ffa39e',
                    borderRadius: '2px',
                    color: '#f5222d',
                    fontWeight: 'normal',
                    fontSize: '12px',
                    lineHeight: '20px',
                    height: 'auto',
                    padding: '0 8px',
                  }}
                >
                  {cancelButtonName}
                </Button>
              </td>
            </tr>
          )}
          <tr>
            <td style={{ paddingBottom: '12px' }}>
              <span
                style={{
                  fontFamily: 'Arial',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  color: '#3d3d46',
                }}
              >
                {consultancyName}
              </span>
              <p
                style={{
                  color: '#959595',
                  fontWeight: 'normal',
                  fontSize: '10px',
                  lineHeight: '15px',
                  marginTop: '0',
                  marginBottom: '0',
                }}
              >
                {address}
              </p>
            </td>
          </tr>
          <tr>
            <td style={{ paddingBottom: '16px' }}>
              <span
                style={{
                  color: '#3d3d46',
                  fontWeight: 'normal',
                  fontSize: '13px',
                  lineHeight: '18px',
                }}
              >
                {message}
              </span>
            </td>
          </tr>
          {rebookButtonName && (
            <tr>
              <td style={{ textAlign: 'center', paddingBottom: 12 }}>
                <Button
                  size="middle"
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
                  {rebookButtonName}
                </Button>
              </td>
            </tr>
          )}
        </table>
      </CommonEmailPreview>
    </div>
  )
}

export default CancelAppointmentEmailPreview
