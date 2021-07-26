import React, { FC } from 'react'
import { Modal } from 'antd'
import styles from './InvoiceTemplate.module.less'
import { Table } from 'antd'
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
  outstanding: number
  grandTotal: number
  refundAmount: number
  paid: number
  totalNet: number
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
  clinicDetails: clinicDetails[]
  invoiceDetails: invoiceDetails[]
  onCancel?: () => void
  onSubmit?: () => void
  columns?: ICol[]
  paymentColumns?: ICol[]
  salesData?: salesData[]
  paymentData?: paymentData[]
  dataSource?: IDataSource[]
  paymentDetails: paymentDetails[]
  totals?: ITotals
}
export interface salesData {
  key: string
  after_disc: string
  category: string
  date: string
  description: string
  disc_amount: string
  disc_per: string
  net: string
  practitioner: string
  product: string
  quantity: string
  sku: string
  total: string
  unitprice: string
  vat: string
  vat_per: string
}

export interface paymentData {
  key: string
  insurer: string
  payment_date: string
  payment_method: string
  payment_amount: string
}

export interface IDataSource {
  [key: string]: string | number | boolean
}

export interface ICol {
  title: string
  dataIndex: string
  key: string
}

export interface ITotalDetails {
  enabled: number
  label: string
}

export interface ITotals {
  amount_paid: ITotalDetails
  discount: ITotalDetails
  grand_total: ITotalDetails
  outstanding_balance: ITotalDetails
  paid: ITotalDetails
  refund_amount: ITotalDetails
  sub_total: ITotalDetails
  total_net: ITotalDetails
  vat: ITotalDetails
}

export const InvoiceTemplate: FC<InvoiceTemplateProps> = ({
  visible,
  title,
  logo,
  totals,
  columns,
  salesData,
  paymentData,
  paymentColumns,
  titleDescription,
  clinicDetails,
  invoiceDetails,
  onCancel,
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
            {invoiceDetails?.map((invoiceDetails) => {
              const { key, invoice, issuedBy, issuedTo, date } = invoiceDetails
              return (
                <div className={styles.right} key={key}>
                  <div className={styles.rightInner}>
                    <div className={styles.inner}>
                      <span className={styles.headText}>
                        {t('invoice.invoice.label')}
                      </span>
                      <span className={styles.infoText}>{invoice}</span>
                    </div>
                    <div className={styles.inner1}>
                      <span className={styles.headText}>
                        {t('invoice.issue.to.label')}
                      </span>
                      <span className={styles.infoText}>{issuedTo}</span>
                    </div>
                  </div>
                  <div className={styles.rightInner}>
                    <div className={styles.inner}>
                      <span className={styles.headText}>
                        {t('invoice.date.label')}
                      </span>
                      <span className={styles.infoText}>{date}</span>
                    </div>
                    <div className={styles.inner1}>
                      <span className={styles.headText}>
                        {t('invoice.issue.by.label')}
                      </span>
                      <span className={styles.infoText}>{issuedBy}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          {columns && columns.length > 0 && (
            <div className={styles.tableData}>
              <Table
                columns={columns}
                dataSource={salesData}
                pagination={false}
              />
            </div>
          )}
          {paymentColumns && paymentColumns?.length > 0 && (
            <Table
              className="test"
              columns={paymentColumns}
              dataSource={paymentData}
              pagination={false}
            />
          )}
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
                            ? payment[0]?.amountPaid.toFixed(2)
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
                            ? payment[0].subTotalAmount.toFixed(2)
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
                            ? payment[0].outstanding.toFixed(2)
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
                            ? payment[0].refundAmount.toFixed(2)
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
                            ? payment[0].paid.toFixed(2)
                            : '0.00')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.right}>
                {totals?.grand_total.enabled === 1 && (
                  <div className={styles.inner}>
                    <div className={styles.headerText}>
                      {totals?.grand_total.label}
                    </div>

                    <div className={styles.infoText}>
                      {'£' +
                        (payment[0].grandTotal !== undefined
                          ? payment[0].grandTotal.toFixed(2)
                          : '0.00')}{' '}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.section3Inner}>
              <div className={styles.left}>
                <div className={styles.rightInner}>
                  <div className={styles.inner}>
                    <span className={styles.headerText}>
                      {t('invoice.payment.label')}
                    </span>
                    <span className={styles.infoText}>
                      {payment[0].paymentTime}
                    </span>
                  </div>
                  <div className={styles.inner}>
                    <span className={styles.headerText}>
                      {t('invoice.total.label')}
                    </span>
                    <span className={styles.infoText}>
                      {'£' +
                        (payment[0].total !== undefined
                          ? payment[0].total.toFixed(2)
                          : '0.00')}
                    </span>
                  </div>
                </div>
                <div className={styles.section3Links}>
                  <span className={styles.link}>
                    {t('invoice.card.label') + ':' + payment[0].card}
                  </span>
                  <span className={styles.link}>
                    {t('invoice.cash.label') + ':' + payment[0].cash}
                  </span>
                </div>
              </div>
              {payment[0].outstanding > 0.01 && (
                <a
                  href="https://www.google.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className={styles.right}>
                    {
                      <button className={styles.paywithCard}>
                        {t('invoice.pay.button.label')}
                      </button>
                    }
                  </div>
                </a>
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
                    <span className={styles.headText}>
                      {t('invoice.bank.account')}
                    </span>
                    <span className={styles.infoText}>{account}</span>
                  </div>
                  <div className={styles.inner}>
                    <span className={styles.headText}>
                      {t('invoice.bank.iban')}
                    </span>
                    <span className={styles.infoText}>{iban}</span>
                  </div>
                  <div className={styles.inner}>
                    <span className={styles.headText}>
                      {t('invoice.register.company.number')}
                    </span>
                    <span className={styles.infoText}>{regCompanyNo}</span>
                  </div>
                </div>
                <div className={styles.section4Inner}>
                  <div className={styles.inner}>
                    <span className={styles.headText}>
                      {t('invoice.account.number')}
                    </span>
                    <span className={styles.infoText}>{accountNumber}</span>
                  </div>
                  <div className={styles.inner}>
                    <span className={styles.headText}>
                      {t('invoice.bank.swift')}
                    </span>
                    <span className={styles.infoText}>{swift}</span>
                  </div>
                </div>
                <div className={styles.section4Inner}>
                  <div className={styles.inner}>
                    <span className={styles.headText}>
                      {t('invoice.bank.sort.code')}
                    </span>
                    <span className={styles.infoText}>{sortCode}</span>
                  </div>
                  <div className={styles.inner}>
                    <span className={styles.headText}>
                      {t('invoice.bank.address')}
                    </span>
                    <span className={styles.infoText}>{address}</span>
                  </div>
                </div>
                <div className={styles.section4Inner}>
                  <div className={styles.inner}>
                    <span className={styles.headText}>
                      {t('invoice.bank.name')}
                    </span>
                    <span className={styles.infoText}>{bankName}</span>
                  </div>
                  <div className={styles.inner}>
                    <span className={styles.headText}>
                      {t('invoice.regiter.company.address')}
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
