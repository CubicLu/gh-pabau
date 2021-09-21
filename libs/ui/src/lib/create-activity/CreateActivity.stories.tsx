import React, { FC } from 'react'

import CreateActivityComponent, { CreateActivityProps } from './CreateActivity'

export default {
  component: CreateActivityComponent,
  title: 'UI/CreateActivity',
  args: {
    visible: true,
  },
}

export const CreateActivity: FC<CreateActivityProps> = ({ visible }) => {
  return <CreateActivityComponent visible={visible} />
}
