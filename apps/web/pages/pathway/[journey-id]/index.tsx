import React from 'react'
import { useRouter } from 'next/router'
import { PathwayLayout } from '../../../components/Pathway/PathwayLayout'
import { useGetPathwayQuery } from '@pabau/graphql'

// type PathwayStep = {
//   name: string
//   data?: Record<string, any>
// }

// export interface Pathway {
//   name: string
//   Steps: PathwayStep[]
// }

const PathwayPage = () => {
  const router = useRouter()
  const { data, loading } = useGetPathwayQuery({
    variables: {
      pathway_id: Number.parseInt(router.query['journey-id']?.toString()),
    },
    skip: !router.query['journey-id'],
  })

  if (loading || !data || !data.Pathway) return <>LOADING</>

  return <PathwayLayout pathway={data.Pathway} />
}

export default PathwayPage
