import React, { FC, useState } from 'react'
import styles from './payment.module.less'
import moment from 'moment'
import { Formik } from 'formik'
import { Form, SubmitButton, Input } from 'formik-antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import strip from '../../assets/images/stripe.png'
import visa from '../../assets/images/visa.png'
import master from '../../assets/images/master.png'
//import classNames from 'classnames'
//import styles from '../bookingdetails/bookingdetail.module.less'
import * as Yup from 'yup'
import { DatePicker, Input as input } from 'antd'
import { Button } from '@pabau/ui'
//import { useNotification } from '../../../web/hooks/useNotification'

/* eslint-disable-next-line */
export interface PaymentProps {
  changescreen: () => void
  type: string
  translation: (val: string) => string
  price: string
}

const Payment: FC<PaymentProps> = ({
  changescreen,
  type,
  translation,
  price,
}) => {
  const [promoInput, setpromoInput] = useState('')
  const [pr, setpr] = useState(price)
  // const [apply, setapply] = useState(false)
  //const { notificationTypes, pushNotification } = useNotification()
  const intial = {
    cardnumber: '',
    expDate: '',
    cvv: '',
  }
  const formikValidationSchema = Yup.object({
    cardnumber: Yup.string()
      .min(16)
      .max(16)
      .required('Please enter valid number'),
    expDate: Yup.date()
      .required('Expiry Date is required')
      .min(moment().set({ hour: 0, minutes: 0 }), 'Please enter valid date')
      .typeError('Invalid date'),
    // Yup.date()
    // .max(moment().toDate(), "You can't be born in the future!")
    // .required('Expiry Date is required'),

    // Yup.date()
    // .required('You must specify a depart date')
    // .min(
    //   moment().set({ hour: 0, minutes: 0 }),
    //   'You cannot depart in the past'
    // )
    // .typeError('Invalid date'),

    cvv: Yup.string().min(3).max(3).required('Please enter valid number'),
  })
  // Yup.date()
  //   .required('Expiry Date is required')
  //   .min(moment().set({ hour: 0, minutes: 0 }), 'Please enter valid date')
  //   .typeError('Invalid date')
  const notifyAppointmentBooked = () => {
    // const notification = {
    //   type: notificationTypes.NEW_APPOINTMENT_VIA_CALENDAR,
    //   sentTo: [83247],
    //   destination: '',
    //   variable: {
    //     who: 'Olivia Sanders',
    //     service_name: 'Chemical Peel',
    //     client_name: 'John Smith',
    //     date: Intl.DateTimeFormat('en-US').format(new Date()),
    //     time: Intl.DateTimeFormat('en-US', {
    //       hour: 'numeric',
    //       minute: 'numeric',
    //     }).format(new Date()),
    //   },
    // }
    // pushNotification(notification)
  }

  return (
    <>
      <div className={styles.paymentWrapper}>
        <h3>{translation('connect.onlinebooking.payment.title')}</h3>
        <div className={styles.paymentDetails}>
          <div className={styles.contentTask}>
            <h6>
              {translation('connect.onlinebooking.payment.appoitmenttype')}
            </h6>
            <p>{type}</p>
          </div>
          <div className={styles.contentTask}>
            <h6>{translation('connect.onlinebooking.payment.payment')}</h6>
            <h4>£ {pr}</h4>
            <p>{translation('connect.onlinebooking.payment.refundamount')}</p>
          </div>
        </div>
        <div className={styles.paymentForm}>
          <Formik
            enableReinitialize={true}
            initialValues={intial}
            validationSchema={formikValidationSchema}
            onSubmit={(values) => {
              // changescreen()
              // setdata(values)
              // setmedical(true)
              //console.log(values)
              notifyAppointmentBooked()
              changescreen()
            }}
          >
            {({ setFieldValue }) => (
              <Form
                initialValues={{
                  remember: true,
                }}
                layout="vertical"
              >
                <Form.Item
                  label={translation(
                    'connect.onlinebooking.payment.cardnumber.lable'
                  )}
                  name="cardnumber"
                >
                  <Input
                    //pattern="\d{4}-\d{4}-\d{4}-\d{4}"
                    //pattern="\d{4}-\d{4}-\d{4}-\d{4}"
                    name="cardnumber"
                    placeholder={translation(
                      'connect.onlinebooking.payment.cardnumber.place'
                    )}
                    autoComplete="off"
                    onChange={(values) => {
                      setFieldValue('cardnumber', values.target.value)
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label={translation(
                    'connect.onlinebooking.payment.expdate.lable'
                  )}
                  name="expDate"
                >
                  <DatePicker
                    placeholder={'MM/YY'}
                    format={'MM/YY'}
                    picker="month"
                    onChange={(date, dateString) => {
                      console.log(dateString)
                      setFieldValue('expDate', date)
                    }}
                  />
                </Form.Item>
                <Form.Item name="cvv">
                  <div className={styles.icon}>
                    <label htmlFor="CVV">
                      {translation('connect.onlinebooking.payment.cvv.lable')}
                    </label>
                    <InfoCircleOutlined />
                  </div>
                  <Input
                    name="cvv"
                    placeholder={translation(
                      'connect.onlinebooking.payment.cvv.place'
                    )}
                    autoComplete="off"
                    onChange={(values) =>
                      setFieldValue('cvv', values.target.value)
                    }
                  />
                </Form.Item>
                <div className={styles.promoCode}>
                  <h5>Have a promotion or voucher code?</h5>
                  <div className={styles.inputWrap}>
                    <input
                      value={promoInput}
                      placeholder="Enter promo code"
                      onChange={(value) => setpromoInput(value.target.value)}
                    />
                    <Button
                      className={promoInput === 'STUD10' && styles.active}
                      disabled={promoInput === 'STUD10' ? false : true}
                      onClick={() => setpr(String(Number(pr) - 25))}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
                <SubmitButton className={styles.btnPayment} type="primary">
                  {translation('connect.onlinebooking.payment.paymentbutton')}
                </SubmitButton>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className={styles.footerBttom}>
        <p>{translation('connect.onlinebooking.payment.powerby')}</p>
        <div className={styles.boxEle}>
          <div className={styles.box}>
            <img src={strip} alt={'nothing'} />
          </div>
          <div className={styles.box}>
            <img src={visa} alt={'nothing'} />
          </div>
          <div className={styles.box}>
            <img src={master} alt={'nothing'} />
          </div>
        </div>
      </div>
    </>
  )
}
export default Payment
