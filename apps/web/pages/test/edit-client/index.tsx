import React, { useState } from 'react'
import LayoutComponent from '../../../components/Layout/Layout'
import { Input, Button, Card } from 'antd'
import ClientCreate from '../../../components/Clients/ClientCreate'

const EditClient = () => {
  const [id, setId] = useState('')
  const [createClientModalVisible, setCreateClientModalVisible] = useState(
    false
  )

  const handleChange = (e) => {
    const { value } = e.target
    setId(value)
  }

  const handleEdit = () => {
    if (id) {
      setCreateClientModalVisible(true)
    }
  }

  const handleSubmit = () => {
    setCreateClientModalVisible(false)
    setId('')
  }

  return (
    <LayoutComponent isDisplayingFooter={false}>
      <Card title="Edit Client">
        <Input
          value={id}
          onChange={handleChange}
          placeholder="Enter contact id"
          style={{ width: '200px', marginRight: '20px' }}
        />
        <Button type="primary" onClick={handleEdit}>
          Edit
        </Button>
      </Card>
      {createClientModalVisible && (
        <ClientCreate
          modalVisible={createClientModalVisible}
          handleClose={() => {
            setCreateClientModalVisible(false)
          }}
          isEdit={createClientModalVisible}
          handleSubmit={handleSubmit}
          contactId={Number.parseInt(id)}
        />
      )}
    </LayoutComponent>
  )
}

export default EditClient
