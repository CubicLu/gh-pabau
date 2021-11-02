import { Button } from '@pabau/ui'
import { useRouter } from 'next/router'

interface P {
  data?: Record<string, any>
  onSubmit(): void
}

export const ContractSelection = ({ onSubmit, data }: P) => {
  const router = useRouter()
  return (
    <>
      <h2>Select contracts to be signed here..</h2>
      <h3>{JSON.stringify(data)}</h3>

      <Button onClick={() => router.push('/')}></Button>
      <Button onClick={() => onSubmit?.()}>Next</Button>
    </>
  )
}
