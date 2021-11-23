import { Button } from '@pabau/ui'
import { useRouter } from 'next/router'

interface P {
  data?: Record<string, any>
}

export const FinishScreen = ({ data }: P) => {
  const router = useRouter()
  return (
    <>
      <h2>Thank you! We&quot;re all done</h2>
      <h3>{JSON.stringify(data)}</h3>

      <Button onClick={() => router.push('/')}>BACK</Button>
    </>
  )
}
