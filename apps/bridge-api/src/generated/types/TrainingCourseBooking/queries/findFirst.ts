import { queryField, list } from 'nexus'

export const TrainingCourseBookingFindFirstQuery = queryField(
  'findFirstTrainingCourseBooking',
  {
    type: 'TrainingCourseBooking',
    args: {
      where: 'TrainingCourseBookingWhereInput',
      orderBy: list('TrainingCourseBookingOrderByInput'),
      cursor: 'TrainingCourseBookingWhereUniqueInput',
      distinct: 'TrainingCourseBookingScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.trainingCourseBooking.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
