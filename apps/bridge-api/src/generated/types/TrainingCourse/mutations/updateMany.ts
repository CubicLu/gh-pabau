import { mutationField, nonNull } from 'nexus'

export const TrainingCourseUpdateManyMutation = mutationField(
  'updateManyTrainingCourse',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'TrainingCourseWhereInput',
      data: nonNull('TrainingCourseUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.trainingCourse.updateMany(args as any)
    },
  },
)
