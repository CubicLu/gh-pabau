import React, { FC, useEffect } from 'react'
import { EmailSmsPreview, MedicalForm } from '@pabau/ui'
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
  type?: string
}

const MedicalFormsPreview: FC<P> = ({
  standardTapIndex,
  backGroundColor,
  activeSocialIcons,
  selectLanguage,
  buttonColor,
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
          greeting={t('notifications.medicalForm.greeting')}
          footerIconGroup={true}
          previewButtonGroup={false}
          previewCustomStatus={'email'}
          activeSocialIcons={activeSocialIcons}
          backGroundColor={backGroundColor}
          isFooterText={true}
          footerText={
            t('notifications.medicalForm.closingText') +
            ' <br> ' +
            t('notifications.medicalForm.signatureBlock')
          }
        >
          <MedicalForm
            message={
              type === 'clinic-emailing-timeline'
                ? t('notifications.medicalForm.clinicEmailingMessage')
                : type === 'emailAppointment'
                ? t('notifications.medicalForm.emailAppointmentMessage')
                : t('notifications.medicalForm.message')
            }
            buttonColor={buttonColor}
            contactNumber={type === 'medical-forms' && '+44 000 987 507'}
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

export default MedicalFormsPreview
