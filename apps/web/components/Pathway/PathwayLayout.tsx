import * as React from 'react'
import { Button } from '@pabau/ui'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FinishScreen } from './FinishScreen'
import { HandToPatientSplash } from './HandToPatientSplash'
import {
  Cp_Steps_Taken_Status,
  GetJourneyQueryResult,
  useSaveStepMutation,
} from '@pabau/graphql'
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
  const { query } = useUser() //get the apollo client
  const [saveStepMutation] = useSaveStepMutation() //upon completion of each step, we fire this

  const [step, setStep] = useState(0)

  // Add any 'global' variables we need during steps here
  const [stepState, setStepState] = useState<any>({
    contact_id: journey.contact_id,
  })

  const customerFirstStep = prependScreens.length
  const isCustomerOnFirstStep = step === customerFirstStep

  const { currentStep, currentScreenNumber, totalScreens } = useMemo(() => {
    const isInPrepended = () => step < prependScreens.length
    const currentScreenNumber =
      (isInPrepended() ? step : step - prependScreens.length) + 1
    const totalScreens = isInPrepended()
      ? prependScreens.length
      : journey?.Pathway.steps.length
    return {
      currentStep: !isInPrepended()
        ? { ...journey.Pathway.steps[step - prependScreens.length] } //TODO: unspread this (shows a weird TS error)
        : { name: prependScreens[step] },
      currentScreenNumber,
      totalScreens,
    }
  }, [journey, step])

  const submitCallback = useCallback(
    async (data) => {
      if ('id' in currentStep) {
        await saveStepMutation({
          variables: {
            clientId: journey.contact_id,
            journeyId: journey.id,
            recordId: currentStep.name === 'questionnaire' ? data.id : 0,
            status: Cp_Steps_Taken_Status.Completed,
            stepId: currentStep.id,
          },
          onError: () => console.log('Error saving step (onError)!'),
        }).catch((error) => console.log('Error saving step (catch)', error))
      }
      setStepState((e) => ({ ...e, [currentStep.name]: data }))
      setStep((e) => e + 1)
    },
    [currentStep, journey, saveStepMutation]
  )

  useEffect(() => {
    const f = async () => {
      const currentStepObject = steps[currentStep.name]
      if (!('loadData' in currentStepObject)) return //loadData on a step is actually optional
      const data = await query({
        query: currentStepObject.loadData.document,
        variables: currentStepObject.loadData.variables(stepState),
      })
      if (!data) return
      const data2 =
        Object.keys(data.data).length === 1
          ? data.data[Object.keys(data.data)[0]]
          : data.data
      setStepState((e) => ({
        ...e,
        [currentStep.name]: data2,
      }))
    }
    f()

    // The following line should be fixed, but I'm not sure how.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, currentStep])

  const Hydrated = steps[currentStep.name]
  const HydratedJsx = <Hydrated onSubmit={submitCallback} data={stepState} />

  if (!currentStep || !('name' in currentStep)) return <FinishScreen />
  if (!(currentStep.name in steps))
    return <div>ERROR: Step &quot;{currentStep.name}&quot; not found</div>

  return (
    <div
      style={{
        border: '1px solid green',
        margin: '1em',
        padding: '1em',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto 1fr',
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
            isCustomerOnFirstStep || journey?.Pathway.steps.length <= step
          }
        >
          &lt;
        </Button>
        <p>Current step: {`${currentScreenNumber} of ${totalScreens}`}</p>
        <p>Is For Customer Eyes: {`${!(step < prependScreens.length)}`}</p>
      </div>
      <div
        style={{
          border: '1px solid green',
          margin: '1em',
        }}
      >
        {step === prependScreens.length ? (
          <HandToPatientSplash>{HydratedJsx}</HandToPatientSplash>
        ) : (
          HydratedJsx
        )}
      </div>
    </div>
  )
}
