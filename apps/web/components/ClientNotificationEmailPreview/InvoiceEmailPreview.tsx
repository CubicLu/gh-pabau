import React, { FC } from 'react'
import CommonEmailPreview from './CommonEmailPreview'
import { Button, EmailSMSPreviewProps, InvoicesProps } from '@pabau/ui'

interface P {
  backGroundColor?: string
  buttonColor?: string
  activeSocialIcons?: string[]
  selectLanguage?: string
  informationMessage?: string
  type?: string
  message?: string[]
  footerText?: string
  showInvoiceButton?: boolean
  bestRegards?: string
  senderFirstName?: string
  showEnablePay?: boolean
}

const InvoiceEmailPreview: FC<P & InvoicesProps & EmailSMSPreviewProps> = ({
  backGroundColor,
  activeSocialIcons,
  buttonColor,
  informationMessage,
  type,
  message,
  footerText,
  bestRegards,
  senderFirstName,
  showInvoiceButton = false,
  showEnablePay = false,
  greeting,
  viewButtonName,
  payButtonName,
}) => {
  return (
    <div>
      <CommonEmailPreview
        greeting={greeting}
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
        <table style={{ width: '100%', borderSpacing: '0', paddingBottom: 10 }}>
          <tr>
            <table style={{ paddingBottom: '16px', paddingTop: '16px' }}>
              {message?.map((msg, key) => {
                return (
                  <tr key={key}>
                    <td style={{ paddingBottom: '10px' }}>
                      <span
                        style={{
                          fontFamily: 'Arial',
                          fontStyle: 'normal',
                          fontWeight: 'normal',
                          fontSize: '12px',
                          lineHeight: '18px',
                          color: '#3d3d46',
                        }}
                      >
                        {msg}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </table>
          </tr>

          {showEnablePay && payButtonName && (
            <tr style={{ textAlign: 'center' }}>
              <td style={{ paddingBottom: '16px' }}>
                <Button
                  type="primary"
                  backgroundColor={buttonColor || '#00a1e1'}
                  style={{
                    borderRadius: '4px',
                    border: 'none',
                    color: '#ffffff',
                    fontWeight: 'normal',
                    fontSize: '12px',
                    lineHeight: '18px',
                    minWidth: '174px',
                    padding: '5px 0',
                    height: 'auto',
                    width: '174px',
                  }}
                >
                  {payButtonName}
                </Button>
              </td>
            </tr>
          )}
          {(bestRegards || senderFirstName) && (
            <tr style={{ marginTop: '16px !important', maxWidth: '70%' }}>
              <td style={{ paddingBottom: '16px' }}>
                <div
                  style={{
                    fontSize: '10px',
                    lineHeight: '18px',
                    color: '#9292a3',
                  }}
                >
                  {bestRegards}
                </div>
                <div
                  style={{
                    fontSize: '10px',
                    lineHeight: '18px',
                    color: '#9292a3',
                  }}
                >
                  {senderFirstName}
                </div>
              </td>
            </tr>
          )}
          {showInvoiceButton && viewButtonName && (
            <tr style={{ textAlign: 'center' }}>
              <td style={{ paddingBottom: '16px' }}>
                <Button
                  type="primary"
                  backgroundColor={buttonColor || '#00a1e1'}
                  style={{
                    borderRadius: '4px',
                    border: 'none',
                    color: '#ffffff',
                    fontWeight: 'normal',
                    fontSize: '12px',
                    lineHeight: '18px',
                    minWidth: '174px',
                    padding: '5px 0',
                    height: 'auto',
                    width: '174px',
                  }}
                >
                  {viewButtonName}
                </Button>
              </td>
            </tr>
          )}
          <tr style={{ marginTop: '16px !important', maxWidth: '70%' }}>
            <td>
              <span
                style={{
                  fontSize: '10px',
                  lineHeight: '18px',
                  color: '#9292a3',
                }}
                dangerouslySetInnerHTML={{ __html: footerText || '' }}
              ></span>
            </td>
          </tr>
        </table>
      </CommonEmailPreview>
    </div>
  )
}

export default InvoiceEmailPreview
