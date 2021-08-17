import React, { FC, useEffect, useState } from 'react'
import CircleGraph, { ChartData } from './CircleGraph'
import { chartData } from './mock'
export default {
  component: CircleGraph,
  title: 'Charts/CircleGraph',
  args: {
    chartData,
  },
  argTypes: {
    chartData: { control: { type: 'object' } },
  },
}

interface ICircleGraph {
  chartData: ChartData[]
}

const CircleGraphStory: FC<ICircleGraph> = ({ chartData }) => {
  const [mainFields, setMainFields] = useState<ChartData[]>([])

  useEffect(() => {
    if (chartData) {
      setMainFields([...chartData])
    }
  }, [chartData])
  return <CircleGraph chartData={mainFields} />
}

export const KPIExlorer = CircleGraphStory.bind({})
