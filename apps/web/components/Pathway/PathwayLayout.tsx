import { Button } from '@pabau/ui'
import {
  Pathway,
  PathwayStep,
} from '../../pages/pathway/[pathway-id]/execute/[client-id]'
import { DemoStep } from './Steps/DemoStep'

interface P {
  client: any
  pathway: Pathway
}

const hydratables = {
  demo: () => <DemoStep />,
}

export const PathwayLayout: React.FC<P> = ({ children, client, pathway }) => {
  const hydrate = (step: PathwayStep) => {
    if (!(step.name in hydratables)) return <h2>step type not found</h2>
    return hydratables[step.name]
  }
  return (
    <div
      style={{
        border: '1px solid green',
        margin: '1em',
        padding: '1em',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr 1fr',
      }}
    >
      <div
        style={{
          border: '1px solid green',
          margin: '1em',
        }}
      >
        <Button onClick={() => alert('todo')}>&lt;</Button>
        Current step: {pathway.doctorSteps[0].name}
      </div>
      <div
        style={{
          border: '1px solid green',
          margin: '1em',
        }}
      >
        {hydrate(pathway.doctorSteps[0])}
      </div>
    </div>
  )
}
