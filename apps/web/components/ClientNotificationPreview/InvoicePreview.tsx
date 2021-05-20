import { EmailSmsPreview, Invoices } from '@pabau/ui'
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

const InvoicePreview: FC<P> = ({
  standardTapIndex,
  backGroundColor,
  buttonColor,
  activeSocialIcons,
  selectLanguage,
  informationMessage,
}) => {
  const { t } = useContext(GlobalContext)

  return (
    <div>
      {standardTapIndex === 'standard' ? (
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
            viewButtonName={t('notifications.invoice.viewButtonName')}
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
