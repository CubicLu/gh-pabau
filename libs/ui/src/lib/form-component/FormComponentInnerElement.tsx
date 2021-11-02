import {
  MedicalFormTypes,
  MacroItem,
  InvProductsListItem,
  MedicalConditionsListItem,
} from '@pabau/ui'
import { cloneDeep } from 'lodash'
import React, { FC, useState } from 'react'
import FormCheckBox from './FormCheckBox'
import styles from './FormComponent.module.less'
import FormDrawing from './FormDrawing'
import FormDropDown from './FormDropDown'
import FormDrugs from './FormDrugs'
import FormImage from './FormImage'
import FormLabTests from './FormLabTests'
import FormMedicalConditions from './FormMedicalConditions'
import FormPhotoUpload from './FormPhotoUpload'
import FormSignature from './FormSignature'
import FormSingleChoice from './FormSingleChoice'
import FormSlider from './FormSlider'
import FormStaticText from './FormStaticText'
import FormTextArea from './FormTextArea'
import FormTextField from './FormTextField'
import FormTextFieldWithMacro from './FormTextFieldWithMacro'
import FormTravel from './FormTravel'
import FormSnomed from './FormSnomed'

interface P {
  required: boolean
  type: string
  component: string
  handleId: string
  formData: MedicalFormTypes
  handlingSaveForm?: (form: MedicalFormTypes) => void
  onHandleMacro?: (action: string, macro: MacroItem) => void
  macroItems?: MacroItem[]
  invProductsListItems?: InvProductsListItem[]
  medicalConditionsListItems?: MedicalConditionsListItem[]
  hideMacro?: boolean
}

