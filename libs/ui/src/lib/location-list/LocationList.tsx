import React from 'react'
import { Checkbox, Button } from '@pabau/ui'
import styles from './LocationList.module.less'

/* eslint-disable-next-line */
export interface LocationDataProps {
  key: string
  location: string
  checked: boolean
}
export interface LocationListProps {
  description: string
  locationData: LocationDataProps[]
  handleLocationChange?: (checked: boolean, locationKey: string) => void
  selectAll?: boolean
  onCheckAllChange?: (checked: boolean) => void
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function LocationList(props: LocationListProps) {
  const {
    description,
    locationData,
    handleLocationChange,
    onCheckAllChange,
    selectAll,
  } = props
  return (
    <div className={styles.checkboxWrapper}>
      <div className={styles.labelText}>{description}</div>
      <div>
        {locationData?.map((option) => (
          <Checkbox
            key={option.key}
            checked={option.checked}
            onChange={(event) => {
              handleLocationChange?.(event.target.checked, option.key)
            }}
          >
            {option.location}
          </Checkbox>
        ))}
      </div>
      {selectAll ? (
        <Button onClick={() => onCheckAllChange?.(false)}>Uncheck All</Button>
      ) : (
        <Button onClick={() => onCheckAllChange?.(true)}>Check All</Button>
      )}
    </div>
  )
}

export default LocationList
