import { objectType, arg, extendType } from 'nexus'

export const ClockinTimesheet = objectType({
  name: 'ClockinTimesheet',
  definition(t) {
    t.model.clock_id()
    t.model.staff_uid()
    t.model.company_id()
    t.model.clockin()
    t.model.clockout()
    t.model.total_break_time()
    t.model.total_working_time()
    t.model.notes()
    t.model.approved()
    t.model.staff_name()
    t.model.ip_address()
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
  },
})
