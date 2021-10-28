import React, { FC } from 'react'
import Layout from '../../../components/Layout/Layout'
import styles from './index.module.less'

export interface P {
  tableName?: string
}

export const Index: FC<P> = ({ ...props }) => {
  return (
    <div className={styles.setupDragsContainer}>
      <Layout>
        <h1>Gmail</h1>
      </Layout>
    </div>
  )
}

export default Index
