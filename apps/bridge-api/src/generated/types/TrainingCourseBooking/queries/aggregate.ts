import { queryField, list } from 'nexus'

export const TrainingCourseBookingAggregateQuery = queryField(
  'aggregateTrainingCourseBooking',
  {
    type: 'AggregateTrainingCourseBooking',
    args: {
      where: 'TrainingCourseBookingWhereInput',
      orderBy: list('TrainingCourseBookingOrderByWithRelationInput'),
      cursor: 'TrainingCourseBookingWhereUniqueInput',
      distinct: 'TrainingCourseBookingScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.trainingCourseBooking.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
