import React, { FC } from 'react'
import { CreateProduct, CreateProductProps } from './CreateProduct'

export default {
  title: 'Modals/CreateProduct',
  component: CreateProduct,
  args: {},
  argTypes: {
    actions: { argTypesRegex: '^on[A-Z].*' },
  },
}

const CreateProductStory: FC<CreateProductProps> = ({ ...args }) => {
  return <CreateProduct {...args} />
}

export const Default = CreateProductStory.bind({})
Default.args = {
  plotColors: [],
  incrementDefaults: [],
  locations: ['London', 'Sheffield', 'Birmingham'],
  supplierNames: [],
  categories: [],
  taxNames: [],
  visible: false,
  onClose: () => {
    return
  },
}
