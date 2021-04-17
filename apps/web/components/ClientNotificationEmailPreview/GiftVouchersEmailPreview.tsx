import React, { FC } from 'react'
import CommonEmailPreview from './CommonEmailPreview'
import { Button, EmailSMSPreviewProps, GiftVoucherProps } from '@pabau/ui'

interface P {
  backGroundColor?: string
  buttonColor?: string
  activeSocialIcons?: string[]
  selectLanguage?: string
  informationMessage?: string
  type?: string
  value?: string
  voucherCode?: string
  expiry?: string
  consultancyName?: string
  displayViewButton?: boolean
}

const GiftVouchersEmailPreview: FC<
  P & GiftVoucherProps & EmailSMSPreviewProps
> = ({
  backGroundColor,
  activeSocialIcons,
  selectLanguage,
  buttonColor,
  informationMessage,
  type,
  value,
  voucherCode,
  expiry,
  consultancyName,
  displayViewButton = false,
  greeting,
  buttonName,
  consultancyDetailMessage = 'This Voucher can be redeemed against any services at',
  valueMessage,
  voucherCodeMessage,
  expiryMessage,
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
        footer={true}
        isGiftVoucher={true}
        displayContactMessage={false}
        footerContact={true}
        contactInfoNumber={'+44 000 987 507'}
        contactEmail={'info@theclinic.com'}
      >
        <table style={{ width: '100%', borderSpacing: '0' }}>
          {value && (
            <tr>
              <td style={{ paddingBottom: '10px' }}>
                <span style={{ color: '#00a1e1' }}>
                  {valueMessage}:&nbsp;{value}
                </span>
              </td>
            </tr>
          )}
          {voucherCode && (
            <tr>
              <td style={{ paddingBottom: '10px' }}>
                <span style={{ color: '#00a1e1' }}>
                  {voucherCodeMessage}:&nbsp;{voucherCode}
                </span>
              </td>
            </tr>
          )}
          {expiry && (
            <tr>
              <td style={{ paddingBottom: '10px' }}>
                <span style={{ color: '#00a1e1' }}>
                  {expiryMessage} :&nbsp;{expiry}
                </span>
              </td>
            </tr>
          )}
          {consultancyName && (
            <tr>
              <td style={{ paddingBottom: '10px' }}>
                {consultancyDetailMessage}&nbsp;
                {consultancyName}
              </td>
            </tr>
          )}
          {displayViewButton && buttonName && (
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
        </table>
      </CommonEmailPreview>
    </div>
  )
}

export default GiftVouchersEmailPreview
