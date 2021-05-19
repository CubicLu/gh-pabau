import React from 'react'
import { render } from '@testing-library/react'

import Epaper from './Epaper'

describe('Epaper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Epaper
        title={'Example title'}
        numPages={5}
        onSetNumPages={() => {
          return true
        }}
        pageNumber={5}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
