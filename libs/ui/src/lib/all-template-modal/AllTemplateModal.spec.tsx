import React from 'react'
import { render } from '@testing-library/react'

import AllTemplateModal from './AllTemplateModal'

// TODO: Can't test dynamic()
describe('AllTemplateModal', () => {
  it.skip('should render successfully', () => {
    const { baseElement } = render(
      <AllTemplateModal
        categoryOptions={[]}
        topCategories={[]}
        recipientList={[]}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
