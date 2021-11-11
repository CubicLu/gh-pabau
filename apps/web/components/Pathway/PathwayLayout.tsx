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
  const [saveStepMutation] = useSaveStepMutation()

  const [step, setStep] = useState(0)
  const [stepState, setStepState] = useState<any>({
    contact_id: journey[0].contact_id,
  })

  const { query } = useUser()
  // useEffect(() => {
  //   const f = async () => {
  //     const ret = {}
  //     for (const [name, step] of Object.entries(steps)) {
  //       if (!('load' in step)) continue
  //       console.log('ABOUT TO FETCH STEP DATA')
  //       const result = await step.load({ query }, stepState)
  //       ret[name] = result.data.details
  //       console.log('GOT STEP DATA!!', result)
  //     }
  //     setStepState((e) => ({ ...e, ...ret }))
  //   }
  //   f()
  // }, [journey])

  const customerFirstStep = prependScreens.length
  const isCustomerOnFirstStep = step === customerFirstStep

  const submitCallback = async (data) => {
    if ('id' in currentStep) {
      await saveStepMutation({
        variables: {
          clientId: journey[0].contact_id,
          journeyId: journey[0].id,
          recordId: currentStep.name === 'questionnaire' ? data.id : 0,
          status: Cp_Steps_Taken_Status.Completed,
          stepId: currentStep.id,
        },
        onError: () => console.log('Error saving step (onError)!'),
      }).catch((error) => console.log('Error saving step (catch)', error))
      // if (errors) {
      //   console.log('Error saving step (errors)!', errors)
      // }
    }
    setStepState((e) => ({ ...e, [currentStep.name]: data }))
    setStep((e) => e + 1)
  }

  const { currentStep, currentScreenNumber, totalScreens } = useMemo(() => {
    const isInPrepended = () => step < prependScreens.length
    const currentScreenNumber =
      (isInPrepended() ? step : step - prependScreens.length) + 1
    const totalScreens = isInPrepended()
      ? prependScreens.length
      : journey?.[0]?.Pathway.steps.length
    return {
      currentStep: !isInPrepended()
        ? { ...journey[0].Pathway.steps[step - prependScreens.length] } //TODO: unspread this (shows a weird TS error)
        : { name: prependScreens[step] },
      currentScreenNumber,
      totalScreens,
    }
  }, [journey, step])

  const Hydrated = steps[currentStep.name]
  const HydratedJsx = <Hydrated onSubmit={submitCallback} data={stepState} />

  // if (saveStepMutationError)
  //   return <div>ERROR SAVING STEP: {JSON.stringify(saveStepMutationError)}</div>

  const loadData = useCallback(async () => {
    console.log('loadDAta!')
    if (!Hydrated.loadData) {
      console.log('none found')
      return
    }
    return query({
      query: Hydrated.loadData.document,
      variables: Hydrated.loadData.variables(stepState),
    })
  }, [query, stepState, Hydrated])

  useEffect(() => {
    const f = async () => {
      if (!loadData) return
      const data = await loadData?.()
      console.log('GOT STEP DATA', data)
      if (!data) return
      console.log('FIRST KEY', Object.keys(data)[0])
      console.log('FIRST KEY', Object.keys(data.data)[0])
      const data2 =
        Object.keys(data.data).length === 1
          ? data.data[Object.keys(data.data)[0]]
          : data.data
      console.log('Layout got step data', data2)
      setStepState((e) => ({
        ...e,
        [currentStep.name]: data2,
      }))
    }
    f()
  }, [loadData, currentStep, journey, step])

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
            isCustomerOnFirstStep || journey?.[0]?.Pathway.steps.length <= step
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
