import { mutationField, nonNull } from 'nexus'

export const TrainingCourseUpdateOneMutation = mutationField(
  'updateOneTrainingCourse',
  {
    type: nonNull('TrainingCourse'),
    args: {
      data: nonNull('TrainingCourseUpdateInput'),
      where: nonNull('TrainingCourseWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.trainingCourse.update({
        where,
        data,
        ...select,
      })
    },
  },
)
