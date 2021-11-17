import React from 'react'
import { useRouter } from 'next/router'
import { PathwayLayout } from '../../../components/Pathway/PathwayLayout'
import { useGetJourneyQuery } from '@pabau/graphql'

const PathwayPage = () => {
  const router = useRouter()
  const { data, loading, error } = useGetJourneyQuery({
    variables: {
      journey_id: Number.parseInt(router.query['journey-id']?.toString()),
    },
    skip: !router.query['journey-id'],
  })

  if (error)
    return (
      <>
        ERROR: <pre>{error.message}</pre>
      </>
    )
  if (loading) return <>LOADING</>
  if (!data) return <>SERVER HTTP ERROR</>
  if (!data.Journey) return <>SERVER API ERROR</>
  if (data.Journey.length === 0) return <>Error: ID not found</>

  return <PathwayLayout journey={data.Journey[0]} />
}

export default PathwayPage
