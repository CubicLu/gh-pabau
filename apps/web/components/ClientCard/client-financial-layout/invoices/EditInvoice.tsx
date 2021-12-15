import {
  FullScreenReportModal,
  OperationType,
  Notification,
  NotificationType,
} from '@pabau/ui'
import { useTranslation } from 'react-i18next'
import {
  Tooltip,
  Button,
  Menu,
  Dropdown,
  Modal,
  Drawer,
  Typography,
  Tag,
} from 'antd'
import moment from 'moment'
import { useMedia } from 'react-use'
import classNames from 'classnames'
import React, { FC, useState, useEffect } from 'react'
import { ReactComponent as SvgEmail } from '../../../../assets/images/mail.svg'
import { InvoiceProp } from './../ClientFinancialsLayout'
import styles from './EditInvoice.module.less'
import {
  CheckCircleFilled,
  ClockCircleFilled,
  DownOutlined,
  MoreOutlined,
  CreditCardOutlined,
  ShareAltOutlined,
  PrinterOutlined,
  HistoryOutlined,
  ReloadOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  CloseOutlined,
  SearchOutlined,
  FilterOutlined,
  RocketFilled,
  UserOutlined,
  MailOutlined,
  CloseCircleFilled,
  CreditCardFilled,
} from '@ant-design/icons'
import DetailsTab from './DetailsTab'
import ItemsTab from './ItemsTab'
import PaymentsTab from './PaymentsTab'
import Refund from './Refund'
import { GetDateFormat } from '../../../../hooks/displayDate'
import { useGetInvoiceLazyQuery } from '@pabau/graphql'

interface EditInvoiceProps {
  id?: number
  invoice?: InvoiceProp
  onModalBackPress: () => void
  activeKey?: string
}

