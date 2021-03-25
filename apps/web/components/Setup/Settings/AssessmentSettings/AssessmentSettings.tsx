import React, { FC, useState } from 'react'
import { Button, Input } from '@pabau/ui'
import { Row, Col } from 'antd'
import className from 'classnames'
import SettingsLayout from '../SettingsLayout'
import { PlusCircleOutlined } from '@ant-design/icons'
import styles from '../PosConfiguration/common.module.less'
import { useTranslationI18 } from '../../../../hooks/useTranslationI18'

interface P {
  handleChange: (key: string, config: AssessmentScheduleConfig) => void
  listAssessment: AssessmentList
}

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
  const { t } = useTranslationI18()

  const QuestionTitle = [
    { id: 1, name: t('settings-performance-assessment-question-title1') },
    { id: 2, name: t('settings-performance-assessment-question-title2') },
  ]
  const peerAssessmentTitle = [
    { id: 1, name: t('settings-performance-assessment-question-title1') },
    { id: 2, name: t('settings-performance-peer-assessment-question-title') },
  ]

  const handleAddQuestion = () => {
    setAssumptionQuestion((e) => [
      ...e,
      { id: assumptionQuestion.length + 1, value: '' },
    ])
    setQuestionManager((e) => [
      ...e,
      { id: questionManagerList.length + 1, value: '' },
    ])
  }

  const handlePeerAddQuestion = () => {
    setQuestionEmployee((e) => [
      ...e,
      { id: questionEmployees.length + 1, value: '' },
    ])
    setPeerSelfAssessmentQuestion((e) => [
      ...e,
      { id: peerSelfAssessmentQuestions.length + 1, value: '' },
    ])
  }

  const RenderContent = (): JSX.Element => (
    <div className={styles.assessmentContainer}>
      <div>
        <div className={styles.btnWrapper}>
          <Button icon={<PlusCircleOutlined />} onClick={handleAddQuestion}>
            {t('settings-performance-assessment-question')}
          </Button>
        </div>
        <div>
          <Row>
            {QuestionTitle.map((data) => (
              <Col span={12} key={data.id}>
                <span
                  key={data.id}
                  className={
                    data.id === 1
                      ? styles.inputBox
                      : className(styles.inputBox, styles.inputBoxRightWrap)
                  }
                >
                  {data.name}
                </span>
              </Col>
            ))}
            <Col span={12}>
              {assumptionQuestion.map((data: FeaturePerformance) => (
                <div className={styles.indexWrap} key={data.id}>
                  <p>{data.id}.</p>
                  <Input
                    text={data.value}
                    key={data.id}
                    className={styles.inputBox}
                    style={{ marginRight: '6px' }}
                  />
                </div>
              ))}
            </Col>
            <Col span={12}>
              {questionManagerList.map((data: FeaturePerformance) => (
                <Input
                  text={data.value}
                  key={data.id}
                  className={styles.inputBox}
                  style={{ marginLeft: '6px' }}
                />
              ))}
            </Col>
          </Row>
          <span className={styles.noteWrapper}>
            *{t('settings-performance-assessment-note')}
          </span>
        </div>
      </div>
    </div>
  )

  const RenderPeerContent = (): JSX.Element => (
    <div className={styles.assessmentContainer}>
      <div>
        <div className={styles.btnWrapper}>
          <Button icon={<PlusCircleOutlined />} onClick={handlePeerAddQuestion}>
            {t('settings-performance-assessment-question')}
          </Button>
        </div>
        <div>
          <Row>
            {peerAssessmentTitle.map((data) => (
              <Col span={12} key={data.id}>
                <span
                  key={data.id}
                  className={
                    data.id === 1
                      ? styles.inputBox
                      : className(styles.inputBox, styles.inputBoxRightWrap)
                  }
                >
                  {data.name}
                </span>
              </Col>
            ))}
            <Col span={12}>
              {peerSelfAssessmentQuestions.map((data: FeaturePerformance) => (
                <div className={styles.indexWrap} key={data.id}>
                  <p>{data.id}.</p>
                  <Input
                    text={data.value}
                    key={data.id}
                    className={styles.inputBox}
                    style={{ marginRight: '6px' }}
                  />
                </div>
              ))}
            </Col>
            <Col span={12}>
              {questionEmployees.map((data: FeaturePerformance) => (
                <Input
                  text={data.value}
                  key={data.id}
                  className={styles.inputBox}
                  style={{ marginLeft: '6px' }}
                />
              ))}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <SettingsLayout
        title={t('settings-performance-assessment-head1')}
        description={t('settings-performance-tab-header-description')}
      >
        <RenderContent />
      </SettingsLayout>
      <div className={styles.peerMainWrapper}>
        <SettingsLayout
          title={t('settings-performance-assessment-head2')}
          description={t('settings-performance-tab-header-description')}
        >
          <RenderPeerContent />
        </SettingsLayout>
      </div>
    </div>
  )
}

export default AssessmentSettings
