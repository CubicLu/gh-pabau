import { mutationField, nonNull } from 'nexus'

export const TrainingCourseBookingDeleteOneMutation = mutationField(
  'deleteOneTrainingCourseBooking',
  {
    type: 'TrainingCourseBooking',
    args: {
      where: nonNull('TrainingCourseBookingWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.trainingCourseBooking.delete({
        where,
        ...select,
      })
    },
  },
)
