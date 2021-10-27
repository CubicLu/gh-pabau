import {
  Button,
  Notification,
  NotificationType,
  PhoneNumberInput,
  DatePicker,
} from '@pabau/ui'
import { Tooltip, Skeleton } from 'antd'
import { Formik } from 'formik'
import { Checkbox, Form, Input, Select } from 'formik-antd'
import dynamic from 'next/dynamic'
import React, { FC, ReactText, useState, useEffect } from 'react'
import * as Yup from 'yup'
import { TFunction } from 'react-i18next'
import { customFieldsProps } from '../Index'
import {
  StaffDetails,
  LocationDetails,
} from '../../../../components/team/User/Index'
import styles from '../UserDetail.module.less'
import dayjs from 'dayjs'

import {
  useGetActiveLocationQuery,
  useGetCompanyPositionsQuery,
  useForgotPasswordMutation,
} from '@pabau/graphql'
export interface GraphDataProps {
  daysLeft: string
  seriesData: ReactText[][]
  time: string
  holidayRemaining: number
}
export interface StaffTitleDetails {
  id: number
  position: string
}
interface P {
  field: customFieldsProps[]
  graphData: GraphDataProps
  personalData: StaffDetails
  staffDataLoading: boolean
  t: TFunction<'common'>
}
const { TextArea } = Input

const GraphDetail = dynamic(() => import('./GraphDetail'), {
  ssr: false,
})

