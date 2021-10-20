import React, { useState } from 'react'
import {
  StopOutlined,
  UserOutlined,
  CompassOutlined,
  LockOutlined,
} from '@ant-design/icons'
import { Formik } from 'formik'
import { Select, Form, Input, SubmitButton } from 'formik-antd'
import { Button } from 'antd'
import classNames from 'classnames'

import { SimpleDropdown } from '@pabau/ui'
import styles from './Performance.module.less'
import { userDetail } from '../../../../mocks/UserDetail'
import { useTranslation } from 'react-i18next'

interface selectOptionsProps {
  key: string
  label: string
  options: string[]
  value: string
  count?: number
}

interface questionAnswerProps {
  key: string
  label: string
  value: string
}

interface managerAssessmentProps {
  completed: string
  selectOptions: selectOptionsProps[]
  questionAnswer: questionAnswerProps[]
}

const Assessment = () => {
  const { t } = useTranslation('common')
  const { performanceAssessmentData } = userDetail(t)
  const {
    assessmentPeriod,
    isManagerAssessment,
    isSelfAssessment,
    managerAssessment,
    selfAssessment,
  } = performanceAssessmentData

  const [step, setStep] = useState(1)
  const [managerAss, setManagerAss] = useState<managerAssessmentProps>(
    managerAssessment
  )
  const [assPeriod, setAssPeriod] = useState<string>()
  const [isUpcomingAss, setIsUpcomingAss] = useState<boolean>()

  const formikFields = () => {
    const initialValues = {}
    if (managerAss.selectOptions.length > 0) {
      managerAss.selectOptions.map((field) => {
        initialValues[field.label] = field.value ?? field.value
        return field
      })
    }
    if (managerAss.questionAnswer.length > 0) {
      managerAss.questionAnswer.map((field) => {
        initialValues[field.label] = field.value ?? field.value
        return field
      })
    }
    return initialValues
  }

  const handleAssessmentSubmit = (values) => {
    const selectOptions = managerAss.selectOptions.map((field) => {
      Object.keys(values).map((label) => {
        if (label === field.label) {
          field.value = values[label]
        }
        return label
      })
      return field
    })
    const questionAnswer = managerAss.questionAnswer.map((field) => {
      Object.keys(values).map((label) => {
        if (label === field.label) {
          field.value = values[label]
        }
        return label
      })
      return field
    })
    setManagerAss({
      ...managerAss,
      selectOptions: selectOptions,
      questionAnswer: questionAnswer,
    })
    setStep(2)
  }

  const onChangeAssPeriod = (value: string) => {
    setAssPeriod(value)
    const date = value.split('-')
    const now = new Date()
    const startDate = new Date(date[0])
    if (now > startDate) {
      setIsUpcomingAss(false)
    } else {
      setIsUpcomingAss(true)
    }
  }

  const noContentJsx = (message: string) => {
    return (
      <div className={styles.noContent}>
        <div className={styles.noContentIcon}>
          <StopOutlined />
        </div>
        <div className={styles.desc}>{message}</div>
      </div>
    )
  }

  const assUpcomingMessageJsx = () => {
    return (
      <div className={styles.upcomingMessageWrapper}>
        <CompassOutlined />
        <h3>This Assessment is Not Yet Available</h3>
        <p>
          Assessment are available 30 days prior to the end of the current
          period. Please return between <span>Mar 23, 2021</span> and
          <span>Apr 22, 2021</span> to complete your Assessment.
        </p>
        <p>In the mean time you can review the last assessment</p>
        <Button type={'primary'} size={'large'}>
          Previous Assessment
        </Button>
      </div>
    )
  }

  return (
    <div className={styles.assessmentMainWrapper}>
      <SimpleDropdown
        value={assPeriod}
        label={'Assessment Period'}
        className={styles.dropDown}
        dropdownItems={assessmentPeriod.dropDownItems}
        onSelected={onChangeAssPeriod}
      />
      <div>
        {isUpcomingAss ? (
          assUpcomingMessageJsx()
        ) : (
          <div className={styles.assessmentWrapper}>
            <div className={styles.assessmentCard}>
              <div
                className={classNames(
                  styles.contentWrapper,
                  !isSelfAssessment && styles.contentNoData
                )}
              >
                <div
                  className={classNames(
                    styles.contentHeader,
                    isSelfAssessment && styles.headerBorder
                  )}
                >
                  <div className={styles.contentTitle}>
                    <UserOutlined />
                    <div>
                      <div className={styles.title}>Self assessment</div>
                      {isSelfAssessment && (
                        <div className={styles.subTitle}>
                          Completed: ${selfAssessment.completed}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.contentBody}>
                  {!isSelfAssessment ? (
                    noContentJsx(
                      'Self Assessment will show here once completed.'
                    )
                  ) : (
                    <div className={styles.selfAssessmentBlock}>
                      <div className={styles.selfAssessmentBox}>
                        <div className={styles.selfAssessmentBoxList}>
                          {selfAssessment.questionAnswer.length > 0 &&
                            selfAssessment.questionAnswer.map((thread) => {
                              return (
                                <div
                                  key={thread.key}
                                  className={styles.selfAssessmentList}
                                >
                                  <div
                                    className={styles.selfAssessmentQuestion}
                                  >
                                    {thread.label}
                                  </div>
                                  <div className={styles.selfAssessmentAnswer}>
                                    {thread.value}
                                  </div>
                                </div>
                              )
                            })}
                        </div>
                        <div className={styles.selfAssessmentBoxList}>
                          {selfAssessment.moreQuestionAnswer.length > 0 &&
                            selfAssessment.moreQuestionAnswer.map((thread) => {
                              return (
                                <div
                                  key={thread.key}
                                  className={styles.selfAssessmentList}
                                >
                                  <div
                                    className={styles.selfAssessmentQuestion}
                                  >
                                    {thread.label}
                                  </div>
                                  <div className={styles.selfAssessmentAnswer}>
                                    {thread.value}
                                  </div>
                                </div>
                              )
                            })}
                        </div>
                      </div>
                      <div className={styles.selfAssessmentUnlock}>
                        <LockOutlined />
                        <span>
                          <a>Unlock Assessment</a> - Allow Employee to resubmit
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.assessmentCard}>
              <div
                className={classNames(
                  styles.contentWrapper,
                  !isManagerAssessment && styles.contentNoData
                )}
              >
                <div
                  className={classNames(
                    styles.contentHeader,
                    isManagerAssessment && styles.headerBorder
                  )}
                >
                  <div className={styles.contentTitle}>
                    <CompassOutlined />
                    <div>
                      <div className={styles.title}>Manager assessment</div>
                      {step === 2 && isManagerAssessment && (
                        <div className={styles.subTitle}>
                          Completed: ${managerAss.completed}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.contentBody}>
                  {!isManagerAssessment ? (
                    noContentJsx(
                      'Manager Assessment will show here once completed.'
                    )
                  ) : (
                    <div className={styles.managerAssessmentBlock}>
                      <Formik
                        initialValues={formikFields()}
                        onSubmit={handleAssessmentSubmit}
                      >
                        {() => {
                          return step === 1 ? (
                            <Form layout={'vertical'}>
                              <div
                                className={classNames(
                                  styles.managerAssessmentBox,
                                  styles.border
                                )}
                              >
                                <span
                                  className={styles.managerAssessmentQuestions}
                                >
                                  Jennifer WILL NOT SEE Your Answers to These 2
                                  Questions
                                </span>
                                {managerAss.selectOptions.length > 0 &&
                                  managerAss.selectOptions.map((thread) => {
                                    return (
                                      <Form.Item
                                        name={thread.label}
                                        label={thread.label}
                                        key={thread.label}
                                        className={styles.managerAssessmentList}
                                      >
                                        <Select
                                          size={'large'}
                                          name={thread.label}
                                        >
                                          {thread.options.map((option) => {
                                            return (
                                              <Select.Option
                                                value={option}
                                                key={option}
                                              >
                                                {option}
                                              </Select.Option>
                                            )
                                          })}
                                        </Select>
                                      </Form.Item>
                                    )
                                  })}
                              </div>
                              <div className={styles.managerAssessmentBox}>
                                <span
                                  className={styles.managerAssessmentQuestions}
                                >
                                  Jennifer WILL SEE Your Answers to The
                                  Following Questions
                                </span>
                                {managerAss.questionAnswer.length > 0 &&
                                  managerAss.questionAnswer.map((thread) => {
                                    return (
                                      <Form.Item
                                        name={thread.label}
                                        label={thread.label}
                                        key={thread.label}
                                        className={styles.managerAssessmentList}
                                      >
                                        <Input.TextArea
                                          name={thread.label}
                                          rows={3}
                                        />
                                      </Form.Item>
                                    )
                                  })}
                                <div
                                  className={styles.managerAssessmentStepSave}
                                >
                                  <SubmitButton
                                    size={'large'}
                                    type={'primary'}
                                    className={styles.btnRightSpace}
                                  >
                                    Submit
                                  </SubmitButton>
                                  <Button size={'large'}>
                                    Save & Finish Later
                                  </Button>
                                </div>
                              </div>
                            </Form>
                          ) : (
                            <Form layout={'vertical'}>
                              <div
                                className={classNames(
                                  styles.managerAssessmentBox,
                                  styles.border
                                )}
                              >
                                <span
                                  className={styles.managerAssessmentQuestions}
                                >
                                  These 2 questions are hidden from Jennifer
                                </span>
                                {managerAss.selectOptions.length > 0 &&
                                  managerAss.selectOptions.map((thread) => {
                                    return (
                                      <div
                                        key={thread.label}
                                        className={
                                          styles.managerAssessmentOptions
                                        }
                                      >
                                        <div
                                          className={
                                            styles.managerAssessmentOptionsLabel
                                          }
                                        >
                                          {thread.label}
                                        </div>
                                        <div
                                          className={
                                            styles.managerAssessmentOptionsList
                                          }
                                        >
                                          {[...Array.from({ length: 5 })].map(
                                            (e, i) => (
                                              <span
                                                key={i}
                                                className={classNames(
                                                  i + 1 === thread.count &&
                                                    styles.selected,
                                                  styles.count
                                                )}
                                              >
                                                {i + 1}
                                              </span>
                                            )
                                          )}
                                        </div>
                                        <div
                                          className={
                                            styles.managerAssessmentOptionsValue
                                          }
                                        >
                                          {thread.value}
                                        </div>
                                      </div>
                                    )
                                  })}
                              </div>
                              <div className={styles.managerAssessmentBox}>
                                {managerAss.questionAnswer.length > 0 &&
                                  managerAss.questionAnswer.map((thread) => {
                                    return (
                                      <Form.Item
                                        name={thread.label}
                                        label={thread.label}
                                        key={thread.label}
                                        className={styles.managerAssessmentList}
                                      >
                                        <Input.TextArea
                                          name={thread.label}
                                          rows={3}
                                          value={thread.value}
                                        />
                                      </Form.Item>
                                    )
                                  })}
                              </div>
                            </Form>
                          )
                        }}
                      </Formik>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Assessment
