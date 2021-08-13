/*
  THIS PAGE IS FOR PABAU 1 PURPOSES ONLY
  Stan
*/

import { Result } from 'antd'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Logout = () => {
  const router = useRouter()
  useEffect(() => {
    localStorage.clear()
    if (router.query.redirect as string) {
      window.location.href = router.query.redirect as string
    } else {
      window.location.href = 'https://crm.pabau.com/'
    }
    /* We only want to run this once */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Result title="Securely logging you out!" />,
    </div>
  )
}

export default Logout
