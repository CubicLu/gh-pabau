import { render } from '@testing-library/react'
import React from 'react'
import RenderHtml from './RenderHtml'

describe('RenderHtml', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RenderHtml __html={''} />)
    expect(baseElement).toBeTruthy()
  })
})
