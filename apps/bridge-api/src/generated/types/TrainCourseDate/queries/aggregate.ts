import { queryField, list } from 'nexus'

export const TrainCourseDateAggregateQuery = queryField(
  'aggregateTrainCourseDate',
  {
    type: 'AggregateTrainCourseDate',
    args: {
      where: 'TrainCourseDateWhereInput',
      orderBy: list('TrainCourseDateOrderByInput'),
      cursor: 'TrainCourseDateWhereUniqueInput',
      distinct: 'TrainCourseDateScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.trainCourseDate.aggregate({ ...args, ...select }) as any
    },
  },
)
