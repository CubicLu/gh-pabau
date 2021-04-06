import { objectType, arg, extendType } from 'nexus'

export const CompanyRoomLocation = objectType({
  name: 'CompanyRoomLocation',
  definition(t) {
    t.model.id()
    t.model.room_id()
    t.model.location_id()
    t.model.CompanyRoom()
    t.model.Location()
  },
})

export const companyRoomLocationQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.companyRoomLocation()
    t.field('findFirstCompanyRoomLocation', {
      type: 'CompanyRoomLocation',
      args: {
        where: 'CompanyRoomLocationWhereInput',
        orderBy: arg({ type: 'CompanyRoomLocationOrderByInput' }),
        cursor: 'CompanyRoomLocationWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.companyRoomLocation.findFirst(args as any)
      },
    })
    t.crud.companyRoomLocations({ filtering: true, ordering: true })
    t.field('companyRoomLocationsCount', {
      type: 'Int',
      args: {
        where: 'CompanyRoomLocationWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.companyRoomLocation.count(args as any)
      },
    })
  },
})

export const companyRoomLocationMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCompanyRoomLocation()
    t.crud.updateOneCompanyRoomLocation()
    t.crud.upsertOneCompanyRoomLocation()
    t.crud.deleteOneCompanyRoomLocation()
  },
})
