import { mutationField, nonNull } from 'nexus'

export const TrainingCourseUpdateManyMutation = mutationField(
  'updateManyTrainingCourse',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('TrainingCourseUpdateManyMutationInput'),
      where: 'TrainingCourseWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.trainingCourse.updateMany(args as any)
    },
  },
)
