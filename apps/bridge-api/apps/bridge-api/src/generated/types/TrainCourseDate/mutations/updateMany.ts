import { mutationField, nonNull } from 'nexus'

export const TrainCourseDateUpdateManyMutation = mutationField(
  'updateManyTrainCourseDate',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'TrainCourseDateWhereInput',
      data: nonNull('TrainCourseDateUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.trainCourseDate.updateMany(args as any)
    },
  },
)
