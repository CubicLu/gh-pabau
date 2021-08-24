import { NextPage } from 'next'
import React from 'react'
import LegacyPage from '../../components/LegacyPage'
import Layout from '../../components/Layout/Layout'

const PackagesPage: NextPage = () => (
  <Layout pageTitle="Packages">
    <LegacyPage urlPath="/index.php?p=packages&noheader&pab2" />
  </Layout>
)

export default PackagesPage
