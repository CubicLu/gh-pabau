import React from 'react'

import CloseButton from './CloseButton'

export default {
  component: CloseButton,
  title: 'UI/CloseButton',
}

const CloseButtonStory = () => <CloseButton />

export const DefaultCloseButtonStory = CloseButtonStory.bind({})
