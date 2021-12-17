import React from 'react'
import FormCheckBox from './FormCheckBox'
import FormComponent from './FormComponent'
import FormComponentBuilder from './FormComponentBuilder'
import FormDrawing from './FormDrawing'
import FormDropDown from './FormDropDown'
import FormDrugs from './FormDrugs'
import FormImage from './FormImage'
import FormLabTests from './FormLabTests'
import FormMedicalConditions from './FormMedicalConditions'
import FormPhotoUpload from './FormPhotoUpload'
import FormSignature from './FormSignature'
import FormSingleChoice from './FormSingleChoice'
import FormStaticText from './FormStaticText'
import FormTextArea from './FormTextArea'
import FormTextField from './FormTextField'
import FormTravel from './FormTravel'

export default {
  component: FormComponent,
  title: 'UI/Form Component',
}
const FormStaticTextStory = ({ title, desc1, desc2, ...rest }) => (
  <FormStaticText title={title} desc1={desc1} desc2={desc2} {...rest} />
)
export const FormStaticTextComponent = FormStaticTextStory.bind({})
FormStaticTextComponent.args = {
  title: 'Client medical questionaire',
  desc1:
    'In order to provide you with the most appropriate treatment, we need you to complete the following questionnaire.',
  desc2: 'All information is strictly confidential',
}

const FormTextFieldStory = ({
  title,
  desc,
  placeHolder,
  defaultValue,
  txtInputType,
  ...rest
}) => (
  <FormTextField
    title={title}
    desc={desc}
    placeHolder={placeHolder}
    defaultValue={defaultValue}
    txtInputType={txtInputType}
    {...rest}
  />
)
export const FormTextFieldComponent = FormTextFieldStory.bind({})
FormTextFieldComponent.args = {
  title: 'Work phone',
  desc: 'Enter your work phone (optional)',
  placeHolder: 'Enter work phone',
  defaultValue: '',
}

const FormTextAreaStory = ({
  title,
  desc,
  placeHolder,
  defaultValue,
  ...rest
}) => (
  <FormTextArea
    title={title}
    desc={desc}
    placeHolder={placeHolder}
    defaultValue={defaultValue}
    required={false}
  />
)
export const FormTextAreaComponent = FormTextAreaStory.bind({})
FormTextAreaComponent.args = {
  title: 'Work phone',
  desc: 'Enter your work phone (optional)',
  placeHolder: 'Enter work phone',
  defaultValue: '',
}

const FormCheckBoxStory = ({ title, desc, paramItems }) => (
  <FormCheckBox
    title={title}
    desc={desc}
    paramItems={paramItems}
    required={false}
  />
)
export const FormCheckBoxComponent = FormCheckBoxStory.bind({})
FormCheckBoxComponent.args = {
  title: 'Tick your preferences',
  desc: 'Please tick below which apply to you',
  paramItems: [
    {
      id: 1,
      name: 'I am interested in Aesthetics',
      editing: false,
    },
    {
      id: 2,
      name: 'I am interested in Surgery',
      editing: false,
    },
    {
      id: 3,
      name: 'I am just exploring',
      editing: false,
    },
  ],
}

const FormLabTestsStory = ({ title, desc, paramItems }) => (
  <FormLabTests title={title} desc={desc} required={false} />
)
export const FormLabTestsComponent = FormLabTestsStory.bind({})
FormLabTestsComponent.args = {
  title: 'Lab Tests',
  desc: 'Tell us about your lab tests',
  paramItems: [
    {
      id: 1,
      name: 'Medical Condition - 1',
      editing: false,
    },
    {
      id: 2,
      name: 'Medical Condition - 2',
      editing: false,
    },
    {
      id: 3,
      name: 'Medical Condition - 3',
      editing: false,
    },
    {
      id: 4,
      name: 'Medical Condition - 4',
      editing: false,
    },
    {
      id: 5,
      name: 'Medical Condition - 5',
      editing: false,
    },
    {
      id: 6,
      name: 'Medical Condition - 6',
      editing: false,
    },
  ],
}

