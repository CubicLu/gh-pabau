import React from 'react'
import FormType, { FormTypeProps } from './FormType'

export default {
  component: FormType,
  title: 'UI/Form Type',
}

const FormtypeStory = ({ ...args }: FormTypeProps) => (
  <FormType {...args}></FormType>
)

export const Formtype = FormtypeStory.bind({})
Formtype.args = {
  setting: {
    medicalHistory: false,
    consent: false,
    treatment: false,
    epaper: false,
    prescription: false,
    lab: false,
  },
  onChangeSetting: (setting) => console.log(setting),
}
