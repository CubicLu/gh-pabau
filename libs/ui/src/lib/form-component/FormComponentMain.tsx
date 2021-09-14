import { Button, ButtonTypes, MedicalFormTypes, MacroItem } from '@pabau/ui'
import React, { FC, useEffect, useState } from 'react'
import styles from './FormComponent.module.less'
import FormComponentInnerElement from './FormComponentInnerElement'

interface P {
  draggedForms: MedicalFormTypes[]
  formSaveLabel?: string
  processSaveForm?: () => void
  onHandleMacro?: (action: string, macro: MacroItem) => void
  medicalFormMacros?: MacroItem[]
}

const FormComponentMain: FC<P> = ({ ...props }) => {
  const {
    draggedForms,
    formSaveLabel = '',
    processSaveForm,
    onHandleMacro,
    medicalFormMacros = [],
  } = props
  const [disableSaveButton, setDisableSaveButton] = useState(true)
  const [macroItems, setMacroItems] = useState<MacroItem[]>([])

  useEffect(() => {
    console.log('medicalFormMacros', medicalFormMacros)
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
            />
          </div>
        )
      })}
      {draggedForms?.length > 0 && (
        <div className={styles.formComponentButton}>
          <Button
            type={ButtonTypes.primary}
            size="middle"
            disabled={disableSaveButton}
            onClick={onSaveForm}
          >
            {formSaveLabel === '' ? 'Save Form' : formSaveLabel}
          </Button>
        </div>
      )}
    </div>
  )
}

export default FormComponentMain
