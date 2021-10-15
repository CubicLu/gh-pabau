import { queryField, nonNull, list } from 'nexus'

export const TrainingCourseBookingFindManyQuery = queryField(
  'findManyTrainingCourseBooking',
  {
    type: nonNull(list(nonNull('TrainingCourseBooking'))),
    args: {
      where: 'TrainingCourseBookingWhereInput',
      orderBy: list('TrainingCourseBookingOrderByInput'),
      cursor: 'TrainingCourseBookingWhereUniqueInput',
      distinct: 'TrainingCourseBookingScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.trainingCourseBooking.findMany({
        ...args,
        ...select,
      })
    },
  },
)
