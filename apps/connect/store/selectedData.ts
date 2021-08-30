import { useState, useEffect } from 'react'
import { BookingData } from '../types/booking'

let globalState: BookingData = {
  services: [],
  serviceID: null,
  categoryID: null,
  masterCategoryID: null,
  employeeID: null,
  staffID: null,
  location: null,
  peopleCount: 1,
}

let listeners = []
const actions = {
  SET_SELECTED_SERVICES: (curState, newServices) => {
    return {
      services: newServices,
    }
  },
  SET_CATEGORY_ID: (curState, categoryID) => {
    return { categoryID: categoryID }
  },
  SET_MASTER_CATEGORY_ID: (curState, masterCategoryID) => {
    return { masterCategoryID: masterCategoryID }
  },
  SET_LOCATION: (curState, location) => {
    return { location: location }
  },
  SET_PEOPLE_COUNT: (curState, peopleCount) => {
    return { peopleCount: peopleCount }
  },
}

export const useSelectedDataStore = (shouldListen = true) => {
  const setState = useState(globalState)[1]

  const dispatch = (actionIdentifier, payload): void => {
    const newState = actions[actionIdentifier](globalState, payload)
    globalState = { ...globalState, ...newState }

    for (const listener of listeners) {
      listener(globalState)
    }
  }

  useEffect(() => {
    if (shouldListen) {
      listeners.push(setState)
    }

    return () => {
      if (shouldListen) {
        listeners = listeners.filter((li) => li !== setState)
      }
    }
  }, [setState, shouldListen])

  return [globalState, dispatch]
}
