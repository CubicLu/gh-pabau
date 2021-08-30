import React from 'react'
import { render } from '@testing-library/react'

import ViewSchedule from './ViewSchedule'

describe('ViewSchedule', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ViewSchedule
        join={async (course_id, webinar_id, course_date) => {
          return true
        }}
        register={async (course_id, webinar_id, course_date) => {
          return true
        }}
        title=""
        visible={true}
        trainers={[]}
        discoverAndLearn={[]}
        schedule={[]}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
