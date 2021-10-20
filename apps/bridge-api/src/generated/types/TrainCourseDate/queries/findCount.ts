import { queryField, nonNull, list } from 'nexus'

export const TrainCourseDateFindCountQuery = queryField(
  'findManyTrainCourseDateCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'TrainCourseDateWhereInput',
      orderBy: list('TrainCourseDateOrderByWithRelationInput'),
      cursor: 'TrainCourseDateWhereUniqueInput',
      distinct: 'TrainCourseDateScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.trainCourseDate.count(args as any)
    },
  },
)
