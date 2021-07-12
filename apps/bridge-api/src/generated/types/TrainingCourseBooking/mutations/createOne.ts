import { mutationField, nonNull } from 'nexus'

export const TrainingCourseBookingCreateOneMutation = mutationField(
  'createOneTrainingCourseBooking',
  {
    type: nonNull('TrainingCourseBooking'),
    args: {
      data: nonNull('TrainingCourseBookingCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.trainingCourseBooking.create({
        data,
        ...select,
      })
    },
  },
)
