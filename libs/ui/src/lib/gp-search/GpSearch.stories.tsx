import React, { FC, useState } from 'react'
import GpSearch from './GpSearch'
import { LocationDetails } from './GpSearch'

interface GpSearchProps {
  apiKey: string
}

export default {
  component: GpSearch,
  title: 'UI/Gp Search',
  args: {
    apiKey: 'AIzaSyC43U2-wqXxYEk1RBrTLdkYt3aDoOxO4Fw',
  },
}

export const GpSearchStory: FC<GpSearchProps> = ({ apiKey }) => {
  const defaultLocationDetail = {
    apt: '',
    postcode: '',
    position: {
      lat: 33.5181342,
      lng: -86.81952369999999,
    },
    address: '',
    city: 'South Yorkshire',
    region: 'England, South Yorkshire',
    country: 'United Kingdom',
    location: 'London Road',
  }
  const [locationDetail, setLocationDetail] = useState<LocationDetails>(
    defaultLocationDetail
  )

  return (
    <GpSearch
      apiKey={apiKey}
      locationDetail={locationDetail}
      setLocationDetail={setLocationDetail}
    />
  )
}
