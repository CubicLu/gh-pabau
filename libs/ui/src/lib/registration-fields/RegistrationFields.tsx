import React, { FC, ReactNode } from 'react'
import { Checkbox } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import styles from './RegistrationFields.module.less'

export interface FieldType {
  key: number
  fieldName: string
  label: string
  visible: boolean
  required: boolean
  disabled: boolean
}

export interface CustomFieldType {
  field_label?: string
  field_type?: string
  is_active?: boolean
  is_required?: number
  id: number
}
export interface DefaultCustomFieldType {
  fieldName: string
  label: string
  visible: boolean
  required: boolean
  key: number
}

export interface RegistrationFieldsProps {
  icon?: ReactNode
  title?: string
  description?: string
  fieldTitle?: string
  customFieldTitle?: string
  visibleTitle?: string
  requiredTitle?: string
  fields?: DefaultCustomFieldType[]
  customFields?: CustomFieldType[]
  onCustomFieldCheckboxChange?: (
    e: CheckboxChangeEvent,
    key: number,
    checkboxField: string
  ) => void
  onMainFieldCheckboxChange?: (
    e: CheckboxChangeEvent,
    id: number,
    checkboxField: string
  ) => void
}

export const RegistrationFields: FC<RegistrationFieldsProps> = ({
  icon,
  title,
  description,
  fields,
  fieldTitle,
  customFieldTitle,
  customFields,
  visibleTitle,
  requiredTitle,
  onCustomFieldCheckboxChange,
  onMainFieldCheckboxChange,
}) => {
  return (
    <div className={styles.registrationWrap}>
      <div className={styles.title}>
        <div>{icon && icon}</div>
        <span>{title}</span>
      </div>
      <div className={styles.desc}>{description}</div>
      <div className={styles.fieldTitleWrap}>
        <div className={styles.headTitle}>{fieldTitle}</div>
        <div className={styles.headTitle}>{visibleTitle}</div>
        <div className={styles.headTitle}>{requiredTitle}</div>
      </div>
      <div>
        {fields?.map((field) => (
          <div key={field.key} className={styles.fieldItemWrap}>
            <p>{field.fieldName}</p>
            <Checkbox
              defaultChecked={field.visible}
              onChange={(e) =>
                onMainFieldCheckboxChange?.(e, field.key, 'is_active')
              }
            />
            <Checkbox
              defaultChecked={field.key === 1}
              onChange={(e) =>
                onMainFieldCheckboxChange?.(e, field.key, 'is_required')
              }
            />
          </div>
        ))}
      </div>
      {customFields?.length && (
        <div className={styles.customFieldTitleWrap}>
          <div className={styles.headTitle}>{customFieldTitle}</div>
          <div className={styles.headTitle}>{visibleTitle}</div>
          <div className={styles.headTitle}>{requiredTitle}</div>
        </div>
      )}
      <div>
        {customFields?.map((field) => (
          <div key={field.id} className={styles.fieldItemWrap}>
            <p>{field.field_label}</p>
            <Checkbox
              defaultChecked={field.is_active}
              onChange={(e) =>
                onCustomFieldCheckboxChange?.(e, field.id, 'is_active')
              }
            />
            <Checkbox
              defaultChecked={field.is_required === 1}
              onChange={(e) =>
                onCustomFieldCheckboxChange?.(e, field.id, 'is_required')
              }
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default RegistrationFields
