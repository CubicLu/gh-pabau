import { queryField, nonNull, list } from 'nexus'

export const TrainingCourseBookingFindCountQuery = queryField(
  'findManyTrainingCourseBookingCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'TrainingCourseBookingWhereInput',
      orderBy: list('TrainingCourseBookingOrderByInput'),
      cursor: 'TrainingCourseBookingWhereUniqueInput',
      distinct: 'TrainingCourseBookingScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.trainingCourseBooking.count(args as any)
    },
  },
)
