import { queryField, nonNull, list } from 'nexus'

export const XeroIntegrationFindManyQuery = queryField(
  'findManyXeroIntegration',
  {
    type: nonNull(list(nonNull('XeroIntegration'))),
    args: {
      where: 'XeroIntegrationWhereInput',
      orderBy: list('XeroIntegrationOrderByWithRelationInput'),
      cursor: 'XeroIntegrationWhereUniqueInput',
      distinct: 'XeroIntegrationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.xeroIntegration.findMany({
        ...args,
        ...select,
      })
    },
  },
)
