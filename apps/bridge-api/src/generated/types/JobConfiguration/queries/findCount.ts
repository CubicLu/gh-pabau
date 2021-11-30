import { queryField, nonNull, list } from 'nexus'

export const JobConfigurationFindCountQuery = queryField(
  'findManyJobConfigurationCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'JobConfigurationWhereInput',
      orderBy: list('JobConfigurationOrderByWithRelationInput'),
      cursor: 'JobConfigurationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('JobConfigurationScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.jobConfiguration.count(args as any)
    },
  },
)
