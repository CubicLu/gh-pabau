import { mutationField, nonNull } from 'nexus'

export const TrainingCourseBookingUpsertOneMutation = mutationField(
  'upsertOneTrainingCourseBooking',
  {
    type: nonNull('TrainingCourseBooking'),
    args: {
      where: nonNull('TrainingCourseBookingWhereUniqueInput'),
      create: nonNull('TrainingCourseBookingCreateInput'),
      update: nonNull('TrainingCourseBookingUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.trainingCourseBooking.upsert({
        ...args,
        ...select,
      })
    },
  },
)
