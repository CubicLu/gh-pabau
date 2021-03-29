import { objectType, arg, extendType } from 'nexus'

export const Salutation = objectType({
  name: 'Salutation',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.company_id()
    t.model.Company()
  },
})

export const salutationQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.salutation()
    t.field('findFirstSalutation', {
      type: 'Salutation',
      args: {
        where: 'SalutationWhereInput',
        orderBy: arg({ type: 'SalutationOrderByInput' }),
        cursor: 'SalutationWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.salutation.findFirst(args as any)
      },
    })
    t.crud.salutations({ filtering: true, ordering: true })
    t.field('salutationsCount', {
      type: 'Int',
      args: {
        where: 'SalutationWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.salutation.count(args as any)
      },
    })
  },
})

export const salutationMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneSalutation()
    t.crud.updateOneSalutation()
    t.crud.upsertOneSalutation()
    t.crud.deleteOneSalutation()
  },
})
