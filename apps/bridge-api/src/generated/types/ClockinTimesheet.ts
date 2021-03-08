import { objectType, arg, extendType } from 'nexus'

export const ClockinTimesheet = objectType({
  name: 'ClockinTimesheet',
  definition(t) {
    t.model.clockId()
    t.model.staffUid()
    t.model.companyId()
    t.model.clockin()
    t.model.clockout()
    t.model.totalBreakTime()
    t.model.totalWorkingTime()
    t.model.notes()
    t.model.approved()
    t.model.staffName()
    t.model.ipAddress()
  },
})

export const clockinTimesheetQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.clockinTimesheet()
    t.field('findFirstClockinTimesheet', {
      type: 'ClockinTimesheet',
      args: {
        where: 'ClockinTimesheetWhereInput',
        orderBy: arg({ type: 'ClockinTimesheetOrderByInput' }),
        cursor: 'ClockinTimesheetWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.clockinTimesheet.findFirst(args as any)
      },
    })
    t.crud.clockinTimesheets({ filtering: true, ordering: true })
    t.field('clockinTimesheetsCount', {
      type: 'Int',
      args: {
        where: 'ClockinTimesheetWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.clockinTimesheet.count(args as any)
      },
    })
  },
})

export const clockinTimesheetMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneClockinTimesheet()
    t.crud.updateOneClockinTimesheet()
    t.crud.upsertOneClockinTimesheet()
    t.crud.deleteOneClockinTimesheet()
    t.crud.updateManyClockinTimesheet()
    t.crud.deleteManyClockinTimesheet()
  },
})
