import { mutationField, nonNull } from 'nexus'

export const TrainingCourseBookingUpdateOneMutation = mutationField(
  'updateOneTrainingCourseBooking',
  {
    type: nonNull('TrainingCourseBooking'),
    args: {
      data: nonNull('TrainingCourseBookingUpdateInput'),
      where: nonNull('TrainingCourseBookingWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.trainingCourseBooking.update({
        where,
        data,
        ...select,
      })
    },
  },
)
