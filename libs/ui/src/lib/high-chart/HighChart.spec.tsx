import React from 'react'
import { render } from '@testing-library/react'

import HighChart from './HighChart'

describe('HighChart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <HighChart
        ChartTitle={'Example title'}
        ClicksColor={'red'}
        ClicksLabel={'example label'}
        OpensColor={'blue'}
        OpensLabel={'example open label'}
        seriesData1={[1, 2, 3, 4]}
        seriesData2={[1, 2, 3, 4]}
        xAxisCategories={['category 1', 'category 2']}
        yAxisCategories={['category Y', 'category Z']}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
