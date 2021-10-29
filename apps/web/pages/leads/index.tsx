import React, { useState, useEffect } from 'react'
import { Card } from 'antd'
import Layout from '../../components/Layout/Layout'
import LeadsNavigationComponent from '../../components/Leads/LeadsNavigationComponent'
import LeadsStagesComponent from '../../components/Leads/LeadsStages/LeadsStagesComponent'
import styles from './leads.module.less'
import { useGetCmLeadCountLazyQuery } from '@pabau/graphql'

/* eslint-disable-next-line */
export interface IndexProps {}

export function Index(props: IndexProps) {
  const [leadCount, setLeadCount] = useState(0)

  const [
    getCmLeadCount,
    {
      called: calledCmLeadCount,
      loading: cmLeadCountLoading,
      data: countObj,
      error: cmLeadCountError,
    },
  ] = useGetCmLeadCountLazyQuery()

  useEffect(() => {
    if (
      calledCmLeadCount &&
      !cmLeadCountLoading &&
      countObj &&
      !cmLeadCountError &&
      leadCount !== countObj.findManyCmLeadCount
    )
      setLeadCount(countObj.findManyCmLeadCount)
  }, [
    calledCmLeadCount,
    cmLeadCountLoading,
    countObj,
    cmLeadCountError,
    leadCount,
  ])

  useEffect(() => {
    const companyId = 8254
    getCmLeadCount({
      variables: {
        equals: companyId,
      },
    })
  }, [getCmLeadCount])

  return (
    <div className={styles.leadStatusRoot}>
      <Layout>
        <Card className={styles.card}>
          <div className={styles.naveWrapper}>
            <div className={styles.leadsCount}>
              <h4>{`Leads`}</h4>
              <div className={styles.tickerCount}>{leadCount}</div>
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
