import React, { FC, useState } from 'react'
import { InvoiceProp } from './../ClientFinancialsLayout'
import styles from './Tabs.module.less'
import { DropdownWithIcon } from '@pabau/ui'
import moment from 'moment'
import { Typography, Button, DatePicker, Select, Input, Alert } from 'antd'
import { useTranslation } from 'react-i18next'
import {
  invoicePaymentMethodOptions,
  invoiceEmployeeOptions,
} from '../../../../pages/test/ClientCardMock'
import { PlusOutlined, CloseOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import DeleteImg from '../../../../assets/images/delete_circle.png'
import EditImg from '../../../../assets/images/edit_circle.png'
import { Modal } from 'antd'

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
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const onChangeItem = (obj, key, value) => {
    const payments_ = payments.filter((o) => {
      if (o.id === obj.id) o[key] = value

      return o
    })
    setPayment(payments_)
  }

  const deleteItem = () => {
    setShowDeleteModal(true)
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
              value={item.amount}
              onChange={(e) => onChangeItem(item, 'amount', e.target.value)}
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
            <span className={styles.closeLabel} onClick={deleteItem}>
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
            <div className={styles.invoiceFormField}>
              <label>
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
            {item.noteSaved && (
              <div className={styles.invoiceFormEditField}>
                <span>
                  <img
                    src={EditImg}
                    alt="edit"
                    onClick={() => {
                      onChangeItem(item, 'showNote', true)
                      onChangeItem(item, 'noteSaved', false)
                    }}
                  />
                </span>
                <span>
                  <img
                    src={DeleteImg}
                    alt="delete"
                    onClick={() => {
                      onChangeItem(item, 'note', '')
                      onChangeItem(item, 'showNote', false)
                      onChangeItem(item, 'noteSaved', false)
                    }}
                  />
                </span>
              </div>
            )}
            {!item.noteSaved && (
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
          description="Laura Sutton £100 paid by elictronic transfer on Sunday, 12 December 2020"
          type="info"
        />
        <div className={styles.btnRow}>
          <Button onClick={() => setShowDeleteModal(false)}>
            {t('ui.client-card-financial.payments.delete-payments.cancel')}
          </Button>
          <Button
            onClick={() => {
              setShowDeleteModal(false)
              console.log('Yes Delete')
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
              <span>£0</span>
            </div>
            <div>
              <span className={styles.greenText}>£0</span>
            </div>
            <div>
              <span>£600</span>
            </div>
          </div>
        </div>
        <div className={styles.invoiceTabRow}>
          <Alert
            message="£600.00 unallocated from payment will be added as account credit"
            type="warning"
          />
        </div>
        <div className={styles.invoiceTabPaymentActionFooterRow}>
          <Button onClick={() => console.log('Add Another')}>
            Add Another
          </Button>
          <Button onClick={() => console.log('Update Payment')} type="primary">
            Update Payment
          </Button>
        </div>
      </div>
    </>
  )
}

export default PaymentsTab
