import React from 'react'
import { render } from '@testing-library/react'

import Newsletter from './Newsletter'

describe('Newsletter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Newsletter
        OpensLabel={'Example opens label'}
        OpensColor={'red'}
        ClicksLabel={'example click label'}
        ClicksColor={'blue'}
        ChartTitle={'example chart title'}
        data={[]}
        ModalHeader={true}
        ModalTitle={'Example modal title'}
        ModalVisible={true}
        ShowSizeChanger={true}
        TableTitle={'Example table title'}
        TilesTitle={'Example tiles title'}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
