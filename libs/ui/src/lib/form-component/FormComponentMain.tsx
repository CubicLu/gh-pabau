import {
  MedicalFormTypes,
  MacroItem,
  UserGroupListItem,
  InvProductsListItem,
  MedicalConditionsListItem,
} from '@pabau/ui'
import React, { FC, useEffect, useState } from 'react'
import styles from './FormComponent.module.less'
import FormComponentInnerElement from './FormComponentInnerElement'
import FormSaveButton from './FormSaveButton'

interface P {
  draggedForms: MedicalFormTypes[]
  formSaveLabel?: string
  processSaveForm?: () => void
  onHandleMacro?: (action: string, macro: MacroItem) => void
  medicalFormMacros?: MacroItem[]
  invProductsListItems?: InvProductsListItem[]
  medicalConditionsListItems?: MedicalConditionsListItem[]
  userGroupListItems?: UserGroupListItem[]
  hideMacro?: boolean
  hidePadlock?: boolean
}

const FormComponentMain: FC<P> = ({ ...props }) => {
  const {
    draggedForms,
    formSaveLabel = '',
    processSaveForm,
    onHandleMacro,
    medicalFormMacros = [],
    invProductsListItems = [],
    medicalConditionsListItems = [],
    userGroupListItems = [],
    hideMacro = false,
    hidePadlock = false,
  } = props
  const [disableSaveButton, setDisableSaveButton] = useState(true)
  const [macroItems, setMacroItems] = useState<MacroItem[]>([])

  useEffect(() => {
    setMacroItems(medicalFormMacros)
  }, [medicalFormMacros])

  useEffect(() => {
    const requiredForms = draggedForms.filter((form) => form.required === true)
    if (
      requiredForms.length > 0 &&
      requiredForms.filter(
        (form) => form.txtValue === '' && form.arrValue.length === 0
      ).length > 0
    ) {
      setDisableSaveButton(true)
    } else {
      setDisableSaveButton(false)
    }
  }, [draggedForms])

  const chkSaveButton = () => {
    const requiredForms = draggedForms.filter((form) => form.required === true)
    if (
      requiredForms.length > 0 &&
      requiredForms.filter(
        (form) => form.txtValue === '' && form.arrValue.length === 0
      ).length > 0
    ) {
      setDisableSaveButton(true)
    } else {
      setDisableSaveButton(false)
    }
  }

  const handlingSaveForm = (form) => {
    const index = draggedForms.findIndex((item) => item['id'] === form.id)
    if (index !== -1) {
      draggedForms.splice(index, 1, form)
      chkSaveButton()
    }
  }

  const onSaveForm = () => {
    processSaveForm?.()
  }

  return (
    <div className={styles.formComponentMain}>
      {draggedForms?.map((form, index) => {
        return (
          <div key={index}>
            <FormComponentInnerElement
              required={form.required}
              type={form.formType}
              component={form.formName}
              handleId={form.id}
              formData={form}
              handlingSaveForm={handlingSaveForm}
              onHandleMacro={onHandleMacro}
              macroItems={macroItems}
              invProductsListItems={invProductsListItems}
              medicalConditionsListItems={medicalConditionsListItems}
              hideMacro={hideMacro}
            />
          </div>
        )
      })}
      {draggedForms?.length > 0 && (
        <FormSaveButton
          saveForm={onSaveForm}
          disableSaveButton={disableSaveButton}
          formSaveLabel={formSaveLabel}
          userGroupListItems={userGroupListItems}
          hidePadlock={hidePadlock}
        />
      )}
    </div>
  )
}

export default FormComponentMain
