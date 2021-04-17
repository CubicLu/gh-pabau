import React, { FC } from 'react'
import CommonEmailPreview from './CommonEmailPreview'
import { Button, EmailSMSPreviewProps, ReferralProps } from '@pabau/ui'

interface P {
  backGroundColor?: string
  buttonColor?: string
  activeSocialIcons?: string[]
  selectLanguage?: string
  informationMessage?: string
  type?: string
}

const ReferralEmailPreview: FC<P & ReferralProps & EmailSMSPreviewProps> = ({
  backGroundColor,
  activeSocialIcons,
  selectLanguage,
  buttonColor,
  informationMessage,
  type,
  greeting,
  message,
  description,
  buttonName,
  footerText,
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
                {description}
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
          <tr style={{ marginTop: '16px !important', maxWidth: '70%' }}>
            <td>
              <span
                style={{
                  fontSize: '10px',
                  lineHeight: '18px',
                  color: '#9292a3',
                }}
                dangerouslySetInnerHTML={{
                  __html: footerText,
                }}
              ></span>
            </td>
          </tr>
        </table>
      </CommonEmailPreview>
    </div>
  )
}

export default ReferralEmailPreview
