import React, { useState } from 'react'
import AddAddress from './AddAddress'
import { Button } from '@pabau/ui'

export default {
  component: AddAddress,
  title: 'UI/AddAddress',
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const AddAddressStory = ({ title }) => {
  const [visible, setVisible] = useState(false)
  return (
    <div style={{ height: '100vh', width: '100vw', backgroundColor: '#fff' }}>
      <Button type="primary" onClick={() => setVisible(true)}>
        Add Address
      </Button>
      <AddAddress
        visible={visible}
        title={title}
        onClose={() => setVisible(false)}
        values={{
          street: '',
          city: '',
          county: '',
          postCode: '',
          country: '',
        }}
      />
    </div>
  )
}

export const Address = AddAddressStory.bind({})
Address.args = {
  title: 'Add Address',
}
