import React, { FC } from 'react'
import CommonEmailPreview from './CommonEmailPreview'
import { BookedOntoClassProps, EmailSMSPreviewProps } from '@pabau/ui'

interface P {
  backGroundColor?: string
  buttonColor?: string
  activeSocialIcons?: string[]
  informationMessage?: string
  type?: string
}

const BookedOntoClassEmailPreview: FC<
  P & BookedOntoClassProps & EmailSMSPreviewProps
> = ({
  backGroundColor,
  activeSocialIcons,
  buttonColor,
  informationMessage,
  type,
  greeting,
  appointmentDetailMessage,
  consultationDetail,
  consultancyName,
  dateTime,
  address,
  message,
  regardsName,
  regards,
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
            <td
              style={{
                padding: '16px 0',
              }}
            >
              <div
                style={{
                  borderTop: '1px solid rgba(196, 218, 237, 0.5)',
                }}
              ></div>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '4px 0px 16px 0px' }}>
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
                  {appointmentDetailMessage} :
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td style={{ paddingBottom: '10px' }}>
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
          <tr>
            <td
              style={{
                marginTop: '16px !important',
                maxWidth: '70%',
                paddingBottom: 10,
              }}
            >
              <div
                style={{
                  fontSize: '10px',
                  lineHeight: '18px',
                  color: '#9292a3',
                }}
              >
                {regards}
              </div>
              <div
                style={{
                  fontSize: '10px',
                  lineHeight: '18px',
                  color: '#9292a3',
                }}
              >
                {regardsName}
              </div>
            </td>
          </tr>
        </table>
      </CommonEmailPreview>
    </div>
  )
}

export default BookedOntoClassEmailPreview
