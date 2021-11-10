import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import {
  FullScreenReportModal,
  OperationType,
  Button,
  Input,
  Switch,
  HelpTooltip,
  PabauPlus,
  Notification,
  NotificationType,
} from '@pabau/ui'
import { useRouter } from 'next/router'
import styles from '../create.module.less'
import {
  CheckCircleFilled,
  CheckOutlined,
  LockOutlined,
  MailOutlined,
  MessageOutlined,
  UnlockOutlined,
} from '@ant-design/icons'
import { Select, Space } from 'antd'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useTranslationI18 } from '../../../../hooks/useTranslationI18'
import {
  useGetCompanyEmailQuery,
  useGetCompanySmsQuery,
  useUpdateOneSmsSenderMutation,
  useUpdateOneCompanyEmailMutation,
  GetComSendersDocument,
  useDeleteOneCompanyEmailMutation,
  useDeleteOneSmsSenderMutation,
  CreateOneCompanyEmailDocument,
  CreateOneSmsSenderDocument,
} from '@pabau/graphql'
import { SenderItem } from '../../senders'
import { useMutation } from '@apollo/client'
import { Form } from 'formik-antd'
const { Option } = Select

export const EditSender: React.FC = () => {
  const { t } = useTranslationI18()
  const router = useRouter()
  const { id } = router.query
  const [active, setActive] = useState(true)
  const [initialValues, setInitialValues] = useState<SenderItem>(null)
  const [showDeleteNotification, setShowDeleteNotification] = useState(false)

  const { data: getSendersData } = useGetCompanyEmailQuery({
    skip: !id,
    variables: {
      emailId: typeof id === 'string' && Number.parseInt(id),
    },
    fetchPolicy: 'no-cache',
  })
  const { data: getSendersSmsData } = useGetCompanySmsQuery({
    skip: !id,
    variables: {
      smsId: typeof id === 'string' && Number.parseInt(id),
    },
    fetchPolicy: 'no-cache',
  })

  const [updateOneEmailSenderMutations] = useUpdateOneCompanyEmailMutation({
    onCompleted(data) {
      if (data) {
        Notification(
          NotificationType.success,
          t('setup.senders.update.detail.success')
        )
      }
    },
    onError() {
      Notification(
        NotificationType.error,
        t('setup.senders.update.detail.error')
      )
    },
    refetchQueries: [{ query: GetComSendersDocument }],
  })

  const [updateOneSmsSenderMutations] = useUpdateOneSmsSenderMutation({
    onCompleted(data) {
      if (data) {
        Notification(
          NotificationType.success,
          t('setup.senders.update.detail.success')
        )
      }
    },
    onError() {
      Notification(
        NotificationType.error,
        t('setup.senders.update.detail.error')
      )
    },
    refetchQueries: [{ query: GetComSendersDocument }],
  })

  const [deleteEmailSender] = useDeleteOneCompanyEmailMutation({
    onCompleted(data) {
      if (data && showDeleteNotification) {
        Notification(
          NotificationType.success,
          t('setup.senders.delete.detail.success')
        )
        setShowDeleteNotification(false)
      }
    },
    onError() {
      Notification(
        NotificationType.error,
        t('setup.senders.delete.detail.success')
      )
    },
    refetchQueries: [{ query: GetComSendersDocument }],
  })
  const [deleteSmsSender] = useDeleteOneSmsSenderMutation({
    onCompleted(data) {
      if (data && showDeleteNotification) {
        Notification(
          NotificationType.success,
          t('setup.senders.delete.detail.success')
        )
        setShowDeleteNotification(false)
      }
    },
    onError() {
      Notification(
        NotificationType.error,
        t('setup.senders.delete.detail.error')
      )
    },
    refetchQueries: [{ query: GetComSendersDocument }],
  })

  useEffect(() => {
    if (getSendersData?.findFirstCompanyEmail) {
      const item = getSendersData?.findFirstCompanyEmail
      setInitialValues({
        id: item.email_id,
        type: 'email',
        fromName: item.senders_name,
        isDefaultSender: item.default_email === 1,
        fromEmail: item.company_email,
        visibility: item.visibility,
      })
    }
    if (getSendersSmsData?.findFirstSmsSender) {
      const item = getSendersSmsData?.findFirstSmsSender
      setInitialValues({
        id: item.smsd_id,
        type: 'sms',
        fromName: item.smsd_name,
        isDefaultSender: item.is_default,
      })
    }
  }, [getSendersData, getSendersSmsData])

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
      if (data) {
        Notification(
          NotificationType.success,
          t('setup.senders.update.detail.success')
        )
      }
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
      if (data) {
        Notification(
          NotificationType.success,
          t('setup.senders.update.detail.success')
        )
      }
    },
    onError(err) {
      Notification(
        NotificationType.error,

        t('setup.senders.create.senders.notification.error')
      )
    },
    refetchQueries: [{ query: GetComSendersDocument }],
  })

  if (!initialValues) return null

  return (
    <Formik<SenderItem>
      initialValues={initialValues}
      validationSchema={validation}
      onSubmit={async (values: SenderItem) => {
        if (values.type !== initialValues.type) {
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
                  visibility: values.visibility
                    ? Number.parseInt(String(values.visibility))
                    : 1,
                },
              },
              optimisticResponse: {},
            })
            deleteSmsSender({
              variables: {
                where: {
                  smsd_id: values.id as number,
                },
              },
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
                },
              },
              optimisticResponse: {},
            })
            deleteEmailSender({
              variables: {
                where: {
                  email_id: values.id as number,
                },
              },
            })
          }
          router.push('/setup/senders').then()
        } else {
          if (values.type === 'sms') {
            updateOneSmsSenderMutations({
              variables: {
                where: {
                  smsd_id: initialValues.id as number,
                },
                data: {
                  is_default: { set: values.isDefaultSender },
                  smsd_name: { set: values.fromName },
                },
              },
            })
          } else {
            updateOneEmailSenderMutations({
              variables: {
                where: {
                  email_id: initialValues.id as number,
                },
                data: {
                  default_email: { set: values.isDefaultSender ? 1 : 0 },
                  senders_name: { set: values.fromName },
                  visibility: {
                    set: Number.parseInt(String(values.visibility)),
                  },
                  company_email: {
                    set: values.isUseCompanyEmail
                      ? values.fromCompanyEmail
                      : values.fromEmail,
                  },
                },
              },
            })
          }
          router.push('/setup/senders').then()
        }
        router.push('/setup/senders').then()
      }}
      render={({ values, errors, touched, handleChange, handleSubmit }) => (
        <Form>
          <FullScreenReportModal
            title={t('setup.senders.edit')}
            visible={true}
            operations={[
              OperationType.active,
              OperationType.delete,
              OperationType.create,
            ]}
            deleteBtnText={t('common-label-delete')}
            createBtnText={t('common-label-save')}
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
            onDelete={() => {
              if (initialValues.type === 'email') {
                setShowDeleteNotification(true)
                deleteEmailSender({
                  variables: {
                    where: {
                      email_id: initialValues.id as number,
                    },
                  },
                })
                router.push('/setup/senders').then()
              } else {
                setShowDeleteNotification(true)
                deleteSmsSender({
                  variables: {
                    where: {
                      smsd_id: initialValues.id as number,
                    },
                  },
                })
                router.push('/setup/senders').then()
              }
            }}
            onCreate={() => {
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
                      handleChange({ target: { name: 'type', value: 'email' } })
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
                    text={values.fromName}
                    onChange={(value) =>
                      handleChange({
                        target: { name: 'fromName', value },
                      })
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
                        text={values.fromEmail}
                        onChange={(value) =>
                          handleChange({ target: { value, name: 'fromEmail' } })
                        }
                      />
                      <p className={styles.visibilityLabel}>
                        {t('setup.senders.visibility')}
                      </p>
                      <Select
                        defaultValue={'1'}
                        value={values?.visibility?.toString()}
                        defaultActiveFirstOption={true}
                        style={{ width: '100%' }}
                        onChange={(e) =>
                          handleChange({
                            target: { name: 'visibility', value: e },
                          })
                        }
                        menuItemSelectedIcon={<CheckOutlined />}
                      >
                        <Option value="1">
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
                        <PabauPlus label="Plus" modalType="Marketing" />
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
                          text={values.fromCompanyEmail}
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
            </div>
          </FullScreenReportModal>
        </Form>
      )}
    />
  )
}

export default EditSender
