import React from 'react'
import { render } from '@testing-library/react'

import { ConfirmationDialog } from './ConfirmationDialog'

describe('ConfirmationDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ConfirmationDialog
        title={'Delete record'}
        tooltip={'This action is irreversable'}
        visible={true}
        onClose={() => console.log('u clicked cancel')}
        onSubmit={() => console.log('u clicked submit')}
      >
        {'Are u sure u want to remove this record?'}
      </ConfirmationDialog>
    )
    expect(baseElement).toBeTruthy()
  })
})
