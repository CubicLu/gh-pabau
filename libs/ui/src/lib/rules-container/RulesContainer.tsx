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
import { Button, Input, Select, Typography, Alert, Modal, Popover } from 'antd'
import React, { FC, useState } from 'react'
import styles from './RulesContainer.module.less'
import classNames from 'classnames'

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
  answersOptions: { [key: string]: string }
  operatorOptions: { [key: string]: string }
  actionTitle: string
  actions: ActionProp[]
  actionsNotAvailableTitle: string
  actionsNotAvailable: ActionProp[]
}

interface ActionProp {
  key: string
  text: string
  icon: React.ReactNode
  events?: ActionEventProp[]
}

interface ActionEventProp {
  key: string
  text: string
  subtext: string
}

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
  event?: string
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
  operatorOptions,
  actionTitle,
  actions,
  actionsNotAvailableTitle,
  actionsNotAvailable,
}) => {
  const { Option } = Select

  const randomNumber = () => Math.round(Math.random() * 10000)

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
      action: 'email',
      template: '1',
      to: '',
    },
  ]

  const [rules, setRules] = useState<RuleProp[]>([])
  const [configureMode, setConfigureMode] = useState(true)
  const [ruleName, setRuleName] = useState('')
  const [ifData, setIfData] = useState(ifInitObj)
  const [thenData, setThenData] = useState(thenInitArr)
  const [visibleModal, setVisibleModal] = useState(false)
  const [thenSelectedItem, setThenSelectedItem] = useState(0)

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

  const onChangeThen = (id, dataArr) => {
    const updated = thenData.map((a) => {
      if (a.id === id) {
        for (const element of dataArr) {
          a[element.key] = element.value
        }
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
                            <div className={styles.answer} key={i}>
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
        key={i}
        trigger="hover"
        title="Event type"
        placement="bottomLeft"
        content={
          <div className={styles.actionPopoverContainer}>
            {events.map((e, i) => {
              return (
                <div
                  className={styles.item}
                  key={i}
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
                  disabled={!ruleName}
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
                      style={{ width: 200 }}
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
                          placeholder={ruleConditionPlaceHolder}
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
                      <div className={styles.answer} key={i}>
                        <div className={styles.progIfLine}></div>
                        <div
                          className={styles.formGroup}
                          style={{ minWidth: 200, marginRight: 10 }}
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
                        <div className={styles.formGroup}>
                          <label>Templates</label>
                          <Select
                            style={{ width: 200 }}
                            value={t.template}
                            onChange={(e) =>
                              onChangeThen(t.id, [
                                {
                                  key: 'template',
                                  value: e,
                                },
                              ])
                            }
                          >
                            <Option value="1">Default Template</Option>
                            <Option value="2">Client Email Template</Option>
                          </Select>
                        </div>
                        <div className={styles.formGroup}>
                          <label>To</label>
                          <Input
                            placeholder="Emails you'd like to send to"
                            value={t.to}
                            onChange={(e) =>
                              onChangeThen(t.id, [
                                {
                                  key: 'to',
                                  value: e.target.value,
                                },
                              ])
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
