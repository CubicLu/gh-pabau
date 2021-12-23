import React from 'react'
import LanguageSelectorDropdown from './LanguageSelectorDropdown'

export default {
  component: LanguageSelectorDropdown,
  title: 'LanguageSelectorDropdown',
  args: {},
  argTypes: {},
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const LanguageSelectorStory = ({ ...rest }) => (
  <LanguageSelectorDropdown {...rest} />
)
export const language = LanguageSelectorStory.bind({})
language.args = {
  label: 'Default language for your staff',
  value: 'French',
  tooltip: '',
}
