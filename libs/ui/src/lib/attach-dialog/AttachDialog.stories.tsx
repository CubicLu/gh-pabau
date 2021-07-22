import React from 'react'
import AttachDialog, { AttachDialogProps } from './AttachDialog'

export default {
  component: AttachDialog,
  title: 'UI/AttachDialog',
  onClick: { action: 'onClick' },
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const AttachDialogStory = ({ ...args }: AttachDialogProps) => (
  <AttachDialog {...args} />
)

export const AttachFilesModal = AttachDialogStory.bind({})
AttachFilesModal.args = {
  title: 'Attach Files',
  visible: true,
  onClose: () => {
    return
  },
}
