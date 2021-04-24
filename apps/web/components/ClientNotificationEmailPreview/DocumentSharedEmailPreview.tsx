import React, { FC } from 'react'
import CommonEmailPreview from './CommonEmailPreview'
import { Button, DocumentSharedProps, EmailSMSPreviewProps } from '@pabau/ui'

interface P {
  backGroundColor?: string
  buttonColor?: string
  activeSocialIcons?: string[]
  selectLanguage?: string
  informationMessage?: string
  type?: string
  userEmail?: string
  userName?: string
  buttonName?: string
  clinicName?: string
}

const DocumentSharedEmailPreview: FC<
  P & DocumentSharedProps & EmailSMSPreviewProps
> = ({
  backGroundColor,
  activeSocialIcons,
  selectLanguage,
  buttonColor,
  informationMessage,
  type,
  userEmail,
  userName,
  buttonName,
  clinicName,
  greeting,
  messageLine1,
  messageLine2,
  closingText,
  signatureBlock,
  infoText,
  userMessage,
  fromMessage,
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
            <td style={{ paddingTop: '18px' }}>
              <div>
                <span
                  style={{
                    fontWeight: 'normal',
                    fontSize: '12px',
                    lineHeight: '18px',
                    color: '#3d3d46',
                  }}
                >
                  {messageLine1}
                </span>
              </div>
              <div style={{ paddingTop: '10px' }}>
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
                  {fromMessage}: {clinicName}
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
                  {userMessage}: {`${userName} (${userEmail})`}
                </span>
              </div>
            </td>
          </tr>
          <tr style={{ width: '100%' }}>
            <td style={{ paddingTop: 16, paddingBottom: 12 }}>
              <div>
                <span
                  style={{
                    fontWeight: 'normal',
                    fontSize: '12px',
                    lineHeight: '18px',
                    color: '#3d3d46',
                  }}
                >
                  {messageLine2}
                </span>
              </div>
              {buttonName && (
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
                      {buttonName}
                    </Button>
                  </td>
                </tr>
              )}
            </td>
          </tr>
          <tr
            style={{
              maxWidth: ' 70%',
            }}
          >
            <td style={{ paddingTop: 16 }}>
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
          <tr>
            <td style={{ paddingTop: 16, paddingBottom: 10 }}>
              <span
                style={{
                  fontSize: '10px',
                  lineHeight: '18px',
                  color: '#9292a3',
                }}
              >
                {infoText}
              </span>
            </td>
          </tr>
        </table>
      </CommonEmailPreview>
    </div>
  )
}

export default DocumentSharedEmailPreview
