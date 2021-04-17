import React, { FC } from 'react'
import CommonEmailPreview from './CommonEmailPreview'
import { EmailSMSPreviewProps, LeadResponsesProps } from '@pabau/ui'

interface P {
  backGroundColor?: string
  buttonColor?: string
  activeSocialIcons?: string[]
  selectLanguage?: string
  informationMessage?: string
  type?: string
  isFooterText?: boolean
  companyEmail?: string
  companyPhone?: string
}

const LeadResponsesEmailPreview: FC<
  P & LeadResponsesProps & EmailSMSPreviewProps
> = ({
  backGroundColor,
  activeSocialIcons,
  informationMessage,
  type,
  isFooterText,
  companyEmail,
  companyPhone,
  greeting,
  message,
  description,
  messageLine,
  text,
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
        <table style={{ width: '100%', borderSpacing: '0', paddingBottom: 10 }}>
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
                {messageLine}
              </span>
            </td>
          </tr>
          {!isFooterText && (
            <tr style={{ marginTop: '16px !important', maxWidth: '70%' }}>
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
          {companyPhone && (
            <tr style={{ textAlign: 'center' }}>
              <td>
                <span style={{ color: '#00a1e1' }}>{companyPhone}</span>
              </td>
            </tr>
          )}
          {companyEmail && (
            <tr>
              <td style={{ textAlign: 'center' }}>
                <span style={{ color: '#00a1e1' }}>{companyEmail}</span>
              </td>
            </tr>
          )}
        </table>
      </CommonEmailPreview>
    </div>
  )
}

export default LeadResponsesEmailPreview
