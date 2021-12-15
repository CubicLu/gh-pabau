import { FullScreenReportModal } from '@pabau/ui'
import { useTranslation } from 'react-i18next'
import { useMedia } from 'react-use'
import {
  Button,
  Checkbox,
  InputNumber,
  Select,
  Typography,
  DatePicker,
  Input,
  Modal,
  Slider,
} from 'antd'
import classNames from 'classnames'
import React, { FC, useState, useEffect } from 'react'
import EllipseImg from '../../../../assets/images/ellipse.png'
import InvoiceImg from '../../../../assets/images/invoice.png'
import { InvoiceProp } from './../ClientFinancialsLayout'
import styles from './Refund.module.less'
import tabStyles from './Tabs.module.less'
import { DropdownWithIcon } from '@pabau/ui'
import {
  PlusOutlined,
  CreditCardOutlined,
  CloseOutlined,
  DollarOutlined,
  DashOutlined,
} from '@ant-design/icons'
import {
  invoiceItemsOptions,
  invoiceDiscountOptions,
  invoiceTaxOptions,
  invoiceEmployeeOptions,
} from '../../../../pages/test/ClientCardMock'

interface EditInvoiceProps {
  invoice?: InvoiceProp
  onModalBackPress: () => void
}

const Refund: FC<EditInvoiceProps> = ({ invoice, onModalBackPress }) => {
  const { t } = useTranslation('common')
  const { Title } = Typography
  const { Option } = Select
  const { TextArea } = Input
  const isMobile = useMedia('(max-width: 768px)', false)

  const [showEnableBanner, setShowEnableBanner] = useState(true)
  const [items, setItems] = useState(invoice?.items ? invoice?.items : [])
  const [subGTotal, setSubGTotal] = useState<number>(0)
  const [discountedGTotal, setDiscountedGTotal] = useState<number>(0)
  const [invoiceGTotal, setInvoiceGTotal] = useState<number>(0)
  const [taxGTotal, setTaxGTotal] = useState<number>(0)
  const [showAddNoteForm, setShowAddNoteForm] = useState(false)
  const [addNoteEdit, setAddNoteEdit] = useState('')
  const [showRefundModal, setShowRefundModal] = useState(false)
  const [showRefundedModal, setShowRefundedModal] = useState(false)
  const [coolsculptingSessions, setCoolsculptingSessions] = useState(0)
  const [calculateForm, setCalculateForm] = useState('sale_price')

  useEffect(() => {
    let subTotal_ = 0
    let discountedTotal_ = 0
    let invoiceTotal_ = 0
    let taxTotal_ = 0

    items.map((item) => {
      const subTotal = item.price * item.quantity
      const discount_ = (subTotal / 100) * item.discount?.rate
      const discountedTotal = subTotal - discount_
      const tax_ = (discountedTotal / 100) * item.tax
      const total = discountedTotal + tax_

      subTotal_ += subTotal
      discountedTotal_ += discount_
      invoiceTotal_ += total
      taxTotal_ += tax_
      return true
    })

    setSubGTotal(subTotal_)
    setDiscountedGTotal(discountedTotal_)
    setInvoiceGTotal(invoiceTotal_)
    setTaxGTotal(taxTotal_)
  }, [items])

  const onChangeItem = (obj, key, value) => {
    const items_ = items?.filter((o) => {
      if (o.id === obj.id) o[key] = value

      return o
    })
    setItems(items_)
  }

  const renderTableRow = (item) => {
    const subTotal = item.price * item.quantity
    const discountedTotal = subTotal - (subTotal / 100) * item.discount?.rate
    const total = (
      discountedTotal +
      (discountedTotal / 100) * item.tax
    ).toFixed(2)

    return (
      <div className={tabStyles.invoiceTabSectionTableRow} key={item.id}>
        <div style={{ width: '20%' }}>
          <DropdownWithIcon
            value={invoiceEmployeeOptions.find(
              (x) => x.label === item.employee
            )}
            onSelected={(e) => onChangeItem(item, 'employee', e.label)}
            options={invoiceEmployeeOptions}
            disabled={true}
          />
        </div>
        <div style={{ width: '20%' }}>
          <Select
            style={{ width: '100%' }}
            placeholder={t('ui.client-card-financial.items.item.select-item')}
            onChange={(e) => onChangeItem(item, 'name', e)}
            defaultValue={item.name}
            disabled={true}
          >
            {invoiceItemsOptions.map((i) => (
              <Option key={i.key} value={i.value}>
                {i.value}
              </Option>
            ))}
          </Select>
        </div>
        <div style={{ width: '8%' }}>
          <Input
            placeholder={t('ui.client-card-financial.items.unit-price')}
            prefix={'£'}
            value={item.price}
            disabled={true}
            onChange={(e) => onChangeItem(item, 'price', e.target.value)}
          />
        </div>
        <div style={{ width: '8%' }}>
          <InputNumber
            placeholder={t('ui.client-card-financial.items.quantity')}
            value={item.quantity}
            disabled={true}
            onChange={(e) => onChangeItem(item, 'quantity', e)}
          />
        </div>
        <div style={{ width: '17%' }}>
          <Select
            style={{ width: '100%' }}
            placeholder={t(
              'ui.client-card-financial.items.item.select-discount'
            )}
            defaultValue={item.discount}
            onChange={(e) => onChangeItem(item, 'discount', e)}
            disabled={true}
          >
            {invoiceDiscountOptions.map((i) => (
              <Option key={i.key} value={i.key}>
                {i.value}
              </Option>
            ))}
          </Select>
        </div>
        <div style={{ width: '17%' }}>
          <Select
            style={{ width: '100%' }}
            placeholder={t('ui.client-card-financial.items.item.select-tax')}
            defaultValue={item.tax}
            onChange={(e) => onChangeItem(item, 'tax', e)}
            disabled={true}
          >
            {invoiceTaxOptions.map((i) => (
              <Option key={i.key} value={i.key}>
                {i.value}
              </Option>
            ))}
          </Select>
        </div>
        <div style={{ width: '10%' }} className={tabStyles.totalPriceColumn}>
          <span>-{`£ ${total}`}</span>
          <span>
            <Checkbox onChange={() => console.log('checked')} checked={true} />
          </span>
        </div>
      </div>
    )
  }

  const renderActionBtns = () => {
    return (
      <div className={classNames(tabStyles.itemsTableFooterRefundAction)}>
        <div className={tabStyles.addNoteFormContainer}>
          {showAddNoteForm && (
            <>
              <div className={tabStyles.formField}>
                <label>{t('ui.client-card-financial.refund.add-note')}</label>
                <TextArea
                  placeholder={t(
                    'ui.client-card-financial.refund.add-note.placeholder'
                  )}
                  value={addNoteEdit}
                  onChange={(e) => setAddNoteEdit(e.target.value)}
                />
              </div>
              <div
                className={tabStyles.formField}
                style={{
                  justifyContent: 'flex-end',
                  display: 'flex',
                }}
              >
                <Button onClick={() => setShowAddNoteForm((e) => !e)}>
                  {t('ui.client-card-financial.refund.cancel')}
                </Button>
                <Button
                  type="primary"
                  disabled={!addNoteEdit}
                  onClick={() => setShowAddNoteForm((e) => !e)}
                >
                  {t('ui.client-card-financial.refund.save-note')}
                </Button>
              </div>
            </>
          )}
        </div>
        <div>
          <Button
            type="primary"
            danger
            onClick={() => setShowRefundModal(true)}
          >
            <CreditCardOutlined />
            {t('ui.client-card-financial.refund.card')}
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => setShowRefundModal(true)}
          >
            <DollarOutlined />
            {t('ui.client-card-financial.refund.cash')}
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => setShowRefundModal(true)}
          >
            <DashOutlined />
            {t('ui.client-card-financial.refund.other')}
          </Button>
        </div>
      </div>
    )
  }

  const renderAddNoteBtn = () => {
    return (
      <span
        onClick={() => setShowAddNoteForm((e) => !e)}
        className={styles.primaryText}
      >
        <PlusOutlined /> {t('ui.client-card-financial.refund.add-note')}
      </span>
    )
  }

  const refundPackageSliderMarks = {
    0: '0',
    1.5: '',
    3: '3',
    4.5: '',
    6: '6',
  }

  return (
    <>
      <Modal
        title={t('ui.client-card-financial.invoice')}
        visible={showRefundModal}
        className={styles.refundModal}
        onCancel={() => setShowRefundModal(false)}
        footer={
          <>
            <Button onClick={() => setShowRefundModal(false)}>
              {t('ui.client-card-financial.refund.cancel')}
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => {
                setShowRefundModal(false)
                setShowRefundedModal(true)
              }}
            >
              {t('ui.client-card-financial.refund.refund-now')}
            </Button>
          </>
        }
      >
        <img src={InvoiceImg} alt="invoice" />
        <span>{t('ui.client-card-financial.refund.refund-now-desc')}</span>
      </Modal>

      <Modal
        title={t('ui.client-card-financial.invoice')}
        visible={showRefundedModal}
        className={styles.refundModal}
        onCancel={() => setShowRefundedModal(false)}
        footer={
          <>
            <Button onClick={() => setShowRefundedModal(false)}>
              {t('ui.client-card-financial.refund.cancel')}
            </Button>
            <Button
              type="primary"
              onClick={() => {
                console.log('Pressed send receipt')
                setShowRefundedModal(false)
              }}
            >
              {t('ui.client-card-financial.refund.send-receipt')}
            </Button>
          </>
        }
      >
        <img src={InvoiceImg} alt="invoice" />
        <Title>{t('ui.client-card-financial.refund.refunded')}</Title>
        <span>Refund created on Wednesday, 19 May 2021</span>
        <div className={styles.formField}>
          <label>{t('ui.client-card-financial.refund.send-receipt')}</label>
          <Input
            value="william@pabau.com"
            onChange={(e) => console.log(e.target.validationMessage)}
          />
        </div>
      </Modal>

      <FullScreenReportModal
        operations={[]}
        title={t('ui.client-card-financial.refund')}
        visible={true}
        onBackClick={onModalBackPress}
        enableCreateBtn={true}
        footer={false}
        className={styles.refundFullModal}
      >
        <div className={styles.refundScreen}>
          <div className={styles.refundContainer}>
            <div className={tabStyles.invoiceTabSectionHeader}>
              <Title level={5}>{t('ui.client-card-financial.items')}</Title>
              <div className={tabStyles.dateField}>
                <span>{t('ui.client-card-financial.refund.refund-date')}</span>
                <DatePicker onChange={() => console.log('date changed')} />
              </div>
            </div>
            <div className={tabStyles.invoiceTabSectionTableHeader}>
              <div style={{ width: '20%' }}>
                <span>{t('ui.client-card-financial.items.employee')}</span>
              </div>
              <div style={{ width: '20%' }}>
                <span>{t('ui.client-card-financial.items.item')}</span>
              </div>
              <div style={{ width: '8%' }}>
                <span>{t('ui.client-card-financial.items.unit-price')}</span>
              </div>
              <div style={{ width: '8%' }}>
                <span>{t('ui.client-card-financial.items.quantity')}</span>
              </div>
              <div style={{ width: '17%' }}>
                <span>{t('ui.client-card-financial.items.discount')}</span>
              </div>
              <div style={{ width: '17%' }}>
                <span>{t('ui.client-card-financial.items.tax')}</span>
              </div>
              <div style={{ width: '10%' }}>
                <span>{t('ui.client-card-financial.items.total-price')}</span>
              </div>
            </div>
            {items?.map((i) => renderTableRow(i))}

            {invoice?.type === 'package' && (
              <div className={styles.refundPackageRow}>
                <div className={styles.main}>
                  <div className={styles.left}>
                    <span>
                      {t(
                        'ui.client-card-financial.refund.coolsculpting-sessions'
                      )}
                    </span>
                    <Slider
                      defaultValue={coolsculptingSessions}
                      marks={refundPackageSliderMarks}
                      min={0}
                      max={6}
                      step={1.5}
                      onChange={(e) => setCoolsculptingSessions(e)}
                    />
                  </div>
                  <div className={styles.right}>
                    <span>
                      {t('ui.client-card-financial.refund.calculate-from')}
                    </span>
                    <div>
                      <Button
                        type={
                          calculateForm === 'sale_price' ? 'primary' : 'default'
                        }
                        onClick={() => setCalculateForm('sale_price')}
                      >
                        {t('ui.client-card-financial.refund.sale-price')}
                      </Button>
                      <Button
                        type={
                          calculateForm === 'remove_package_discount'
                            ? 'primary'
                            : 'default'
                        }
                        onClick={() =>
                          setCalculateForm('remove_package_discount')
                        }
                      >
                        {t(
                          'ui.client-card-financial.refund.remove-package-discount'
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!isMobile && (
              <>
                <div
                  className={tabStyles.itemsTableFooter}
                  style={{ paddingLeft: 15 }}
                >
                  <div>{renderAddNoteBtn()}</div>
                  <div>
                    <div>
                      <span>
                        {t('ui.client-card-financial.items.total-discount')}
                      </span>
                    </div>
                    <div>
                      <span>
                        {t('ui.client-card-financial.items.subtotal')}
                      </span>
                    </div>
                    <div>
                      <span>
                        {t('ui.client-card-financial.items.total-tax')}
                      </span>
                    </div>
                    <div>
                      <span>
                        {t('ui.client-card-financial.items.invoice-total')}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className={classNames(
                    tabStyles.itemsTableFooter,
                    tabStyles.itemsTableFooterTotal
                  )}
                >
                  <div></div>
                  <div>
                    <div>
                      <span>£{discountedGTotal.toFixed(2)}</span>
                    </div>
                    <div>
                      <span>£{subGTotal.toFixed(2)}</span>
                    </div>
                    <div>
                      <span>£{taxGTotal.toFixed(2)}</span>
                    </div>
                    <div>
                      <span>£{invoiceGTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                {renderActionBtns()}
              </>
            )}
            {isMobile && (
              <>
                <div className={tabStyles.itemsTableFooterMobile}>
                  <div>
                    <span>
                      {t('ui.client-card-financial.items.total-discount')}
                    </span>
                  </div>
                  <div>
                    <span>{t('ui.client-card-financial.items.subtotal')}</span>
                  </div>
                  <div>
                    <span>{t('ui.client-card-financial.items.total-tax')}</span>
                  </div>
                </div>
                <div
                  className={classNames(
                    tabStyles.itemsTableFooterMobile,
                    tabStyles.itemsTableFooterMobileTotal
                  )}
                >
                  <div>
                    <span>£{discountedGTotal.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className={tabStyles.subtotal}>
                      £{subGTotal.toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <span>£{taxGTotal.toFixed(2)}</span>
                  </div>
                </div>
                <div
                  className={classNames(
                    tabStyles.itemsTableFooterMobile,
                    tabStyles.itemsTableFooterMobileInTotal
                  )}
                >
                  <div>{renderAddNoteBtn()}</div>
                  <div>
                    <span>
                      {t('ui.client-card-financial.items.invoice-total')}
                    </span>
                  </div>
                </div>
                <div
                  className={classNames(
                    tabStyles.itemsTableFooterMobile,
                    tabStyles.itemsTableFooterMobileInTotal,
                    tabStyles.itemsTableFooterMobileTotal
                  )}
                >
                  <div></div>
                  <div>
                    <span>£{invoiceGTotal.toFixed(2)}</span>
                  </div>
                </div>
                {renderActionBtns()}
              </>
            )}
          </div>

          {showEnableBanner && (
            <div className={styles.refundOnlineBanner}>
              <div>
                <span className={styles.title}>
                  {t('ui.client-card-financial.refund.enable-online-payment')}
                </span>
                <span className={styles.desc}>
                  {t(
                    'ui.client-card-financial.refund.enable-online-payment.desc'
                  )}
                </span>
                <span
                  onClick={() => console.log('Enable Payments')}
                  className={styles.primaryText}
                >
                  {t('ui.client-card-financial.refund.enable-payments')}
                </span>
              </div>
              <div></div>
              <img
                src={EllipseImg}
                alt={'Ellipse'}
                className={styles.backgroundImg}
              />
              <div
                className={styles.closeTag}
                onClick={() => setShowEnableBanner(false)}
              >
                <CloseOutlined />
              </div>
            </div>
          )}
        </div>
      </FullScreenReportModal>
    </>
  )
}

export default Refund
