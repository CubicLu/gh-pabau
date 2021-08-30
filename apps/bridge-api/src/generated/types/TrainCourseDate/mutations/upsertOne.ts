import { mutationField, nonNull } from 'nexus'

export const TrainCourseDateUpsertOneMutation = mutationField(
  'upsertOneTrainCourseDate',
  {
    type: nonNull('TrainCourseDate'),
    args: {
      where: nonNull('TrainCourseDateWhereUniqueInput'),
      create: nonNull('TrainCourseDateCreateInput'),
      update: nonNull('TrainCourseDateUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.trainCourseDate.upsert({
        ...args,
        ...select,
      })
    },
  },
)
