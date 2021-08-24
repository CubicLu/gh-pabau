import React, { FC } from 'react'
import { Modal, Table } from 'antd'
import styles from './StatementTemplate.module.less'
import { ICol, salesData, ITotals } from '@pabau/ui'
import { useTranslation } from 'react-i18next'

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
  outstanding: number
  grandTotal: number
  refundAmount: number
  paid: number
  totalNet: number
}
export interface StatementTemplateProps {
  visible?: boolean
  logo: string
  title: string
  titleDescription: string
  onCancel?: () => void
  columns?: ICol[]
  salesData?: salesData[]
  clinicDetails: clinicDetails[]
  statementDetails?: statementDetails[]
  paymentDetails?: paymentDetails[]
  totals?: ITotals
}

export const StatementTemplate: FC<StatementTemplateProps> = ({
  visible,
  title,
  logo,
  titleDescription,
  clinicDetails,
  statementDetails,
  columns,
  salesData,
  onCancel,
  totals,
  paymentDetails,
}) => {
  const payment = { ...paymentDetails }
  const { t } = useTranslation('common')
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
              <span className={styles.fromText}>
                {' '}
                {t('invoice.label.name.from')}
              </span>
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
                    {statementInvoice && (
                      <div className={styles.inner}>
                        <span className={styles.headText}>
                          {t('statement.invoice.label')}
                        </span>
                        <span className={styles.infoText}>
                          {statementInvoice}
                        </span>
                      </div>
                    )}
                    {issuedTo && (
                      <div className={styles.inner1}>
                        <span className={styles.headText}>
                          {t('invoice.issue.to.label')}
                        </span>
                        <span className={styles.infoText}>{issuedTo}</span>
                      </div>
                    )}
                  </div>
                  <div className={styles.rightInner}>
                    {statementDate && (
                      <div className={styles.inner}>
                        <span className={styles.headText}>
                          {t('statement.invoice.date.label')}
                        </span>
                        <span className={styles.infoText}>
                          {new Date(statementDate).toLocaleDateString('en-GB')}
                        </span>
                      </div>
                    )}
                    {issuedBy && (
                      <div className={styles.inner1}>
                        <span className={styles.headText}>
                          {t('invoice.issue.by.label')}
                        </span>
                        <span className={styles.infoText}>{issuedBy}</span>
                      </div>
                    )}
                  </div>
                  <div className={styles.rightInner}>
                    {statementPeriodFrom && statementPeriodTo && (
                      <div className={styles.inner}>
                        <span className={styles.headText}>
                          {t('statement.period.label')}
                        </span>
                        <span className={styles.infoText}>
                          {statementPeriodFrom}-{statementPeriodTo}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
          <div className={styles.tableData}>
            <Table
              columns={columns}
              dataSource={salesData?.map((item) => {
                return {
                  ...item,
                  date: new Date(item?.date).toLocaleDateString('en-GB'),
                }
              })}
              pagination={false}
            />
          </div>
          <div className={styles.section3}>
            <div className={styles.section3Inner}>
              <div className={styles.left}>
                <div className={styles.rightInner}>
                  {totals?.vat.enabled === 1 && (
                    <div className={styles.inner}>
                      <span className={styles.headerText}>
                        {totals?.vat.label}
                      </span>
                      <span className={styles.infoText}>
                        {'£' +
                          (payment[0].totalVat !== undefined
                            ? payment[0].totalVat
                            : '0.00')}
                      </span>
                    </div>
                  )}
                  {totals?.amount_paid.enabled === 1 && (
                    <div className={styles.inner}>
                      <span className={styles.headerText}>
                        {totals?.amount_paid.label}
                      </span>
                      <span className={styles.infoText}>
                        {'£' +
                          (payment[0]?.amountPaid !== undefined
                            ? payment[0]?.amountPaid
                            : '0.00')}
                      </span>
                    </div>
                  )}
                  {totals?.total_net.enabled === 1 && (
                    <div className={styles.inner}>
                      <span className={styles.headerText}>
                        {totals?.total_net.label}
                      </span>
                      <span className={styles.infoText}>
                        {'£' +
                          (payment[0].totalNet !== undefined
                            ? payment[0].totalNet
                            : '0.00')}
                      </span>
                    </div>
                  )}
                </div>
                <div className={styles.rightInner}>
                  {totals?.sub_total.enabled === 1 && (
                    <div className={styles.inner}>
                      <span className={styles.headerText}>
                        {totals?.sub_total.label}
                      </span>
                      <span className={styles.infoText}>
                        {'£' +
                          (payment[0].subTotalAmount !== undefined
                            ? payment[0].subTotalAmount
                            : '0.00')}
                      </span>
                    </div>
                  )}
                  {totals?.outstanding_balance.enabled === 1 && (
                    <div className={styles.inner}>
                      <span className={styles.headerText}>
                        {totals?.outstanding_balance.label}
                      </span>
                      <span className={styles.infoText}>
                        {'£' +
                          (payment[0].outstanding !== undefined
                            ? payment[0].outstanding
                            : '0.00')}
                      </span>
                    </div>
                  )}
                  {totals?.refund_amount.enabled === 1 && (
                    <div className={styles.inner}>
                      <span className={styles.headerText}>
                        {totals?.refund_amount.label}
                      </span>
                      <span className={styles.infoText}>
                        {'£' +
                          (payment[0].refundAmount !== undefined
                            ? payment[0].refundAmount
                            : '0.00')}
                      </span>
                    </div>
                  )}
                </div>
                <div className={styles.rightInner}>
                  {totals?.paid.enabled === 1 && (
                    <div className={styles.inner}>
                      <span className={styles.headerText}>
                        {totals?.paid.label}
                      </span>

                      <span className={styles.infoText}>
                        {'£' +
                          (payment[0].paid !== undefined
                            ? payment[0].paid
                            : '0.00')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.inner}>
                  <div className={styles.headerText}>
                    {totals?.grand_total.label}
                  </div>

                  <div className={styles.infoText}>
                    {'£' +
                      (payment[0].grandTotal !== undefined
                        ? payment[0].grandTotal
                        : '0.00')}{' '}
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
                  {account && (
                    <div className={styles.inner}>
                      <span className={styles.headText}>
                        {t('invoice.bank.account')}
                      </span>
                      <span className={styles.infoText}>{account}</span>
                    </div>
                  )}
                  {accountNumber && (
                    <div className={styles.inner}>
                      <span className={styles.headText}>
                        {t('invoice.bank.name')}
                      </span>
                      <span className={styles.infoText}>{bankName}</span>
                    </div>
                  )}
                  {address && (
                    <div className={styles.inner}>
                      <span className={styles.headText}>
                        {t('invoice.bank.address')}
                      </span>
                      <span className={styles.infoText}>{address}</span>
                    </div>
                  )}
                  {accountNumber && (
                    <div className={styles.inner}>
                      <span className={styles.headText}>
                        {t('invoice.account.number')}
                      </span>
                      <span className={styles.infoText}>{accountNumber}</span>
                    </div>
                  )}
                  {iban && (
                    <div className={styles.inner}>
                      <span className={styles.headText}>
                        {t('invoice.bank.iban')}
                      </span>
                      <span className={styles.infoText}>{iban}</span>
                    </div>
                  )}
                  {regCompanyAddress && (
                    <div className={styles.inner}>
                      <span className={styles.headText}>
                        {t('invoice.regiter.company.address')}
                      </span>
                      <span className={styles.infoText}>
                        {regCompanyAddress}
                      </span>
                    </div>
                  )}
                  {sortCode && (
                    <div className={styles.inner}>
                      <span className={styles.headText}>
                        {t('invoice.bank.sort.code')}
                      </span>
                      <span className={styles.infoText}>{sortCode}</span>
                    </div>
                  )}
                  {swift && (
                    <div className={styles.inner}>
                      <span className={styles.headText}>
                        {t('invoice.bank.swift')}
                      </span>
                      <span className={styles.infoText}>{swift}</span>
                    </div>
                  )}
                  {regCompanyNo && (
                    <div className={styles.inner}>
                      <span className={styles.headText}>
                        {t('invoice.register.company.number')}
                      </span>
                      <span className={styles.infoText}>{regCompanyNo}</span>
                    </div>
                  )}
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
