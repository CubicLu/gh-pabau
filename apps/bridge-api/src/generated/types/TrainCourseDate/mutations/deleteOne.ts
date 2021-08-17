import { mutationField, nonNull } from 'nexus'

export const TrainCourseDateDeleteOneMutation = mutationField(
  'deleteOneTrainCourseDate',
  {
    type: 'TrainCourseDate',
    args: {
      where: nonNull('TrainCourseDateWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.trainCourseDate.delete({
        where,
        ...select,
      })
    },
  },
)
