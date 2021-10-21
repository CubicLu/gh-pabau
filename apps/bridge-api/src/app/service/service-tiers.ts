import { Context } from '../../context'

/*
  For a given list of services it returns their cost and duration based on specified pricing/duration tier
 */
export const getTier = async (
  service_ids: number[],
  employee_id: number,
  location_id: number,
  ctx: Context
) => {
  const locationTiers = await ctx.prisma.serviceLocationTier.findMany({
    where: {
      service_id: { in: service_ids },
      location_id: location_id,
    },
  })

  const userTiers = await ctx.prisma.serviceUserTier.findMany({
    where: {
      service_id: { in: service_ids },
      user_id: employee_id,
    },
  })

  const services = []
  for (const s of service_ids) {
    services[s] = {
      cost: null,
      duration: null,
    }
  }

  for (const s of service_ids) {
    for (const lt of locationTiers) {
      if (lt.service_id === s && lt.price !== 0 && lt.price !== null) {
        services[s].cost = lt.price
      }
    }

    for (const ut of userTiers) {
      if (ut.service_id === s) {
        if (ut.price !== 0 && ut.price !== null) {
          services[s].cost = ut.price
        }

        if (ut.duration !== '' && ut.duration !== null) {
          services[s].duration = ut.duration
        }
      }
    }
  }

  return services
}
