import React, { FC, useContext } from 'react'
import { EmailSmsPreview, GiftVoucher } from '@pabau/ui'
import CustomTemplate from '../ClientNotification/CustomTemplate'
import { GlobalContext } from '../ClientNotification'

interface P {
  standardTapIndex: string
  backGroundColor?: string
  buttonColor?: string
  activeSocialIcons?: string[]
  selectLanguage?: string
  showService?: boolean
  showEmployeeName?: boolean
  informationMessage?: string
  type?: string
}

const GiftVoucherPreview: FC<P> = ({
  standardTapIndex,
  backGroundColor,
  activeSocialIcons,
  selectLanguage,
  buttonColor,
  informationMessage,
}) => {
  const { t } = useContext(GlobalContext)

  return (
    <div>
      {standardTapIndex === 'standard' ? (
        <EmailSmsPreview
          greeting={t('notifications.giftVoucher.greeting')}
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
          <GiftVoucher
            buttonColor={buttonColor}
            displayViewButton={true}
            buttonName={t('notifications.giftVoucher.buttonName')}
            valueMessage={t('notifications.giftVoucher.valueMessage')}
            voucherCodeMessage={t(
              'notifications.giftVoucher.voucherCodeMessage'
            )}
            expiryMessage={t('notifications.giftVoucher.expiryMessage')}
          />
        </EmailSmsPreview>
      ) : (
        <CustomTemplate
          backGroundColor={backGroundColor}
          selectLanguage={selectLanguage}
        />
      )}
    </div>
  )
}

export default GiftVoucherPreview
