import React, { FC, useState, useRef, useEffect } from 'react'
import * as Yup from 'yup'
import { Form } from 'formik-antd'
import { Formik } from 'formik'
import { Row, Col } from 'antd'
import {
  FullScreenReportModal,
  OperationType as ReportOperationType,
  Input,
  ButtonSize as InputSize,
  ButtonCheckbox,
  Switch,
} from '@pabau/ui'
import { Typography, Select } from 'antd'
import {
  AlignLeftOutlined,
  DownOutlined,
  CalendarOutlined,
  PhoneOutlined,
  GlobalOutlined,
  CheckOutlined,
  MailOutlined,
  NumberOutlined,
} from '@ant-design/icons'
import styles from './index.module.less'
import { useTranslation } from 'react-i18next'
import AlignLeftIcon from '../../../../assets/images/icons/align-left.png'
import SelectCircleIcon from '../../../../assets/images/icons/select-circle.png'
import {
  useCustomFieldsGroupCountsLazyQuery,
  UpdateOneManageCustomFieldDocument,
  CreateOneManageCustomFieldDocument,
  DeleteOneManageCustomFieldDocument,
  CreateOneCustomFieldDisplayDocument,
} from '@pabau/graphql'
import { CreateGroupsTab } from './../CreateGroupsTab'
import { useMutation } from '@apollo/client'
import { Notification, NotificationType } from '@pabau/ui'

export interface EditCustomFieldProps {
  id?: number
  name?: string
  category?: string | number
  displayFor?: string
  visibleInClientDataView?: boolean
  appearsInAddClientView?: boolean
  required?: boolean
  fieldType?: string
  visibilityOption?: boolean
  in_cases?: string | number
  in_cases_text?: string
  status?: boolean
}

export interface CreateCustomFieldModalProps {
  visible?: boolean
  modalTitle: string
  selectedAttributeLabel: string
  onClose?: () => void
  values?: EditCustomFieldProps
}

export interface GroupProp {
  id: number | string
  name: string
  disabled: boolean
}

