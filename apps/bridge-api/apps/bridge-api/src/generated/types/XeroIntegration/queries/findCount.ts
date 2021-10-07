import { queryField, nonNull, list } from 'nexus'

export const XeroIntegrationFindCountQuery = queryField(
  'findManyXeroIntegrationCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'XeroIntegrationWhereInput',
      orderBy: list('XeroIntegrationOrderByWithRelationInput'),
      cursor: 'XeroIntegrationWhereUniqueInput',
      distinct: 'XeroIntegrationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.xeroIntegration.count(args as any)
    },
  },
)