const FormMedicalConditionsStory = ({ title, desc, paramItems }) => (
  <FormMedicalConditions title={title} desc={desc} />
)
export const FormMedicalConditionsComponent = FormMedicalConditionsStory.bind(
  {}
)
FormMedicalConditionsComponent.args = {
  title: 'Medical conditions',
  desc: 'Tell us about your medical conditions',
  paramItems: [
    {
      id: 1,
      name: 'Medical Condition - 1',
      editing: false,
    },
    {
      id: 2,
      name: 'Medical Condition - 2',
      editing: false,
    },
    {
      id: 3,
      name: 'Medical Condition - 3',
      editing: false,
    },
    {
      id: 4,
      name: 'Medical Condition - 4',
      editing: false,
    },
    {
      id: 5,
      name: 'Medical Condition - 5',
      editing: false,
    },
    {
      id: 6,
      name: 'Medical Condition - 6',
      editing: false,
    },
  ],
}

const FormPhotoUploadStory = ({ title, desc, paramItems }) => (
  <FormPhotoUpload
    title={title}
    desc={desc}
    paramItems={paramItems}
    required={false}
  />
)
export const FormPhotoUploadComponent = FormPhotoUploadStory.bind({})
FormPhotoUploadComponent.args = {
  title: 'Add photo',
  desc: 'Add your photo',
  paramItems: [
    {
      id: 1,
      name: '',
      editing: false,
    },
  ],
}

const FormSingleChoiceStory = ({ title, desc, paramItems }) => (
  <FormSingleChoice
    title={title}
    desc={desc}
    paramItems={paramItems}
    required={false}
  />
)
export const FormSingleChoiceComponent = FormSingleChoiceStory.bind({})
FormSingleChoiceComponent.args = {
  title: 'Smoking',
  desc: 'Do you smoke?',
  paramItems: [
    {
      id: 1,
      name: 'No',
      editing: false,
    },
    {
      id: 2,
      name: 'Yes',
      editing: false,
    },
  ],
}

const FormDrawingStory = ({ title, desc, paramItems }) => (
  <FormDrawing
    title={title}
    desc={desc}
    paramItems={paramItems}
    required={false}
  />
)
export const FormDrawingComponent = FormDrawingStory.bind({})
FormDrawingComponent.args = {
  title: 'Plot points',
  desc: 'Add a list of countries you have been to recently',
  paramItems: [
    {
      id: 1,
      name: '',
      editing: false,
    },
  ],
}

const FormDropDownStory = ({ title, desc, paramItems }) => (
  <FormDropDown
    title={title}
    desc={desc}
    paramItems={paramItems}
    required={false}
  />
)
export const FormDropDownComponent = FormDropDownStory.bind({})
FormDropDownComponent.args = {
  title: 'Daily activity',
  desc: 'Describe your daily activity',
  paramItems: [
    {
      id: 1,
      name: 'Select daily activity - 1',
      editing: false,
    },
    {
      id: 2,
      name: 'Select daily activity - 2',
      editing: false,
    },
    {
      id: 3,
      name: 'Select daily activity - 3',
      editing: false,
    },
  ],
}

const FormImageStory = ({ title, desc, paramItems }) => (
  <FormImage
    title={title}
    desc={desc}
    paramItems={paramItems}
    required={false}
  />
)
export const FormImageComponent = FormImageStory.bind({})
FormImageComponent.args = {
  title: 'Norwood scale',
  desc: '',
  paramItems: [
    {
      id: 1,
      name: '',
      editing: false,
    },
  ],
}

const FormTravelStory = ({ title, desc, paramItems }) => (
  <FormTravel
    title={title}
    desc={desc}
    paramItems={paramItems}
    required={false}
  />
)
export const FormTravelComponent = FormTravelStory.bind({})
FormTravelComponent.args = {
  title: 'Traveling',
  desc: 'Add a list of countries you have been to recently',
  paramItems: [],
}

const FormSignatureStory = ({ title, desc }) => (
  <FormSignature
    title={title}
    desc={desc}
    required={false}
    txtInputType={'client'}
    signData={'test'}
  />
)
export const FormSignatureComponent = FormSignatureStory.bind({})
FormSignatureComponent.args = {
  title: 'Signature',
  desc: 'Secure the agreement with your signature',
}

const FormDrugsStory = ({ title, desc, paramItems }) => (
  <FormDrugs
    title={title}
    desc={desc}
    paramItems={paramItems}
    required={false}
  />
)
export const FormDrugsComponent = FormDrugsStory.bind({})
FormDrugsComponent.args = {
  title: 'Drugs',
  desc: '',
  paramItems: [],
}

const FormComponentBuilderStory = ({ previewData }) => (
  <FormComponentBuilder previewData={previewData} />
)
export const FormComponents = FormComponentBuilderStory.bind({})
FormComponents.args = {
  previewData: '',
  previewAttrs: [],
}
