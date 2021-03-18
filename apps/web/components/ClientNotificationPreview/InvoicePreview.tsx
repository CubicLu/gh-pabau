import React, { FC, useEffect } from 'react'
import { EmailSmsPreview, Invoices } from '@pabau/ui'
import CustomTemplate from '../ClientNotification/CustomTemplate'
import { useTranslationI18 } from '../../hooks/useTranslationI18'

interface P {
  standardTapIndex: string
  backGroundColor?: string
  buttonColor?: string
  activeSocialIcons?: string[]
  selectLanguage?: string
  informationMessage?: string
}

const InvoicePreview: FC<P> = ({
  standardTapIndex,
  backGroundColor,
  buttonColor,
  activeSocialIcons,
  selectLanguage,
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
          greeting={t('notifications.invoice.greeting')}
          footerIconGroup={true}
          previewButtonGroup={false}
          previewCustomStatus={'email'}
          activeSocialIcons={activeSocialIcons}
          backGroundColor={backGroundColor}
          isFooterText={true}
          footerText={informationMessage}
          footer={activeSocialIcons.length > 0 || informationMessage.length > 0}
          buttonColor={buttonColor}
        >
          <Invoices
            message={t('notifications.invoice.message', {
              returnObjects: true,
            })}
            footerText={
              t('notifications.invoice.closingText') +
              ' <br> ' +
              t('notifications.invoice.signatureBlock')
            }
            showInvoiceButton={true}
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

export default InvoicePreview
