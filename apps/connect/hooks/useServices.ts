import { useSelectedDataStore } from '../store/selectedData'

export default function useServices() {
  const { selectedData } = useSelectedDataStore()

  const getTotalServiceCost = (serviceUserTiers) => {
    let totalCost = 0
    for (const s of selectedData.services) {
      let servicePrice = s.price
      for (const ut of serviceUserTiers) {
        if (ut.service_id === s.id) {
          servicePrice = ut.price
        }
      }
      totalCost += servicePrice
    }
    return totalCost
  }

  const getServicePriceRange = (service) => {
    return {
      low: 0,
      high: 100,
    }
  }

  const masterCategoryHasServices = (masterCategory) => {
    for (const sc of masterCategory.Public_ServiceCategories) {
      if (sc.Public_Services.length > 0) {
        return true
      }
    }
    return false
  }

  const categoryHasServices = (category) => {
    if (category.Public_Services.length > 0) {
      return true
    }
    return false
  }

  return {
    getTotalServiceCost,
    getServicePriceRange,
    masterCategoryHasServices,
    categoryHasServices,
  }
}
