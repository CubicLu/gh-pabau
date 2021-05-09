import React, { FC, useContext } from 'react'
import { version } from '../../../package.json'
import CommonHeader from '../components/CommonHeader'
import Layout from '../components/Layout/Layout'
import { UserContext } from '../context/UserContext'
import { useTranslationI18 } from '../hooks/useTranslationI18'
import Login from './login'

const Index: FC = () => {
  const { t } = useTranslationI18()
  const user = useContext(UserContext)

  return user ? (
    <div>
      <CommonHeader />
      <Layout pageTitle={t('common', 'index.title')} {...user}>
        v{version}
      </Layout>
    </div>
  ) : (
    <Login />
  )
}

export default Index
