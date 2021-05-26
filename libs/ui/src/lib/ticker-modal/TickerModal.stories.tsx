/* eslint-disable */
import React from 'react'

import TickerModal from './TickerModal'
import Slide1 from './images/1.png'
import Slide2 from './images/2.png'
import Slide3 from './images/3.png'

export default {
  component: TickerModal,
  title: 'Ticker Modal',
  args: {
    show: true,
    title: 'Welcome to Pabau Connect! Take a quick tour of the features.',
    selectedItem: 0,
    slides: [
        {
          id: 1,
          title: 'Book Appointment',
          description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
          image: Slide1,
        },
        {
          id: 2,
          title: 'View Medical Documents',
          description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
          image: Slide2,
        },
        {
          id: 3,
          title: 'Check your Appointment Details',
          description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
          image: Slide3,
        },
      ]
  },
  onChange: { action: 'onChange' },
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const BackgroundStory = ({ ...args }) => <TickerModal {...args} />

export const BackgroundColour = BackgroundStory.bind({})
