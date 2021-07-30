import React from 'react'
import PaymentMethods, { PaymentMethodsProps } from './PaymentMethods'

export default {
  component: PaymentMethods,
  title: 'UI/PaymentMethods',
  args: {},
  argTypes: {},
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const PaymentMethodsStory = ({ ...args }: PaymentMethodsProps) => (
  <PaymentMethods {...args} />
)

export const Basic = PaymentMethodsStory.bind({})
Basic.args = {
  methods: [],
  onChange: (methods) => {
    console.log('Payment methods >>>', methods)
  },
}
