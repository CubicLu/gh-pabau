import { mutationField, nonNull } from 'nexus'

export const TrainCourseDateCreateOneMutation = mutationField(
  'createOneTrainCourseDate',
  {
    type: nonNull('TrainCourseDate'),
    args: {
      data: nonNull('TrainCourseDateCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.trainCourseDate.create({
        data,
        ...select,
      })
    },
  },
)
