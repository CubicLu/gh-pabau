import { objectType, arg, extendType } from 'nexus'

export const BookingStatusChange = objectType({
  name: 'BookingStatusChange',
  definition(t) {
    t.model.id()
    t.model.bookingId()
    t.model.status()
    t.model.startDate()
    t.model.endDate()
    t.model.companyId()
    t.model.userId()
  },
})

export const bookingStatusChangeQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.bookingStatusChange()
    t.field('findFirstBookingStatusChange', {
      type: 'BookingStatusChange',
      args: {
        where: 'BookingStatusChangeWhereInput',
        orderBy: arg({ type: 'BookingStatusChangeOrderByInput' }),
        cursor: 'BookingStatusChangeWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.bookingStatusChange.findFirst(args as any)
      },
    })
    t.crud.bookingStatusChanges({ filtering: true, ordering: true })
    t.field('bookingStatusChangesCount', {
      type: 'Int',
      args: {
        where: 'BookingStatusChangeWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.bookingStatusChange.count(args as any)
      },
    })
  },
})

export const bookingStatusChangeMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneBookingStatusChange()
    t.crud.updateOneBookingStatusChange()
    t.crud.upsertOneBookingStatusChange()
    t.crud.deleteOneBookingStatusChange()
    t.crud.updateManyBookingStatusChange()
    t.crud.deleteManyBookingStatusChange()
  },
})
