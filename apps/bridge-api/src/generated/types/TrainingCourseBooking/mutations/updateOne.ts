import { mutationField, nonNull } from 'nexus'

export const TrainingCourseBookingUpdateOneMutation = mutationField(
  'updateOneTrainingCourseBooking',
  {
    type: nonNull('TrainingCourseBooking'),
    args: {
      where: nonNull('TrainingCourseBookingWhereUniqueInput'),
      data: nonNull('TrainingCourseBookingUpdateInput'),
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
