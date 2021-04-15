import React, { FC, useContext, useState } from 'react'
import { Button } from '@pabau/ui'
import { version } from '../../../package.json'
import { useTranslationI18 } from '../hooks/useTranslationI18'
import Grid from '../components/Grid'
import Layout from '../components/Layout/Layout'
import CommonHeader from '../components/CommonHeader'
import Login from './login'
import { UserContext } from '../context/UserContext'

const Index: FC = () => {
  const { t } = useTranslationI18()
  const [showGrid, setShowGrid] = useState(false)
  const user = useContext(UserContext)

  return user ? (
    <div>
      <CommonHeader />
      <Layout pageTitle={t('common', 'index.title')} {...user}>
        {!showGrid && <Button onClick={() => setShowGrid(true)}>Edit</Button>}
        <hr />
        {showGrid && <Grid />}v{version}
      </Layout>
    </div>
  ) : (
    <Login />
  )
}

export default Index
