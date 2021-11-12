import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import {
  FullScreenReportModal,
  OperationType,
  Button,
  Input,
  Switch,
  SimpleDropdown,
  HelpTooltip,
  PabauPlus,
} from '@pabau/ui'
import { useRouter } from 'next/router'
import styles from '../create.module.less'
import {
  CheckCircleFilled,
  MailOutlined,
  MessageOutlined,
} from '@ant-design/icons'
import { Collapse, Space } from 'antd'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useTranslationI18 } from '../../../../hooks/useTranslationI18'
import {
  SenderItem,
  subCriteriaOptions,
  masterCriteriaOptions,
  mergeTagTypeOptions,
} from '../../senders'
import { Form } from 'formik-antd'

const { Panel } = Collapse
export const senderItems: SenderItem[] = [
  {
    id: '001',
    type: 'email',
    fromName: 'Clinic Bookings',
    fromEmail: 'william@pabau.com',
    isEnableReplies: true,
    isDefaultSender: false,
    mergeTags: [],
  },
  {
    id: '002',
    type: 'sms',
    fromName: 'The Health Clinic',
    isDefaultSender: true,
    isEnableReplies: true,
    mergeTags: [],
  },
  {
    id: '003',
    type: 'sms',
    fromName: 'Surgical Clinic',
    isDefaultSender: false,
    mergeTags: [],
  },
]
export const EditSender: React.FC = () => {
  const { t } = useTranslationI18()
  const router = useRouter()
  const [active, setActive] = useState(true)
  const { id } = router.query
  const [initialValues, setInitialValues] = useState<SenderItem | null>(null)
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

  useEffect(() => {
    const item = senderItems.find((item) => item.id === id)
    if (item) {
      setInitialValues({ ...item })
    }
  }, [id])

  if (!initialValues) return null

  return (
    <Formik<SenderItem>
      initialValues={initialValues}
      validationSchema={validation}
      onSubmit={async (values: SenderItem) => {
        const index = senderItems.findIndex((item) => item.id === id)
        if (index !== -1) {
          senderItems[index] = { ...values }
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
              const index = senderItems.findIndex((item) => item.id === id)
              if (index !== -1) {
                senderItems.splice(index, 1)
              }

              router.push('/setup/senders')
            }}
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
                        <PabauPlus label="Plus" modalType="Marketing" />
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
                      <div className={styles.cardHeader}>
                        {t('setup.senders.create.advanced.sendingcriteria')}
                      </div>
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
                          value={values.masterCriteria}
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
                          value={values.subCriteria}
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
                            dropdownItems={mergeTagTypeOptions}
                            placeholder={t(
                              'setup.senders.create.advanced.tagtext.placeholder'
                            )}
                            value={tag.type}
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
                            text={tag.value}
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

export default EditSender
