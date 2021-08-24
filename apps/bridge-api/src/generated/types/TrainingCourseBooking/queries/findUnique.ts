import { queryField, nonNull } from 'nexus'

export const TrainingCourseBookingFindUniqueQuery = queryField(
  'findUniqueTrainingCourseBooking',
  {
    type: 'TrainingCourseBooking',
    args: {
      where: nonNull('TrainingCourseBookingWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.trainingCourseBooking.findUnique({
        where,
        ...select,
      })
    },
  },
)
