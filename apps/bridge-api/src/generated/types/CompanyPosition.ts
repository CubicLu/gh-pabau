import { objectType, arg, extendType } from 'nexus'

export const CompanyPosition = objectType({
  name: 'CompanyPosition',
  definition(t) {
    t.model.id()
    t.model.company_id()
    t.model.position()
    t.model.CmStaffGeneral()
    t.model.Company()
  },
})

export const companyPositionQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.companyPosition()
    t.field('findFirstCompanyPosition', {
      type: 'CompanyPosition',
      args: {
        where: 'CompanyPositionWhereInput',
        orderBy: arg({ type: 'CompanyPositionOrderByInput' }),
        cursor: 'CompanyPositionWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.companyPosition.findFirst(args as any)
      },
    })
    t.crud.companyPositions({ filtering: true, ordering: true })
    t.field('companyPositionsCount', {
      type: 'Int',
      args: {
        where: 'CompanyPositionWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.companyPosition.count(args as any)
      },
    })
  },
})

export const companyPositionMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCompanyPosition()
    t.crud.updateOneCompanyPosition()
    t.crud.upsertOneCompanyPosition()
    t.crud.deleteOneCompanyPosition()
    t.crud.updateManyCompanyPosition()
  },
})
