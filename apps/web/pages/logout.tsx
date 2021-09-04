/*
  THIS PAGE IS FOR PABAU 1 PURPOSES ONLY
  Stan
*/
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useApolloClient } from '@apollo/client'

const Logout = () => {
  const router = useRouter()
  const { resetStore } = useApolloClient()

  useEffect(() => {
    ;(async () => {
      localStorage.clear()
      await resetStore()
    })()
  }, [resetStore, router]) // We only want to run this once

  return <div>You have been logged out of Pabau2 successfully.</div>
}

export default Logout
