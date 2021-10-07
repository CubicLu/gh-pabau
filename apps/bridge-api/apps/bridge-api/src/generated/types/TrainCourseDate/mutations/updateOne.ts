import { mutationField, nonNull } from 'nexus'

export const TrainCourseDateUpdateOneMutation = mutationField(
  'updateOneTrainCourseDate',
  {
    type: nonNull('TrainCourseDate'),
    args: {
      where: nonNull('TrainCourseDateWhereUniqueInput'),
      data: nonNull('TrainCourseDateUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.trainCourseDate.update({
        where,
        data,
        ...select,
      })
    },
  },
)
