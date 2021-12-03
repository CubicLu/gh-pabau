import { queryField, nonNull, list } from 'nexus'

export const TrainCourseDateFindCountQuery = queryField(
  'findManyTrainCourseDateCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'TrainCourseDateWhereInput',
      orderBy: list('TrainCourseDateOrderByWithRelationInput'),
      cursor: 'TrainCourseDateWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('TrainCourseDateScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.trainCourseDate.count(args as any)
    },
  },
)
