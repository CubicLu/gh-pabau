import React from 'react'
import { render } from '@testing-library/react'

import WebinarModal, { WebinarModalProps } from './WebinarModal'
const props: WebinarModalProps = {
  buttonType: 'join',
  course_id: 121,
  description: 'description',
  duration: 20,
  id: 23432,
  name: 'name',
  time: '',
  title: 'title',
  webinar_id: 2321,
}
describe('WebinarModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebinarModal {...props} />)
    expect(baseElement).toBeTruthy()
  })
})
