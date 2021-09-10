import React, { FC } from 'react'
import CommonEmailPreview from './CommonEmailPreview'
import { Button, ClassWaitListProps, EmailSMSPreviewProps } from '@pabau/ui'

interface P {
  backGroundColor?: string
  buttonColor?: string
  activeSocialIcons?: string[]
  selectLanguage?: string
  type?: string
}

const WaitListEmailPreview: FC<P & ClassWaitListProps & EmailSMSPreviewProps> =
  ({
    backGroundColor,
    activeSocialIcons,
    selectLanguage,
    buttonColor,
    type,
    greeting,
    message,
    footerText,
    buttonTitleMessage,
    buttonName,
    contactMessage,
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
          footerText={footerText}
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
              <td style={{ textAlign: 'center', paddingBottom: '10px' }}>
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
            {buttonName && (
              <tr style={{ textAlign: 'center' }}>
                <td>
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
          </table>
        </CommonEmailPreview>
      </div>
    )
  }

export default WaitListEmailPreview
