import React, { FC, useContext } from 'react'
import { EmailSmsPreview, Invoices } from '@pabau/ui'
import CustomTemplate from '../ClientNotification/CustomTemplate'
import { GlobalContext } from '../ClientNotification'

interface P {
  standardTapIndex: string
  backGroundColor?: string
  buttonColor?: string
  activeSocialIcons?: string[]
  selectLanguage?: string
  informationMessage?: string
  type?: string
  showEnablePay?: boolean
}

const OutstandingInvoicePreview: FC<P> = ({
  standardTapIndex,
  backGroundColor,
  buttonColor,
  activeSocialIcons,
  selectLanguage,
  informationMessage,
  showEnablePay,
}) => {
  const { t } = useContext(GlobalContext)

  return (
    <div>
      {standardTapIndex === 'standard' ? (
        <EmailSmsPreview
          greeting={t('notifications.invoice.outstanding.greeting')}
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
            message={t('notifications.invoice.outstanding.message', {
              returnObjects: true,
            })}
            bestRegards={t('notifications.invoice.outstanding.bestRegards')}
            footerText={
              t('notifications.invoice.outstanding.footerText') +
              ' <br> ' +
              t('notifications.invoice.outstanding.footerText2')
            }
            senderFirstName={t(
              'notifications.invoice.outstanding.senderFirstName'
            )}
            showInvoiceButton={false}
            buttonColor={buttonColor}
            showEnablePay={showEnablePay}
            payButtonName={t('notifications.invoice.outstanding.payButtonName')}
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

export default OutstandingInvoicePreview
