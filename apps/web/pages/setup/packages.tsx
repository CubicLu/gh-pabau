import { NextPage } from 'next'
import React from 'react'
import LegacyPage from '../../components/LegacyPage'
import CommonHeader from '../../components/CommonHeader'
import useWindowSize from '../../hooks/useWindowSize'
import Layout from '../../components/Layout/Layout'

const PackagesPage: NextPage = () => {
  const size = useWindowSize()
  return (
    <Layout pageTitle={size.width > 767 && 'Packages'}>
      <CommonHeader title="Packages" />
      <LegacyPage urlPath="/index.php?p=packages&noheader&pab2" />
    </Layout>
  )
}

export default PackagesPage
