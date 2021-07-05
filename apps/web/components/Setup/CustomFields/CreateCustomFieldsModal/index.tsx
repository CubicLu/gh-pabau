import React, { FC, useState, useRef } from 'react'
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
  MessageOutlined,
  CheckOutlined,
  MailOutlined,
} from '@ant-design/icons'
import styles from './index.module.less'
import { useTranslation } from 'react-i18next'
import AlignLeftIcon from '../../../../assets/images/icons/align-left.png'
import SelectCircleIcon from '../../../../assets/images/icons/select-circle.png'

export interface CreateCustomFieldModalProps {
  visible?: boolean
  modalTitle: string
  selectedAttributeLabel: string
  onClose?: () => void
}

export const CreateCustomFieldModal: FC<CreateCustomFieldModalProps> = ({
  visible = true,
  modalTitle,
  selectedAttributeLabel,
  onClose,
  ...props
}) => {
  const { t } = useTranslation('common')
  const createFormRef = useRef(null)
  const [selectedFieldType, setSelectedFieldType] = useState('single_line_text')
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
    {
      key: 'localized_message',
      label: t('setup.custom-fields.localized-message'),
      icon: <MessageOutlined />,
    },
  ]

  const inCases = [
    { key: 'address3', value: t('setup.custom-fields.address3') },
    { key: 'business_id', value: t('setup.custom-fields.business_id') },
    { key: 'cases_when_2', value: t('setup.custom-fields.cases_when_2') },
    { key: 'gender', value: t('setup.custom-fields.gender') },
    {
      key: 'general_practitioner_name',
      value: t('setup.custom-fields.general_practitioner_name'),
    },
    { key: 'gp_address', value: t('setup.custom-fields.gp_address') },
    { key: 'gp_name', value: t('setup.custom-fields.gp_name') },
    { key: 'gp_surgery', value: t('setup.custom-fields.gp_surgery') },
    {
      key: 'i_agree_to_posted_letters',
      value: t('setup.custom-fields.i_agree_to_posted_letters'),
    },
    { key: 'known_allergies', value: t('setup.custom-fields.known_allergies') },
    { key: 'occupation', value: t('setup.custom-fields.occupation') },
    { key: 'options', value: t('setup.custom-fields.options') },
    { key: 'photos_consent', value: t('setup.custom-fields.photos_consent') },
    { key: 'referent_doctor', value: t('setup.custom-fields.referent_doctor') },
  ]

  const [customFieldFormData, setCustomFieldFormData] = useState({
    name: '',
    category: '',
    displayFor: selectedAttributeLabel,
    displayInSearch: false,
    displayInVoice: false,
    isHidden: false,
    fieldTypes: '',
    displayFieldSettings: true,
    in_cases: '',
    in_cases_text: '',
    status: false,
  })

  return (
    <FullScreenReportModal
      title={modalTitle}
      visible={visible}
      operations={[
        ReportOperationType['active'],
        ReportOperationType['cancel'],
        ReportOperationType['create'],
      ]}
      footer={true}
      onCancel={() => onClose?.()}
      onBackClick={() => onClose?.()}
      onCreate={() => {
        createFormRef?.current?.submitForm()
      }}
      onActivated={(e) => {
        setCustomFieldFormData({
          ...customFieldFormData,
          status: e,
        })
      }}
      enableCreateBtn={true}
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
              name: Yup.string().required(t('setup.custom-fields.name_error')),
              category: Yup.string().required(
                t('setup.custom-fields.category_error')
              ),
            })}
            onSubmit={async (value) => {
              console.log('VL:', value)
            }}
            render={() => (
              <Form layout="vertical">
                <Form.Item label={t('setup.custom-fields.name')} name={'name'}>
                  <Input
                    name={'name'}
                    placeHolderText={t('setup.custom-fields.name.placeholder')}
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
                    placeholder={t('setup.custom-fields.category.placeholder')}
                    size="large"
                    value={customFieldFormData.category}
                    onChange={(val) => {
                      setCustomFieldFormData({
                        ...customFieldFormData,
                        category: val || null,
                      })
                    }}
                  >
                    <Select.Option value="new">New Category</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name={'displayInSearch'}
                  style={{ marginBottom: '5px' }}
                  className={styles.switch}
                >
                  <Switch
                    size="small"
                    checked={customFieldFormData.displayInSearch}
                    onChange={(val) =>
                      setCustomFieldFormData({
                        ...customFieldFormData,
                        displayInSearch: val,
                      })
                    }
                  />
                  <label>{t('setup.custom-fields.display_in_search')}</label>
                </Form.Item>
                <Form.Item
                  name={'displayInVoice'}
                  style={{ marginBottom: '5px' }}
                  className={styles.switch}
                >
                  <Switch
                    size="small"
                    checked={customFieldFormData.displayInVoice}
                    onChange={(val) =>
                      setCustomFieldFormData({
                        ...customFieldFormData,
                        displayInVoice: val,
                      })
                    }
                  />
                  <label>{t('setup.custom-fields.display_in_voice')}</label>
                </Form.Item>
                <Form.Item name={'hidden'} className={styles.switch}>
                  <Switch
                    size="small"
                    checked={customFieldFormData.isHidden}
                    onChange={(val) =>
                      setCustomFieldFormData({
                        ...customFieldFormData,
                        isHidden: val,
                      })
                    }
                  />
                  <label>{t('setup.custom-fields.hidden')}</label>
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
                          checked={item.key === selectedFieldType}
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
                  name={'displayFieldSettings'}
                  className={styles.switch}
                >
                  <Switch
                    size="small"
                    checked={customFieldFormData.displayFieldSettings}
                    onChange={(val) => {
                      setCustomFieldFormData({
                        ...customFieldFormData,
                        displayFieldSettings: val,
                      })
                    }}
                  />
                  <label>{t('setup.custom-fields.always')}</label>
                </Form.Item>
                {!customFieldFormData.displayFieldSettings && (
                  <Row justify="space-between">
                    <Col span={11}>
                      <Form.Item
                        label={t('setup.custom-fields.in_cases_when')}
                        name={'in_cases'}
                      >
                        <Select
                          placeholder={t('setup.custom-fields.in_cases_when')}
                          size="large"
                          value={customFieldFormData.in_cases}
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
  )
}

export default CreateCustomFieldModal
