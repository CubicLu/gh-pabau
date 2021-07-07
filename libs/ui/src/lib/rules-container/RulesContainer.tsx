import {
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  InfoCircleOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  UpOutlined,
} from '@ant-design/icons'
import { AnswerItem, MedicalFormTypes, OptionType } from '@pabau/ui'
import {
  Alert,
  Button,
  Input,
  InputNumber,
  Modal,
  Popover,
  Select,
  Typography,
} from 'antd'
import classNames from 'classnames'
import { cloneDeep } from 'lodash'
import React, { FC, useEffect, useState } from 'react'
import RulesActionActivity from './RulesActionActivity'
import RulesActionDisplayCancel from './RulesActionDisplayCancel'
import RulesActionEmail from './RulesActionEmail'
import RulesActionSms from './RulesActionSms'
import styles from './RulesContainer.module.less'
import {
  ActionEventProp,
  ActionProp,
  RuleProp,
} from './RulesContainerInterface'

const { Title } = Typography

export interface RulesContainerProps {
  noConfiguredMessage: string
  configureBtnText: string
  ifText: string
  ifConditionText: string
  thenText: string
  thenConditionText: string
  fieldRulesText: string
  configureRules: string
  newRuleText: string
  ruleNameText: string
  cancelText: string
  saveRuleText: string
  ruleConditionPlaceHolder: string
  answersOptions: { [key: string]: AnswerItem }
  answersClientOptions: { [key: string]: AnswerItem }
  operatorOptions: { [key: string]: string }
  actionTitle: string
  actions: ActionProp[]
  actionsNotAvailableTitle: string
  actionsNotAvailable: ActionProp[]
  medicalForms: MedicalFormTypes[]
  onSaveRules?: (rules: RuleProp[]) => void
  currentRules?: RuleProp[]
}

