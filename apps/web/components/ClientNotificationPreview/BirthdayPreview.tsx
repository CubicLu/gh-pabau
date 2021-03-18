import React, { FC, useEffect } from 'react'
import { EmailSmsPreview, Birthday } from '@pabau/ui'
import CustomTemplate from '../../components/ClientNotification/CustomTemplate'
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

const BirthdayPreview: FC<P> = ({
  standardTapIndex,
  backGroundColor,
  activeSocialIcons,
  selectLanguage,
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
          footerIconGroup={true}
          previewButtonGroup={false}
          previewCustomStatus={'email'}
          activeSocialIcons={activeSocialIcons}
          backGroundColor={backGroundColor}
          isFooterText={true}
          footerText={informationMessage}
          hideLogo={true}
          footer={activeSocialIcons.length > 0 || informationMessage.length > 0}
        >
          <Birthday
            wishingMessage={t('notifications.birthday.wishingMessage')}
            messages={t('notifications.birthday.messages', {
              returnObjects: true,
            })}
            closingText={t('notifications.birthday.closingText')}
            signatureBlock={t('notifications.birthday.signatureBlock')}
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

export default BirthdayPreview
