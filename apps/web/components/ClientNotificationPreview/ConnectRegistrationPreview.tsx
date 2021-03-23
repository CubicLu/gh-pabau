import React, { FC, useEffect } from 'react'
import { EmailSmsPreview, ConnectRegistration } from '@pabau/ui'
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

const ConnectRegistrationPreview: FC<P> = ({
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
          greeting={t('notifications.connectRegistration.greeting')}
          footerIconGroup={true}
          previewButtonGroup={false}
          previewCustomStatus={'email'}
          activeSocialIcons={activeSocialIcons}
          backGroundColor={backGroundColor}
          isFooterText={true}
          footerText={informationMessage}
          footer={true}
          footerContact={true}
          contactEmail={'abc@info.com'}
          contactInfoNumber={'+98765432101'}
        >
          <ConnectRegistration
            message={t('notifications.connectRegistration.message')}
            connectURL={'URL://CONNECTURL'}
            username={'Sophia17'}
            password={'Sophia0193091'}
            footerContact={true}
            text={`${t(
              'notifications.connectRegistration.closingText'
            )}<br/>${t('notifications.connectRegistration.signatureBlock')}`}
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

export default ConnectRegistrationPreview
