import React, { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { InvoiceProp } from './../ClientFinancialsLayout'
import styles from './Tabs.module.less'
import { Popover } from 'antd'
import { Typography, Button, Select, Input, Divider, Drawer } from 'antd'
import {
  DownOutlined,
  PlusOutlined,
  HeartOutlined,
  WalletOutlined,
  TagOutlined,
  CodeSandboxOutlined,
  CarryOutOutlined,
  ShoppingCartOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import { useMedia } from 'react-use'
import { DropdownWithIcon, DropdownOptionsTree } from '@pabau/ui'
import classNames from 'classnames'
import {
  invoiceItemsOptions,
  invoiceDiscountOptions,
  invoiceTaxOptions,
  invoiceEmployeeOptions,
} from '../../../../pages/test/ClientCardMock'

interface Invoice {
  invoice_?: InvoiceProp
  toggleSaveBtn?: (e: boolean) => void
}

interface DiscountOptionProp {
  key: number | string
  value: string
}

export const calculateDiscount = (amount, discount = undefined) => {
  if (!discount) return 0

  if (discount.indexOf && discount.indexOf('CA-') !== -1) {
    return Number(discount.replace('CA-', ''))
  }

  if (discount.replace) discount = discount.replace('CP-', '')
  return (amount / 100) * discount
}

const ItemsTab: FC<Invoice> = ({ invoice_, toggleSaveBtn }) => {
  const { t } = useTranslation('common')
  const isMobile = useMedia('(max-width: 768px)', false)
  const [invoice, setInvoice] = useState(invoice_)
  const [items, setItems] = useState(
    invoice?.items
      ? invoice?.items.map((e) => {
          e.itemPrice = e.price
          return e
        })
      : []
  )
  const [subGTotal, setSubGTotal] = useState<number>(0)
  const [discountedGTotal, setDiscountedGTotal] = useState<number>(0)
  const [invoiceGTotal, setInvoiceGTotal] = useState<number>(0)
  const [taxGTotal, setTaxGTotal] = useState<number>(0)
  const [invoiceHasTipAmount, setInvoiceHasTipAmount] = useState(
    invoice?.tip?.amount ? true : false
  )
  const [tipAmount, setTipAmount] = useState<string>(
    invoice?.tip?.amount ? invoice?.tip?.amount : '0'
  )
  const [tipType, setTipType] = useState<string>(
    invoice?.tip?.type ? invoice?.tip?.type : 'ZAR'
  )
  const [tipStaff, setTipStaff] = useState<string>(
    invoice?.tip?.staff ? invoice?.tip?.staff : ''
  )
  const [invoiceDiscountOptions_, setInvoiceDiscountOptions_] = useState<
    DiscountOptionProp[]
  >(invoiceDiscountOptions)
  const { Option } = Select

  useEffect(() => {
    let subTotal_ = 0
    let discountedTotal_ = 0
    let invoiceTotal_ = 0
    let taxTotal_ = 0

    items.map((item) => {
      const subTotal = item.price * item.quantity
      const discount_ = calculateDiscount(subTotal, item.discount)
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

  const numbertoAmountFormat = (e) => {
    e = (e ?? 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    return e
  }

  const { Title } = Typography

  const serviceData = [
    {
      key: 'service',
      title: 'Service',
      icon: <HeartOutlined />,
      childrens: [
        {
          title: 'Seasonal Offers',
          key: 'Seasonal Offers',
          subtitle: '1h 30min',
          childrenCount: 3,
          childrens: [
            {
              title: '4 ml contour service',
              key: '4 ml contour service',
              subtitle: '1h',
              price: '£149',
            },
            {
              title: '2 ml contour service',
              key: '2 ml contour service',
              subtitle: '30 min',
              price: '£139',
            },
            {
              title: '1 ml filler service',
              key: '1 ml filler service',
              subtitle: '1h',
              price: '£40',
            },
          ],
        },
        {
          title: 'Special Offers (12)',
          key: 'Special Offers',
          subtitle: '2h',
          childrenCount: 1,
          childrens: [
            {
              title: '4 ml contour offer',
              key: '4 ml contour offer',
              subtitle: '2h 30 min',
              price: '£155',
            },
          ],
        },
      ],
    },
    {
      key: 'product',
      title: 'Product',
      icon: <CarryOutOutlined />,
      childrens: [
        {
          title: 'Seasonal Offers',
          key: 'Seasonal Offers',
          subtitle: '1h 30min',
          childrenCount: 3,
          childrens: [
            {
              title: '4 ml contour service',
              key: '4 ml contour service',
              subtitle: '1h',
              price: '£149',
            },
            {
              title: '2 ml contour service',
              key: '2 ml contour service',
              subtitle: '30 min',
              price: '£139',
            },
            {
              title: '1 ml filler service',
              key: '1 ml filler service',
              subtitle: '1h',
              price: '£40',
            },
          ],
        },
        {
          title: 'Special Offers (12)',
          key: 'Special Offers',
          subtitle: '2h',
          childrenCount: 1,
          childrens: [
            {
              title: '4 ml contour offer',
              key: '4 ml contour offer',
              subtitle: '2h 30 min',
              price: '£155',
            },
          ],
        },
      ],
    },
    {
      key: 'package',
      title: 'Package',
      icon: <CodeSandboxOutlined />,
    },
    {
      key: 'gift_voucher',
      title: 'Gift Voucher',
      icon: <TagOutlined />,
    },
    {
      key: 'account_balance',
      title: 'Account Balance',
      icon: <WalletOutlined />,
    },
  ]

  const addDiscount = (item) => {
    if (!item.customDiscount) {
      return onChangeItem(item, 'showDiscountDropDown', false)
    }

    const key =
      item.customDiscountType === 'CA'
        ? 'CA-' + item.customDiscount
        : 'CP-' + item.customDiscount

    const value =
      item.customDiscountType === 'CA'
        ? 'Custom: -£' + item.customDiscount
        : 'Custom: ' + item.customDiscount + '%'

    const options_ = invoiceDiscountOptions_.filter((e) => e.key !== key)

    onChangeItem(item, 'discount', key)
    onChangeItem(item, 'showDiscountDropDown', false)

    setInvoiceDiscountOptions_([
      ...options_,
      {
        key: key,
        value: value,
      },
    ])
  }

  const addAutoDiscount = (item, discount) => {
    const key = 'CA-' + discount
    const options_ = invoiceDiscountOptions_.filter((e) => e.key !== key)

    setInvoiceDiscountOptions_([
      ...options_,
      {
        key: key,
        value: 'Custom: -£' + discount,
      },
    ])

    onChangeItem(item, 'discount', key)
    onChangeItem(item, 'showDiscountDropDown', false)
  }

  const renderAddDiscountBody = (item) => {
    return (
      <div className={styles.addDiscountFooter}>
        {!isMobile && (
          <div className={styles.customLabelCont}>
            <span>Custom</span>
          </div>
        )}
        <div className={styles.customDiscountCont}>
          <Input
            prefix={'%'}
            min={0}
            max={100}
            type="number"
            value={item.customDiscountType === 'CP' ? item.customDiscount : ''}
            onChange={(e) => {
              onChangeItem(item, 'customDiscountType', 'CP')
              onChangeItem(item, 'customDiscount', e.target.value)
            }}
          />
          <Input
            prefix={'£'}
            min={0}
            type="number"
            value={item.customDiscountType === 'CA' ? item.customDiscount : ''}
            onChange={(e) => {
              onChangeItem(item, 'customDiscountType', 'CA')
              onChangeItem(item, 'customDiscount', e.target.value)
            }}
          />
        </div>
        {isMobile ? (
          <div className={styles.addDiscountRow}>
            <Button
              onClick={() => onChangeItem(item, 'showDiscountDropDown', false)}
            >
              Cancel
            </Button>
            <Button type="primary" onClick={() => addDiscount(item)}>
              Save
            </Button>
          </div>
        ) : (
          <div className={styles.addDiscountRow}>
            <span
              style={{
                color: '#54b2d3',
                fontSize: 12,
                cursor: 'pointer',
              }}
              onClick={() => addDiscount(item)}
            >
              {t('ui.client-card-financial.items.item.add-discount')}
            </span>
          </div>
        )}
      </div>
    )
  }

  const renderTableRow = (item) => {
    const subTotal = item.price * item.quantity
    const discountedTotal =
      subTotal - calculateDiscount(subTotal, item.discount)
    const total = numbertoAmountFormat(
      discountedTotal + (discountedTotal / 100) * item.tax
    )

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
            value={item.price.toFixed(2)}
            onChange={(e) => {
              const price = Number(e.target.value)
              const prevItem = items.find((e) => {
                return e.id === item.id
              })
              if (prevItem.itemPrice > price) {
                addAutoDiscount(item, prevItem.itemPrice - price)
              }
              onChangeItem(item, 'price', price)
            }}
            className={styles.editInvoiceItemPriceField}
            disabled={item.discount === 0 ? false : true}
          />
        </div>
        <div style={{ width: '8%' }}>
          <Input
            placeholder={t('ui.client-card-financial.items.quantity')}
            value={item.quantity}
            type="number"
            min={0}
            onChange={(e) => {
              if (Number(e.target.value) < 0) return
              onChangeItem(item, 'quantity', e.target.value)
            }}
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
            onDropdownVisibleChange={(e) => {
              onChangeItem(item, 'showDiscountDropDown', e)
            }}
            value={item.discount}
            open={!isMobile ? item.showDiscountDropDown : false}
            dropdownRender={(menu) => (
              <div>
                {menu}
                <Divider style={{ margin: '10px 0' }} />
                {renderAddDiscountBody(item)}
              </div>
            )}
          >
            {invoiceDiscountOptions_.map((i) => (
              <Option key={i.key} value={i.key}>
                {i.value}
              </Option>
            ))}
          </Select>
          {isMobile && (
            <Drawer
              title=""
              placement={'bottom'}
              closable={true}
              onClose={() => onChangeItem(item, 'showDiscountDropDown', false)}
              visible={item.showDiscountDropDown}
              key={'bottom'}
              height={400}
              headerStyle={{ display: 'none' }}
              className={styles.itemsDiscountDrawer}
            >
              <div className={styles.header}>
                <Title level={5}>Edit Lead</Title>
              </div>
              <div className={styles.drawerContainer}>
                {invoiceDiscountOptions_.map((i) => (
                  <div
                    key={i.key}
                    className={styles.item}
                    onClick={() => {
                      onChangeItem(item, 'discount', i.key)
                      onChangeItem(item, 'showDiscountDropDown', false)
                    }}
                  >
                    {i.value}
                  </div>
                ))}
              </div>
              {renderAddDiscountBody(item)}
            </Drawer>
          )}
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
          <span
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <span>{`£${total}`}</span>
            {item.itemPrice > item.price && (
              <del style={{ fontSize: 12 }}>{`£${numbertoAmountFormat(
                item.itemPrice
              )}`}</del>
            )}
          </span>
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
    if (items_.length === 0) {
      toggleSaveBtn(false)
    }
  }

  const onPressTipSave = () => {
    if (!invoice) return
    const invoice_ = invoice

    invoice_['tip'] = {
      amount: tipAmount,
      type: tipType,
      staff: tipStaff,
    }

    setInvoiceHasTipAmount(true)
    setInvoice(invoice_)
  }

  const removeTip = () => {
    const invoice_ = invoice

    setInvoiceHasTipAmount(false)

    invoice_['tip'] = undefined
    setInvoice(invoice_)
  }

  const addTipContent = () => {
    return (
      <div className={styles.addTipBodyContent}>
        <div className={styles.row}>
          <span className={styles.title}>
            {t('ui.client-card-financial.items.tip-amount')}
            {' ('}
            {tipType === '%'
              ? `${numbertoAmountFormat(
                  (invoiceGTotal / 100) * Number(tipAmount)
                )}`
              : numbertoAmountFormat(Number(tipAmount))}
            {')'}
          </span>
          <div className={styles.bodyRow}>
            <div className={styles.bodyAmountField}>
              <Input
                type="number"
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

  return (
    <div className={styles.invoiceTabsContainer}>
      <div className={styles.invoiceTabSectionHeader}>
        <Title level={5}>{t('ui.client-card-financial.items')}</Title>
        <DropdownOptionsTree
          btnContent={
            <div className={styles.invoiceAddItemBtn}>
              <PlusOutlined />
              {t('ui.client-card-financial.items.add')}
              <DownOutlined />
            </div>
          }
          mobileBtnContent={<PlusOutlined />}
          dropDownTitle={t('ui.client-card-financial.items.add-item')}
          options={serviceData}
          onItemSelect={(e) => console.log('onItemSelect', e)}
        />
      </div>
      <div className={styles.invoiceTabSectionScrollContainer}>
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
      </div>
      {items.length === 0 && (
        <div className={styles.itemsEmptyContainer}>
          <ShoppingCartOutlined />
          <p>{t('ui.client-card-financial.items.items-empty')}</p>
          <Button
            type="primary"
            onClick={() => console.log('add item to sale')}
          >
            {t('ui.client-card-financial.items.add-item-to-sale')}
          </Button>
        </div>
      )}
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
                <span>{t('ui.client-card-financial.items.invoice-total')}</span>
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
                <span>£{numbertoAmountFormat(discountedGTotal)}</span>
              </div>
              <div>
                <span>£{numbertoAmountFormat(subGTotal)}</span>
              </div>
              <div>
                <span>£{numbertoAmountFormat(taxGTotal)}</span>
              </div>
              <div>
                <span>£{numbertoAmountFormat(invoiceGTotal)}</span>
              </div>
            </div>
          </div>
          <div className={styles.itemsTableAddTipRow}>
            {!invoiceHasTipAmount ? (
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
            ) : (
              <span className={styles.removeTipText}>
                {`Tip for ${tipStaff} £${
                  tipType === '%'
                    ? numbertoAmountFormat(
                        (invoiceGTotal / 100) * Number(tipAmount)
                      )
                    : numbertoAmountFormat(Number(tipAmount))
                } `}
                <CloseOutlined onClick={removeTip} />
              </span>
            )}
          </div>
        </>
      )}
      {isMobile && (
        <>
          <div className={styles.itemsTableFooterMobile}>
            <div>
              <span>{t('ui.client-card-financial.items.total-discount')}</span>
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
              <span>£{numbertoAmountFormat(discountedGTotal)}</span>
            </div>
            <div>
              <span className={styles.subtotal}>
                £{numbertoAmountFormat(subGTotal)}
              </span>
            </div>
            <div>
              <span>£{numbertoAmountFormat(taxGTotal)}</span>
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
            <div className={styles.itemsFooterRowWithTip}>
              {!invoiceHasTipAmount ? (
                <Popover
                  content={addTipContent}
                  title={t('ui.client-card-financial.items.add-tip')}
                  trigger={'click'}
                  placement={'topRight'}
                  overlayClassName={styles.addTipBody}
                >
                  <span>
                    <PlusOutlined />{' '}
                    {t('ui.client-card-financial.items.add-tip')}
                  </span>
                </Popover>
              ) : (
                <div>
                  <span className={styles.removeTipText}>
                    {`Tip for ${tipStaff} £${
                      tipType === '%'
                        ? numbertoAmountFormat(
                            (invoiceGTotal / 100) * Number(tipAmount)
                          )
                        : numbertoAmountFormat(Number(tipAmount))
                    } `}
                    <CloseOutlined onClick={removeTip} />
                  </span>
                </div>
              )}
            </div>
            <div>
              <span>£{numbertoAmountFormat(invoiceGTotal)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ItemsTab
