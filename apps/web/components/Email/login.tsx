import dynamic from 'next/dynamic'
import { FC } from 'react'

export interface P {
  handleGoogleLogin?: (isLogin, token) => void
  checkStatus: boolean
}
const Login = dynamic(() => import('./loginDynamic'), {
  ssr: false,
})
const Index: FC<P> = ({ handleGoogleLogin, checkStatus }) => {
  return (
    <Login handleGoogleLogin={handleGoogleLogin} checkStatus={checkStatus} />
  )
}
export default Index
