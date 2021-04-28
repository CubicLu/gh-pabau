import { objectType, arg, extendType } from 'nexus'

export const UserReport = objectType({
  name: 'UserReport',
  definition(t) {
    t.model.id()
    t.model.company_id()
    t.model.user_id()
    t.model.report_id()
    t.model.favorite()
    t.model.User()
    t.model.Company()
    t.model.Report()
  },
})

export const userReportQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.userReport()
    t.field('findFirstUserReport', {
      type: 'UserReport',
      args: {
        where: 'UserReportWhereInput',
        orderBy: arg({ type: 'UserReportOrderByInput' }),
        cursor: 'UserReportWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.userReport.findFirst(args as any)
      },
    })
    t.crud.userReports({ filtering: true, ordering: true })
    t.field('userReportsCount', {
      type: 'Int',
      args: {
        where: 'UserReportWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.userReport.count(args as any)
      },
    })
  },
})

export const userReportMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneUserReport()
    t.crud.updateOneUserReport()
    t.crud.upsertOneUserReport()
    t.crud.deleteOneUserReport()
  },
})
