import React, { FC, useContext } from 'react'
// import { version } from '../../../package.json'
// import CommonHeader from '../components/CommonHeader'
import Dashboard from './dashboard'
// import Layout from '../components/Layout/Layout'
import { UserContext } from '../context/UserContext'
import Login from './login'

const Index: FC = () => {
  const user = useContext(UserContext)

  return user ? <Dashboard /> : <Login />
}

export default Index