const PersonalDetail: FC<P> = ({
  field,
  graphData,
  personalData,
  staffDataLoading,
  t,
}) => {
  const [isDisableResetEmail, setIsDisableResetEmail] = useState<boolean>(false)
  const [activeLocatoions, setActiveLocations] = useState<LocationDetails[]>()
  const [staffTitleObj, setStaffTitleObj] = useState<StaffTitleDetails[]>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isDisable, setIsDisable] = useState<boolean>(true)
  const {
    data: staffTitleData,
    loading: staffTitleLoading,
  } = useGetCompanyPositionsQuery()
  const {
    data: OtherLocation,
    loading: otherLocationLoading,
  } = useGetActiveLocationQuery({
    ssr: false,
  })
  const [
    forgetPasswordMutation,
    { loading: forgetPasswordLoading },
  ] = useForgotPasswordMutation({
    onCompleted() {
      setIsDisableResetEmail(true)
      Notification(
        NotificationType.success,

        `${t('team.user.personal.details.password.reset.success.text')} ${
          personalData.email
        }`
      )
    },
    onError() {
      Notification(
        NotificationType.error,

        t('team.user.personal.details.password.reset.fail.text')
      )
    },
  })
  useEffect(() => {
    if (OtherLocation?.locations) {
      setActiveLocations([...OtherLocation?.locations])
    }
    if (!staffDataLoading && !otherLocationLoading && !staffTitleLoading) {
      setIsLoading(false)
    }
  }, [OtherLocation, staffDataLoading, otherLocationLoading, staffTitleLoading])
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
  const [defaultvalues, setDefaultValues] = useState<StaffDetails>()
  useEffect(() => {
    if (personalData) {
      setDefaultValues(personalData)
    }
  }, [personalData])
  useEffect(() => {
    if (staffTitleData?.positions) {
      setStaffTitleObj([...staffTitleData?.positions])
    }
  }, [staffTitleData])

  const handleResetPasswordEmail = () => {
    forgetPasswordMutation({
      variables: {
        email: personalData.email,
      },
    })
  }

  const setSkeleton = (classname: string) => (
    <Skeleton.Input active={true} className={classname} />
  )
  const setCheckboxSkeleton = () => (
    <div className={styles.skeletonCheckboxWrapper}>
      <Skeleton.Input active={true} className={styles.skeletonCheckbox} />
      <Skeleton.Input active={true} className={styles.skeletonText} />
    </div>
  )
  const handleCheckAll = (setFieldValue, name, value) => {
    const otherLocationArr = []
    for (const d of activeLocatoions) {
      otherLocationArr.push(d.id)
    }
    setFieldValue(name, otherLocationArr)
  }
  const setDisableCheckbox = (value, option) => {
    let disableFlag = false
    if (value === option) {
      disableFlag = true
      setIsDisable(true)
    }
    return disableFlag
  }
  const checkAllAndUncheckAll = (values) => {
    let chekUncheckFlag = true
    if (values) {
      if (isDisable && values.length === 1) {
        chekUncheckFlag = true
      } else if (!isDisable && values.length === 0) {
        chekUncheckFlag = true
      } else {
        chekUncheckFlag = false
      }
    }
    return chekUncheckFlag
  }
  const handleSelectChange = (e, setFieldValue, name, otherName, values) => {
    if (values[otherName] && values[otherName].length > 0) {
      values[otherName].pop(values?.[name])
      setFieldValue(otherName, [...values[otherName], e])
    } else {
      setFieldValue(otherName, [e])
    }
  }
  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={defaultvalues ?? formikFields()}
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
        {({ setFieldValue, values, handleSubmit }) => {
          return (
            <Form layout="vertical">
              <div>
                <div className={styles.personalDetailHead}>
                  <h2>{t('team.user.personal.details.title')}</h2>
                  <div className={styles.personalDetailHeadBtn}>
                    <Button
                      className={styles.personalBtn}
                      onClick={handleResetPasswordEmail}
                      disabled={isDisableResetEmail}
                      loading={forgetPasswordLoading}
                    >
                      {t('team.user.personal.details.reset.password.button')}
                    </Button>
                    <Button
                      htmlType={'submit'}
                      className={styles.personalBtn}
                      onClick={() => handleSubmit}
                    >
                      {t('team.user.personal.details.save.button')}
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
                            className={
                              fieldData.helpTooltip && styles.inputWrapper
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
                              isLoading ? (
                                setSkeleton(styles.skeletonInput)
                              ) : (
                                <Input
                                  name={fieldData.name}
                                  value={values?.[fieldData.name]}
                                />
                              )
                            ) : fieldData.control === 'input' &&
                              fieldData.type === 'textArea' ? (
                              isLoading ? (
                                setSkeleton(styles.skeletonTextArea)
                              ) : (
                                <TextArea name={fieldData.name} rows={2} />
                              )
                            ) : fieldData.control === 'phoneInput' ? (
                              isLoading ? (
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                  }}
                                >
                                  <div className={styles.customLabel}>
                                    {fieldData.label}
                                  </div>
                                  {setSkeleton(styles.skeletonInput)}
                                </div>
                              ) : (
                                <PhoneNumberInput
                                  onChange={(value) => {
                                    setFieldValue(fieldData.name, value)
                                  }}
                                  value={values?.[fieldData.name]}
                                  label={fieldData.label}
                                />
                              )
                            ) : fieldData.control === 'date' ? (
                              isLoading ? (
                                setSkeleton(styles.skeletonInput)
                              ) : (
                                <DatePicker
                                  onChange={(date, dateString) =>
                                    setFieldValue(fieldData.name, dateString)
                                  }
                                  value={dayjs(values?.[fieldData.name])}
                                  format={'DD/MM/YY'}
                                  placeholder={fieldData.placeholder}
                                />
                              )
                            ) : fieldData.control === 'select' ? (
                              isLoading ? (
                                setSkeleton(styles.skeletonInput)
                              ) : (
                                <Select
                                  name={fieldData.name}
                                  placeholder={fieldData.placeholder}
                                  value={
                                    values?.[fieldData.name] === 0
                                      ? ''
                                      : values?.[fieldData.name]
                                  }
                                  onChange={(e) => {
                                    fieldData.name === 'primaryLocation' &&
                                      handleSelectChange(
                                        e,
                                        setFieldValue,
                                        fieldData.name,
                                        'otherLocations',
                                        values
                                      )
                                  }}
                                >
                                  {fieldData.name === 'primaryLocation'
                                    ? activeLocatoions?.map((option) => (
                                        <Select.Option
                                          value={option.id}
                                          key={option.id}
                                        >
                                          {option.name}
                                        </Select.Option>
                                      ))
                                    : fieldData.name === 'staffTitle'
                                    ? staffTitleObj?.map((option) => (
                                        <Select.Option
                                          value={option.id}
                                          key={option.id}
                                        >
                                          {option.position}
                                        </Select.Option>
                                      ))
                                    : fieldData.options.map((option) => (
                                        <Select.Option
                                          value={option}
                                          key={option}
                                        >
                                          {option}
                                        </Select.Option>
                                      ))}
                                </Select>
                              )
                            ) : (
                              fieldData.control === 'checkbox-group' && (
                                <div className={styles.checkboxWrapper}>
                                  <div className={styles.labelText}>
                                    {t(
                                      'team.user.personal.details.other.location.title'
                                    )}
                                  </div>
                                  <Checkbox.Group name={fieldData.name}>
                                    {isLoading
                                      ? fieldData.options.map((option) =>
                                          setCheckboxSkeleton()
                                        )
                                      : activeLocatoions?.map((option) => (
                                          <Checkbox
                                            name={fieldData.name}
                                            value={option.id}
                                            key={option.id}
                                            disabled={setDisableCheckbox(
                                              values?.['primaryLocation'],
                                              option.id
                                            )}
                                          >
                                            {option.name}
                                          </Checkbox>
                                        ))}
                                  </Checkbox.Group>
                                  {checkAllAndUncheckAll(
                                    values[fieldData.name]
                                  ) ? (
                                    <Button
                                      onClick={() =>
                                        handleCheckAll(
                                          setFieldValue,
                                          fieldData.name,
                                          values?.['primaryLocation']
                                        )
                                      }
                                    >
                                      {t(
                                        'team.user.personal.details.check.all.button'
                                      )}
                                    </Button>
                                  ) : (
                                    <Button
                                      onClick={() => {
                                        setFieldValue(fieldData.name, [
                                          values?.['primaryLocation'],
                                        ])
                                      }}
                                    >
                                      {t(
                                        'team.user.personal.details.uncheck.all.button'
                                      )}
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
                  <Button
                    className={styles.personalBtn}
                    onClick={handleResetPasswordEmail}
                    disabled={isDisableResetEmail}
                    loading={forgetPasswordLoading}
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
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default PersonalDetail
