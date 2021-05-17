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

  const getData = () => {
    switch (type) {
      case 'prescription':
        return {
          userEmail: 'info@theclinic.com',
          userName: 'Anna',
          clinicName: 'Clinic',
        }
      case 'secureEmailTemplate':
        return {
          userEmail: 'info@theclinic.com',
          userName: 'Sophia',
          clinicName: 'Clinic',
        }
      case 'letters':
        return {
          userEmail: 'info@theclinic.com',
          userName: 'Sophia',
          clinicName: 'Clinic',
        }
      case 'labResults':
        return {
          userEmail: 'info@theclinic.com',
          userName: 'Anna',
          clinicName: 'Clinic',
        }
      default:
        return {
          userEmail: 'info@theclinic.com',
          userName: 'Carter',
          clinicName: 'Clinic',
        }
    }
  }

  const data = getData()

  return (
    <div>
      {standardTapIndex === 'standard' ? (
        <EmailSmsPreview
          greeting={t(`notifications.${type}.greeting`)}
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
            messageLine1={t(`notifications.${type}.messageLine1`)}
            messageLine2={t(`notifications.${type}.messageLine2`)}
            userEmail={data?.userEmail}
            userName={data?.userName}
            buttonName={t(`notifications.${type}.buttonName`)}
            clinicName={data?.clinicName}
            closingText={t(`notifications.${type}.closingText`)}
            signatureBlock={t(`notifications.${type}.signatureBlock`)}
            infoText={t(`notifications.${type}.infoText`)}
            buttonColor={buttonColor}
            fromMessage={t(`notifications.${type}.fromMessage`)}
            userMessage={t(`notifications.${type}.userMessage`)}
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
