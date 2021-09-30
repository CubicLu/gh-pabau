import React from 'react'
import Breadcrumb from './Breadcrumb'

export default {
  component: Breadcrumb,
  title: 'Basics/Breadcurmb',
}

const BreadcrumbStory = ({ items }) => {
  return <Breadcrumb items={items} />
}

export const Basic = BreadcrumbStory.bind({})
Basic.args = {
  items: [
    { breadcrumbName: 'Setup', path: '' },
    { breadcrumbName: 'Source', path: '' },
  ],
}
