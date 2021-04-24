import React, { FC } from 'react'
import CommonEmailPreview from './CommonEmailPreview'
import { Button, EmailSMSPreviewProps, RequestFeedbackProps } from '@pabau/ui'

interface P {
  backGroundColor?: string
  buttonColor?: string
  activeSocialIcons?: string[]
  selectLanguage?: string
  informationMessage?: string
  type?: string
}

const RequestFeedBackEmailPreview: FC<
  P & RequestFeedbackProps & EmailSMSPreviewProps
> = ({
  backGroundColor,
  activeSocialIcons,
  selectLanguage,
  buttonColor,
  informationMessage,
  type,
  greeting,
  buttonName,
  message,
  message1,
  closingText,
  signatureBlock,
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
        footer={activeSocialIcons.length > 0 || informationMessage.length > 0}
      >
        <table style={{ width: '100%', borderSpacing: '0' }}>
          <tr>
            <td style={{ paddingBottom: '10px', paddingTop: '16px' }}>
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
                {message1}
              </span>
            </td>
          </tr>
          {buttonName && (
            <tr style={{ textAlign: 'center' }}>
              <td style={{ paddingBottom: '16px' }}>
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
                    width: '174px',
                  }}
                >
                  {buttonName}
                </Button>
              </td>
            </tr>
          )}
          <tr>
            <td style={{ marginTop: '16px !important', maxWidth: '70%' }}>
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
        </table>
      </CommonEmailPreview>
    </div>
  )
}

export default RequestFeedBackEmailPreview