export const RulesContainer: FC<RulesContainerProps> = ({
  noConfiguredMessage,
  configureBtnText,
  ifText,
  ifConditionText,
  thenText,
  thenConditionText,
  fieldRulesText,
  configureRules,
  newRuleText,
  ruleNameText,
  cancelText,
  saveRuleText,
  ruleConditionPlaceHolder,
  answersOptions,
  answersClientOptions,
  operatorOptions,
  actionTitle,
  actions,
  actionsNotAvailableTitle,
  actionsNotAvailable,
  medicalForms,
  onSaveRules,
  currentRules = [],
}) => {
  const { Option, OptGroup } = Select

  const randomNumber = () => Math.round(Math.random() * 10000)

  const ifInitObj = {
    condition_met: 'any',
    answers: [
      {
        id: randomNumber(),
        answer: '',
        operator: '',
        condition: '',
        conditionType: 'text',
        conditionValues: [] as OptionType[],
      },
    ],
  }

  const thenInitArr = [
    {
      id: randomNumber(),
      action: '',
      template: '1',
      to: '',
      from: '',
    },
  ]

  const ifInitOperators = ['is', 'is_not', 'is_empty', 'is_not_empty']

  const [rules, setRules] = useState<RuleProp[]>([])
  const [configureMode, setConfigureMode] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [editRuleIndex, setEditRuleIndex] = useState(0)
  const [ruleName, setRuleName] = useState('')
  const [ifData, setIfData] = useState(ifInitObj)
  const [ifOperators, setIOperators] = useState(ifInitOperators)
  const [thenData, setThenData] = useState(thenInitArr)
  const [visibleModal, setVisibleModal] = useState(false)
  const [thenSelectedItem, setThenSelectedItem] = useState(0)

  useEffect(() => {
    const orgRules = cloneDeep(currentRules)
    setRules(orgRules)
    if (orgRules.length > 0) {
      setRuleName(orgRules[0].name)
      setIfData(orgRules[0].if)
      setThenData(orgRules[0].then)
    } else {
      setRuleName('')
      setIfData({
        condition_met: 'any',
        answers: [
          {
            id: randomNumber(),
            answer: '',
            operator: '',
            condition: '',
            conditionType: 'text',
            conditionValues: [] as OptionType[],
          },
        ],
      })
      setThenData([
        {
          id: randomNumber(),
          action: '',
          template: '1',
          to: '',
          from: '',
        },
      ])
    }
  }, [currentRules])

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

  const getFormInfo = (formId) => {
    const medicalForm = medicalForms.filter((item) => item.id === formId)
    if (medicalForm.length > 0) {
      return medicalForm[0]
    } else {
      return false
    }
  }

  const onChangeAnswer = (id, key, value) => {
    const updatedAnswers = ifData.answers.map((a) => {
      if (a.id === id) {
        a[key] = value
        if (key === 'answer') {
          const formInfo = getFormInfo(
            value === 'gender' || value === 'age'
              ? ''
              : answersOptions[value].id
          )
          if (formInfo) {
            if (
              formInfo.formName === 'basic_shortanswer' &&
              formInfo.txtInputType === 'number'
            ) {
              a['conditionType'] = 'number'
              a['conditionValues'] = []
            } else if (formInfo.formName === 'basic_multiplechoice') {
              a['conditionType'] = 'multiplechoice'
              a['conditionValues'] = formInfo.arrItems
            } else if (
              formInfo.formName === 'basic_dropdown' ||
              formInfo.formName === 'basic_singlechoice'
            ) {
              a['conditionType'] = 'singlechoice'
              a['conditionValues'] = formInfo.arrItems
            } else {
              a['conditionType'] = 'text'
              a['conditionValues'] = []
            }
            setIOperators(ifInitOperators)
          }
          if (value === 'gender') {
            setIOperators(['is', 'is_not'])
            a['conditionType'] = 'singlechoice'
            a['conditionValues'] = [
              {
                id: 1,
                editing: false,
                name: 'n/a',
              },
              {
                id: 2,
                editing: false,
                name: 'female',
              },
              {
                id: 3,
                editing: false,
                name: 'male',
              },
            ]
          } else if (value === 'age') {
            setIOperators(['greater_than', 'less_than'])
            a['conditionType'] = 'number'
            a['conditionValues'] = []
          }

          a['condition'] = ''
          a['operator'] = ''
        }
      }
      return a
    })
    setIfData((e) => ({
      ...e,
      answers: updatedAnswers,
    }))
  }

  const onChangeThen = (id, dataArr) => {
    const updated = thenData.map((a) => {
      if (a.id === id) {
        for (const element of dataArr) {
          a[element.key] = element.value
          if (element.key === 'action') {
            a['to'] = ''
            a['from'] = ''
          }
        }
      }
      return a
    })
    setThenData(updated)
  }

  // const onBlurThen = (id, dataArr) => {
  //   const updated = thenData.map((a) => {
  //     if (a.id === id && a.action === 'email' && dataArr.length > 0) {
  //       console.log(dataArr[0].value)
  //       const re = /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z]+\.)+[A-Za-z]{2,}))$/
  //       for (const element of dataArr) {
  //         if (!re.test(element.value)) {
  //           a[element.key] = ''
  //         }
  //       }
  //     }
  //     return a
  //   })
  //   setThenData(updated)
  // }

  const onPressConfigure = () => {
    setRuleName('')
    setIfData(ifInitObj)
    setThenData(thenInitArr)
    setEditMode(false)
    setEditRuleIndex(0)
    setConfigureMode(false)
  }

  const clearRuleFields = () => {
    setRuleName('')
    setIfData(ifInitObj)
    setThenData(thenInitArr)
  }

  const saveRules = (obj) => {
    setRules(obj)
    onSaveRules?.(obj)
  }

  const onPressCancel = () => {
    const orgRules = cloneDeep(currentRules)
    setRules(orgRules)
    if (orgRules.length > 0) {
      setRuleName(orgRules[0].name)
      setIfData(orgRules[0].if)
      setThenData(orgRules[0].then)
    } else {
      setRuleName('')
      setIfData(ifInitObj)
      setThenData(thenInitArr)
    }
    setConfigureMode(!configureMode)
  }

  const onPressSaveRules = () => {
    let obj = [...rules]
    if (!editMode) {
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
      obj[editRuleIndex].collapsed = false
      obj[editRuleIndex].name = ruleName
      obj[editRuleIndex].if = ifData
      obj[editRuleIndex].then = thenData
    }
    saveRules(obj)
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
    saveRules(arr)
  }

  const editRule = (index) => {
    const obj = rules[index]
    setRuleName(obj.name)
    setIfData(obj.if)
    setThenData(obj.then)
    setConfigureMode(false)
    setEditMode(true)
    setEditRuleIndex(index)
  }

  const copyRule = (index) => {
    const obj = rules[index]
    const objs = { ...obj }
    objs.id = rules.length + 1
    objs.name = `${obj.name} - Copy`
    saveRules([...rules, objs])
  }

  const deleteRule = (index) => {
    const objs = [...rules]
    objs.splice(index, 1)
    saveRules([...objs])
  }

  const getCondtion = (ans) => {
    if (
      typeof ans.conditionValues !== undefined &&
      ans.conditionValues.length > 0
    ) {
      const conditinValue = ans.conditionValues.filter(
        (value) => value.id === ans.condition
      )
      if (conditinValue.length > 0) {
        return conditinValue[0].name
      }
    }
    return ans.condition
  }

  const NoRulesContainer = () => {
    //TODO: fix the correctness of this line; dont set state on every child render
    // setEditMode(false)
    return rules.length === 0 ? (
      <div className={styles.noRulesContainer}>
        <InfoCircleOutlined className={styles.icon} />
        <Title level={5} className={styles.title}>
          {noConfiguredMessage}
        </Title>
        <Button type="primary" onClick={onPressConfigure}>
          {configureBtnText}
        </Button>
      </div>
    ) : (
      <div className={styles.rulesListContainer}>
        {rules.map((r, i) => {
          return (
            <div className={styles.rule} key={'rules-' + i.toString()}>
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
                          <span>{ifText}</span>
                        </div>
                        <div className={styles.progIfLine}></div>
                      </div>
                      <div className={styles.right}>
                        <div className={styles.question}>
                          <span>
                            <span className={styles.textUppercase}>
                              - {r.if.condition_met}
                            </span>
                            <span>{ifConditionText}:</span>
                          </span>
                        </div>
                        {r.if.answers.map((ans, i) => {
                          return (
                            <>
                              {i !== 0 && (
                                <div
                                  className={classNames(
                                    styles.answer,
                                    styles.answerMet
                                  )}
                                  key={'ifdata-' + i.toString()}
                                >
                                  <div className={styles.progIfLine}></div>
                                  <div className={styles.conditionMet}>
                                    {r.if.condition_met === 'all'
                                      ? 'and'
                                      : 'or'}
                                  </div>
                                </div>
                              )}
                              <div
                                className={styles.answer}
                                key={'rifanswer-' + i.toString()}
                              >
                                <div className={styles.progIfLine}></div>
                                <Alert
                                  message={`
                                ${
                                  ans.answer === 'gender' ||
                                  ans.answer === 'age'
                                    ? answersClientOptions[ans.answer].answer
                                    : answersOptions[ans.answer].answer
                                }
                                ${operatorOptions[ans.operator]}
                                ${getCondtion(ans)}
                              `}
                                  type="warning"
                                />
                              </div>
                            </>
                          )
                        })}
                      </div>
                    </div>

                    <div className={styles.segmentContainer}>
                      <div className={styles.left}>
                        <div className={styles.labelContainer}>
                          <span>{thenText}</span>
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
                          <span>{thenConditionText}</span>
                        </div>

                        {r.then.map((t, i) => {
                          const selectedAct = actions.find(
                            (f) => f.key === t.action
                          )
                          const actionEvent_: ActionEventProp[] | undefined =
                            selectedAct?.events
                          const actionEvent:
                            | ActionEventProp
                            | undefined = actionEvent_
                            ? actionEvent_.find((f) => f.key === t.event)
                            : undefined
                          return (
                            <div
                              className={styles.answer}
                              key={'rthen-' + i.toString()}
                            >
                              <div className={styles.progIfLine}></div>
                              <Alert
                                message={`
                                ${selectedAct?.text}
                                ${
                                  actionEvent ? ' - ' + actionEvent.subtext : ''
                                }
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
          <span className={styles.title}>{fieldRulesText}</span>
          <span>{configureRules}</span>
        </div>
        <div>
          <Button onClick={onPressConfigure} style={{ marginRight: 5 }}>
            <PlusOutlined />
            {newRuleText}
          </Button>
        </div>
      </div>
    )
  }

  const onCloseModal = (e) => {
    setVisibleModal(false)
  }

  const renderActionRow = (
    { key, icon, text, events }: ActionProp,
    i,
    rowStatus
  ) => {
    const child = (
      <div
        className={classNames(
          styles.actionRow,
          !rowStatus ? styles.actionRowDisable : ''
        )}
        key={i}
        onClick={() => {
          if (!rowStatus) return true
          if (key === 'email') return true
          onChangeThen(thenSelectedItem, [
            {
              key: 'action',
              value: key,
            },
          ])
          setVisibleModal(false)
        }}
      >
        <div>{icon}</div>
        <div>
          <Title level={5}>{text}</Title>
        </div>
      </div>
    )

    if (!events || events.length === 0) return child

    return (
      <Popover
        key={'renderActionRow-' + i.toString()}
        trigger="hover"
        title="Event type"
        placement="bottomLeft"
        content={
          <div className={styles.actionPopoverContainer}>
            {events.map((e, event_index) => {
              return (
                <div
                  className={styles.item}
                  key={
                    'renderActionRow-' +
                    i.toString() +
                    '-' +
                    event_index.toString()
                  }
                  onClick={() => {
                    onChangeThen(thenSelectedItem, [
                      {
                        key: 'action',
                        value: key,
                      },
                      {
                        key: 'event',
                        value: e.key,
                      },
                    ])
                    setVisibleModal(false)
                  }}
                >
                  <Title level={5}>{e.text}</Title>
                  <p>{e.subtext}</p>
                </div>
              )
            })}
          </div>
        }
      >
        {child}
      </Popover>
    )
  }

  const validateRule = () => {
    const emptyIf = ifData.answers.filter((answer) => answer.condition === '')
    const emptyOperator = ifData.answers.filter(
      (answer) => answer.operator === ''
    )
    const emptyThenData = thenData.filter((thenData) => thenData.to === '')

    if (
      !ruleName ||
      emptyIf.length > 0 ||
      emptyOperator.length > 0 ||
      emptyThenData.length > 0
    ) {
      return true
    }
    return false
  }
  return (
    <>
      {configureMode && rules.length > 0 && <RulesAddContainer />}
      <div className={styles.main}>
        <Modal
          visible={visibleModal}
          title={'Action - choose item and type of event'}
          onCancel={onCloseModal}
          footer={null}
          width={345}
        >
          <div className={styles.actionModal}>
            <div className={styles.actionOptionsContainer}>
              <p style={{ paddingTop: 0 }}>{actionTitle}</p>
              {actions?.map((action, i) => {
                return renderActionRow(action, i, true)
              })}
            </div>
            <div className={styles.actionOptionsContainer}>
              <p>{actionsNotAvailableTitle}</p>
              {actionsNotAvailable?.map((action, i) => {
                return renderActionRow(action, i, false)
              })}
            </div>
          </div>
        </Modal>

        {configureMode ? (
          <NoRulesContainer />
        ) : (
          <div className={styles.rulesContainer}>
            <div className={styles.addRuleContainer}>
              <div className={styles.left}>
                <span>{ruleNameText}</span>
                <Input
                  placeholder={newRuleText}
                  value={ruleName}
                  maxLength={100}
                  onChange={(e) => setRuleName(e.target.value)}
                />
              </div>
              <div className={styles.right}>
                <Button onClick={onPressCancel} style={{ marginRight: 5 }}>
                  {cancelText}
                </Button>
                <Button
                  type="primary"
                  disabled={validateRule()}
                  onClick={onPressSaveRules}
                >
                  {saveRuleText}
                </Button>
              </div>
            </div>
            <div className={styles.rulesDetailsContainer}>
              <div className={styles.segmentContainer}>
                <div className={styles.left}>
                  <div className={styles.labelContainer}>
                    <span>{ifText}</span>
                  </div>
                  <div className={styles.progIfLine}></div>
                </div>
                <div className={styles.right}>
                  <div className={styles.question}>
                    <Select
                      style={{ width: 250 }}
                      value={ifData.condition_met}
                      onChange={(e) => {
                        updateIfData('condition_met', e)
                      }}
                    >
                      <Option value="any">Any</Option>
                      <Option value="all">All</Option>
                    </Select>
                    <span>{ifConditionText}:</span>
                  </div>

                  {ifData.answers.map((ans, i) => {
                    return (
                      <>
                        {i !== 0 && (
                          <div
                            className={classNames(
                              styles.answer,
                              styles.answerMet
                            )}
                            key={'ifdata-' + i.toString()}
                          >
                            <div className={styles.progIfLine}></div>
                            <div className={styles.conditionMet}>
                              {ifData.condition_met === 'all' ? 'and' : 'or'}
                            </div>
                          </div>
                        )}
                        <div className={styles.answer} key={i}>
                          <div className={styles.progIfLine}></div>
                          <Select
                            style={{ width: 250 }}
                            value={ans.answer}
                            onChange={(e) =>
                              onChangeAnswer(ans.id, 'answer', e)
                            }
                          >
                            <OptGroup label="Form Answers">
                              {Object.keys(answersOptions).map(function (
                                key,
                                index
                              ) {
                                return (
                                  <Option
                                    key={'answersOptions-' + index.toString()}
                                    value={key}
                                  >
                                    {answersOptions[key].answer}
                                  </Option>
                                )
                              })}
                            </OptGroup>
                            <OptGroup label="Client Details">
                              {Object.keys(answersClientOptions).map(function (
                                key,
                                index
                              ) {
                                return (
                                  <Option
                                    key={
                                      'answersClientOptions-' + index.toString()
                                    }
                                    value={key}
                                  >
                                    {answersClientOptions[key].answer}
                                  </Option>
                                )
                              })}
                            </OptGroup>
                          </Select>
                          <div
                            className={
                              ans.operator === '' ? styles.emptyCondition : ''
                            }
                          >
                            <Select
                              style={{ width: 200 }}
                              value={ans.operator}
                              onChange={(e) =>
                                onChangeAnswer(ans.id, 'operator', e)
                              }
                            >
                              {Object.keys(operatorOptions)
                                .filter(
                                  (key, index) => ifOperators.indexOf(key) > -1
                                )
                                .map(function (key, index) {
                                  return (
                                    <Option
                                      key={
                                        'operatorOptions-' + index.toString()
                                      }
                                      value={key}
                                    >
                                      {operatorOptions[key]}
                                    </Option>
                                  )
                                })}
                            </Select>
                          </div>
                          <div
                            className={
                              ans.condition === '' ? styles.emptyCondition : ''
                            }
                          >
                            {ans.conditionType === 'text' && (
                              <Input
                                placeholder={ruleConditionPlaceHolder}
                                value={ans.condition}
                                onChange={(e) =>
                                  onChangeAnswer(
                                    ans.id,
                                    'condition',
                                    e.target.value
                                  )
                                }
                              />
                            )}
                            {ans.conditionType === 'number' && (
                              <InputNumber
                                placeholder={ruleConditionPlaceHolder}
                                value={ans.condition}
                                onChange={(e) =>
                                  onChangeAnswer(ans.id, 'condition', e)
                                }
                              />
                            )}
                            {ans.conditionType === 'singlechoice' && (
                              <Select
                                showSearch
                                placeholder={ruleConditionPlaceHolder}
                                optionFilterProp="children"
                                value={ans.condition}
                                onChange={(e) =>
                                  onChangeAnswer(ans.id, 'condition', e)
                                }
                              >
                                {ans.conditionValues?.map((conditionVal) => (
                                  <Option
                                    key={conditionVal.id}
                                    value={conditionVal.id}
                                  >
                                    {conditionVal.name}
                                  </Option>
                                ))}
                              </Select>
                            )}
                            {ans.conditionType === 'multiplechoice' && (
                              <Select
                                showSearch
                                mode="multiple"
                                placeholder={ruleConditionPlaceHolder}
                                value={ans.condition}
                                onChange={(e) =>
                                  onChangeAnswer(ans.id, 'condition', e)
                                }
                              >
                                {ans.conditionValues?.map((conditionVal) => (
                                  <Option
                                    key={conditionVal.id}
                                    value={conditionVal.id}
                                  >
                                    {conditionVal.name}
                                  </Option>
                                ))}
                              </Select>
                            )}
                          </div>
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
                      </>
                    )
                  })}
                </div>
              </div>

              <div className={styles.segmentContainer}>
                <div className={styles.left}>
                  <div className={styles.labelContainer}>
                    <span>{thenText}</span>
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
                    <span>{thenConditionText}</span>
                  </div>

                  {thenData.map((t, i) => {
                    const selectedAct = actions.find((f) => f.key === t.action)
                    return (
                      <div
                        className={styles.answerThen}
                        key={'thenData-' + i.toString()}
                      >
                        <div className={styles.progIfLine}></div>
                        <div
                          className={styles.formGroup}
                          style={{
                            minWidth: 250,
                            marginRight: 10,
                            marginTop: 21,
                          }}
                        >
                          <div
                            className={styles.formField}
                            onClick={(e) => {
                              setThenSelectedItem(t?.id)
                              setVisibleModal(true)
                            }}
                          >
                            <span>{selectedAct?.text}</span>
                            <DownOutlined />
                          </div>
                        </div>
                        {(t.action === 'display_notice_cancel_booking' ||
                          t.action === 'display_notice') && (
                          <RulesActionDisplayCancel
                            t={t}
                            onChangeThen={onChangeThen}
                          />
                        )}
                        {t.action === 'sms' && (
                          <RulesActionSms t={t} onChangeThen={onChangeThen} />
                        )}
                        {t.action === 'activity' && (
                          <RulesActionActivity
                            t={t}
                            onChangeThen={onChangeThen}
                          />
                        )}
                        {t.action === 'email' && (
                          <RulesActionEmail t={t} onChangeThen={onChangeThen} />
                        )}
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
