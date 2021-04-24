import React, { FC } from 'react'
import { FooterProps } from '@pabau/ui'
import { setSocialIcon } from './utils'

export const CommonEmailFooter: FC<FooterProps> = ({
  iconGroup = true,
  contact = false,
  text,
  isFooterText = false,
  activeSocialIcons = [],
  contactInfoNumber,
  contactEmail,
  displayContactMessage = true,
  contactMessage = 'Or get in touch with us via Phone or Email:',
}) => {
  return (
    <>
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
      {contact && (
        <>
          {displayContactMessage && (
            <tr>
              <td style={{ textAlign: 'center' }}>
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
                  {contactMessage}
                </span>
              </td>
            </tr>
          )}
          <tr>
            <td style={{ textAlign: 'center' }}>
              <span style={{ color: '#00a1e1' }}>{contactInfoNumber}</span>
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center', paddingBottom: '25px' }}>
              <span style={{ color: '#00a1e1' }}>{contactEmail}</span>
            </td>
          </tr>
        </>
      )}
      {isFooterText && text !== '' && (
        <tr>
          <td>
            <span
              style={{
                whiteSpace: 'pre-line',
                fontSize: '10px',
                lineHeight: '18px',
                color: '#9292a3',
                maxWidth: '70%',
                margin: '0 auto',
              }}
              dangerouslySetInnerHTML={{ __html: text || '' }}
            ></span>
          </td>
        </tr>
      )}
      {iconGroup && (
        <tr>
          <td style={{ textAlign: 'center', paddingTop: '12px' }}>
            <div>
              {activeSocialIcons.map((value, index) => setSocialIcon(value))}
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

export default CommonEmailFooter
