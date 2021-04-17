import React, { FC } from 'react'
import { EmailSMSPreviewProps } from '@pabau/ui'
import CommonEmailFooter from './CommonEmailFooter'

export const CommonEmailPreview: FC<EmailSMSPreviewProps> = ({
  greeting,
  subtitle,
  children,
  footerContact,
  footerIconGroup,
  footerText,
  isFooterText,
  footer = true,
  isGiftVoucher = false,
  hideLogo = false,
  backGroundColor = '',
  contactEmail,
  contactInfoNumber,
  activeSocialIcons = ['facebook', 'whatsApp', 'instagram', 'twitter'],
  displayContactMessage = true,
  contactMessage,
}) => {
  const emailPreviewStyle = {
    backgroundColor: backGroundColor || '#fff',
    padding: '0 36px',
    fontFamily: 'Arial, Helvetica, sans-serif !important',
    fontSize: '13px',
    color: 'rgba(0, 0, 0, 0.65)',
    width: '375px',
    maxWidth: '375px',
    margin: '0 auto',
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.35)',
    border: '2px solid rgba(0,0,0,0.06)',
  }
  const giftVoucherStyle = {
    display: 'flex',
    position: 'relative',
    maxWidth: '800px',
    minWidth: '650px',
  }

  const styleWrapper = isGiftVoucher
    ? { ...emailPreviewStyle, ...giftVoucherStyle }
    : emailPreviewStyle

  return (
    <div>
      <div style={styleWrapper}>
        <table>
          {isGiftVoucher && (
            <div
              style={{
                flex: '1 225px',
                maxWidth: '220px',
                float: 'left',
                marginLeft: '-170px',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: '120px',
                  marginRight: '30px',
                }}
              >
                <img
                  style={{
                    height: '100% !important',
                    width: '100% !important',
                    transform: 'rotate(90deg)',
                  }}
                  width="0"
                  height="0"
                  src="https://s3-us-west-1.amazonaws.com/21ninety-media/images%2F1617095004035-1617095016921-Gift+Vouchers+Ribbon.png"
                  alt="ribbon"
                />
              </div>
            </div>
          )}
        </table>
        <table style={{ width: '100%', borderSpacing: '0' }}>
          {!hideLogo && (
            <>
              <tr>
                <td
                  style={{
                    paddingTop: '49px',
                    paddingBottom: '49px',
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  <img
                    src="https://seeklogo.com/images/N/normal-clinic-logo-190E3BCE57-seeklogo.com.png"
                    alt={'logo'}
                    width={'85px'}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <span
                    style={{
                      fontFamily: 'Arial, Helvetica, sans-serif',
                      fontSize: '20px',
                      lineHeight: '18px',
                      color: '#3d3d46',
                    }}
                  >
                    {greeting}
                  </span>
                </td>
              </tr>
            </>
          )}
          {subtitle !== '' && subtitle && (
            <tr>
              <td style={{ paddingBottom: '16px' }}>
                <span
                  style={{
                    color: '#9292a3',
                    fontWeight: 'normal',
                    fontSize: '12px',
                    lineHeight: '18px',
                  }}
                >
                  {subtitle}
                </span>
              </td>
            </tr>
          )}
          <tr>
            <td>{children}</td>
          </tr>
          {footer && (
            <CommonEmailFooter
              contact={footerContact}
              iconGroup={footerIconGroup}
              text={footerText}
              isFooterText={isFooterText}
              activeSocialIcons={activeSocialIcons}
              contactInfoNumber={contactInfoNumber}
              contactEmail={contactEmail}
              displayContactMessage={displayContactMessage}
              contactMessage={contactMessage}
            />
          )}
        </table>
      </div>
    </div>
  )
}

export default CommonEmailPreview
