import Layout from '../../components/Layout/Layout'
import React, { FC } from 'react'
import { useRouter } from 'next/router'

const PathwayTakenId: FC = () => {
  const router = useRouter()
  const pathway_taken_id = Number(router.query['pathway-taken-id'])
  return (
    <div>
      <Layout>
        <h1>{`User has checked-in with pathway taken id = ${pathway_taken_id}`}</h1>
      </Layout>
    </div>
  )
}

export default PathwayTakenId
