import { mutationField, nonNull } from 'nexus'

export const TrainingCourseBookingUpdateManyMutation = mutationField(
  'updateManyTrainingCourseBooking',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('TrainingCourseBookingUpdateManyMutationInput'),
      where: 'TrainingCourseBookingWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.trainingCourseBooking.updateMany(args as any)
    },
  },
)
