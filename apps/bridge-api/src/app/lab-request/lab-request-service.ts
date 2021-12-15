export const checkAbnormalTests = (tests, labResults) => {
  const results = labResults && labResults.length > 0 ? labResults.results : []

  for (const test of tests) {
    test.abnormal = false
    for (const result of results) {
      if (result['Observation: Test Code'] === test.code) {
        const observationValue = getObservationValue(
          result['Observation Value']
        )
        const [refrenceMinValue, refrenceMaxValue] = getMinMaxReference(
          result['Reference Range']
        )

        if (
          result['Observation Value'] === 'positive' ||
          (observationValue > refrenceMaxValue &&
            result['Reference Range'] &&
            observationValue &&
            refrenceMaxValue > 0) ||
          (observationValue < refrenceMinValue &&
            result['Reference Range'] &&
            observationValue)
        ) {
          test.abnormal = true
          break
        }
      }
    }
  }
  return tests
}

const getObservationValue = (resultValue) => {
  const observation_value_arr = resultValue.split('%')
  let observation_value = observation_value_arr[0].trim()
  if (observation_value_arr[1]) {
    observation_value = observation_value_arr[1].trim()
  }

  if (resultValue.includes('<=')) {
    observation_value = Number.parseFloat(resultValue.replace('<=', '').trim())
  } else if (resultValue.includes('>=')) {
    observation_value = Number.parseFloat(resultValue.replace('>=', '').trim())
  } else if (resultValue.includes('>')) {
    observation_value =
      Number.parseFloat(resultValue.replace('>', '').trim()) + 0.1
  } else if (resultValue.includes('<')) {
    observation_value =
      Number.parseFloat(resultValue.replace('<', '').trim()) - 0.1
  }

  return observation_value
}

const getMinMaxReference = (referenceRange) => {
  const reference_arr = referenceRange.split('-')
  const reference_arr_min = reference_arr[0]
    .split('<')
    .map((elem) => Number.parseFloat(elem).toString())

  let reference_min_value = 0
  if (reference_arr[0]) reference_min_value = reference_arr[0].trim()
  if (reference_arr_min[0]) reference_min_value = reference_arr_min[0].trim()
  if (referenceRange.includes('and over')) {
    reference_min_value =
      Number.parseFloat(referenceRange.replace('and over', '').trim()) - 1
  }

  let reference_max_value = 0
  if (reference_arr[1]) reference_max_value = reference_arr[1].trim()
  if (reference_arr_min[1]) reference_max_value = reference_arr_min[1].trim()
  if (referenceRange.includes('Up to')) {
    reference_max_value =
      Number.parseFloat(referenceRange.replace('Up to', '').trim()) + 1
  }

  return [reference_min_value, reference_max_value]
}
