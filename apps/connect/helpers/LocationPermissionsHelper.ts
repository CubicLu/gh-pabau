import { Service } from '../types/services'

export const canIBookLocation = (
  locationID: number,
  services: Service[]
): boolean => {
  for (const s of services) {
    if (
      s?.disabled_locations
        .split(',')
        .map((n) => Number.parseInt(n))
        .includes(locationID)
    ) {
      return false
    }
  }
  return true
}
