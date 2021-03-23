import React, { useState } from 'react'
import { ReportHelpSidebar, ReportHelpSidebarProps } from './ReportHelpSidebar'

export default {
  component: ReportHelpSidebar,
  title: 'Basics/ReportHelpSidebar',
  args: {
    visible: true,
  },
  argTypes: {
    visible: { control: { type: 'boolean' } },
  },
}

const ReportHelpSidebarStory = ({ ...args }: ReportHelpSidebarProps) => (
  <ReportHelpSidebar {...args} />
)

export const Default = ReportHelpSidebarStory.bind({})
Default.args = {
  visible: false,
}

export const ReportHelpSidebarDemoStory = (): JSX.Element => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <button onClick={() => setVisible(true)}>show</button>
      <ReportHelpSidebar visible={visible} onClose={() => setVisible(false)} />
    </>
  )
}
