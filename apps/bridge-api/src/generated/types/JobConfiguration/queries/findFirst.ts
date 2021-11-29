import { queryField, list } from 'nexus'

export const JobConfigurationFindFirstQuery = queryField(
  'findFirstJobConfiguration',
  {
    type: 'JobConfiguration',
    args: {
      where: 'JobConfigurationWhereInput',
      orderBy: list('JobConfigurationOrderByWithRelationInput'),
      cursor: 'JobConfigurationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('JobConfigurationScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.jobConfiguration.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
