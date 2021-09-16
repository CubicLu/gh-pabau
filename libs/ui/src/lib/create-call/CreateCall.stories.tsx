import React, { useState } from 'react'
import CreateCall, { CreateCallProps } from './CreateCall'

export default {
  component: CreateCall,
  title: 'Client Card/Create Call',
  args: {},
  argTypes: {},
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const CreateCallStory = ({ ...args }: CreateCallProps) => {
  const [currentStep, setCurrentStep] = useState(1)
  return (
    <div
      style={{
        width: 'calc(100vw - 60px)',
        height: 'calc(100vh - 60px)',
        border: '1px solid var(--border-color-base)',
      }}
    >
      <CreateCall
        {...args}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </div>
  )
}

export const Basic = CreateCallStory.bind({})
Basic.args = {}
