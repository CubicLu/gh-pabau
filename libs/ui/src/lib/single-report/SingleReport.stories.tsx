import React from 'react'
import { SingleReport } from './SingleReport'

export default {
  component: SingleReport,
  title: 'UI/SingleReport',
  args: {
    reportCode: 'FI000',
    reportName: 'Daily Sales',
    isNew: false,
    favorite: false,
  },
  argTypes: {
    reportCode: {
      control: {
        type: 'text',
      },
    },
    reportName: {
      control: {
        type: 'text',
      },
    },
    isNew: {
      control: {
        type: 'boolean',
      },
    },
    favourite: {
      control: {
        type: 'boolean',
      },
    },
  },
}

const SingleReportStory = ({ ...args }) => <SingleReport {...args} />

export const Basic = SingleReportStory.bind({})

export const Favorite = SingleReportStory.bind({})
Favorite.args = {
  favourite: true,
}

export const New = SingleReportStory.bind({})
New.args = {
  isNew: true,
}

export const NewAndFavorite = SingleReportStory.bind({})
NewAndFavorite.args = {
  isNew: true,
  favourite: true,
}
