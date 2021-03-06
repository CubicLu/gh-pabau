import React, { FC } from 'react'
import { Form as AntForm, Input, Radio, Checkbox, Select } from 'formik-antd'
// import { Radio } from 'antd'
import { Col, Row, Collapse } from 'antd'
import styles from './CrudTable.module.less'
import { ColorPicker, FontIcon, HelpTooltip, TimeInput } from '@pabau/ui'
import { FormikContextType } from 'formik'
import classNames from 'classnames'
import {
  SendOutlined,
  PhoneOutlined,
  MessageOutlined,
  TeamOutlined,
  MedicineBoxOutlined,
  CustomerServiceOutlined,
  BellOutlined,
  ShoppingOutlined,
  ClockCircleOutlined,
  CameraOutlined,
  TrophyOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons'
import moment from 'moment'

const { Panel } = Collapse

interface P {
  schema: Schema
  /* eslint-disable @typescript-eslint/no-explicit-any */
  formik: FormikContextType<any>
  layout?: 'horizontal' | 'inline' | 'vertical'
}

const CheckboxGroup = Checkbox.Group

const Form: FC<P> = ({ schema, formik, layout = 'vertical' }) => {
  const { fields } = schema
  const { values } = formik

  const subjectOptions = [
    {
      key: 'Send',
      value: <SendOutlined />,
    },
    {
      key: 'Phone',
      value: <PhoneOutlined />,
    },
    {
      key: 'Chat',
      value: <MessageOutlined />,
    },
    {
      key: 'Team',
      value: <TeamOutlined />,
    },
    {
      key: 'Medical',
      value: <MedicineBoxOutlined />,
    },
    {
      key: 'Customer',
      value: <CustomerServiceOutlined />,
    },
    {
      key: 'Emergency',
      value: <BellOutlined />,
    },
    {
      key: 'Reward',
      value: <TrophyOutlined />,
    },
    {
      key: 'Shopping',
      value: <ShoppingOutlined />,
    },
    {
      key: 'Time',
      value: <ClockCircleOutlined />,
    },
    {
      key: 'Camera',
      value: <CameraOutlined />,
    },
    {
      key: 'Location',
      value: <EnvironmentOutlined />,
    },
  ]

  return (
    <AntForm layout={layout} requiredMark={false}>
      <Row>
        {Object.entries(fields).map(
          (
            [
              name,
              {
                short,
                shortLower,
                placeholder,
                tooltip,
                description,
                extra,
                min,
                type,
                radio,
                full,
                collapsible,
                col = 24,
                selectOptions,
                required,
                defaultvalue,
              },
            ],
            i
          ) => (
            <Col span={col} key={name}>
              {type === 'subjects' ? (
                <AntForm.Item key={name} name={name}>
                  <Row>
                    {subjectOptions.map((s, i) => (
                      <Col
                        key={i}
                        className={classNames(
                          styles.formSubjectItem,
                          values[name] === s.key &&
                            styles.formSubjectItemSelected
                        )}
                        onClick={() => formik.setFieldValue(name, s.key)}
                      >
                        {s.value}
                      </Col>
                    ))}
                  </Row>
                </AntForm.Item>
              ) : null}
              {type === 'radio-group' ? (
                <AntForm.Item key={name} name={name}>
                  <Radio.Group name={name}>
                    {radio.map((val, i) => (
                      <Radio name={name} key={i} value={val.value}>
                        {val.label}
                      </Radio>
                    ))}
                  </Radio.Group>
                </AntForm.Item>
              ) : null}
              {type === 'days-checkbox' && (
                <div>
                  <AntForm.Item label={short} key={name} name={name}>
                    <CheckboxGroup name={name} options={selectOptions} />
                  </AntForm.Item>
                </div>
              )}

              {type === 'time' && (
                <div
                  className={
                    i === 1
                      ? styles.inputTimeWrapper
                      : styles.inputSecondTimeWrapper
                  }
                >
                  <AntForm.Item
                    label={short}
                    key={name}
                    name={name}
                    className={
                      values[name] === '' &&
                      formik.errors?.name &&
                      styles.errorTimeWrapper
                    }
                  >
                    <TimeInput
                      name={name}
                      value={
                        values[name].length > 0
                          ? values[name].length > 5
                            ? moment(
                                moment().format('YYYY-MM-DD') +
                                  ' ' +
                                  values[name].slice(0, 5)
                              )
                            : moment(
                                moment().format('YYYY-MM-DD') +
                                  ' ' +
                                  values[name]
                              )
                          : values[name]
                      }
                      onChange={(time, timeString) => {
                        formik.setFieldValue(name, timeString)
                      }}
                    />
                    {values[name] === '' && formik.errors?.name && (
                      <span style={{ color: '#f5222d' }}>
                        {formik.errors[name]}
                      </span>
                    )}
                  </AntForm.Item>
                </div>
              )}
              {type === 'icon' && values.indicator === 'ICON' && (
                <AntForm.Item key={name} name={name}>
                  <FontIcon
                    max={60}
                    height={172}
                    selectedIcon={
                      values.icon.includes('fa')
                        ? values.icon.replace(/fa-/, '')
                        : values.icon
                    }
                    onIconSelected={(icon) => {
                      values.icon = icon
                    }}
                  />
                </AntForm.Item>
              )}
              {type === 'select' && (
                <AntForm.Item label={full} name={name} required>
                  <Select
                    name={name}
                    style={{ width: '100%' }}
                    defaultValue={defaultvalue}
                  >
                    {selectOptions?.map((option) => {
                      return (
                        <Select.Option value={option.value} key={option.label}>
                          {option.label}
                        </Select.Option>
                      )
                    })}
                  </Select>
                </AntForm.Item>
              )}
              {type === 'color-picker' && (
                <AntForm.Item key={name} name={name} required={required}>
                  <div style={{ width: '344px' }}>
                    <ColorPicker
                      selectedColor={values.color || values?.icon_color}
                      isDarkColor={true}
                      onSelected={(val) => {
                        formik.setFieldValue(name, val)
                      }}
                      heading={
                        (values.appointment_type === 'LINE'
                          ? 'Line '
                          : 'Icon ') + full
                      }
                    />
                    {!values[name] && formik.errors?.color && (
                      <span style={{ color: 'red' }}>
                        {formik.errors?.color}
                      </span>
                    )}
                  </div>
                </AntForm.Item>
              )}
              {type === 'checkbox' && (
                <AntForm.Item key={name} name={name}>
                  <Checkbox
                    name={name}
                    defaultChecked={true}
                    className={'track-time-checkbox'}
                  >
                    {full}
                  </Checkbox>
                  {description && (
                    <HelpTooltip placement={'top'} helpText={description} />
                  )}
                </AntForm.Item>
              )}

              {collapsible && (
                <Collapse
                  className={styles.advanceCollapsible}
                  defaultActiveKey={'0'}
                  ghost
                  expandIconPosition="right"
                >
                  <Panel header={extra} key="1">
                    {(type === 'string' || type === 'number') && (
                      <AntForm.Item label={short} name={name}>
                        <Input
                          name={name}
                          type={type}
                          placeholder={placeholder}
                          autoFocus={i === 0}
                        />
                      </AntForm.Item>
                    )}
                  </Panel>
                </Collapse>
              )}

              {(type === 'string' || type === 'number') && !collapsible && (
                <AntForm.Item
                  key={name}
                  label={short}
                  name={name}
                  required={!!min}
                  tooltip={tooltip}
                  extra={extra && <div>{extra}</div>}
                >
                  <Input
                    name={name}
                    type={type}
                    onChange={(e) => {
                      formik.handleChange(e)
                      formik.setFieldTouched(name, true)
                    }}
                    placeholder={placeholder}
                    autoFocus={i === 0}
                    disabled={
                      schema?.disable
                        ? values[schema?.disable.conditionalField]
                          ? true
                          : false
                        : false
                    }
                  />
                </AntForm.Item>
              )}
            </Col>
          )
        )}
      </Row>
    </AntForm>
  )
}

export default Form
