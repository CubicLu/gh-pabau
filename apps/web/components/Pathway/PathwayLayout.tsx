import { Button } from '@pabau/ui'
import { Consent } from './Steps/Consent'
import * as React from 'react'
import { useMemo, useState } from 'react'
import { PinScreen } from './PinScreen'
import { Details } from './Steps/Details'
import { PhotosStep } from './Steps/Photo'
import { TreatmentFormStep } from './Steps/Treatment'
import { FinishScreen } from './FinishScreen'
import { useRouter } from 'next/router'
import { useUser } from '../../context/UserContext'
import { ContractSelection } from './ContractSelection'
import { HandToPatientSplash } from './HandToPatientSplash'
import { GetPathwayQueryResult } from '@pabau/graphql'

interface P {
  client: any //TODO: set this to the graphql type
  pathway: GetPathwayQueryResult['data']['Pathway']
}

/**
 * Here we map the names to the component
 */
const hydratables: Record<string, ({ onSubmit, data }: any) => JSX.Element> = {
  details: Details,
  consent: Consent,
  // 'medical-history': MedicalHistoryStep, //TODO
  photo: PhotosStep,
  treatment: TreatmentFormStep,
  pinscreen: PinScreen,
  'contract-selection': ContractSelection,
} as const

/**
 * Place any screens that go before the main customer steps here. After these screens, a splash screen will show
 * prompting the staff user to hand control of the device to the patient. This splash isn't a discrete step as it will
 * timeout.
 */
const prependScreens = [{ name: 'contract-selection' }] as const

export const PathwayLayout = ({ pathway }: P) => {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [stepState, setStepState] = useState<any>({})

  const customerFirstStep = prependScreens.length

  const isCustomerOnFirstStep = step === customerFirstStep

  const submitCallback = (data) => {
    setStep((e) => e + 1)
    setStepState((e) => ({ ...e, ...data }))
  }

  const HydratedScreen = useMemo(() => {
    const currentStep =
      step >= prependScreens.length
        ? pathway.Steps[step - prependScreens.length]
        : prependScreens[step]
    if (!currentStep) return <FinishScreen />
    if (!(currentStep.name in hydratables)) throw new Error('step not found')
    const Hydrated = hydratables[currentStep.name]
    const HydratedJsx = <Hydrated onSubmit={submitCallback} data={stepState} />
    if (step === prependScreens.length)
      return <HandToPatientSplash>{HydratedJsx}</HandToPatientSplash>
    return HydratedJsx
  }, [pathway, step])

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
          disabled={isCustomerOnFirstStep || pathway.Steps.length <= step}
        >
          &lt;
        </Button>
        <p>
          Current step: {step + 1} - {JSON.stringify(pathway.Steps[step])}
        </p>
        <p>
          pathway_id={router.query['pathway-id']} - client_id=
          {router.query['client-id']} - logged_in_id={me.user}
        </p>
      </div>
      <div
        style={{
          border: '1px solid green',
          margin: '1em',
        }}
      >
        {HydratedScreen}
      </div>
    </div>
  )
}
