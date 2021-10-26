import React from 'react'
import { useRouter } from 'next/router'
import { PathwayLayout } from '../../../../components/Pathway/PathwayLayout'

type PathwayStep =
  | {
      name: string
      data?: Record<string, any>
    }
  | { lock: true }

export interface Pathway {
  name: string
  steps: PathwayStep[]
}

const Appointments = () => {
  const router = useRouter()

  //TODO: replace this with a useQuery hook to get the real data:
  // The steps[].name is used in apps/web/components/Pathway/PathwayLayout.tsx
  const { data }: { data: { getPathway: Pathway } } = {
    data: {
      getPathway: {
        name: 'Standard',
        steps: [
          {
            name: 'check-details',
          },
          {
            name: 'medical-history',
          },
          {
            name: 'consent-forms',
          },
          {
            lock: true,
          },
          {
            name: 'photos',
          },
          {
            name: 'treatment-form',
          },
        ],
      },
    },
  }

  // Hydrate the data with reactnode's (or something)

  return (
    <PathwayLayout
      pathway={data.getPathway}
      client={Number(router.query['client-id'])}
    >
      SHOW STEPS HERE 1. 2. 3.
    </PathwayLayout>
  )
}

export default Appointments
