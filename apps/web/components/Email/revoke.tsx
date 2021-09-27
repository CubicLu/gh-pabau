import dynamic from 'next/dynamic'
import React, { FC } from 'react'

export interface P {
  email: string
  companyId: number
  userId: number
}
const Revoke = dynamic(() => import('./revokeDynamic'), {
  ssr: false,
})
const Index: FC<P> = ({ email, companyId, userId }) => {
  return <Revoke email={email} companyId={companyId} userId={userId} />
}
export default Index
