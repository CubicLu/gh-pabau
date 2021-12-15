import React from 'react'
import ClientLoginForm from './ClientLoginForm'

export default {
  component: ClientLoginForm,
  title: 'UI/ClientLoginForm',
  args: {},
  argTypes: {},
}

const ClientFormStory = () => {
  return <ClientLoginForm />
}

export const Form = ClientFormStory.bind({})
