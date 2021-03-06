import { BookedOntoClass, EmailSmsPreview } from '@pabau/ui'
import React, { FC, useContext } from 'react'
import CustomTemplate from '../ClientNotification/CustomTemplate'
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

const BookedOntoClassPreview: FC<P> = ({
  standardTapIndex,
  backGroundColor,
  activeSocialIcons,
  selectLanguage,
  showEmployeeName,
  showService,
  buttonColor,
  informationMessage,
}) => {
  const { t } = useContext(GlobalContext)

  return (
    <div>
      {standardTapIndex === 'standard' ? (
        <EmailSmsPreview
          greeting={t('notifications.bookedOntoClass.greeting')}
          footerIconGroup={true}
          previewButtonGroup={false}
          previewCustomStatus={'email'}
          activeSocialIcons={activeSocialIcons}
          backGroundColor={backGroundColor}
          isFooterText={true}
          footerText={informationMessage}
          footer={activeSocialIcons.length > 0 || informationMessage.length > 0}
        >
          <BookedOntoClass
            dateTime={t('notifications.bookedOntoClass.dateTime')}
            consultancyName={t('notifications.bookedOntoClass.title')}
            consultationDetail={
              showService
                ? showEmployeeName
                  ? `${t(
                      'notifications.bookedOntoClass.consultationDetail'
                    )}${t('notifications.bookedOntoClass.employee')}`
                  : `${t('notifications.bookedOntoClass.consultationDetail')}`
                : ''
            }
            address={t('notifications.bookedOntoClass.address')}
            message={t('notifications.bookedOntoClass.message')}
            buttonColor={buttonColor}
            appointmentDetailMessage={t(
              'notifications.bookedOntoClass.appointmentDetailMessage'
            )}
            regards={t('notifications.bookedOntoClass.regards')}
            regardsName={t('notifications.bookedOntoClass.regardsName')}
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

export default BookedOntoClassPreview
