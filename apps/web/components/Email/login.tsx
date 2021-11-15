import dynamic from 'next/dynamic'
import { FC } from 'react'

export interface P {
  handleGoogleLogin?: () => void
}
const Login = dynamic(() => import('./loginDynamic'), {
  ssr: false,
})
const Index: FC<P> = ({ handleGoogleLogin }) => {
  return <Login handleGoogleLogin={handleGoogleLogin} />
}
export default Index
