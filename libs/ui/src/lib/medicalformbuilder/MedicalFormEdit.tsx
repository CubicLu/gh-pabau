import {
  defaultMedicaFormAdvanceSettingData,
  MedicaFormAdvanceSettingData,
  MedicalFormTypes,
  Notification,
  NotificationType,
  RuleProp,
  CompanyListItem,
  LabTestsListItem,
} from '@pabau/ui'
import { Col, Modal, Row } from 'antd'
import { cloneDeep, isEqual } from 'lodash'
import React, { FC, useEffect, useReducer, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'
import RightSidebar from '../rightsidebar/RightSidebar'
import styles from './MedicalFormBuilder.module.less'
import MedicalFormEditEpaper from './MedicalFormEditEpaper'
import MedicalFormEditLeft from './MedicalFormEditLeft'
import MedicalFormEditMain from './MedicalFormEditMain'
import { ArrayItem, defaultFormValue, OptionType } from './MedicalFormInterface'

const medicalForms = [
  { id: 0, formType: 'basic', formName: 'basic_heading' },
  { id: 1, formType: 'basic', formName: 'basic_shortanswer' },
  { id: 2, formType: 'basic', formName: 'basic_longanswer' },
  { id: 3, formType: 'basic', formName: 'basic_textblock' },
  { id: 4, formType: 'basic', formName: 'basic_singlechoice' },
  { id: 5, formType: 'basic', formName: 'basic_multiplechoice' },
  { id: 6, formType: 'basic', formName: 'basic_dropdown' },
  { id: 7, formType: 'basic', formName: 'basic_staticimage' },
  { id: 8, formType: 'basic', formName: 'basic_drawing' },
  { id: 9, formType: 'basic', formName: 'basic_signature' },
  { id: 10, formType: 'basic', formName: 'basic_photo' },
  { id: 11, formType: 'basic', formName: 'basic_conditions' },
  { id: 12, formType: 'basic', formName: 'basic_drugs' },
  { id: 13, formType: 'basic', formName: 'basic_labtests' },
  // { id: 14, formType: 'basic', formName: 'basic_traveldestination' },
  // { id: 15, formType: 'basic', formName: 'basic_vaccinescheduler' },
  // { id: 16, formType: 'basic', formName: 'basic_vaccinehistory' },
  { id: 14, formType: 'basic', formName: 'basic_snomed' },
  { id: 15, formType: 'basic', formName: 'basic_slider' },
  { id: 16, formType: 'custom', formName: 'custom_emailmarketing' },
  { id: 17, formType: 'custom', formName: 'custom_smsmarketing' },
  { id: 18, formType: 'custom', formName: 'custom_phonecall' },
  { id: 19, formType: 'custom', formName: 'custom_lettermarketing' },
  { id: 20, formType: 'custom', formName: 'custom_membershipnumber' },
  { id: 21, formType: 'custom', formName: 'custom_authorizationcode' },
  { id: 22, formType: 'custom', formName: 'custom_company' },
  { id: 23, formType: 'custom', formName: 'custom_dob' },
  { id: 24, formType: 'custom', formName: 'custom_gender' },
  { id: 25, formType: 'custom', formName: 'custom_physicaladdress' },
  { id: 26, formType: 'custom', formName: 'custom_referredby' },
  { id: 27, formType: 'custom', formName: 'custom_telephonenumber' },
]
const previewMapping = [
  { heading: 'basic_heading' },
  { staticText: 'basic_textblock' },
  { input_text: 'basic_shortanswer' },
  { team: 'empty' },
  { textarea: 'basic_longanswer' },
  { checkbox: 'basic_multiplechoice' },
  { radio: 'basic_singlechoice' },
  { select: 'basic_dropdown' },
  { image: 'basic_drawing' },
  { staticImage: 'basic_staticimage' },
  { diagram_mini: 'basic_drawing' },
  { signature: 'basic_signature' },
  { cl_drugs: 'basic_drugs' },
  { labs_tests: 'basic_labtests' },
  // { vaccine_scheduler: 'basic_vaccinescheduler' },
  // { vaccine_history: 'basic_vaccinehistory' },
  { snomed: 'basic_snomed' },
  { slider: 'basic_slider' },
  // { travel_destination: 'basic_traveldestination' },
  { btn_medical_condition: 'basic_conditions' },
  { diagram: 'empty' },
  { facediagram: 'empty' },
  { diagram_mini: 'empty' },
  { photo_and_drawer: 'basic_photo' },
  { epaper: 'empty' },
  { custom_photo_and_drawer: 'empty' },
  { cl_services: 'empty' },
  { history_data: 'empty' },
]

const reorder = (list, startIndex, endIndex) => {
  const [removed] = list.splice(startIndex, 1)
  list.splice(endIndex, 0, removed)
  return list
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

const reverseForm = (form) => {
  console.log('reverseForm', form)
  const mappingInfo = previewMapping.filter(
    (item) => Object.values(item)[0] === form.formName
  )
  let reverseObj = {}
  if (mappingInfo?.length > 0) {
    let cssClass = ''
    let required = ''
    let defaults = ''
    let fldtype = ''
    let linked = ''
    let title = ''
    let values = ''
    const objectValues = {}

    cssClass = Object.keys(mappingInfo[0])[0]
    required = form.required === true ? 'true' : 'false'
    defaults = form.txtDefaults
    fldtype = form.txtInputType
    linked = form.txtLinkedField
    values = form.txtQuestion
    if (cssClass === 'textarea') {
      defaults = form.txtBlock
    }

    if (cssClass === 'snomed') {
      defaults = form.txtBlock
    }

    if (cssClass === 'staticText') {
      values = form.txtBlock
    }

    if (cssClass === 'signature') {
      values = form.signData
    }

    if (
      cssClass === 'signature' ||
      cssClass === 'cl_drugs' ||
      form.arrItems.length > 0
    ) {
      title = form.txtQuestion
    }

    if (cssClass === 'cl_drugs' && form.arrItems.length === 0) {
      values = ''
    }

    reverseObj = {
      cssClass: cssClass,
      required: required,
      defaults: defaults,
      fldtype: fldtype,
      linked: linked,
      title: title,
    }

    if (form.arrItems.length > 0) {
      title = form.txtQuestion
      form.arrItems.map((item) => {
        objectValues[item.id] = {
          baseline: 'false',
          critical: 'false',
          desc: '',
          trigger: 'null',
          value: item.name,
        }
        return objectValues
      })
      reverseObj = {
        ...reverseObj,
        values: objectValues,
      }
    } else {
      reverseObj = {
        ...reverseObj,
        values: values,
      }
    }
  }
  console.log('reverseObj', reverseObj)
  return reverseObj
}

const getFormInfo = (form) => {
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
      label = 'Drugs'
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
    txtInputTypeValue = form.fldtype
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

interface P {
  previewData: string
  changeFormName: (formName: string) => void
  changeFormType: (formType: string) => void
  changeService: (services: Array<string | number>) => void
  clickedCreateForm: boolean
  clickedPreviewForm: boolean
  clearCreateFormBtn: () => void
  getFormData: (formData: string) => void
  onSaveForm: (formdata: string) => void
  triggerChangeForms: (forms: MedicalFormTypes[]) => void
  formName: string
  medicalFormType: string
  medicalFormServices: string
  currentRules?: RuleProp[]
  currentAdvSettings?: MedicaFormAdvanceSettingData
  companyServiceListItems?: CompanyListItem[]
  labTestsListItems?: LabTestsListItem[]
}

const MedicalFormEdit: FC<P> = ({
  previewData,
  changeFormName,
  changeService,
  changeFormType,
  clickedCreateForm,
  clearCreateFormBtn,
  clickedPreviewForm,
  getFormData,
  onSaveForm,
  triggerChangeForms,
  formName,
  medicalFormType = '',
  medicalFormServices = '',
  currentRules = [],
  currentAdvSettings = defaultMedicaFormAdvanceSettingData,
  companyServiceListItems = [],
  labTestsListItems = [],
}) => {
  const { t } = useTranslation('common')
  const [, forceUpdate] = useReducer((x) => x + 1, 0)
  const [draggedForms, setDraggedForms] = useState<MedicalFormTypes[]>([])
  const [prevDraggedForms, setPrevDraggedForms] = useState<MedicalFormTypes[]>(
    []
  )
  const [reservedFormData, setReservedFormData] = useState('')
  const [selectedForm, setSelectedForm] = useState(defaultFormValue)
  const [displaySettingBar, setDisplaySettingBar] = useState(false)
  const [needRight, setNeedRight] = useState(true)
  const [previewPdf, setPreviewPdf] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    if (clickedCreateForm === true && draggedForms.length > 0) {
      setReservedFormData('')
      const reversedFormData = draggedForms.map((form) => reverseForm(form))
      const reversedFormObject = {
        form_structure: reversedFormData,
      }
      console.log('reversedFormObject =', reversedFormObject)
      const formData = btoa(
        unescape(encodeURIComponent(JSON.stringify(reversedFormObject)))
      )
      setReservedFormData(formData)
      onSaveForm(formData)
    } else {
      clearCreateFormBtn?.()
    }
  }, [clickedCreateForm, draggedForms, onSaveForm, clearCreateFormBtn])

  useEffect(() => {
    if (clickedPreviewForm === true && draggedForms.length > 0) {
      const reversedFormData = draggedForms.map((form) => reverseForm(form))
      const reversedFormObject = {
        form_structure: reversedFormData,
      }
      const formData = btoa(
        unescape(encodeURIComponent(JSON.stringify(reversedFormObject)))
      )
      getFormData(formData)
    }
  }, [clickedPreviewForm, draggedForms, getFormData])

  useEffect(() => {
    if (!isEqual(prevDraggedForms, draggedForms)) {
      if (draggedForms.length > 0) {
        triggerChangeForms(draggedForms)
      } else {
        triggerChangeForms([])
      }
      setPrevDraggedForms(draggedForms)
    }
  }, [draggedForms.length, draggedForms, prevDraggedForms, triggerChangeForms])

  useEffect(() => {
    setDraggedForms([])
    if (
      previewData &&
      typeof previewData != 'undefined' &&
      previewData !== ''
    ) {
      const previewDataArray = JSON.parse(atob(previewData))
      const previewForms = []
      console.log('previewDataArray', previewDataArray)
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

  const refreshDraggedForms = () => {
    handlingFormSetting('')
    setDraggedForms([])
  }

  const handlingFormSetting = (componentID) => {
    setDisplaySettingBar(componentID === '' ? false : true)
    if (componentID !== '') {
      const sel_form = draggedForms.filter((item) => item['id'] === componentID)
      setSelectedForm(sel_form ? sel_form[0] : defaultFormValue)
    }
  }

  const isEditing = () => {
    return draggedForms.length > 0 ? true : false
  }

  const handlingDeleteForm = (componentID) => {
    let delFlag = true
    if (currentRules.length > 0) {
      const rulesWithThisComponent = currentRules[0].if.answers.filter(
        (item) => item.answer === componentID
      )
      if (rulesWithThisComponent.length > 0) delFlag = false
    }
    if (!delFlag) {
      Notification(
        NotificationType.error,
        t('ui.medicalformbuilder.delete.rules.error')
      )
    } else {
      setDraggedForms(draggedForms.filter((item) => item['id'] !== componentID))
    }
  }

  const handlingSaveForm = (form) => {
    console.log('handlingSaveForm', form)
    const index = draggedForms.findIndex((item) => item['id'] === form.id)
    if (index !== -1) {
      draggedForms.splice(index, 1, form)
    }
  }

  const changeLayout = (noRightValue) => {
    setPreviewPdf(false)
    setNeedRight(noRightValue)
  }

  const runPreviewPdf = () => {
    setPreviewPdf(true)
  }

  const handlingClickLeft = (componentName) => {
    const mappingForm = medicalForms.filter(
      (item) => item.formName === componentName
    )
    if (mappingForm?.length > 0) {
      const item = medicalForms[mappingForm[0].id]
      const cloneFormInfo = cloneDeep(defaultFormValue)
      if (item.formType === 'custom' && item.formName === 'custom_gender') {
        const alterForm = medicalForms.filter(
          (medicalForm) => medicalForm.formName === 'basic_singlechoice'
        )
        if (alterForm.length > 0) {
          cloneFormInfo.txtQuestion = t(
            'ui.medicalformbuilder.form.gender.question'
          )
          cloneFormInfo.txtLinkedField = 'Gender'
          const arrItemsVaues = [
            {
              id: 1,
              name: t('ui.medicalformbuilder.form.gender.male'),
              editing: false,
            },
            {
              id: 2,
              name: t('ui.medicalformbuilder.form.gender.female'),
              editing: false,
            },
          ]
          cloneFormInfo.arrItems = arrItemsVaues
          setDraggedForms(
            copy(
              medicalForms,
              draggedForms,
              alterForm[0].id,
              draggedForms.length,
              cloneFormInfo
            )
          )
        }
      } else if (
        item.formType === 'custom' &&
        item.formName === 'custom_telephonenumber'
      ) {
        const alterForm = medicalForms.filter(
          (medicalForm) => medicalForm.formName === 'basic_shortanswer'
        )
        if (alterForm.length > 0) {
          cloneFormInfo.txtQuestion = t(
            'ui.medicalformbuilder.form.phone.question'
          )
          cloneFormInfo.txtLinkedField = 'Phone'
          cloneFormInfo.txtDefaults = '[CLIENTPHONE]'
          setDraggedForms(
            copy(
              medicalForms,
              draggedForms,
              alterForm[0].id,
              draggedForms.length,
              cloneFormInfo
            )
          )
        }
      } else if (item.formType === 'custom' && item.formName === 'custom_dob') {
        const alterForm = medicalForms.filter(
          (medicalForm) => medicalForm.formName === 'basic_shortanswer'
        )
        if (alterForm.length > 0) {
          cloneFormInfo.txtQuestion = t(
            'ui.medicalformbuilder.form.dob.question'
          )
          cloneFormInfo.txtLinkedField = 'DOB'
          cloneFormInfo.txtDefaults = '[CLIENTDOB]'
          cloneFormInfo.txtInputType = 'date'
          setDraggedForms(
            copy(
              medicalForms,
              draggedForms,
              alterForm[0].id,
              draggedForms.length,
              cloneFormInfo
            )
          )
        }
      } else if (
        item.formType === 'custom' &&
        item.formName === 'custom_physicaladdress'
      ) {
        const alterForm = medicalForms.filter(
          (medicalForm) => medicalForm.formName === 'basic_shortanswer'
        )
        if (alterForm.length > 0) {
          cloneFormInfo.txtQuestion = t(
            'ui.medicalformbuilder.form.postcode.question'
          )
          cloneFormInfo.txtLinkedField = 'MailingPostal'
          cloneFormInfo.txtDefaults = '[Postal]'
          setDraggedForms(
            copy(
              medicalForms,
              draggedForms,
              alterForm[0].id,
              draggedForms.length,
              cloneFormInfo
            )
          )

          cloneFormInfo.txtQuestion = t(
            'ui.medicalformbuilder.form.city.question'
          )
          cloneFormInfo.txtLinkedField = 'MailingCity'
          cloneFormInfo.txtDefaults = '[City]'
          setDraggedForms(
            copy(
              medicalForms,
              draggedForms,
              alterForm[0].id,
              draggedForms.length,
              cloneFormInfo
            )
          )

          cloneFormInfo.txtQuestion = t(
            'ui.medicalformbuilder.form.street.question'
          )
          cloneFormInfo.txtLinkedField = 'MailingStreet'
          cloneFormInfo.txtDefaults = '[Street]'
          setDraggedForms(
            copy(
              medicalForms,
              draggedForms,
              alterForm[0].id,
              draggedForms.length,
              cloneFormInfo
            )
          )
        }
      } else {
        setDraggedForms(
          copy(
            medicalForms,
            draggedForms,
            item.id,
            draggedForms.length,
            cloneFormInfo
          )
        )
      }
      forceUpdate()
    }
  }
  const genderQuestion = t('ui.medicalformbuilder.form.gender.question')
  const phoneQuestion = t('ui.medicalformbuilder.form.phone.question')
  const dobQuestion = t('ui.medicalformbuilder.form.dob.question')
  const postcodeQuestion = t('ui.medicalformbuilder.form.postcode.question')
  const cityQuestion = t('ui.medicalformbuilder.form.city.question')
  const streetQuestion = t('ui.medicalformbuilder.form.street.question')
  const onDragEnd = React.useCallback(
    (result) => {
      const { source, destination } = result
      if (!destination) {
        return
      }
      switch (source.droppableId) {
        case destination.droppableId:
          setDraggedForms((state) =>
            reorder(state, source.index, destination.index)
          )
          break
        case 'LeftSideBasic':
          setDraggedForms((state) =>
            copy(
              medicalForms,
              state,
              source.index,
              destination.index,
              defaultFormValue
            )
          )
          break
        case 'LeftSideCustom': {
          const item = medicalForms[source.index]
          const cloneFormInfo = cloneDeep(defaultFormValue)
          if (item.formType === 'custom' && item.formName === 'custom_gender') {
            const alterForm = medicalForms.filter(
              (medicalForm) => medicalForm.formName === 'basic_singlechoice'
            )
            if (alterForm.length > 0) {
              cloneFormInfo.txtQuestion = genderQuestion
              cloneFormInfo.txtLinkedField = 'Gender'
              const arrItemsVaues = [
                { id: 1, name: 'Male', editing: false },
                { id: 2, name: 'Female', editing: false },
              ]
              cloneFormInfo.arrItems = arrItemsVaues
              setDraggedForms((state) =>
                copy(
                  medicalForms,
                  state,
                  alterForm[0].id,
                  destination.index,
                  cloneFormInfo
                )
              )
            }
          } else if (
            item.formType === 'custom' &&
            item.formName === 'custom_telephonenumber'
          ) {
            const alterForm = medicalForms.filter(
              (medicalForm) => medicalForm.formName === 'basic_shortanswer'
            )
            if (alterForm.length > 0) {
              cloneFormInfo.txtQuestion = phoneQuestion
              cloneFormInfo.txtLinkedField = 'Phone'
              cloneFormInfo.txtDefaults = '[CLIENTPHONE]'
              setDraggedForms((state) =>
                copy(
                  medicalForms,
                  state,
                  alterForm[0].id,
                  destination.index,
                  cloneFormInfo
                )
              )
            }
          } else if (
            item.formType === 'custom' &&
            item.formName === 'custom_dob'
          ) {
            const alterForm = medicalForms.filter(
              (medicalForm) => medicalForm.formName === 'basic_shortanswer'
            )
            if (alterForm.length > 0) {
              cloneFormInfo.txtQuestion = dobQuestion
              cloneFormInfo.txtLinkedField = 'DOB'
              cloneFormInfo.txtDefaults = '[CLIENTDOB]'
              cloneFormInfo.txtInputType = 'date'
              setDraggedForms((state) =>
                copy(
                  medicalForms,
                  state,
                  alterForm[0].id,
                  destination.index,
                  cloneFormInfo
                )
              )
            }
          } else if (
            item.formType === 'custom' &&
            item.formName === 'custom_physicaladdress'
          ) {
            const alterForm = medicalForms.filter(
              (medicalForm) => medicalForm.formName === 'basic_shortanswer'
            )
            if (alterForm.length > 0) {
              cloneFormInfo.txtQuestion = postcodeQuestion
              cloneFormInfo.txtLinkedField = 'MailingPostal'
              cloneFormInfo.txtDefaults = '[Postal]'
              setDraggedForms((state) =>
                copy(
                  medicalForms,
                  state,
                  alterForm[0].id,
                  destination.index,
                  cloneFormInfo
                )
              )

              cloneFormInfo.txtQuestion = cityQuestion
              cloneFormInfo.txtLinkedField = 'MailingCity'
              cloneFormInfo.txtDefaults = '[City]'
              setDraggedForms((state) =>
                copy(
                  medicalForms,
                  state,
                  alterForm[0].id,
                  destination.index,
                  cloneFormInfo
                )
              )

              cloneFormInfo.txtQuestion = streetQuestion
              cloneFormInfo.txtLinkedField = 'MailingStreet'
              cloneFormInfo.txtDefaults = '[Street]'
              setDraggedForms((state) =>
                copy(
                  medicalForms,
                  state,
                  alterForm[0].id,
                  destination.index,
                  cloneFormInfo
                )
              )
            }
          } else {
            setDraggedForms((state) =>
              copy(
                medicalForms,
                state,
                source.index,
                destination.index,
                cloneFormInfo
              )
            )
          }
          break
        }

        default:
          break
      }
    },
    [
      setDraggedForms,
      genderQuestion,
      phoneQuestion,
      dobQuestion,
      postcodeQuestion,
      cityQuestion,
      streetQuestion,
    ]
  )

  const handleOk = () => {
    clearCreateFormBtn?.()
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    clearCreateFormBtn?.()
    setIsModalVisible(false)
  }

  return (
    <Row>
      <Modal
        title="Form Data"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <p>{reservedFormData}</p>
      </Modal>
      <DragDropContext onDragEnd={onDragEnd}>
        <Col className={styles.MedicalFormEditLeft}>
          <MedicalFormEditLeft
            refreshDraggedForms={refreshDraggedForms}
            isEditing={isEditing}
            medicalForms={medicalForms}
            companyServiceListItems={companyServiceListItems}
            changeFormName={changeFormName}
            changeService={changeService}
            changeFormType={changeFormType}
            formName={formName}
            medicalFormType={medicalFormType}
            medicalFormServices={medicalFormServices}
            changeLayout={changeLayout}
            runPreviewPdf={runPreviewPdf}
            handlingClickLeft={handlingClickLeft}
          />
        </Col>
        <Col
          className={
            needRight === true
              ? styles.MedicalFormEditMain
              : styles.MedicalFormEditMainNoRight
          }
        >
          {needRight === true && (
            <MedicalFormEditMain
              draggedForms={draggedForms}
              handlingFormSetting={handlingFormSetting}
            />
          )}
          {needRight === false && (
            <MedicalFormEditEpaper previewPdf={previewPdf} />
          )}
        </Col>
        {needRight === true && (
          <Col className={styles.MedicalFormEditRight}>
            {selectedForm && (
              <RightSidebar
                selectedForm={selectedForm}
                component={selectedForm['formName']}
                formType={selectedForm['formType']}
                display={displaySettingBar}
                handlingFormSetting={handlingFormSetting}
                handlingDeleteForm={handlingDeleteForm}
                handlingSaveForm={handlingSaveForm}
                labTestsListItems={labTestsListItems}
              />
            )}
          </Col>
        )}
      </DragDropContext>
    </Row>
  )
}

export default MedicalFormEdit
