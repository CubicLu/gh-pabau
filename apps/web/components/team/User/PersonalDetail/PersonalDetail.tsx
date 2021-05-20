import {
  Button,
  Notification,
  NotificationType,
  PhoneNumberInput,
} from '@pabau/ui'
import { DatePicker, Tooltip } from 'antd'
import { Formik } from 'formik'
import { Checkbox, Form, Input, Select } from 'formik-antd'
import dynamic from 'next/dynamic'
import React, { FC, ReactText, useState } from 'react'
import * as Yup from 'yup'
import { customFieldsProps } from '../Index'
import styles from '../UserDetail.module.less'

export interface GraphDataProps {
  daysLeft: string
  seriesData: ReactText[][]
  time: string
  holidayRemaining: number
}

interface PersonalDetail {
  field: customFieldsProps[]
  graphData: GraphDataProps
}
const { TextArea } = Input

const GraphDetail = dynamic(() => import('./GraphDetail'), {
  ssr: false,
})

const PersonalDetail: FC<PersonalDetail> = ({ field, graphData }) => {
  const [isDisableResetEmail, setIsDisableResetEmail] = useState<boolean>(false)

  const formikFields = () => {
    const initialValues = {}
    if (field.length > 0) {
      field.map((field) => {
        initialValues[field.name] = field.value ?? field.value
        return field
      })
    }
    return initialValues
  }

  const handleResetPasswordEmail = () => {
    Notification(
      NotificationType.success,
      'Success! - we have emailed a reset link to email@email.com'
    )
    setIsDisableResetEmail(true)
  }

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={formikFields()}
        validationSchema={Yup.object({
          firstname: Yup.string().required('First name is required'),
          lastname: Yup.string().required('Last name is required'),
          email: Yup.string()
            .required('Email is required')
            .email('Invalid email'),
        })}
        onSubmit={() => {
          Notification(NotificationType.success, 'Success! Saved changes.')
        }}
      >
        {({ setFieldValue, values, handleSubmit }) => (
          <Form layout="vertical">
            <div>
              <div className={styles.personalDetailHead}>
                <h2>Personal Details</h2>
                <div className={styles.personalDetailHeadBtn}>
                  <Button
                    className={styles.personalBtn}
                    onClick={handleResetPasswordEmail}
                    disabled={isDisableResetEmail}
                  >
                    Send reset password email
                  </Button>
                  <Button
                    htmlType={'submit'}
                    className={styles.personalBtn}
                    onClick={() => handleSubmit}
                  >
                    Save changes
                  </Button>
                </div>
              </div>
              <div className={styles.customFormWrapper}>
                <div className={styles.mainForm}>
                  {field.length > 0 &&
                    field.map((fieldData) => {
                      return (
                        <Form.Item
                          key={fieldData.id}
                          label={
                            fieldData.control !== 'phoneInput' &&
                            !fieldData.helpTooltip &&
                            fieldData.label
                          }
                          name={fieldData.name}
                        >
                          {fieldData.helpTooltip && (
                            <Tooltip title={fieldData.helpTooltip}>
                              <div className={styles.customLabel}>
                                {fieldData.label}
                              </div>
                            </Tooltip>
                          )}
                          {fieldData.control === 'input' &&
                          fieldData.type === 'text' ? (
                            <Input name={fieldData.name} />
                          ) : fieldData.control === 'input' &&
                            fieldData.type === 'textArea' ? (
                            <TextArea name={fieldData.name} rows={2} />
                          ) : fieldData.control === 'phoneInput' ? (
                            <PhoneNumberInput
                              onChange={(value) => {
                                setFieldValue(fieldData.name, value)
                              }}
                              label={fieldData.label}
                            />
                          ) : fieldData.control === 'date' ? (
                            <DatePicker
                              onChange={(date, dateString) =>
                                setFieldValue(fieldData.name, dateString)
                              }
                              format={'DD/MM/YY'}
                              placeholder={fieldData.placeholder}
                            />
                          ) : fieldData.control === 'select' ? (
                            <Select
                              name={fieldData.name}
                              placeholder={fieldData.placeholder}
                            >
                              {fieldData.options.map((option) => (
                                <Select.Option value={option} key={option}>
                                  {option}
                                </Select.Option>
                              ))}
                            </Select>
                          ) : (
                            fieldData.control === 'checkbox-group' && (
                              <div className={styles.checkboxWrapper}>
                                <div className={styles.labelText}>
                                  Choose the locations where this staff member
                                  can be booked
                                </div>
                                <Checkbox.Group name={fieldData.name}>
                                  {fieldData.options.map((option) => (
                                    <Checkbox
                                      name={fieldData.name}
                                      value={option}
                                      key={option}
                                    >
                                      {option}
                                    </Checkbox>
                                  ))}
                                </Checkbox.Group>
                                {values[fieldData.name] &&
                                values[fieldData.name].length ===
                                  fieldData.options.length ? (
                                  <Button
                                    onClick={() => {
                                      setFieldValue(fieldData.name, [])
                                    }}
                                  >
                                    Uncheck All
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() => {
                                      setFieldValue(
                                        fieldData.name,
                                        fieldData.options
                                      )
                                    }}
                                  >
                                    Check All
                                  </Button>
                                )}
                              </div>
                            )
                          )}
                        </Form.Item>
                      )
                    })}
                </div>
                <div className={styles.chart}>
                  <GraphDetail graphData={graphData} />
                </div>
              </div>
              <div className={styles.personalDetailHeadMobileBtn}>
                <Button className={styles.personalBtn}>
                  Send reset password email
                </Button>
                <Button
                  htmlType={'submit'}
                  className={styles.personalBtn}
                  onClick={() => handleSubmit}
                >
                  Save changes
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default PersonalDetail
