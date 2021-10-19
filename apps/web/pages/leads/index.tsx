import { Card } from 'antd'
import React from 'react'
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
        <Card>
          <div className={styles.naveWrapper}>
            <div className={styles.leadsCount}>
              <h4>{`Leads`}</h4>
              <div className={styles.tickerCount}>{`44`}</div>
            </div>
            <div>
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
