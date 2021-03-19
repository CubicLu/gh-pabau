import { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useCookies } from 'react-cookie'

export interface LoginProps {
  user: number
  company: number
}

export default function useLogin(registered = false): [boolean, LoginProps] {
  const [cookie] = useCookies(['user'])
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
    if ({}.propertyIsEnumerable.call(cookie, 'user')) {
      const currentUser = decode(cookie.user)
      if (currentUser) {
        authenticate(true)
        setUser(currentUser)
      }
    }
  }, [authenticated, cookie])

  return [authenticated ?? false, user]
}
