import { CloseCircleOutlined, EditOutlined } from '@ant-design/icons'
import { Button, DotButton } from '@pabau/ui'
import { Drawer, Dropdown, Image, Menu } from 'antd'
// import MaskedInput from 'antd-mask-input'
import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import masterCard from '../../assets/images/mastercard.png'
import styles from './PaymentMethods.module.less'

export interface PaymentMethodInformation {
  cardNumber: string
  expiry: string
  cvv: string
}

export interface PaymentMethodsProps {
  methods: PaymentMethodInformation[]
  onChange: (methods: PaymentMethodInformation[]) => void
}

export const PaymentMethods: FC<PaymentMethodsProps> = ({
  onChange,
  methods,
}) => {
  const { t } = useTranslation('common')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [paymentMethods, setPaymentMethods] = useState<
    PaymentMethodInformation[]
  >([])
  const [isAdding, setIsAdding] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [selected, setSelected] = useState(0)
  const [openDrawer, setOpenDrawer] = useState(false)

  useEffect(() => {
    setPaymentMethods(methods)
  }, [methods])

  const getCardType = (ccNum) => {
    const cn = ccNum.replace('-', '')
    const visaRegEx = /^4\d{12}(?:\d{3})?$/
    const mastercardRegEx = /^5[1-5]\d{14}$/
    const amexpRegEx = /^3[47]\d{13}$/
    const discovRegEx = /^6(?:011|5\d\d)\d{12}$/
    let type = ''
    if (visaRegEx.test(cn)) {
      type = 'Visa'
    } else if (mastercardRegEx.test(cn)) {
      type = 'Mastercard'
    } else if (amexpRegEx.test(cn)) {
      type = 'Amex'
    } else if (discovRegEx.test(cn)) {
      type = 'Discover'
    }
    return type
  }

  const handleAddOtherCard = () => {
    setCardNumber('')
    setExpiry('')
    setCvv('')
    setIsAdding(true)
    setIsEditing(false)
  }

  const handleClickMore = (index) => {
    setSelected(index)
    setOpenDrawer(true)
  }

  const handleAddCard = () => {
    setIsAdding(false)
    setIsEditing(false)
    const methods = [...paymentMethods, { cardNumber, expiry, cvv }]
    setPaymentMethods(methods)
    onChange(methods)
  }

  const handleDelete = (index) => {
    const methods = [...paymentMethods]
    methods.splice(index, 1)
    setIsAdding(false)
    setIsEditing(false)
    setPaymentMethods(methods)
    onChange(methods)
  }

  const handleClickEdit = (index) => {
    setSelected(index)
    setCardNumber(paymentMethods[index].cardNumber)
    setExpiry(paymentMethods[index].expiry)
    setCvv(paymentMethods[index].cvv)
    setIsEditing(true)
    setIsAdding(false)
  }

  const handleEditCard = () => {
    const methods = [...paymentMethods]
    methods[selected].cardNumber = cardNumber
    methods[selected].expiry = expiry
    methods[selected].cvv = cvv
    setPaymentMethods([...methods])
    onChange([...methods])
    setIsAdding(false)
    setIsEditing(false)
  }

  const PaymentMethodForm = (
    <div className={styles.paymentMethodForm}>
      <div className={styles.paymentMethodItem}>
        <p>{t('ui.paymentmethods.cardnumber')}</p>
        {/* <MaskedInput
          mask="1111-1111-1111-1111"
          name="card"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        /> */}
      </div>
      <div className={styles.paymentMethodItems}>
        <div className={styles.paymentMethodItem}>
          <p>{t('ui.paymentmethods.expiration')}</p>
          {/* <MaskedInput
            mask="11/11"
            name="expiry"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          /> */}
        </div>
        <div className={styles.paymentMethodItem}>
          <p>{t('ui.paymentmethods.cvv')}</p>
          {/* <MaskedInput
            mask="111"
            name="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          /> */}
        </div>
      </div>
    </div>
  )

  const PaymentMethodList = (
    <div className={styles.paymentMethodList}>
      {paymentMethods.map((method, index) => (
        <div className={styles.paymentMethod} key={`payment-method-${index}`}>
          <div>
            <Image src={masterCard} preview={false} />
          </div>
          <div>
            <p>{`${getCardType(
              method.cardNumber
            )} **** ${method.cardNumber.substring(
              method.cardNumber.length - 4
            )}`}</p>
            <p>
              {t('ui.paymentmethods.expirationdate', { date: method.expiry })}
            </p>
          </div>
          <div>
            <div className={styles.desktopEdit}>
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item onClick={() => handleClickEdit(index)}>
                      <EditOutlined /> {t('ui.paymentmethods.edit')}
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => handleDelete(index)}
                      style={{ color: '#ff5b64' }}
                    >
                      <CloseCircleOutlined /> {t('ui.paymentmethods.delete')}
                    </Menu.Item>
                  </Menu>
                }
                trigger={['click']}
                placement="bottomRight"
                arrow
              >
                <span>
                  <DotButton />
                </span>
              </Dropdown>
            </div>
            <div
              className={styles.mobileEdit}
              onClick={() => handleClickMore(index)}
            >
              <DotButton />
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <>
      <div className={styles.paymentMethodsContainer}>
        {(isAdding || isEditing) && PaymentMethodForm}
        {!isAdding && !isEditing && PaymentMethodList}
        {isAdding && (
          <Button
            block
            type="primary"
            disabled={!cardNumber || !expiry || !cvv}
            onClick={handleAddCard}
          >
            {t('ui.paymentmethods.add')}
          </Button>
        )}
        {isEditing && (
          <Button
            block
            type="primary"
            disabled={!cardNumber || !expiry || !cvv}
            onClick={handleEditCard}
          >
            {t('ui.paymentmethods.edit')}
          </Button>
        )}
        {!isAdding && !isEditing && (
          <Button block type="primary" onClick={handleAddOtherCard}>
            {t('ui.paymentmethods.add.other')}
          </Button>
        )}
        <p className={styles.paymentMethodsDescription}>
          {t('ui.paymentmethods.description')}
        </p>
      </div>
      <Drawer
        className={styles.paymentMethodsDrawer}
        visible={openDrawer}
        closable={false}
        onClose={() => setOpenDrawer(false)}
        placement="bottom"
        height="128px"
      >
        <div className={styles.drawerContainer}>
          <div
            className={styles.drawerHandler}
            onClick={() => setOpenDrawer(false)}
          />
          <div
            className={styles.drawerItem}
            onClick={() => {
              handleClickEdit(selected)
              setOpenDrawer(false)
            }}
          >
            <EditOutlined className={styles.drawerIcon} />
            <span>{t('ui.paymentmethods.edit')}</span>
          </div>
          <div
            className={styles.drawerItem}
            onClick={() => {
              handleDelete(selected)
              setOpenDrawer(false)
            }}
            style={{ color: '#ff5b64' }}
          >
            <CloseCircleOutlined className={styles.drawerIcon} />
            <span>{t('ui.paymentmethods.delete')}</span>
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default PaymentMethods
