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
      if (router.query.redirect as string) {
        window.location.href = router.query.redirect as string
      } else {
        window.location.href = 'https://crm.pabau.com/logged-out'
      }
      /* We only want to run this once */
    })()
  }, [resetStore, router])

  return <div></div>
}

export default Logout
