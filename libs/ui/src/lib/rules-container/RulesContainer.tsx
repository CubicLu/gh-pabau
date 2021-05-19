import {
  InfoCircleOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  DownOutlined,
  EditOutlined,
  CopyOutlined,
  DeleteOutlined,
  PlusOutlined,
  UpOutlined,
} from '@ant-design/icons'
import { Button, Input, Select, Typography, Alert } from 'antd'
import React, { FC, useState } from 'react'
import styles from './RulesContainer.module.less'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

const { Title } = Typography

export interface IfProp {
  id: number
  answer: string
  operator: string
  condition: string
}

export interface ThenProp {
  id: number
  action: string
  template: string
  to: string
}

export interface IfObjProp {
  condition_met: string
  answers: IfProp[]
}

export interface RuleProp {
  id: number
  collapsed: boolean
  name: string
  if: IfObjProp
  then: ThenProp[]
}

export const RulesContainer: FC = () => {
  const { Option } = Select
  const { t } = useTranslation('common')

  const randomNumber = () => Math.round(Math.random() * 10000)

  const answersOptions = {
    short_answer: 'Short Answer',
    long_answer: 'Long Answer',
    single_choice_answer: 'Single Choice Answer',
    multiple_choice_answer: 'Multiple Choice Answer',
    dropdown_answer: 'Dropdown Answer',
    medical_condition: 'Medical Condition',
    drugs_prescribed: 'Drugs Prescribed',
    travel_destination: 'Travel Destination',
    labs_ordered: 'Labs Ordered',
  }

  const actionOptions = {
    send_email: 'Send Email',
    send_sms: 'Send SMS',
  }

  const operatorOptions = {
    is: 'is',
    not_is: 'Not is',
  }

  const ifInitObj = {
    condition_met: 'any',
    answers: [
      {
        id: randomNumber(),
        answer: 'short_answer',
        operator: 'is',
        condition: '',
      },
    ],
  }

  const thenInitArr = [
    {
      id: randomNumber(),
      action: 'send_email',
      template: '1',
      to: '',
    },
  ]

  const [rules, setRules] = useState<RuleProp[]>([])
  const [configureMode, setConfigureMode] = useState(true)
  const [ruleName, setRuleName] = useState('')
  const [ifData, setIfData] = useState(ifInitObj)
  const [thenData, setThenData] = useState(thenInitArr)

  const addIfRow = () => {
    const d = ifData.answers
    d.push(ifInitObj.answers[0])
    setIfData({ ...ifData, answers: d })
  }

  const removeIfRow = (index) => {
    const d = ifData.answers
    d.splice(index, 1)
    setIfData({ ...ifData, answers: d })
  }

  const addThenRow = () => {
    setThenData([...thenData, thenInitArr[0]])
  }

  const removeThenRow = (index) => {
    setThenData(thenData.filter((e, i) => i !== index))
  }

  const updateIfData = (key, value) => {
    setIfData((e) => ({
      ...e,
      [key]: value,
    }))
  }

  const onChangeAnswer = (id, key, value) => {
    const updatedAnswers = ifData.answers.map((a) => {
      if (a.id === id) {
        a[key] = value
      }
      return a
    })
    setIfData((e) => ({
      ...e,
      answers: updatedAnswers,
    }))
  }

  const onChangeThen = (id, key, value) => {
    const updated = thenData.map((a) => {
      if (a.id === id) {
        a[key] = value
      }
      return a
    })
    setThenData(updated)
  }

  const onPressConfigure = () => {
    setConfigureMode(false)
  }

  const clearRuleFields = () => {
    setRuleName('')
    setIfData(ifInitObj)
    setThenData(thenInitArr)
  }

  const onPressCancel = () => {
    setConfigureMode(!configureMode)
  }

  const onPressSaveRules = () => {
    const i = rules.findIndex((e) => e.name === ruleName)
    let obj = [...rules]

    if (i === -1) {
      obj = [
        ...rules,
        {
          id: rules.length + 1,
          collapsed: false,
          name: ruleName,
          if: ifData,
          then: thenData,
        },
      ]
    } else {
      obj[i].collapsed = false
      obj[i].name = ruleName
      obj[i].if = ifData
      obj[i].then = thenData
    }

    setRules(obj)
    clearRuleFields()
    setConfigureMode(true)
  }

  const toggleRule = (index) => {
    const arr = rules.filter((r, i) => {
      if (i === index) {
        r.collapsed = !r.collapsed
      }
      return r
    })

    setRules(arr)
  }

  const editRule = (index) => {
    const obj = rules[index]
    setRuleName(obj.name)
    setIfData(obj.if)
    setThenData(obj.then)
    setConfigureMode(false)
  }

  const copyRule = (index) => {
    const obj = rules[index]
    const objs = { ...obj }
    objs.id = rules.length + 1
    objs.name = `${obj.name} - Copy`
    setRules([...rules, objs])
  }

  const deleteRule = (index) => {
    const objs = [...rules]
    objs.splice(index, 1)
    setRules([...objs])
  }

  const NoRulesContainer = () => {
    return rules.length === 0 ? (
      <div className={styles.noRulesContainer}>
        <InfoCircleOutlined className={styles.icon} />
        <Title level={5} className={styles.title}>
          {t('rules.no-configured-message')}
        </Title>
        <Button type="primary" onClick={onPressConfigure}>
          {t('rules.configure-now')}
        </Button>
      </div>
    ) : (
      <div className={styles.rulesListContainer}>
        {rules.map((r, i) => {
          return (
            <div className={styles.rule} key={i}>
              <div className={styles.ruleHeader} onClick={() => toggleRule(i)}>
                <div>
                  {r.collapsed ? <UpOutlined /> : <DownOutlined />}
                  <span className={styles.name}>{r.name}</span>
                </div>
                <div>
                  <EditOutlined
                    onClick={(e) => {
                      e.stopPropagation()
                      editRule(i)
                    }}
                  />
                  <CopyOutlined
                    onClick={(e) => {
                      e.stopPropagation()
                      copyRule(i)
                    }}
                  />
                  <DeleteOutlined
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteRule(i)
                    }}
                  />
                </div>
              </div>
              {r.collapsed && (
                <div className={styles.ruleContent}>
                  <div className={styles.rulesDetailsContainer}>
                    <div className={styles.segmentContainer}>
                      <div className={styles.left}>
                        <div className={styles.labelContainer}>
                          <span>{t('rules.if')}</span>
                        </div>
                        <div className={styles.progIfLine}></div>
                      </div>
                      <div className={styles.right}>
                        <div className={styles.question}>
                          <span>
                            <span className={styles.textUppercase}>
                              - {r.if.condition_met}
                            </span>
                            <span>{t('rules.if-condition')}:</span>
                          </span>
                        </div>
                        {r.if.answers.map((ans, i) => {
                          return (
                            <div className={styles.answer} key={i}>
                              <div className={styles.progIfLine}></div>
                              <Alert
                                message={`
                                ${answersOptions[ans.answer]} 
                                ${operatorOptions[ans.operator]}
                                ${ans.condition}
                              `}
                                type="warning"
                              />
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className={styles.segmentContainer}>
                      <div className={styles.left}>
                        <div className={styles.labelContainer}>
                          <span>{t('rules.then')}</span>
                        </div>
                        <div
                          className={classNames(
                            styles.progIfLine,
                            styles.progThenLine
                          )}
                        ></div>
                      </div>
                      <div className={styles.right}>
                        <div className={styles.question}>
                          <span>{t('rules.then-condition')}</span>
                        </div>

                        {r.then.map((t, i) => {
                          return (
                            <div className={styles.answer} key={i}>
                              <div className={styles.progIfLine}></div>
                              <Alert
                                message={`
                                ${actionOptions[t.action]} 
                              `}
                                type="error"
                              />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  const RulesAddContainer = () => {
    return (
      <div className={styles.addRuleBox}>
        <div>
          <span className={styles.title}>{t('rules.field-rules')}</span>
          <span>{t('rules.configure-rules')}</span>
        </div>
        <div>
          <Button onClick={onPressConfigure} style={{ marginRight: 5 }}>
            <PlusOutlined />
            {t('rules.new-rule')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      {configureMode && rules.length > 0 && <RulesAddContainer />}
      <div className={styles.main}>
        {configureMode ? (
          <NoRulesContainer />
        ) : (
          <div className={styles.rulesContainer}>
            <div className={styles.addRuleContainer}>
              <div className={styles.left}>
                <span>{t('rules.rule-name')}</span>
                <Input
                  placeholder={t('rules.new-rule')}
                  value={ruleName}
                  maxLength={100}
                  onChange={(e) => setRuleName(e.target.value)}
                />
              </div>
              <div className={styles.right}>
                <Button onClick={onPressCancel} style={{ marginRight: 5 }}>
                  {t('rules.cancel')}
                </Button>
                <Button
                  type="primary"
                  disabled={!ruleName}
                  onClick={onPressSaveRules}
                >
                  {t('rules.save-rule')}
                </Button>
              </div>
            </div>
            <div className={styles.rulesDetailsContainer}>
              <div className={styles.segmentContainer}>
                <div className={styles.left}>
                  <div className={styles.labelContainer}>
                    <span>{t('rules.if')}</span>
                  </div>
                  <div className={styles.progIfLine}></div>
                </div>
                <div className={styles.right}>
                  <div className={styles.question}>
                    <Select
                      style={{ width: 200 }}
                      value={ifData.condition_met}
                      onChange={(e) => {
                        updateIfData('condition_met', e)
                      }}
                    >
                      <Option value="any">Any</Option>
                      <Option value="all">All</Option>
                    </Select>
                    <span>{t('rules.if-condition')}:</span>
                  </div>

                  {ifData.answers.map((ans, i) => {
                    return (
                      <div className={styles.answer} key={i}>
                        <div className={styles.progIfLine}></div>
                        <Select
                          style={{ width: 200 }}
                          value={ans.answer}
                          onChange={(e) => onChangeAnswer(ans.id, 'answer', e)}
                        >
                          {Object.keys(answersOptions).map(function (
                            key,
                            index
                          ) {
                            return (
                              <Option key={index} value={key}>
                                {answersOptions[key]}
                              </Option>
                            )
                          })}
                        </Select>
                        <Select
                          style={{ width: 200 }}
                          value={ans.operator}
                          onChange={(e) =>
                            onChangeAnswer(ans.id, 'operator', e)
                          }
                        >
                          {Object.keys(operatorOptions).map(function (
                            key,
                            index
                          ) {
                            return (
                              <Option key={index} value={key}>
                                {operatorOptions[key]}
                              </Option>
                            )
                          })}
                        </Select>
                        <Input
                          placeholder={t('rules.write-condition-here')}
                          value={ans.condition}
                          onChange={(e) =>
                            onChangeAnswer(ans.id, 'condition', e.target.value)
                          }
                        />
                        {i === 0 ? (
                          <PlusCircleOutlined
                            className={styles.icon}
                            onClick={() => addIfRow()}
                          />
                        ) : (
                          <MinusCircleOutlined
                            className={styles.iconRemove}
                            onClick={() => removeIfRow(i)}
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className={styles.segmentContainer}>
                <div className={styles.left}>
                  <div className={styles.labelContainer}>
                    <span>{t('rules.then')}</span>
                  </div>
                  <div
                    className={classNames(
                      styles.progIfLine,
                      styles.progThenLine
                    )}
                  ></div>
                </div>
                <div className={styles.right}>
                  <div className={styles.question}>
                    <span>{t('rules.then-condition')}</span>
                  </div>

                  {thenData.map((t, i) => {
                    return (
                      <div className={styles.answer} key={i}>
                        <div className={styles.progIfLine}></div>
                        <Select
                          style={{ width: 200 }}
                          value={t.action}
                          onChange={(e) => onChangeThen(t.id, 'action', e)}
                        >
                          {Object.keys(actionOptions).map(function (
                            key,
                            index
                          ) {
                            return (
                              <Option key={index} value={key}>
                                {actionOptions[key]}
                              </Option>
                            )
                          })}
                        </Select>
                        <div className={styles.formGroup}>
                          <label>Templates</label>
                          <Select
                            style={{ width: 200 }}
                            value={t.template}
                            onChange={(e) => onChangeThen(t.id, 'template', e)}
                          >
                            <Option value="1">Default Template</Option>
                          </Select>
                        </div>
                        <div className={styles.formGroup}>
                          <label>To</label>
                          <Input
                            placeholder="Emails you'd like to send to"
                            value={t.to}
                            onChange={(e) =>
                              onChangeThen(t.id, 'to', e.target.value)
                            }
                          />
                        </div>
                        {i === 0 ? (
                          <PlusCircleOutlined
                            className={styles.icon}
                            onClick={() => addThenRow()}
                          />
                        ) : (
                          <MinusCircleOutlined
                            className={styles.iconRemove}
                            onClick={() => removeThenRow(i)}
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default RulesContainer
