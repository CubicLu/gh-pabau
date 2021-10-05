import React, { FC, useContext, useState } from 'react'
import { PhoneNumberInput, PasswordWithHelper } from '@pabau/ui'
import { Form, Input, SubmitButton } from 'formik-antd'
import { Select, Checkbox } from 'antd'
import { Formik } from 'formik'
import styles from './BookingDetails.module.less'
import * as Yup from 'yup'
import img from '../../../web/assets/images/connect/facebook.png'
import img1 from '../../../web/assets/images/connect/Google.png'
import { UserOutlined } from '@ant-design/icons'
import { Verification } from './Verification'
import { countrylist } from '../../../web/mocks/connect/mock'
import { SettingsContext } from '../../context/settings-context'
import { useSelectedDataStore } from '../../store/selectedData'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { Contact } from '../../types/contact'

const { Option } = Select

export interface P {
  onConfirmed: () => void
  backToStep?: (val: number) => void
}

const BookingDetails: FC<P> = ({ onConfirmed, backToStep }) => {
  const settings = useContext(SettingsContext)
  const [selectedData, setSelectedData] = useSelectedDataStore()
  const { t } = useTranslationI18()
  const [valid, setvalid] = useState(false)
  const [verify, setverify] = useState(false)
  const tempList = () => {
    const temp = []
    for (let i = 0; i < selectedData.peopleCount; i++) {
      temp.push({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: 'United Kingdom',
        password: '',
      })
    }
    return temp
  }
  const [members, setMembers] = useState<Contact[]>(tempList)
  const [pass, setpass] = useState({ password: '', valid: false })
  const [confim, setconfirm] = useState<boolean>(false)

  const userData = {
    lastname: '',
    firstname: '',
    email: '',
    phone: '',
  }
  const uservalue = {
    password: '',
    country: '',
    verify1: undefined,
    verify2: undefined,
  }
  const formikValidationSchema = Yup.object({
    lastname: Yup.string().min(3).max(50).required('Last Name is required'),
    firstname: Yup.string().min(3).max(50).required('First Name is required'),
    email: Yup.string()
      .min(3)
      .max(50)
      .email('Please enter valid email id')
      .required('Email is required'),
    phone: Yup.string().required('phone is required'),
  })
  const formikValidation = Yup.object({
    password: Yup.string().required('password is required'),
    verify1: Yup.boolean()
      .required('accept terms and conditions')
      .oneOf([true]),
  })

  return (
    <div className={styles.bookingMainWrapper}>
      <div className={styles.appointmentDetails}>
        <h6>{t('connect.onlinebooking.bookdetail.conform.title')}</h6>
        <Verification backToStep={backToStep} />
      </div>
      {/*<RenderProduct products={products} type={type} tooltip={tooltip} />*/}
      <div className={styles.accountLoginWrapper}>
        <p>
          {t('connect.onlinebooking.bookdetail.alreadyaccount')} <a>Log in</a>
        </p>
        <div className={styles.btnSocial} onClick={() => setconfirm(true)}>
          <span>
            <img src={img1} alt={'nothing'} />
            {t('connect.onlinebooking.bookdetail.continue.google')}
          </span>
        </div>
        <div className={styles.btnSocialLink} onClick={() => setconfirm(true)}>
          <span>
            <img src={img} alt={'nothing'} />
            {t('connect.onlinebooking.bookdetail.continue.facebook')}
          </span>
        </div>
        <h6>{t('connect.onlinebooking.bookdetail.or')}</h6>
      </div>
      <div className={styles.formWrapper}>
        <div className={styles.bookFormHead}>
          <h3>Booking details</h3>
          {members.length > 1 && (
            <div className={styles.bookCheck}>
              <Checkbox />
              <span className={styles.bookText}>
                Is one of these appointments for you?
              </span>
            </div>
          )}
        </div>

        {members.map((item, index) => (
          <Formik
            key={index}
            enableReinitialize={true}
            initialValues={userData}
            validationSchema={formikValidationSchema}
            onSubmit={null}
          >
            {({ setFieldValue, isValid }) => (
              <Form
                initialValues={{
                  remember: true,
                }}
                layout="vertical"
              >
                {members.length > 1 && (
                  <div className={styles.PersonLable}>
                    <UserOutlined />
                    <label>Person {index + 1}</label>
                  </div>
                )}

                <Form.Item
                  label={t('connect.onlinebooking.bookdetail.form.fname')}
                  name="firstname"
                >
                  <Input
                    name="firstname"
                    placeholder={t(
                      'connect.onlinebooking.bookdetail.form.fname.place'
                    )}
                    autoComplete="off"
                    onChange={(value) => {
                      item.firstName = value.target.value
                      setMembers(members)
                      setFieldValue('firstname', value.target.value)
                      setvalid(isValid)
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label={t('connect.onlinebooking.bookdetail.form.lname')}
                  name="lastname"
                >
                  <Input
                    name="lastname"
                    placeholder={t(
                      'connect.onlinebooking.bookdetail.form.lname.place'
                    )}
                    autoComplete="off"
                    onChange={(value) => {
                      item.lastName = value.target.value
                      setMembers(members)
                      setFieldValue('lastname', value.target.value)
                      setvalid(isValid)
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label={t('connect.onlinebooking.bookdetail.form.email')}
                  name="email"
                >
                  <Input
                    name="email"
                    placeholder={t(
                      'connect.onlinebooking.bookdetail.form.email.place'
                    )}
                    autoComplete="off"
                    onChange={(value) => {
                      item.email = value.target.value
                      setMembers(members)
                      setFieldValue('email', value.target.value)
                      setvalid(isValid)
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name={t('connect.onlinebooking.bookdetail.form.phone')}
                >
                  <PhoneNumberInput
                    label="Phone"
                    value={userData.phone}
                    onChange={(value) => {
                      item.phone = value
                      setvalid(isValid)
                      setMembers(members)
                      setFieldValue('phone', value)
                    }}
                  />
                </Form.Item>
              </Form>
            )}
          </Formik>
        ))}

        <Formik
          enableReinitialize={true}
          initialValues={uservalue}
          validationSchema={formikValidation}
          onSubmit={(values) => {
            setSelectedData('SET_MEMBERS', members)
            onConfirmed()
          }}
        >
          {({ setFieldValue, isValid }) => (
            <Form
              initialValues={{
                remember: true,
              }}
              layout="vertical"
            >
              <Form.Item
                name="password"
                label={t('connect.onlinebooking.bookdetail.form.password')}
              >
                <PasswordWithHelper
                  placeholder=""
                  onChange={(val) => {
                    setFieldValue('password', val)
                    pass.password = val
                    setpass(pass)
                    for (const m of members) {
                      m.password = val
                    }
                    setMembers(members)
                    setverify(isValid)
                  }}
                />
              </Form.Item>
              <Form.Item
                name="country"
                label={t('connect.onlinebooking.bookdetail.form.country')}
              >
                <Select
                  defaultValue="United Kingdom"
                  onSelect={(value) => setFieldValue('country', value)}
                >
                  {countrylist.map((val) => (
                    <Option value={val.name} key={val.key}>
                      {val.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="verify1">
                <Checkbox
                  onChange={(val) => {
                    setFieldValue('verify1', val.target.checked)
                    pass.valid = val.target.checked
                    setverify(val.target.checked)
                    setpass(pass)
                  }}
                >
                  {t('connect.onlinebooking.bookdetail.form.verify1')}
                </Checkbox>
              </Form.Item>
              <Form.Item name="verify2">
                <Checkbox
                  onChange={(val) => {
                    setFieldValue('verify2', val.target.checked)
                    setverify(isValid)
                  }}
                >
                  {t('connect.onlinebooking.bookdetail.form.verify2')}
                </Checkbox>
              </Form.Item>
              <p>
                {t('connect.onlinebooking.bookdetail.form.finaldescription')}
              </p>

              <SubmitButton
                className={styles.btnSubmit}
                type="primary"
                disabled={valid && verify ? false : true}
              >
                {t('connect.onlinebooking.bookdetail.submit')}
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
export default BookingDetails
