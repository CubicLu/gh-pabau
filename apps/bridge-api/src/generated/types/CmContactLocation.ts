import { objectType, arg, extendType } from 'nexus'

export const CmContactLocation = objectType({
  name: 'CmContactLocation',
  definition(t) {
    t.model.id()
    t.model.company_id()
    t.model.contact_id()
    t.model.location_id()
    t.model.Company()
    t.model.Location()
    t.model.CmContact()
  },
})

export const cmContactLocationQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.cmContactLocation()
    t.field('findFirstCmContactLocation', {
      type: 'CmContactLocation',
      args: {
        where: 'CmContactLocationWhereInput',
        orderBy: arg({ type: 'CmContactLocationOrderByInput' }),
        cursor: 'CmContactLocationWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmContactLocation.findFirst(args as any)
      },
    })
    t.crud.cmContactLocations({ filtering: true, ordering: true })
    t.field('cmContactLocationsCount', {
      type: 'Int',
      args: {
        where: 'CmContactLocationWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmContactLocation.count(args as any)
      },
    })
  },
})

export const cmContactLocationMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCmContactLocation()
    t.crud.updateOneCmContactLocation()
    t.crud.upsertOneCmContactLocation()
    t.crud.deleteOneCmContactLocation()
  },
})
