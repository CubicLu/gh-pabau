import { EmailSmsPreview, NoShowAppointment } from '@pabau/ui'
import React, { FC, useContext } from 'react'
import CustomTemplate from '../ClientNotification/CustomTemplate'
import { GlobalContext } from '../ClientNotification/Index'

interface P {
  standardTapIndex: string
  backGroundColor?: string
  buttonColor?: string
  activeSocialIcons?: string[]
  selectLanguage?: string
  informationMessage?: string
}

const NoShowAppointmentPreview: FC<P> = ({
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
          greeting={t('notifications.noShowAppointment.greeting')}
          subtitle={t('notifications.noShowAppointment.subTitle')}
          footerIconGroup={true}
          previewButtonGroup={false}
          previewCustomStatus={'email'}
          activeSocialIcons={activeSocialIcons}
          backGroundColor={backGroundColor}
          isFooterText={true}
          footerText={informationMessage}
          footer={activeSocialIcons.length > 0 || informationMessage.length > 0}
        >
          <NoShowAppointment
            message={t('notifications.noShowAppointment.message')}
            contactNumber={'+44 000 987 507'}
            footerContact={false}
            isFooterText={true}
            buttonColor={buttonColor}
            closingText={t('notifications.noShowAppointment.closingText')}
            signatureBlock={t('notifications.noShowAppointment.signatureBlock')}
            bookButtonName={t('notifications.noShowAppointment.bookButtonName')}
            buttonTitleMessage={t(
              'notifications.noShowAppointment.buttonTitleMessage'
            )}
            contactFirstHalfMsg={t(
              'notifications.noShowAppointment.contactFirstHalfMsg'
            )}
            contactSecondHalfMsg={t(
              'notifications.noShowAppointment.contactSecondHalfMsg'
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

export default NoShowAppointmentPreview
