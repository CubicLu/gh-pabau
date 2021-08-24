import React, { FC } from 'react'
import SelectForm, { SelectFormProps } from './SelectForm'

export default {
  component: SelectForm,
  title: 'Client Card/Select Form',
  args: {},
  argTypes: {},
  actions: { argTypesRegex: '^on[A-Z].*' },
}

export const SelectFormStory: FC<SelectFormProps> = ({ ...args }) => {
  return (
    <div
      style={{
        width: '841px',
        height: '784px',
        border: '1px solid var(--border-color-base)',
      }}
    >
      <SelectForm
        {...args}
        receiverData=""
        client={{ id: '', name: '', email: '' }}
      />
    </div>
  )
}
