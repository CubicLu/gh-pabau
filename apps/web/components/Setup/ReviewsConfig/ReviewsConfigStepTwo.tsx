import { SmileOutlined } from '@ant-design/icons'
import {
  AddQuestion,
  Input,
  IQuestionOptions,
  PabauPlus,
  QuestionField,
  ReviewWrite,
  ReviewWriteStepper,
  TabMenu,
} from '@pabau/ui'
import { Form, Radio } from 'antd'
import { useFormik } from 'formik'
import React, { FC, useEffect, useState } from 'react'
import {
  addQuestionData,
  ReviewsConfigStepOneState,
} from './ReviewsConfigSetting'
import styles from './Style.module.less'

interface ReviewsConfigStepTwoProps {
  settings: ReviewsConfigStepOneState
  questionData: QuestionField[]
}

export const ReviewsConfigStepTwo: FC<ReviewsConfigStepTwoProps> = ({
  settings,
  questionData,
}) => {
  const formik = useFormik({
    initialValues: settings,
    onSubmit: (values) => {
      console.log('Values >>>', values)
    },
  })
  const [form] = Form.useForm()
  const [questions, setQuestions] = useState<QuestionField[]>([])
  const handleChangeSetting = (key, val) => {
    formik.setFieldValue(key, val)
  }
  const onChange = (value: string, index: number) => {
    const temporaryQuestions = [...questions]
    for (const [key, question] of temporaryQuestions.entries()) {
      if (key === index) question.title = value
    }
    setQuestions(temporaryQuestions)
  }
  const onAddQuestion = () => {
    const data = [...questions, { title: '', key: questions.length + 1 }]
    setQuestions(data)
  }
  const onDeleteButton = (key: number) => {
    const data = [...questions]
    const questionItems = data.filter((a) => a.key !== key)
    setQuestions(questionItems)
  }

  const onQuestionBankAddButton = (
    question: Array<IQuestionOptions> | undefined
  ): void => {
    const data = [...questions]
    if (question) {
      for (const a of question) {
        data.push({
          title: a.question,
          key: questions.length + Math.floor(Math.random() * 100),
        })
      }
    }
    setQuestions(data)
  }

  useEffect(() => {
    if (questionData) setQuestions(questionData)
  }, [questionData])

  return (
    <Form form={form} layout="vertical">
      <div className={styles.reviewsConfigBody}>
        <div className={styles.reviewsConfigBodyDesktop}>
          <div>
            <h2>Builder</h2>
            <div>
              <div className={styles.section}>
                <h3>
                  <SmileOutlined
                    style={{
                      marginRight: '.5rem',
                      color: 'var(--primary-color)',
                    }}
                  />
                  <span>Survey Settings</span>
                </h3>
                <h4>
                  In this section you can name your feedback survey, as well as
                  choose your survey format
                </h4>
                <div className={styles.sectionItem}>
                  <Input
                    autoComplete="off"
                    label="Survey name"
                    text={formik.values.surveyName}
                    onChange={(val) => handleChangeSetting('surveyName', val)}
                  />
                </div>
                <div className={styles.sectionItem}>
                  <Input
                    autoComplete="off"
                    label="Survey subtitle"
                    text={formik.values.surveySubTitle}
                    onChange={(val) =>
                      handleChangeSetting('surveySubTitle', val)
                    }
                  />
                </div>
                <div className={styles.surveyFormat}>
                  <h4>Survey format</h4>
                  <Form.Item
                    hasFeedback
                    help="Show all questions on a page at once"
                  >
                    <Radio
                      checked={formik.values.surveyFormat === false}
                      onClick={() => handleChangeSetting('surveyFormat', false)}
                    >
                      Classic
                    </Radio>
                  </Form.Item>
                  <Form.Item
                    hasFeedback
                    help="Automatically scroll to the next question"
                  >
                    <Radio
                      checked={formik.values.surveyFormat === true}
                      onClick={() => handleChangeSetting('surveyFormat', true)}
                    >
                      <span style={{ display: 'inline-flex' }}>
                        <span style={{ marginRight: '8px' }}>Smart Survey</span>
                        <PabauPlus modalType="Marketing" />
                      </span>
                    </Radio>
                  </Form.Item>
                </div>
              </div>
              <AddQuestion
                description={addQuestionData.description}
                questions={questions}
                title={addQuestionData.title}
                addQuestionLabel={addQuestionData.addQuestionLabel}
                goToButtonLabel={addQuestionData.goToButtonLabel}
                questionLabel={addQuestionData.questionLabel}
                onChange={(val, index) => onChange(val, index)}
                onAddQuestion={() => onAddQuestion()}
                onDeleteButton={(key) => onDeleteButton(key)}
                isDeleteDisable={questions?.length === 1}
                onQuestionBankAddButton={onQuestionBankAddButton}
              />
            </div>
          </div>
          <div>
            <h2>Preview</h2>
            <div className={styles.previewPanel}>
              {!formik.values.surveyFormat && (
                <ReviewWrite
                  title={formik.values.surveyName}
                  subtitle={formik.values.surveySubTitle}
                  reviews={questions.map((question) => ({
                    key: question.key,
                    question: question.title,
                    rating: 0,
                  }))}
                />
              )}
              {formik.values.surveyFormat && (
                <ReviewWriteStepper
                  title={formik.values.surveyName}
                  subtitle={formik.values.surveySubTitle}
                  reviews={questions.map((question) => ({
                    key: question.key,
                    question: question.title,
                    rating: 0,
                  }))}
                />
              )}
            </div>
          </div>
        </div>
        <div className={styles.reviewsConfigBodyMobile}>
          <TabMenu
            menuItems={['BUILDER', 'PREVIEW']}
            tabPosition="top"
            minHeight="1px"
          >
            <div>
              <div className={styles.section}>
                <h3>
                  <SmileOutlined
                    style={{ marginRight: '.5rem', color: '#54b2d3' }}
                  />
                  <span>Survey Settings</span>
                </h3>
                <h4>
                  In this section you can name your feedback survey, as well as
                  choose your survey format
                </h4>
                <div className={styles.sectionItem}>
                  <Input
                    autoComplete="off"
                    label="Survey name"
                    text={formik.values.surveyName}
                    onChange={(val) => handleChangeSetting('surveyName', val)}
                  />
                </div>
                <div className={styles.sectionItem}>
                  <Input
                    autoComplete="off"
                    label="Survey subtitle"
                    text={formik.values.surveySubTitle}
                    onChange={(val) =>
                      handleChangeSetting('surveySubTitle', val)
                    }
                  />
                </div>
                <div className={styles.surveyFormat}>
                  <h4>Survey format</h4>
                  <Form form={form} layout="vertical">
                    <Form.Item
                      hasFeedback
                      help="Show all questions on a page at once"
                    >
                      <Radio
                        checked={formik.values.surveyFormat === false}
                        onClick={() =>
                          handleChangeSetting('surveyFormat', false)
                        }
                      >
                        Classic
                      </Radio>
                    </Form.Item>
                    <Form.Item
                      hasFeedback
                      help="Automatically scroll to the next question"
                    >
                      <Radio
                        checked={formik.values.surveyFormat === true}
                        onClick={() =>
                          handleChangeSetting('surveyFormat', true)
                        }
                      >
                        <span style={{ display: 'inline-flex' }}>
                          <span style={{ marginRight: '8px' }}>
                            Smart Survey
                          </span>
                          <PabauPlus modalType="Marketing" />
                        </span>
                      </Radio>
                    </Form.Item>
                  </Form>
                </div>
              </div>
              <AddQuestion
                description={addQuestionData.description}
                questions={questions}
                title={addQuestionData.title}
                addQuestionLabel={addQuestionData.addQuestionLabel}
                goToButtonLabel={addQuestionData.goToButtonLabel}
                questionLabel={addQuestionData.questionLabel}
                onChange={(val, index) => onChange(val, index)}
                onAddQuestion={() => onAddQuestion()}
                onDeleteButton={(key) => onDeleteButton(key)}
                isDeleteDisable={questions?.length === 1}
                onQuestionBankAddButton={onQuestionBankAddButton}
              />
            </div>
            <div className={styles.previewPanel}>
              {!formik.values.surveyFormat && (
                <ReviewWrite
                  title={formik.values.surveyName}
                  subtitle={formik.values.surveySubTitle}
                  reviews={questions.map((question) => ({
                    key: question.key,
                    question: question.title,
                    rating: 0,
                  }))}
                />
              )}
              {formik.values.surveyFormat && (
                <ReviewWriteStepper
                  title={formik.values.surveyName}
                  subtitle={formik.values.surveySubTitle}
                  reviews={questions.map((question) => ({
                    key: question.key,
                    question: question.title,
                    rating: 0,
                  }))}
                />
              )}
            </div>
          </TabMenu>
        </div>
      </div>
    </Form>
  )
}

export default ReviewsConfigStepTwo
