import { mutationField, nonNull } from 'nexus'

export const TrainingCourseBookingUpdateManyMutation = mutationField(
  'updateManyTrainingCourseBooking',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'TrainingCourseBookingWhereInput',
      data: nonNull('TrainingCourseBookingUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.trainingCourseBooking.updateMany(args as any)
    },
  },
)
