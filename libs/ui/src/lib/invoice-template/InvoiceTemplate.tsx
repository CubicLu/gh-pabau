import React, { FC } from 'react'
import { Modal } from 'antd'
import styles from './InvoiceTemplate.module.less'
import ClassNames from 'classnames'

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
interface invoiceDetails {
  key: number
  invoice: string
  issuedTo: string
  issuedBy: string
  date: string
}
interface paymentDetails {
  key: number
  totalVat: number
  amountPaid: number
  subTotalAmount: number
  outStanding: number
  grandTotal: number
  paymentTime: string
  total: number
  card: number
  cash: number
}
export interface InvoiceTemplateProps {
  visible?: boolean
  logo: string
  title: string
  titleDescription: string
  onCancel?: () => void
  onSubmit?: () => void
  data: string[]
  clinicDetails: clinicDetails[]
  invoiceDetails: invoiceDetails[]
  headersColumns: string[]
  paymentDetails: paymentDetails[]
}

export const InvoiceTemplate: FC<InvoiceTemplateProps> = ({
  visible,
  title,
  logo,
  titleDescription,
  clinicDetails,
  invoiceDetails,
  data,
  onCancel,
  headersColumns,
  paymentDetails,
}) => {
  const payment = { ...paymentDetails }
  return (
    <Modal
      visible={visible}
      footer={null}
      centered={true}
      className={styles.invoiceTemplate}
      onCancel={() => onCancel?.()}
    >
      <div className={styles.mainLayout}>
        <div className={styles.header}>
          <div className={styles.headerLogo}>
            <img alt={title + '- logo image'} src={logo} />
          </div>
          <div className={styles.headerLabel}>
            <span className={styles.invoiceText}>{title}</span>
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
            {invoiceDetails?.map((invoiceDetails) => {
              const { key, invoice, issuedBy, issuedTo, date } = invoiceDetails
              return (
                <div className={styles.right} key={key}>
                  <div className={styles.rightInner}>
                    <div className={styles.inner}>
                      <span className={styles.headText}>Invoice</span>
                      <span className={styles.infoText}>{invoice}</span>
                    </div>
                    <div className={styles.inner1}>
                      <span className={styles.headText}>Issued To</span>
                      <span className={styles.infoText}>{issuedTo}</span>
                    </div>
                  </div>
                  <div className={styles.rightInner}>
                    <div className={styles.inner}>
                      <span className={styles.headText}>Date</span>
                      <span className={styles.infoText}>{date}</span>
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
            <div className={styles.tableHeader}>
              {headersColumns?.map((value) => {
                return (
                  <span
                    className={
                      value.length > 6
                        ? ClassNames(styles.tableHeadertext, styles.t1)
                        : ClassNames(styles.tableHeadertext, styles.t2)
                    }
                    key={value}
                  >
                    {value}
                  </span>
                )
              })}
            </div>
            <div className={styles.tableBody}>
              {data?.map((value) => {
                return (
                  <span
                    className={
                      value.length > 10
                        ? ClassNames(styles.tableBodytext, styles.t1)
                        : ClassNames(styles.tableBodytext, styles.t2)
                    }
                    key={value}
                  >
                    {value}
                  </span>
                )
              })}
            </div>
          </div>
          <div className={styles.section3}>
            <div className={styles.section3Inner}>
              <div className={styles.left}>
                <div className={styles.rightInner}>
                  <div className={styles.inner}>
                    <span className={styles.headerText}>Total VAT</span>
                    <span className={styles.infoText}>
                      £{payment[0].totalVat.toFixed(2)}
                    </span>
                  </div>
                  <div className={styles.inner}>
                    <span className={styles.headerText}>Amount paid</span>
                    <span className={styles.infoText}>
                      £{payment[0].amountPaid.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className={styles.rightInner}>
                  <div className={styles.inner}>
                    <span className={styles.headerText}>
                      Sub – Total amount
                    </span>
                    <span className={styles.infoText}>
                      £{payment[0].subTotalAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className={styles.inner}>
                    <span className={styles.headerText}>Outstanding</span>
                    <span className={styles.infoText}>
                      £{payment[0].outStanding.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.inner}>
                  <div className={styles.headerText}>Grand total</div>
                  <div className={styles.infoText}>
                    £{payment[0].grandTotal.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.section3Inner}>
              <div className={styles.left}>
                <div className={styles.rightInner}>
                  <div className={styles.inner}>
                    <span className={styles.headerText}>Payment</span>
                    <span className={styles.infoText}>
                      {payment[0].paymentTime}
                    </span>
                  </div>
                  <div className={styles.inner}>
                    <span className={styles.headerText}>Total</span>
                    <span className={styles.infoText}>
                      £{payment[0].total.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className={styles.section3Links}>
                  <span className={styles.link}>
                    Card: £{payment[0].card.toFixed(2)}
                  </span>
                  <span className={styles.link}>
                    Cash: £{payment[0].cash.toFixed(2)}
                  </span>
                </div>
              </div>
              {payment[0].outStanding > 0.01 && (
                <div className={styles.right}>
                  <button className={styles.paywithCard}>Pay with card</button>
                </div>
              )}
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
              <div className={styles.section4} key={key}>
                <div className={styles.section4Inner}>
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
                <div className={styles.section4Inner}>
                  <div className={styles.inner}>
                    <span className={styles.headText}>Account number</span>
                    <span className={styles.infoText}>{accountNumber}</span>
                  </div>
                  <div className={styles.inner}>
                    <span className={styles.headText}>Swift</span>
                    <span className={styles.infoText}>{swift}</span>
                  </div>
                </div>
                <div className={styles.section4Inner}>
                  <div className={styles.inner}>
                    <span className={styles.headText}>Sort Code</span>
                    <span className={styles.infoText}>{sortCode}</span>
                  </div>
                  <div className={styles.inner}>
                    <span className={styles.headText}>Address</span>
                    <span className={styles.infoText}>{address}</span>
                  </div>
                </div>
                <div className={styles.section4Inner}>
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

export default InvoiceTemplate
