import React, { FC, useState } from 'react'
import LocationList, { LocationDataProps } from './LocationList'
import { locationData } from './mock'

export default {
  component: LocationList,
  title: 'UI/LocationList',
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    description: 'Choose the location',
    locationData,
  },
  argTypes: {
    description: { control: { type: 'text' } },
    locationData: { control: { type: 'object' } },
  },
}

interface P {
  description: string
  locationData: LocationDataProps[]
}
export const LocationStory: FC<P> = ({ description, locationData }) => {
  const [locations, setLocations] = useState<LocationDataProps[]>(locationData)
  const [selectAll, setSelectAll] = useState<boolean>(false)

  const handleLocationChange = (checked: boolean, locationKey: string) => {
    const mappedLocation = locations.map((location) => {
      if (location.key === locationKey) {
        return {
          ...location,
          checked,
        }
      }
      return location
    })
    setLocations([...mappedLocation])
    if (mappedLocation.every((loc) => loc.checked)) {
      setSelectAll(false)
    } else {
      setSelectAll(true)
    }
  }

  const onCheckAllChange = (checked: boolean) => {
    const mappedLocations = locations.map((location) => {
      return {
        ...location,
        checked,
      }
    })
    setLocations([...mappedLocations])
    setSelectAll(checked)
  }

  return (
    <LocationList
      description={description}
      locationData={locations}
      handleLocationChange={handleLocationChange}
      selectAll={selectAll}
      onCheckAllChange={onCheckAllChange}
    />
  )
}
