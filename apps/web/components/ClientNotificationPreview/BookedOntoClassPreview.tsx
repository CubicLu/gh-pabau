import React, { FC, useEffect } from 'react'
import { EmailSmsPreview, BookedOntoClass } from '@pabau/ui'
import CustomTemplate from '../ClientNotification/CustomTemplate'
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
