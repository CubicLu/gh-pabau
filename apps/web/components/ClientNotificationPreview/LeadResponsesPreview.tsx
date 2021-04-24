import React, { FC, useContext } from 'react'
import { EmailSmsPreview, LeadResponses } from '@pabau/ui'
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

const LeadResponsesPreview: FC<P> = ({
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
          greeting={t('notifications.leadResponses.greeting')}
          footerIconGroup={true}
          previewButtonGroup={false}
          previewCustomStatus={'email'}
          activeSocialIcons={activeSocialIcons}
          backGroundColor={backGroundColor}
          isFooterText={true}
          footerText={informationMessage}
          footer={activeSocialIcons.length > 0 || informationMessage.length > 0}
        >
          <LeadResponses
            message={t('notifications.leadResponses.message')}
            description={t('notifications.leadResponses.description')}
            messageLine={t('notifications.leadResponses.messageLine')}
            text={`${t('notifications.leadResponses.closingText')}<br/>${t(
              'notifications.leadResponses.signatureBlock'
            )}`}
            isFooterText={false}
            companyPhone={'+44 000 987 507'}
            companyEmail={'info@theclinic.com'}
            buttonColor={buttonColor}
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

export default LeadResponsesPreview
