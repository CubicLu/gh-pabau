import React, { FC, useState } from 'react'
import { PhoneNumberInput, PasswordWithHelper } from '@pabau/ui'
import { Form, Input, SubmitButton } from 'formik-antd'
import { Select, Checkbox } from 'antd'
import { Formik } from 'formik'
import styles from './bookingdetail.module.less'
import * as Yup from 'yup'
import img from '../../../assets/images/connect/facebook.png'
import img1 from '../../../assets/images/connect/Google.png'
import { UserOutlined } from '@ant-design/icons'
import { data, tooltip, normaldata } from '../../../mocks/connect/confirmMock'
import { Verification, RenderProduct } from '../conformation/verification'
import Conformation, {
  datatype,
  normaltype,
  productType,
} from '../conformation/conformation'
import { countrylist } from '../../../mocks/connect/mock'

const { Option } = Select
/* eslint-disable-next-line */
export interface BookingdetailProps {
  changescreen: () => void
  clinic: string
  docname: string
  date: string
  time: string
  charge: string
  address: string
  type: string
  image: any
  services: number
  getinfo: (val) => void
  member: number
  translation: (val: string) => string
  gotofirst?: () => void
  gotoclinic?: () => void
  gotoemploy?: () => void
  gotodate?: () => void
  gotoedit?: () => void
  getprice: (price: number, percentage: number) => void
}
export interface userType {
  first: string
  last: string
  email: string
  phone: string
  count: number
}
// interface user {
//   lastname: string
//   firstname: string
//   email: string
//   phone: string
//   password: string
//   country: string
//   verify1: any
//   verify2: any
// }
const BookingDetail: FC<BookingdetailProps> = ({
  changescreen,
  clinic,
  docname,
  date,
  time,
  charge,
  address,
  type,
  image,
  getinfo,
  translation,
  member,
  getprice,
  services,
  gotoedit,
  gotoclinic,
  gotodate,
  gotoemploy,
  gotofirst,
}) => {
  //const { t } = useTranslationI18()
  // const [data, setdata] = useState<user>()
  // const [pass, setpass] = useState()
  const [valid, setvalid] = useState(false)
  const [verify, setverify] = useState(false)
  const list = () => {
    const arry = []
    for (let i = 0; i < member; i++) {
      arry.push({ count: i + 1, first: '', last: '', email: '', phone: '' })
    }
    // setmem([...mem])
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
  // const buttonValidation = (): boolean => {
  //   for (const i of mem) {
  //     if (
  //       i.first.length > 0 &&
  //       i.last.length > 3 &&
  //       i.email.length > 3 &&
  //       i.phone.length === 10 &&
  //       pass.password.length > 3 &&
  //       pass.valid
  //     ) {
  //       console.log('##########')
  //       return false
  //     }
  //   }
  //   console.log('$$$$$$')
  //   return true
  // }
  return (
    <div>
      {confim ? (
        // <Conformation
        //   changescreen={changescreen}
        //   clinic={clinic}
        //   docname={docname}
        //   date={date}
        //   time={time}
        //   charge={charge}
        //   address={address}
        //   type={type}
        //   image={image}
        //   services={services}
        //   translation={translation}
        //   getprice={getprice}
        // />
        <Conformation
          changescreen={changescreen}
          clinic={clinic}
          docname={docname}
          date={date}
          time={time}
          charge={charge}
          address={address}
          type={type}
          image={image}
          services={services}
          translation={translation}
          getprice={getprice}
          gotoemploy={gotoemploy}
          gotodate={gotodate}
          gotoclinic={gotoclinic}
          gotofirst={gotofirst}
          gotoedit={gotoedit}
          products={products}
        />
      ) : (
        <div className={styles.bookingMainWrapper}>
          <div className={styles.appointmentDetails}>
            <h6>
              {translation('connect.onlinebooking.bookdetail.conform.title')}
            </h6>
            <Verification
              clinic={clinic}
              docname={docname}
              date={date}
              time={time}
              charge={
                type === 'Laser'
                  ? course()
                  : String(
                      ((Number(charge) + products.Sprice + products.Pprice) *
                        (100 - products.extra)) /
                        100
                    )
              }
              address={address}
              image={image}
              type={type}
              translation={translation}
              clickable={true}
              gotoedit={gotoedit}
              gotofirst={gotofirst}
              gotoclinic={gotoclinic}
              gotodate={gotodate}
              gotoemploy={gotoemploy}
            />
          </div>
          <RenderProduct products={products} type={type} tooltip={tooltip} />
          <div className={styles.accountLoginWrapper}>
            <p>
              {translation('connect.onlinebooking.bookdetail.alreadyaccount')}{' '}
              <a>Log in</a>
            </p>
            <div className={styles.btnSocial} onClick={() => setconfirm(true)}>
              <span>
                <img src={img1} alt={'nothing'} />
                {translation(
                  'connect.onlinebooking.bookdetail.continue.google'
                )}
              </span>
            </div>
            <div
              className={styles.btnSocialLink}
              onClick={() => setconfirm(true)}
            >
              <span>
                <img src={img} alt={'nothing'} />
                {translation(
                  'connect.onlinebooking.bookdetail.continue.facebook'
                )}
              </span>
            </div>
            <h6>{translation('connect.onlinebooking.bookdetail.or')}</h6>
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
                  // getinfo(values)
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
                      label={translation(
                        'connect.onlinebooking.bookdetail.form.fname'
                      )}
                      name="firstname"
                    >
                      <Input
                        name="firstname"
                        placeholder={translation(
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
                      label={translation(
                        'connect.onlinebooking.bookdetail.form.lname'
                      )}
                      name="lastname"
                    >
                      <Input
                        name="lastname"
                        placeholder={translation(
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
                      label={translation(
                        'connect.onlinebooking.bookdetail.form.email'
                      )}
                      name="email"
                    >
                      <Input
                        name="email"
                        placeholder={translation(
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
                      name={translation(
                        'connect.onlinebooking.bookdetail.form.phone'
                      )}
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
                getinfo(mem[0])
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
                    label={translation(
                      'connect.onlinebooking.bookdetail.form.password'
                    )}
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
                    label={translation(
                      'connect.onlinebooking.bookdetail.form.country'
                    )}
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
                      {translation(
                        'connect.onlinebooking.bookdetail.form.verify1'
                      )}
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
                      {translation(
                        'connect.onlinebooking.bookdetail.form.verify2'
                      )}
                    </Checkbox>
                  </Form.Item>
                  <p>
                    {translation(
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
                    {translation('connect.onlinebooking.bookdetail.submit')}
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
export default BookingDetail
