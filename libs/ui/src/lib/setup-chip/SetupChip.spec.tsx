import React from 'react'
import { render } from '@testing-library/react'
import { EditOutlined } from '@ant-design/icons'
import SetupChip, { SetupChipProps } from './SetupChip'

describe('SetupChip', () => {
  it('should render successfully', () => {
    const props: SetupChipProps = {
      title: 'title',
      subTitle: 'subTitle',
      count: '0',
      image: <EditOutlined />,
      onClick: () => {
        return true
      },
    }
    const { baseElement } = render(<SetupChip {...props} />)
    expect(baseElement).toBeTruthy()
  })
})
