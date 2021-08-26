import React, { useContext } from 'react'
import ConnectLayout from '../../components/ConnectLayout/ConnectLayout'
import { ClientContext } from '../../components/UserContext/context/ClientContext'

export const LabHistory = () => {
  const clientContext = useContext(ClientContext)

  return (
    <ConnectLayout clientContext={clientContext}>
      <div>Lab History</div>
    </ConnectLayout>
  )
}

export default LabHistory
