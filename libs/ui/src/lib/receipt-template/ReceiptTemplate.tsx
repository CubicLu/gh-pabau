import React, { FC } from 'react'
import { Modal } from 'antd'
import styles from './ReceiptTemplate.module.less'

interface clinicDetails {
  key: number
  website: string
  email: string
  phone: number
  address: string
  country: string
  regCompanyNo: string
  regCompanyAddress: string
  account: string
  accountNumber: number
  sortCode: string
  bankName: string
  iban: string
  swift: string
}
interface receiptDetails {
  key: number
  receipt: string
  issuedTo: string
  issuedBy: string
  paymentDate: string
}
interface paymentDetails {
  key: number
  paymentId: string
  paymentTime: string
  totalPayment: number
  total: number
  card: number
  cash: number
  appliedToInvoice: number
}
export interface ReceiptTemplateProps {
  visible?: boolean
  logo: string
  title: string
  titleDescription: string
  clinicDetails: clinicDetails[]
  receiptDetails: receiptDetails[]
  paymentDetails: paymentDetails[]
  onCancel?: () => void
  onSubmit?: () => void
}

export const ReceiptTemplate: FC<ReceiptTemplateProps> = ({
  visible,
  title,
  logo,
  titleDescription,
  clinicDetails,
  receiptDetails,
  onCancel,
  paymentDetails,
}) => {
  const payment = { ...paymentDetails }
  return (
    <Modal
      visible={visible}
      footer={null}
      centered={true}
      className={styles.receiptTemplate}
      onCancel={() => onCancel?.()}
    >
      <div className={styles.mainLayout}>
        <div className={styles.header}>
          <div className={styles.headerLogo}>
            <img alt={title + '- logo image'} src={logo} />
          </div>
          <div className={styles.headerLabel}>
            <span className={styles.receiptText}>{title}</span>
            <span className={styles.headerText}>{titleDescription}</span>
          </div>
        </div>
        <div className={styles.mainBody}>
          <div className={styles.section1}>
            <div className={styles.left}>
              <span className={styles.fromText}>From</span>
              {clinicDetails?.map((clinicDetails) => {
                const {
                  website,
                  email,
                  phone,
                  address,
                  country,
                } = clinicDetails
                return (
                  <>
                    <span className={styles.section1Text}>{website}</span>
                    <span className={styles.section1Text}>{email}</span>
                    <span className={styles.section1Text}>{phone}</span>
                    <span className={styles.section1Text}>{address}</span>
                    <span className={styles.section1Text}>{country}</span>
                  </>
                )
              })}
            </div>
            {receiptDetails?.map((receiptDetails) => {
              const {
                key,
                receipt,
                issuedTo,
                issuedBy,
                paymentDate,
              } = receiptDetails
              return (
                <div className={styles.right} key={key}>
                  <div className={styles.rightInner}>
                    <div className={styles.inner}>
                      <span className={styles.headText}>{title}</span>
                      <span className={styles.infoText}>{receipt}</span>
                    </div>
                    <div className={styles.inner1}>
                      <span className={styles.headText}>Issued To</span>
                      <span className={styles.infoText}>{issuedTo}</span>
                    </div>
                  </div>
                  <div className={styles.rightInner}>
                    <div className={styles.inner}>
                      <span className={styles.headText}>Payment Date</span>
                      <span className={styles.infoText}>{paymentDate}</span>
                    </div>
                    <div className={styles.inner1}>
                      <span className={styles.headText}>Issued By</span>
                      <span className={styles.infoText}>{issuedBy}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className={styles.section2}>
            <div className={styles.section2Inner}>
              <div className={styles.left}>
                <div className={styles.rightInner}>
                  <div className={styles.inner}>
                    <span className={styles.headerText}>Payment</span>
                    <span className={styles.infoText}>
                      {payment[0].paymentTime}
                    </span>
                    <span className={styles.infoText}>
                      Card: £{payment[0].card.toFixed(2)}
                      <span className={styles.borderSpan}>|</span>
                      Cash: £{payment[0].cash.toFixed(2)}
                    </span>
                  </div>
                  <div className={styles.inner}>
                    <span className={styles.headerText}>Total</span>
                    <span className={styles.infoText}>
                      £{payment[0].total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.inner}>
                  <div className={styles.headerText}>Grand total</div>
                  <div className={styles.infoText}>
                    £{payment[0].totalPayment.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.section2Inner}>
              <div className={styles.left}>
                <div className={styles.rightInner}>
                  <div className={styles.inner}>
                    <span className={styles.headerText}>
                      Payments applied to invoices
                    </span>
                    <span className={styles.infoText}>
                      <span className={styles.link}>
                        {payment[0].paymentId}
                      </span>{' '}
                      £{payment[0].appliedToInvoice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {clinicDetails?.map((value) => {
            const {
              key,
              account,
              iban,
              regCompanyNo,
              accountNumber,
              swift,
              sortCode,
              address,
              bankName,
              regCompanyAddress,
            } = value
            return (
              <div className={styles.section3} key={key}>
                <div className={styles.section3Inner}>
                  <div className={styles.inner}>
                    <span className={styles.headText}>Bank account</span>
                    <span className={styles.infoText}>{account}</span>
                  </div>
                  <div className={styles.inner}>
                    <span className={styles.headText}>IBAN</span>
                    <span className={styles.infoText}>{iban}</span>
                  </div>
                  <div className={styles.inner}>
                    <span className={styles.headText}>Reg. company No</span>
                    <span className={styles.infoText}>{regCompanyNo}</span>
                  </div>
                </div>
                <div className={styles.section3Inner}>
                  <div className={styles.inner}>
                    <span className={styles.headText}>Account number</span>
                    <span className={styles.infoText}>{accountNumber}</span>
                  </div>
                  <div className={styles.inner}>
                    <span className={styles.headText}>Swift</span>
                    <span className={styles.infoText}>{swift}</span>
                  </div>
                </div>
                <div className={styles.section3Inner}>
                  <div className={styles.inner}>
                    <span className={styles.headText}>Sort Code</span>
                    <span className={styles.infoText}>{sortCode}</span>
                  </div>
                  <div className={styles.inner}>
                    <span className={styles.headText}>Address</span>
                    <span className={styles.infoText}>{address}</span>
                  </div>
                </div>
                <div className={styles.section3Inner}>
                  <div className={styles.inner}>
                    <span className={styles.headText}>Bank name</span>
                    <span className={styles.infoText}>{bankName}</span>
                  </div>
                  <div className={styles.inner}>
                    <span className={styles.headText}>
                      Reg. company address
                    </span>
                    <span className={styles.infoText}>{regCompanyAddress}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Modal>
  )
}

export default ReceiptTemplate
