import React from 'react'
import CreatePrescription from './CreatePrescription'

export default {
  component: CreatePrescription,
  title: 'Client Card/Create Prescription',
  args: {},
  argTypes: {},
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const CreatePrescriptionStory = ({ ...args }) => {
  return (
    <div
      style={{
        width: 'calc(100vw - 60px)',
        height: 'calc(100vh - 60px)',
        border: '1px solid var(--border-color-base)',
      }}
    >
      <CreatePrescription
        {...args}
        client={{ id: '', name: '', email: '' }}
        receiverData=""
      />
    </div>
  )
}

export const Basic = CreatePrescriptionStory.bind({})
Basic.args = {}
