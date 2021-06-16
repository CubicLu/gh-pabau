import React from 'react'
import RenderHtml from './RenderHtml'

export default {
  component: RenderHtml,
  title: 'UI/RenderHtml',
  argTypes: {
    __html: { control: { type: 'text' } },
  },
  parameters: {
    layout: 'fullscreen',
  },
}

const RenderHtmlStory = ({ __html, ...args }) => (
  <RenderHtml __html={__html} {...args} />
)

export const RenderHtmlComponent = RenderHtmlStory.bind({
  __html: '',
})
RenderHtmlComponent.args = {
  __html: '',
}
