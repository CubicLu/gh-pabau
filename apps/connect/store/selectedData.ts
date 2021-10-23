import { useState, useEffect } from 'react'
import { BookingData } from '../types/booking'

let selectedData: BookingData = {
  services: [],
  categoryID: null,
  masterCategoryID: null,
  employee: null,
  location: null,
  peopleCount: 1,
  dateTime: null,
  totalCost: 0,
  members: [],
}

enum actionTypes {
  SET_SELECTED_SERVICES = 'SET_SELECTED_SERVICES',
  SET_MASTER_CATEGORY_ID = 'SET_MASTER_CATEGORY_ID',
  SET_CATEGORY_ID = 'SET_CATEGORY_ID',
  SET_LOCATION = 'SET_LOCATION',
  SET_PEOPLE_COUNT = 'SET_PEOPLE_COUNT',
  SET_EMPLOYEE = 'SET_EMPLOYEE',
  SET_DATETIME = 'SET_DATETIME',
  SET_TOTAL_COST = 'SET_TOTAL_COST',
  SET_MEMBERS = 'SET_MEMBERS',
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
  SET_EMPLOYEE: (curState, employee) => {
    return { employee: employee }
  },
  SET_DATETIME: (curState, dateTime) => {
    return { dateTime: dateTime }
  },
  SET_TOTAL_COST: (curState, totalCost) => {
    return { totalCost: totalCost }
  },
  SET_MEMBERS: (curState, members) => {
    return { members: members }
  },
} as const

export const useSelectedDataStore = (shouldListen = true) => {
  const setState = useState(selectedData)[1]

  const setSelectedData = (
    actionIdentifier: string,
    payload: unknown
  ): void => {
    const newState = actions[actionIdentifier](selectedData, payload)
    selectedData = { ...selectedData, ...newState }

    for (const listener of listeners) {
      listener(selectedData)
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

  return { selectedData, setSelectedData, actionTypes }
}
