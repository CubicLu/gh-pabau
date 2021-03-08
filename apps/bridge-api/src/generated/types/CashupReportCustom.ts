import { objectType, arg, extendType } from 'nexus'

export const CashupReportCustom = objectType({
  name: 'CashupReportCustom',
  definition(t) {
    t.model.id()
    t.model.companyId()
    t.model.locationId()
    t.model.cashupDate()
    t.model.customType()
    t.model.customAmount()
    t.model.customActual()
    t.model.customDifference()
    t.model.cardType()
  },
})

export const cashupReportCustomQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.cashupReportCustom()
    t.field('findFirstCashupReportCustom', {
      type: 'CashupReportCustom',
      args: {
        where: 'CashupReportCustomWhereInput',
        orderBy: arg({ type: 'CashupReportCustomOrderByInput' }),
        cursor: 'CashupReportCustomWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cashupReportCustom.findFirst(args as any)
      },
    })
    t.crud.cashupReportCustoms({ filtering: true, ordering: true })
    t.field('cashupReportCustomsCount', {
      type: 'Int',
      args: {
        where: 'CashupReportCustomWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cashupReportCustom.count(args as any)
      },
    })
  },
})

export const cashupReportCustomMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCashupReportCustom()
    t.crud.updateOneCashupReportCustom()
    t.crud.upsertOneCashupReportCustom()
    t.crud.deleteOneCashupReportCustom()
    t.crud.updateManyCashupReportCustom()
    t.crud.deleteManyCashupReportCustom()
  },
})
