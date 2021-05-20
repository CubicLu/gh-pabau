import { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'

export interface LoginProps {
  user: number
  company: number
  admin: boolean
}

export default function useLogin(registered = false): [boolean, LoginProps] {
  const [authenticated, authenticate] = useState<boolean>(registered)
  const [user, setUser] = useState<LoginProps | null>(null)

  const decode: (encodedToken: string) => LoginProps | void = (
    encodedToken: string
  ) => {
    try {
      const token = jwt.decode(encodedToken, {
        complete: true,
        json: true,
      })
      return {
        user: token?.payload?.user,
        company: token?.payload?.company,
        admin: token?.payload?.admin,
      } as LoginProps
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUser = decode(localStorage.getItem('token'))
      if (currentUser) {
        authenticate(true)
        setUser(currentUser)
      }
    }
  }, [authenticated])

  return [authenticated ?? false, user]
}
