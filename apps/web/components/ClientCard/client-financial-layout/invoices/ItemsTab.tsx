import React, { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { InvoiceProp, InvoiceItemProp } from './../ClientFinancialsLayout'
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
  useSaleItemsQuery,
  useGetBillersQuery,
  useGetDiscountsQuery,
  useGetTaxesQuery,
} from '@pabau/graphql'
import EmployeeImg from './../../../../assets/images/users/1.png'
import { useUser } from '../../../../context/UserContext'
import stringToCurrencySignConverter from './../../../../helper/stringToCurrencySignConverter'

interface Invoice {
  invoice_?: InvoiceProp
  toggleSaveBtn?: (e: boolean) => void
}

interface DiscountOptionProp {
  id: number | string
  name: string
  rate: number
  type: string
}

interface TaxOptionProp {
  id: number | string
  name: string
  value: number
}

interface BillersProp {
  id: number
  name: string
  company_id: number
  email: string
  is_disabled: boolean
  image?: string
}

export const calculateDiscount = (amount, discount) => {
  if (!discount) return 0

  if (discount.type === '1') {
    return Number(discount.rate)
  }

  return (Number(amount) / 100) * Number(discount.rate)
}

const ItemsTab: FC<Invoice> = ({ invoice_, toggleSaveBtn }) => {
  const { t } = useTranslation('common')
  const isMobile = useMedia('(max-width: 768px)', false)
  const [invoice, setInvoice] = useState(invoice_)
  const [items, setItems] = useState<InvoiceItemProp[]>([])
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
  const [tipType, setTipType] = useState<number>(
    invoice?.tip?.type ? invoice?.tip?.type : 1
  )
  const [tipStaff, setTipStaff] = useState<number>(
    invoice?.tip?.staff ? invoice?.tip?.staff : 0
  )
  const [tipStaffName, setTipStaffName] = useState<string>('')

  const [invoiceDiscountOptions_, setInvoiceDiscountOptions_] = useState<
    DiscountOptionProp[]
  >([])
  const [taxOptions, setTaxOptions] = useState<TaxOptionProp[]>([])
  const [billers, setBillers] = useState<BillersProp[]>([])
  const [showTipDrawer, setShowTipDrawer] = useState(false)
  const { Option } = Select

  const user = useUser()
  const currencySign = stringToCurrencySignConverter(user?.me?.currency)

  const { data: itemsData } = useSaleItemsQuery({
    variables: {
      guid: invoice.guid,
    },
  })

  useEffect(() => {
    if (tipStaff && billers.length > 0) {
      const staff = billers.find((b) => b.id === tipStaff)
      if (staff) {
        setTipStaffName(staff.name)
      }
    }
  }, [tipStaff, billers])

  useEffect(() => {
    if (itemsData?.items) {
      setItems(
        itemsData?.items.map((e) => {
          return {
            employee: e.Sale?.Biller?.id,
            id: e.id,
            name: e.name,
            price: e.unit_price,
            quantity: e.quantity,
            quantityAllowed: e.Product?.alert_quantity,
            discount: e.discount
              ? {
                  id: e.discount + Math.round(Math.random() * 5000),
                  rate: e.discount,
                  type: '1',
                }
              : null,
            tax: e.Tax?.id ? e.Tax?.id : 0,
            type: e.type,
            productCategory: {
              name: e?.Product?.InvCategory?.category_type,
            },
          }
        })
      )
    }

    /* eslint-disable-next-line */
  }, [itemsData])

  const { data: billersData } = useGetBillersQuery({})
  useEffect(() => {
    if (billersData) {
      setBillers(
        billersData.billers.map((e) => {
          return {
            id: e.id,
            name: e.name,
            company_id: e.company_id,
            email: e.email,
            is_disabled: e.is_disabled,
            image: e.User?.image,
          }
        })
      )
    }
  }, [billersData])

  const { data: discountData } = useGetDiscountsQuery()
  // 1 for flat 2 for percentage
  useEffect(() => {
    if (discountData) {
      const arr = [
        {
          id: 0,
          name: 'No Discount ',
          rate: 0,
          type: '1',
        },
      ]
      discountData.findManyInvTaxRate.map((e) => {
        arr.push({
          id: e.id,
          name: e.name,
          rate: e.amount,
          type: e.type,
        })
        return true
      })

      setInvoiceDiscountOptions_(arr)
    }

    /* eslint-disable-next-line */
  }, [discountData])

  const { data: taxData } = useGetTaxesQuery({})
  useEffect(() => {
    if (taxData) {
      const arr = [
        {
          id: 0,
          name: 'Zero rated (0%)',
          value: 0,
        },
      ]
      taxData.findManyTax.map((e) =>
        arr.push({
          id: e.id,
          name: e.name,
          value: e.rate,
        })
      )
      setTaxOptions(arr)
    }
  }, [taxData])

  useEffect(() => {
    let subTotal_ = 0
    let discountedTotal_ = 0
    let invoiceTotal_ = 0
    let taxTotal_ = 0

    items.map((item) => {
      const subTotal = item.price * item.quantity
      let discount_ = calculateDiscount(subTotal, item.discount)
      discount_ = Math.abs(discount_)
      const discountedTotal = subTotal - discount_
      const selectedTax = taxOptions.find((e) => e.id === item.tax)
      let tax_ = 0
      if (selectedTax) {
        tax_ = (discountedTotal / 100) * selectedTax.value
      }
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
  }, [items, invoiceDiscountOptions_, taxOptions])

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

    const rate = Number(item.customDiscount)
    const name =
      item.customDiscountType === '1'
        ? `Custom: -${currencySign} ${rate}`
        : 'Custom: ' + rate + '%'

    const options_ = invoiceDiscountOptions_.filter(
      (e) => e.name !== name && e.rate !== rate
    )
    const id = options_.length + Math.round(Math.random() * 5000)
    const discountItem = {
      id: id,
      name: name,
      rate: rate,
      type: item.customDiscountType,
    }
    setInvoiceDiscountOptions_([...options_, discountItem])

    onChangeItem(item, 'discount', discountItem)
    onChangeItem(item, 'showDiscountDropDown', false)
  }

  const GetDiscountWithDefaultCustomOptions = (discount) => {
    if (!discount) return invoiceDiscountOptions_

    const name =
      discount.type === '1'
        ? `Custom: -${currencySign} ${discount.rate}`
        : `Custom: ${discount.rate} %`
    const found = invoiceDiscountOptions_.find(
      (e) => e.id === discount.id || e.name === name
    )

    if (found) {
      return invoiceDiscountOptions_
    } else {
      const arr = invoiceDiscountOptions_
      arr.push({
        id: discount.id,
        name: name,
        rate: discount.rate,
        type: discount.type,
      })
      return arr
    }
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
            value={item.customDiscountType === '2' ? item.customDiscount : ''}
            onChange={(e) => {
              onChangeItem(item, 'customDiscountType', '2')
              onChangeItem(item, 'customDiscount', e.target.value)
            }}
          />
          <Input
            prefix={currencySign}
            min={0}
            type="number"
            value={item.customDiscountType === '1' ? item.customDiscount : ''}
            onChange={(e) => {
              onChangeItem(item, 'customDiscountType', '1')
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

  const getItemTotal = (price, discount, quantity, tax) => {
    const subTotal = price * quantity
    let discountAmount = calculateDiscount(subTotal, discount)
    discountAmount = Math.abs(discountAmount)
    const discountedTotal = subTotal - discountAmount

    let taxAmount = 0
    const selectedTax = taxOptions.find((e) => e.id === tax)
    if (selectedTax) {
      taxAmount = selectedTax.value
    }

    const total = discountedTotal + (discountedTotal / 100) * taxAmount
    return total
  }

  const renderTableRow = (item) => {
    const total = getItemTotal(
      item.price,
      item.discount,
      item.quantity,
      item.tax
    )
    const prevItem = itemsData?.items.find((e) => e.id === item.id)
    const prevTotal = getItemTotal(
      prevItem.unit_price,
      {
        rate: prevItem.discount,
        type: '1',
      },
      prevItem.quantity,
      prevItem.Tax?.id ? prevItem.Tax?.id : 0
    )

    const biller = billers.find((x) => x.id === item.employee)
    const billers_ = billers.map((e) => {
      return { id: e.id, label: e.name, icon: e.image }
    })
    let qtyError = false
    if (item.quantityAllowed) {
      qtyError = item.quantity > item.quantityAllowed ? true : false
    }

    return (
      <div
        className={classNames(
          styles.invoiceTabSectionTableRow,
          styles.itemsTableRow,
          qtyError && styles.itemsTableRowError
        )}
        key={item.id}
      >
        <div style={{ width: '20%' }}>
          {billers.length > 0 && (
            <DropdownWithIcon
              value={
                biller
                  ? { id: biller.id, label: biller.name, icon: biller.image }
                  : {
                      id: 0,
                      label: t(
                        'ui.client-card-financial.items.billers-placeholder'
                      ),
                      icon: EmployeeImg,
                    }
              }
              onSelected={(e) => onChangeItem(item, 'employee', e.id)}
              options={billers_}
              // profileError={true}
            />
          )}
        </div>
        <div style={{ width: '20%' }}>
          <div className={styles.itemName}>
            <span>{item.name}</span>
          </div>
        </div>
        <div style={{ width: '8%' }}>
          <Input
            placeholder={t('ui.client-card-financial.items.unit-price')}
            prefix={currencySign}
            value={item.price.toFixed(2)}
            onChange={(e) => {
              const price = Number(e.target.value)
              onChangeItem(item, 'price', price)
            }}
            className={styles.editInvoiceItemPriceField}
          />
        </div>
        <div style={{ width: '8%', position: 'relative' }}>
          <Input
            placeholder={t('ui.client-card-financial.items.quantity')}
            value={item.quantity}
            type="number"
            min={0}
            disabled={
              ['packages', 'service'].indexOf(item.productCategory?.name) !== -1
                ? true
                : false
            }
            onChange={(e) => {
              if (Number(e.target.value) < 0) return
              onChangeItem(item, 'quantity', e.target.value)
            }}
          />
          {qtyError && <div className={styles.itemsFieldError}></div>}
        </div>
        <div style={{ width: '17%' }}>
          <Select
            style={{ width: '100%' }}
            placeholder={t(
              'ui.client-card-financial.items.item.select-discount'
            )}
            value={item.discount?.id}
            onChange={(e) => {
              const disc = GetDiscountWithDefaultCustomOptions(
                item.discount
              ).find((d) => d.id === e)
              onChangeItem(item, 'discount', disc)
            }}
            onDropdownVisibleChange={(e) => {
              onChangeItem(item, 'showDiscountDropDown', e)
            }}
            open={!isMobile ? item.showDiscountDropDown : false}
            disabled={item.productCategory?.name === 'vouchers' ? true : false}
            dropdownRender={(menu) => (
              <div>
                {menu}
                <Divider style={{ margin: '10px 0' }} />
                {renderAddDiscountBody(item)}
              </div>
            )}
          >
            {GetDiscountWithDefaultCustomOptions(item.discount).map((i) => (
              <Option key={i.id} value={i.id}>
                {i.name}
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
              className={styles.itemsDropdownDrawer}
            >
              <div className={styles.dragLine}></div>
              <div className={styles.header}>
                <Title level={5}>
                  {t('ui.client-card-financial.items.item.edit-discount')}
                </Title>
              </div>
              <div className={styles.drawerContainer}>
                {GetDiscountWithDefaultCustomOptions(item.discount).map((i) => (
                  <div
                    key={i.id}
                    className={styles.item}
                    onClick={() => {
                      const disc = GetDiscountWithDefaultCustomOptions(
                        item.discount
                      ).find((d) => d.id === i.id)
                      onChangeItem(item, 'discount', disc)
                      onChangeItem(item, 'showDiscountDropDown', false)
                    }}
                  >
                    {i.name}
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
            value={item.tax}
            onChange={(e) => onChangeItem(item, 'tax', e)}
            onDropdownVisibleChange={(e) => {
              onChangeItem(item, 'showTaxDropDown', e)
            }}
            open={!isMobile ? item.showTaxDropDown : false}
          >
            {taxOptions.map((i) => (
              <Option key={i.id} value={i.id}>
                {i.name}
              </Option>
            ))}
          </Select>
          {isMobile && (
            <Drawer
              title=""
              placement={'bottom'}
              closable={true}
              onClose={() => onChangeItem(item, 'showTaxDropDown', false)}
              visible={item.showTaxDropDown}
              key={'bottom'}
              height={400}
              headerStyle={{ display: 'none' }}
              className={styles.itemsDropdownDrawer}
            >
              <div className={styles.dragLine}></div>
              <div className={styles.header}>
                <Title level={5}>
                  {t('ui.client-card-financial.items.item.edit-tax')}
                </Title>
              </div>
              <div
                className={styles.drawerContainer}
                style={{ paddingBottom: 70 }}
              >
                {taxOptions.map((i) => (
                  <div
                    key={i.id}
                    className={styles.item}
                    onClick={() => {
                      onChangeItem(item, 'tax', i.id)
                      onChangeItem(item, 'showTaxDropDown', false)
                    }}
                  >
                    {i.name ? i.name : i.id}
                  </div>
                ))}
              </div>
              <div
                className={styles.addDiscountFooter}
                style={{ height: 50, padding: 10 }}
              >
                <Button
                  type="primary"
                  onClick={() => onChangeItem(item, 'showTaxDropDown', false)}
                  block
                >
                  {t('ui.client-card-financial.items.item.cancel')}
                </Button>
              </div>
            </Drawer>
          )}
        </div>

        <div style={{ width: '10%' }} className={styles.totalPriceColumn}>
          <span
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <span>{`${currencySign}${numbertoAmountFormat(total)}`}</span>
            {prevTotal > total && (
              <del style={{ fontSize: 11 }}>
                {currencySign}
                {numbertoAmountFormat(prevTotal)}
              </del>
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
    if (Number(tipAmount) < 1 || tipStaff === 0) return
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

  let uniqueBillers = items?.map((item, i, ar) => item.employee)
  uniqueBillers = [...new Set(uniqueBillers)]

  const addTipContent = () => {
    return (
      <div
        className={classNames(
          styles.addTipBodyContent,
          isMobile && styles.addTipBodyContentMobileView
        )}
      >
        <div className={styles.row}>
          <span className={styles.title}>
            {t('ui.client-card-financial.items.tip-amount')}
            {' ('}
            {tipType === 2
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
                prefix={tipType === 1 ? currencySign : '%'}
                value={tipAmount}
                min="0"
                onChange={(e) => {
                  if (Number(e.target.value) < 0) return
                  return setTipAmount(e.target.value)
                }}
              />
            </div>
            <div className={styles.bodyTipTypeField}>
              <div
                className={classNames(
                  styles.option,
                  tipType === 1 ? styles.optionSelected : null
                )}
                onClick={() => setTipType(1)}
              >
                {currencySign}
              </div>
              <div
                className={classNames(
                  styles.option,
                  tipType === 2 ? styles.optionSelected : null
                )}
                onClick={() => setTipType(2)}
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
            {billers.length > 0 && (
              <Select
                style={{ width: '100%' }}
                value={tipStaff}
                onChange={(e) => setTipStaff(e)}
              >
                <Select.Option value={0} key={0}>
                  Select Staff
                </Select.Option>
                {uniqueBillers.length > 1
                  ? billers.map((emp) => {
                      if (uniqueBillers.indexOf(emp.id) !== -1) {
                        return (
                          <Select.Option value={emp.id} key={emp.id}>
                            {emp.name}
                          </Select.Option>
                        )
                      }
                      return true
                    })
                  : billers.map((emp) => {
                      return (
                        <Select.Option value={emp.id} key={emp.id}>
                          {emp.name}
                        </Select.Option>
                      )
                    })}
              </Select>
            )}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.buttonRow}>
            {isMobile && (
              <>
                <Button onClick={() => setShowTipDrawer(false)} block>
                  {t('ui.client-card-financial.items.cancel')}
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    setShowTipDrawer(false)
                    onPressTipSave()
                  }}
                  block
                >
                  {t('ui.client-card-financial.items.save')}
                </Button>
              </>
            )}
            {!isMobile && (
              <Button type="primary" onClick={onPressTipSave}>
                {t('ui.client-card-financial.items.save')}
              </Button>
            )}
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
          <Button type="primary">
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
                <span>
                  {currencySign}
                  {numbertoAmountFormat(discountedGTotal)}
                </span>
              </div>
              <div>
                <span>
                  {currencySign}
                  {numbertoAmountFormat(subGTotal)}
                </span>
              </div>
              <div>
                <span>
                  {currencySign}
                  {numbertoAmountFormat(taxGTotal)}
                </span>
              </div>
              <div>
                <span>
                  {currencySign}
                  {numbertoAmountFormat(invoiceGTotal)}
                </span>
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
                {`Tip for ${tipStaffName} ${currencySign}${
                  tipType === 2
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
              <span>
                {currencySign}
                {numbertoAmountFormat(discountedGTotal)}
              </span>
            </div>
            <div>
              <span className={styles.subtotal}>
                {currencySign}
                {numbertoAmountFormat(subGTotal)}
              </span>
            </div>
            <div>
              <span>
                {currencySign}
                {numbertoAmountFormat(taxGTotal)}
              </span>
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
                <>
                  <span onClick={() => setShowTipDrawer(true)}>
                    <PlusOutlined />{' '}
                    {t('ui.client-card-financial.items.add-tip')}
                  </span>
                  <Drawer
                    title=""
                    placement={'bottom'}
                    closable={true}
                    onClose={() => setShowTipDrawer(false)}
                    visible={showTipDrawer}
                    key={'bottom'}
                    height={300}
                    headerStyle={{ display: 'none' }}
                    className={styles.itemsDropdownDrawer}
                  >
                    <div className={styles.dragLine}></div>
                    <div className={styles.header}>
                      <Title level={5}>Add Tip</Title>
                    </div>
                    <div
                      className={styles.drawerContainer}
                      style={{ paddingBottom: 0, height: 'calc(100% - 50px)' }}
                    >
                      {addTipContent()}
                    </div>
                  </Drawer>
                </>
              ) : (
                <div>
                  <span className={styles.removeTipText}>
                    {`Tip for ${tipStaffName} ${currencySign}${
                      tipType === 2
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
              <span>
                {currencySign}
                {numbertoAmountFormat(invoiceGTotal)}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ItemsTab
