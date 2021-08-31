// import React, { useEffect, useState } from 'react'
//
// export const SettingsContext = React.createContext({
//   company_id: 8021,
// })
//
// const SettingsProvider = (props) => {
//   const [settings, setSettings] = useState({})
//
//   return (
//     <SettingsContext.Provider value={{ company_id: 8021 }}>
//       {props.children}
//     </SettingsContext.Provider>
//   )
// }
//
// export default SettingsProvider
import { createContext } from 'react'
import { Settings } from '../components/SettingsContextWrapper'

export const SettingsContext = createContext<{ settings: Settings }>(null)

export const SettingsProvider = SettingsContext.Provider
export const SettingsConsumer = SettingsContext.Consumer
