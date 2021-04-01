import React from 'react'
import { FileTextFilled } from '@ant-design/icons'
import FullScreenReportModal, {
  FullScreenReportModalProps,
  OperationType,
} from './FullScreenReportModal'

export default {
  component: FullScreenReportModal,
  title: 'Modals/FullScreenModal',
  args: {},
  argTypes: { onBackClick: { action: 'clicked' } },
}

const FullScreenModalStory = ({ ...args }: FullScreenReportModalProps) => (
  <FullScreenReportModal {...args} />
)

export const CreateService = FullScreenModalStory.bind({})
CreateService.args = {
  title: 'Create Service',
  visible: false,
  operations: [OperationType.active, OperationType.create],
  createBtnText: 'Create',
  enableCreateBtn: true,
  activated: true,
  subMenu: [
    'General',
    'Pricing',
    'Staff & Resources',
    'Online Booking',
    'Client pathway',
  ],
}

export const CreateIssuringCompany = FullScreenModalStory.bind({})
CreateIssuringCompany.args = {
  title: 'Create Issuring Company',
  visible: false,
  operations: [OperationType.save, OperationType.create],
  saveBtnText: 'Save as draft',
  createBtnText: 'Create',
  enableCreateBtn: true,
}

export const CreateSender = FullScreenModalStory.bind({})
CreateSender.args = {
  title: 'Create a Sender',
  visible: false,
  operations: [OperationType.active, OperationType.create],
  createBtnText: 'Create',
  enableCreateBtn: true,
  activated: true,
}

export const EditSender = FullScreenModalStory.bind({})
EditSender.args = {
  title: 'Edit a Sender',
  visible: false,
  operations: [
    OperationType.active,
    OperationType.delete,
    OperationType.create,
  ],
  deleteBtnText: 'Delete',
  createBtnText: 'Create',
  enableCreateBtn: true,
  activated: true,
}

export const CreateRooms = FullScreenModalStory.bind({})
CreateRooms.args = {
  title: 'Create Rooms',
  visible: false,
  operations: [
    OperationType.active,
    OperationType.delete,
    OperationType.create,
  ],
  deleteBtnText: 'Delete',
  createBtnText: 'Create',
  enableCreateBtn: true,
  activated: true,
  subMenu: ['Details', 'Location'],
}

export const Newsletter = FullScreenModalStory.bind({})
Newsletter.args = {
  title: 'FTT Skin Clinics update',
  visible: false,
  operations: [],
}

export const CreateSMSTemplate = FullScreenModalStory.bind({})
CreateSMSTemplate.args = {
  title: (
    <>
      <FileTextFilled
        style={{
          fontSize: '22px',
          color: 'var(--primary-color)',
          marginRight: '12px',
        }}
      />{' '}
      Create SMS Template
    </>
  ),
  visible: false,
  operations: [OperationType.create],
  createBtnText: 'Save',
  enableCreateBtn: true,
}
