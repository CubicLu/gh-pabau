import React, { useEffect, useState } from 'react'
import { useGetCompanyBySlugQuery } from '@pabau/graphql'

export const SettingsContext = React.createContext({
  company_id: 8021,
})

const SettingsProvider = (props) => {
  return (
    <SettingsContext.Provider value={{ company_id: 8021 }}>
      {props.children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider
