import { Button } from '@pabau/ui'
import { Pathway } from '../../pages/pathway/[pathway-id]/execute/[client-id]'
import { ConsentForms } from './Steps/ConsentForms'
import * as React from 'react'
import { useMemo, useState } from 'react'
import { LockScreen } from './LockScreen'
import { CheckDetails } from './Steps/CheckDetails'
import { PhotosStep } from './Steps/Photos'
import { TreatmentFormStep } from './Steps/TreatmentForm'
import { FinishScreen } from './FinishScreen'
import { useRouter } from 'next/router'
import { useUser } from '../../context/UserContext'
import MedicalHistory from '../ClientCard/dashboard/MedicalHistory'
import { MedicalHistoryStep } from './Steps/MedicalHistory'

interface P {
  client: any //TODO: set this to the graphql type
  pathway: Pathway
}

/**
 * Here we map the names to the component
 */
const hydratables: Record<string, ({ onSubmit, data }: any) => JSX.Element> = {
  'check-details': CheckDetails,
  'consent-forms': ConsentForms,
  'medical-history': MedicalHistoryStep,
  photos: PhotosStep,
  'treament-form': TreatmentFormStep,
} as const

export const PathwayLayout: React.FC<P> = ({ children, client, pathway }) => {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [stepState, setStepState] = useState<any>({})

  let customerFirstStep = 0
  let lockWasFound = false
  // eslint-disable-next-line unicorn/no-array-for-each
  pathway.steps.forEach((pathway, i) => {
    if ('lock' in pathway) {
      if (lockWasFound) {
        console.error(
          'Multiple lock screens were found - this is not supported'
        )
      }
      customerFirstStep = i + 1
      lockWasFound = true
    }
  })

  //TODO @@@
  if (!lockWasFound) {
    console.warn('No lock screen was found - this is not a supported scenario')
  }

  const isCustomerOnFirstStep = step === customerFirstStep

  const submitCallback = (data) => {
    setStep((e) => e + 1)
    setStepState((e) => ({ ...e, ...data }))
  }

  const HydratedScreen = useMemo(() => {
    const currentStep = pathway.steps[step]
    if (!currentStep) return FinishScreen
    if ('lock' in currentStep && currentStep.lock === true) {
      return LockScreen
    }
    if (!('lock' in currentStep)) {
      if (!(currentStep.name in hydratables)) throw new Error('step not found')
      return hydratables[currentStep.name]
    }
  }, [pathway.steps, step])

  const { me } = useUser()

  return (
    <div
      style={{
        border: '1px solid green',
        margin: '1em',
        padding: '1em',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr 1fr',
      }}
    >
      <div
        style={{
          border: '1px solid green',
          margin: '1em',
        }}
      >
        <Button
          onClick={() =>
            step === 0 ? window.history.back() : setStep((e) => e - 1)
          }
          disabled={isCustomerOnFirstStep || pathway.steps.length <= step}
        >
          &lt;
        </Button>
        <p>
          Current step: {step + 1} - {JSON.stringify(pathway.steps[step])}
        </p>
        <p>
          pathway_id={router.query['pathway-id']}
          client_id={router.query['client-id']}
          logged_in_id={me.user}
        </p>
      </div>
      <div
        style={{
          border: '1px solid green',
          margin: '1em',
        }}
      >
        <HydratedScreen onSubmit={submitCallback} data={stepState} />
      </div>
    </div>
  )
}
