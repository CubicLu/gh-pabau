import { useSelectedDataStore } from '../store/selectedData'
import { Staff } from '../types/staff'

export default function useStaffPermissions() {
  const { selectedData } = useSelectedDataStore()

  const canStaffPerformInLocation = (staff: Staff): boolean => {
    return staff.Location.split(',')
      .map((n) => Number.parseInt(n))
      .includes(selectedData.location.id)
  }

  const canStaffPerformService = (userID: number): boolean => {
    for (const s of selectedData.services) {
      if (
        s?.disabledusers &&
        s.disabledusers !== '' &&
        s.disabledusers
          .split(',')
          .map((n) => Number.parseInt(n))
          .includes(userID)
      ) {
        return false
      }
    }
    return true
  }

  return { canStaffPerformInLocation, canStaffPerformService }
}
