import React from 'react'
import StickyPopout from './StickyPopout'

export default {
  component: StickyPopout,
  title: 'Client Card/StickyPopout',
  args: {},
  argTypes: {},
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const StickyPopoutStory = ({ ...args }) => {
  return <StickyPopout />
}

export const Basic = StickyPopoutStory.bind({})
