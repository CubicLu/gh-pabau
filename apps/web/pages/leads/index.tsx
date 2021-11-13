import React, { useState, useEffect } from 'react'
import { Card } from 'antd'
import Layout from '../../components/Layout/Layout'
import LeadsNavigationComponent from '../../components/Leads/LeadsNavigationComponent'
import LeadsStagesComponent from '../../components/Leads/LeadsStages/LeadsStagesComponent'
import { useGetFirstPipelineLazyQuery } from '@pabau/graphql'
import styles from './leads.module.less'

/* eslint-disable-next-line */
export interface IndexProps {}

export function Index(props: IndexProps) {
  const [defaultPipelineId, setDefaultPipelineId] = useState(null)

  const [
    getFirstDefaultPipeline,
    {
      called: calledDefaultPipeline,
      loading: defaultPipelineLoading,
      data: defaultPipeline,
      error: defaultPipelineError,
    },
  ] = useGetFirstPipelineLazyQuery()

  useEffect(() => {
    if (!defaultPipelineId) {
      getFirstDefaultPipeline()
    }
  }, [defaultPipelineId, getFirstDefaultPipeline])

  useEffect(() => {
    if (
      calledDefaultPipeline &&
      !defaultPipelineLoading &&
      defaultPipeline &&
      !defaultPipelineError
    ) {
      const { findFirstPipeline } = defaultPipeline
      if (findFirstPipeline.id !== defaultPipelineId) {
        setDefaultPipelineId(findFirstPipeline.id)
      }
    }
  }, [
    calledDefaultPipeline,
    defaultPipelineLoading,
    defaultPipeline,
    defaultPipelineError,
    defaultPipelineId,
  ])

  return (
    <div className={styles.leadStatusRoot}>
      <Layout>
        <Card className={styles.card}>
          <div className={styles.naveWrapper}>
            <div className={styles.leadsNavigation}>
              <LeadsNavigationComponent pipelineId={defaultPipelineId} />
            </div>
          </div>
          <LeadsStagesComponent pipelineId={defaultPipelineId} />
        </Card>
      </Layout>
    </div>
  )
}

export default Index
