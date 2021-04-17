import React, { FC } from 'react'
import CommonEmailPreview from './CommonEmailPreview'
import { ConnectRegistrationProps, EmailSMSPreviewProps } from '@pabau/ui'

interface P {
  backGroundColor?: string
  buttonColor?: string
  activeSocialIcons?: string[]
  informationMessage?: string
  type?: string
  footerContact?: boolean
}

const ConnectRegistrationEmailPreview: FC<
  P & ConnectRegistrationProps & EmailSMSPreviewProps
> = ({
  backGroundColor,
  activeSocialIcons,
  informationMessage,
  type,
  footerContact,
  greeting,
  message,
  credentialMessage,
  text,
  contactMessage,
  userNameMessage,
  passwordMessage,
  username,
  password,
  connectURL,
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
        footer={true}
        footerContact={true}
        contactEmail={'abc@info.com'}
        contactInfoNumber={'+98765432101'}
        contactMessage={contactMessage}
      >
        <table style={{ width: '100%', borderSpacing: '0' }}>
          <tr>
            <td style={{ paddingBottom: '16px', paddingTop: '18px' }}>
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
          <tr>
            <td style={{ paddingBottom: '16px' }}>
              <span style={{ color: '#00a1e1' }}>{connectURL}</span>
            </td>
          </tr>
          <tr>
            <td style={{ paddingBottom: '16px' }}>
              <div>
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
                  {credentialMessage}
                </span>
              </div>
              <div
                style={{
                  marginTop: '8px',
                }}
              >
                <span
                  style={{
                    color: '#9292a3',
                    fontWeight: 'normal',
                    fontSize: '12px',
                    lineHeight: '18px',
                    display: 'block',
                    marginBottom: '2px',
                  }}
                >
                  {userNameMessage}: {username}
                </span>
                <span
                  style={{
                    color: '#9292a3',
                    fontWeight: 'normal',
                    fontSize: '12px',
                    lineHeight: '18px',
                    display: 'block',
                    marginBottom: '2px',
                  }}
                >
                  {passwordMessage}: {password}
                </span>
              </div>
            </td>
          </tr>
          {footerContact && (
            <tr
              style={{
                maxWidth: ' 70%',
              }}
            >
              <td>
                <span
                  style={{
                    fontSize: '10px',
                    lineHeight: '18px',
                    color: '#9292a3',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: text,
                  }}
                ></span>
              </td>
            </tr>
          )}
        </table>
      </CommonEmailPreview>
    </div>
  )
}

export default ConnectRegistrationEmailPreview
