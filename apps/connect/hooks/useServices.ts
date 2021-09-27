import { useCompanyServicesCategorisedQuery } from '@pabau/graphql'

/**
 * This Hook manages company services for online bookings
 *
 * @returns The windowSize will return height and width
 */
export default function useServices() {
  const getServicesCategorised = async () => {
    return useCompanyServicesCategorisedQuery({
      variables: {
        company_id: 8021,
      },
    })
  }

  const { loading, error, data: servicesCategorised } = getServicesCategorised()

  if (error) return []
  if (loading || !servicesCategorised) return []
  return servicesCategorised
}

const findServiceByIDs = (serviceIDs: number[]) => {
  const services = []
  for (const mcat of masterCategories) {
    if (mcat.categories) {
      for (const cat of mcat.categories) {
        if (cat.services) {
          for (const s of cat.services) {
            if (serviceIDs.includes(s.id)) {
              services.push(s)
            }
          }
        }
      }
    }
  }
  return services
}

const findMasterCategoryIDByCategoryID = (categoryID: number) => {
  for (const mcat of masterCategories) {
    if (mcat.categories) {
      for (const cat of mcat.categories) {
        if (cat.id === categoryID) {
          return mcat.id
        }
      }
    }
  }
  return null
}
