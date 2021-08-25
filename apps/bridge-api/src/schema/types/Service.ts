import { objectType, extendType, list, nonNull, intArg, stringArg } from 'nexus'
import { Context } from '../../context'
import { Prisma } from '@prisma/client'

interface ServicesListInput {
  searchTerm: string
  offset: number
  limit: number
  active: number
  department: string
  locationId: number
  admin: number
}

const ServiceListType = objectType({
  name: 'ServiceListType',
  definition(t) {
    t.int('id')
  },
})

// const ServiceListReturnType = objectType({
//   name: 'ServiceListType',
//   definition(t) {
//     t.int('count')
//     t.field('getServicesCategorised', { type: list(ServiceListType) })
//   },
// })

export const ServicesCategorisedList = extendType({
  type: 'Query',
  definition(t) {
    t.field('getServicesCategorised', {
      type: ServiceListType,
      description: 'Get services categorised',
      args: {},
      async resolve(_, input: ServicesListInput, ctx: Context) {
        return true
      },
    })
  },
})
