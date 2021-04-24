import React, { FC } from 'react'
import CommonEmailPreview from './CommonEmailPreview'
import { BirthDayPreviewProps, EmailSMSPreviewProps } from '@pabau/ui'

interface P {
  backGroundColor?: string
  buttonColor?: string
  activeSocialIcons?: string[]
  selectLanguage?: string
  informationMessage?: string
  type?: string
  messages?: string[]
}

const BirthdayEmailPreview: FC<
  P & BirthDayPreviewProps & EmailSMSPreviewProps
> = ({
  backGroundColor,
  activeSocialIcons,
  informationMessage,
  type,
  messages,
  wishingMessage,
  closingText,
  signatureBlock,
}) => {
  return (
    <div>
      <CommonEmailPreview
        footerIconGroup={true}
        previewButtonGroup={false}
        previewCustomStatus={'email'}
        activeSocialIcons={activeSocialIcons}
        backGroundColor={backGroundColor}
        isFooterText={true}
        footerText={informationMessage}
        hideLogo={true}
        footer={activeSocialIcons?.length > 0 || informationMessage?.length > 0}
      >
        <table style={{ width: '100%', borderSpacing: '0' }}>
          <tr>
            <td
              style={{
                textAlign: 'center',
                paddingBottom: '16px',
              }}
            >
              <span
                style={{
                  fontSize: '30px',
                  fontFamily: 'sans-serif',
                  color: '#6f7577',
                }}
              >
                {wishingMessage}
              </span>
            </td>
          </tr>
          <tr>
            <td
              style={{
                textAlign: 'center',
                width: '100%',
                paddingBottom: '30px',
              }}
            >
              <img
                width="128px"
                height="128px"
                src={
                  'https://icons.iconarchive.com/icons/tooschee/misc/256/Present-icon.png'
                }
                alt={'gift'}
              ></img>
            </td>
          </tr>
          {messages?.map((msg, key) => {
            return (
              <tr key={key}>
                <td style={{ paddingBottom: '10px' }}>
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
                    {msg}
                  </span>
                </td>
              </tr>
            )
          })}
          <tr>
            <td
              style={{
                maxWidth: ' 70%',
              }}
            >
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

export default BirthdayEmailPreview
