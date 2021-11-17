import React, { FC } from 'react'
import styles from '../General/CustomField.module.less'
import {
  Checkbox,
  Form as AntForm,
  Input,
  Radio,
  Select,
  InputNumber,
} from 'formik-antd'
import {
  CustomFieldsProps,
  DatePicker,
  InitialDetailsProps,
  PhoneNumberInput,
  InitialDetailsDataProps,
} from '@pabau/ui'
import dayjs, { Dayjs } from 'dayjs'
import { useTranslation } from 'react-i18next'
const { TextArea } = Input

interface CustomFieldProps {
  customFields?: CustomFieldsProps[]
  setFieldValue(
    field: keyof InitialDetailsProps,
    values: string | string[] | boolean | number | Dayjs | null
  ): void
  values?: InitialDetailsProps | InitialDetailsDataProps
}

const CustomField: FC<CustomFieldProps> = ({
  customFields,
  setFieldValue,
  values,
}) => {
  const { t } = useTranslation('common')
  return (
    <div>
      {customFields?.map((field) => (
        <div className={styles.customFieldForm} key={field.id}>
          <AntForm
            className={styles.customFormInput}
            layout={'vertical'}
            requiredMark={false}
          >
            <h5>{field?.name}</h5>
            {field?.CmFields.map((item) => (
              <div key={item.id}>
                {item?.field_type !== 'phone' && (
                  <p>{`${item?.field_label}${
                    item.is_required
                      ? ` (${t('quickcreate.required.label')})`
                      : ''
                  }`}</p>
                )}
                <AntForm.Item name={`customField_${item.id}`}>
                  {item?.field_type === 'string' ||
                  item?.field_type === 'email' ||
                  item?.field_type === 'url' ? (
                    <Input
                      size={'middle'}
                      name={`customField_${item.id}`}
                      placeholder={t('common-label-enter', {
                        what: item?.field_label?.toLowerCase(),
                      })}
                    />
                  ) : item?.field_type === 'text' ? (
                    <TextArea
                      name={`customField_${item.id}`}
                      rows={4}
                      placeholder={t('common-label-enter', {
                        what: item?.field_label?.toLowerCase(),
                      })}
                    />
                  ) : item?.field_type === 'number' ? (
                    <InputNumber
                      name={`customField_${item.id}`}
                      onChange={(value) =>
                        setFieldValue(
                          `customField_${item.id}`,
                          value ? value : 0
                        )
                      }
                      placeholder={t('common-label-enter', {
                        what: item?.field_label?.toLowerCase(),
                      })}
                    />
                  ) : item?.field_type === 'multiple' ? (
                    <Checkbox.Group
                      name={`customField_${item.id}`}
                      options={
                        item.ManageCustomFieldItem.length > 0
                          ? item.ManageCustomFieldItem.map(
                              (item) => item.item_label ?? ''
                            )
                          : []
                      }
                    />
                  ) : item?.field_type === 'bool' ? (
                    <Radio.Group name={`customField_${item.id}`}>
                      {item.ManageCustomFieldItem?.map((option) => (
                        <Radio
                          key={option.id}
                          value={option?.item_label}
                          name={`customField_${item.id}`}
                        >
                          {option.item_label}
                        </Radio>
                      ))}
                    </Radio.Group>
                  ) : item?.field_type === 'list' ? (
                    <Select
                      name={`customField_${item.id}`}
                      placeholder={t('common-label-select', {
                        what: item?.field_label?.toLowerCase(),
                      })}
                    >
                      {item.ManageCustomFieldItem.map((item) => (
                        <Select.Option
                          key={item.id}
                          value={item?.item_label ?? ''}
                        >
                          {item.item_label}
                        </Select.Option>
                      ))}
                    </Select>
                  ) : item?.field_type === 'date' ? (
                    <DatePicker
                      name={`customField_${item.id}`}
                      format={'DD/MM/YY'}
                      value={
                        values?.[`customField_${item.id}`]
                          ? dayjs(values[`customField_${item.id}`]?.toString())
                          : undefined
                      }
                      onChange={(date, dateString) =>
                        setFieldValue(
                          `customField_${item.id}`,
                          dayjs(dateString)
                        )
                      }
                      placeholder={t(
                        'quickCreate.custom.field.date.placeholder'
                      )}
                      getPopupContainer={(trigger) =>
                        trigger.parentElement as HTMLElement
                      }
                    />
                  ) : item?.field_type === 'phone' ? (
                    <PhoneNumberInput
                      label={`${item?.field_label || item.field_label}${
                        item.is_required
                          ? ` (${t('quickcreate.required.label')})`
                          : ''
                      }`}
                      value={
                        values?.[`customField_${item.id}`]
                          ? values[`customField_${item.id}`]?.toString()
                          : ''
                      }
                      onChange={(value) =>
                        setFieldValue(`customField_${item.id}`, value)
                      }
                      showValidErrorMessage={false}
                      placeholder={t('common-label-enter', {
                        what: item?.field_label?.toLowerCase(),
                      })}
                    />
                  ) : null}
                </AntForm.Item>
              </div>
            ))}
          </AntForm>
        </div>
      ))}
    </div>
  )
}

export default CustomField
