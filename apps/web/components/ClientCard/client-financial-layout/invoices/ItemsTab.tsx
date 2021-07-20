import React, { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { InvoiceProp } from './../ClientFinancialsLayout'
import styles from './Tabs.module.less'
import { Popover, Modal } from 'antd'
import {
  Typography,
  Button,
  Menu,
  Dropdown,
  Select,
  Input,
  InputNumber,
} from 'antd'
import {
  DownOutlined,
  PlusOutlined,
  HeartOutlined,
  WalletOutlined,
  TagOutlined,
  CodeSandboxOutlined,
  CarryOutOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import { useMedia } from 'react-use'
import { DropdownWithIcon, CheckboxTree } from '@pabau/ui'
import classNames from 'classnames'
import {
  invoiceItemsOptions,
  invoiceDiscountOptions,
  invoiceTaxOptions,
  invoiceEmployeeOptions,
  serviceData,
} from '../../../../pages/test/ClientCardMock'

interface Invoice {
  invoice?: InvoiceProp
}

const ItemsTab: FC<Invoice> = ({ invoice }) => {
  const { t } = useTranslation('common')
  const isMobile = useMedia('(max-width: 768px)', false)
  const [items, setItems] = useState(invoice?.items ? invoice?.items : [])
  const [subGTotal, setSubGTotal] = useState<number>(0)
  const [discountedGTotal, setDiscountedGTotal] = useState<number>(0)
  const [invoiceGTotal, setInvoiceGTotal] = useState<number>(0)
  const [taxGTotal, setTaxGTotal] = useState<number>(0)
  const [tipAmount, setTipAmount] = useState<string>(
    invoice?.tip?.amount ? invoice?.tip?.amount : '0'
  )
  const [tipType, setTipType] = useState<string>(
    invoice?.tip?.type ? invoice?.tip?.type : 'ZAR'
  )
  const [tipStaff, setTipStaff] = useState<string>(
    invoice?.tip?.staff ? invoice?.tip?.staff : ''
  )
  const { Option } = Select

  useEffect(() => {
    let subTotal_ = 0
    let discountedTotal_ = 0
    let invoiceTotal_ = 0
    let taxTotal_ = 0

    items.map((item) => {
      const subTotal = item.price * item.quantity
      const discount_ = (subTotal / 100) * item.discount
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

  const addMenuItems = [
    {
      key: 'service',
      value: t('ui.client-card-financial.items.service'),
      icon: <HeartOutlined />,
    },
    {
      key: 'product',
      value: t('ui.client-card-financial.items.product'),
      icon: <CarryOutOutlined />,
    },
    {
      key: 'package',
      value: t('ui.client-card-financial.items.package'),
      icon: <CodeSandboxOutlined />,
    },
    {
      key: 'gift_voucher',
      value: t('ui.client-card-financial.items.gift-voucher'),
      icon: <TagOutlined />,
    },
    {
      key: 'account_balance',
      value: t('ui.client-card-financial.items.account-balance'),
      icon: <WalletOutlined />,
    },
  ]

  const { Title } = Typography
  const [selectedAddItem, setSelectedAddItem] = useState(addMenuItems[0].key)
  const [addServiceModal, setAddServiceModal] = useState(false)

  const [expandedKeys, setExpandedKeys] = useState(['Seasonal Offers'])
  const [checkedKeys, setCheckedKeys] = useState(['4 ml contour package'])
  const [autoExpandParent, setAutoExpandParent] = useState(true)

  const onAddItemChange = (e) => {
    setSelectedAddItem(e)

    if (['gift_voucher', 'account_balance'].indexOf(e) === -1) {
      setAddServiceModal(true)
    }
  }

  const addMenu = (
    <Menu
      onClick={(e) => onAddItemChange(e.key)}
      className={styles.itemsHeaderAddItems}
    >
      {addMenuItems.map((i) => {
        const itemsSelected = selectedAddItem === i.key ? true : false
        return (
          <Menu.Item
            key={i.key}
            icon={itemsSelected ? <CheckOutlined /> : null}
            className={classNames(itemsSelected ? styles.selectedItem : null)}
          >
            {i.icon}
            {i.value}
          </Menu.Item>
        )
      })}
    </Menu>
  )

  const renderTableRow = (item) => {
    const subTotal = item.price * item.quantity
    const discountedTotal = subTotal - (subTotal / 100) * item.discount
    const total = (
      discountedTotal +
      (discountedTotal / 100) * item.tax
    ).toFixed(2)

    return (
      <div
        className={classNames(
          styles.invoiceTabSectionTableRow,
          styles.itemsTableRow
        )}
        key={item.id}
      >
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
            placeholder={t('ui.client-card-financial.items.item.select-item')}
            onChange={(e) => onChangeItem(item, 'name', e)}
            defaultValue={item.name}
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
            onChange={(e) => onChangeItem(item, 'price', e.target.value)}
          />
        </div>
        <div style={{ width: '8%' }}>
          <InputNumber
            placeholder={t('ui.client-card-financial.items.quantity')}
            value={item.quantity}
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
          >
            {invoiceTaxOptions.map((i) => (
              <Option key={i.key} value={i.key}>
                {i.value}
              </Option>
            ))}
          </Select>
        </div>
        <div style={{ width: '10%' }} className={styles.totalPriceColumn}>
          <span>{`£ ${total}`}</span>
          <span onClick={() => removeItem(item)}>
            <CloseOutlined />
          </span>
        </div>
      </div>
    )
  }

  const onChangeItem = (obj, key, value) => {
    const items_ = items?.filter((o) => {
      if (o.id === obj.id) o[key] = value

      return o
    })
    setItems(items_)
  }

  const removeItem = (obj) => {
    const items_ = items?.filter((o) => o.id !== obj.id)
    setItems(items_)
  }

  const onPressTipSave = () => {
    if (!invoice) return
    const invoice_ = invoice

    invoice_['tip'] = {
      amount: tipAmount,
      type: tipType,
      staff: tipStaff,
    }

    console.log(invoice_)
  }

  const addTipContent = () => {
    return (
      <div className={styles.addTipBodyContent}>
        <div className={styles.row}>
          <span className={styles.title}>
            {t('ui.client-card-financial.items.tip-amount')} (0.00%)
          </span>
          <div className={styles.bodyRow}>
            <div className={styles.bodyAmountField}>
              <Input
                placeholder={t('ui.client-card-financial.items.unit-price')}
                prefix={tipType}
                value={tipAmount}
                onChange={(e) => setTipAmount(e.target.value)}
              />
            </div>
            <div className={styles.bodyTipTypeField}>
              <div
                className={classNames(
                  styles.option,
                  tipType === 'ZAR' ? styles.optionSelected : null
                )}
                onClick={() => setTipType('ZAR')}
              >
                ZAR
              </div>
              <div
                className={classNames(
                  styles.option,
                  tipType === '%' ? styles.optionSelected : null
                )}
                onClick={() => setTipType('%')}
              >
                %
              </div>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <span className={styles.title}>
            {t('ui.client-card-financial.items.staff-tipped')}
          </span>
          <div className={styles.bodyRow}>
            <Select
              style={{ width: '100%' }}
              defaultValue={tipStaff}
              onChange={(e) => setTipStaff(e)}
            >
              {invoiceEmployeeOptions.map((emp) => {
                return (
                  <Select.Option value={emp.label} key={emp.label}>
                    {emp.label}
                  </Select.Option>
                )
              })}
            </Select>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.buttonRow}>
            <Button type="primary" onClick={onPressTipSave}>
              {t('ui.client-card-financial.items.save')}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const onCheck = (checkedKeysValue: string[]) => {
    setCheckedKeys([checkedKeysValue[checkedKeysValue.length - 1]])
  }

  const onExpand = (expandedKeysValue: string[]) => {
    setExpandedKeys(expandedKeysValue)
    setAutoExpandParent(false)
  }

  return (
    <>
      <Modal
        title={t('ui.client-card-financial.items.select-services')}
        visible={addServiceModal}
        wrapClassName={styles.addItemModalContent}
        onCancel={() => setAddServiceModal(false)}
        footer={false}
      >
        <CheckboxTree
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          treeData={serviceData}
        />
        <div className={styles.btnsRow}>
          <Button type="primary" onClick={() => setAddServiceModal(false)}>
            {t('ui.client-card-financial.items.save-service')}
          </Button>
        </div>
      </Modal>

      <div className={styles.invoiceTabsContainer}>
        <div className={styles.invoiceTabSectionHeader}>
          <Title level={5}>{t('ui.client-card-financial.items')}</Title>
          <Dropdown overlay={addMenu}>
            <Button type="primary">
              <PlusOutlined />
              {t('ui.client-card-financial.items.add')}
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        <div className={styles.invoiceTabSectionTableHeader}>
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
        {!isMobile && (
          <>
            <div className={styles.itemsTableFooter}>
              <div></div>
              <div>
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
                <div>
                  <span>
                    {t('ui.client-card-financial.items.invoice-total')}
                  </span>
                </div>
              </div>
            </div>

            <div
              className={classNames(
                styles.itemsTableFooter,
                styles.itemsTableFooterTotal
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
            <div className={styles.itemsTableAddTipRow}>
              <Popover
                content={addTipContent}
                title={t('ui.client-card-financial.items.add-tip')}
                trigger={'click'}
                placement={'topRight'}
                overlayClassName={styles.addTipBody}
              >
                <span>
                  <PlusOutlined /> {t('ui.client-card-financial.items.add-tip')}
                </span>
              </Popover>
            </div>
          </>
        )}
        {isMobile && (
          <>
            <div className={styles.itemsTableFooterMobile}>
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
                styles.itemsTableFooterMobile,
                styles.itemsTableFooterMobileTotal
              )}
            >
              <div>
                <span>£{discountedGTotal.toFixed(2)}</span>
              </div>
              <div>
                <span className={styles.subtotal}>£{subGTotal.toFixed(2)}</span>
              </div>
              <div>
                <span>£{taxGTotal.toFixed(2)}</span>
              </div>
            </div>
            <div
              className={classNames(
                styles.itemsTableFooterMobile,
                styles.itemsTableFooterMobileInTotal
              )}
            >
              <div></div>
              <div>
                <span>{t('ui.client-card-financial.items.invoice-total')}</span>
              </div>
            </div>
            <div
              className={classNames(
                styles.itemsTableFooterMobile,
                styles.itemsTableFooterMobileInTotal,
                styles.itemsTableFooterMobileTotal
              )}
            >
              <div>
                <Popover
                  content={addTipContent}
                  title={t('ui.client-card-financial.items.add-tip')}
                  trigger={'click'}
                  placement={'topRight'}
                  overlayClassName={styles.addTipBody}
                >
                  <span className={styles.addTipMobileLabel}>
                    <PlusOutlined />{' '}
                    {t('ui.client-card-financial.items.add-tip')}
                  </span>
                </Popover>
              </div>
              <div>
                <span>£{invoiceGTotal.toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default ItemsTab
