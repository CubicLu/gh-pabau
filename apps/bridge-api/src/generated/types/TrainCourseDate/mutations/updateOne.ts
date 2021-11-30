import { mutationField, nonNull } from 'nexus'

export const TrainCourseDateUpdateOneMutation = mutationField(
  'updateOneTrainCourseDate',
  {
    type: nonNull('TrainCourseDate'),
    args: {
      data: nonNull('TrainCourseDateUpdateInput'),
      where: nonNull('TrainCourseDateWhereUniqueInput'),
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
