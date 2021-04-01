import { objectType, arg, extendType } from 'nexus'

export const CompanyMeta = objectType({
  name: 'CompanyMeta',
  definition(t) {
    t.model.id()
    t.model.company_id()
    t.model.meta_name()
    t.model.meta_value()
    t.model.Company()
  },
})

export const companyMetaQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.companyMeta()
    t.field('findFirstCompanyMeta', {
      type: 'CompanyMeta',
      args: {
        where: 'CompanyMetaWhereInput',
        orderBy: arg({ type: 'CompanyMetaOrderByInput' }),
        cursor: 'CompanyMetaWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.companyMeta.findFirst(args as any)
      },
    })
    t.crud.companyMetas({ filtering: true, ordering: true })
    t.field('companyMetasCount', {
      type: 'Int',
      args: {
        where: 'CompanyMetaWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.companyMeta.count(args as any)
      },
    })
  },
})

export const companyMetaMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCompanyMeta()
    t.crud.updateOneCompanyMeta()
    t.crud.upsertOneCompanyMeta()
    t.crud.deleteOneCompanyMeta()
    t.crud.updateManyCompanyMeta()
  },
})
