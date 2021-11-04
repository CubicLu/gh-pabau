import React from 'react'
import { useRouter } from 'next/router'
import { PathwayLayout } from '../../../components/Pathway/PathwayLayout'
import { useGetJourneyQuery } from '@pabau/graphql'

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
  const { data, loading, error } = useGetJourneyQuery({
    variables: {
      journey_id: Number.parseInt(router.query['journey-id']?.toString()),
    },
    skip: !router.query['journey-id'],
  })

  //if (loading || !data || !data.Journey) return <>LOADING</>
  if (error)
    return (
      <>
        ERROR: <pre>{error.message}</pre>
      </>
    )
  if (loading) return <>LOADING</>
  if (!data) return <>NO DATA</>
  if (!data.Journey) return <>BAD DATA 1</>
  if (data.Journey.length === 0) return <>BAD DATA 2</>

  return <PathwayLayout journey={data.Journey} />
}

export default PathwayPage
