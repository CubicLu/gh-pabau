import React, { useContext } from 'react'
import ConnectLayout from '../../components/ConnectLayout/ConnectLayout'
import { ClientContext } from '../../components/UserContext/context/ClientContext'

export const PurchasePackage = () => {
  const clientContext = useContext(ClientContext)

  return (
    <ConnectLayout clientContext={clientContext}>
      <div>Purchase Package</div>
    </ConnectLayout>
  )
}

export default PurchasePackage
