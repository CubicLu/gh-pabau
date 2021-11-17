import { useSelectedDataStore } from '../store/selectedData'

export default function useLocationPermissions() {
  const { selectedData } = useSelectedDataStore()

  const canLocationPerformService = (locationID: number): boolean => {
    for (const s of selectedData.services) {
      if (
        s?.disabled_locations &&
        s.disabled_locations !== '' &&
        s.disabled_locations
          .split(',')
          .map((n) => Number.parseInt(n))
          .includes(locationID)
      ) {
        return false
      }
    }
    return true
  }

  return { canLocationPerformService }
}
