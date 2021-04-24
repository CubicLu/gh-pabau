import React, { FC, useContext } from 'react'
import { EmailSmsPreview, ClassesSpotAvailable } from '@pabau/ui'
import CustomTemplate from '../../components/ClientNotification/CustomTemplate'
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

const ClassSpotAvailablePreview: FC<P> = ({
  standardTapIndex,
  backGroundColor,
  activeSocialIcons,
  selectLanguage,
  buttonColor,
  informationMessage,
  type,
}) => {
  const { t } = useContext(GlobalContext)

  return (
    <div>
      {standardTapIndex === 'standard' ? (
        <EmailSmsPreview
          greeting={t('notifications.classSpotAvailable.greeting')}
          footerIconGroup={true}
          previewButtonGroup={false}
          previewCustomStatus={'email'}
          activeSocialIcons={activeSocialIcons}
          backGroundColor={backGroundColor}
          isFooterText={true}
          footerText={`${t(
            'notifications.classSpotAvailable.closingText'
          )}<br/>${t('notifications.classSpotAvailable.signatureBlock')}`}
          footer={true}
          footerContact={true}
          contactEmail={'abc@info.com'}
          contactInfoNumber={'+98765432101'}
          contactMessage={t('notifications.emailPreview.footer.contactMessage')}
        >
          <ClassesSpotAvailable
            message={t('notifications.classSpotAvailable.message')}
            buttonColor={buttonColor}
            buttonTitleMessage={t(
              'notifications.classSpotAvailable.buttonTitleMessage'
            )}
            bookButtonName={t(
              'notifications.classSpotAvailable.bookButtonName'
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

export default ClassSpotAvailablePreview
