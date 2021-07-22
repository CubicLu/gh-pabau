import React, { FC, useEffect, useState } from 'react'
import MedicalFilter, { MedicalFilterType } from './MedicalFilter'

export default {
  title: 'UI/MedicalFilter',
  argTypes: {
    language: {
      control: {
        type: 'select',
        options: [
          'English (UK)',
          'English (US)',
          'French',
          'Spanish',
          'Arabic',
          'Bulgarian',
          'Czech',
          'Danish',
          'Hungarian',
          'Latvian',
          'Norwegian',
          'Polish',
          'Spannish',
          'Swedish',
          'Romanian',
          'Russian',
        ],
      },
    },
    status: {
      control: {
        type: 'select',
        options: ['active', 'inactive', 'require_setup'],
      },
    },
    medicalHistory: {
      control: { type: 'boolean' },
    },
    consent: {
      control: { type: 'boolean' },
    },
    treatment: {
      control: { type: 'boolean' },
    },
    epaper: {
      control: { type: 'boolean' },
    },
    prescription: {
      control: { type: 'boolean' },
    },
    lab: {
      control: { type: 'boolean' },
    },
  },
}

const defaultFilter = {
  language: 'English (UK)',
  status: 'require_setup',
  medicalHistory: false,
  consent: false,
  treatment: false,
  epaper: false,
  prescription: false,
  lab: false,
}

interface MedicalFilterStoryProps {
  language: 'English (UK)'
  status: 'active' | 'inactive' | 'require_setup'
  medicalHistory: boolean
  consent: boolean
  treatment: boolean
  epaper: boolean
  prescription: boolean
  lab: boolean
}

const MedicalFilterStory: FC<MedicalFilterStoryProps> = (props) => {
  const {
    language,
    status,
    medicalHistory,
    consent,
    treatment,
    epaper,
    prescription,
    lab,
  } = props
  const [filter, setFilter] = useState<MedicalFilterType>({
    language,
    status,
    formtype: {
      medicalHistory,
      consent,
      treatment,
      epaper,
      prescription,
      lab,
    },
  })
  useEffect(() => {
    const tempFilter: MedicalFilterType = {
      language,
      status,
      formtype: {
        medicalHistory,
        consent,
        treatment,
        epaper,
        prescription,
        lab,
      },
    }
    setFilter(tempFilter)
  }, [
    language,
    status,
    medicalHistory,
    consent,
    treatment,
    epaper,
    prescription,
    lab,
  ])
  return (
    <MedicalFilter filter={filter} onApply={(filter) => console.log(filter)} />
  )
}

export const Basic = MedicalFilterStory.bind({})
Basic.args = { ...defaultFilter }
