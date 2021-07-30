import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const TwoFactorAuthentication = ({ children }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const redirectToAccessScreen = () => {
      const destination = window.location.pathname
      router.push('/access/' + btoa(destination))
    }

    if (localStorage?.getItem('_2fa')) {
      const _2fa = localStorage?.getItem('_2fa')
      const savedTime = Number(atob(_2fa))
      const datetime = Date.now()

      if (datetime > savedTime + 24 * 60 * 60 * 1000) {
        redirectToAccessScreen()
      } else {
        setLoading(false)
      }
    } else {
      redirectToAccessScreen()
    }
  }, [router])

  return loading ? (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spin indicator={antIcon} />
    </div>
  ) : (
    <div>{children}</div>
  )
}

export default TwoFactorAuthentication
