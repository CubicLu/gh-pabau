import { queryField, nonNull, list } from 'nexus'

export const TrainingCourseBookingFindManyQuery = queryField(
  'findManyTrainingCourseBooking',
  {
    type: nonNull(list(nonNull('TrainingCourseBooking'))),
    args: {
      where: 'TrainingCourseBookingWhereInput',
      orderBy: list('TrainingCourseBookingOrderByWithRelationInput'),
      cursor: 'TrainingCourseBookingWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('TrainingCourseBookingScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.trainingCourseBooking.findMany({
        ...args,
        ...select,
      })
    },
  },
)