const FormComponentInnerElement: FC<P> = ({
  required,
  type,
  component,
  handleId,
  formData,
  handlingSaveForm,
  macroItems = [],
  invProductsListItems = [],
  medicalConditionsListItems = [],
  onHandleMacro,
  hideMacro = false,
}) => {
  const [form, setForm] = useState(cloneDeep(formData))

  const componentInfos = [
    {
      component: 'form_drawing',
    },
    {
      component: 'form_checkbox',
    },
    {
      component: 'form_dropdown',
    },
    {
      component: 'form_image',
    },
    {
      component: 'form_photoupload',
    },
    {
      component: 'form_signature',
    },
    {
      component: 'form_singlechoice',
    },
    {
      component: 'form_statictext',
    },
    {
      component: 'form_snomed',
    },
    {
      component: 'form_slider',
    },
    {
      component: 'form_textfield',
    },
    {
      component: 'form_textarea',
    },
    {
      component: 'form_medicalcondition',
    },
    {
      component: 'form_drugs',
    },
    {
      component: 'form_travel',
    },
    {
      component: 'form_labtests',
    },
    {
      component: 'form_photoupload',
    },
  ]

  const onChangeTextValue = (value) => {
    const tempForm = { ...form, txtValue: value }
    setForm(tempForm)
    handlingSaveForm?.(tempForm)
  }

  const onChangeArrValue = (value) => {
    const tempForm = { ...form, arrValue: value }
    setForm(tempForm)
    handlingSaveForm?.(tempForm)
  }

  const filteredComponent = componentInfos.filter(
    (item) => item.component === component
  )

  return (
    <div className={styles.formComponentInnerElement}>
      {filteredComponent.length > 0 && (
        <>
          {formData && formData.formName === 'form_drawing' && (
            <FormDrawing
              title={formData.txtQuestion}
              desc={''}
              paramItems={formData.arrItems}
              required={formData.required}
            />
          )}
          {formData && formData.formName === 'form_checkbox' && (
            <FormCheckBox
              title={formData.txtQuestion}
              desc={''}
              paramItems={formData.arrItems}
              required={formData.required}
              onChangeArrValue={onChangeArrValue}
            />
          )}
          {formData && formData.formName === 'form_dropdown' && (
            <FormDropDown
              title={formData.txtQuestion}
              desc={''}
              paramItems={formData.arrItems}
              required={formData.required}
              onChangeTextValue={onChangeTextValue}
            />
          )}
          {formData && formData.formName === 'form_image' && (
            <FormImage
              title={formData.txtQuestion}
              desc={''}
              paramItems={formData.arrItems}
              required={formData.required}
            />
          )}
          {formData && formData.formName === 'form_photoupload' && (
            <FormPhotoUpload
              title={formData.txtQuestion}
              desc={''}
              paramItems={formData.arrItems}
              required={formData.required}
            />
          )}
          {formData && formData.formName === 'form_signature' && (
            <FormSignature
              title={formData.txtQuestion}
              desc={''}
              signData={formData.signData}
              required={formData.required}
              txtInputType={formData.txtInputType}
              onChangeTextValue={onChangeTextValue}
            />
          )}
          {formData && formData.formName === 'form_singlechoice' && (
            <FormSingleChoice
              title={formData.txtQuestion}
              desc={''}
              paramItems={formData.arrItems}
              required={formData.required}
              onChangeTextValue={onChangeTextValue}
            />
          )}
          {formData && formData.formName === 'form_statictext' && (
            <FormStaticText
              title={formData.txtQuestion}
              desc1={formData.txtBlock}
              desc2={''}
              required={formData.required}
            />
          )}
          {formData &&
            formData.formName === 'form_textfield' &&
            (formData.txtInputType === 'text' ||
              formData.txtInputType === '') && (
              <FormTextFieldWithMacro
                title={formData.txtQuestion}
                desc={''}
                placeHolder={''}
                defaultValue={formData.txtDefaults}
                required={formData.required}
                onChangeTextValue={onChangeTextValue}
                onHandleMacro={onHandleMacro}
                macroItems={macroItems}
                isTextArea={false}
                hideMacro={hideMacro}
              />
            )}
          {formData &&
            formData.formName === 'form_textfield' &&
            formData.txtInputType !== 'text' &&
            formData.txtInputType !== '' && (
              <FormTextField
                title={formData.txtQuestion}
                desc={''}
                placeHolder={''}
                defaultValue={formData.txtDefaults}
                txtInputType={formData.txtInputType}
                required={formData.required}
                onChangeTextValue={onChangeTextValue}
              />
            )}
          {formData && formData.formName === 'form_textarea' && (
            <FormTextFieldWithMacro
              title={formData.txtQuestion}
              desc={''}
              placeHolder={''}
              defaultValue={formData.txtDefaults}
              required={formData.required}
              onChangeTextValue={onChangeTextValue}
              onHandleMacro={onHandleMacro}
              macroItems={macroItems}
              isTextArea={true}
            />
          )}
          {formData && formData.formName === 'form_snomed' && (
            <FormSnomed
              title={formData.txtQuestion}
              placeHolder={''}
              required={formData.required}
              onChangeTextValue={onChangeTextValue}
            />
          )}
          {formData && formData.formName === 'form_slider' && (
            <FormSlider
              title={formData.txtQuestion}
              desc={''}
              paramItems={formData.arrItems}
              required={formData.required}
              onChangeTextValue={onChangeTextValue}
            />
          )}
          {formData && formData.formName === 'form_medicalcondition' && (
            <FormMedicalConditions
              title={formData.txtQuestion}
              desc={''}
              paramItems={formData.arrItems}
              required={formData.required}
              medicalConditionsListItems={medicalConditionsListItems}
              onChangeArrValue={onChangeArrValue}
            />
          )}
          {formData && formData.formName === 'form_drugs' && (
            <FormDrugs
              title={formData.txtQuestion}
              desc={''}
              paramItems={formData.arrItems}
              required={formData.required}
              onChangeArrValue={onChangeArrValue}
            />
          )}
          {formData && formData.formName === 'form_travel' && (
            <FormTravel
              title={formData.txtQuestion}
              desc={''}
              paramItems={formData.arrItems}
              required={formData.required}
              onChangeArrValue={onChangeArrValue}
            />
          )}
          {formData && formData.formName === 'form_labtests' && (
            <FormLabTests
              title={formData.txtQuestion}
              desc={''}
              paramItems={formData.arrItems}
              required={formData.required}
              invProductsListItems={invProductsListItems}
              onChangeArrValue={onChangeArrValue}
            />
          )}
        </>
      )}
    </div>
  )
}

export default FormComponentInnerElement
