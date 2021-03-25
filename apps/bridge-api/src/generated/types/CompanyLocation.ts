import { objectType, arg, extendType } from 'nexus'

export const CompanyLocation = objectType({
  name: 'CompanyLocation',
  definition(t) {
    t.model.id()
    t.model.company_id()
    t.model.location()
    t.model.Company()
  },
})

export const companyLocationQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.companyLocation()
    t.field('findFirstCompanyLocation', {
      type: 'CompanyLocation',
      args: {
        where: 'CompanyLocationWhereInput',
        orderBy: arg({ type: 'CompanyLocationOrderByInput' }),
        cursor: 'CompanyLocationWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.companyLocation.findFirst(args as any)
      },
    })
    t.crud.companyLocations({ filtering: true, ordering: true })
    t.field('companyLocationsCount', {
      type: 'Int',
      args: {
        where: 'CompanyLocationWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.companyLocation.count(args as any)
      },
    })
  },
})

export const companyLocationMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCompanyLocation()
    t.crud.updateOneCompanyLocation()
    t.crud.upsertOneCompanyLocation()
    t.crud.deleteOneCompanyLocation()
    t.crud.updateManyCompanyLocation()
    t.crud.deleteManyCompanyLocation()
  },
})
