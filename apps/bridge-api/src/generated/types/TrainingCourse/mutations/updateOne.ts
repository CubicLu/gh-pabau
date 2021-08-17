import { mutationField, nonNull } from 'nexus'

export const TrainingCourseUpdateOneMutation = mutationField(
  'updateOneTrainingCourse',
  {
    type: nonNull('TrainingCourse'),
    args: {
      where: nonNull('TrainingCourseWhereUniqueInput'),
      data: nonNull('TrainingCourseUpdateInput'),
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
