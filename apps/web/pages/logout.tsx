import { Result } from 'antd'
import { useRouter } from 'next/router'

const Logout = () => {
  localStorage.clear()
  const router = useRouter()
  router.push('/login')
  return (
    <div>
      <Result title="Securely logging you out!" />,
    </div>
  )
}

export default Logout
