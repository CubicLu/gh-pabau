import React, { FC } from 'react'
import SetupChip from './SetupChip'
import SetupGrid from './SetupGrid'
import Webinar from './SetupWebinar'
import SetupSearchInput from './SetupSearchInput'
import SetupGridMobile from './SetupGridMobile'
import SetupEmptySearch from './SetupEmptySearch'
import SetupGridSubMenuMobile from './SetupGridSubMenuMobile'
import { EditOutlined } from '@ant-design/icons'
import clinicImage from '../../assets/images/our-clinic.png'
import backgroundImage from '../../assets/images/footer.png'

export default {
  title: 'Basics/SetupChip',
  parameters: {
    layout: 'fullscreen',
  },
}

export const SetupChipStory: FC = () => {
  const props = {
    title: 'Blog',
    count: '53',
    subTitle: 'posts',
    image: <EditOutlined />,
    onClick: (title: string): string => {
      return title
    },
  }

  return <SetupChip {...props} />
}

export const SetupGridStory: FC = () => {
  const props = {
    title: 'Our clinic',
    subDataTitles: [
      { title: 'Business Details', data: [] },
      {
        title: 'Users',
        data: [
          {
            title: 'Users',
          },
          {
            title: 'User Groups',
          },
        ],
      },
      { title: 'Locations', data: [] },
      {
        title: 'General settings',
        data: [
          {
            title: ' Calendar Settings',
          },
          {
            title: 'Point of Sale Configuration',
          },
          {
            title: 'Loyalty',
          },
          {
            title: 'Referral Settings',
          },
        ],
      },
      { title: 'Integrations', data: [] },
      {
        title: 'Data',
        data: [
          {
            title: 'Custom Fields',
          },
          {
            title: 'Data Imports',
          },
        ],
      },
      {
        title: 'Pabau Subscription',
        data: [
          {
            title: 'Billing Activity',
          },
          {
            title: 'Addons',
          },
        ],
      },
    ],
    image: clinicImage,
    expandLabel: 'Expand',
  }
  return <SetupGrid {...props} />
}

export const SetupGridMobileStory: FC = () => {
  const props = {
    title: 'Our clinic',
    subDataTitles: [
      { title: 'Business Details', data: [] },
      {
        title: 'Users',
        data: [
          {
            title: 'Users',
          },
          {
            title: 'User Groups',
          },
        ],
      },
      { title: 'Locations', data: [] },
      {
        title: 'General settings',
        data: [
          {
            title: ' Calendar Settings',
          },
          {
            title: 'Point of Sale Configuration',
          },
          {
            title: 'Loyalty',
          },
          {
            title: 'Referral Settings',
          },
        ],
      },
      { title: 'Integrations', data: [] },
      {
        title: 'Data',
        data: [
          {
            title: 'Custom Fields',
          },
          {
            title: 'Data Imports',
          },
        ],
      },
      {
        title: 'Pabau Subscription',
        data: [
          {
            title: 'Billing Activity',
          },
          {
            title: 'Addons',
          },
        ],
      },
    ],
    image: clinicImage,
    onClick: (title: string): string => {
      return title
    },
    keyValue: 'Our clinic',
  }
  return <SetupGridMobile {...props} />
}

export const GridSubMenuMobile: FC = () => {
  const props = {
    subTitleData: {
      title: 'Users',
      data: [
        {
          title: 'Users',
        },
        {
          title: 'User Groups',
        },
      ],
    },
  }
  return <SetupGridSubMenuMobile {...props} />
}

const WebinarStory = ({ ...args }) => {
  return (
    <div
      style={{
        justifyContent: 'flex-start',
        display: 'flex',
        background: '#f0f2f5',
        padding: '24px',
        height: '96vh',
      }}
    >
      <Webinar {...args} />
    </div>
  )
}

export const webinarStory = WebinarStory.bind({})

webinarStory.args = {
  title: 'Stock Management',
  name: 'Alexander Turner',
  time: 'Tuesday, 15 10:00 AM',
  timeLeft: '18:28',
  backgroundImage,
  isJoin: true,
}

const searchInputStory = ({ ...args }) => <SetupSearchInput {...args} />

export const setupSearchInput = searchInputStory.bind({})

setupSearchInput.args = {
  onChange: (searchTerm: string): string => {
    return searchTerm
  },
}

const emptySearchResultsStory = () => <SetupEmptySearch />

export const SetupEmptySearchResults = emptySearchResultsStory.bind({})
