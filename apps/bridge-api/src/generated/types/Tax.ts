import { objectType, arg, extendType } from 'nexus'

export const Tax = objectType({
  name: 'Tax',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.value()
    t.model.rate()
    t.model.hidden()
    t.model.default()
    t.model.company_id()
    t.model.custom_id()
    t.model.InvSaleItem()
  },
})

export const taxQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.tax()
    t.field('findFirstTax', {
      type: 'Tax',
      args: {
        where: 'TaxWhereInput',
        orderBy: arg({ type: 'TaxOrderByInput' }),
        cursor: 'TaxWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.tax.findFirst(args as any)
      },
    })
    t.crud.taxes({ filtering: true, ordering: true })
    t.field('taxesCount', {
      type: 'Int',
      args: {
        where: 'TaxWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.tax.count(args as any)
      },
    })
  },
})

export const taxMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneTax()
    t.crud.updateOneTax()
    t.crud.upsertOneTax()
    t.crud.deleteOneTax()
    t.crud.updateManyTax()
  },
})
