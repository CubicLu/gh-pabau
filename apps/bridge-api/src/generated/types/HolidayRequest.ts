import { objectType, arg, extendType } from 'nexus'

export const HolidayRequest = objectType({
  name: 'HolidayRequest',
  definition(t) {
    t.model.id()
    t.model.company_id()
    t.model.staff_id()
    t.model.request_id()
    t.model.holiday_from()
    t.model.holiday_to()
    t.model.status()
    t.model.leave_type()
    t.model.approved_by()
    t.model.staff_comments()
    t.model.seen()
    t.model.rejected_by()
    t.model.approve_comments()
    t.model.reject_comments()
    t.model.Company()
    t.model.CmStaffGeneral()
    t.model.RotaShift()
  },
})

export const holidayRequestQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.holidayRequest()
    t.field('findFirstHolidayRequest', {
      type: 'HolidayRequest',
      args: {
        where: 'HolidayRequestWhereInput',
        orderBy: arg({ type: 'HolidayRequestOrderByInput' }),
        cursor: 'HolidayRequestWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.holidayRequest.findFirst(args as any)
      },
    })
    t.crud.holidayRequests({ filtering: true, ordering: true })
    t.field('holidayRequestsCount', {
      type: 'Int',
      args: {
        where: 'HolidayRequestWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.holidayRequest.count(args as any)
      },
    })
  },
})

export const holidayRequestMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneHolidayRequest()
    t.crud.updateOneHolidayRequest()
    t.crud.upsertOneHolidayRequest()
    t.crud.deleteOneHolidayRequest()
    t.crud.updateManyHolidayRequest()
  },
})
