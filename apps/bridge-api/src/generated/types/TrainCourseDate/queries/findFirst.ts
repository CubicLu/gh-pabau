import { queryField, list } from 'nexus'

export const TrainCourseDateFindFirstQuery = queryField(
  'findFirstTrainCourseDate',
  {
    type: 'TrainCourseDate',
    args: {
      where: 'TrainCourseDateWhereInput',
      orderBy: list('TrainCourseDateOrderByWithRelationInput'),
      cursor: 'TrainCourseDateWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('TrainCourseDateScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.trainCourseDate.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
