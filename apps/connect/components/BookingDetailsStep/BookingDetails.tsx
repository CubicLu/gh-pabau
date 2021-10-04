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
import { data, normaldata } from '../../../web/mocks/connect/confirmMock'
import { Verification, RenderProduct } from '../conformation/verification'
import Conformation, {
  datatype,
  normaltype,
  productType,
} from '../conformation/conformation'
import { countrylist } from '../../../web/mocks/connect/mock'
import { SettingsContext } from '../../context/settings-context'
import { useSelectedDataStore } from '../../store/selectedData'
import { useTranslationI18 } from '../../hooks/useTranslationI18'

const { Option } = Select

export interface P {
  changescreen: () => void
  charge: string
  type: string
  services: number
  backToStep?: (val: number) => void
}
export interface userType {
  first: string
  last: string
  email: string
  phone: string
  count: number
}
const BookingDetails: FC<P> = ({ changescreen, charge, backToStep }) => {
  const settings = useContext(SettingsContext)
  const [selectedData, setSelectedData] = useSelectedDataStore()
  const { t } = useTranslationI18()
  const [valid, setvalid] = useState(false)
  const [verify, setverify] = useState(false)
  const list = () => {
    const arry = []
    for (let i = 0; i < selectedData.peopleCount; i++) {
      arry.push({ count: i + 1, first: '', last: '', email: '', phone: '' })
    }
    return arry
  }
  const [mem, setmem] = useState<userType[]>(list)
  const [pass, setpass] = useState({ password: '', valid: false })
  const [confim, setconfirm] = useState<boolean>(false)
  const setlaserdata = (): datatype[] => {
    const obj = data.map((item) => ({ ...item, active: false }))
    return obj
  }
  const [laser, setlaser] = useState<datatype[]>(setlaserdata)
  const setnormaldata = (): normaltype[] => {
    const obj = normaldata.map((item) => ({ ...item, active: false }))
    return obj
  }
  const [normal, setnormal] = useState<normaltype[]>(setnormaldata)
  const [Scount, setScount] = useState(0)
  const [Sprice, setSprice] = useState(0)
  const [Pcount, setPcount] = useState(0)
  const [Pprice, setPprice] = useState(0)
  const [extra, setextra] = useState(0)
  const [promoInput, setpromoInput] = useState('')
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

  const products: productType = {
    Scount: Scount,
    setScount: (val: number) => setScount(val),
    Sprice: Sprice,
    setSprice: (val: number) => setSprice(val),
    Pcount: Pcount,
    setPcount: (val: number) => setPcount(val),
    Pprice: Pprice,
    setPprice: (val: number) => setPprice(val),
    extra: extra,
    setextra: (val: number) => setextra(val),
    data: laser,
    normal: normal,
    setdata: (val: datatype[]) => setlaser([...val]),
    setnormal: (val: normaltype[]) => setnormal([...val]),
    promoInput: promoInput,
    setpromoInput: (val: string) => setpromoInput(val),
  }
  const course = () => {
    if (products.Sprice) {
      return String((products.Sprice * (100 - products.extra)) / 100)
    } else {
      return String((Number(charge) * (100 - products.extra)) / 100)
    }
  }

  return (
    <div>
      {confim ? (
        <Conformation
          changescreen={changescreen}
          clinic={selectedData.location.name}
          docname={selectedData.employee.User.full_name}
          date={selectedData.dateTime.format('dddd, Do MMMM')}
          time={selectedData.dateTime.format('HH:mm')}
          charge={charge}
          address={selectedData.location.address}
          type={selectedData.services.map((s) => s.name).join(', ')}
          image={image}
          services={selectedData.services.length}
          backToStep={backToStep}
          products={products}
        />
      ) : (
        <div className={styles.bookingMainWrapper}>
          <div className={styles.appointmentDetails}>
            <h6>{t('connect.onlinebooking.bookdetail.conform.title')}</h6>
            <Verification
              clinic={selectedData.location.name}
              docname={'Nenad Jovanovski'}
              date={selectedData.dateTime.format('dddd, Do MMMM')}
              time={selectedData.dateTime.format('HH:mm')}
              charge={0}
              address={selectedData.location.address}
              image={
                'https://crm.pabau.com//cdn/file_attachments/8021/avatar_photos/20201208134720.jpeg'
              }
              type={selectedData.services.map((s) => s.name).join(', ')}
              clickable={true}
              backToStep={backToStep}
            />
          </div>
          {/*<RenderProduct products={products} type={type} tooltip={tooltip} />*/}
          <div className={styles.accountLoginWrapper}>
            <p>
              {t('connect.onlinebooking.bookdetail.alreadyaccount')}{' '}
              <a>Log in</a>
            </p>
            <div className={styles.btnSocial} onClick={() => setconfirm(true)}>
              <span>
                <img src={img1} alt={'nothing'} />
                {t('connect.onlinebooking.bookdetail.continue.google')}
              </span>
            </div>
            <div
              className={styles.btnSocialLink}
              onClick={() => setconfirm(true)}
            >
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
              {mem.length > 1 && (
                <div className={styles.bookCheck}>
                  <Checkbox />
                  <span className={styles.bookText}>
                    Is one of these appointments for you?
                  </span>
                </div>
              )}
            </div>

            {mem.map((item, index) => (
              <Formik
                key={item.count}
                enableReinitialize={true}
                initialValues={userData}
                validationSchema={formikValidationSchema}
                onSubmit={(values) => {
                  //changescreen()
                  // setdata(values)
                  console.log(values)
                }}
              >
                {({ setFieldValue, isValid }) => (
                  <Form
                    initialValues={{
                      remember: true,
                    }}
                    layout="vertical"
                  >
                    {mem.length > 1 && (
                      <div className={styles.PersonLable}>
                        <UserOutlined />
                        <label>Person {item.count}</label>
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
                          item.first = value.target.value
                          setmem(mem)
                          setFieldValue('firstname', value.target.value)
                          // valid.first = isValid
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
                          item.last = value.target.value
                          setmem(mem)
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
                          setmem(mem)
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
                          setmem(mem)
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
                changescreen()
                // setdata(values)
                console.log(values)
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
                        console.log(val.target.checked)
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
                        console.log(verify)
                      }}
                    >
                      {t('connect.onlinebooking.bookdetail.form.verify2')}
                    </Checkbox>
                  </Form.Item>
                  <p>
                    {t(
                      'connect.onlinebooking.bookdetail.form.finaldescription'
                    )}
                  </p>

                  <SubmitButton
                    className={styles.btnSubmit}
                    type="primary"
                    //disabled={buttonValidation()}
                    disabled={valid && verify ? false : true}
                    //onInvalid={() => console.log('---------')}
                  >
                    {t('connect.onlinebooking.bookdetail.submit')}
                  </SubmitButton>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  )
}
export default BookingDetails
