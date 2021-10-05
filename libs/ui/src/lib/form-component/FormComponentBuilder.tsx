import {
  ArrayItem,
  MedicalFormTypes,
  OptionType,
  MacroItem,
  UserGroupListItem,
  InvProductsListItem,
  MedicalConditionsListItem,
} from '@pabau/ui'
import React, { FC, useEffect, useReducer, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import FormComponentMain from './FormComponentMain'

const medicalForms = [
  { id: 0, formType: 'basic', formName: 'form_statictext' },
  { id: 1, formType: 'basic', formName: 'form_textfield' },
  { id: 2, formType: 'basic', formName: 'form_textarea' },
  { id: 3, formType: 'basic', formName: 'form_checkbox' },
  { id: 4, formType: 'basic', formName: 'form_singlechoice' },
  { id: 5, formType: 'basic', formName: 'form_image' },
  { id: 6, formType: 'basic', formName: 'form_photoupload' },
  { id: 7, formType: 'basic', formName: 'form_dropdown' },
  { id: 8, formType: 'basic', formName: 'form_signature' },
  { id: 9, formType: 'basic', formName: 'form_drawing' },
  { id: 10, formType: 'basic', formName: 'form_medicalcondition' },
  { id: 11, formType: 'basic', formName: 'form_drugs' },
  { id: 12, formType: 'basic', formName: 'form_travel' },
  { id: 13, formType: 'basic', formName: 'form_labtests' },
  { id: 14, formType: 'basic', formName: 'form_snomed' },
]

const previewMapping = [
  { heading: 'form_statictext' },
  { staticText: 'form_statictext' },
  { input_text: 'form_textfield' },
  { team: 'empty' },
  { textarea: 'form_textarea' },
  { checkbox: 'form_checkbox' },
  { radio: 'form_singlechoice' },
  { select: 'form_dropdown' },
  { image: 'form_drawing' },
  { staticImage: 'form_image' },
  { diagram_mini: 'form_drawing' },
  { signature: 'form_signature' },
  { cl_drugs: 'form_drugs' },
  { labs_tests: 'form_labtests' },
  { snomed: 'form_snomed' },
  { vaccine_scheduler: 'empty' },
  { vaccine_history: 'empty' },
  { travel_destination: 'form_travel' },
  { btn_medical_condition: 'form_medicalcondition' },
  { diagram: 'empty' },
  { facediagram: 'empty' },
  { diagram_mini: 'empty' },
  { photo_and_drawer: 'form_photoupload' },
  { epaper: 'empty' },
  { custom_photo_and_drawer: 'empty' },
  { cl_services: 'empty' },
  { history_data: 'empty' },
]

const getFormInfo = (form) => {
  // let name = ''
  let label = ''
  if (form.title) {
    if (typeof form.title === 'object') {
      const obj = atob(btoa(form.title))
      form.title = obj[1]['value'].trim()
    } else {
      form.title = form.title.trim()
    }
  }

  label = form.title ? form.title.trim() : ''
  label =
    label === '' && typeof form.values === 'string' && form.values
      ? form.values.trim()
      : label

  switch (form.cssClass) {
    case 'cl_services': {
      label = 'Services'
      break
    }
    case 'cl_drugs': {
      label = form.title ? form.title.trim() : 'Drugs'
      break
    }
    case 'labs_tests': {
      label = 'Labs Tests'
      break
    }
    case 'vaccine_scheduler': {
      label = ''
      break
    }
    case 'staticText': {
      label = ''
      // No default
      break
    }
  }

  let txtBlockValue = ''
  if (form.cssClass === 'textarea') {
    txtBlockValue = form.defaults ? form.defaults : ''
  }

  if (form.cssClass === 'snomed') {
    txtBlockValue = form.defaults ? form.defaults : ''
  }

  if (form.cssClass === 'staticText') {
    txtBlockValue = form.values.trim()
  }

  let txtInputTypeValue = ''
  if (form.cssClass === 'input_text') {
    txtInputTypeValue = form.fldtype
  }

  let txtDefaultsValue = ''
  if (form.cssClass === 'input_text') {
    txtDefaultsValue = form.defaults
  }

  let txtLinkedFieldValue = ''
  if (form.linked) {
    txtLinkedFieldValue = form.linked
  }

  let signData = ''
  if (form.cssClass === 'signature' && typeof form.values === 'string') {
    signData = form.values
  }

  let arrItemsValue: OptionType[] = []
  if (
    (form.cssClass === 'checkbox' ||
      form.cssClass === 'radio' ||
      form.cssClass === 'select' ||
      form.cssClass === 'staticImage' ||
      form.cssClass === 'diagram_mini' ||
      form.cssClass === 'labs_tests' ||
      form.cssClass === 'image') &&
    typeof form.values !== 'string'
  ) {
    const arrayItems: ArrayItem[] = form.values
    arrItemsValue = Object.entries(arrayItems).map(([key, value]) => ({
      id: Number.parseInt(key),
      name: value.value,
      editing: false,
    }))
  }

  if (form.cssClass === 'cl_drugs') {
    const arrayItems: string[] =
      form.values === '' ? [] : form.values.split(',')
    arrItemsValue = Object.entries(arrayItems).map(([key, value]) => ({
      id: Number.parseInt(key),
      name: value,
      editing: false,
    }))
  }

  return {
    txtQuestion: label,
    txtBlock: txtBlockValue,
    txtInputType: txtInputTypeValue,
    txtDefaults: txtDefaultsValue,
    txtLinkedField: txtLinkedFieldValue,
    signData: signData,
    arrItems: arrItemsValue,
    txtValue: txtDefaultsValue,
    arrValue: [],
    required: form.required === 'true' ? true : false,
  }
}

const copy = (source, destination, droppableSourceId, endIndex, formInfo) => {
  const item = source[droppableSourceId]
  destination.splice(endIndex, 0, {
    ...item,
    id: uuidv4(),
    txtQuestion: formInfo.txtQuestion,
    txtQuestionWithTag: formInfo.txtQuestionWithTag,
    txtBlock: formInfo.txtBlock,
    txtBlockWithTag: formInfo.txtBlockWithTag,
    txtInputType: formInfo.txtInputType,
    txtDefaults: formInfo.txtDefaults,
    txtDefaultsWithTag: formInfo.txtDefaultsWithTag,
    txtLinkedField: formInfo.txtLinkedField,
    signData: formInfo.signData,
    arrItems: formInfo.arrItems,
    required: formInfo.required,
    txtValue: formInfo.txtValue,
    arrValue: formInfo.arrValue,
  })
  return destination
}

interface P {
  previewData: string
  formSaveLabel?: string
  saveMedicalFormHistory?: (draggedForms: MedicalFormTypes[]) => void
  onHandleMacro?: (action: string, macro: MacroItem) => void
  medicalFormMacros?: MacroItem[]
  invProductsListItems?: InvProductsListItem[]
  medicalConditionsListItems?: MedicalConditionsListItem[]
  userGroupListItems?: UserGroupListItem[]
}

export const FormComponentBuilder: FC<P> = ({
  previewData,
  formSaveLabel = '',
  saveMedicalFormHistory,
  onHandleMacro,
  medicalFormMacros = [],
  userGroupListItems = [],
  invProductsListItems = [],
  medicalConditionsListItems = [],
}) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0)
  const [draggedForms, setDraggedForms] = useState<MedicalFormTypes[]>([])
  useEffect(() => {
    setDraggedForms([])
    if (typeof previewData != 'undefined' && previewData !== '') {
      const previewDataArray = JSON.parse(atob(previewData))
      const previewForms = []
      if (previewDataArray['form_structure']) {
        for (const form of previewDataArray['form_structure']) {
          let formName = ''
          const mappingInfo = previewMapping.filter(
            (item) => Object.keys(item)[0] === form.cssClass
          )
          if (mappingInfo?.length > 0) {
            formName = mappingInfo[0][form.cssClass]
            const mappingForm = medicalForms.filter(
              (item) => item.formName === formName
            )
            if (mappingForm?.length > 0) {
              copy(
                medicalForms,
                previewForms,
                mappingForm[0].id,
                previewForms.length,
                getFormInfo(form)
              )
            }
          }
        }
      }
      setDraggedForms(previewForms)
      forceUpdate()
    }
  }, [previewData])

  const processSaveForm = () => {
    saveMedicalFormHistory?.(draggedForms)
  }
  return (
    <div>
      <FormComponentMain
        draggedForms={draggedForms}
        formSaveLabel={formSaveLabel}
        processSaveForm={processSaveForm}
        onHandleMacro={onHandleMacro}
        medicalFormMacros={medicalFormMacros}
        userGroupListItems={userGroupListItems}
        invProductsListItems={invProductsListItems}
        medicalConditionsListItems={medicalConditionsListItems}
      />
    </div>
  )
}
export default FormComponentBuilder
