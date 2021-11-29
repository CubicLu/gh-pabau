import { queryField, nonNull, list } from 'nexus'

export const TrainingCourseBookingFindCountQuery = queryField(
  'findManyTrainingCourseBookingCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'TrainingCourseBookingWhereInput',
      orderBy: list('TrainingCourseBookingOrderByWithRelationInput'),
      cursor: 'TrainingCourseBookingWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('TrainingCourseBookingScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.trainingCourseBooking.count(args as any)
    },
  },
)
