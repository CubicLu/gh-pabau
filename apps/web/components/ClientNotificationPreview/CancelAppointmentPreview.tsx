import React, { FC, useContext } from 'react'
import { EmailSmsPreview, CancelAClassBooking } from '@pabau/ui'
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

const CancelAppointmentPreview: FC<P> = ({
  standardTapIndex,
  backGroundColor,
  activeSocialIcons,
  selectLanguage,
  showEmployeeName,
  showService,
  buttonColor,
  informationMessage,
  type,
}) => {
  const { t } = useContext(GlobalContext)

  return (
    <div>
      {standardTapIndex === 'standard' ? (
        <EmailSmsPreview
          greeting={t('notifications.cancelledAppointment.greeting')}
          footerIconGroup={true}
          previewButtonGroup={false}
          previewCustomStatus={'email'}
          activeSocialIcons={activeSocialIcons}
          backGroundColor={backGroundColor}
          isFooterText={true}
          footerText={informationMessage}
          footer={activeSocialIcons.length > 0 || informationMessage.length > 0}
        >
          <CancelAClassBooking
            dateTime={t('notifications.cancelledAppointment.dateTime')}
            text={
              type === 'cancelClassBooking'
                ? t('notifications.cancelledAppointment.classText')
                : t('notifications.cancelledAppointment.text')
            }
            consultancyName={t('notifications.cancelledAppointment.title')}
            consultationDetail={
              showService
                ? showEmployeeName
                  ? `${t(
                      'notifications.cancelledAppointment.consultationDetail'
                    )}${t('notifications.cancelledAppointment.employee')}`
                  : `${t(
                      'notifications.cancelledAppointment.consultationDetail'
                    )}`
                : ''
            }
            address={t('notifications.cancelledAppointment.address')}
            message={t('notifications.cancelledAppointment.message')}
            buttonColor={buttonColor}
            cancelButtonName={t(
              'notifications.cancelledAppointment.cancelButtonName'
            )}
            rebookButtonName={t(
              'notifications.cancelledAppointment.rebookButtonName'
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

export default CancelAppointmentPreview
