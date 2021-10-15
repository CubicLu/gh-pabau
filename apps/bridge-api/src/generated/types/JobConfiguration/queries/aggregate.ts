import { queryField, list } from 'nexus'

export const JobConfigurationAggregateQuery = queryField(
  'aggregateJobConfiguration',
  {
    type: 'AggregateJobConfiguration',
    args: {
      where: 'JobConfigurationWhereInput',
      orderBy: list('JobConfigurationOrderByInput'),
      cursor: 'JobConfigurationWhereUniqueInput',
      distinct: 'JobConfigurationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.jobConfiguration.aggregate({ ...args, ...select }) as any
    },
  },
)
