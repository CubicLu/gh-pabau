import React from 'react'
import { render } from '@testing-library/react'
import AddGroupModal from './AddGroupModal'
import { staff as groupData } from '../../mocks/chat'

describe('AddGroupModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AddGroupModal groupData={groupData} isGroupModalVisible={true} />
    )
    expect(baseElement).toBeTruthy()
  })
})
