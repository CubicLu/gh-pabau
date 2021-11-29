import { queryField, list } from 'nexus'

export const JobConfigurationAggregateQuery = queryField(
  'aggregateJobConfiguration',
  {
    type: 'AggregateJobConfiguration',
    args: {
      where: 'JobConfigurationWhereInput',
      orderBy: list('JobConfigurationOrderByWithRelationInput'),
      cursor: 'JobConfigurationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.jobConfiguration.aggregate({ ...args, ...select }) as any
    },
  },
)
