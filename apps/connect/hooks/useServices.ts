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

  // return servicesCategorised.serviceMasterCategories.map(
  //   (row) => {
  //     return {
  //       id: row.id,
  //       name: row.name,
  //       icon: row.image ? (
  //         <Image
  //           preview={false}
  //           height={'40px'}
  //           width={'40px'}
  //           src={'https://crm.pabau.com' + row.image}
  //           alt={row.name}
  //         />
  //       ) : null,
  //       categories: row.ServiceCategory.map((cat) => {
  //         return {
  //           id: cat.id,
  //           name: cat.name,
  //           icon: row.image ? (
  //             <Image
  //               preview={false}
  //               height={'40px'}
  //               width={'40px'}
  //               src={'https://crm.pabau.com' + row.image}
  //               alt={row.name}
  //             />
  //           ) : null,
  //           services: cat.CompanyService.map((service) => {
  //             return {
  //               review: 1,
  //               rating: 5,
  //               ...service,
  //             }
  //           }),
  //         }
  //       }),
  //     }
  //   }
  // )
}
