import React, { FC } from 'react'
import CommonEmailPreview from './CommonEmailPreview'
import { EmailSMSPreviewProps, MedicalFormProps } from '@pabau/ui'

interface P {
  backGroundColor?: string
  buttonColor?: string
  activeSocialIcons?: string[]
  type?: string
}

const MedicalFormsEmailPreview: FC<
  P & MedicalFormProps & EmailSMSPreviewProps
> = ({
  backGroundColor,
  activeSocialIcons,
  type,
  greeting,
  footerText,
  message,
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
            <td style={{ paddingTop: '16px' }}>
              <span
                style={{
                  color: '#3d3d46',
                  fontWeight: 'normal',
                  fontSize: '13px',
                  lineHeight: '18px',
                }}
              >
                {message}
                {type === 'medical-forms' && (
                  <span style={{ color: '#00a1e1', paddingLeft: 5 }}>
                    +44 000 987 507
                  </span>
                )}
              </span>
            </td>
          </tr>
        </table>
      </CommonEmailPreview>
    </div>
  )
}

export default MedicalFormsEmailPreview
