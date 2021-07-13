import React from 'react'
import { render } from '@testing-library/react'
import AddPeopleModal from './AddPeopleModal'
import { staff } from '../../mocks/chat'

describe('AddPeopleModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AddPeopleModal isAddModalVisible={true} members={staff} />
    )
    expect(baseElement).toBeTruthy()
  })
})
