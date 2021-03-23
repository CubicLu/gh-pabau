import React, { FC, useEffect } from 'react'
import { EmailSmsPreview, Referral } from '@pabau/ui'
import CustomTemplate from '../ClientNotification/CustomTemplate'
import { useTranslationI18 } from '../../hooks/useTranslationI18'

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

const ReferralPreview: FC<P> = ({
  standardTapIndex,
  backGroundColor,
  activeSocialIcons,
  selectLanguage,
  buttonColor,
  informationMessage,
}) => {
  const { t, i18n } = useTranslationI18()
  useEffect(() => {
    const lanCode = selectLanguage.toLowerCase()
      ? selectLanguage.toLowerCase()
      : 'en'
    i18n.changeLanguage(lanCode)
  }, [i18n, selectLanguage])

  return (
    <div>
      {standardTapIndex === '1' ? (
        <EmailSmsPreview
          greeting={t('notifications.referrals.greeting')}
          footerIconGroup={true}
          previewButtonGroup={false}
          previewCustomStatus={'email'}
          activeSocialIcons={activeSocialIcons}
          backGroundColor={backGroundColor}
          isFooterText={true}
          footerText={informationMessage}
          footer={activeSocialIcons.length > 0 || informationMessage.length > 0}
        >
          <Referral
            message={t('notifications.referrals.message')}
            buttonColor={buttonColor}
            description={t('notifications.referrals.description')}
            footerText={`${t('notifications.referrals.closingText')}<br/>${t(
              'notifications.referrals.signatureBlock'
            )}`}
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

export default ReferralPreview
