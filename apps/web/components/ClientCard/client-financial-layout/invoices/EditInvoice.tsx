import { FullScreenReportModal, OperationType } from '@pabau/ui'
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
import classNames from 'classnames'
import React, { FC, useState } from 'react'
import { ReactComponent as SvgEmail } from '../../../../assets/images/mail.svg'
import { InvoiceProp } from './../ClientFinancialsLayout'
import styles from './EditInvoice.module.less'
import {
  CheckCircleFilled,
  ClockCircleFilled,
  DownOutlined,
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

interface EditInvoiceProps {
  invoice?: InvoiceProp
  onModalBackPress: () => void
}

const EditInvoice: FC<EditInvoiceProps> = ({ invoice, onModalBackPress }) => {
  const [invoice_, setInvoice] = useState(invoice)
  const [enableCreateBtn, setEnableCreateBtn] = useState(
    invoice?.items?.length > 0
  )
  const { t } = useTranslation('common')
  const { Title } = Typography

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
          {invoice_.paid ? (
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
      <Menu.Item key={'credit'} onClick={() => console.log('Credit Note')}>
        <CreditCardOutlined /> {t('ui.client-card-financial.credit-note')}
      </Menu.Item>
      <Menu.Item key={'share'} onClick={() => console.log('Share')}>
        <ShareAltOutlined /> {t('ui.client-card-financial.share')}
      </Menu.Item>
      <Menu.Item key={'print'} onClick={() => console.log('Print')}>
        <PrinterOutlined /> {t('ui.client-card-financial.print')}
      </Menu.Item>
      <Menu.Item key={'history'} onClick={() => setShowHistoryDrawer(true)}>
        <HistoryOutlined /> {t('ui.client-card-financial.history')}
      </Menu.Item>
      <Menu.Item
        className={styles.warningDropdown}
        key={'refund'}
        onClick={() => setShowRefundModal(true)}
      >
        <ReloadOutlined /> {t('ui.client-card-financial.refund')}
      </Menu.Item>
      <Menu.Item
        className={styles.warningDropdown}
        key={'void'}
        onClick={() => setVoidModal(true)}
      >
        <CloseCircleOutlined /> {t('ui.client-card-financial.void')}
      </Menu.Item>
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
              {t('ui.client-card-financial.preview')}
            </Button>
            <Dropdown overlay={customMenu} placement="bottomRight">
              <Button style={{ marginRight: 15 }}>
                {t('ui.client-card-financial.options')}
                <DownOutlined />
              </Button>
            </Dropdown>
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
