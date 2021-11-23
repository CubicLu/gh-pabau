import React, { useEffect, useState } from 'react'
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
  Notification,
  NotificationType,
} from '@pabau/ui'
import { useRouter } from 'next/router'
import styles from './create.module.less'
import {
  CheckCircleFilled,
  MailOutlined,
  MessageOutlined,
  CheckOutlined,
  LockOutlined,
  UnlockOutlined,
} from '@ant-design/icons'
import { Collapse, Space, Select } from 'antd'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import {
  SenderItem,
  masterCriteriaOptions,
  subCriteriaOptions,
  mergeTagTypeOptions,
} from '../senders'
import { Form } from 'formik-antd'
import {
  CreateOneCompanyEmailDocument,
  CreateOneSmsSenderDocument,
  GetComSendersDocument,
} from '@pabau/graphql'
import { useMutation } from '@apollo/client'

const { Panel } = Collapse
const { Option } = Select
export const CreateSender: React.FC = () => {
  const { t } = useTranslationI18()
  const router = useRouter()
  const [active, setActive] = useState(true)
  console.log('router:::', router)
  const [, setTypeSenders] = useState('')

  useEffect(() => {
    if (router.query.type === 'email') setTypeSenders('email')
    else if (router.query.type === 'sms') setTypeSenders('sms')
    else router.push('/setup/senders').then()
    // if (router.query.type !== 'sms') router.push('/setup/senders').then()
  }, [router])

  const initialValues: SenderItem = {
    type: router.query.type as string,
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
    visibility: 1,
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

  const [addEmailSenders] = useMutation(CreateOneCompanyEmailDocument, {
    onCompleted(data) {
      Notification(
        NotificationType.success,
        t('setup.senders.create.senders.notification.success')
      )
      router.push('/setup/senders').then()
    },
    onError(err) {
      Notification(
        NotificationType.error,
        t('setup.senders.create.senders.notification.error')
      )
    },
    refetchQueries: [{ query: GetComSendersDocument }],
  })

  const [addSmsSenders] = useMutation(CreateOneSmsSenderDocument, {
    onCompleted(data) {
      Notification(
        NotificationType.success,
        t('setup.senders.create.senders.notification.success')
      )
      router.push('/setup/senders').then()
    },
    onError(err) {
      Notification(
        NotificationType.error,
        t('setup.senders.create.senders.notification.error')
      )
    },
    refetchQueries: [{ query: GetComSendersDocument }],
  })

  return (
    <Formik<SenderItem>
      initialValues={initialValues}
      validationSchema={validation}
      onSubmit={async (values: SenderItem) => {
        if (values.type === 'email') {
          await addEmailSenders({
            variables: {
              data: {
                Company: {},
                company_email: values.isUseCompanyEmail
                  ? values.fromCompanyEmail
                  : values.fromEmail,
                added_by: '',
                senders_name: values.fromName,
                confirmed: 1,
                hash: '',
                default_email: values.isDefaultSender ? 1 : 0,
                enterprise_email: 0,
                merge_tags: '',
                visibility: Number.parseInt(String(values.visibility)),
              },
            },
            optimisticResponse: {},
          })
        } else {
          await addSmsSenders({
            variables: {
              data: {
                Company: {},
                smsd_name: values.fromName,
                smsd_delete: 0,
                is_default: values.isDefaultSender,
                merge_tags: '',
                enable_replies: values.isEnableReplies ? 1 : 0,
              },
            },
            optimisticResponse: {},
          })
        }
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
                !(values.type === 'sms' && values.fromName.length > 11) &&
                !(values.type === 'email' && values.fromName.length > 50) &&
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

                  {values.type === 'email' && values.fromName.length > 50 && (
                    <span className={styles.error}>
                      {t(
                        'setup.senders.create.form.field.fromname.email.max.error'
                      )}
                    </span>
                  )}
                  {values.type === 'sms' && values.fromName.length > 11 && (
                    <span className={styles.error}>
                      {t(
                        'setup.senders.create.form.field.fromname.sms.max.error'
                      )}
                    </span>
                  )}
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
                      <p className={styles.visibilityLabel}>
                        {t('setup.senders.visibility')}
                      </p>

                      <Select
                        defaultValue={'1'}
                        defaultActiveFirstOption={true}
                        style={{ width: '100%' }}
                        onChange={(e) =>
                          handleChange({
                            target: { name: 'visibility', value: e },
                          })
                        }
                        menuItemSelectedIcon={<CheckOutlined />}
                      >
                        <Option value="1" selected>
                          <LockOutlined />{' '}
                          {t('setup.senders.visibility.private')}
                        </Option>

                        <Option value="0">
                          <UnlockOutlined />{' '}
                          {t('setup.senders.visibility.shared')}
                        </Option>
                      </Select>
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
