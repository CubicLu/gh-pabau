import { mutationField, nonNull } from 'nexus'

export const TrainCourseDateUpdateManyMutation = mutationField(
  'updateManyTrainCourseDate',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('TrainCourseDateUpdateManyMutationInput'),
      where: 'TrainCourseDateWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.trainCourseDate.updateMany(args as any)
    },
  },
)
