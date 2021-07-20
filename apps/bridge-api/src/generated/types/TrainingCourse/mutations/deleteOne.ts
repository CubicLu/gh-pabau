import { mutationField, nonNull } from 'nexus'

export const TrainingCourseDeleteOneMutation = mutationField(
  'deleteOneTrainingCourse',
  {
    type: 'TrainingCourse',
    args: {
      where: nonNull('TrainingCourseWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.trainingCourse.delete({
        where,
        ...select,
      })
    },
  },
)
