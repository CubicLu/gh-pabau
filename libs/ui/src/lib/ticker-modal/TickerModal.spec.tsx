import { render } from '@testing-library/react'
import React from 'react'
import TickerModal from './TickerModal'

describe('TickerModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TickerModal
        show={true}
        title={'title'}
        selectedItem={0}
        slides={[
          {
            id: 1,
            title: 'Book Appointment',
            description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
          },
          {
            id: 2,
            title: 'View Medical Documents',
            description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
          },
          {
            id: 3,
            title: 'Check your Appointment Details',
            description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
          },
        ]}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
