import React from 'react'
import { Card } from 'antd'
import Layout from '../../components/Layout/Layout'
import LeadsNavigationComponent from '../../components/Leads/LeadsNavigationComponent'
import LeadsStagesComponent from '../../components/Leads/LeadsStages/LeadsStagesComponent'
import styles from './leads.module.less'

/* eslint-disable-next-line */
export interface IndexProps {}

export function Index(props: IndexProps) {
  return (
    <div className={styles.leadStatusRoot}>
      <Layout>
        <Card className={styles.card}>
          <div className={styles.naveWrapper}>
            <div className={styles.leadsNavigation}>
              <LeadsNavigationComponent />
            </div>
          </div>
          <LeadsStagesComponent />
        </Card>
      </Layout>
    </div>
  )
}

export default Index
