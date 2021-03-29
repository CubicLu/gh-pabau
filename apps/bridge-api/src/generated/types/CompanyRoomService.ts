import { objectType, arg, extendType } from 'nexus'

export const CompanyRoomService = objectType({
  name: 'CompanyRoomService',
  definition(t) {
    t.model.id()
    t.model.room_id()
    t.model.service_id()
    t.model.company_id()
    t.model.priority_order()
    t.model.imported()
    t.model.Company()
    t.model.Room()
    t.model.Service()
  },
})

export const companyRoomServiceQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.companyRoomService()
    t.field('findFirstCompanyRoomService', {
      type: 'CompanyRoomService',
      args: {
        where: 'CompanyRoomServiceWhereInput',
        orderBy: arg({ type: 'CompanyRoomServiceOrderByInput' }),
        cursor: 'CompanyRoomServiceWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.companyRoomService.findFirst(args as any)
      },
    })
    t.crud.companyRoomServices({ filtering: true, ordering: true })
    t.field('companyRoomServicesCount', {
      type: 'Int',
      args: {
        where: 'CompanyRoomServiceWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.companyRoomService.count(args as any)
      },
    })
  },
})

export const companyRoomServiceMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCompanyRoomService()
    t.crud.updateOneCompanyRoomService()
    t.crud.upsertOneCompanyRoomService()
    t.crud.deleteOneCompanyRoomService()
  },
})
