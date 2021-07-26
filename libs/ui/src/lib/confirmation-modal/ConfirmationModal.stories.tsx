import React, { FC } from 'react'
import { ConfirmationDialog } from './ConfirmationDialog'

export default {
  title: 'MODALS/Confirmation Dialog',
  component: ConfirmationDialog,
  args: {},
  argTypes: { onSubmit: { action: 'clicked' } },
}
export const ConfirmationDialogStorybook: FC = () => {
  return (
    <ConfirmationDialog
      title={'Delete record'}
      tooltip={'This action is irreversable'}
      visible={true}
      onClose={() => console.log('u clicked cancel')}
      onSubmit={() => console.log('u clicked submit')}
    >
      {'Are u sure u want to remove this record?'}
    </ConfirmationDialog>
  )
}
