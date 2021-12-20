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
  formNames as medicalForms,
} from '@pabau/ui'
import React, { FC, useEffect, useReducer, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import FormComponentMain from './FormComponentMain'

const optionTypeFields = new Set([
  'checkbox',
  'radio',
  'slider',
  'select',
  'staticImage',
  'diagram_mini',
  'labs_tests',
  'image',
])

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

const getLabel = ({ form }) => {
  const { title = '', cssClass = '', values = '' } = form
  let label = ''
  if (typeof title === 'object') {
    const obj = atob(btoa(label))
    label = obj[1]['value'].trim()
  } else {
    label = label.trim()
  }
  label = label === '' && typeof values === 'string' ? values.trim() : label
  switch (cssClass) {
    case 'cl_services': {
      label = 'Services'
      break
    }
    case 'cl_drugs': {
      label = label ? label.trim() : 'Drugs'
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
      break
    }
  }
  return label
}

const getValueKey = ({ form, index }) => {
  const { title = '', cssClass = '', values = '' } = form
  let name = ''
  if (cssClass === 'epaper') {
    name = ''
  } else {
    if (title && title !== '') {
      name = title?.replaceAll(' ', ' ').trim().toLowerCase()
    } else {
      if (
        cssClass === 'btn_medical_condition' ||
        cssClass === 'cl_drugs' ||
        cssClass === 'labs_tests'
      ) {
        name = cssClass?.replaceAll('_', ' ')?.trim()?.toLowerCase()
      } else name = values?.replaceAll(' ', ' ').trim().toLowerCase()
    }
  }
  return index.toString() + name
}

const getFormInfo = (form, index, attrs: PreviewAttr[] = []) => {
  const {
    fldtype = '',
    cssClass = '',
    values = '',
    linked = '',
    required = '',
    defaults = '',
  } = form

  const label = getLabel({ form })
  const valueKey = getValueKey({ form, index })
  const txtLinkedFieldValue = linked || ''

  let content: string | number | number[] | string[] = ''
  let arrItemsValue: OptionType[] = []
  let txtInputTypeValue = ''
  let txtDefaultsValue = ''
  let txtBlockValue = ''

  const contentValue = attrs.filter(
    (attr) => attr.MedicalAttr.name.indexOf(valueKey) >= 0
  )
  if (contentValue.length > 0) content = contentValue[0].value || ''

  if (optionTypeFields.has(cssClass) && typeof values !== 'string') {
    const arrayItems: ArrayItem[] = values
    arrItemsValue = Object.entries(arrayItems).map(([key, value]) => ({
      id: Number.parseInt(key),
      name: value.value,
      editing: false,
    }))
  } else if (cssClass === 'cl_drugs') {
    const arrayItems: string[] = values === '' ? [] : values.split(',')
    arrItemsValue = Object.entries(arrayItems).map(([key, value]) => ({
      id: Number.parseInt(key),
      name: value,
      editing: false,
    }))
  }

  if (cssClass === 'input_text') {
    txtInputTypeValue = fldtype
    txtDefaultsValue = content
  } else if (cssClass === 'checkbox') {
    const myArray = content.split(',')?.map((a) => atob(a))
    content = myArray.map((el) => {
      if (arrItemsValue?.length > 0)
        return arrItemsValue?.find((e) => e?.name === el)?.id?.toString() || '0'
      else return '0'
    })
  } else if (cssClass === 'radio' || cssClass === 'select') {
    content = arrItemsValue?.find((el) => el?.name === content)?.id || 0
    txtDefaultsValue = content?.toString()
    content = [content]
  } else if (cssClass === 'slider') {
    content = content?.toString()
    txtDefaultsValue = content
  } else if (cssClass === 'labs_tests') {
    content = content ? content?.split(',') : []
  } else if (cssClass === 'cl_drugs') {
    content = proccessDrugsData({ MedicalContactAttr: attrs })
  } else if (cssClass === 'staticText') txtBlockValue = values.trim()
  else if (cssClass === 'textarea') txtDefaultsValue = content
  else if (cssClass === 'snomed') txtBlockValue = defaults || content
  else if (cssClass === 'btn_medical_condition') txtDefaultsValue = content

  return {
    txtQuestion: label,
    txtBlock: txtBlockValue,
    txtInputType: txtInputTypeValue,
    txtDefaults: txtDefaultsValue,
    txtLinkedField: txtLinkedFieldValue,
    signData: content,
    arrItems: arrItemsValue,
    txtValue: txtDefaultsValue,
    arrValue: content,
    required: required === 'true' ? true : false,
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
