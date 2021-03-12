import { MedicalFormTypes } from '@pabau/ui'
import { Col, Row } from 'antd'
import _ from 'lodash'
import React, { FC, useEffect, useReducer, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
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
  { id: 10, formType: 'basic', formName: 'basic_conditions' },
  { id: 11, formType: 'basic', formName: 'basic_drugs' },
  { id: 12, formType: 'basic', formName: 'basic_labtests' },
  { id: 13, formType: 'basic', formName: 'basic_traveldestination' },
  { id: 14, formType: 'basic', formName: 'basic_vaccinescheduler' },
  { id: 15, formType: 'basic', formName: 'basic_vaccinehistory' },
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
  { team: 'basic_shortanswer' },
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
  { vaccine_scheduler: 'basic_vaccinescheduler' },
  { vaccine_history: 'basic_vaccinehistory' },
  { travel_destination: 'basic_traveldestination' },
  { btn_medical_condition: 'basic_conditions' },
  { diagram: 'empty' },
  { facediagram: 'empty' },
  { diagram_mini: 'empty' },
  { photo_and_drawer: 'empty' },
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
    txtBlock: formInfo.txtBlock,
    txtInputType: formInfo.txtInputType,
    txtDefaults: formInfo.txtDefaults,
    txtLinkedField: formInfo.txtLinkedField,
    arrItems: formInfo.arrItems,
    required: formInfo.required,
  })
  return destination
}

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
  label = label === '' && form.values ? form.values.trim() : label

  if (form.cssClass === 'cl_services') label = 'Services'
  else if (form.cssClass === 'cl_drugs') label = 'Drugs'
  else if (form.cssClass === 'labs_tests') label = 'Labs Tests'
  else if (form.cssClass === 'vaccine_scheduler') label = ''
  else if (form.cssClass === 'staticText') label = ''

  let txtBlockValue = ''
  if (form.cssClass === 'textarea') {
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

  let arrItemsValue: OptionType[] = []
  if (
    form.cssClass === 'checkbox' ||
    form.cssClass === 'radio' ||
    form.cssClass === 'select' ||
    form.cssClass === 'staticImage' ||
    form.cssClass === 'diagram_mini' ||
    form.cssClass === 'image'
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
    arrItems: arrItemsValue,
    required: form.required === 'true' ? true : false,
  }
}

interface P {
  previewData: string
  changeFormName: (formName: string) => void
  formName: string
}

const MedicalFormEdit: FC<P> = ({ previewData, changeFormName, formName }) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0)
  const [draggedForms, setDraggedForms] = useState<MedicalFormTypes[]>([])
  const [selectedForm, setSelectedForm] = useState(defaultFormValue)
  const [displaySettingBar, setDisplaySettingBar] = useState(false)
  const [needRight, setNeedRight] = useState(true)
  const [previewPdf, setPreviewPdf] = useState(false)

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
    handlingFormSetting('')
    setDraggedForms(draggedForms.filter((item) => item['id'] !== componentID))
  }

  const handlingSaveForm = (form) => {
    const index = _.findIndex(draggedForms, (item) => item['id'] === form.id)
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
          const cloneFormInfo = _.cloneDeep(defaultFormValue)
          if (item.formType === 'custom' && item.formName === 'custom_gender') {
            const alterForm = medicalForms.filter(
              (medicalForm) => medicalForm.formName === 'basic_singlechoice'
            )
            if (alterForm.length > 0) {
              cloneFormInfo.txtQuestion = 'What is your gender?'
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
              cloneFormInfo.txtQuestion = 'Phone number'
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
              cloneFormInfo.txtQuestion = 'Date of birth'
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
              cloneFormInfo.txtQuestion = 'Postcode'
              cloneFormInfo.txtLinkedField = ''
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

              cloneFormInfo.txtQuestion = 'City'
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

              cloneFormInfo.txtQuestion = 'Street Address'
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
    [setDraggedForms]
  )
  return (
    <Row>
      <DragDropContext onDragEnd={onDragEnd}>
        <Col className={styles.MedicalFormEditLeft}>
          <MedicalFormEditLeft
            refreshDraggedForms={refreshDraggedForms}
            isEditing={isEditing}
            medicalForms={medicalForms}
            changeFormName={changeFormName}
            formName={formName}
            changeLayout={changeLayout}
            runPreviewPdf={runPreviewPdf}
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
              />
            )}
          </Col>
        )}
      </DragDropContext>
    </Row>
  )
}

export default MedicalFormEdit
