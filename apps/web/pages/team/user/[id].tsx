import { useRouter } from 'next/router'
import React from 'react'
import Index from '../../../components/team/User/Index'

/* eslint-disable-next-line */
export interface IdProps {}

export function UserStaffId(props: IdProps) {
  const router = useRouter()
  const findID = +router.query.id
  return (
    <div>
      <Index id={String(findID)} name={'Joseph Howard'} />
    </div>
  )
}

export default UserStaffId
