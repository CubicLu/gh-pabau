import { Result } from 'antd'

const Logout = () => {
  localStorage.clear()
  return (
    <div>
      <Result title="Securely logging you out!" />,
    </div>
  )
}

export default Logout
