import React from 'react'
import { useRouter } from 'next/router'
import { PathwayLayout } from '../../../../components/Pathway/PathwayLayout'
import { DemoStep } from '../../../../components/Pathway/Steps/DemoStep'

export interface PathwayStep {
  name: string
  // children: React.ReactNode
}

export interface Pathway {
  name: string
  doctorSteps: PathwayStep[]
  patientSteps?: PathwayStep[]
}

const Appointments = () => {
  const router = useRouter()

  //TODO: replace this with a useQuery hook to get the real data:
  const { data }: { data: { getPathway: Pathway } } = {
    data: {
      getPathway: {
        name: 'Standard',
        doctorSteps: [
          {
            name: 'demo',
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
