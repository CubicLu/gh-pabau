import { queryField, list } from 'nexus'

export const TrainCourseDateAggregateQuery = queryField(
  'aggregateTrainCourseDate',
  {
    type: 'AggregateTrainCourseDate',
    args: {
      where: 'TrainCourseDateWhereInput',
      orderBy: list('TrainCourseDateOrderByWithRelationInput'),
      cursor: 'TrainCourseDateWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.trainCourseDate.aggregate({ ...args, ...select }) as any
    },
  },
)
