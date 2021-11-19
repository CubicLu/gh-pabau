import { FC, useState } from 'react'
import { useTimeout } from 'react-use'
import { Button } from '@pabau/ui'

export const HandToPatientSplash: FC = ({ children }) => {
  const [isReady] = useTimeout(5000)
  const [skipped, setSkipped] = useState(false)
  return skipped || isReady() ? (
    <div>{children}</div>
  ) : (
    <>
      <h2 style={{ color: 'red' }}>Hand to customer now</h2>
      <Button onClick={() => setSkipped(true)}>Skip</Button>
    </>
  )
}
