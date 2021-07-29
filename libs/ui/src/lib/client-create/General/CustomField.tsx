import React, { FC } from 'react'
import styles from '../ClientCreate.module.less'
import { Checkbox, Form as AntForm, Input, Radio, Select } from 'formik-antd'
import { InputNumber } from 'antd'
import {
  CustomFieldsProps,
  DatePicker,
  InitialDetailsProps,
  PhoneNumberInput,
} from '@pabau/ui'
import dayjs, { Dayjs } from 'dayjs'
const { TextArea } = Input
interface CustomFieldProps {
  customFields?: CustomFieldsProps[]
  setFieldValue(
    field: keyof InitialDetailsProps,
    values: string | string[] | boolean | number | Dayjs | null
  ): void
  values?: InitialDetailsProps
}
const CustomField: FC<CustomFieldProps> = ({
  customFields,
  setFieldValue,
  values,
}) => {
  return (
    <div>
      {customFields?.map((field) => (
        <div className={styles.customFieldForm} key={field.id}>
          <AntForm
            className={styles.customFormInput}
            layout={'vertical'}
            requiredMark={false}
          >
            <h5>{field.name}</h5>
            {field.CmFields.map((item) => (
              <div key={item.id}>
                {item.field_type !== 'phone' && <p>{item.field_label}</p>}
                <AntForm.Item name={`customField_${item.id}`}>
                  {item.field_type === 'string' ||
                  item.field_type === 'email' ||
                  item.field_type === 'url' ? (
                    <Input size={'middle'} name={`customField_${item.id}`} />
                  ) : item.field_type === 'text' ? (
                    <TextArea name={`customField_${item.id}`} rows={4} />
                  ) : item.field_type === 'number' ? (
                    <InputNumber
                      name={`customField_${item.id}`}
                      size="large"
                      onChange={(value) =>
                        setFieldValue(
                          `customField_${item.id}`,
                          typeof value === 'number' ? value : 0
                        )
                      }
                    />
                  ) : item.field_type === 'multiple' ? (
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
                  ) : item.field_type === 'bool' ? (
                    <Radio.Group name={`customField_${item.id}`}>
                      {item.ManageCustomFieldItem?.map((option) => (
                        <Radio
                          key={option.id}
                          value={option.item_label}
                          name={`customField_${item.id}`}
                        >
                          {option.item_label}
                        </Radio>
                      ))}
                    </Radio.Group>
                  ) : item.field_type === 'list' ? (
                    <Select name={`customField_${item.id}`}>
                      {item.ManageCustomFieldItem.map((item) => (
                        <Select.Option
                          key={item.id}
                          value={item.item_label ?? ''}
                        >
                          {item.item_label}
                        </Select.Option>
                      ))}
                    </Select>
                  ) : item.field_type === 'date' ? (
                    <DatePicker
                      name={`customField_${item.id}`}
                      format={'DD/MM/YY'}
                      value={
                        values?.[`customField_${item.id}`]
                          ? dayjs(values[`customField_${item.id}`]?.toString())
                          : undefined
                      }
                      onChange={(date) =>
                        setFieldValue(`customField_${item.id}`, date)
                      }
                      placeholder={'DD/MM/YY'}
                    />
                  ) : item.field_type === 'phone' ? (
                    <PhoneNumberInput
                      label={item.field_label ? item.field_label : ''}
                      value={
                        values?.[`customField_${item.id}`]
                          ? values[`customField_${item.id}`]?.toString()
                          : undefined
                      }
                      onChange={(value) =>
                        setFieldValue(`customField_${item.id}`, value)
                      }
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
