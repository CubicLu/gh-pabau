import React, { useState } from 'react'
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
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
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
  const { t } = useTranslationI18()
  const router = useRouter()
  const [active, setActive] = useState(true)

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
    type: Yup.string().required(
      t('setup.senders.create.validate.type.required')
    ),
    fromName: Yup.string().required(
      t('setup.senders.create.validate.fromname.required')
    ),
    fromEmail: Yup.string().email(
      t('setup.senders.create.validate.fromemail.email')
    ),
    fromCompanyEmail: Yup.string().email(
      t('setup.senders.create.validate.fromcompanyemail.email')
    ),
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
            title={t('setup.senders.create')}
            visible={true}
            operations={[OperationType.active, OperationType.create]}
            createBtnText={t('common-label-create')}
            activeBtnText={
              active ? t('common-label-active') : t('common-label-inactive')
            }
            enableCreateBtn={
              !!(
                values.type &&
                values.fromName &&
                (values.type !== 'email' || values.fromEmail) &&
                (!values.isUseCompanyEmail || values.fromCompanyEmail) &&
                (!values.isEnterpriseEmail || values.replyTo)
              )
            }
            activated={active}
            onActivated={(val) => setActive(val)}
            onBackClick={() => router.push('/setup/senders')}
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
                <div className={styles.cardHeader}>
                  {t('setup.senders.create.form.field.type')}
                </div>
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
                    <div className={styles.title}>
                      {t('setup.senders.create.form.field.email')}
                    </div>
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
                    <div className={styles.title}>
                      {t('setup.senders.create.form.field.sms')}
                    </div>
                  </Button>
                </div>
              </div>

              <div className={styles.cardWrapper}>
                <div className={styles.cardHeader}>
                  {t('setup.senders.create.form.field.sender')}
                </div>
                <div className={styles.formElement}>
                  <Input
                    label={t('setup.senders.create.form.field.fromname')}
                    placeholder={t(
                      'setup.senders.create.form.field.fromname.placeholder'
                    )}
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
                      <span>
                        {t('setup.senders.create.form.field.defaultsender')}
                      </span>
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
                        <span>
                          {t('setup.senders.create.form.field.enablereplies')}
                        </span>
                        <HelpTooltip
                          placement="top"
                          helpText={t(
                            'setup.senders.create.form.field.enablereplies.tooltip'
                          )}
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
                        label={t('setup.senders.create.form.field.fromemail')}
                        placeholder={t(
                          'setup.senders.create.form.field.fromemail.placeholder'
                        )}
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
                        <div>
                          {t('setup.senders.create.form.field.usecompanyemail')}
                        </div>
                        <HelpTooltip
                          placement="top"
                          helpText={t(
                            'setup.senders.create.form.field.usecompanyemail.tooltip'
                          )}
                        />
                        <PabauPlus
                          label={t('common-label-plus')}
                          modalType="Marketing"
                        />
                      </Space>
                    </div>
                    {values.isUseCompanyEmail && (
                      <div className={styles.formElement}>
                        <Input
                          type="email"
                          label={t('setup.senders.create.form.field.fromemail')}
                          placeholder={t(
                            'setup.senders.create.form.field.fromemail.placeholder'
                          )}
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
                        <div>
                          {t('setup.senders.create.form.field.autoupload')}
                        </div>
                        <PabauPlus
                          label={t('common-label-plus')}
                          modalType="Marketing"
                        />
                      </Space>
                    </div>
                  </>
                )}
              </div>

              <div className={styles.advancedSettings}>
                <Collapse ghost>
                  <Panel
                    header={t('setup.senders.create.form.advanced')}
                    key="advanced-settings"
                  >
                    <div className={styles.cardWrapper}>
                      <div className={styles.cardHeader}>Sending criteria</div>
                      <div
                        className={classNames(
                          styles.formElement,
                          styles.criteriaWrapper
                        )}
                      >
                        <SimpleDropdown
                          label={t(
                            'setup.senders.create.advanced.sendingcriteria'
                          )}
                          className={styles.criteriaItem}
                          dropdownItems={masterCriteriaOptions}
                          placeholder={t(
                            'setup.senders.create.advanced.sendingcriteria.placeholder'
                          )}
                          name="masterCriteria"
                          onSelected={(value) =>
                            handleChange({
                              target: { value, name: 'masterCriteria' },
                            })
                          }
                        />
                        <div className={styles.criteriaDivider}>
                          {t('setup.senders.create.advanced.criterial.divider')}
                        </div>
                        <SimpleDropdown
                          label={t(
                            'setup.senders.create.advanced.sendingcriteria'
                          )}
                          className={styles.criteriaItem}
                          dropdownItems={subCriteriaOptions}
                          placeholder={t(
                            'setup.senders.create.advanced.sendingcriteria.placeholder'
                          )}
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
                      <div className={styles.cardHeader}>
                        {t('setup.senders.create.advanced.custommergetags')}
                      </div>
                      {values.mergeTags.map((tag, index) => (
                        <div className={styles.mergeTag} key={index}>
                          <SimpleDropdown
                            label={t('setup.senders.create.advanced.tagtext')}
                            className={styles.formElement}
                            placeholder={t(
                              'setup.senders.create.advanced.tagtext.placeholder'
                            )}
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
                            label={t('setup.senders.create.advanced.tagvalue')}
                            className={styles.formElement}
                            placeholder={t(
                              'setup.senders.create.advanced.tagvalue.placeholder'
                            )}
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
                        {t('setup.senders.create.addnew')}
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
