import { objectType, arg, extendType } from 'nexus'

export const CashupReport = objectType({
  name: 'CashupReport',
  definition(t) {
    t.model.id()
    t.model.companyId()
    t.model.staffId()
    t.model.locationId()
    t.model.floatAmount()
    t.model.openingBalance()
    t.model.cashAmount()
    t.model.cashActual()
    t.model.cashDifference()
    t.model.chequeAmount()
    t.model.chequeActual()
    t.model.chequeDifference()
    t.model.cardAmount()
    t.model.cardActual()
    t.model.cardDifference()
    t.model.giftvoucherAmount()
    t.model.giftvoucherActual()
    t.model.giftvoucherDifference()
    t.model.comments()
    t.model.cashupDate()
    t.model.financeId()
  },
})

export const cashupReportQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.cashupReport()
    t.field('findFirstCashupReport', {
      type: 'CashupReport',
      args: {
        where: 'CashupReportWhereInput',
        orderBy: arg({ type: 'CashupReportOrderByInput' }),
        cursor: 'CashupReportWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cashupReport.findFirst(args as any)
      },
    })
    t.crud.cashupReports({ filtering: true, ordering: true })
    t.field('cashupReportsCount', {
      type: 'Int',
      args: {
        where: 'CashupReportWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cashupReport.count(args as any)
      },
    })
  },
})

export const cashupReportMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCashupReport()
    t.crud.updateOneCashupReport()
    t.crud.upsertOneCashupReport()
    t.crud.deleteOneCashupReport()
    t.crud.updateManyCashupReport()
    t.crud.deleteManyCashupReport()
  },
})
