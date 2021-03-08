import { objectType, arg, extendType } from 'nexus'

export const BacsAccount = objectType({
  name: 'BacsAccount',
  definition(t) {
    t.model.id()
    t.model.bankTag()
    t.model.compId()
    t.model.branchName()
    t.model.accountHolder()
    t.model.accountNo()
    t.model.sortCode()
  },
})

export const bacsAccountQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.bacsAccount()
    t.field('findFirstBacsAccount', {
      type: 'BacsAccount',
      args: {
        where: 'BacsAccountWhereInput',
        orderBy: arg({ type: 'BacsAccountOrderByInput' }),
        cursor: 'BacsAccountWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.bacsAccount.findFirst(args as any)
      },
    })
    t.crud.bacsAccounts({ filtering: true, ordering: true })
    t.field('bacsAccountsCount', {
      type: 'Int',
      args: {
        where: 'BacsAccountWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.bacsAccount.count(args as any)
      },
    })
  },
})

export const bacsAccountMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneBacsAccount()
    t.crud.updateOneBacsAccount()
    t.crud.upsertOneBacsAccount()
    t.crud.deleteOneBacsAccount()
    t.crud.updateManyBacsAccount()
    t.crud.deleteManyBacsAccount()
  },
})
