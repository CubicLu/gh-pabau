import { objectType, arg, extendType } from 'nexus'

export const TrainingCourseBooking = objectType({
  name: 'TrainingCourseBooking',
  definition(t) {
    t.model.id()
    t.model.course_id()
    t.model.webinar_id()
    t.model.course_date()
    t.model.trainer()
    t.model.encore()
    t.model.TrainingCourse()
  },
})

export const trainingCourseBookingQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.trainingCourseBooking()
    t.field('findFirstTrainingCourseBooking', {
      type: 'TrainingCourseBooking',
      args: {
        where: 'TrainingCourseBookingWhereInput',
        orderBy: arg({ type: 'TrainingCourseBookingOrderByInput' }),
        cursor: 'TrainingCourseBookingWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.trainingCourseBooking.findFirst(args as any)
      },
    })
    t.crud.trainingCourseBookings({ filtering: true, ordering: true })
    t.field('trainingCourseBookingsCount', {
      type: 'Int',
      args: {
        where: 'TrainingCourseBookingWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.trainingCourseBooking.count(args as any)
      },
    })
  },
})

export const trainingCourseBookingMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneTrainingCourseBooking()
    t.crud.updateOneTrainingCourseBooking()
    t.crud.upsertOneTrainingCourseBooking()
    t.crud.deleteOneTrainingCourseBooking()
    t.crud.updateManyTrainingCourseBooking()
  },
})
