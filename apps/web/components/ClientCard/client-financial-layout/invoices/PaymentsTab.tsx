import React, { FC, useState, useEffect } from 'react'
import {
  InvoiceProp,
  InvoiceInvoicePayments,
} from './../ClientFinancialsLayout'
import styles from './Tabs.module.less'
import { DropdownWithIcon } from '@pabau/ui'
import moment from 'moment'
import { Typography, Button, DatePicker, Select, Input, Alert } from 'antd'
import { useTranslation } from 'react-i18next'
import {
  invoicePaymentMethodOptions,
  invoiceEmployeeOptions,
} from '../../../../pages/test/ClientCardMock'
import { PlusOutlined, CloseOutlined, EditFilled } from '@ant-design/icons'
import classNames from 'classnames'
import { Modal, Dropdown, Menu } from 'antd'
import { calculateDiscount } from './ItemsTab'

interface Invoice {
  invoice?: InvoiceProp
}

const PaymentsTab: FC<Invoice> = ({ invoice }) => {
  const { t } = useTranslation('common')
  const { Title } = Typography
  const { Option } = Select
  const { TextArea } = Input
  const [payments, setPayment] = useState(
    invoice?.payments ? invoice?.payments : []
  )
  const [invoiceTotal, setInvoiceTotal] = useState(0)
  const [outStanding, setOutstanding] = useState(invoice?.grandTotal)
  const [paymentAllocated, setPaymentAllocated] = useState(0)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [
    selectedPayment,
    setSelectedPayment,
  ] = useState<InvoiceInvoicePayments>()

  useEffect(() => {
    let paymentAllocated_ = 0

    payments.map((p) => {
      paymentAllocated_ += Number(p.amount)
      return true
    })

    const calcOustanding = invoiceTotal - paymentAllocated_
    setOutstanding(calcOustanding >= 0 ? calcOustanding : 0)
    setPaymentAllocated(paymentAllocated_)

    setInvoiceTotal(
      invoice?.items
        ?.map((item) => {
          const subTotal = item.price * item.quantity
          const discount_ = calculateDiscount(subTotal, item.discount)
          const discountedTotal = subTotal - discount_
          const tax_ = (discountedTotal / 100) * item.tax
          const total = discountedTotal + tax_

          return total
        })
        .reduce((a, b) => a + b, 0)
    )
  }, [payments, invoiceTotal, invoice])

  const numbertoAmountFormat = (e) => {
    e = (e ?? 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    return e
  }

  const onChangeItem = (obj, key, value) => {
    const payments_ = payments.filter((o) => {
      if (o.id === obj.id) o[key] = value

      return o
    })
    setPayment(payments_)
  }

  const deleteItem = (e) => {
    setSelectedPayment(e)
    setShowDeleteModal(true)
  }

  const removeItem = () => {
    const payments_ = payments?.filter((o) => selectedPayment.id !== o.id)
    setPayment(payments_)
  }

  const addItem = (e) => {
    setPayment([
      ...payments,
      {
        id: payments.length + 1,
        employee: payments[payments.length - 1].employee,
        method: e,
        amount: outStanding,
        date: moment().format('DD/MM/YYYY'),
        note: '',
        showNote: false,
        noteSaved: true,
      },
    ])
  }

  const renderTableRow = (item) => {
    return (
      <React.Fragment key={item.id}>
        <div className={styles.invoiceTabSectionTableRow}>
          <div style={{ width: '20%' }}>
            <DropdownWithIcon
              value={invoiceEmployeeOptions.find(
                (x) => x.label === item.employee
              )}
              onSelected={(e) => onChangeItem(item, 'employee', e.label)}
              options={invoiceEmployeeOptions}
            />
          </div>
          <div style={{ width: '20%' }}>
            <Select
              style={{ width: '100%' }}
              placeholder={t(
                'ui.client-card-financial.edit-payment.method.placeholder'
              )}
              onChange={(e) => onChangeItem(item, 'method', e)}
              defaultValue={item.method}
            >
              {invoicePaymentMethodOptions.map((i) => (
                <Option key={i.key} value={i.value}>
                  {i.value}
                </Option>
              ))}
            </Select>
          </div>
          <div style={{ width: '20%' }}>
            <Input
              placeholder={t(
                'ui.client-card-financial.edit-payment.amount.placeholder'
              )}
              prefix={'£'}
              type="number"
              min="0"
              step="1"
              value={item.amount}
              onChange={(e) => onChangeItem(item, 'amount', e.target.value)}
              className={styles.editInvoiceItemPriceField}
            />
          </div>
          <div style={{ width: '20%' }}>
            <DatePicker
              placeholder={t(
                'ui.client-card-financial.edit-payment.date.placeholder'
              )}
              style={{ width: '100%' }}
              onChange={(e) =>
                onChangeItem(item, 'date', e?.format('DD/MM/YYYY'))
              }
              defaultValue={moment(item.date, 'DD/MM/YYYY')}
            />
          </div>
          <div style={{ width: '20%', justifyContent: 'flex-end' }}>
            <span
              className={styles.addNoteLabel}
              onClick={() => onChangeItem(item, 'showNote', !item.showNote)}
            >
              <PlusOutlined />
              {t('ui.client-card-financial.edit-payment.add-note')}
            </span>
            <span
              className={styles.closeLabel}
              onClick={() => deleteItem(item)}
            >
              <CloseOutlined />
            </span>
          </div>
        </div>
        {item.showNote && (
          <div
            className={classNames(
              styles.invoiceTabSectionTableNoteRow,
              item.noteSaved ? styles.invoiceTabSectionTableNoteRowDFlex : null
            )}
            key={item.id}
          >
            {item.noteSaved && (
              <div className={styles.invoiceNoteAlert}>
                <span>{item.note}</span>
                <span
                  className={styles.editNoteIcon}
                  onClick={() => {
                    onChangeItem(item, 'showNote', true)
                    onChangeItem(item, 'noteSaved', false)
                  }}
                >
                  <EditFilled />
                </span>
              </div>
            )}
            {!item.noteSaved && (
              <>
                <div className={styles.invoiceFormField}>
                  <label style={{ fontSize: 12 }}>
                    {t('ui.client-card-financial.edit-payment.add-note')}
                  </label>
                  <TextArea
                    placeholder={t(
                      'ui.client-card-financial.refund.add-note.placeholder'
                    )}
                    rows={1}
                    value={item.note}
                    onChange={(e) => onChangeItem(item, 'note', e.target.value)}
                  />
                </div>
                <div
                  className={styles.formField}
                  style={{
                    justifyContent: 'flex-end',
                    display: 'flex',
                  }}
                >
                  <Button
                    onClick={() => {
                      onChangeItem(item, 'showNote', false)
                    }}
                  >
                    {t('ui.client-card-financial.refund.cancel')}
                  </Button>
                  <Button
                    type="primary"
                    disabled={!item.note}
                    onClick={() => {
                      onChangeItem(item, 'noteSaved', true)
                    }}
                  >
                    {t('ui.client-card-financial.refund.save-note')}
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </React.Fragment>
    )
  }

  return (
    <>
      <Modal
        title={t('ui.client-card-financial.payments.delete-payments')}
        visible={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        wrapClassName={styles.paymentDeleteModal}
        footer={false}
      >
        <p>{t('ui.client-card-financial.payments.delete-payments-desc')}</p>
        <Alert
          message={t(
            'ui.client-card-financial.payments.delete-payments-alert-message'
          )}
          description={`Laura Sutton £${numbertoAmountFormat(
            selectedPayment ? selectedPayment['amount'] : 0
          )} paid by elictronic transfer on Sunday, 12 December 2020`}
          type="info"
        />
        <div className={styles.btnRow}>
          <Button onClick={() => setShowDeleteModal(false)}>
            {t('ui.client-card-financial.payments.delete-payments.cancel')}
          </Button>
          <Button
            onClick={() => {
              setShowDeleteModal(false)
              removeItem()
            }}
            type="primary"
            danger
          >
            {t('ui.client-card-financial.payments.delete-payments.yes-delete')}
          </Button>
        </div>
      </Modal>

      <div className={styles.invoiceTabsContainer}>
        <div className={styles.invoiceTabSectionHeader}>
          <Title level={5}>{t('ui.client-card-financial.edit-payment')}</Title>
        </div>
        <div className={styles.invoiceTabSectionScrollContainer}>
          <div className={styles.invoiceTabSectionTableHeader}>
            <div style={{ width: '20%' }}>
              <span>{t('ui.client-card-financial.edit-payment.paid-by')}</span>
            </div>
            <div style={{ width: '20%' }}>
              <span>{t('ui.client-card-financial.edit-payment.method')}</span>
            </div>
            <div style={{ width: '20%' }}>
              <span>{t('ui.client-card-financial.edit-payment.amount')}</span>
            </div>
            <div style={{ width: '40%' }}>
              <span>{t('ui.client-card-financial.edit-payment.date')}</span>
            </div>
          </div>
          {payments.map((i) => renderTableRow(i))}
        </div>
        <div className={styles.invoiceTabPaymentFooterRow}>
          <div></div>
          <div>
            <div>
              <span>
                {t('ui.client-card-financial.edit-payment.outstanding')}
              </span>
            </div>
            <div>
              <span>
                {t('ui.client-card-financial.edit-payment.payments-allocated')}
              </span>
            </div>
            <div>
              <span>
                {t('ui.client-card-financial.edit-payment.invoice-total')}
              </span>
            </div>
          </div>
        </div>
        <div
          className={classNames(
            styles.invoiceTabPaymentFooterRow,
            styles.invoiceTabPaymentTotalFooterRow
          )}
        >
          <div></div>
          <div>
            <div>
              <span>£{numbertoAmountFormat(outStanding)}</span>
            </div>
            <div>
              <span className={styles.greenText}>
                £{numbertoAmountFormat(paymentAllocated)}
              </span>
            </div>
            <div>
              <span>£{numbertoAmountFormat(invoiceTotal)}</span>
            </div>
          </div>
        </div>
        {paymentAllocated > invoiceTotal && (
          <div className={styles.invoiceTabRow}>
            <Alert
              message={`£${numbertoAmountFormat(
                paymentAllocated - invoiceTotal
              )} unallocated from payment will be added as account credit`}
              type="warning"
            />
          </div>
        )}
        <div className={styles.invoiceTabPaymentActionFooterRow}>
          <Dropdown
            overlay={() => {
              return (
                <Menu className={styles.customMenuDropdown}>
                  <Menu.Item key={3} onClick={() => addItem('Cash')}>
                    Cash
                  </Menu.Item>
                  <Menu.Item key={4} onClick={() => addItem('Card')}>
                    Card
                  </Menu.Item>
                </Menu>
              )
            }}
            placement="bottomRight"
            trigger={['click']}
          >
            <Button>
              {t('ui.client-card-financial.edit-payment.add-another')}
            </Button>
          </Dropdown>
          <Button onClick={() => console.log('Update Payment')} type="primary">
            {t('ui.client-card-financial.edit-payment.update-payment')}
          </Button>
        </div>
      </div>
    </>
  )
}

export default PaymentsTab
