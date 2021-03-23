import React, { FC, useEffect } from 'react'
import { EmailSmsPreview, CancelAClassBooking } from '@pabau/ui'
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
