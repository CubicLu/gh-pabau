import { Birthday, EmailSmsPreview } from '@pabau/ui'
import React, { FC, useContext } from 'react'
import CustomTemplate from '../../components/ClientNotification/CustomTemplate'
import { GlobalContext } from '../ClientNotification/Index'

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
  const { t } = useContext(GlobalContext)

  return (
    <div>
      {standardTapIndex === 'standard' ? (
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
