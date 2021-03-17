import { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'

export interface LoginProps {
  user: number
  company: number
}

export default function useLogin(registered = false): [LoginProps, boolean] {
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
        user: token.user,
        company: token.company,
      } as LoginProps
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUser = decode(localStorage.getItem('token'))
      console.log(currentUser)
      if (currentUser) {
        authenticate(true)
        setUser(currentUser)
      }
    }
  }, [authenticated, user])

  return [user, authenticated ?? false]
}
