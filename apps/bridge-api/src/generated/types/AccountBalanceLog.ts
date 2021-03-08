import { objectType, arg, extendType } from 'nexus'

export const AccountBalanceLog = objectType({
  name: 'AccountBalanceLog',
  definition(t) {
    t.model.id()
    t.model.companyId()
    t.model.contactId()
    t.model.insuranceCompanyId()
    t.model.amount()
    t.model.dateTime()
    t.model.productId()
    t.model.description()
    t.model.saleId()
    t.model.referralId()
    t.model.imported()
    t.model.refSaleId()
  },
})

export const accountBalanceLogQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.accountBalanceLog()
    t.field('findFirstAccountBalanceLog', {
      type: 'AccountBalanceLog',
      args: {
        where: 'AccountBalanceLogWhereInput',
        orderBy: arg({ type: 'AccountBalanceLogOrderByInput' }),
        cursor: 'AccountBalanceLogWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.accountBalanceLog.findFirst(args as any)
      },
    })
    t.crud.accountBalanceLogs({ filtering: true, ordering: true })
    t.field('accountBalanceLogsCount', {
      type: 'Int',
      args: {
        where: 'AccountBalanceLogWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.accountBalanceLog.count(args as any)
      },
    })
  },
})

export const accountBalanceLogMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneAccountBalanceLog()
    t.crud.updateOneAccountBalanceLog()
    t.crud.upsertOneAccountBalanceLog()
    t.crud.deleteOneAccountBalanceLog()
    t.crud.updateManyAccountBalanceLog()
    t.crud.deleteManyAccountBalanceLog()
  },
})
