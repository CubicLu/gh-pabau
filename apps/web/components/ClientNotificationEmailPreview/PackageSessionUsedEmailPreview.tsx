import React, { FC } from 'react'
import CommonEmailPreview from './CommonEmailPreview'
import { Button, EmailSMSPreviewProps, PackageSessionProps } from '@pabau/ui'

interface P {
  backGroundColor?: string
  buttonColor?: string
  activeSocialIcons?: string[]
  selectLanguage?: string
  type?: string
}

const PackageSessionUsedEmailPreview: FC<
  P & PackageSessionProps & EmailSMSPreviewProps
> = ({
  backGroundColor,
  activeSocialIcons,
  selectLanguage,
  buttonColor,
  type,
  greeting,
  message,
  footerText,
  buttonName,
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
      >
        <table style={{ width: '100%', borderSpacing: '0' }}>
          <tr>
            <td
              style={{
                paddingBottom: 16,
                paddingTop: 16,
              }}
            >
              <span
                style={{
                  color: ' #3d3d46',
                  fontWeight: 'normal',
                  fontSize: '13px',
                  lineHeight: '18px',
                }}
              >
                {message}
              </span>
            </td>
            {buttonName && (
              <tr>
                <td style={{ textAlign: 'center' }}>
                  <Button
                    type={'primary'}
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
          </tr>
        </table>
      </CommonEmailPreview>
    </div>
  )
}

export default PackageSessionUsedEmailPreview
