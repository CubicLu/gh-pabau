import { queryField, nonNull, list } from 'nexus'

export const JobConfigurationFindManyQuery = queryField(
  'findManyJobConfiguration',
  {
    type: nonNull(list(nonNull('JobConfiguration'))),
    args: {
      where: 'JobConfigurationWhereInput',
      orderBy: list('JobConfigurationOrderByWithRelationInput'),
      cursor: 'JobConfigurationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('JobConfigurationScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.jobConfiguration.findMany({
        ...args,
        ...select,
      })
    },
  },
)