export const CreateCustomFieldModal: FC<CreateCustomFieldModalProps> = ({
  visible = true,
  modalTitle,
  selectedAttributeLabel,
  onClose,
  values,
  ...props
}) => {
  const { t } = useTranslation('common')
  const createFormRef = useRef(null)
  const [selectedFieldType, setSelectedFieldType] = useState('')
  const [groups, setGroups] = useState<GroupProp[]>([])
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [customFieldFormData, setCustomFieldFormData] = useState({
    name: values?.name ? values?.name : '',
    category: values?.category ? values?.category : '',
    displayFor: values?.displayFor,
    visibleInClientDataView: values?.visibleInClientDataView,
    appearsInAddClientView: values?.appearsInAddClientView,
    required: values?.required,
    fieldTypes: selectedFieldType
      ? selectedFieldType.toLowerCase()
      : 'single_line_text',
    visibilityOption: values?.visibilityOption,
    in_cases: values?.in_cases,
    in_cases_text: values?.in_cases_text,
    status: false,
  })

  useEffect(() => {
    setCustomFieldFormData({
      ...customFieldFormData,
      fieldTypes: selectedFieldType
        ? selectedFieldType.toLowerCase()
        : 'single_line_text',
    })
    /* eslint-disable-next-line */
  }, [selectedFieldType])

  const [
    fetchcustomFieldGroups,
    { data: customFieldGroups },
  ] = useCustomFieldsGroupCountsLazyQuery({ fetchPolicy: 'network-only' })

  useEffect(() => {
    fetchcustomFieldGroups({
      variables: {
        searchTerm: '',
      },
    })
  }, [fetchcustomFieldGroups])

  useEffect(() => {
    if (customFieldGroups) {
      const groups_ = [
        {
          id: 'new_category',
          name: 'New Category',
          disabled: false,
        },
        {
          id: 'System Fields',
          name: 'System Fields',
          disabled: true,
        },
        {
          id: 'Default Fields',
          name: 'Default Fields',
          disabled: true,
        },
      ]

      const groupsArr = customFieldGroups.findManyManageCustomFieldCategory.map(
        (c) => {
          return {
            id: c.id,
            name: c.name,
            disabled: false,
          }
        }
      )

      setGroups([...groups_, ...groupsArr])
    }
    /* eslint-disable-next-line */
  }, [customFieldGroups])

  useEffect(() => {
    if (values) {
      setSelectedFieldType(values?.fieldType)
      setCustomFieldFormData({
        ...customFieldFormData,
        name: values?.name,
        category: values?.category ? values?.category : '',
        displayFor: values?.displayFor,
        visibleInClientDataView: values?.visibleInClientDataView,
        appearsInAddClientView: values?.appearsInAddClientView,
        required: values?.required,
        visibilityOption: values?.visibilityOption,
        in_cases: values?.in_cases,
        in_cases_text: values?.in_cases_text,
        status: false,
      })
    }
    /* eslint-disable-next-line */
  }, [values, setCustomFieldFormData])

  const [createDisplayMutation] = useMutation(
    CreateOneCustomFieldDisplayDocument,
    {
      onError() {
        Notification(NotificationType.error, 'Something went wrong')
      },
    }
  )

  const createCustomFieldDisplayItem = (e) => {
    const {
      visibilityOption,
      in_cases,
      in_cases_text,
    } = createFormRef?.current?.values

    if (visibilityOption && in_cases && in_cases_text) {
      createDisplayMutation({
        variables: {
          data: {
            depends_on: Number(in_cases),
            value: in_cases_text,
            ManageCustomField: {
              connect: {
                id: e.id,
              },
            },
            Company: {
              connect: {
                id: 0,
              },
            },
          },
        },
      })
    }
  }

  const [createMutation] = useMutation(CreateOneManageCustomFieldDocument, {
    onCompleted(e) {
      createCustomFieldDisplayItem(e.createOneManageCustomField)
      Notification(
        NotificationType.success,
        t('setup.custom-fields.custom-field-created')
      )
      onClose?.()
    },
    onError() {
      Notification(NotificationType.error, 'Something went wrong')
    },
  })

  const [updateMutation] = useMutation(UpdateOneManageCustomFieldDocument, {
    onCompleted(e) {
      createCustomFieldDisplayItem(e.updateOneManageCustomField)
      Notification(
        NotificationType.success,
        t('setup.custom-fields.custom-field-updated')
      )
      onClose?.()
    },
    onError() {
      Notification(NotificationType.error, 'Something went wrong')
    },
  })

  const [deleteMutation] = useMutation(DeleteOneManageCustomFieldDocument, {
    onCompleted() {
      Notification(
        NotificationType.success,
        t('setup.custom-fields.custom-field-deleted')
      )
      onClose?.()
    },
    onError() {
      Notification(NotificationType.error, 'Something went wrong')
    },
  })

  const fieldTypes = [
    {
      key: 'single_line_text',
      label: t('setup.custom-fields.single-line-text'),
      icon: (
        <img
          src={AlignLeftIcon}
          alt={t('setup.custom-fields.single-line-text')}
          style={{ height: 15, width: 15, marginRight: 5, display: 'revert' }}
        />
      ),
    },
    {
      key: 'paragraph_text',
      label: t('setup.custom-fields.paragraph-text'),
      icon: <AlignLeftOutlined />,
    },
    {
      key: 'multiple_choice',
      label: t('setup.custom-fields.multiple-choice'),
      icon: <CheckOutlined />,
    },
    {
      key: 'single_choice',
      label: t('setup.custom-fields.single-choice'),
      icon: (
        <img
          src={SelectCircleIcon}
          alt={t('setup.custom-fields.single-choice')}
          style={{ height: 15, width: 15, marginRight: 5, display: 'revert' }}
        />
      ),
    },
    {
      key: 'dropdown',
      label: t('setup.custom-fields.dropdown'),
      icon: <DownOutlined />,
    },
    {
      key: 'number',
      label: t('setup.custom-fields.number'),
      icon: <NumberOutlined />,
    },
    {
      key: 'date',
      label: t('setup.custom-fields.date'),
      icon: <CalendarOutlined />,
    },
    {
      key: 'email',
      label: t('setup.custom-fields.email'),
      icon: <MailOutlined />,
    },
    {
      key: 'phone',
      label: t('setup.custom-fields.phone'),
      icon: <PhoneOutlined />,
    },
    {
      key: 'url',
      label: t('setup.custom-fields.URL'),
      icon: <GlobalOutlined />,
    },
    // {
    //   key: 'localized_message',
    //   label: t('setup.custom-fields.localized-message'),
    //   icon: <MessageOutlined />,
    // },
  ]

  const inCases = [
    { key: '1', value: t('setup.custom-fields.address3') },
    { key: '2', value: t('setup.custom-fields.business_id') },
    { key: '3', value: t('setup.custom-fields.cases_when_2') },
    { key: '4', value: t('setup.custom-fields.gender') },
    {
      key: '5',
      value: t('setup.custom-fields.general_practitioner_name'),
    },
    { key: '6', value: t('setup.custom-fields.gp_address') },
    { key: '7', value: t('setup.custom-fields.gp_name') },
    { key: '8', value: t('setup.custom-fields.gp_surgery') },
    {
      key: '9',
      value: t('setup.custom-fields.i_agree_to_posted_letters'),
    },
    { key: '10', value: t('setup.custom-fields.known_allergies') },
    { key: '11', value: t('setup.custom-fields.occupation') },
    { key: '12', value: t('setup.custom-fields.options') },
    { key: '13', value: t('setup.custom-fields.photos_consent') },
    { key: '14', value: t('setup.custom-fields.referent_doctor') },
  ]

  const renderFieldProperties = () => {
    const tab = selectedAttributeLabel.split(' ')[0]
    if (['client', 'lead'].indexOf(selectedAttributeLabel) !== -1) {
      return (
        <>
          <Form.Item
            name={'visibleInClientDataView'}
            style={{ marginBottom: '5px' }}
            className={styles.switch}
          >
            <Switch
              size="small"
              checked={customFieldFormData.visibleInClientDataView}
              onChange={(val) =>
                setCustomFieldFormData({
                  ...customFieldFormData,
                  visibleInClientDataView: val,
                })
              }
            />
            <label>
              {t('setup.custom-fields.always_visible_in', {
                tab: tab,
              })}
            </label>
          </Form.Item>

          <Form.Item
            name={'appearsInAddClientView'}
            style={{ marginBottom: '5px' }}
            className={styles.switch}
          >
            <Switch
              size="small"
              checked={customFieldFormData.appearsInAddClientView}
              onChange={(val) =>
                setCustomFieldFormData({
                  ...customFieldFormData,
                  appearsInAddClientView: val,
                })
              }
            />
            <label>
              {t('setup.custom-fields.appears_in_views', {
                tab: tab,
              })}
            </label>
          </Form.Item>
        </>
      )
    }
  }

  const handleOnSubmit = (form) => {
    if (values?.id) {
      const data_ = {}
      data_['field_label'] = {
        set: form.name,
      }
      if (form.category) {
        data_['Category'] = {
          connect: {
            id: form.category,
          },
        }
      }
      data_['display_in_invoice'] = {
        set: form.visibleInClientDataView ? 1 : 0,
      }
      data_['default_in_reports'] = {
        set: form.appearsInAddClientView ? 1 : 0,
      }
      data_['is_required'] = {
        set: form.required ? 1 : 0,
      }
      data_['field_type'] = {
        set: form.fieldTypes,
      }
      data_['show_in_cal'] = {
        set: form.visibilityOption,
      }
      data_['field_for'] = {
        set: form.displayFor,
      }

      updateMutation({
        variables: {
          where: {
            id: values.id,
          },
          data: data_,
        },
      })
    } else {
      const data_ = {
        field_label: form.name,
        field_type: form.fieldTypes,
        treatment_interest: 1,
        show_in_leads: 1,
        field_for: form.displayFor,
        flagged: false,
        is_required: form.required ? 1 : 0,
        is_active: true,
        favorite: false,
        Company: {},
        display_in_invoice: form.visibleInClientDataView ? 1 : 0,
        default_in_reports: form.appearsInAddClientView ? 1 : 0,
        show_in_cal: form.visibilityOption,
      }
      if (form.category) {
        data_['Category'] = {
          connect: {
            id: form.category,
          },
        }
      }
      createMutation({
        variables: {
          data: data_,
        },
      })
    }
  }

  const operations = [
    ReportOperationType['active'],
    ReportOperationType['cancel'],
  ]
  if (values?.id) {
    operations.push(ReportOperationType['delete'], ReportOperationType['save'])
  } else {
    operations.push(ReportOperationType['create'])
  }

  return (
    <>
      <FullScreenReportModal
        title={modalTitle}
        visible={visible}
        operations={operations}
        createBtnText={t('setup.custom-fields.create')}
        saveBtnText={t('setup.custom-fields.save')}
        footer={true}
        onCancel={() => onClose?.()}
        onBackClick={() => onClose?.()}
        onCreate={() => {
          createFormRef?.current?.submitForm()
        }}
        onSave={() => {
          createFormRef?.current?.submitForm()
        }}
        onActivated={(e) => {
          setCustomFieldFormData({
            ...customFieldFormData,
            status: e,
          })
        }}
        enableCreateBtn={true}
        onDelete={() => {
          if (values?.id) {
            deleteMutation({
              variables: {
                where: {
                  id: values?.id,
                },
              },
            })
          }
        }}
      >
        <div className={styles.createCustomFieldsModal}>
          <div className={styles.form}>
            <Typography.Title className={styles.formHeading}>
              {t('setup.custom-fields.basic_information')}
            </Typography.Title>
            <Formik
              innerRef={createFormRef}
              enableReinitialize={true}
              initialValues={customFieldFormData}
              validationSchema={Yup.object({
                name: Yup.string().required(
                  t('setup.custom-fields.name_error')
                ),
              })}
              onSubmit={handleOnSubmit}
              render={() => (
                <Form layout="vertical">
                  <Form.Item
                    label={t('setup.custom-fields.name')}
                    name={'name'}
                  >
                    <Input
                      name={'name'}
                      placeHolderText={t(
                        'setup.custom-fields.name.placeholder'
                      )}
                      size={InputSize['large']}
                      text={customFieldFormData.name}
                      onChange={(val) => {
                        setCustomFieldFormData({
                          ...customFieldFormData,
                          name: val,
                        })
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    label={t('setup.custom-fields.category')}
                    name={'category'}
                  >
                    <Select
                      placeholder={t(
                        'setup.custom-fields.category.placeholder'
                      )}
                      size="large"
                      value={customFieldFormData.category}
                      onChange={(val) => {
                        if (val === 'new_category') {
                          setShowCreateGroup(true)
                          return
                        }
                        setCustomFieldFormData({
                          ...customFieldFormData,
                          category: val || null,
                        })
                      }}
                    >
                      {groups.map((g) => (
                        <Select.Option
                          key={g.id}
                          value={g.id}
                          disabled={g.disabled}
                        >
                          {g.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <label>{t('setup.custom-fields.field-properties')}</label>
                  {renderFieldProperties()}

                  <Form.Item
                    name={'required'}
                    style={{ marginBottom: '15px' }}
                    className={styles.switch}
                  >
                    <Switch
                      size="small"
                      checked={customFieldFormData.required}
                      onChange={(val) =>
                        setCustomFieldFormData({
                          ...customFieldFormData,
                          required: val,
                        })
                      }
                    />
                    <label>{t('setup.custom-fields.required')}</label>
                  </Form.Item>

                  <Form.Item
                    label={t('setup.custom-fields.field_type')}
                    name={'fieldType'}
                  >
                    <div className={styles.fieldType}>
                      {fieldTypes.map((item, index) => (
                        <span key={`checkbox-${index}`}>
                          <ButtonCheckbox
                            label={item.label}
                            checked={
                              item.key ===
                              (selectedFieldType
                                ? selectedFieldType.toLowerCase()
                                : 'single_line_text')
                            }
                            icon={item.icon}
                            onChange={() => {
                              setSelectedFieldType(item.key)
                              setCustomFieldFormData({
                                ...customFieldFormData,
                                fieldTypes: item.key,
                              })
                            }}
                          />
                        </span>
                      ))}
                    </div>
                  </Form.Item>

                  <Form.Item
                    label={t('setup.custom-fields.display_field_settings')}
                    name={'visibilityOption'}
                    className={styles.switch}
                  >
                    <Switch
                      size="small"
                      checked={customFieldFormData.visibilityOption}
                      onChange={(val) => {
                        setCustomFieldFormData({
                          ...customFieldFormData,
                          visibilityOption: val,
                        })
                      }}
                    />
                    <label>{t('setup.custom-fields.hidden')}</label>
                  </Form.Item>

                  {customFieldFormData.visibilityOption && (
                    <Row justify="space-between">
                      <Col span={11}>
                        <Form.Item
                          label={t('setup.custom-fields.in_cases_when')}
                          name={'in_cases'}
                        >
                          <Select
                            placeholder={t('setup.custom-fields.in_cases_when')}
                            size="large"
                            value={
                              customFieldFormData.in_cases
                                ? customFieldFormData.in_cases.toString()
                                : ''
                            }
                            onChange={(val) => {
                              setCustomFieldFormData({
                                ...customFieldFormData,
                                in_cases: val || null,
                              })
                            }}
                          >
                            {inCases.map((item, i) => {
                              return (
                                <Select.Option value={item.key} key={item.key}>
                                  {item.value}
                                </Select.Option>
                              )
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label={t('setup.custom-fields.equals')}
                          name={'in_cases_text'}
                        >
                          <Input
                            name={'in_cases_text'}
                            size={InputSize['large']}
                            text={customFieldFormData.in_cases_text}
                            onChange={(val) =>
                              setCustomFieldFormData({
                                ...customFieldFormData,
                                in_cases_text: val || null,
                              })
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  )}
                </Form>
              )}
            />
          </div>
        </div>
      </FullScreenReportModal>
      <CreateGroupsTab
        showModal={showCreateGroup}
        closeModal={() => {
          fetchcustomFieldGroups({
            variables: {
              searchTerm: '',
            },
          })
          setShowCreateGroup(false)
        }}
      />
    </>
  )
}

export default CreateCustomFieldModal