const EditInvoice: FC<EditInvoiceProps> = ({
  id,
  invoice,
  onModalBackPress,
  activeKey,
}) => {
  const dateFormat = GetDateFormat()
  const [invoice_, setInvoice] = useState(invoice)
  const [enableCreateBtn, setEnableCreateBtn] = useState(
    invoice?.items?.length > 0
  )
  const { t } = useTranslation('common')
  const isMobile = useMedia('(max-width: 768px)', false)
  const [showOptionsDrawer, setShowOptionsDrawer] = useState(false)
  const { Title } = Typography

  const [getInvoiceData, { data: invoiceDetailsData }] = useGetInvoiceLazyQuery(
    {
      fetchPolicy: 'network-only',
    }
  )

  const menuItems = [
    {
      key: 'credit',
      onClick: () => console.log('Credit Note'),
      body: (
        <>
          <CreditCardOutlined /> {t('ui.client-card-financial.credit-note')}
        </>
      ),
    },
    {
      key: 'share',
      onClick: () => console.log('Share'),
      body: (
        <>
          <ShareAltOutlined /> {t('ui.client-card-financial.share')}
        </>
      ),
    },
    {
      key: 'print',
      onClick: () => console.log('Print'),
      body: (
        <>
          <PrinterOutlined /> {t('ui.client-card-financial.print')}
        </>
      ),
    },
    {
      key: 'history',
      onClick: () => setShowHistoryDrawer(true),
      body: (
        <>
          <HistoryOutlined /> {t('ui.client-card-financial.history')}
        </>
      ),
    },
    {
      key: 'refund',
      onClick: () => setShowRefundModal(true),
      className: styles.warningDropdown,
      body: (
        <>
          <ReloadOutlined /> {t('ui.client-card-financial.refund')}
        </>
      ),
    },
    {
      key: 'void',
      onClick: () => setVoidModal(true),
      className: styles.warningDropdown,
      body: (
        <>
          <CloseCircleOutlined /> {t('ui.client-card-financial.void')}
        </>
      ),
    },
  ]

  useEffect(() => {
    if (id) {
      getInvoiceData({
        variables: {
          id,
        },
      })
    }
  }, [id, getInvoiceData])

  useEffect(() => {
    if (invoiceDetailsData) {
      if (!invoiceDetailsData.invoice) {
        return Notification(
          NotificationType.error,
          t('ui.client-card-financial.invalid-invoice-no')
        )
      }
      setInvoice({
        guid: invoiceDetailsData.invoice.guid,
        id: '' + invoiceDetailsData.invoice.id,
        invoice_id: '' + invoiceDetailsData.invoice.number,
        type: 'package',
        booking: invoiceDetailsData.invoice.booking_id,
        date: moment(invoiceDetailsData.invoice.date).utc().format(dateFormat),
        location: invoiceDetailsData.invoice.Location?.id,
        issuingCompany: invoiceDetailsData.invoice.IssuingCompany
          ? invoiceDetailsData.invoice.IssuingCompany.id
          : null,
        contract: invoiceDetailsData.invoice.contract,
        employee: invoiceDetailsData.invoice.Biller.name,
        note: invoiceDetailsData.invoice.note,
        issuedTo: `${invoiceDetailsData.invoice.Customer.Fname} ${invoiceDetailsData.invoice.Customer.Lname}`,
        paid:
          invoiceDetailsData.invoice.total ===
          invoiceDetailsData.invoice.paid_amount,
        status: 'outstanding_invoices',
        items: [],
        totalVat: 0,
        amountPaid: invoiceDetailsData.invoice.paid_amount,
        subtotal: invoiceDetailsData.invoice.total,
        tips: 0,
        grandTotal: invoiceDetailsData.invoice.total,
        paymentStatus: 0,
        paymentStatusTooltip:
          'Full payment received on Sunday, 16 May 2021 at CHISSY BEAUTY STUDIO by Chissy Stylist',
        tip: {
          // amount: '100',
          // type: 1,
          // staff: 67803,
        },
        history: [],
        payments: [],
        customer: {
          Fname: invoiceDetailsData.invoice.Customer.Fname,
          ID: invoiceDetailsData.invoice.Customer.ID,
          Lname: invoiceDetailsData.invoice.Customer.Lname,
        },
      })
    }
    /* eslint-disable-next-line */
  }, [invoiceDetailsData, dateFormat])

  const toggleSentandNotSent = () => {
    setInvoice({
      ...invoice_,
      paymentStatus: invoice_?.paymentStatus === 1 ? 0 : 1,
    })
  }

  const getInvoiceStatus = (e) => {
    switch (e) {
      case 0: {
        return (
          <span
            className={styles.sentLabelContainer}
            onClick={toggleSentandNotSent}
          >
            <div className={styles.notSendLabelIcon}></div>{' '}
            {t('ui.client-card-financial.not-sent')}
          </span>
        )
        break
      }
      case 1: {
        return (
          <span
            className={styles.sentLabelContainer}
            onClick={toggleSentandNotSent}
          >
            <CheckCircleFilled /> {t('ui.client-card-financial.sent')}
          </span>
        )
        break
      }
      case 2: {
        return (
          <span>
            <span>
              <CheckCircleFilled /> {t('ui.client-card-financial.sent')}
            </span>
            <span className={styles.iconWarning}>
              <ClockCircleFilled />{' '}
              {t('ui.client-card-financial.awaiting-payment')}
            </span>
          </span>
        )
        break
      }
      case 3: {
        return (
          <span>
            <span>
              <CheckCircleFilled />{' '}
              {t('ui.client-card-financial.sent-and-viewed')}
            </span>
            <span>
              <ClockCircleFilled />{' '}
              {t('ui.client-card-financial.awaiting-payment')}
            </span>
          </span>
        )
        break
      }
      case 4: {
        return (
          <span>
            <span>
              <CheckCircleFilled />{' '}
              {t('ui.client-card-financial.sent-and-viewed')}
            </span>
            <span>
              <CheckCircleFilled /> {t('ui.client-card-financial.paid')}
            </span>
          </span>
        )
        break
      }
    }
  }

  const renderSubtitle = () => {
    return (
      <div className={styles.editTitleContainer}>
        {getInvoiceStatus(invoice_?.paymentStatus)}
        <span style={{ marginLeft: 10 }}>
          {invoice_?.paid ? (
            <Tag color="green">{t('ui.client-card-financial.paid')}</Tag>
          ) : (
            <Tag color="red">{t('ui.client-card-financial.unpaid')}</Tag>
          )}
        </span>
      </div>
    )
  }

  const customMenu = (
    <Menu className={styles.customMenuDropdown}>
      {menuItems.map((e) => (
        <Menu.Item key={e.key} onClick={e.onClick} className={e?.className}>
          {e.body}
        </Menu.Item>
      ))}
    </Menu>
  )

  const [voidModal, setVoidModal] = useState(false)
  const [showHistoryDrawer, setShowHistoryDrawer] = useState(false)
  const [showRefundModal, setShowRefundModal] = useState(false)
  const [showCheckoutWarningModal, setShowCheckoutWarningModal] = useState(
    false
  )

  return (
    <>
      {showRefundModal && (
        <Refund
          invoice={invoice_}
          onModalBackPress={() => {
            setShowRefundModal(false)
          }}
        />
      )}

      <Drawer
        title={t('ui.client-card-financial.items.invoice-history')}
        placement="right"
        closable={false}
        onClose={() => setShowHistoryDrawer(false)}
        visible={showHistoryDrawer}
        className={styles.historyDrawer}
      >
        <div className={styles.header}>
          <Title level={5}>
            {t('ui.client-card-financial.items.invoice-history')}
          </Title>
          <div>
            <div onClick={() => console.log('Print')}>
              <PrinterOutlined />
            </div>
            <div onClick={() => console.log('Email')}>
              <SvgEmail className={styles.svgType} />
            </div>
            <div onClick={() => console.log('Search')}>
              <SearchOutlined />
            </div>
            <div onClick={() => console.log('Filter')}>
              <FilterOutlined />
            </div>
            <div
              className={styles.closeIcon}
              onClick={() => setShowHistoryDrawer(false)}
            >
              <CloseOutlined />
            </div>
          </div>
        </div>

        <div className={styles.histories}>
          {invoice_?.history?.map((inv, i) => {
            return (
              <div className={styles.history} key={i}>
                <div className={styles.left}>
                  <div
                    className={classNames(
                      styles.progLine,
                      i + 1 === invoice_?.history?.length
                        ? styles.progLineLastItem
                        : null
                    )}
                  ></div>
                  {inv.type === 'issue' && (
                    <div
                      className={classNames(
                        styles.iconCont,
                        styles.iconContIssue
                      )}
                    >
                      <UserOutlined />
                    </div>
                  )}
                  {inv.type === 'email' && (
                    <div
                      className={classNames(
                        styles.iconCont,
                        styles.iconContEmail
                      )}
                    >
                      <MailOutlined />
                    </div>
                  )}
                  {inv.type === 'refund' && (
                    <div
                      className={classNames(
                        styles.iconCont,
                        styles.iconContRefund
                      )}
                    >
                      <CreditCardOutlined />
                    </div>
                  )}
                  {inv.type === 'delete' && (
                    <div
                      className={classNames(
                        styles.iconCont,
                        styles.iconContDelete
                      )}
                    >
                      <CloseCircleFilled />
                    </div>
                  )}
                  {inv.type === 'add' && (
                    <div
                      className={classNames(
                        styles.iconCont,
                        styles.iconContAdd
                      )}
                    >
                      <CreditCardFilled />
                    </div>
                  )}
                </div>
                <div className={styles.right}>
                  <div className={styles.detailRow}>
                    <Title level={5}>{inv.title}</Title>
                    {inv.amount && (
                      <span className={styles.price}>£{inv.amount}</span>
                    )}
                  </div>
                  <span className={styles.date}>{inv.date}</span>
                  {inv.description && (
                    <span className={styles.desc}>{inv.description}</span>
                  )}
                  <div className={styles.detailRow} style={{ marginTop: 8 }}>
                    <span>{inv.notif_by}</span>
                    {inv.views && (
                      <span>
                        <EyeOutlined /> {inv.views} opened
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className={styles.historyRefreshDrawer}>
          <RocketFilled />
          <Title level={5}>Invoice Created</Title>
          <span>23 Sep 2020 7:00 PM · Martin Wade</span>
        </div>
      </Drawer>

      <Modal
        title="Void Invoice"
        visible={voidModal}
        footer={false}
        onCancel={() => setVoidModal(false)}
        className={styles.voidModal}
      >
        <p>{t('ui.client-card-financial.details.void-modal.description')}</p>
        <div className={styles.voidAlertInfo}>
          <p>{t('ui.client-card-financial.details.void-modal.warning')}</p>
          <p>ZAR 460 paid by Card on Sunday, 16 May 2021</p>
        </div>
        <div className={styles.footer}>
          <Button size={'large'} onClick={() => setVoidModal(false)}>
            {t('ui.client-card-financial.details.void-modal.cancel')}
          </Button>
          <Button
            type="primary"
            danger
            size={'large'}
            className={styles.closeBtn}
            onClick={() => console.log('Void Invoice')}
          >
            {t('ui.client-card-financial.details.void-modal.void-invoices')}
          </Button>
        </div>
      </Modal>

      <Modal
        title={t('ui.client-card-financial.edit-payment.checkout-not-saved')}
        visible={showCheckoutWarningModal}
        onCancel={() => setShowCheckoutWarningModal(false)}
        wrapClassName={styles.checkoutWarningModal}
        footer={false}
      >
        <p>
          {t('ui.client-card-financial.edit-payment.checkout-not-saved-desc')}
        </p>
        <div className={styles.btnRow}>
          <Button onClick={() => setShowCheckoutWarningModal(false)}>
            {t('ui.client-card-financial.payments.delete-payments.cancel')}
          </Button>
          <Button
            onClick={() => {
              setShowCheckoutWarningModal(false)
              onModalBackPress()
            }}
            type="primary"
            danger
          >
            {t('ui.client-card-financial.edit-payment.exit-now')}
          </Button>
        </div>
      </Modal>

      <FullScreenReportModal
        operations={[OperationType.create]}
        title={t('ui.client-card-financial.edit-invoice')}
        activeDefaultKey={activeKey}
        subTitle={
          invoice_?.paymentStatusTooltip ? (
            <Tooltip
              placement="bottomRight"
              title={invoice_?.paymentStatusTooltip}
            >
              {renderSubtitle()}
            </Tooltip>
          ) : (
            renderSubtitle()
          )
        }
        customOptionBtn={
          <div className={styles.modalCustomHeaderBtns}>
            <Button
              style={{ marginRight: 15 }}
              onClick={() => console.log('Preview')}
            >
              <EyeOutlined />
              {!isMobile && t('ui.client-card-financial.preview')}
            </Button>
            {!isMobile && (
              <Dropdown overlay={customMenu} placement="bottomRight">
                <Button style={{ marginRight: 15 }}>
                  {t('ui.client-card-financial.options')}
                  <DownOutlined style={{ marginLeft: 5 }} />
                </Button>
              </Dropdown>
            )}
            {isMobile && (
              <>
                <Button
                  style={{ marginRight: 15 }}
                  onClick={() => setShowOptionsDrawer((e) => !e)}
                >
                  <MoreOutlined />
                </Button>
                <Drawer
                  title=""
                  placement={'bottom'}
                  closable={true}
                  onClose={() => setShowOptionsDrawer(false)}
                  visible={showOptionsDrawer}
                  key={'bottom'}
                  height={350}
                  headerStyle={{ display: 'none' }}
                  className={styles.editInvoiceOptionDrawer}
                >
                  <div className={styles.dragLine}></div>
                  <div className={styles.optionContainer}>
                    {menuItems.map((i) => (
                      <div
                        key={i.key}
                        className={styles.item}
                        onClick={i.onClick}
                      >
                        {i.body}
                      </div>
                    ))}
                    <div className={styles.footer}>
                      <Button
                        type="primary"
                        block
                        onClick={() => setShowOptionsDrawer((e) => !e)}
                      >
                        {t('ui.client-card-financial.options-close')}
                      </Button>
                    </div>
                  </div>
                </Drawer>
              </>
            )}
          </div>
        }
        visible={true}
        onBackClick={() => {
          setShowCheckoutWarningModal(true)
        }}
        enableCreateBtn={enableCreateBtn}
        createBtnText={t('ui.client-card-financial.save-changes')}
        subMenu={[
          t('ui.client-card-financial.details'),
          t('ui.client-card-financial.items'),
          t('ui.client-card-financial.payments'),
        ]}
        footer={true}
        className={styles.editInvoiceModal}
      >
        <DetailsTab invoice={invoice_} />
        <ItemsTab invoice_={invoice_} toggleSaveBtn={setEnableCreateBtn} />
        <PaymentsTab invoice={invoice_} />
      </FullScreenReportModal>
    </>
  )
}

export default EditInvoice
