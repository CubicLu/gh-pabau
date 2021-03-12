import React, { FC, useState, useEffect, useContext } from 'react'
import { HistoryContext, HValidation } from '../context/HistoryContext'
import { useRouter } from 'next/router'

export const HistoryWrapper: FC = ({ children }) => {
  const { asPath, push, pathname } = useRouter()
  const [history, setHistory] = useState<string[]>([])

  function back() {
    for (let i = history.length - 2; i >= 0; i--) {
      const route = history[i]
      if (!route.includes('#') && route !== pathname) {
        push(route)
        const newHistory = history.slice(0, i)
        setHistory(newHistory)
        break
      }
    }
  }

  useEffect(() => {
    setHistory((previous) => [...previous, asPath])
  }, [asPath])

  return (
    <HistoryContext.Provider
      value={{
        back,
        history,
        setHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  )
}

export function useHistory(): HValidation {
  const context = useContext(HistoryContext)
  return context
}
