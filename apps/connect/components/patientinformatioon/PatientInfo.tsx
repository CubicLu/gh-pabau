import React, { FC } from 'react'
import { Form, SubmitButton } from 'formik-antd'
import { Formik } from 'formik'
import moment from 'moment'
import styles from './PatientInfo.module.less'
import * as Yup from 'yup'
import { DatePicker, Radio } from 'antd'
/* eslint-disable-next-line */
export interface PatientInfoProps {
  firstname: string
  lastname: string
  changescreen: () => void
  image: string
  translation: (val: string) => string
}

const PatientInfo: FC<PatientInfoProps> = ({
  changescreen,
  image,
  firstname,
  lastname,
  translation,
}) => {
  const formikValidation = Yup.object({
    dob: Yup.date()
      .max(moment().toDate(), "You can't be born in the future!")
      .required('Expiry Date is required'),
    male: Yup.boolean().required('Please select gender'),
    alery: Yup.boolean().required('Please select  anyone'),
    cher: Yup.boolean().required('Please select anyone'),
    here: Yup.boolean().required('Please select anyone'),
  })
  return (
    <div className={styles.conformdata}>
      <div className={styles.conformdataInner}>
        <span className={styles.mainText}>Complete medical form </span>
        <div className={styles.profilePic}>
          <img src={image} alt={'nothing'} />
          <p>
            {firstname} {lastname}
          </p>
        </div>
        {/*<span className={styles.dob}>*/}
        {/*  {translation('connect.onlinebooking.patient.dob')}*/}
        {/*</span>*/}
        {/*<DatePicker*/}
        {/*  className={styles.datepic}*/}
        {/*  format="DD/MM/YYYY"*/}
        {/*  placeholder="DD/MM/YYYY"*/}
        {/*/>*/}
      </div>
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={{
            dob: undefined,
            male: undefined,
            alery: undefined,
            cher: undefined,
            here: undefined,
          }}
          validationSchema={formikValidation}
          onSubmit={(values) => {
            changescreen()
            console.log(values)
          }}
        >
          {({ setFieldValue }) => (
            <Form
              className={styles.mainForm}
              initialValues={{
                remember: true,
              }}
              layout="vertical"
            >
              <Form.Item
                label={translation('connect.onlinebooking.patient.dob')}
                name="dob"
              >
                <DatePicker
                  className={styles.datepic}
                  format="DD/MM/YYYY"
                  placeholder="DD/MM/YYYY"
                  onChange={(date, dateString) => {
                    console.log(dateString)
                    setFieldValue('dob', date)
                  }}
                />
              </Form.Item>
              <Form.Item
                label={translation(
                  'connect.onlinebooking.patient.gender.lable'
                )}
                name="male"
              >
                <Radio.Group className={styles.radioGroup}>
                  <Radio
                    value={true}
                    onChange={(val) => {
                      setFieldValue('male', true)
                    }}
                  >
                    {translation('connect.onlinebooking.patient.gender.male')}
                  </Radio>
                  <Radio
                    value={false}
                    onChange={(val) => {
                      setFieldValue('male', false)
                    }}
                  >
                    {translation('connect.onlinebooking.patient.gender.female')}
                  </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label={translation(
                  'connect.onlinebooking.patient.allergies.lable'
                )}
                name="alery"
              >
                <Radio.Group className={styles.radioGroup}>
                  <Radio
                    value={true}
                    onChange={(val) => {
                      setFieldValue('alery', false)
                    }}
                  >
                    {translation('connect.onlinebooking.patient.allergies.no')}
                  </Radio>
                  <Radio
                    value={false}
                    onChange={(val) => {
                      setFieldValue('alery', true)
                    }}
                  >
                    {translation('connect.onlinebooking.patient.allergies.yes')}
                  </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label={translation(
                  'connect.onlinebooking.patient.chronic.lable'
                )}
                name="cher"
              >
                <Radio.Group className={styles.radioGroup}>
                  <Radio
                    value={true}
                    onChange={(val) => {
                      setFieldValue('cher', false)
                    }}
                  >
                    {translation('connect.onlinebooking.patient.chronic.no')}
                  </Radio>
                  <Radio
                    value={false}
                    onChange={(val) => {
                      setFieldValue('cher', true)
                    }}
                  >
                    {translation('connect.onlinebooking.patient.chronic.yes')}
                  </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label={translation(
                  'connect.onlinebooking.patient.hereditary.lable'
                )}
                name="here"
              >
                <Radio.Group className={styles.radioGroup}>
                  <Radio
                    value={true}
                    onChange={(val) => {
                      setFieldValue('here', false)
                    }}
                  >
                    {translation('connect.onlinebooking.patient.hereditary.no')}
                  </Radio>
                  <Radio
                    value={false}
                    onChange={(val) => {
                      setFieldValue('here', true)
                    }}
                  >
                    {translation(
                      'connect.onlinebooking.patient.hereditary.yes'
                    )}
                  </Radio>
                </Radio.Group>
              </Form.Item>
              <SubmitButton className={styles.submitBut} type="primary">
                {translation('connect.onlinebooking.patient.form.submit')}
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
export default PatientInfo
