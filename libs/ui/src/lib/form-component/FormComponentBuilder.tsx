import {
  ArrayItem,
  MedicalFormTypes,
  OptionType,
  MacroItem,
  UserGroupListItem,
  InvProductsListItem,
  MedicalConditionsListItem,
  previewMapping,
  PreviewAttr,
} from '@pabau/ui'
import React, { FC, useEffect, useReducer, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import FormComponentMain from './FormComponentMain'

const proccessDrugsData = ({ MedicalContactAttr }) => {
  const drugs = MedicalContactAttr?.filter((el) =>
    el?.MedicalAttr.name?.includes('drug')
  )
  const drugItemsCount = drugs?.filter((el) =>
    el?.MedicalAttr?.name?.includes('drugid')
  )?.length
  const drugsContent = []
  for (let i = 1; i <= drugItemsCount; i++) {
    const drugAllItems = drugs
      ?.filter(
        (el) =>
          el?.MedicalAttr?.name?.includes('drug') &&
          el?.MedicalAttr?.name?.endsWith(`${i}`)
      )
      ?.map((el) => {
        return {
          name: el?.MedicalAttr?.name
            ?.replace(/\d/g, '')
            ?.replaceAll('drug', ''),
          value: el?.value,
        }
      })
    drugsContent.push(drugAllItems as never)
  }
  const data = JSON.stringify(drugsContent)
  const cData = JSON.parse(data)

  const colsDrugsIndex = cData
    .map((a) => a.length)
    .indexOf(Math.max(...cData.map((a) => a.length)))
  const cols = cData?.[colsDrugsIndex]?.map((el) => el?.name)

  const dItems = []
  for (const drug of cData) {
    const cDrug = { key: drug?.find((el) => el?.name === 'id')?.value }
    for (const col of cols) {
      cDrug[col] = drug?.find((d) => d?.name === col)?.value
    }
    dItems.push(cDrug as never)
  }
  return dItems
}

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
  { id: 15, formType: 'basic', formName: 'form_slider' },
]

const isBase64 = (str: string) => {
  if (str === '' || str.trim() === '') {
    return false
  }
  try {
    return btoa(atob(str)) === str
  } catch {
    return false
  }
}

