import React, { FC } from 'react'
import ClientPackagesLayout, {
  ClientPackagesLayoutProps,
} from './ClientPackagesLayout'
import { clientPackages } from './mock'

export default {
  component: ClientPackagesLayout,
  title: 'UI/ClientPackagesLayout',
  args: {},
  argTypes: {},
}

const ClientPackagesLayoutStory: FC<ClientPackagesLayoutProps> = ({
  ...args
}) => {
  return <ClientPackagesLayout {...args} />
}

export const Basic = ClientPackagesLayoutStory.bind({})
Basic.args = {
  items: clientPackages,
}
