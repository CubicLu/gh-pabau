import React, { FC } from 'react'
import { Modal } from 'antd'
import styles from './StatementTemplate.module.less'
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
interface statementDetails {
  key: number
  statementInvoice: string
  issuedTo: string
  issuedBy: string
  statementDate: string
  statementPeriodFrom: string
  statementPeriodTo: string
}
interface paymentDetails {
  key: number
  totalVat: number
  amountPaid: number
  subTotalAmount: number
  outStanding: number
  totalInvoiced: number
}
export interface StatementTemplateProps {
  visible?: boolean
  logo: string
  title: string
  titleDescription: string
  onCancel?: () => void
  onSubmit?: () => void
  data?: Array<[]>
  clinicDetails: clinicDetails[]
  statementDetails: statementDetails[]
  headersColumns: string[]
  paymentDetails: paymentDetails[]
}

export const StatementTemplate: FC<StatementTemplateProps> = ({
  visible,
  title,
  logo,
  titleDescription,
  clinicDetails,
  statementDetails,
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
            {statementDetails?.map((statementDetails) => {
              const {
                key,
                statementInvoice,
                issuedTo,
                statementDate,
                issuedBy,
                statementPeriodFrom,
                statementPeriodTo,
              } = statementDetails
              return (
                <div className={styles.right} key={key}>
                  <div className={styles.rightInner}>
                    <div className={styles.inner}>
                      <span className={styles.headText}>Statment Invoice</span>
                      <span className={styles.infoText}>
                        {statementInvoice}
                      </span>
                    </div>
                    <div className={styles.inner1}>
                      <span className={styles.headText}>Issued To</span>
                      <span className={styles.infoText}>{issuedTo}</span>
                    </div>
                  </div>
                  <div className={styles.rightInner}>
                    <div className={styles.inner}>
                      <span className={styles.headText}>Statment Date</span>
                      <span className={styles.infoText}>{statementDate}</span>
                    </div>
                    <div className={styles.inner1}>
                      <span className={styles.headText}>Issued By</span>
                      <span className={styles.infoText}>{issuedBy}</span>
                    </div>
                  </div>
                  <div className={styles.rightInner}>
                    <div className={styles.inner}>
                      <span className={styles.headText}>Statement Period</span>
                      <span className={styles.infoText}>
                        {statementPeriodFrom}-{statementPeriodTo}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className={styles.section2}>
            <div className={styles.tableHeader}>
              {headersColumns?.map((value, index) => {
                return (
                  <span
                    className={ClassNames(styles.tableHeadertext, styles.t2)}
                    key={value}
                  >
                    {value}
                  </span>
                )
              })}
            </div>
            {data?.map((value) => {
              return (
                <div className={styles.tableBody} key={title}>
                  {
                    value?.map((row) => {
                      return (
                        <span
                          className={ClassNames(
                            styles.tableBodytext,
                            styles.t2
                          )}
                          key={row}
                        >
                          {row}
                        </span>
                      )
                    }) as []
                  }{' '}
                </div>
              )
            })}
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
                  <div className={styles.headerText}>Total Invoiced</div>
                  <div className={styles.infoText}>
                    £{payment[0].totalInvoiced.toFixed(2)}
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
              <div className={styles.section4} key={key}>
                <div className={styles.section4Inner}>
                  <div className={styles.inner}>
                    <span className={styles.headText}>Bank account</span>
                    <span className={styles.infoText}>{account}</span>
                  </div>
                  <div className={styles.inner}>
                    <span className={styles.headText}>Bank name</span>
                    <span className={styles.infoText}>{bankName}</span>
                  </div>
                  <div className={styles.inner}>
                    <span className={styles.headText}>Address</span>
                    <span className={styles.infoText}>{address}</span>
                  </div>
                </div>
                <div className={styles.section4Inner}>
                  <div className={styles.inner}>
                    <span className={styles.headText}>Account number</span>
                    <span className={styles.infoText}>{accountNumber}</span>
                  </div>
                  <div className={styles.inner}>
                    <span className={styles.headText}>IBAN</span>
                    <span className={styles.infoText}>{iban}</span>
                  </div>
                  <div className={styles.inner}>
                    <span className={styles.headText}>
                      Reg. company address
                    </span>
                    <span className={styles.infoText}>{regCompanyAddress}</span>
                  </div>
                </div>
                <div className={styles.section4Inner}>
                  <div className={styles.inner}>
                    <span className={styles.headText}>Sort Code</span>
                    <span className={styles.infoText}>{sortCode}</span>
                  </div>
                  <div className={styles.inner}>
                    <span className={styles.headText}>Swift</span>
                    <span className={styles.infoText}>{swift}</span>
                  </div>
                  <div className={styles.inner}>
                    <span className={styles.headText}>Reg. company No</span>
                    <span className={styles.infoText}>{regCompanyNo}</span>
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

export default StatementTemplate
