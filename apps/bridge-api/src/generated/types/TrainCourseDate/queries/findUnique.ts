import { queryField, nonNull } from 'nexus'

export const TrainCourseDateFindUniqueQuery = queryField(
  'findUniqueTrainCourseDate',
  {
    type: 'TrainCourseDate',
    args: {
      where: nonNull('TrainCourseDateWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.trainCourseDate.findUnique({
        where,
        ...select,
      })
    },
  },
)
