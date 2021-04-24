import React, { FC, useContext } from 'react'
import { EmailSmsPreview, DocumentShared } from '@pabau/ui'
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

const DocumentSharedPreview: FC<P> = ({
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
          greeting={t('notifications.documnetshared.greeting')}
          footerIconGroup={true}
          previewButtonGroup={false}
          previewCustomStatus={'email'}
          activeSocialIcons={activeSocialIcons}
          backGroundColor={backGroundColor}
          isFooterText={true}
          footerText={informationMessage}
          footer={activeSocialIcons.length > 0 || informationMessage.length > 0}
        >
          <DocumentShared
            messageLine1={t('notifications.documnetshared.messageLine1')}
            messageLine2={t('notifications.documnetshared.messageLine2')}
            userEmail={'info@theclinic.com'}
            userName={'Sophia'}
            buttonName={t('notifications.documnetshared.buttonName')}
            clinicName={'Clinic'}
            closingText={t('notifications.documnetshared.closingText')}
            signatureBlock={t('notifications.documnetshared.signatureBlock')}
            infoText={t('notifications.documnetshared.infoText')}
            buttonColor={buttonColor}
            fromMessage={t('notifications.documentshared.fromMessage')}
            userMessage={t('notifications.documentshared.userMessage')}
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

export default DocumentSharedPreview
