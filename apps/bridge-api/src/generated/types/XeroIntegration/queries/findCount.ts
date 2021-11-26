import { queryField, nonNull, list } from 'nexus'

export const XeroIntegrationFindCountQuery = queryField(
  'findManyXeroIntegrationCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'XeroIntegrationWhereInput',
      orderBy: list('XeroIntegrationOrderByWithRelationInput'),
      cursor: 'XeroIntegrationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('XeroIntegrationScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.xeroIntegration.count(args as any)
    },
  },
)
