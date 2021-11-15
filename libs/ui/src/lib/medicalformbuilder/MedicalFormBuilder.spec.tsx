import { render } from '@testing-library/react'
import React from 'react'
import MedicalFormBuilder from './MedicalFormBuilder'

describe('MedicalFormBuilder', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MedicalFormBuilder
        previewData=""
        onHideFormBuilder={() => ''}
        visible={true}
        preFormName=""
        preFormType=""
        preFormServices=""
        create={true}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
