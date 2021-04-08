import React from 'react'
import Layout from '../../components/Layout/Layout'
import './clients.module.less'

/* eslint-disable-next-line */
export interface ClientProps {}

export function Client(props: ClientProps) {
  return (
    <div>
      <Layout active={'clients'}>
        <h1>Single client page</h1>
      </Layout>
    </div>
  )
}

export default Client
