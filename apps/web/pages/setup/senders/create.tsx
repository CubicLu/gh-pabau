import React from 'react'
import classNames from 'classnames'
import {
  FullScreenReportModal,
  OperationType,
  Button,
  Input,
  Switch,
  SimpleDropdown,
  PabauPlus,
  HelpTooltip,
} from '@pabau/ui'
import { useRouter } from 'next/router'
import styles from './create.module.less'
import {
  CheckCircleFilled,
  MailOutlined,
  MessageOutlined,
} from '@ant-design/icons'
import { Collapse, Space } from 'antd'
import { Formik } from 'formik'
import * as Yup from 'yup'

import {
  SenderItem,
  senderItems,
  masterCriteriaOptions,
  subCriteriaOptions,
  mergeTagTypeOptions,
} from '../senders'
import { Form } from 'formik-antd'

const { Panel } = Collapse

export const CreateSender: React.FC = () => {
  const router = useRouter()

  const initialValues: SenderItem = {
    type: 'email',
    fromName: '',
    fromEmail: '',
    fromCompanyEmail: '',
    isDefaultSender: true,
    masterCriteria: '',
    subCriteria: '',
    mergeTags: [
      {
        type: '',
        value: '',
      },
    ],
  }
  const validation = Yup.object({
    type: Yup.string().required('Sender type is required'),
    fromName: Yup.string().required('From name is required'),
    fromEmail: Yup.string().email('Invalid email'),
    fromCompanyEmail: Yup.string().email('Invalid company email'),
  })

  return (
    <Formik<SenderItem>
      initialValues={initialValues}
      validationSchema={validation}
      onSubmit={async (values: SenderItem) => {
        senderItems.push({
          ...values,
          id: String(senderItems.length + 1),
        })
        router.push('/setup/senders')
      }}
      render={({ values, errors, touched, handleChange, handleSubmit }) => (
        <Form>
          <FullScreenReportModal
            title="Create a Sender"
            visible={true}
            operations={[
              OperationType.active,
              OperationType.cancel,
              OperationType.create,
            ]}
            cancelBtnText="Cancel"
            createBtnText="Create"
            enableCreateBtn={
              !!(
                values.type &&
                values.fromName &&
                (values.type !== 'email' || values.fromEmail) &&
                (!values.isUseCompanyEmail || values.fromCompanyEmail) &&
                (!values.isEnterpriseEmail || values.replyTo)
              )
            }
            activated={true}
            onBackClick={() => router.push('/setup/senders')}
            onCancel={() => router.push('/setup/senders')}
            onCreate={() => {
              // Remove last tag element
              const lastTag =
                values.mergeTags.length > 0
                  ? values.mergeTags[values.mergeTags.length - 1]
                  : null
              if (!lastTag?.type && !lastTag?.value) {
                values.mergeTags.splice(-1, 1)
              }

              handleSubmit()
            }}
          >
            <div className={styles.container}>
              <div className={styles.cardWrapper}>
                <div className={styles.cardHeader}>Type</div>
                <div className={styles.typesWrapper}>
                  <Button
                    className={classNames(
                      styles.typeItem,
                      values.type === 'email' && styles.selected
                    )}
                    onClick={() =>
                      handleChange({
                        target: { name: 'type', value: 'email' },
                      })
                    }
                  >
                    {values.type === 'email' && (
                      <CheckCircleFilled
                        color="primary"
                        className={styles.checkIcon}
                      />
                    )}
                    <MailOutlined className={styles.typeIcon} />
                    <div className={styles.title}>Email</div>
                  </Button>
                  <Button
                    className={classNames(
                      styles.typeItem,
                      values.type === 'sms' && styles.selected
                    )}
                    onClick={() =>
                      handleChange({ target: { name: 'type', value: 'sms' } })
                    }
                  >
                    {values.type === 'sms' && (
                      <CheckCircleFilled
                        color="primary"
                        className={styles.checkIcon}
                      />
                    )}
                    <MessageOutlined className={styles.typeIcon} />
                    <div className={styles.title}>SMS</div>
                  </Button>
                </div>
              </div>

              <div className={styles.cardWrapper}>
                <div className={styles.cardHeader}>Sender</div>
                <div className={styles.formElement}>
                  <Input
                    label="From name"
                    placeholder="Enter name"
                    name="fromName"
                    onChange={(value) =>
                      handleChange({ target: { value, name: 'fromName' } })
                    }
                  />
                </div>
                <div className={styles.formElement}>
                  <Space size={16}>
                    <Space className={styles.switchItem} size={8}>
                      <Switch
                        checked={values.isDefaultSender}
                        onChange={(value) =>
                          handleChange({
                            target: { value, name: 'isDefaultSender' },
                          })
                        }
                      />
                      <span>Default Sender</span>
                    </Space>
                    {values.type === 'sms' && (
                      <Space className={styles.switchItem} size={8}>
                        <Switch
                          checked={values.isEnableReplies}
                          onChange={(value) =>
                            handleChange({
                              target: { value, name: 'isEnableReplies' },
                            })
                          }
                        />
                        <span>Enable Replies</span>
                        <HelpTooltip
                          placement="top"
                          helpText="In order to receive replies, we have changed your senders name to your inbox number"
                        />
                      </Space>
                    )}
                  </Space>
                </div>
                {values.type === 'email' && (
                  <>
                    <div className={styles.formElement}>
                      <Input
                        type="email"
                        label="From email"
                        placeholder="e.g. bookings@clinic.com"
                        name="fromEmail"
                        onChange={(value) =>
                          handleChange({ target: { value, name: 'fromEmail' } })
                        }
                      />
                    </div>
                    <div className={styles.formElement}>
                      <Space className={styles.switchItem} size={8}>
                        <Switch
                          checked={values.isUseCompanyEmail}
                          onChange={(value) =>
                            handleChange({
                              target: { value, name: 'isUseCompanyEmail' },
                            })
                          }
                        />
                        <div>Use a company email</div>
                        <HelpTooltip
                          placement="top"
                          helpText="Lorem ipsum dolor sit amet"
                        />
                        <PabauPlus label="Plus" modalType="Marketing" />
                      </Space>
                    </div>
                    {values.isUseCompanyEmail && (
                      <div className={styles.formElement}>
                        <Input
                          type="email"
                          label="From email"
                          placeholder="e.g. bookings@clinic.com"
                          name="fromCompanyEmail"
                          onChange={(value) =>
                            handleChange({
                              target: { value, name: 'fromCompanyEmail' },
                            })
                          }
                        />
                      </div>
                    )}
                    <div className={styles.formElement}>
                      <Space className={styles.switchItem} size={8}>
                        <Switch
                          checked={values.isAutoUploadReplies}
                          onChange={(value) =>
                            handleChange({
                              target: { value, name: 'isAutoUploadReplies' },
                            })
                          }
                        />
                        <div>Automatically upload client replies to record</div>
                        <PabauPlus label="Plus" modalType="Marketing" />
                      </Space>
                    </div>
                  </>
                )}
              </div>

              <div className={styles.advancedSettings}>
                <Collapse ghost>
                  <Panel header="Advanced settings" key="advanced-settings">
                    <div className={styles.cardWrapper}>
                      <div className={styles.cardHeader}>Sending criteria</div>
                      <div
                        className={classNames(
                          styles.formElement,
                          styles.criteriaWrapper
                        )}
                      >
                        <SimpleDropdown
                          label="Sending criteria"
                          className={styles.criteriaItem}
                          dropdownItems={masterCriteriaOptions}
                          placeholder="Select sending criteria"
                          name="masterCriteria"
                          onSelected={(value) =>
                            handleChange({
                              target: { value, name: 'masterCriteria' },
                            })
                          }
                        />
                        <div className={styles.criteriaDivider}>IS</div>
                        <SimpleDropdown
                          label="Sending criteria"
                          className={styles.criteriaItem}
                          dropdownItems={subCriteriaOptions}
                          placeholder="Select sending criteria"
                          name="subCriteria"
                          onSelected={(value) =>
                            handleChange({
                              target: { value, name: 'subCriteria' },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className={styles.cardWrapper}>
                      <div className={styles.cardHeader}>Custom merge tags</div>
                      {values.mergeTags.map((tag, index) => (
                        <div className={styles.mergeTag} key={index}>
                          <SimpleDropdown
                            label="Tag text"
                            className={styles.formElement}
                            placeholder="Merge tag text"
                            dropdownItems={mergeTagTypeOptions}
                            name={`mergeTags[${index}].type`}
                            onSelected={(value) =>
                              handleChange({
                                target: {
                                  value,
                                  name: `mergeTags[${index}].type`,
                                },
                              })
                            }
                          />
                          <Input
                            label="Tag value"
                            className={styles.formElement}
                            placeholder="Merge tag value"
                            name={`mergeTags[${index}].value`}
                            onChange={(value) =>
                              handleChange({
                                target: {
                                  value,
                                  name: `mergeTags[${index}].value`,
                                },
                              })
                            }
                          />
                        </div>
                      ))}
                      <Button
                        size="small"
                        onClick={() =>
                          handleChange({
                            target: {
                              value: [
                                ...values.mergeTags,
                                { type: '', value: '' },
                              ],
                              name: 'mergeTags',
                            },
                          })
                        }
                        style={{ marginTop: 16 }}
                      >
                        Add new
                      </Button>
                    </div>
                  </Panel>
                </Collapse>
              </div>
            </div>
          </FullScreenReportModal>
        </Form>
      )}
    />
  )
}

export default CreateSender
