import * as React from 'react'
import { Button } from '@pabau/ui'
import { useEffect, useMemo, useState } from 'react'
import { FinishScreen } from './FinishScreen'
import { HandToPatientSplash } from './HandToPatientSplash'
import { GetJourneyQueryResult } from '@pabau/graphql'
import { default as steps } from './Steps'
import { useUser } from '../../context/UserContext'

interface P {
  journey: GetJourneyQueryResult['data']['Journey']
}

/**
 * Place any screens that go before the main customer steps here. After these screens, a splash screen will show
 * prompting the staff user to hand control of the device to the patient. This splash isn't a discrete step as it will
 * timeout.
 */
const prependScreens = ['contract-selection'] as const

export const PathwayLayout = ({ journey }: P) => {
  const [step, setStep] = useState(0)
  const [stepState, setStepState] = useState<any>({
    contact_id: journey[0].contact_id,
  })

  const { query } = useUser()
  useEffect(() => {
    const f = async () => {
      const ret = {}
      for (const [name, step] of Object.entries(steps)) {
        if (!('load' in step)) continue
        console.log('ABOUT TO FETCH STEP DATA')
        const result = await step.load({ query }, stepState)
        ret[name] = result.data.details
        console.log('GOT STEP DATA!!', result)
      }
      setStepState((e) => ({ ...e, ...ret }))
    }
    f()
  }, [journey])

  const customerFirstStep = prependScreens.length
  const isCustomerOnFirstStep = step === customerFirstStep

  const submitCallback = (data) => {
    setStep((e) => e + 1)
    setStepState((e) => ({ ...e, ...data }))
  }

  const { hydratedScreen, currentScreenNumber, totalScreens } = useMemo(() => {
    const isInPrepended = () => step < prependScreens.length
    const currentStep = !isInPrepended()
      ? { ...journey[0].Pathway.steps[step - prependScreens.length] } //TODO: unspread this (shows a weird TS error)
      : { id: prependScreens[step], name: prependScreens[step] }
    if (!currentStep || !currentStep.id)
      return { hydratedScreen: <FinishScreen /> }
    if (!(currentStep.name in steps))
      return {
        hydratedScreen: (
          <div>ERROR: Step &quot;{currentStep.name}&quot; not found</div>
        ),
      }
    const Hydrated = steps[currentStep.name].component
    const HydratedJsx = (
      <Hydrated onSubmit={submitCallback} data={stepState[currentStep.name]} />
    )

    return {
      hydratedScreen:
        step === prependScreens.length ? (
          <HandToPatientSplash>{HydratedJsx}</HandToPatientSplash>
        ) : (
          HydratedJsx
        ),
      currentScreenNumber:
        (isInPrepended() ? step : step - prependScreens.length) + 1,
      totalScreens: isInPrepended()
        ? prependScreens.length
        : journey?.[0]?.Pathway.steps.length,
    }
  }, [journey, step, stepState])

  console.log('rendering hydrated screen', hydratedScreen)
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
          disabled={
            isCustomerOnFirstStep || journey?.[0]?.Pathway.steps.length <= step
          }
        >
          &lt;
        </Button>
        <p>Current step: {`${currentScreenNumber} of ${totalScreens}`}</p>
      </div>
      <div
        style={{
          border: '1px solid green',
          margin: '1em',
        }}
      >
        {hydratedScreen}
      </div>
    </div>
  )
}
