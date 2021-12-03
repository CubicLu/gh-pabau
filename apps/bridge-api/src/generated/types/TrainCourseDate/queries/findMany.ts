import { queryField, nonNull, list } from 'nexus'

export const TrainCourseDateFindManyQuery = queryField(
  'findManyTrainCourseDate',
  {
    type: nonNull(list(nonNull('TrainCourseDate'))),
    args: {
      where: 'TrainCourseDateWhereInput',
      orderBy: list('TrainCourseDateOrderByWithRelationInput'),
      cursor: 'TrainCourseDateWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('TrainCourseDateScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.trainCourseDate.findMany({
        ...args,
        ...select,
      })
    },
  },
)
