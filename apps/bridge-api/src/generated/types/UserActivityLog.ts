import { objectType, arg, extendType } from 'nexus'

export const UserActivityLog = objectType({
  name: 'UserActivityLog',
  definition(t) {
    t.model.ID()
    t.model.userId()
    t.model.company_id()
    t.model.accessId()
    t.model.type()
    t.model.template()
    t.model.time()
    t.model.status()
    t.model.ipAddress()
    t.model.pabau_annoucement()
    t.model.location_id()
    t.model.User()
    t.model.Company()
  },
})

export const userActivityLogQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.userActivityLog()
    t.field('findFirstUserActivityLog', {
      type: 'UserActivityLog',
      args: {
        where: 'UserActivityLogWhereInput',
        orderBy: arg({ type: 'UserActivityLogOrderByInput' }),
        cursor: 'UserActivityLogWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.userActivityLog.findFirst(args as any)
      },
    })
    t.crud.userActivityLogs({ filtering: true, ordering: true })
    t.field('userActivityLogsCount', {
      type: 'Int',
      args: {
        where: 'UserActivityLogWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.userActivityLog.count(args as any)
      },
    })
  },
})

export const userActivityLogMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneUserActivityLog()
    t.crud.updateOneUserActivityLog()
    t.crud.upsertOneUserActivityLog()
    t.crud.deleteOneUserActivityLog()
    t.crud.updateManyUserActivityLog()
  },
})