const getFormInfo = (form, index, attrs: PreviewAttr[] = []) => {
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

  let name = ''
  if (form.cssClass === 'epaper') {
    name = ''
  } else {
    if (form?.title && form?.title !== '') {
      name = form?.title?.replaceAll(' ', ' ').trim().toLowerCase()
    } else {
      if (
        form?.cssClass === 'btn_medical_condition' ||
        form?.cssClass === 'cl_drugs' ||
        form?.cssClass === 'labs_tests'
      ) {
        name = form.cssClass?.replaceAll('_', ' ')?.trim()?.toLowerCase()
      } else name = form?.values?.replaceAll(' ', ' ').trim().toLowerCase()
    }
  }
  const valueKey = index.toString() + name

  let realContent: string | number | number[] | string[] = ''
  let content: string | number | number[] | string[] = ''
  const contentValue = attrs.filter(
    (attr) => attr.MedicalAttr.name.indexOf(valueKey) >= 0
  )
  if (contentValue.length > 0) {
    content = contentValue[0].value || ''
  }

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

  let arrItemsValue: OptionType[] = []
  if (
    (form.cssClass === 'checkbox' ||
      form.cssClass === 'radio' ||
      form.cssClass === 'slider' ||
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

  let txtInputTypeValue = ''
  let txtDefaultsValue = ''
  let txtBlockValue = ''
  let signData = ''

  if (form.cssClass === 'input_text') {
    realContent = content
    txtInputTypeValue = form.fldtype
    txtDefaultsValue = content
  } else if (form.cssClass === 'staticText') {
    realContent = content
    txtBlockValue = form.values.trim()
  } else if (form.cssClass === 'team') realContent = content
  else if (form.cssClass === 'textarea') {
    realContent = content
    txtDefaultsValue = realContent
  } else if (form.cssClass === 'checkbox') {
    const myArray = content.split(',')
    const t = myArray.map((a) => atob(a))
    realContent = t.map((el) => {
      if (arrItemsValue?.length > 0)
        return arrItemsValue?.find((e) => e?.name === el)?.id?.toString() || '0'
      else return '0'
    })
  } else if (form.cssClass === 'radio') {
    content = arrItemsValue?.find((el) => el?.name === content)?.id || 0
    txtDefaultsValue = content?.toString()
    realContent = [content]
  } else if (form.cssClass === 'select') {
    content = arrItemsValue?.find((el) => el?.name === content)?.id || 0
    txtDefaultsValue = content?.toString()
    realContent = [content]
  } else if (form.cssClass === 'slider') {
    realContent = content?.toString()
    txtDefaultsValue = realContent
  } else if (form.cssClass === 'image') realContent = content
  else if (form.cssClass === 'staticImage') realContent = content
  else if (form.cssClass === 'signature') {
    realContent = content || ''
    signData = realContent
  } else if (form.cssClass === 'travel_destination') realContent = content
  else if (form.cssClass === 'diagram') realContent = content
  else if (form.cssClass === 'facediagram') realContent = content
  else if (form.cssClass === 'diagram_mini') realContent = content
  else if (form.cssClass === 'photo_and_drawer') realContent = content
  else if (form.cssClass === 'epaper') realContent = content
  else if (form.cssClass === 'custom_photo_and_drawer') realContent = content
  else if (form.cssClass === 'cl_services') realContent = content
  else if (form.cssClass === 'labs_tests')
    realContent = content ? content?.split(',') : []
  else if (form.cssClass === 'vaccine_scheduler') realContent = content
  else if (form.cssClass === 'vaccine_history') realContent = content
  else if (form.cssClass === 'cl_drugs') {
    realContent = proccessDrugsData({ MedicalContactAttr: attrs })
  } else if (form.cssClass === 'history_data') realContent = content
  else if (form.cssClass === 'btn_medical_condition') {
    realContent = content
    txtDefaultsValue = realContent
  } else if (form.cssClass === 'snomed') {
    txtBlockValue = form.defaults ? form.defaults : content
  }

  let txtLinkedFieldValue = ''
  if (form.linked) {
    txtLinkedFieldValue = form.linked
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
    arrValue: realContent,
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
  previewAttrs?: PreviewAttr[]
  formSaveLabel?: string
  saveMedicalFormHistory?: (draggedForms: MedicalFormTypes[]) => void
  onHandleMacro?: (action: string, macro: MacroItem) => void
  medicalFormMacros?: MacroItem[]
  invProductsListItems?: InvProductsListItem[]
  medicalConditionsListItems?: MedicalConditionsListItem[]
  userGroupListItems?: UserGroupListItem[]
  hideMacro?: boolean
  hidePadlock?: boolean
  saveFormLoading?: boolean
}

export const FormComponentBuilder: FC<P> = ({
  previewData,
  previewAttrs = [],
  formSaveLabel = '',
  saveMedicalFormHistory,
  onHandleMacro,
  medicalFormMacros = [],
  userGroupListItems = [],
  invProductsListItems = [],
  medicalConditionsListItems = [],
  hideMacro = false,
  hidePadlock = false,
  saveFormLoading = false,
}) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0)
  const [draggedForms, setDraggedForms] = useState<MedicalFormTypes[]>([])
  useEffect(() => {
    setDraggedForms([])
    if (typeof previewData != 'undefined' && previewData !== '') {
      const previewForms = []
      if (isBase64(previewData)) {
        const previewDataArray = JSON.parse(atob(previewData))
        if (previewDataArray['form_structure']) {
          let index = 0
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
                  getFormInfo(form, index, previewAttrs)
                )
              }
            }
            if (form.cssClass !== 'staticText') index++
            if (form.cssClass === 'heading') index--
          }
        }
      }
      setDraggedForms(previewForms)
      forceUpdate()
    }
  }, [previewAttrs, previewData])

  const processSaveForm = () => {
    saveMedicalFormHistory?.(draggedForms)
  }
  return (
    <FormComponentMain
      draggedForms={draggedForms}
      formSaveLabel={formSaveLabel}
      processSaveForm={processSaveForm}
      onHandleMacro={onHandleMacro}
      medicalFormMacros={medicalFormMacros}
      userGroupListItems={userGroupListItems}
      invProductsListItems={invProductsListItems}
      medicalConditionsListItems={medicalConditionsListItems}
      hideMacro={hideMacro}
      hidePadlock={hidePadlock}
      saveFormLoading={saveFormLoading}
    />
  )
}
export default FormComponentBuilder
