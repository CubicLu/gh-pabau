import { queryField, nonNull, list } from 'nexus'

export const JobConfigurationFindCountQuery = queryField(
  'findManyJobConfigurationCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'JobConfigurationWhereInput',
      orderBy: list('JobConfigurationOrderByInput'),
      cursor: 'JobConfigurationWhereUniqueInput',
      distinct: 'JobConfigurationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.jobConfiguration.count(args as any)
    },
  },
)
