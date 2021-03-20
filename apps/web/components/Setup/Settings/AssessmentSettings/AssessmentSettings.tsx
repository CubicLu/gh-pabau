import React, { FC, useState } from 'react'

import { Button, Input } from '@pabau/ui'
import { Row, Col } from 'antd'
import GeneralLayout from '../GeneralLayout'
import { PlusCircleOutlined } from '@ant-design/icons'
import styles from '../PosConfiguration/common.module.less'

interface P {
  handleChange: (key: string, obj: AssessmentScheduleConfig) => void
  listAssessment: AssessmentList
}

const QuestionTitle = [
  { id: 1, name: 'Self Assessment Questions:' },
  { id: 2, name: 'Questions for Manager:' },
]
const peerAssessmentTitle = [
  { id: 1, name: 'Self Assessment Questions:' },
  { id: 2, name: 'This question is to determine if the employee is a...' },
]

const AssessmentSettings: FC<P> = ({
  handleChange,
  listAssessment: {
    selfAssessmentQuestion,
    questionManager,
    peerAssessmentList: { questionEmployee, peerSelfAssessmentQuestion },
  },
}) => {
  const [assumptionQuestion, setAssumptionQuestion] = useState(
    selfAssessmentQuestion
  )
  const [questionManagerList, setQuestionManager] = useState(questionManager)

  const [questionEmployees, setQuestionEmployee] = useState(questionEmployee)
  const [peerSelfAssessmentQuestions, setPeerSelfAssessmentQuestion] = useState(
    peerSelfAssessmentQuestion
  )

  const handleAddQuestion = () => {
    setAssumptionQuestion((e) => [
      ...e,
      { key: assumptionQuestion.length + 1, value: '' },
    ])
    setQuestionManager((e) => [
      ...e,
      { key: questionManagerList.length + 1, value: '' },
    ])
  }

  const handlePeerAddQuestion = () => {
    setQuestionEmployee((e) => [
      ...e,
      { key: questionEmployees.length + 1, value: '' },
    ])
    setPeerSelfAssessmentQuestion((e) => [
      ...e,
      { key: peerSelfAssessmentQuestions.length + 1, value: '' },
    ])
  }

  const renderContent = (): JSX.Element => {
    return (
      <div className={styles.assessmentContainer}>
        <div>
          <div className={styles.btnWrapper}>
            <Button icon={<PlusCircleOutlined />} onClick={handleAddQuestion}>
              Add Question
            </Button>
          </div>
          <div>
            <Row>
              {QuestionTitle.map((data, index) => (
                <Col span={12} key={data.id}>
                  <span
                    key={data.id}
                    className={
                      data.id === 0 ? styles.inputBoxLeft : styles.inputBoxRight
                    }
                  >
                    {data.name}
                  </span>
                </Col>
              ))}
              <Col span={12}>
                {assumptionQuestion.map((data: FeaturePerformance, index) => (
                  <div className={styles.indexWrap} key={index}>
                    <p>{index + 1}.</p>
                    <Input
                      text={data.value}
                      key={index}
                      className={styles.inputBoxLeft}
                    />
                  </div>
                ))}
              </Col>
              <Col span={12}>
                {questionManagerList.map((data: FeaturePerformance, index) => (
                  <Input
                    text={data.value}
                    key={index}
                    className={styles.inputBoxRight}
                  />
                ))}
              </Col>
            </Row>
            <span className={styles.noteWrapper}>
              *One way to keep our Assessments awesome is by keeping them short.
            </span>
          </div>
        </div>
      </div>
    )
  }

  const renderPeerContent = (): JSX.Element => {
    return (
      <div className={styles.assessmentContainer}>
        <div>
          <div className={styles.btnWrapper}>
            <Button
              icon={<PlusCircleOutlined />}
              onClick={handlePeerAddQuestion}
            >
              Add Question
            </Button>
          </div>
          <div>
            <Row>
              {peerAssessmentTitle.map((data) => (
                <Col span={12} key={data.id}>
                  <span
                    key={data.id}
                    className={
                      data.id === 0 ? styles.inputBoxLeft : styles.inputBoxRight
                    }
                  >
                    {data.name}
                  </span>
                </Col>
              ))}
              <Col span={12}>
                {peerSelfAssessmentQuestions.map(
                  (data: FeaturePerformance, index) => (
                    <div className={styles.indexWrap} key={index}>
                      <p>{index + 1}.</p>
                      <Input
                        text={data.value}
                        key={index}
                        className={styles.inputBoxLeft}
                      />
                    </div>
                  )
                )}
              </Col>
              <Col span={12}>
                {questionEmployees.map((data: FeaturePerformance, index) => (
                  <Input
                    text={data.value}
                    key={index}
                    className={styles.inputBoxRight}
                  />
                ))}
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <GeneralLayout
        title={'Self & Manager Assessment'}
        description={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'
        }
        bodyContent={renderContent()}
      />
      <div className={styles.peerMainWrapper}>
        <GeneralLayout
          title={'Peer Assessment'}
          description={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'
          }
          bodyContent={renderPeerContent()}
        />
      </div>
    </div>
  )
}

export default AssessmentSettings
