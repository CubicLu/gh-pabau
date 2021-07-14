import { mutationField, nonNull } from 'nexus'

export const TrainingCourseUpsertOneMutation = mutationField(
  'upsertOneTrainingCourse',
  {
    type: nonNull('TrainingCourse'),
    args: {
      where: nonNull('TrainingCourseWhereUniqueInput'),
      create: nonNull('TrainingCourseCreateInput'),
      update: nonNull('TrainingCourseUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.trainingCourse.upsert({
        ...args,
        ...select,
      })
    },
  },
)
