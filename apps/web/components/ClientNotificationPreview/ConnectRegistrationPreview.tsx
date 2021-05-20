import { ConnectRegistration, EmailSmsPreview } from '@pabau/ui'
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

const ConnectRegistrationPreview: FC<P> = ({
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
          contactMessage={t('notifications.emailPreview.footer.contactMessage')}
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
            credentialMessage={t(
              'notifications.connectRegistration.credentialMessage'
            )}
            userNameMessage={t(
              'notifications.connectRegistration.userNameMessage'
            )}
            passwordMessage={t(
              'notifications.connectRegistration.passwordMessage'
            )}
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
